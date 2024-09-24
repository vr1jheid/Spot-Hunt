import { useMutation } from "@tanstack/react-query";
import { queryClient } from "shared/lib/queryClient";

import { voteForSpot } from "../api/voteForSpot";

export const useSpotVote = () => {
  const voteMutation = useMutation({
    mutationFn: voteForSpot,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["spots", id.toString()],
      });
    },
  });

  return voteMutation;
};
