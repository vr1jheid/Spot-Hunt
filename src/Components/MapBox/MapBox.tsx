import "mapbox-gl/dist/mapbox-gl.css";

import { Loader, RingProgress } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { fetchSpots } from "../../api/fetchSpots";
import { getBounds } from "../../Utils/getBounds";
import { MapBoxContext } from "./Context/MapBoxContext";
import { useMapBox } from "./Hooks/useMapBox";
import { useMapEvents } from "./Hooks/useMapEvents";
import { useMapMarkers } from "./Hooks/useMapMarkers";

export const MapBox = () => {
  const { mapRef } = useContext(MapBoxContext);
  const ringProgressFillTime = 1000;

  const { data: spots, isFetching } = useQuery({
    queryKey: ["spots"],
    queryFn: async () => {
      if (!mapRef.current) return [];
      return await fetchSpots({ params: getBounds(mapRef.current) });
    },
  });
  isFetching && console.log("isFetching");

  const { onMapLoad, onMapTouchStart, onMapDragEnd, onMapZoomEnd, touchEvent } =
    useMapEvents();

  const { ref, isLoading } = useMapBox({
    onMapLoad,
    onMapTouchStart,
    onMapDragEnd,
    onMapZoomEnd,
  });

  useMapMarkers(spots ?? []);

  if (isLoading) {
    <div className="w-full h-full flex items-center justify-center">
      <Loader color="cyan" size="xl" type="bars" />
    </div>;
  }

  return (
    <>
      {!!touchEvent && (
        <div
          className=" absolute top-3 right-3 z-10"
          /*           style={{
            top: `${touchEvent.pageY}px`,
            left: `${touchEvent.pageX}px`,
          }} */
        >
          <RingProgress
            size={50}
            thickness={5}
            sections={[
              {
                value: (touchEvent.touchingTime / ringProgressFillTime) * 100,
                color: "blue",
              },
            ]}
          />
        </div>
      )}
      <div className="h-full w-full" id="map-container" ref={ref} />
    </>
  );
};
