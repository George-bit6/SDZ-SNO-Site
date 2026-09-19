import supabase from "../../supabase";
import { userRoleService } from "./userRoleService";

/**
 * Authentication Service - Handles all authentication operations
 * Follows SOLID principles: Single Responsibility for authentication
 */
export class AuthService {
  /**
   * Get current user ID from Supabase authentication
   * Purpose: Retrieves the authenticated user's unique identifier from the current session
   * Frontend Display: Used to identify the current user throughout the application for personalized content,
   *                  role-based access control, and user-specific data fetching
   * @returns {Promise<string|null>} User ID if authenticated, null if not authenticated or error occurs
   */
  async getUserId() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Get user id error:", error.message);
        return null;
      }
      
      return user?.id ?? null;
    } catch (error) {
      console.error("Unexpected error getting user ID:", error);
      return null;
    }
  }

  /**
   * Get current user data from Supabase authentication
   * Purpose: Retrieves the complete user object including email, metadata, and session information
   * Frontend Display: Used to display user profile information, show user-specific UI elements,
   *                  and populate user profile forms with current data
   * @returns {Promise<object|null>} Complete user object if authenticated, null if not authenticated or error occurs
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Get user error:", error.message);
        return null;
      }
      
      return user;
    } catch (error) {
      console.error("Unexpected error getting user:", error);
      return null;
    }
  }

  /**
   * Sign in user with email and password
   * Purpose: Authenticates a user using their email and password credentials via Supabase Auth
   * Frontend Display: Triggers user login flow, redirects to dashboard on success,
   *                  displays error messages on failure, and updates authentication state
   * @param {string} email - User's email address for authentication
   * @param {string} password - User's password for authentication
   * @returns {Promise<object>} Login result object with success status, user data, session info, or error details
   */
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error) {
      console.error("Unexpected login error:", error);
      return {
        success: false,
        error: "An unexpected error occurred"
      };
    }
  }

  /**
   * Sign out current user
   * Purpose: Terminates the current user's authentication session via Supabase Auth
   * Frontend Display: Logs the user out of the application, redirects to login page,
   *                  clears user-specific data from state, and updates UI to show logged-out state
   * @returns {Promise<object>} Sign out result object with success status or error details
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out error:", error.message);
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true
      };
    } catch (error) {
      console.error("Unexpected sign out error:", error);
      return {
        success: false,
        error: "An unexpected error occurred"
      };
    }
  }

  /**
   * Get user role from database (member, leader, admin, or both)
   * Purpose: Determines the user's role by checking if they exist in Leaders, Scout_members, or have admin privileges
   * Frontend Display: Used for role-based access control, determines which dashboard/features are accessible,
   *                  controls navigation menu options, and shows role-specific UI components
   * @param {string} userId - User's unique identifier to check role for
   * @returns {Promise<object>} User role object with isMember, isLeader, isAdmin flags and primary role
   */
  async getUserRole(userId) {
    try {
      // Use the comprehensive user role service for complete role information
      const completeRoleData = await userRoleService.getUserCompleteRoles(userId);
      
      // Determine primary role for routing (for backward compatibility)
      let primaryRole = null;
      if (completeRoleData.isAdmin) {
        primaryRole = 'admin';
      } else if (completeRoleData.isLeader && completeRoleData.isMember) {
        primaryRole = 'both'; // User has both roles
      } else if (completeRoleData.isLeader) {
        primaryRole = 'leader';
      } else if (completeRoleData.isMember) {
        primaryRole = 'member';
      }

      return {
        ...completeRoleData,
        primaryRole
      };
    } catch (error) {
      console.error("Error getting user role:", error);
      return {
        isAdmin: false,
        isLeader: false,
        isMember: false,
        primaryRole: null
      };
    }
  }

  /**
   * Get complete user role information for comprehensive access control
   * Purpose: Retrieves full role data including member details, leader titles, subgroups, and admin status
   * Frontend Display: Used for dynamic navigation, role switching, and comprehensive access control
   * @param {string} userId - User's unique identifier
   * @returns {Promise<object>} Complete user role information
   */
  async getCompleteUserRole(userId) {
    try {
      return await userRoleService.getUserCompleteRoles(userId);
    } catch (error) {
      console.error("Error getting complete user role:", error);
      return null;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();