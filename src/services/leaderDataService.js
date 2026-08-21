import { BaseDataService } from './baseDataService';

/**
 * Leader Data Service - Handles all leader-related data operations
 * Follows SOLID principles: Single Responsibility for leader data
 */
export class LeaderDataService extends BaseDataService {
  /**
   * Get leader by ID
   * @param {string} leaderId - Leader ID
   * @returns {Promise<object|null>} Leader data or null
   */
  async getLeaderById(leaderId) {
    const data = await this.fetchAll('Leaders', { leader_id: leaderId });
    
    if (!data || !data.length) {
      return null;
    }

    // Combine all titles from matching records
    const titles = data
      .map(row => row.leader_title)
      .filter(title => title != null && title !== '');

    return {
      id: data[0].leader_id,
      titles: titles.length > 0 ? titles : ['N/A'],
      primaryTitle: titles.length > 0 ? titles[0] : 'N/A',
      dateOfRoleAcquisition: data[0].date_of_role_acquisition
    };
  }

  /**
   * Get leader's subgroup ID
   * @param {string} leaderId - Leader ID
   * @returns {Promise<string|null>} Subgroup ID or null
   */
  async getLeaderSubgroupId(leaderId) {
    const data = await this.fetchOne('Subgrp_Leaders', { leader_id: leaderId }, 'subgrp_id');
    
    if (!data) {
      return null;
    }

    return data.subgrp_id;
  }

  /**
   * Get all members in leader's subgroup
   * @param {string} leaderId - Leader ID
   * @returns {Promise<Array|null>} Members or null
   */
  async getLeaderMembers(leaderId) {
    const subgroupId = await this.getLeaderSubgroupId(leaderId);
    
    if (!subgroupId) {
      return [];
    }

    return this.fetchAll('Scout_members', { subgrp_id: subgroupId });
  }

  /**
   * Get leader statistics
   * @param {string} leaderId - Leader ID
   * @returns {Promise<object>} Leader statistics
   */
  async getLeaderStats(leaderId) {
    const members = await this.getLeaderMembers(leaderId);
    
    if (!members) {
      return {
        totalMembers: 0,
        activeMembers: 0,
        totalHonorPoints: 0,
        totalServiceHours: 0
      };
    }

    const activeMembers = members.filter(member => 
      member.active_status === 'active'
    ).length;

    // This would ideally come from database aggregation
    const totalHonorPoints = members.reduce((sum, member) => sum + (member.honor_points || 0), 0);
    const totalServiceHours = members.reduce((sum, member) => sum + (member.service_hours || 0), 0);

    return {
      totalMembers: members.length,
      activeMembers,
      totalHonorPoints,
      totalServiceHours
    };
  }

  /**
   * Format leader data for display
   * @param {object} leaderData - Raw leader data
   * @returns {object} Formatted leader data
   */
  formatLeaderData(leaderData) {
    if (!leaderData) return null;

    return {
      id: leaderData.id,
      fullName: 'Leader Name', // This would come from a user table in a real system
      initials: 'LN', // This would be calculated from user data
      titles: leaderData.titles,
      primaryTitle: leaderData.primaryTitle,
      dateOfRoleAcquisition: leaderData.dateOfRoleAcquisition,
      // Add subgroup info for accent color determination
      subgroupId: leaderData.subgroupId || null,
      subgroupName: leaderData.subgroupName || 'Unknown Unit',
      subgroupData: {
        id: leaderData.subgroupId || null,
        name: leaderData.subgroupName || 'Unknown Unit'
      }
    };
  }
}

// Export singleton instance
export const leaderDataService = new LeaderDataService();