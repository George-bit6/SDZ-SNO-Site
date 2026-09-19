import { BaseDataService } from './baseDataService';
import supabase from '../../supabase.js';

/**
 * Admin Data Service - Handles all admin-related user management operations
 * Follows SOLID principles: Single Responsibility for admin user management
 */
export class AdminDataService extends BaseDataService {
  /**
   * Create a new user with Supabase Auth and assign them to appropriate database tables
   * Purpose: Creates user account in Supabase Auth and assigns them to Users table and appropriate role table
   * Frontend Display: Used in admin dashboard to add new scouts, leaders, and other users to the system
   * @param {object} userData - User data object with personal information and role assignment
   * @returns {Promise<object>} Result object with success status, user data, or error details
   */
  async createUser(userData) {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        birthdate,
        gender,
        phone,
        city,
        country,
        isMember,
        isLeader,
        subgroupId,
        unitName,
        leaderTitle,
        leaderSubgroupId
      } = userData;

      // Step 1: Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            is_member: isMember,
            is_leader: isLeader
          }
        }
      });

      if (authError) {
        console.error('Error creating auth user:', authError);
        return {
          success: false,
          error: authError.message
        };
      }

      const userId = authData.user?.id;
      if (!userId) {
        return {
          success: false,
          error: 'Failed to create user account'
        };
      }

      // Step 2: Create user record in Users table
      const { error: userError } = await supabase
        .from('Users')
        .insert({
          id: userId,
          Fname: firstName,
          Lname: lastName,
          birthdate: birthdate || null,
          gender: gender || null,
          phone_nb: phone || null,
          city: city || null,
          country: country || 'Lebanon',
          created_at: new Date().toISOString()
        });

      if (userError) {
        console.error('Error creating user record:', userError);
        // Rollback: delete auth user
        await supabase.auth.admin.deleteUser(userId);
        return {
          success: false,
          error: userError.message
        };
      }

      // Step 3: Assign user to appropriate role tables (support dual roles)
      // Create member record if isMember is true
      if (isMember) {
        const { error: memberError } = await supabase
          .from('Scout_members')
          .insert({
            Scout_id: userId,
            subgrp_id: subgroupId || null,
            unit_name: unitName || null,
            date_of_membership: new Date().toISOString()
          });

        if (memberError) {
          console.error('Error creating member record:', memberError);
          return {
            success: false,
            error: memberError.message
          };
        }
      }

      // Create leader record if isLeader is true
      if (isLeader) {
        const { error: leaderError } = await supabase
          .from('Group_Leaders')
          .insert({
            group_leader_id: userId,
            group_leader_title: leaderTitle || 'subgroup_leader',
            date_of_role_acquisition: new Date().toISOString()
          });

        if (leaderError) {
          console.error('Error creating leader record:', leaderError);
          return {
            success: false,
            error: leaderError.message
          };
        }

        // Assign leader to subgroup if provided
        if (leaderSubgroupId) {
          const { error: subgrpLeaderError } = await supabase
            .from('Subgrp_Leaders')
            .insert({
              leader_id: userId,
              subgrp_id: leaderSubgroupId,
              leader_title: leaderTitle || 'subgroup_leader'
            });

          if (subgrpLeaderError) {
            console.error('Error assigning leader to subgroup:', subgrpLeaderError);
            // Don't fail the whole operation, just log the error
          }
        }
      }

      return {
        success: true,
        user: {
          id: userId,
          email: email,
          firstName: firstName,
          lastName: lastName,
          isMember: isMember,
          isLeader: isLeader
        }
      };

    } catch (error) {
      console.error('Unexpected error creating user:', error);
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  /**
   * Get all subgroups for dropdown selection
   * Purpose: Retrieves list of all subgroups to populate dropdown menus in user creation form
   * Frontend Display: Used in admin user creation dialog to show available subgroups for assignment
   * @returns {Promise<Array>} Array of subgroup objects with id and name
   */
  async getAllSubgroups() {
    try {
      const { data: subgroups, error } = await supabase
        .from('Subgroups')
        .select('subgrp_id, subgrp_name, patron_saint')
        .order('subgrp_name');

      if (error) {
        console.error('Error fetching subgroups:', error);
        return [];
      }

      return subgroups || [];
    } catch (error) {
      console.error('Unexpected error fetching subgroups:', error);
      return [];
    }
  }

  /**
   * Get all users with their roles and basic information
   * Purpose: Retrieves comprehensive list of all users in the system for admin overview
   * Frontend Display: Used in admin dashboard to show all users, their roles, and basic information
   * @returns {Promise<Array>} Array of user objects with role information
   */
  async getAllUsers() {
    try {
      // Get all users from Users table
      const { data: users, error: usersError } = await supabase
        .from('Users')
        .select('id, Fname, Lname, email, birthdate, gender, phone_nb, city, country, created_at')
        .order('created_at', { ascending: false });

      if (usersError) {
        console.error('Error fetching users:', usersError);
        return [];
      }

      if (!users || users.length === 0) {
        return [];
      }

      // Get role information for each user (support dual roles)
      const usersWithRoles = await Promise.all(users.map(async (user) => {
        let isMember = false;
        let isLeader = false;
        let additionalInfo = {};

        // Check if user is a leader
        const { data: leaderData } = await supabase
          .from('Group_Leaders')
          .select('group_leader_title, date_of_role_acquisition')
          .eq('group_leader_id', user.id)
          .maybeSingle();

        if (leaderData) {
          isLeader = true;
          additionalInfo = {
            ...additionalInfo,
            title: leaderData.group_leader_title,
            dateBecameLeader: leaderData.date_of_role_acquisition
          };
        }

        // Check if user is a member
        const { data: memberData } = await supabase
          .from('Scout_members')
          .select('unit_name, subgrp_id, date_of_membership')
          .eq('Scout_id', user.id)
          .maybeSingle();

        if (memberData) {
          isMember = true;
          additionalInfo = {
            ...additionalInfo,
            unitName: memberData.unit_name,
            subgroupId: memberData.subgrp_id,
            membershipDate: memberData.date_of_membership
          };

          // Get subgroup name if subgroupId exists
          if (memberData.subgrp_id) {
            const { data: subgroupData } = await supabase
              .from('Subgroups')
              .select('subgrp_name')
              .eq('subgrp_id', memberData.subgrp_id)
              .maybeSingle();

            if (subgroupData) {
              additionalInfo.subgroupName = subgroupData.subgrp_name;
            }
          }
        }

        return {
          ...user,
          isMember: isMember,
          isLeader: isLeader,
          role: isLeader && isMember ? 'both' : isLeader ? 'leader' : isMember ? 'member' : null,
          ...additionalInfo
        };
      }));

      return usersWithRoles;
    } catch (error) {
      console.error('Unexpected error fetching all users:', error);
      return [];
    }
  }

  /**
   * Delete a user from the system
   * Purpose: Removes user account and all associated data from the system
   * Frontend Display: Used in admin dashboard to remove users who are no longer active
   * @param {string} userId - User's unique identifier to delete
   * @returns {Promise<object>} Result object with success status or error details
   */
  async deleteUser(userId) {
    try {
      // Delete from role-specific tables first (both leader and member if they exist)
      await supabase.from('Group_Leaders').delete().eq('group_leader_id', userId);
      await supabase.from('Scout_members').delete().eq('Scout_id', userId);
      await supabase.from('Subgrp_Leaders').delete().eq('leader_id', userId);

      // Delete from Users table
      const { error: userError } = await supabase
        .from('Users')
        .delete()
        .eq('id', userId);

      if (userError) {
        console.error('Error deleting user record:', userError);
        return {
          success: false,
          error: userError.message
        };
      }

      // Delete from Supabase Auth (requires admin privileges)
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);

      if (authError) {
        console.error('Error deleting auth user:', authError);
        return {
          success: false,
          error: authError.message
        };
      }

      return {
        success: true
      };
    } catch (error) {
      console.error('Unexpected error deleting user:', error);
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  /**
   * Format user data for display in admin dashboard
   * Purpose: Transforms raw user data into standardized format for UI components
   * Frontend Display: Used to prepare user data for admin user tables and user cards
   * @param {object} userData - Raw user data object from database
   * @returns {object} Formatted user object with display-ready fields
   */
  formatUserData(userData) {
    if (!userData) return null;

    return {
      id: userData.id,
      firstName: userData.Fname || 'Unknown',
      lastName: userData.Lname || 'User',
      fullName: `${userData.Fname || 'Unknown'} ${userData.Lname || 'User'}`,
      email: userData.email,
      initials: this.getInitials(userData.Fname, userData.Lname),
      role: userData.role || 'unknown',
      isMember: userData.isMember || false,
      isLeader: userData.isLeader || false,
      birthdate: userData.birthdate,
      gender: userData.gender,
      phone: userData.phone_nb,
      city: userData.city,
      country: userData.country,
      createdAt: userData.created_at,
      // Role-specific fields
      title: userData.title || null,
      unitName: userData.unitName || null,
      subgroupId: userData.subgroupId || null,
      subgroupName: userData.subgroupName || null,
      membershipDate: userData.membershipDate || null,
      dateBecameLeader: userData.dateBecameLeader || null
    };
  }

  /**
   * Generate initials from first and last name
   * Purpose: Creates two-letter abbreviation for user avatars and compact displays
   * Frontend Display: Used for user badges, avatars, and space-constrained UI elements
   * @param {string} firstName - User's first name
   * @param {string} lastName - User's last name
   * @returns {string} Two-letter uppercase initials
   */
  getInitials(firstName, lastName) {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }
}

// Export singleton instance
export const adminDataService = new AdminDataService();