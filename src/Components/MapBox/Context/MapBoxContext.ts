import { Map } from "mapbox-gl";
import { createContext, MutableRefObject } from "react";

export interface MapContext {
  mapRef: MutableRefObject<Map | null>;
}

export const MapBoxContext = createContext<MapContext>({
  mapRef: {} as MutableRefObject<Map | null>,
});
