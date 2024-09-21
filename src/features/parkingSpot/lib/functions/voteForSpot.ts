import { SpotTypes } from "entities/parkingSpot";
import { getFetchOptions } from "features/parkingSpot/config/fetchOptions";

export const voteForSpot = async ({
  id,
  vote,
}: {
  id: number;
  vote: SpotTypes.VoteCode;
}) => {
  const formData = new FormData();
  formData.append("vote", vote.toString());
  formData.append("parkPointId", id.toString());

  const resp = await fetch(
    "https://cert-spothunt.playnrolls.online/api/park-point/make-vote",
    {
      body: /* formData */ JSON.stringify({
        vote: vote,
        parkPointId: id,
      }),
      headers: {
        "Content-type": "application/json",
        ...getFetchOptions().headers,
      },
      method: "POST",
    },
  );

  if (!resp.ok) {
    throw new Error("Error setting vote");
  }
  return await resp.json();
};
