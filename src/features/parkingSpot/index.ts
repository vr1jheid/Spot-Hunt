import { addPhotoToSpot } from "./lib/functions/addPhotoToSpot";
import { addSpot } from "./lib/functions/addSpot";
import { fetchSpotData } from "./lib/functions/fetchSpotData";
import { fetchSpots } from "./lib/functions/fetchSpots";
import { fetchUnapprovedSpots } from "./lib/functions/fetchUnapprovedSpots";
import { invalidateSpots } from "./lib/functions/invalidateSpots";
import { voteForSpot } from "./lib/functions/voteForSpot";

export const spotsAPI = {
  fetchSpotData,
  fetchSpots,
  fetchUnapprovedSpots,
  voteForSpot,
  addSpot,
  addPhotoToSpot,
  invalidateSpots,
};

export { useCreateSpot } from "./lib/hooks/useCreateSpot";
export { useSpot } from "./lib/hooks/useSpot";
export { useSpots } from "./lib/hooks/useSpots";
export { useSpotVote } from "./lib/hooks/useSpotVote";
export { useUnapprovedSpots } from "./lib/hooks/useUnapprovedSpots";
