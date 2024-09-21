import { SpotTypes } from "entities/parkingSpot";
import { API_URL } from "shared/api/constants";
import { ServerResponse } from "shared/api/types";
import { convertCoordsToLocal } from "shared/lib/convertCoordsToLocal";

import { getFetchOptions } from "../../config/fetchOptions";

export const fetchSpotData = async (
  id: number | string,
): Promise<SpotTypes.SpotLocalData> => {
  const fetchOptions = getFetchOptions();

  const resp = await fetch(`${API_URL}/api/park-point/${id}`, fetchOptions);
  if (!resp.ok) {
    throw new Error("Error fetching point data");
  }

  const { data } =
    (await resp.json()) as ServerResponse<SpotTypes.SpotServerData>;

  const spotData: SpotTypes.SpotLocalData = {
    ...data,
    coordinates: convertCoordsToLocal(data.coordinates),
    voteCode: -1,
  };

  const voteInfo = await fetch(
    `${API_URL}/api/park-point/vote-status/${id}`,
    fetchOptions,
  );

  if (!voteInfo.ok) {
    return spotData;
  }

  const { data: voteData } =
    (await voteInfo.json()) as ServerResponse<SpotTypes.VoteInfo>;

  if (voteData.vote) {
    spotData.voteCode = voteData.vote;
  }

  return spotData;
};
