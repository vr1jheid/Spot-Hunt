import { Map } from "mapbox-gl";
import { createContext } from "react";

export interface MapContext {
  map: Map | null;
  setMap: React.Dispatch<React.SetStateAction<Map | null>>;
}

export const MapBoxContext = createContext<MapContext>({
  map: null,
  setMap: () => {},
});
