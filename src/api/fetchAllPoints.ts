import { PointServerData } from "../Types/PointData";
import { API_URL } from "./Constants/constants";

export const fetchAllPoints = async () => {
  const response = await fetch(`${API_URL}/api/park-point/`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  if (!response.ok) {
    throw new Error("Api response error");
  }
  const data = await response.json();
  return data.data.items as PointServerData[];
};
