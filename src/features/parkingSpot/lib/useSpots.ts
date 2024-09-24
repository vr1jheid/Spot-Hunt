import { useQuery } from "@tanstack/react-query";
import { MapTypes } from "entities/map";
import { queryClient } from "shared/lib/queryClient";

import { fetchSpots } from "../api/fetchSpots";

export const useSpots = (bounds: MapTypes.Bounds | null) => {
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
