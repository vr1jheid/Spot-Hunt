import {
  LngLatLike,
  Map,
  MapTouchEvent as MapTouchEventMapBox,
} from "mapbox-gl";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { invalidateSpots } from "../../../api/invalidateSpots";
import { useUserStore } from "../../../Store/userStore";
import { createPulsingDotOnMap } from "../Utils/createPulsingDotOnMap";

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
          invalidateSpots();

          createPulsingDotOnMap(target, validCoords);
        },
        () => {
          target.easeTo({ zoom: 9 });
        }
      );
    },
    [setLocation]
  );

  const onMapTouchStart = useCallback(
    ({ originalEvent, lngLat }: MapTouchEventMapBox) => {
      if (originalEvent.targetTouches.length > 1) {
        return;
      }
      const { pageX, pageY } = originalEvent.targetTouches[0];
      console.log("touch start");

      const touchStart = {
        pageX,
        pageY,
        timestamp: Date.now(),
      };

      setTouchEvent({ pageX, pageY, lngLat, touchingTime: 0 });

      const interval = setInterval(() => {
        const touchingTime = Date.now() - touchStart.timestamp;
        if (touchingTime > 1050) {
          clear(interval);
          setTouchEvent(null);
          navigate(`options/${lngLat.toArray()}`);
          console.log("menu opened");
          return;
        }

        setTouchEvent((prev) => {
          if (!prev) return null;
          return { ...prev, touchingTime };
        });
      }, 50);

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
    [navigate]
  );

  const onMapDragEnd = useCallback(() => invalidateSpots(), []);

  const onMapZoomEnd = useCallback(() => invalidateSpots(), []);

  return {
    onMapLoad,
    onMapTouchStart,
    touchEvent,
    onMapDragEnd,
    onMapZoomEnd,
  };
};
