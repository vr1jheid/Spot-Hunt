import { getFetchOptions } from "entities/parkingSpot/config/fetchOptions";
import { VoteCode } from "shared/api/types";

export const voteForSpot = async ({
  id,
  vote,
}: {
  id: number;
  vote: VoteCode;
}) => {
  const formData = new FormData();
  formData.append("vote", vote.toString());
  formData.append("parkPointId", id.toString());
  console.log(
    JSON.stringify({
      vote: vote,
      parkPointId: id,
    }),
  );

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
