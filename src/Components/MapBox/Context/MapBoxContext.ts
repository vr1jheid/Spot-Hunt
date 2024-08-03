import { createContext } from "react";
import { Map } from "mapbox-gl";

export interface MapContext {
  map: Map | null;
  setMap: React.Dispatch<React.SetStateAction<Map | null>>;
}

export const MapBoxContext = createContext<MapContext>({
  map: null,
  setMap: () => {},
});
