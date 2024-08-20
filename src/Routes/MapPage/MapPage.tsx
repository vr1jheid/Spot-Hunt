import { Outlet } from "react-router-dom";

import { MapBoxContextProvider } from "../../Components/MapBox/Context/MapBoxContextProvider";
import { MapBox } from "../../Components/MapBox/MapBox";
import { MapControls } from "../../Components/MapControls/MapControls";
import { PointsSheet } from "../../Components/PointsSheet/PointsSheet";

export const MapPage = () => {
  return (
    <MapBoxContextProvider>
      <MapBox />
      <MapControls />
      <PointsSheet />

      <Outlet />
    </MapBoxContextProvider>
  );
};
