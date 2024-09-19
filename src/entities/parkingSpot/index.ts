import { addPhotoToSpot } from "./lib/functions/addPhotoToSpot";
import { addSpot } from "./lib/functions/addSpot";
import { fetchSpotData } from "./lib/functions/fetchSpotData";
import { fetchSpots } from "./lib/functions/fetchSpots";
import { fetchUnapprovedSpots } from "./lib/functions/fetchUnapprovedSpots";
import { voteForSpot } from "./lib/functions/voteForSpot";

export const spotsAPI = {
  fetchSpotData,
  fetchSpots,
  fetchUnapprovedSpots,
  voteForSpot,
  addSpot,
  addPhotoToSpot,
};

export { useSpots } from "./lib/hooks/useSpots";
