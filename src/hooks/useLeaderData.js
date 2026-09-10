import { useQuery } from "@tanstack/react-query";
import { leaderDataService } from "@/services/leaderDataService";
import {useParams} from "react-router-dom";

export const useLeaderData = () => {
  const { leaderId } = useParams();

  const { data, isLoading, error } = useQuery(
    ["leaderData", leaderId],
    async () => {
      const leader = await leaderDataService.getLeaderById(leaderId);
      const user = await leaderDataService.getLeaderUserInfo(leaderId);
      return leaderDataService.formatLeaderData(leader, user);
    },
    {
      enabled: !!leaderId,
    }
  );

  return { data, isLoading, error };
};