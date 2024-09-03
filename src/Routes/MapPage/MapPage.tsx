import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import mapboxgl from "mapbox-gl";
import { Outlet } from "react-router-dom";

import { fetchToken } from "../../api/GET/fetchToken";
import { MapBoxContextProvider } from "../../Components/MapBox/Context/MapBoxContextProvider";
import { MapBox } from "../../Components/MapBox/MapBox";
import { MapControls } from "../../Components/MapControls/MapControls";
import { Menu } from "../../Components/Menu/Menu";
import { SpotsBottomSheet } from "../../Components/SpotsBottomSheet/SpotsBottomSheet";

export const MapPage = () => {
  const { data: token, isLoading } = useQuery({
    queryKey: ["token"],
    queryFn: fetchToken,
  });

  if (token && !mapboxgl.accessToken) {
    mapboxgl.accessToken = token;
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader color="cyan" size="xl" type="bars" />
      </div>
    );
  }

  return (
    <MapBoxContextProvider>
      <MapBox />
      <MapControls />
      <SpotsBottomSheet />
      <Menu />
      <Outlet />
    </MapBoxContextProvider>
  );
};
