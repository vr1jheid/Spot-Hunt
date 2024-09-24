import { useQuery } from "@tanstack/react-query";
import { SpotTypes } from "entities/parkingSpot";

import { fetchSpotData } from "../api/fetchSpotData";

export const useSpot = (id: string) => {
  const { data: spotData, ...queryData } = useQuery<SpotTypes.SpotLocalData>({
    queryKey: ["spots", id],
    queryFn: async () => await fetchSpotData(id),
  });

  return {
    spotData,
    ...queryData,
  };
};
