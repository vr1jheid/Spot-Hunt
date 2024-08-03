import { memo, ReactNode, useState } from "react";
import { MapBoxContext } from "./MapBoxContext";
import { Map } from "mapbox-gl";

export const MapBoxContextProvider = memo(
  ({ children }: { children: ReactNode }) => {
    const [map, setMap] = useState<Map | null>(null);
    return (
      <MapBoxContext.Provider value={{ map, setMap }}>
        {children}
      </MapBoxContext.Provider>
    );
  }
);
