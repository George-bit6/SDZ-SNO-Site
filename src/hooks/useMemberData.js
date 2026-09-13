import { useQuery } from "@tanstack/react-query";
import { memberDataService } from "@/services/memberDataService";
import {useParams} from "react-router-dom";

export const useMemberData = () => {
  const { memberId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["memberData", memberId],
    queryFn: async () => {
      const member = await memberDataService.getMemberById(memberId);
      if (!member) {
        return null;
      }

      const tasks = await memberDataService.getMemberTaskProgress(memberId);
      const scores = await memberDataService.getMemberTaskScore(memberId);

      return {
        ...memberDataService.formatMemberData(member),
        tasks: tasks || [],
        scores: scores || { total_points: 0, badges: 0, service_hours: 0 }
      };
    },
    enabled: !!memberId,
  });

  return { data, isLoading, error };
};