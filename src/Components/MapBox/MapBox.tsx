/* eslint-disable react-hooks/exhaustive-deps */
import mapboxgl, { LngLatLike, Map, MapMouseEvent } from "mapbox-gl";
import { useRef, useEffect, useState, useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapBoxContext } from "./Context/MapBoxContext";
import { useNavigate } from "react-router-dom";
import { Coords } from "../../Types/Сoords";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPoints } from "../../api/fetchAllPoints";
import { Marker } from "mapbox-gl";

// Cyprus

export const MapBox = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const initialCoords: LngLatLike = { lng: 33.354173, lat: 35.172871 };
  const [markers, setMarkers] = useState<Marker[]>([]);
  const { data } = useQuery({
    queryKey: ["points"],
    queryFn: fetchAllPoints,
  });

  const [userLocation, setUserLocation] = useState<LngLatLike>(initialCoords);
  const { map, setMap } = useContext(MapBoxContext);

  useEffect(() => {
    if (!data || !map) {
      return;
    }
    setMarkers(
      data.map(({ coordinates, title }) => {
        console.log(coordinates);
        const lngLat = {
          lng: Number.parseFloat(coordinates.longitude),
          lat: Number.parseFloat(coordinates.latitude),
        };
        new mapboxgl.Popup({ offset: 25 })
          .setText(title)
          .setLngLat(lngLat)
          .addTo(map);

        const marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
        const s = marker.getElement();
        s.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        return marker;
      })
    );

    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [data, map]);

  const onMapLoad = ({ target }: { type: "load"; target: Map }) => {
    window.navigator.geolocation.getCurrentPosition(
      (e) => {
        console.log(e);
        const coords: LngLatLike = {
          lng: e.coords.longitude,
          lat: e.coords.latitude,
        };
        setUserLocation(coords);
      },
      () => {
        target.easeTo({ zoom: 9 });
      }
    );
  };

  const onMapClick = ({ target, lngLat }: MapMouseEvent) => {
    const coords: Coords = {
      longitude: `${lngLat.lng}`,
      latitude: `${lngLat.lat}`,
    };
    target.easeTo({ center: lngLat });
    navigate(`./new-point/${lngLat.toArray()}`, {
      state: { coords },
    });
  };

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

    mapboxMap.on("load", onMapLoad);
    mapboxMap.on("click", onMapClick);
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div className="h-full w-full" ref={mapContainerRef} />;
};
