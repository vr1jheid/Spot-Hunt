import { API_URL } from "./Constants/constants";

export const fetchToken = async () => {
  const resp = await fetch(`${API_URL}/api/config/all`);
  if (!resp.ok) {
    throw new Error("Error fetching token");
  }
  const { data, status } = (await resp.json()) as {
    data: { mapbox: string };
    status: string;
    code: number;
  };

  if (status !== "success") {
    throw new Error(status);
  }

  return data.mapbox;
};
