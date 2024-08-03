import { API_URL } from "./Constants/constants";

export const getAllPoints = async () => {
  const response = await fetch(`${API_URL}/api/park-point/`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const data = await response.json();
  if (data.code !== 200) {
    throw new Error(`Error getting data. Code ${data.code}`);
  }
  return data.data;
};
