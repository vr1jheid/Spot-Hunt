import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MapContextProvider } from "entities/MapContext";
import mapboxgl from "mapbox-gl";
import { Outlet } from "react-router-dom";
import { AppMenu } from "widgets/AppMenu/AppMenu";
import { Map } from "widgets/Map";
import { SpotsBottomSheet } from "widgets/SpotsBottomSheet";

import { fetchToken } from "../../../api/GET/fetchToken";

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
    <MapContextProvider>
      <Map />

      <SpotsBottomSheet />
      <AppMenu />
      <Outlet />
    </MapContextProvider>
  );
};
