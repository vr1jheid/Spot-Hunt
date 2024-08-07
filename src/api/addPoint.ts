import { PointDataToSend } from "../Types/PointData";
import { API_URL } from "./Constants/constants";

export const addPoint = async (data: PointDataToSend) => {
  console.log(data);

  const response = await fetch(
    `${API_URL}/api/park-point/add`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Error adding new point. Server error");
  }
};
