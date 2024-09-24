import { addPhotoToSpot } from "./api/addPhotoToSpot";
import { addSpot } from "./api/addSpot";
import { fetchSpotData } from "./api/fetchSpotData";
import { fetchSpots } from "./api/fetchSpots";
import { fetchUnapprovedSpots } from "./api/fetchUnapprovedSpots";
import { invalidateSpot } from "./api/invalidateSpot";
import { invalidateSpots } from "./api/invalidateSpots";
import { voteForSpot } from "./api/voteForSpot";

export const spotsAPI = {
  fetchSpotData,
  fetchSpots,
  fetchUnapprovedSpots,
  voteForSpot,
  addSpot,
  addPhotoToSpot,
  invalidateSpots,
  invalidateSpot,
};

export { useCreateSpot } from "./lib/useCreateSpot";
export { useSpot } from "./lib/useSpot";
export { useSpots } from "./lib/useSpots";
export { useSpotVote } from "./lib/useSpotVote";
export { useUnapprovedSpots } from "./lib/useUnapprovedSpots";
