/* eslint-disable react-hooks/exhaustive-deps */
import "mapbox-gl/dist/mapbox-gl.css";

import { RingProgress } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import mapboxgl, { LngLatLike, Map, Marker } from "mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchSpots } from "../../api/fetchSpots";
import { useUserStore } from "../../Routes/MapPage/userStore";
import { getBounds } from "../../Utils/getBounds";
import { PULSING_DOT_ID } from "./Constants/pulsingDot";
import { MapBoxContext } from "./Context/MapBoxContext";
import { changePulsingDotLocation } from "./Utils/changePulsingDotLocation";
import { createPulsingDotOnMap } from "./Utils/createPulsingDotOnMap";

// Cyprus
const clear = (interval: number) => {
  clearInterval(interval);
  window.onpointermove = null;
  window.onpointerup = null;
};

interface MapTouchEvent {
  pageX: number;
  pageY: number;
  lngLat: LngLatLike;
  touchingTime: number;
}

interface Markers {
  [key: string]: Marker;
}

export const MapBox = () => {
  const [touchEvent, setTouchEvent] = useState<MapTouchEvent | null>(null);

  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const initialCoords: LngLatLike = { lng: 33.354173, lat: 35.172871 };
  const [markers, setMarkers] = useState<Markers>({});
  const { map, setMap } = useContext(MapBoxContext);
  const queryClient = useQueryClient();
  const { setLocation, location } = useUserStore();

  const { data: points } = useQuery({
    queryKey: ["points"],
    queryFn: async () => {
      if (!map) return null;
      return await fetchSpots({ params: getBounds(map) });
    },
  });

  const onMapLoad = ({ target }: { type: "load"; target: Map }) => {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { longitude: lng, latitude: lat } = coords;
        const validCoords = { lng, lat };

        setLocation(validCoords);

        target.setCenter(validCoords);
        createPulsingDotOnMap(target, validCoords);
      },
      () => {
        target.easeTo({ zoom: 9 });
      }
    );
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["points"] });
  }, [location]);

  useEffect(() => {
    if (!map || !location) return;
    const dot = map.getSource(PULSING_DOT_ID);
    if (dot) {
      changePulsingDotLocation(map, location);
    } else {
      createPulsingDotOnMap(map, location);
    }
  }, [location]);

  useEffect(() => {
    if (!map || !points) return;
    const markersCopy = { ...markers };

    const newMarkers: Markers = {};
    const currentSpotsIds = points.map(({ id }) => id);
    Object.keys(markers).forEach((id) => {
      if (!currentSpotsIds.includes(+id)) {
        markersCopy[id].remove();
        delete markersCopy[id];
      }
    });

    points.forEach(({ id, coordinates }) => {
      /* if (markersIds.includes(id)) return; */
      if (markers[id]) return;

      const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        navigate(`spot/${id}`);
      });
      newMarkers[id] = marker;
    });
    console.log(markersCopy, newMarkers);

    setMarkers({ ...markersCopy, ...newMarkers });
  }, [points, map]);

  useEffect(() => {
    if (!mapContainerRef.current) {
      throw new Error(`mapContainerRef.current not exists ${mapContainerRef}`);
    }

    const mapboxMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: location ?? initialCoords,
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 15,
    });

    mapboxMap.on("load", onMapLoad);

    mapboxMap.on("touchstart", ({ lngLat, originalEvent }) => {
      const { pageX, pageY } = originalEvent.targetTouches[0];

      console.log("start touching");

      const touchStart = {
        pageX,
        pageY,
        timestamp: Date.now(),
      };

      setTouchEvent({ pageX, pageY, lngLat, touchingTime: 0 });

      const interval = setInterval(() => {
        const touchingTime = Date.now() - touchStart.timestamp;
        console.log(touchingTime);
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

      window.onpointerup = () => {
        clear(interval);
        setTouchEvent(null);
      };

      window.onpointermove = ({ pageX, pageY }) => {
        const maxDelta = 5;
        const deltaX = Math.abs(touchStart.pageX - pageX);
        const deltaY = Math.abs(touchStart.pageY - pageY);
        if (deltaX > maxDelta || deltaY > maxDelta) {
          clear(interval);
          setTouchEvent(null);
        }
      };
    });
    mapboxMap.on("dragend", () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    });
    mapboxMap.on("zoomend", () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    });
    setMap(mapboxMap);
    return () => {
      mapboxMap.remove();
    };
  }, []);

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
            size={70}
            sections={[{ value: touchEvent.touchingTime / 10, color: "cyan" }]}
          />
        </div>
      )}
      <div className="h-full w-full" id="map-container" ref={mapContainerRef} />
    </>
  );
};
