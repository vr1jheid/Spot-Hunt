import { SpotDataToSend, SpotServerData } from "../Types/SpotTypes";
import { API_URL } from "./Constants/constants";
import { getFetchOptions } from "./Options/fetchOptions";

export const addSpot = async (data: SpotDataToSend) => {
  const response = await fetch(
    `${API_URL}/api/park-point/add`,

    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        ...getFetchOptions().headers,
      },
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
