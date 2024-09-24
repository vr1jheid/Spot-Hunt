import { Loader } from "@mantine/core";
import { MapContextProvider } from "entities/map";
import { Outlet } from "react-router-dom";
import { AppMenu } from "widgets/AppMenu";
import { Map, useMapToken } from "widgets/Map";
import { SpotsBottomSheet } from "widgets/SpotsBottomSheet";

import { Controls } from "./Controls";

export const MapPage = () => {
  const { isLoading } = useMapToken();

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
      <Controls />
      <Outlet />
    </MapContextProvider>
  );
};
