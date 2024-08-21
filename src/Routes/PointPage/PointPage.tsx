import { Carousel } from "@mantine/carousel";
import {
  IconCar,
  IconCashBanknote,
  IconMapPin,
  IconRulerMeasure,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import mapboxgl, { Marker } from "mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import googleMapsIcon from "../../Assets/google-maps-icon.png";
import wazeMapsIcon from "../../Assets/waze-maps-icon.svg";
import { AboutListItem } from "../../Components/AboutListItem/AboutListItem";
import { MapBoxContext } from "../../Components/MapBox/Context/MapBoxContext";
import { PointLocalData } from "../../Types/PointTypes";
import { convertDistanceToText } from "../../Utils/convertDistanceToText";
import { getDistanceBetweenPoints } from "../../Utils/getDistanceBetweenPoints";
import { useUserStore } from "../MapPage/userStore";
export const PointPage = () => {
  const { location } = useUserStore();
  const [open, setOpen] = useState(true);
  const marker = useRef<Marker | null>(null);
  const { map } = useContext(MapBoxContext);
  const { data } = useQuery<PointLocalData[]>({ queryKey: ["points"] });
  const navigate = useNavigate();
  const closePage = () => navigate("/");

  const params = useParams();
  const id = params.id;

  const pointData = data?.find((p) => p.id == +(id ?? -1));

  useEffect(() => {
    if (!pointData?.coordinates || !map || marker.current) {
      return;
    }
    marker.current = new mapboxgl.Marker({ color: "red" })
      .setLngLat(pointData?.coordinates)
      .addTo(map);

    () => {
      marker.current?.remove();
    };
  }, [map, pointData?.coordinates]);

  useEffect(() => {
    if (!pointData) return;
    map?.easeTo({
      center: {
        lat: pointData.coordinates.lat - 0.003,
        lng: pointData.coordinates.lng,
      },
      zoom: 15,
    });
  }, [pointData, map]);

  useEffect(() => {
    if (!pointData) {
      navigate(-1);
    }
  }, [navigate, pointData]);

  if (!pointData) {
    return;
  }

  const { title, rate, capacity, coordinates, images } = pointData;
  const { lng, lat } = coordinates;

  return (
    <BottomSheet
      onSpringStart={(e) => {
        if (e.type === "CLOSE") {
          setTimeout(() => {
            closePage();
          }, 400);
        }
      }}
      open={open}
      onDismiss={() => {
        setOpen(false);
        marker.current?.remove();
        marker.current = null;
      }}
      header={<div className="h-6 bg-white rounded-t-lg"></div>}
      snapPoints={({ maxHeight }) => maxHeight * 0.75}
      expandOnContentDrag
    >
      <header className="flex justify-center flex-col relative">
        <h1
          style={{ boxShadow: "inset 0px 0px 40px 40px #0505051b" }}
          className="absolute top-3 left-3 z-10 px-2 rounded-md text-white text-xl font-semibold first-letter:capitalize bg-[#05050521]"
        >
          {title}
        </h1>
        {images.length ? (
          <Carousel />
        ) : (
          <img
            src="https://placehold.co/374x200?text=No%20photos"
            className="rounded-lg"
          />
        )}
      </header>
      <ul className="p-3 flex flex-col gap-3">
        <AboutListItem
          icon={<IconMapPin size={25} />}
          title="Adress"
          text="Lorem ipsum dolor sit."
        />
        <AboutListItem
          icon={<IconRulerMeasure size={25} />}
          title="Distance from you"
          text={
            !location
              ? "We cant get your location"
              : convertDistanceToText(
                  getDistanceBetweenPoints(location, coordinates)
                )
          }
        />
        <AboutListItem
          icon={<IconCar size={25} />}
          title="Capacity"
          text={`${capacity ?? "no data"}`}
        />
        <AboutListItem
          icon={<IconCashBanknote size={25} />}
          title="Rate"
          text={rate ? `${rate}$/h` : "no data"}
        />
      </ul>

      <div>
        <div className="flex p-5 justify-center gap-10">
          <a
            target="_blank"
            href={`https://www.waze.com/en/live-map/directions?latlng=${lat}%2C${lng}`}
          >
            <img className="w-14 h-14" src={wazeMapsIcon} alt="waze maps" />
          </a>
          <a
            target="_blank"
            href={`https://www.google.com/maps/place/${lat},${lng}`}
          >
            <img
              className=" w-12 h-12"
              src={googleMapsIcon}
              alt="google maps"
            />
          </a>
        </div>
      </div>
    </BottomSheet>
  );
};
