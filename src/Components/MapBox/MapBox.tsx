/* eslint-disable react-hooks/exhaustive-deps */
import mapboxgl, {
  LngLatBounds,
  LngLatLike,
  Map,
  MapMouseEvent,
} from "mapbox-gl";
import { useRef, useEffect, useState, useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapBoxContext } from "./Context/MapBoxContext";
import { useNavigate } from "react-router-dom";
import { Coords } from "../../Types/Сoords";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPoints } from "../../api/fetchPoints";
import { Marker } from "mapbox-gl";
import { getBounds } from "../../Utils/getBounds";

// Cyprus

export const MapBox = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const initialCoords: LngLatLike = { lng: 33.354173, lat: 35.172871 };
  const [markersIds, setMarkersIds] = useState<number[]>([]);
  const { map, setMap } = useContext(MapBoxContext);
  const queryClient = useQueryClient();

  const { data: points } = useQuery({
    queryKey: ["points"],
    queryFn: async () => {
      if (!map) return null;
      return await fetchPoints({ params: getBounds(map) });
    },
  });

  const [userLocation, setUserLocation] = useState<LngLatLike>(initialCoords);

  const onMapLoad = ({ target }: { type: "load"; target: Map }) => {
    window.navigator.geolocation.getCurrentPosition(
      (e) => {
        console.log(e);
        const coords: LngLatLike = {
          lng: e.coords.longitude,
          lat: e.coords.latitude,
        };
        setUserLocation(coords);
        queryClient.invalidateQueries({ queryKey: ["points"] });
      },
      () => {
        target.easeTo({ zoom: 9 });
      }
    );
  };

  useEffect(() => {
    if (!map) {
      return;
    }
    const newIds: number[] = [];
    points?.forEach(({ id, coordinates }) => {
      if (markersIds.includes(id)) return;
      newIds.push(id);
      const lngLat = {
        lng: +coordinates.longitude,
        lat: +coordinates.latitude,
      };
      new mapboxgl.Marker()
        .setLngLat(lngLat)
        .addTo(map)
        .getElement()
        .addEventListener("click", (e) => {
          e.stopPropagation();
          console.log("OPENED ", id);
        });
    });
    setMarkersIds((prev) => [...prev, ...newIds]);

    return () => {};
  }, [points]);

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
    mapboxMap.on("dragend", () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    });
    mapboxMap.on("zoomend", () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    });
    /*     mapboxMap.on("drag", refetch);
    mapboxMap.on("zoom", refetch); */
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return (
    <>
      <div className="h-full w-full" ref={mapContainerRef} />
      <button
        className="absolute top-0 right-0 z-[9999] bg-white"
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ["points"],
          });
        }}
      >
        TEST
      </button>
    </>
  );
};
