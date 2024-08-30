import "mapbox-gl/dist/mapbox-gl.css";

import { RingProgress } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { fetchSpots } from "../../api/fetchSpots";
import { getBounds } from "../../Utils/getBounds";
import { MapBoxContext } from "./Context/MapBoxContext";
import { useMapBox } from "./Hooks/useMapBox";
import { useMapEvents } from "./Hooks/useMapEvents";
import { useMapMarkers } from "./Hooks/useMapMarkers";

export const MapBox = () => {
  const { map } = useContext(MapBoxContext);
  const ringProgressFillTime = 1000;

  const { data: spots, isFetching } = useQuery({
    queryKey: ["spots"],
    queryFn: async () => {
      if (!map) return [];
      return await fetchSpots({ params: getBounds(map) });
    },
  });
  isFetching && console.log("isFetching");

  const { onMapLoad, onMapTouchStart, onMapDragEnd, onMapZoomEnd, touchEvent } =
    useMapEvents();

  const { ref } = useMapBox({
    onMapLoad,
    onMapTouchStart,
    onMapDragEnd,
    onMapZoomEnd,
  });

  useMapMarkers(spots ?? []);

  return (
    <>
      {!!touchEvent && (
        <div
          className=" absolute top-0 left-0 z-20 -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${touchEvent.pageY}px`,
            left: `${touchEvent.pageX}px`,
          }}
        >
          <RingProgress
            size={85}
            sections={[
              {
                value: (touchEvent.touchingTime / ringProgressFillTime) * 100,
                color: "cyan",
              },
            ]}
          />
        </div>
      )}
      <div className="h-full w-full" id="map-container" ref={ref} />
    </>
  );
};
