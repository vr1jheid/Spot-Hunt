import { SpotTypes } from "entities/parkingSpot";
import { getFetchOptions } from "features/parkingSpot/config/fetchOptions";
import { API_URL } from "shared/api/constants";

export const addSpot = async (data: SpotTypes.SpotDataToSend) => {
  const response = await fetch(
    `${API_URL}/api/park-point/add`,

    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        ...getFetchOptions().headers,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error adding new point. Server error");
  }
  const responseJson = (await response.json()) as {
    code: number;
    data: SpotTypes.SpotServerData;
    status: string;
  };

  return responseJson;
};
