import "mapbox-gl/dist/mapbox-gl.css";

import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

import { fetchSpots } from "../../api/fetchSpots";
import { fetchUnapprovedSpots } from "../../api/fetchUnapprovedSpots";
import { useUserStore } from "../../Store/userStore";
import { queryClient } from "../../Tanstack/queryClient";
import { getBounds } from "../../Utils/getBounds";
import { TIME_TO_OPTIONS_OPEN } from "./Constants/timeToOptionsOpen";
import { MapBoxContext } from "./Context/MapBoxContext";
import { useMapBox } from "./Hooks/useMapBox";
import { useMapEvents } from "./Hooks/useMapEvents";
import { useMapMarkers } from "./Hooks/useMapMarkers";
import { OptionsRingProgress } from "./RingProgress/OptionsRingProgress";

export const MapBox = () => {
  const { mapRef } = useContext(MapBoxContext);
  const [showFilledProgress, setShowFilledProgress] = useState(false);
  const { showUnapproved } = useUserStore();

  const { data: spots } = useQuery({
    queryKey: ["spots"],
    queryFn: async () => {
      if (!mapRef.current) return [];
      return await fetchSpots({
        params: getBounds(mapRef.current),
      });
    },
  });

  const { data: unapproved } = useQuery({
    queryKey: ["unapprovedSpots"],
    queryFn: async () => {
      console.log(showUnapproved);

      if (!showUnapproved || !mapRef.current) {
        return [];
      }
      return await fetchUnapprovedSpots(getBounds(mapRef.current));
    },
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["unapprovedSpots"] });
  }, [showUnapproved]);

  const { onMapLoad, onMapTouchStart, onMapDragEnd, onMapZoomEnd, touchEvent } =
    useMapEvents();

  const { ref, isLoading } = useMapBox({
    onMapLoad,
    onMapTouchStart,
    onMapDragEnd,
    onMapZoomEnd,
  });

  useMapMarkers({ spots: spots ?? [], unapproved });

  if (isLoading) {
    <div className="w-full h-full flex items-center justify-center">
      <Loader color="cyan" size="xl" type="bars" />
    </div>;
  }
  useEffect(() => {
    if (touchEvent && touchEvent?.touchingTime > TIME_TO_OPTIONS_OPEN - 50) {
      setShowFilledProgress(true);
      setTimeout(() => {
        setShowFilledProgress(false);
      }, 500);
    }
  }, [touchEvent?.touchingTime]);

  return (
    <>
      {(showFilledProgress || touchEvent) && (
        <div className="absolute top-3 right-3 z-10">
          <OptionsRingProgress
            value={
              showFilledProgress
                ? 100
                : (touchEvent!.touchingTime / TIME_TO_OPTIONS_OPEN) * 100
            }
          />
        </div>
      )}
      <div className="h-full w-full" id="map-container" ref={ref} />
    </>
  );
};
