import { BaseDataService } from './baseDataService';
import supabase from '../../supabase.js';

/**
 * Member Data Service - Handles all member-related data operations
 * Follows SOLID principles: Single Responsibility for member data
 */
export class MemberDataService extends BaseDataService {
  /**
   * Get member data by ID from the Scout_members table with User information
   * Purpose: Retrieves individual member information including personal details, contact info, and membership data
   * Frontend Display: Used to populate member profile pages, display member information cards, show member details
   *                  in leader dashboard and member views
   * @param {string} memberId - Member's unique identifier (Scout_id) in the Scout_members table
   * @returns {Promise<object|null>} Member object with personal details or null if not found
   */
  async getMemberById(memberId) {
    let {data: member, error} = await supabase
      .from('Scout_members')
      .select(`
        Scout_id,
        date_of_membership,
        unit_title,
        created_at,
        subgrp_id,
        unit_name,
        Users!inner (
          id,
          Fname,
          Lname,
          city,
          country,
          phone_nb,
          gender,
          birthdate,
          created_at
        )
      `)
      .eq('Scout_id', memberId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching member by ID:', error);
      return null;
    }

    if (!member) {
      return null;
    }

    // Flatten the nested Users data
    return {
      ...member,
      ...member.Users,
      Users: undefined // Remove the nested object
    };
  }

  /**
   * Get all tasks assigned to a specific member
   * Purpose: Retrieves the complete list of tasks associated with a member using a database RPC function
   * Frontend Display: Used to populate task lists in member dashboard, show progress tracking, display task completion status,
   *                  and populate task-related UI components for individual members
   * @param {string} memberId - Member's unique identifier to fetch their assigned tasks
   * @returns {Promise<Array|null>} Array of task objects with task details and status, or null if error occurs
   */
  async getMemberTasks(memberId) {
    try {
      return await this.callRpc('get_member_tasks', { member_id: memberId });
    } catch (error) {
      console.error('RPC function get_member_tasks not available, falling back to task progress:', error);
      // Fallback to task progress if RPC function doesn't exist
      return this.getMemberTaskProgress(memberId);
    }
  }

  /**
   * Get member's task scores and achievement statistics
   * Purpose: Retrieves aggregated scoring data including total points, badges earned, and service hours using a database RPC function
   * Frontend Display: Used to display achievement statistics in member dashboard, show progress bars, display badges and points,
   *                  and populate achievement-related UI components
   * @param {string} memberId - Member's unique identifier to fetch their achievement scores
   * @returns {Promise<object|null>} Score object with total_points, badges, service_hours, or null if error occurs
   */
  async getMemberTaskScore(memberId) {
    try {
      return await this.callRpc('get_member_task_score', { member_id: memberId });
    } catch (error) {
      console.error('RPC function get_member_task_score not available, computing stats:', error);
      // Fallback to computed stats if RPC function doesn't exist
      const progress = await this.getMemberTaskProgress(memberId);
      if (!progress) {
        return { total_points: 0, badges: 0, service_hours: 0 };
      }

      // Calculate total points from task progress
      const totalPoints = progress.reduce((sum, task) => {
        if (task.task_status === 'complete' || task.task_status === 'verified') {
          return sum + (task.points || 0);
        }
        return sum;
      }, 0);

      return {
        total_points: totalPoints,
        badges: progress.filter(t => t.task_status === 'verified').length,
        service_hours: 0 // This would need to be implemented in the database
      };
    }
  }

  /**
   * Get task progress for a specific member
   * Purpose: Retrieves task progress data from Task_Scout_Progress table for a specific member
   * Frontend Display: Used to display task completion status, progress tracking, and achievement data in member dashboard
   * @param {string} memberId - Member's unique identifier (Scout_id)
   * @returns {Promise<Array|null>} Array of task progress objects or null if error occurs
   */
  async getMemberTaskProgress(memberId) {
    let {data: progress, error} = await supabase
      .from('Task_Scout_Progress')
      .select(`
        scout_id,
        subgrp_id,
        level_name,
        task_name,
        task_status,
        created_at,
        Tasks!inner (
          subgrp_id,
          level_name,
          task_name,
          task_desc,
          points,
          created_at,
          task_type
        )
      `)
      .eq('scout_id', memberId);

    if (error) {
      console.error('Error fetching member task progress:', error);
      return null;
    }

    if (!progress) {
      return [];
    }

    // Flatten the nested Tasks data for each progress record
    return progress.map(record => ({
      ...record,
      ...record.Tasks,
      Tasks: undefined // Remove the nested object
    }));
  }

  /**
   * Get all members that belong to a specific subgroup with User information
   * Purpose: Retrieves all scout members from the Scout_members table that are assigned to a particular subgroup
   * Frontend Display: Used to populate member lists in subgroup views, show team members in leader dashboard,
   *                  display subgroup rosters and member directories
   * @param {string} subgroupId - Subgroup's unique identifier to fetch its members
   * @returns {Promise<Array|null>} Array of member objects in the subgroup, or null if error occurs
   */
  async getMembersBySubgroup(subgroupId) {
    let {data: members, error} = await supabase
      .from('Scout_members')
      .select(`
        Scout_id,
        date_of_membership,
        unit_title,
        created_at,
        subgrp_id,
        unit_name,
        Users!inner (
          id,
          Fname,
          Lname,
          city,
          country,
          phone_nb,
          gender,
          birthdate,
          created_at
        )
      `)
      .eq('subgrp_id', subgroupId);

    if (error) {
      console.error('Error fetching members by subgroup:', error);
      return null;
    }

    if (!members) {
      return [];
    }

    // Flatten the nested Users data for each member
    return members.map(member => ({
      ...member,
      ...member.Users,
      Users: undefined // Remove the nested object
    }));
  }

  /**
   * Get comprehensive statistics for a specific member
   * Purpose: Calculates and aggregates member statistics including total tasks, completed tasks, points, badges, and service hours
   * Frontend Display: Used to display member dashboard statistics cards, show personal achievement metrics,
   *                  populate progress indicators and achievement displays in member profile
   * @param {string} memberId - Member's unique identifier to calculate their statistics
   * @returns {Promise<object>} Statistics object with totalTasks, completedTasks, totalPoints, badges, hours
   */
  async getMemberStats(memberId) {
    const progress = await this.getMemberTaskProgress(memberId);
    const scores = await this.getMemberTaskScore(memberId);

    if (!progress) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        totalPoints: 0,
        badges: 0,
        hours: 0
      };
    }

    const completedTasks = progress.filter(task =>
      task.task_status === 'complete' || task.task_status === 'verified'
    ).length;

    return {
      totalTasks: progress.length,
      completedTasks,
      totalPoints: scores?.total_points || 0,
      badges: scores?.badges || 0,
      hours: scores?.service_hours || 0
    };
  }

  /**
   * Format raw member data for frontend display
   * Purpose: Transforms raw database member data into a standardized format suitable for UI components,
   *          adding computed fields like fullName, initials, and subgroup information
   * Frontend Display: Used to prepare member data for display in profile cards, headers, navigation,
   *                  member lists, and any UI component that shows member information
   * @param {object} memberData - Raw member data object from database queries (flattened with User data)
   * @returns {object} Formatted member object with id, firstName, lastName, fullName, initials, subgroupId,
   *                   unitName, unitTitle, city, country, phone, gender, birthdate, membershipDate,
   *                   subgroupName, and subgroupData for consistent frontend display
   */
  formatMemberData(memberData) {
    if (!memberData) return null;

    return {
      id: memberData.Scout_id,
      firstName: memberData.Fname || 'Unknown',
      lastName: memberData.Lname || 'Member',
      fullName: `${memberData.Fname || 'Unknown'} ${memberData.Lname || 'Member'}`,
      initials: this.getInitials(memberData.Fname, memberData.Lname),
      subgroupId: memberData.subgrp_id,
      unitName: memberData.unit_name,
      unitTitle: memberData.unit_title,
      city: memberData.city,
      country: memberData.country,
      phone: memberData.phone_nb,
      gender: memberData.gender,
      birthdate: memberData.birthdate,
      membershipDate: memberData.date_of_membership,
      // Add subgroup info for accent color determination
      subgroupName: memberData.subgroupName || memberData.unit_name || 'Unknown Unit',
      subgroupData: {
        id: memberData.subgrp_id,
        name: memberData.subgroupName || memberData.unit_name || 'Unknown Unit',
        title: memberData.unit_title || 'Scout'
      }
    };
  }

  /**
   * Generate initials from first and last name
   * Purpose: Creates a two-letter abbreviation from the first letter of first name and first letter of last name
   * Frontend Display: Used to display user avatars, profile badges, and compact name representations in UI components
   *                  where space is limited or initials are preferred over full names
   * @param {string} firstName - Member's first name to extract initial from
   * @param {string} lastName - Member's last name to extract initial from
   * @returns {string} Two-letter uppercase initials (e.g., "JD" for John Doe)
   */
  getInitials(firstName, lastName) {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }
}

// Export singleton instance
export const memberDataService = new MemberDataService();