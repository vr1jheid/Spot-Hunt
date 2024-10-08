import { useMap } from "entities/map";
import { useUserStore } from "entities/user";
import { spotsAPI } from "features/parkingSpot";
import {
  LngLatLike,
  Map,
  MapTouchEvent as MapTouchEventMapBox,
} from "mapbox-gl";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TIME_TO_OPTIONS_OPEN } from "../../ui/Map";
import { createPulsingDotOnMap } from "../PulsingDot/createPulsingDotOnMap";

const clear = (interval: number) => {
  clearInterval(interval);
  window.ontouchend = null;
  window.ontouchmove = null;
};

interface MapTouchEvent {
  pageX: number;
  pageY: number;
  lngLat: LngLatLike;
  touchingTime: number;
}

export const useMapEvents = () => {
  const { mapRef } = useMap();

  const [touchEvent, setTouchEvent] = useState<MapTouchEvent | null>(null);
  const navigate = useNavigate();
  const { setLocation } = useUserStore();

  const onMapLoad = useCallback(
    ({ target }: { type: "load"; target: Map }) => {
      window.navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { longitude: lng, latitude: lat } = coords;
          const validCoords = { lng, lat };

          setLocation(validCoords);

          target.setCenter(validCoords);
          setTimeout(() => {
            spotsAPI.invalidateSpots();
          }, 0);

          createPulsingDotOnMap(target, validCoords);
        },
        () => {
          target.easeTo({ zoom: 9 });
        },
      );
    },
    [setLocation],
  );

  const onMapTouchStart = useCallback(
    ({ originalEvent, lngLat }: MapTouchEventMapBox) => {
      const target = originalEvent.target as HTMLElement;
      const targetIsMarker = !!target.closest(`[data-marker="true"]`);
      if (originalEvent.targetTouches.length > 1 || targetIsMarker) {
        return;
      }

      const { pageX, pageY } = originalEvent.targetTouches[0];

      const touchStart = {
        pageX,
        pageY,
        timestamp: Date.now(),
      };

      setTouchEvent({ pageX, pageY, lngLat, touchingTime: 0 });

      const interval = window.setInterval(() => {
        if (!mapRef.current) return;

        const touchingTime = Date.now() - touchStart.timestamp;
        if (touchingTime >= TIME_TO_OPTIONS_OPEN) {
          clear(interval);
          setTouchEvent(null);
          navigate(`options/${lngLat.toArray()}`);
          return;
        }

        setTouchEvent((prev) => {
          if (!prev) return null;
          return { ...prev, touchingTime };
        });
      }, 20);

      window.ontouchend = () => {
        clear(interval);
        setTouchEvent(null);
      };

      window.ontouchmove = (e) => {
        const { pageX, pageY } = e.targetTouches[0];
        const maxDelta = 5;
        const deltaX = Math.abs(touchStart.pageX - pageX);
        const deltaY = Math.abs(touchStart.pageY - pageY);
        if (deltaX > maxDelta || deltaY > maxDelta) {
          clear(interval);
          setTouchEvent(null);
        }
      };
    },
    [navigate],
  );

  const onMapDragEnd = useCallback(() => spotsAPI.invalidateSpots(), []);

  const onMapZoomEnd = useCallback(() => spotsAPI.invalidateSpots(), []);

  return {
    onMapLoad,
    onMapTouchStart,
    touchEvent,
    onMapDragEnd,
    onMapZoomEnd,
  };
};
