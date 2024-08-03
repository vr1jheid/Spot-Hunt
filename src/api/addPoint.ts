import { PointServerData } from "../Types/PointData";
import { API_URL } from "./Constants/constants";

export const addPoint = async (data: PointServerData) => {
  console.log(data);

  await fetch(
    `${API_URL}/api/park-point/add`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
};
