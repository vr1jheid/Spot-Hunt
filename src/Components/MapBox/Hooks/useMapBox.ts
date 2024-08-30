import mapboxgl, { Map, MapTouchEvent } from "mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";

import { MapBoxContext } from "../Context/MapBoxContext";

interface Props {
  onMapLoad: (e: { type: "load"; target: Map }) => void;
  onMapTouchStart: (e: MapTouchEvent) => void;
  onMapDragEnd: (
    e: {
      type: "dragend";
      target: Map;
    } & {
      originalEvent?: MouseEvent | TouchEvent;
    }
  ) => void;
  onMapZoomEnd: (e: { type: "zoomend"; target: Map }) => void;
}

export const useMapBox = ({
  onMapLoad,
  onMapTouchStart,
  onMapDragEnd,
  onMapZoomEnd,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { mapRef } = useContext(MapBoxContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!ref.current) {
      throw new Error(`mapContainerRef.current not exists ${ref}`);
    }
    if (mapRef.current) return;
    console.log("INIT MAPBOX");

    const mapboxMap = new mapboxgl.Map({
      container: ref.current,
      // Cyprus
      center: { lng: 33.354173, lat: 35.172871 },
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 15,
    });

    mapboxMap.on("load", (e) => {
      setIsLoading(false);
      onMapLoad(e);
    });

    mapboxMap.on("touchstart", onMapTouchStart);
    mapboxMap.on("dragend", onMapDragEnd);
    mapboxMap.on("zoomend", onMapZoomEnd);
    mapboxMap.on("style.load", () => {
      console.log("styles loaded");
      /*   setMap(mapboxMap); */
      mapRef.current = mapboxMap;
    });
    return () => {
      mapboxMap.remove();
    };
  }, [onMapDragEnd, onMapLoad, onMapTouchStart, onMapZoomEnd]);

  return {
    ref,
    isLoading,
  };
};
