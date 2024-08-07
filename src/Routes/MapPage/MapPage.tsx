import { MapBoxContextProvider } from "../../Components/MapBox/Context/MapBoxContextProvider";
import { Outlet } from "react-router-dom";
import { MapBox } from "../../Components/MapBox/MapBox";
import { PointsList } from "../../Components/PointsList/PointsList";
import { MapControls } from "../../Components/MapControls/MapControls";

export const MapPage = () => {
  return (
    <MapBoxContextProvider>
      <MapBox />
      <MapControls />
      <PointsList />
      <Outlet />
    </MapBoxContextProvider>
  );
};
