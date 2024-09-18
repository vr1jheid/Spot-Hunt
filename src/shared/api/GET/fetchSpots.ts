import { convertCoordsToLocal } from "../../shared/lib/convertCoordsToLocal";
import { SpotLocalBrief, SpotServerBrief } from "../../shared/model/spotTypes";
import { useUserStore } from "../../shared/Store/userStore";
import { API_URL } from "../Constants/constants";
import { getFetchOptions } from "../Options/fetchOptions";
import { ServerResponse } from "../Types/types";

interface Props {
  params: { [key in string]: string };
}

export const fetchSpots = async ({
  params,
}: Props): Promise<SpotLocalBrief[]> => {
  const { id: userID } = useUserStore.getState();
  if (!userID) {
    console.error("Can`t get user id");
    throw new Error("Can`t get user id");
  }
  const urls = {
    byFilter: new URL(`${API_URL}/api/park-point/`),
    voted: new URL(`${API_URL}/api/park-point/voted-list`),
  };

  const fetchOptions = getFetchOptions();

  Object.entries(params).forEach(([name, value]) => {
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
    items: SpotServerBrief[];
  }>;
  const { data: votedRespData } = (await votedResp.json()) as ServerResponse<{
    items: SpotServerBrief[];
  }>;

  const spotsByFilter = filterRespData.items;
  const votedSpots = votedRespData.items.filter(
    (voted) => !filterRespData.items.find(({ id }) => id === voted.id),
  );

  console.log("park-point", spotsByFilter);
  console.log("voted", votedRespData);

  const spots = [...spotsByFilter, ...votedSpots].map((p) => ({
    ...p,
    coordinates: convertCoordsToLocal(p.coordinates),
  }));

  return spots;
};
