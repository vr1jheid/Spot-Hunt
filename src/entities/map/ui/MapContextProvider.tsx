import { Map } from "mapbox-gl";
import { memo, ReactNode, useRef } from "react";

import { MapContext } from "../../map/config/MapContext";

export const MapContextProvider = memo(
  ({ children }: { children: ReactNode }) => {
    const mapRef = useRef<Map | null>(null);
    return (
      <MapContext.Provider value={{ mapRef }}>{children}</MapContext.Provider>
    );
  },
);
