/* eslint-disable react-hooks/exhaustive-deps */
import mapboxgl, { LngLatLike, Map, MapMouseEvent } from "mapbox-gl";
import { useRef, useEffect, useState, useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapBoxContext } from "./Context/MapBoxContext";
import { useNavigate } from "react-router-dom";
import { Coords } from "../../Types/Сoords";

// Cyprus

export const MapBox = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const initialCoords: LngLatLike = { lng: 33.354173, lat: 35.172871 };

  const [userLocation, setUserLocation] = useState<LngLatLike>(initialCoords);
  const { map, setMap } = useContext(MapBoxContext);

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
        target.jumpTo({ zoom: 9 });
      }
    );
  };

  const onMapClick = ({ target, lngLat }: MapMouseEvent) => {
    const coords: Coords = {
      longitude: `${lngLat.lng}`,
      latitude: `${lngLat.lat}`,
    };
    target.flyTo({ center: lngLat });
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
