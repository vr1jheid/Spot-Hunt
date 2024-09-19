import { useQuery } from "@tanstack/react-query";
import { SpotLocalData } from "shared/model/spotTypes";

import { fetchSpotData } from "../functions/fetchSpotData";

export const useSpot = (id: string) => {
  const { data: spotData, ...queryData } = useQuery<SpotLocalData>({
    queryKey: ["spots", id],
    queryFn: async () => await fetchSpotData(id),
  });

  return {
    spotData,
    ...queryData,
  };
};
