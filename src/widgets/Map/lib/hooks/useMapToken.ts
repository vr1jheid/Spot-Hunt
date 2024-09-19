import { useQuery } from "@tanstack/react-query";
import mapboxgl from "mapbox-gl";
import { fetchToken } from "widgets/Map/api/fetchToken";

export const useMapToken = () => {
  const { data: token, ...queryData } = useQuery({
    queryKey: ["token"],
    queryFn: fetchToken,
  });

  if (token && !mapboxgl.accessToken) {
    mapboxgl.accessToken = token;
  }

  return { ...queryData };
};
