import { BaseDataService } from './baseDataService';
import supabase from "../../supabase.js";

/**
 * Task Data Service - Handles all task-related data operations
 * Follows SOLID principles: Single Responsibility for task data
 */
export class TaskDataService extends BaseDataService {
  /**
   * Get all tasks belonging to a specific subgroup
   * Purpose: Retrieves all tasks from the Tasks table that are assigned to a particular subgroup
   * Frontend Display: Used to populate task lists in subgroup views, show available tasks in leader dashboard,
   *                  display task catalogs and subgroup-specific task assignments
   * @param {string} subgroupId - Subgroup's unique identifier to fetch its tasks
   * @returns {Promise<Array|null>} Array of task objects in the subgroup, or null if error occurs
   */
  async getTasksBySubgroup(subgroupId) {
    return this.fetchAll('Tasks', { subgrp_id: subgroupId });
  }

  /**
   * Get tasks belonging to a specific subgroup and level
   * Purpose: Retrieves tasks from the Tasks table that match both a subgroup and a specific level/rank
   * Frontend Display: Used to filter tasks by level in task views, show level-specific task requirements,
   *                  display progressive task lists for different scout levels within a subgroup
   * @param {string} subgroupId - Subgroup's unique identifier to filter tasks
   * @param {string} levelName - Level name (e.g., 'Cub', 'Scout', 'Venturer') to further filter tasks
   * @returns {Promise<Array|null>} Array of task objects matching the subgroup and level, or null if error occurs
   */
  async getTasksBySubgroupAndLevel(subgroupId, levelName) {
    return this.fetchAll('Tasks', { 
      subgrp_id: subgroupId,
      level_name: levelName 
    });
  }

  /**
   * Get all tasks from the Tasks table
   * Purpose: Retrieves every task in the system without any filtering
   * Frontend Display: Used for administrative views, task management interfaces, system-wide task catalogs,
   *                  and any UI component that needs to display the complete task inventory
   * @returns {Promise<Array|null>} Array of all task objects in the system, or null if error occurs
   */
  async getAllTasks() {
    return this.fetchAll('Tasks');
  }

  /**
   * Get a specific task by its composite key (subgroup, level, and task name)
   * Purpose: Retrieves a single task from the Tasks table using its composite primary key
   * Frontend Display: Used to display task details in task views, populate task edit forms, show task information
   *                  in task detail pages, and fetch specific task data for task management
   * @param {string} subgroupId - Subgroup's unique identifier
   * @param {string} levelName - Level name for the task
   * @param {string} taskName - The unique name of the task to retrieve
   * @returns {Promise<object|null>} Single task object with all task details, or null if not found or error occurs
   */
  async getTaskByKey(subgroupId, levelName, taskName) {
    let {data: task, error} = await supabase
      .from('Tasks')
      .select('*')
      .eq('subgrp_id', subgroupId)
      .eq('level_name', levelName)
      .eq('task_name', taskName)
      .maybeSingle();

    if (error) {
      console.error('Error fetching task by key:', error);
      return null;
    }

    return task;
  }

  /**
   * Add a new task to the Tasks table
   * Purpose: Creates a new task record in the database with specified properties including name, subgroup, level, description, points, and type
   * Frontend Display: Used in task creation forms, administrative task management interfaces, and any UI component
   *                  that allows leaders or administrators to create new tasks for their subgroups
   * @param {object} taskData - Task object containing taskName, subgroupId, levelName, taskDesc, points, and taskType
   * @returns {Promise<object>} Result object with success status, created task data, or error details if creation fails
   */
  async addTask(taskData) {
    try {
      const { data, error } = await supabase
        .from('Tasks')
        .insert([{
          subgrp_id: taskData.subgroupId,
          level_name: taskData.levelName,
          task_name: taskData.taskName,
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
   * Get task statistics for a specific subgroup
   * Purpose: Calculates and aggregates task statistics including total tasks and counts by status (not-started, in-progress, pending, complete, verified)
   * Frontend Display: Used to display task progress dashboards, show completion statistics, populate progress charts,
   *                  and provide task status summaries in leader and member dashboards
   * @param {string} subgroupId - Subgroup's unique identifier to calculate task statistics for
   * @returns {Promise<object>} Statistics object with total, notStarted, inProgress, pending, complete, and verified counts
   */
  async getTaskStats(subgroupId) {
    // Get total tasks available in the subgroup
    const tasks = await this.getTasksBySubgroup(subgroupId);

    if (!tasks) {
      return {
        total: 0,
        notStarted: 0,
        inProgress: 0,
        pending: 0,
        complete: 0
  
      };
    }

    // Get task progress data for the subgroup
    let {data: progress, error} = await supabase
      .from('Task_Scout_Progress')
      .select('task_status')
      .eq('subgrp_id', subgroupId);

    if (error) {
      console.error('Error fetching task progress for stats:', error);
      // Return just the total task count if progress query fails
      return {
        total: tasks.length,
        notStarted: 0,
        inProgress: 0,
        pending: 0,
        complete: 0
      };
    }

    const progressArray = progress || [];

    return {
      total: tasks.length,
      notStarted: progressArray.filter(p => p.task_status === 'not-started').length,
      inProgress: progressArray.filter(p => p.task_status === 'in-progress').length,
      pending: progressArray.filter(p => p.task_status === 'pending').length,
      complete: progressArray.filter(p => p.task_status === 'complete').length,
      verified: progressArray.filter(p => p.task_status === 'verified').length
    };
  }

  /**
   * Update task progress for a specific scout
   * Purpose: Updates the status of a task for a specific scout in the Task_Scout_Progress table
   * Frontend Display: Used to update task completion status in member dashboard, progress tracking,
   *                  and achievement status updates
   * @param {string} scoutId - Scout's unique identifier
   * @param {string} subgroupId - Subgroup's unique identifier
   * @param {string} levelName - Level name for the task
   * @param {string} taskName - Task name
   * @param {string} taskStatus - New task status (not-started, in-progress, pending, complete, verified)
   * @returns {Promise<object>} Result object with success status or error details
   */
  async updateTaskProgress(scoutId, subgroupId, levelName, taskName, taskStatus) {
    try {
      const { data, error } = await supabase
        .from('Task_Scout_Progress')
        .upsert([{
          scout_id: scoutId,
          subgrp_id: subgroupId,
          level_name: levelName,
          task_name: taskName,
          task_status: taskStatus
        }], {
          onConflict: 'scout_id,subgrp_id,level_name,task_name'
        });

      if (error) {
        console.error("Error updating task progress:", error);
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
      console.error("Unexpected error updating task progress:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred."
      };
    }
  }

  /**
   * Format raw task data for frontend display
   * Purpose: Transforms raw database task data into a standardized format suitable for UI components,
   *          renaming database fields to more user-friendly property names
   * Frontend Display: Used to prepare task data for display in task cards, task lists, detail views,
   *                  progress trackers, and any UI component that shows task information
   * @param {object} taskData - Raw task data object from database queries
   * @param {object} progressData - Optional progress data from Task_Scout_Progress table
   * @returns {object} Formatted task object with composite key fields, name, description, points, level, type, status, and subgroupId
   *                   for consistent frontend display
   */
  formatTaskData(taskData, progressData = null) {
    if (!taskData) return null;

    return {
      // Composite key fields
      subgroupId: taskData.subgrp_id,
      levelName: taskData.level_name,
      taskName: taskData.task_name,
      // User-friendly fields
      name: taskData.task_name,
      description: taskData.task_desc,
      points: taskData.points,
      level: taskData.level_name,
      type: taskData.task_type,
      // Status from progress data if available
      status: progressData?.task_status || 'not-started',
      createdAt: taskData.created_at
    };
  }
}

// Export singleton instance
export const taskDataService = new TaskDataService();