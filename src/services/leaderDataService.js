import supabase from '../../supabase.js';
import { BaseDataService } from './baseDataService';


export class LeaderDataService extends BaseDataService {
  
  async getLeaderById(leaderId) {
    // First verify the leader is a Scout_member (per schema requirement)
    let {data: scoutMember, error: memberError} = await supabase
      .from('Scout_members')
      .select('Scout_id')
      .eq('Scout_id', leaderId)
      .maybeSingle();

    if (memberError || !scoutMember) {
      console.error('Leader is not a Scout_member:', memberError);
      return null;
    }

    let {data: Leaders, error} = await supabase
      .from('Group_Leaders')
      .select('group_leader_id, group_leader_title')
      .eq('group_leader_id', leaderId);

    if (error) {
      console.error('Error fetching leader by ID:', error);
      return null;
    }

    if (!Leaders || Leaders.length === 0) {
      return null;
    }

    let Leader = {
      leader_id: Leaders[0].group_leader_id,
      titles: Leaders.map(leader => ({
        title: leader.group_leader_title
      }))
    }

    return Leader;
  }

 
  async getLeaderSubgroupIds(leaderId) {
    // First verify the leader is a Scout_member (per schema requirement)
    let {data: scoutMember, error: memberError} = await supabase
      .from('Scout_members')
      .select('Scout_id')
      .eq('Scout_id', leaderId)
      .maybeSingle();

    if (memberError || !scoutMember) {
      console.error('Leader is not a Scout_member:', memberError);
      return null;
    }

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
    // First verify the leader is a Scout_member (per schema requirement)
    let {data: scoutMember, error: memberError} = await supabase
      .from('Scout_members')
      .select('Scout_id')
      .eq('Scout_id', leaderId)
      .maybeSingle();

    if (memberError || !scoutMember) {
      console.error('Leader is not a Scout_member:', memberError);
      return null;
    }

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
      .select(`
        Scout_id,
        date_of_membership,
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
      console.error('Error fetching members for leader subgroup:', error);
      return null;
    }

    if (!Scout_members) {
      return [];
    }

    // Flatten the nested Users data for each member
    return Scout_members.map(member => ({
      ...member,
      ...member.Users,
      Users: undefined // Remove the nested object
    }));

    }

  async getLeaderMembers(leaderId, leader_title) {
    // First verify the leader is a Scout_member (per schema requirement)
    let {data: scoutMember, error: memberError} = await supabase
      .from('Scout_members')
      .select('Scout_id')
      .eq('Scout_id', leaderId)
      .maybeSingle();

    if (memberError || !scoutMember) {
      console.error('Leader is not a Scout_member:', memberError);
      return [];
    }

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

  async getAllLeaderMembers(leaderId) {
    // First verify the leader is a Scout_member (per schema requirement)
    let {data: scoutMember, error: memberError} = await supabase
      .from('Scout_members')
      .select('Scout_id')
      .eq('Scout_id', leaderId)
      .maybeSingle();

    if (memberError || !scoutMember) {
      console.error('Leader is not a Scout_member:', memberError);
      return [];
    }

    const subgroupIds = await this.getLeaderSubgroupIds(leaderId);
    console.log('All Subgroup IDs for leader:', subgroupIds);

    if (!subgroupIds || subgroupIds.length === 0) {
      return [];
    }

    // Get members from all subgroups
    const allMembers = [];
    for (const subgroupId of subgroupIds) {
      const members = await this.getSubgroupMembers(subgroupId);
      console.log(`Members from subgroup ${subgroupId}:`, members);
      
      if (members && members.length > 0) {
        // Add subgroup info to each member
        const subgroupInfo = await this.getSubgroupInfo(subgroupId);
        console.log(`Subgroup info for ${subgroupId}:`, subgroupInfo);
        
        const membersWithSubgroup = members.map(member => ({
          ...member,
          subgroupName: subgroupInfo?.subgrp_name || 'Unknown'
        }));
        allMembers.push(...membersWithSubgroup);
      }
    }

    console.log('All members from all subgroups:', allMembers);
    return allMembers;
  }


  async getLeaderStats(leaderId, leader_title = null) {
    // First verify the leader is a Scout_member (per schema requirement)
    let {data: scoutMember, error: memberError} = await supabase
      .from('Scout_members')
      .select('Scout_id')
      .eq('Scout_id', leaderId)
      .maybeSingle();

    if (memberError || !scoutMember) {
      console.error('Leader is not a Scout_member:', memberError);
      return {
        totalMembers: 0
      };
    }

    // If no leader_title provided, use the first title from leader data
    if (!leader_title) {
      const leaderData = await this.getLeaderById(leaderId);
      leader_title = leaderData?.titles?.[0]?.title;
    }
    
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


  async formatLeaderDataWithSubgroup(leaderData, userData = null, leaderId = null) {
    if (!leaderData) return null;

    const firstName = userData?.Fname || 'Unknown';
    const lastName = userData?.Lname || 'Leader';
    const fullName = `${firstName} ${lastName}`;
    const initials = this.getInitials(firstName, lastName);

    // Get subgroup information
    let subgroupName = 'Unknown Unit';
    let subgroupId = null;
    
    if (leaderId) {
      const subgroupIds = await this.getLeaderSubgroupIds(leaderId);
      if (subgroupIds && subgroupIds.length > 0) {
        subgroupId = subgroupIds[0];
        const subgroupInfo = await this.getSubgroupInfo(subgroupId);
        if (subgroupInfo) {
          subgroupName = subgroupInfo.subgrp_name;
        }
      }
    }

    return {
      id: leaderData.leader_id,
      fullName: fullName,
      initials: initials,
      titles: leaderData.titles || [],
      primaryTitle: leaderData.titles?.[0]?.title || null,
      // Add subgroup info for accent color determination
      subgroupId: subgroupId,
      subgroupName: subgroupName,
      subgroupData: {
        id: subgroupId,
        name: subgroupName
      }
    };
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