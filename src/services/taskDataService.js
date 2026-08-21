import { BaseDataService } from './baseDataService';
import supabase from "../../supabase";

/**
 * Task Data Service - Handles all task-related data operations
 * Follows SOLID principles: Single Responsibility for task data
 */
export class TaskDataService extends BaseDataService {
  /**
   * Get tasks by subgroup
   * @param {string} subgroupId - Subgroup ID
   * @returns {Promise<Array|null>} Tasks or null
   */
  async getTasksBySubgroup(subgroupId) {
    return this.fetchAll('Tasks', { subgrp_id: subgroupId });
  }

  /**
   * Get tasks by subgroup and level
   * @param {string} subgroupId - Subgroup ID
   * @param {string} levelName - Level name
   * @returns {Promise<Array|null>} Tasks or null
   */
  async getTasksBySubgroupAndLevel(subgroupId, levelName) {
    return this.fetchAll('Tasks', { 
      subgrp_id: subgroupId,
      level_name: levelName 
    });
  }

  /**
   * Get all tasks
   * @returns {Promise<Array|null>} All tasks or null
   */
  async getAllTasks() {
    return this.fetchAll('Tasks');
  }

  /**
   * Get task by name
   * @param {string} taskName - Task name
   * @returns {Promise<object|null>} Task or null
   */
  async getTaskByName(taskName) {
    return this.fetchOne('Tasks', { task_name: taskName });
  }

  /**
   * Add new task
   * @param {object} taskData - Task data
   * @returns {Promise<object>} Result
   */
  async addTask(taskData) {
    try {
      const { data, error } = await supabase
        .from('Tasks')
        .insert([{
          task_name: taskData.taskName,
          subgrp_id: taskData.subgroupId,
          level_name: taskData.levelName,
          task_desc: taskData.taskDesc,
          points: taskData.points,
          task_type: taskData.taskType
        }]);

      if (error) {
        console.error("Error adding task:", error);
        return {
          success: false,
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error("Unexpected error adding task:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred."
      };
    }
  }

  /**
   * Get task statistics
   * @param {string} subgroupId - Subgroup ID
   * @returns {Promise<object>} Task statistics
   */
  async getTaskStats(subgroupId) {
    const tasks = await this.getTasksBySubgroup(subgroupId);
    
    if (!tasks) {
      return {
        total: 0,
        notStarted: 0,
        inProgress: 0,
        pending: 0,
        complete: 0,
        verified: 0
      };
    }

    return {
      total: tasks.length,
      notStarted: tasks.filter(t => t.task_status === 'not-started').length,
      inProgress: tasks.filter(t => t.task_status === 'in-progress').length,
      pending: tasks.filter(t => t.task_status === 'pending').length,
      complete: tasks.filter(t => t.task_status === 'complete').length,
      verified: tasks.filter(t => t.task_status === 'verified').length
    };
  }

  /**
   * Format task data for display
   * @param {object} taskData - Raw task data
   * @returns {object} Formatted task data
   */
  formatTaskData(taskData) {
    if (!taskData) return null;

    return {
      id: taskData.task_id || taskData.id,
      name: taskData.task_name,
      description: taskData.task_desc,
      points: taskData.points,
      level: taskData.level_name,
      type: taskData.task_type,
      status: taskData.task_status || 'not-started',
      subgroupId: taskData.subgrp_id
    };
  }
}

// Export singleton instance
export const taskDataService = new TaskDataService();