import { API_URL } from "shared/api/constants";
import { ServerResponse } from "shared/api/types";
import { convertCoordsToLocal } from "shared/lib/convertCoordsToLocal";
import { Bounds } from "shared/model/mapTypes";
import { SpotServerBrief } from "shared/model/spotTypes";

import { getFetchOptions } from "../../config/fetchOptions";

export const fetchUnapprovedSpots = async (bounds: Bounds) => {
  const url = new URL(`${API_URL}/api/park-point/vote-list`);
  Object.entries(bounds).forEach(([name, value]) => {
    url.searchParams.set(name, value);
  });

  const resp = await fetch(url, getFetchOptions());
  if (!resp.ok) {
    throw new Error("Error fetching unapproved spots");
  }
  const { data } = (await resp.json()) as ServerResponse<{
    items: SpotServerBrief[];
  }>;
  return data.items.map((s) => ({
    ...s,
    coordinates: convertCoordsToLocal(s.coordinates),
  }));
};
