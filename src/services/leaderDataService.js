import supabase from '../../supabase.js';
import { BaseDataService } from './baseDataService';


export class LeaderDataService extends BaseDataService {
  
  async getLeaderById(leaderId) {
    let {data: Leaders, error} = await supabase
      .from('Leaders')
      .select('leader_id, leader_title')
      .eq('leader_id', leaderId);

    if (error) {
      console.error('Error fetching leader by ID:', error);
      return null;
    }

    if (!Leaders || Leaders.length === 0) {
      return null;
    }

    let Leader = {
      leader_id: Leaders[0].leader_id,
      titles: Leaders.map(leader => ({
        title: leader.leader_title
      }))
    }

    return Leader;
  }

 
  async getLeaderSubgroupIds(leaderId) {
    let {data: Subgrp_Leaders, error} = await supabase
      .from('Subgrp_Leaders')
      .select('subgrp_id')
      .eq('leader_id', leaderId);

    if (error) {
      console.error('Error fetching leader subgroup IDs:', error);
      return null;
    }

    let subgroupIds = Subgrp_Leaders ? Subgrp_Leaders.map(sl => sl.subgrp_id) : [];

    return subgroupIds;
  }

  async getLeaderSubgroupIdByTitle(leaderId, leader_title) {
    let {data: Subgrp_Leaders, error} = await supabase
      .from('Subgrp_Leaders')
      .select('subgrp_id')
      .eq('leader_id', leaderId)
      .eq('leader_title', leader_title)
      .maybeSingle();

    if (error) {
      console.error('Error fetching leader subgroup ID:', error);
      return null;
    }

    return Subgrp_Leaders ? Subgrp_Leaders.subgrp_id : null;
  }

  async getLeaderUserInfo(leaderId) {
    let {data: user, error} = await supabase
      .from('Users')
      .select('id, Fname, Lname, city, country, phone_nb, gender, birthdate, created_at')
      .eq('id', leaderId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching leader user info:', error);
      return null;
    }

    return user;
  }

  async getSubgroupMembers(subgroupId) {
    let{data: Scout_members, error} = await supabase
      .from('Scout_members')
      .select('*')
      .eq('subgrp_id', subgroupId);

    if (error) {
      console.error('Error fetching members for leader subgroup:', error);
      return null;
    }

    return Scout_members; 
    
    }

  async getLeaderMembers(leaderId, leader_title) {
    const subgroupId = await this.getLeaderSubgroupIdByTitle(leaderId, leader_title);

    if (!subgroupId) {
      return [];
    }

    const members = await this.getSubgroupMembers(subgroupId);

    if (!members) {
      return null;
    }

    return members;
  }


  async getLeaderStats(leaderId, leader_title) {
    const members = await this.getLeaderMembers(leaderId, leader_title);

    if (!members) {
      return {
        totalMembers: 0
      };
    }

    return {
      totalMembers: members.length
    };
  }


  async getSubgroupInfo(subgroupId) {
    let {data: subgroup, error} = await supabase
      .from('Subgroups')
      .select('subgrp_id, subgrp_name, patron_saint, created_at')
      .eq('subgrp_id', subgroupId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching subgroup info:', error);
      return null;
    }

    return subgroup;
  }


  formatLeaderData(leaderData, userData = null) {
    if (!leaderData) return null;

    const firstName = userData?.Fname || 'Unknown';
    const lastName = userData?.Lname || 'Leader';
    const fullName = `${firstName} ${lastName}`;
    const initials = this.getInitials(firstName, lastName);

    return {
      id: leaderData.leader_id,
      fullName: fullName,
      initials: initials,
      titles: leaderData.titles || [],
      primaryTitle: leaderData.titles?.[0]?.title || null,
      // Add subgroup info for accent color determination
      subgroupId: leaderData.subgroupId || null,
      subgroupName: leaderData.subgroupName || 'Unknown Unit',
      subgroupData: {
        id: leaderData.subgroupId || null,
        name: leaderData.subgroupName || 'Unknown Unit'
      }
    };
  }

  
  getInitials(firstName, lastName) {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }
}

// Export singleton instance
export const leaderDataService = new LeaderDataService();