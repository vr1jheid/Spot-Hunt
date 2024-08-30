import { Map, Marker } from "mapbox-gl";
import { memo, ReactNode, useRef } from "react";

import { MapBoxContext } from "./MapBoxContext";

export const MapBoxContextProvider = memo(
  ({ children }: { children: ReactNode }) => {
    const tempPointMarker = useRef<Marker | null>(null);
    const mapRef = useRef<Map | null>(null);
    return (
      <MapBoxContext.Provider value={{ tempPointMarker, mapRef }}>
        {children}
      </MapBoxContext.Provider>
    );
  }
);
