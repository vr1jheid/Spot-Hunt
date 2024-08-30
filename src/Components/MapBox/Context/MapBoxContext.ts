import { Map, Marker } from "mapbox-gl";
import { createContext, MutableRefObject } from "react";

export interface MapContext {
  tempPointMarker: MutableRefObject<Marker | null>;
  mapRef: MutableRefObject<Map | null>;
}

export const MapBoxContext = createContext<MapContext>({
  tempPointMarker: {} as MutableRefObject<Marker | null>,
  mapRef: {} as MutableRefObject<Map | null>,
});
