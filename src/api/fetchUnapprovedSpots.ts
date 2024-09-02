import { SpotServerBrief } from "../Types/SpotTypes";
import { convertCoordsToLocal } from "../Utils/convertCoordsToLocal";
import { API_URL } from "./Constants/constants";
import { getFetchOptions } from "./Options/fetchOptions";
import { ServerResponse } from "./Types/types";

export const fetchUnapprovedSpots = async (params: {
  [key in string]: string;
}) => {
  const url = new URL(`${API_URL}/api/park-point/vote-list`);
  Object.entries(params).forEach(([name, value]) => {
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
