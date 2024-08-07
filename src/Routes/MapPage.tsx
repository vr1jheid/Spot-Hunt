import { MapBoxContextProvider } from "../Components/MapBox/Context/MapBoxContextProvider";
import { Outlet } from "react-router-dom";
import { MapBox } from "../Components/MapBox/MapBox";
import { PointsList } from "../Components/PointsList/PointsList";

export const MapPage = () => {
  return (
    <MapBoxContextProvider>
      <MapBox />
      <PointsList />
      <Outlet />
    </MapBoxContextProvider>
  );
};
