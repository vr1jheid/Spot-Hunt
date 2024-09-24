import { Bounds } from "entities/map/model/map.types";
import { SpotTypes } from "entities/parkingSpot";
import { useUserStore } from "entities/user";
import { API_URL } from "shared/api/constants";
import { ServerResponse } from "shared/api/types";
import { convertCoordsToLocal } from "shared/lib/convertCoordsToLocal";

import { getFetchOptions } from "../config/fetchOptions";

export const fetchSpots = async (
  bounds: Bounds,
): Promise<SpotTypes.SpotLocalBrief[]> => {
  console.log(bounds);

  const { id: userID } = useUserStore.getState();
  if (!userID) {
    throw new Error("Can`t get user id");
  }
  const urls = {
    byFilter: new URL(`${API_URL}/api/park-point/`),
    voted: new URL(`${API_URL}/api/park-point/voted-list`),
  };

  const fetchOptions = getFetchOptions();

  Object.entries(bounds).forEach(([name, value]) => {
    Object.values(urls).forEach((url) => url.searchParams.set(name, value));
  });

  const filterResp = await fetch(urls.byFilter, fetchOptions);
  const votedResp = await fetch(urls.voted, fetchOptions);

  if (!filterResp.ok) {
    throw new Error("Error getting spots by filter");
  }
  if (!votedResp.ok) {
    throw new Error("Error getting voted spots");
  }

  const { data: filterRespData } = (await filterResp.json()) as ServerResponse<{
    items: SpotTypes.SpotServerBrief[];
  }>;
  const { data: votedRespData } = (await votedResp.json()) as ServerResponse<{
    items: SpotTypes.SpotServerBrief[];
  }>;

  const votedSpots = votedRespData.items.map((s) => ({
    ...s,
    isApproved: true,
  }));
  const spotsByFilter = filterRespData.items.filter(
    (byFilter) => !votedSpots.find(({ id }) => id === byFilter.id),
  );

  const spots = [...spotsByFilter, ...votedSpots].map((p) => ({
    ...p,
    coordinates: convertCoordsToLocal(p.coordinates),
  }));
  console.log(spots);

  return spots;
};
