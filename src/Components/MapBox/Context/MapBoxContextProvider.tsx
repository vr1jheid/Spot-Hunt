import { Map } from "mapbox-gl";
import { memo, ReactNode, useRef } from "react";

import { MapBoxContext } from "./MapBoxContext";

export const MapBoxContextProvider = memo(
  ({ children }: { children: ReactNode }) => {
    const mapRef = useRef<Map | null>(null);
    return (
      <MapBoxContext.Provider value={{ mapRef }}>
        {children}
      </MapBoxContext.Provider>
    );
  }
);
