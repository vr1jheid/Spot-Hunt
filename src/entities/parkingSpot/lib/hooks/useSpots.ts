import { useQuery } from "@tanstack/react-query";
import { queryClient } from "shared/lib/queryClient";
import { Bounds } from "shared/model/mapTypes";

import { fetchSpots } from "../functions/fetchSpots";

export const useSpots = (bounds: Bounds | null) => {
  const { data: spots, ...queryData } = useQuery({
    queryKey: ["spots"],
    queryFn: async () => {
      if (!bounds) return [];
      return await fetchSpots(bounds);
    },
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["spots"] });

  return {
    spots,
    invalidate,
    ...queryData,
  };
};
