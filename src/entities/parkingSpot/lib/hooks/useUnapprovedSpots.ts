import { useQuery } from "@tanstack/react-query";
import { queryClient } from "shared/lib/queryClient";
import { Bounds } from "shared/model/mapTypes";

import { fetchUnapprovedSpots } from "../functions/fetchUnapprovedSpots";

export const useUnapprovedSpots = (bounds: Bounds | null) => {
  const { data: spots, ...queryData } = useQuery({
    queryKey: ["unapprovedSpots"],
    queryFn: async () => {
      if (!bounds) {
        return [];
      }
      return await fetchUnapprovedSpots(bounds);
    },
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["unapprovedSpots"],
    });

  return {
    spots,
    invalidate,
    ...queryData,
  };
};
