import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

/**
 * User Role Context - Manages user roles and role switching throughout the application
 * Purpose: Provides a centralized way to manage user's available roles and current active role
 * Frontend Display: Used for dynamic navigation, role-based access control, and role switching UI
 */
const UserRoleContext = createContext(null);

/**
 * Custom hook to use the User Role Context
 * Purpose: Provides easy access to user role data and role switching functions
 * @returns {object} User role context value
 */
export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

/**
 * User Role Provider Component
 * Purpose: Wraps the application to provide user role state management
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.initialRole - Optional initial role to set
 */
export const UserRoleProvider = ({ children, initialRole }) => {
  const [userRoles, setUserRoles] = useState(null);
  const [currentRole, setCurrentRole] = useState(initialRole || null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Initialize user roles on mount
   * Purpose: Loads user role data when user is authenticated
   */
  useEffect(() => {
    const initializeUserRoles = async () => {
      try {
        const currentUserId = await authService.getUserId();
        
        if (currentUserId) {
          setUserId(currentUserId);
          const completeRoleData = await authService.getCompleteUserRole(currentUserId);
          
          if (completeRoleData) {
            setUserRoles(completeRoleData);
            
            // Only set default role if not already set via initialRole prop
            if (!currentRole) {
              // Set default role: admin > groupLeader > leader > member
              if (completeRoleData.isAdmin) {
                setCurrentRole('admin');
              } else if (completeRoleData.isGroupLeader) {
                setCurrentRole('groupLeader');
              } else if (completeRoleData.isLeader) {
                setCurrentRole('leader');
              } else if (completeRoleData.isMember) {
                setCurrentRole('member');
              }
            }
          }
        }
      } catch (error) {
        console.error('Error initializing user roles:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeUserRoles();
  }, [initialRole, currentRole]);

  /**
   * Switch to a different role
   * Purpose: Changes the current active role for the user
   * @param {string} role - The role to switch to (admin, groupLeader, leader, member)
   */
  const switchRole = (role) => {
    if (userRoles && userRoles.availableRoles && userRoles.availableRoles.includes(role)) {
      setCurrentRole(role);
    } else {
      console.warn(`Role ${role} is not available for this user`);
    }
  };

  /**
   * Check if user has a specific role
   * Purpose: Determines if user has access to a specific role
   * @param {string} role - The role to check
   * @returns {boolean} True if user has the role, false otherwise
   */
  const hasRole = (role) => {
    if (!userRoles || !userRoles.availableRoles) return false;
    return userRoles.availableRoles.includes(role);
  };

  /**
   * Get user data for current role
   * Purpose: Returns role-specific user data for the current active role
   * @returns {object} Role-specific user data
   */
  const getCurrentRoleData = () => {
    if (!userRoles || !currentRole) return null;

    switch (currentRole) {
      case 'admin':
        return {
          id: userId,
          fullName: userRoles.fullName,
          initials: userRoles.fullName ? userRoles.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'AD',
          primaryTitle: 'System Administrator',
          subgroupName: 'Saint Demetrios SNO',
          accentColor: '#4A7DFF'
        };
      case 'groupLeader':
        return {
          id: userId,
          fullName: userRoles.fullName,
          initials: userRoles.fullName ? userRoles.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'GL',
          primaryTitle: userRoles.groupLeaderData?.titles?.[0] || 'Group Leader',
          subgroupName: 'Saint Demetrios SNO',
          accentColor: '#8B5CF6'
        };
      case 'leader':
        return {
          id: userId,
          fullName: userRoles.fullName,
          initials: userRoles.fullName ? userRoles.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'LD',
          primaryTitle: userRoles.leaderData?.primaryTitle || 'Leader',
          subgroupName: userRoles.leaderData?.subgroups?.[0]?.subgroupName || 'Unknown Unit',
          subgroupId: userRoles.leaderData?.subgroups?.[0]?.subgroupId,
          titles: userRoles.leaderData?.titles || [],
          subgroups: userRoles.leaderData?.subgroups || [],
          accentColor: '#F59E0B'
        };
      case 'member':
        return {
          id: userId,
          fullName: userRoles.fullName,
          initials: userRoles.fullName ? userRoles.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'MB',
          primaryTitle: 'Scout Member',
          subgroupName: userRoles.memberData?.subgroupName || 'Unknown Unit',
          subgroupId: userRoles.memberData?.subgroupId,
          unitName: userRoles.memberData?.unitName,
          accentColor: '#10B981'
        };
      default:
        return null;
    }
  };

  /**
   * Clear user roles (for logout)
   * Purpose: Resets user role state when user logs out
   */
  const clearUserRoles = () => {
    setUserRoles(null);
    setCurrentRole(null);
    setUserId(null);
    setLoading(false);
  };

  const value = {
    userRoles,
    currentRole,
    userId,
    loading,
    switchRole,
    hasRole,
    getCurrentRoleData,
    clearUserRoles,
    // Convenience properties
    isAdmin: userRoles?.isAdmin || false,
    isMember: userRoles?.isMember || false,
    isLeader: userRoles?.isLeader || false,
    isGroupLeader: userRoles?.isGroupLeader || false,
    availableRoles: userRoles?.availableRoles || []
  };

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};