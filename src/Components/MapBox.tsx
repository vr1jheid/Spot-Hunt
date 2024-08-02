/* eslint-disable react-hooks/exhaustive-deps */
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

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

export const MapBox = ({ token }: { token: string }) => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [userLocation, setUserLocation] = useState<LngLatLike>({
    lng: 0,
    lat: 0,
  });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(map);

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
    console.log(token);

    mapboxgl.accessToken = token;

    const mapboxMap = new mapboxgl.Map({
      container: mapContainerRef.current ?? "",
      center: userLocation, // starting position [lng, lat]
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 15, // starting zoom
    });

    mapboxMap.on("click", (e) => {
      console.log(e);

      /*    const features = mapboxMap.queryRenderedFeatures(e.point); */
      console.log(e.lngLat.toArray());

      const marker = new mapboxgl.Marker()
        .setLngLat(e.lngLat.toArray())
        .addTo(mapboxMap);

      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        marker.remove();
      });

      /*       const popup = new mapboxgl.Popup({ offset: popupOffsets })
        .setLngLat(e.lngLat)
        .setHTML("<h1>Hello World!</h1>")
        .setMaxWidth("300px")
        .addTo(mapboxMap)
        .on("close", () => marker.remove()); */
    });

    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div style={{ height: "100%" }} ref={mapContainerRef} />;
};
