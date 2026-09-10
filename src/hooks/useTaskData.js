import { useQuery } from "@tanstack/react-query";
import { taskDataService } from "@/services/taskDataService";

export const useTasksBySubgroup = (subgroupId) => {
  const { data, isLoading, error } = useQuery(
    ["tasksBySubgroup", subgroupId],
    async () => {
      const tasks = await taskDataService.getTasksBySubgroup(subgroupId);
      const stats = await taskDataService.getTaskStats(subgroupId);
      return {
        tasks: tasks || [],
        stats: stats || { total: 0, notStarted: 0, inProgress: 0, pending: 0, complete: 0, verified: 0 }
      };
    },
    {
      enabled: !!subgroupId,
    }
  );

  return { data, isLoading, error };
};

export const useTasksBySubgroupAndLevel = (subgroupId, levelName) => {
  const { data, isLoading, error } = useQuery(
    ["tasksBySubgroupAndLevel", subgroupId, levelName],
    async () => {
      const tasks = await taskDataService.getTasksBySubgroupAndLevel(subgroupId, levelName);
      return tasks || [];
    },
    {
      enabled: !!subgroupId && !!levelName,
    }
  );

  return { data, isLoading, error };
};

export const useTaskByKey = (subgroupId, levelName, taskName) => {
  const { data, isLoading, error } = useQuery(
    ["taskByKey", subgroupId, levelName, taskName],
    async () => {
      const task = await taskDataService.getTaskByKey(subgroupId, levelName, taskName);
      return task;
    },
    {
      enabled: !!subgroupId && !!levelName && !!taskName,
    }
  );

  return { data, isLoading, error };
};

export const useAllTasks = () => {
  const { data, isLoading, error } = useQuery(
    ["allTasks"],
    async () => {
      const tasks = await taskDataService.getAllTasks();
      return tasks || [];
    },
    {
      enabled: true, // Always enabled since no parameters
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  return { data, isLoading, error };
};