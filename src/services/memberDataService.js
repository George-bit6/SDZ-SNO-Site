import { BaseDataService } from './baseDataService';

/**
 * Member Data Service - Handles all member-related data operations
 * Follows SOLID principles: Single Responsibility for member data
 */
export class MemberDataService extends BaseDataService {
  /**
   * Get member by ID
   * @param {string} memberId - Member ID
   * @returns {Promise<object|null>} Member data or null
   */
  async getMemberById(memberId) {
    return this.fetchOne('Scout_members', { Scout_id: memberId });
  }

  /**
   * Get member tasks
   * @param {string} memberId - Member ID
   * @returns {Promise<Array|null>} Member tasks or null
   */
  async getMemberTasks(memberId) {
    return this.callRpc('get_member_tasks', { member_id: memberId });
  }

  /**
   * Get member task scores
   * @param {string} memberId - Member ID
   * @returns {Promise<object|null>} Task scores or null
   */
  async getMemberTaskScore(memberId) {
    return this.callRpc('get_member_task_score', { member_id: memberId });
  }

  /**
   * Get all members in a subgroup
   * @param {string} subgroupId - Subgroup ID
   * @returns {Promise<Array|null>} Members or null
   */
  async getMembersBySubgroup(subgroupId) {
    return this.fetchAll('Scout_members', { subgrp_id: subgroupId });
  }

  /**
   * Get member statistics
   * @param {string} memberId - Member ID
   * @returns {Promise<object>} Member statistics
   */
  async getMemberStats(memberId) {
    const tasks = await this.getMemberTasks(memberId);
    const scores = await this.getMemberTaskScore(memberId);
    
    if (!tasks || !scores) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        totalPoints: 0,
        badges: 0,
        hours: 0
      };
    }

    const completedTasks = tasks.filter(task => 
      task.task_status === 'complete' || task.task_status === 'verified'
    ).length;

    return {
      totalTasks: tasks.length,
      completedTasks,
      totalPoints: scores.total_points || 0,
      badges: scores.badges || 0,
      hours: scores.service_hours || 0
    };
  }

  /**
   * Format member data for display
   * @param {object} memberData - Raw member data
   * @returns {object} Formatted member data
   */
  formatMemberData(memberData) {
    if (!memberData) return null;

    return {
      id: memberData.Scout_id,
      firstName: memberData.Fname,
      lastName: memberData.Lname,
      fullName: `${memberData.Fname} ${memberData.Lname}`,
      initials: this.getInitials(memberData.Fname, memberData.Lname),
      subgroupId: memberData.subgrp_id,
      unitName: memberData.unit_name,
      unitTitle: memberData.unit_title,
      city: memberData.city,
      country: memberData.country,
      phone: memberData.phone_nb,
      gender: memberData.gender,
      birthdate: memberData.birthdate,
      membershipDate: memberData.date_of_membership
    };
  }

  /**
   * Get initials from first and last name
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @returns {string} Initials
   */
  getInitials(firstName, lastName) {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }
}

// Export singleton instance
export const memberDataService = new MemberDataService();