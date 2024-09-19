import { Loader } from "@mantine/core";
import { MapContextProvider } from "entities/MapContext";
import { Outlet } from "react-router-dom";
import { AppMenu } from "widgets/AppMenu/AppMenu";
import { Map } from "widgets/Map";
import { useMapToken } from "widgets/Map/lib/hooks/useMapToken";
import { SpotsBottomSheet } from "widgets/SpotsBottomSheet";

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
      <Outlet />
    </MapContextProvider>
  );
};
