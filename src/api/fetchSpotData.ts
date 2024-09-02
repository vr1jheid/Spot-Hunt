import { useUserStore } from "../Store/userStore";
import { SpotLocalData, SpotServerData } from "../Types/SpotTypes";
import { convertCoordsToLocal } from "../Utils/convertCoordsToLocal";
import { API_URL } from "./Constants/constants";
import { ServerResponse, VoteInfo } from "./Types/types";

export const fetchSpotData = async (
  id: number | string
): Promise<SpotLocalData> => {
  console.log("fetching spot", id);
  const { id: userID } = useUserStore.getState();
  if (!userID) {
    console.error("Can`t get user id");
    throw new Error("Can`t get user id");
  }

  const fetchOptions = {
    headers: {
      "tt-auth-token": userID,
    },
  };

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
  console.log(voteData.vote);

  if (voteData.vote) {
    spotData.voteCode = voteData.vote;
  }

  return spotData;
};
