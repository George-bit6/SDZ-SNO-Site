import supabase from '../../supabase.js';
import { BaseDataService } from './baseDataService';

/**
 * User Role Service - Handles comprehensive user role checking and role data retrieval
 * Follows SOLID principles: Single Responsibility for user role management
 */
export class UserRoleService extends BaseDataService {
  /**
   * Get comprehensive user role information
   * Purpose: Retrieves complete role data for a user including member status, leader titles,
   *          subgroup leadership, group leadership, and admin status
   * Frontend Display: Used for role-based access control, dynamic navigation, and determining
   *                  which pages and features a user can access
   * @param {string} userId - User's unique identifier
   * @returns {Promise<object>} Complete user role object with all role information
   */
  async getUserCompleteRoles(userId) {
    try {
      // Get basic user info
      const { data: userData, error: userError } = await supabase
        .from('Users')
        .select('id, Fname, Lname')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Error fetching user data:', userError);
        return this.getDefaultRoleData(userId);
      }

      // Email belongs to Supabase Auth, not public.Users in the application schema.
      const { data: { user: authUser } } = await supabase.auth.getUser();
      const isAdmin = this.checkAdminStatus(authUser?.id === userId ? authUser : null);

      // Check member status
      const memberData = await this.checkMemberStatus(userId);

      // Check leader status and get leader details
      const leaderData = await this.checkLeaderStatus(userId);

      // Check group leader status
      const groupLeaderData = await this.checkGroupLeaderStatus(userId);

      return {
        userId,
        email: authUser?.id === userId ? authUser.email : null,
        fullName: `${userData?.Fname || ''} ${userData?.Lname || ''}`.trim() || 'User',
        isAdmin,
        isMember: memberData.isMember,
        isLeader: leaderData.isLeader,
        isGroupLeader: groupLeaderData.isGroupLeader,
        memberData: memberData.isMember ? memberData : null,
        leaderData: leaderData.isLeader ? leaderData : null,
        groupLeaderData: groupLeaderData.isGroupLeader ? groupLeaderData : null,
        availableRoles: this.determineAvailableRoles(isAdmin, memberData.isMember, leaderData.isLeader, groupLeaderData.isGroupLeader)
      };
    } catch (error) {
      console.error('Error getting user complete roles:', error);
      return this.getDefaultRoleData(userId);
    }
  }

  /**
   * Check if user has admin status
   * Purpose: Determines admin status based on email pattern (replace with proper admin table in production)
   * @param {object|null} authUser - The authenticated Supabase user
   * @returns {boolean} True if user is admin, false otherwise
   */
  checkAdminStatus(authUser) {
    const appMetadata = authUser?.app_metadata;
    return appMetadata?.is_admin === true || appMetadata?.role === 'admin';
  }

  /**
   * Check if user is a member
   * Purpose: Determines member status by checking Scout_members table
   * @param {string} userId - User's unique identifier
   * @returns {Promise<object>} Member status and data
   */
  async checkMemberStatus(userId) {
    try {
      const { data: memberData, error } = await supabase
        .from('Scout_members')
        .select(`
          Scout_id,
          date_of_membership,
          subgrp_id,
          unit_name,
          Users!inner (
            Fname,
            Lname,
            city,
            birthdate
          )
        `)
        .eq('Scout_id', userId)
        .maybeSingle();

      if (error || !memberData) {
        return { isMember: false };
      }

      // Get subgroup info
      let subgroupName = 'Unknown Unit';
      if (memberData.subgrp_id) {
        const { data: subgroup } = await supabase
          .from('Subgroups')
          .select('subgrp_name')
          .eq('subgrp_id', memberData.subgrp_id)
          .maybeSingle();
        
        subgroupName = subgroup?.subgrp_name || memberData.unit_name || 'Unknown Unit';
      }

      return {
        isMember: true,
        scoutId: memberData.Scout_id,
        subgroupId: memberData.subgrp_id,
        subgroupName: subgroupName,
        unitName: memberData.unit_name,
        membershipDate: memberData.date_of_membership,
        firstName: memberData.Users?.Fname,
        lastName: memberData.Users?.Lname,
        city: memberData.Users?.city,
        birthdate: memberData.Users?.birthdate
      };
    } catch (error) {
      console.error('Error checking member status:', error);
      return { isMember: false };
    }
  }

  /**
   * Check if user is a leader and get leader details
   * Purpose: Determines leader status and retrieves leader titles and subgroup associations
   * @param {string} userId - User's unique identifier
   * @returns {Promise<object>} Leader status and data including titles and subgroups
   */
  async checkLeaderStatus(userId) {
    try {
      // First check if user is a Scout_member (required for leadership per schema)
      const { data: scoutMember, error: memberError } = await supabase
        .from('Scout_members')
        .select('Scout_id')
        .eq('Scout_id', userId)
        .maybeSingle();

      if (memberError || !scoutMember) {
        return { isLeader: false };
      }

      // Check Group_Leaders table for titles (references Scout_members.Scout_id)
      const { data: groupLeaders, error: groupError } = await supabase
        .from('Group_Leaders')
        .select('group_leader_id, group_leader_title')
        .eq('group_leader_id', userId);

      if (groupError) {
        console.error('Error checking group leaders:', groupError);
      }

      // Check Subgrp_Leaders table for subgroup associations (references Scout_members.Scout_id)
      const { data: subgrpLeaders, error: subgrpError } = await supabase
        .from('Subgrp_Leaders')
        .select('subgrp_id, leader_title')
        .eq('leader_id', userId);

      if (subgrpError) {
        console.error('Error checking subgroup leaders:', subgrpError);
      }

      if ((!groupLeaders || groupLeaders.length === 0) && (!subgrpLeaders || subgrpLeaders.length === 0)) {
        return { isLeader: false };
      }

      // Extract titles from Group_Leaders
      const titles = groupLeaders ? groupLeaders.map(gl => gl.group_leader_title) : [];
      const uniqueTitles = [...new Set(titles)];

      // Get subgroup information from Subgrp_Leaders
      const subgroups = [];
      if (subgrpLeaders && subgrpLeaders.length > 0) {
        for (const sl of subgrpLeaders) {
          const { data: subgroup } = await supabase
            .from('Subgroups')
            .select('subgrp_id, subgrp_name')
            .eq('subgrp_id', sl.subgrp_id)
            .maybeSingle();

          if (subgroup) {
            subgroups.push({
              subgroupId: subgroup.subgrp_id,
              subgroupName: subgroup.subgrp_name,
              leaderTitle: sl.leader_title
            });
          }
        }
      }

      return {
        isLeader: true,
        leaderId: userId,
        titles: uniqueTitles,
        primaryTitle: uniqueTitles[0] || null,
        subgroups: subgroups,
        subgroupIds: subgroups.map(s => s.subgroupId)
      };
    } catch (error) {
      console.error('Error checking leader status:', error);
      return { isLeader: false };
    }
  }

  /**
   * Check if user is a group leader
   * Purpose: Determines group leader status specifically
   * @param {string} userId - User's unique identifier
   * @returns {Promise<object>} Group leader status and data
   */
  async checkGroupLeaderStatus(userId) {
    try {
      // First check if user is a Scout_member (required for group leadership per schema)
      const { data: scoutMember, error: memberError } = await supabase
        .from('Scout_members')
        .select('Scout_id')
        .eq('Scout_id', userId)
        .maybeSingle();

      if (memberError || !scoutMember) {
        return { isGroupLeader: false };
      }

      // Check Group_Leaders table (references Scout_members.Scout_id)
      const { data: groupLeaders, error } = await supabase
        .from('Group_Leaders')
        .select('group_leader_id, group_leader_title')
        .eq('group_leader_id', userId);

      if (error || !groupLeaders || groupLeaders.length === 0) {
        return { isGroupLeader: false };
      }

      return {
        isGroupLeader: true,
        groupLeaderId: userId,
        titles: groupLeaders.map(gl => gl.group_leader_title)
      };
    } catch (error) {
      console.error('Error checking group leader status:', error);
      return { isGroupLeader: false };
    }
  }

  /**
   * Determine available roles for navigation and access control
   * Purpose: Creates a list of roles the user can switch between
   * Note: Per schema, all leaders must also be Scout_members, so leader roles include member access
   * @param {boolean} isAdmin - User's admin status
   * @param {boolean} isMember - User's member status
   * @param {boolean} isLeader - User's leader status
   * @param {boolean} isGroupLeader - User's group leader status
   * @returns {Array<string>} Array of available role strings
   */
  determineAvailableRoles(isAdmin, isMember, isLeader, isGroupLeader) {
    const roles = [];
    
    if (isAdmin) roles.push('admin');
    if (isGroupLeader) roles.push('groupLeader');
    if (isLeader) roles.push('leader');
    if (isMember) roles.push('member');
    
    return roles;
  }

  /**
   * Get default role data when errors occur
   * Purpose: Provides fallback data structure when role checking fails
   * @param {string} userId - User's unique identifier
   * @returns {object} Default role data structure
   */
  getDefaultRoleData(userId) {
    return {
      userId,
      email: null,
      fullName: 'User',
      isAdmin: false,
      isMember: false,
      isLeader: false,
      isGroupLeader: false,
      memberData: null,
      leaderData: null,
      groupLeaderData: null,
      availableRoles: []
    };
  }

  /**
   * Get user's initials for display
   * Purpose: Generates initials from user's full name
   * @param {string} fullName - User's full name
   * @returns {string} Two-letter initials
   */
  getInitials(fullName) {
    if (!fullName) return 'US';
    const names = fullName.split(' ');
    const firstInitial = names[0] ? names[0].charAt(0).toUpperCase() : '';
    const lastInitial = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }
}

// Export singleton instance
export const userRoleService = new UserRoleService();