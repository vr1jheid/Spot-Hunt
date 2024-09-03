import { SpotLocalData, SpotServerData } from "../../Types/SpotTypes";
import { convertCoordsToLocal } from "../../Utils/convertCoordsToLocal";
import { API_URL } from "../Constants/constants";
import { getFetchOptions } from "../Options/fetchOptions";
import { ServerResponse, VoteInfo } from "../Types/types";

export const fetchSpotData = async (
  id: number | string
): Promise<SpotLocalData> => {
  console.log("fetching spot", id);
  const fetchOptions = getFetchOptions();

  const resp = await fetch(`${API_URL}/api/park-point/${id}`, fetchOptions);
  if (!resp.ok) {
    throw new Error("Error fetching point data");
  }

  const { data } = (await resp.json()) as ServerResponse<SpotServerData>;

  const spotData: SpotLocalData = {
    ...data,
    coordinates: convertCoordsToLocal(data.coordinates),
    voteCode: -1,
  };

  const voteInfo = await fetch(
    `${API_URL}/api/park-point/vote-status/${id}`,
    fetchOptions
  );

  if (!voteInfo.ok) {
    return spotData;
  }

  const { data: voteData } =
    (await voteInfo.json()) as ServerResponse<VoteInfo>;

  if (voteData.vote) {
    spotData.voteCode = voteData.vote;
  }

  return spotData;
};
