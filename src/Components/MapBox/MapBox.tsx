/* eslint-disable react-hooks/exhaustive-deps */
import mapboxgl, { LngLatLike, Map, MapMouseEvent } from "mapbox-gl";
import { useRef, useEffect, useState, useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapBoxContext } from "./Context/MapBoxContext";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPoints } from "../../api/fetchPoints";
import { getBounds } from "../../Utils/getBounds";
import { useUserStore } from "../../Routes/MapPage/userStore";
import { createPulsingDotOnMap } from "./Utils/createPulsingDotOnMap";
import { PULSING_DOT_ID } from "./Constants/pulsingDot";
import { changePulsingDotLocation } from "./Utils/changePulsingDotLocation";

// Cyprus

export const MapBox = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const initialCoords: LngLatLike = { lng: 33.354173, lat: 35.172871 };
  const [markersIds, setMarkersIds] = useState<number[]>([]);
  const { map, setMap } = useContext(MapBoxContext);
  const queryClient = useQueryClient();
  const { setLocation, location } = useUserStore();

  const { data: points } = useQuery({
    queryKey: ["points"],
    queryFn: async () => {
      if (!map) return null;
      return await fetchPoints({ params: getBounds(map) });
    },
  });

  const onMapLoad = ({ target }: { type: "load"; target: Map }) => {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { longitude: lng, latitude: lat } = coords;
        const validCoords = { lng, lat };

        setLocation(validCoords);
        queryClient.invalidateQueries({ queryKey: ["points"] });
        target.setCenter(validCoords);
        createPulsingDotOnMap(target, validCoords);
      },
      () => {
        target.easeTo({ zoom: 9 });
      }
    );
  };

  useEffect(() => {
    if (!map || !location) return;
    console.log("here");

    const dot = map.getSource(PULSING_DOT_ID);
    if (dot) {
      changePulsingDotLocation(map, location);
    } else {
      createPulsingDotOnMap(map, location);
    }
  }, [location]);

  useEffect(() => {
    if (!map || !points) return;

    const newIds: number[] = [];
    points.forEach(({ id, coordinates }) => {
      if (markersIds.includes(id)) return;
      newIds.push(id);

      new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map)
        .getElement()
        .addEventListener("click", (e) => {
          e.stopPropagation();
          map?.easeTo({
            center: {
              lat: coordinates.lat - 0.005,
              lng: coordinates.lng,
            },
            zoom: 15,
          });
          navigate(`point/${id}`);
        });
    });
    setMarkersIds((prev) => [...prev, ...newIds]);
  }, [points, map]);

  const onMapClick = ({ target, lngLat }: MapMouseEvent) => {
    target.easeTo({ center: lngLat });
    navigate(`new-point/${lngLat.toArray()}`);
  };

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
    mapboxMap.on("click", onMapClick);
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
      <div className="h-full w-full" ref={mapContainerRef} />
      <button
        className="absolute top-0 right-0 z-[9999] bg-white"
        onClick={() => {
          /* createPulsingDotOnMap(map, { lng: 34, lat: 34 }); */
          points!.forEach(({ id, coordinates }) => {
            new mapboxgl.Marker()
              .setLngLat(coordinates)
              .addTo(map!)
              .getElement()
              .addEventListener("click", (e) => {
                e.stopPropagation();
                console.log("OPENED ", id);
              });
          });
        }}
      >
        TEST
      </button>
    </>
  );
};
