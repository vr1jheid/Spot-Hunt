import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Image } from "@mantine/core";
import {
  IconCar,
  IconCashBanknote,
  IconRulerMeasure,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import mapboxgl, { Marker } from "mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import googleMapsIcon from "../../Assets/google-maps-icon.png";
import wazeMapsIcon from "../../Assets/waze-maps-icon.svg";
import { AboutListItem } from "../../Components/AboutListItem/AboutListItem";
import { MapBoxContext } from "../../Components/MapBox/Context/MapBoxContext";
import { ParkingMarker } from "../../Components/MapBox/ParkingMarker/ParkingMarker";
import { useUserStore } from "../../Store/userStore";
import { SpotLocalData } from "../../Types/PointTypes";
import { convertDistanceToText } from "../../Utils/convertDistanceToText";
import { getDistanceBetweenPoints } from "../../Utils/getDistanceBetweenPoints";

export const SpotPage = () => {
  const { location } = useUserStore();
  const [open, setOpen] = useState(true);
  const marker = useRef<Marker | null>(null);
  const { mapRef } = useContext(MapBoxContext);
  const { data } = useQuery<SpotLocalData[]>({ queryKey: ["spots"] });
  const navigate = useNavigate();
  const closePage = () => navigate("/");

  const params = useParams();
  const id = params.id;

  const pointData = data?.find((p) => p.id == +(id ?? -1));

  useEffect(() => {
    if (!pointData?.coordinates || !mapRef.current || marker.current) {
      return;
    }

    const markerContainer = document.createElement("div");
    ReactDOM.createRoot(markerContainer).render(
      <ParkingMarker color="green" />
    );
    marker.current = new mapboxgl.Marker(markerContainer)
      .setLngLat(pointData?.coordinates)
      .addTo(mapRef.current);

    () => {
      marker.current?.remove();
    };
  }, [pointData?.coordinates]);

  useEffect(() => {
    if (!pointData) return;
    mapRef.current?.easeTo({
      center: {
        lat: pointData.coordinates.lat - 0.003,
        lng: pointData.coordinates.lng,
      },
      zoom: 15,
    });
  }, [pointData]);

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
      /*       snapPoints={({ maxHeight }) => maxHeight * 0.75} */
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
          <Carousel>
            {images.map((i, index) => (
              <CarouselSlide key={index} h={250}>
                <Image src={i} h={250} />
              </CarouselSlide>
            ))}
          </Carousel>
        ) : (
          <Image src="https://placehold.co/374x250?text=No%20photos" />
        )}
      </header>
      <div className="p-3 flex flex-col gap-3">
        <div className=" flex items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <span className="bg-gray-100 p-2 rounded-lg w-11 h-11 flex items-center justify-center">
              <IconRulerMeasure size={25} />
            </span>
            <span className=" inline-flex flex-col">
              <span className=" text-md font-medium">Distance from you</span>
              <span>
                {!location
                  ? "We cant get your location"
                  : convertDistanceToText(
                      getDistanceBetweenPoints(location, coordinates)
                    )}
              </span>
            </span>
          </div>
          <ul className="flex justify-center gap-4">
            <li>
              <a target="_blank" href={`https://waze.com/ul?ll=${lat},${lng}`}>
                <img className="w-9 h-9" src={wazeMapsIcon} alt="waze maps" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href={`https://www.google.com/maps/place/${lat},${lng}`}
              >
                <img
                  className=" w-9 h-9"
                  src={googleMapsIcon}
                  alt="google maps"
                />
              </a>
            </li>
          </ul>
        </div>

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
      </div>
    </BottomSheet>
  );
};
