import { SpotDataToSend, SpotServerData } from "../Types/SpotTypes";
import { API_URL, tgFakeUser } from "./Constants/constants";

export const addSpot = async (data: SpotDataToSend) => {
  const response = await fetch(
    `${API_URL}/api/park-point/add`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "tt-auth-token": tgFakeUser,
      },
      body: JSON.stringify(data),
    }
  );
  console.log(response);

  if (!response.ok) {
    throw new Error("Error adding new point. Server error");
  }
  const responseJson = (await response.json()) as {
    code: number;
    data: SpotServerData;
    status: string;
  };
  console.log(responseJson);

  return responseJson;
};
