import "mapbox-gl/dist/mapbox-gl.css";

import { Loader } from "@mantine/core";
import { getBounds } from "entities/map/lib/getBounds";
import { MapContext } from "entities/MapContext/config/MapContext";
import { useUserStore } from "entities/user";
import { useSpots } from "features/parkingSpot";
import { useUnapprovedSpots } from "features/parkingSpot/lib/hooks/useUnapprovedSpots";
import { useContext, useEffect, useState } from "react";
import { RingProgress } from "shared/ui/RingProgress/RingProgress";

import { useMapBox } from "../lib/hooks/useMapBox";
import { useMapEvents } from "../lib/hooks/useMapEvents";
import { useMapMarkers } from "../lib/hooks/useMapMarkers";
import { MapControls } from "./MapControls/MapControls";

export const TIME_TO_OPTIONS_OPEN = 1100;

export const Map = () => {
  const { mapRef } = useContext(MapContext);

  const bounds = mapRef.current ? getBounds(mapRef.current) : null;

  const [showFilledProgress, setShowFilledProgress] = useState(false);
  const { showUnapproved } = useUserStore();

  const { spots } = useSpots(bounds);
  const { spots: unapproved, invalidate: invalidateUnapproved } =
    useUnapprovedSpots(bounds);

  const { onMapLoad, onMapTouchStart, onMapDragEnd, onMapZoomEnd, touchEvent } =
    useMapEvents();

  const { ref, isLoading } = useMapBox({
    onMapLoad,
    onMapTouchStart,
    onMapDragEnd,
    onMapZoomEnd,
  });

  useMapMarkers({ spots: spots ?? [], unapproved });

  useEffect(() => {
    invalidateUnapproved();
  }, [showUnapproved]);

  if (isLoading) {
    <div className="flex h-full w-full items-center justify-center">
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
        <div className="absolute left-3 top-3 z-10">
          <RingProgress
            value={
              showFilledProgress
                ? 100
                : (touchEvent!.touchingTime / TIME_TO_OPTIONS_OPEN) * 100
            }
          />
        </div>
      )}
      <MapControls />
      <div className="h-full w-full" id="map-container" ref={ref} />
    </>
  );
};
