/* eslint-disable react-hooks/exhaustive-deps */
import mapboxgl, { LngLatLike, PopupOptions, Map } from "mapbox-gl";
import { useRef, useEffect, useState, useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapBoxContext } from "./Context/MapBoxContext";

/* const markerHeight = 50;
const markerRadius = 10;
const linearOffset = 25;
const popupOffsets = {
  top: [0, 0],
  "top-left": [0, 0],
  "top-right": [0, 0],
  bottom: [0, -markerHeight],
  "bottom-left": [
    linearOffset,
    (markerHeight - markerRadius + linearOffset) * -1,
  ],
  "bottom-right": [
    -linearOffset,
    (markerHeight - markerRadius + linearOffset) * -1,
  ],
  left: [markerRadius, (markerHeight - markerRadius) * -1],
  right: [-markerRadius, (markerHeight - markerRadius) * -1],
}; */

export const MapBox = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<LngLatLike>({
    lng: 0,
    lat: 0,
  });
  const { map, setMap } = useContext(MapBoxContext);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((e) => {
      console.log(e);
      const coords: LngLatLike = {
        lng: e.coords.longitude,
        lat: e.coords.latitude,
      };
      setUserLocation(coords);
    });

    return () => {};
  }, []);

  useEffect(() => {
    map?.setCenter(userLocation);
  }, [userLocation]);

  useEffect(() => {
    if (!mapContainerRef.current) {
      throw new Error(`mapContainerRef.current not exists ${mapContainerRef}`);
    }

    const mapboxMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: userLocation, // starting position [lng, lat]
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 15, // starting zoom
    });

    mapboxMap.on("click", (e) => {
      /*    const features = mapboxMap.queryRenderedFeatures(e.point); */
      /*       const marker = new mapboxgl.Marker()
        .setLngLat(e.lngLat.toArray())
        .addTo(mapboxMap);

      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        marker.remove();
      }); */
      /*       const popup = new mapboxgl.Popup({ offset: popupOffsets })
        .setLngLat(e.lngLat)
        .setHTML("<h1>Hello World!</h1>")
        .setMaxWidth("300px")
        .addTo(mapboxMap)
        .on("close", () => marker.remove()).setDOMContent; */
    });

    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div className="h-full w-full" ref={mapContainerRef} />;
};
