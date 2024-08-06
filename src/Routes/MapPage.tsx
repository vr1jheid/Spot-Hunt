import { MapBoxContextProvider } from "../Components/MapBox/Context/MapBoxContextProvider";
import { Outlet } from "react-router-dom";
import { MapBox } from "../Components/MapBox/MapBox";

export const MapPage = () => {
  return (
    <MapBoxContextProvider>
      <MapBox />
      <Outlet />
    </MapBoxContextProvider>
  );
};
