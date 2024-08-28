/* eslint-disable react-hooks/exhaustive-deps */
import "mapbox-gl/dist/mapbox-gl.css";

import { Menu } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import mapboxgl, { LngLatLike, Map } from "mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchPoints } from "../../api/fetchPoints";
import { useUserStore } from "../../Routes/MapPage/userStore";
import { getBounds } from "../../Utils/getBounds";
import { OverlayContainer } from "../OverlayContainer/OverlayContainer";
import { PULSING_DOT_ID } from "./Constants/pulsingDot";
import { MapBoxContext } from "./Context/MapBoxContext";
import { changePulsingDotLocation } from "./Utils/changePulsingDotLocation";
import { createPulsingDotOnMap } from "./Utils/createPulsingDotOnMap";

// Cyprus

const touchInitial = {
  pageX: -1,
  pageY: -1,
  lng: 0,
  lat: 0,
  menuOpen: false,
  touchingTime: 0,
};

export const MapBox = () => {
  const [touchEvent, setTouchEvent] = useState(touchInitial);

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
          navigate(`point/${id}`);
        });
    });
    setMarkersIds((prev) => [...prev, ...newIds]);
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

    mapboxMap.on("touchstart", (e) => {
      const { lng, lat } = e.lngLat;

      const { pageX, pageY } = e.originalEvent.targetTouches[0];
      const clear = (interval: number) => {
        clearInterval(interval);
        window.onpointermove = null;
        window.onpointerup = null;
      };
      console.log("start touching");

      const touchStart = {
        pageX,
        pageY,
        timestamp: Date.now(),
      };
      setTouchEvent((prev) => {
        return { ...prev, pageX, pageY, lng, lat };
      });

      const interval = setInterval(() => {
        const touchingTime = Date.now() - touchStart.timestamp;
        console.log(touchingTime);
        if (touchingTime > 700) {
          clear(interval);
          setTouchEvent((prev) => {
            return { ...prev, menuOpen: true, touchingTime: 0 };
          });

          console.log("menu opened");
          return;
        }

        setTouchEvent((prev) => {
          return { ...prev, touchingTime };
        });
      }, 50);

      window.onpointerup = () => {
        clear(interval);
        setTouchEvent(touchInitial);
      };

      window.onpointermove = ({ pageX, pageY }) => {
        const maxDelta = 5;
        const deltaX = Math.abs(touchStart.pageX - pageX);
        const deltaY = Math.abs(touchStart.pageY - pageY);
        if (deltaX > maxDelta || deltaY > maxDelta) {
          clear(interval);
          setTouchEvent(touchInitial);
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
      {touchEvent.menuOpen && (
        <>
          <OverlayContainer
            onPointerDown={() => {
              setTouchEvent(touchInitial);
            }}
          />
          <Menu
            opened
            onChange={() => setTouchEvent(touchInitial)}
            withArrow
            arrowPosition="center"
            arrowSize={13}
            styles={{
              dropdown: {
                top: `${(touchEvent?.pageY ?? 0) + 10}px`,
                left: `${(touchEvent?.pageX ?? 0) - 10}px`,
              },
            }}
          >
            <Menu.Dropdown>
              <Menu.Item
                onClick={() =>
                  navigate(`new-point/${[touchEvent.lng, touchEvent.lat]}`)
                }
                leftSection={<IconMapPin />}
              >
                {" "}
                Add Spot
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </>
      )}

      {!!touchEvent.touchingTime && (
        <div
          className="absolute z-50 opacity-70 bg-gray-400 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            top: touchEvent.pageY,
            left: touchEvent.pageX,
            width: `${touchEvent.touchingTime / 30}px`,
            height: `${touchEvent.touchingTime / 30}px`,
          }}
        ></div>
      )}
      <div className="h-full w-full" id="map-container" ref={mapContainerRef} />
    </>
  );
};
