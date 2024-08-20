import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { IconCurrencyDollar, IconMapPin } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import googleMapsIcon from "../../Assets/google-maps-icon.png";
import wazeMapsIcon from "../../Assets/waze-maps-icon.svg";
import { MapBoxContext } from "../../Components/MapBox/Context/MapBoxContext";
import { PointLocalData } from "../../Types/PointTypes";

export const PointPage = () => {
  const [open, setOpen] = useState(true);
  const { map } = useContext(MapBoxContext);
  const { data } = useQuery<PointLocalData[]>({ queryKey: ["points"] });
  const navigate = useNavigate();
  const closePage = () => navigate("/");

  const params = useParams();
  const id = params.id;

  const pointData = data?.find((p) => p.id == +(id ?? -1));

  useEffect(() => {
    if (!pointData) return;
    map?.easeTo({
      center: {
        lat: pointData.coordinates.lat - 0.001,
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
      blocking={false}
      onSpringStart={(e) => {
        if (e.type === "CLOSE") {
          setTimeout(() => {
            closePage();
          }, 400);
        }
      }}
      open={open}
      onDismiss={() => setOpen(false)}
      header={<div className="h-6 bg-white rounded-t-lg"></div>}
      snapPoints={({ minHeight }) => [minHeight, (minHeight * 2) / 3]}
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
          <Carousel height={250} withIndicators>
            {images.map((i) => (
              <CarouselSlide key={i}>
                <Image h={250} src={i} />
              </CarouselSlide>
            ))}
          </Carousel>
        ) : (
          <img
            src="https://placehold.co/374x250?text=No%20photos"
            className="rounded-lg"
          />
        )}

        {/*         <h1 className="text-center text-3xl font-normal mt-2">{title}</h1> */}
      </header>
      <div className=" flex flex-col gap-5">
        <div className="inline-flex gap-2">
          <IconMapPin /> "location"
        </div>
        {rate && (
          <div className="inline-flex gap-2">
            <IconCurrencyDollar /> {rate}$/h
          </div>
        )}
        <div className="inline-flex gap-2">Capacity: {capacity}</div>
      </div>
      <div>
        <div className="text-center mt-10">open in maps...</div>
        <div className=" flex p-5 justify-center gap-10">
          <a
            target="_blank"
            href={`https://www.waze.com/en/live-map/directions?latlng=${lat}%2C${lng}`}
          >
            <img className=" w-12 h-12" src={wazeMapsIcon} alt="waze maps" />
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
    /*     <div className="absolute bottom-0 h-[630px] w-full p-2 bg-white z-10">
      <div className="w-full h-52">
        <div className=" absolute top-1 right-1 z-10">
          <CloseButton onClick={closePage} size="lg" />
        </div>
        <header className="flex justify-center flex-col">
          {images.length ? (
            <Carousel withIndicators>
              {images.map((i) => (
                <CarouselSlide key={i}>
                  <Image h={250} src={i} />
                </CarouselSlide>
              ))}
            </Carousel>
          ) : (
            <img
              src="https://placehold.co/374x250?text=No%20photos"
              className="rounded-lg h-[300px]"
            />
          )}

          <h1 className="text-center text-3xl font-normal mt-2">{title}</h1>
        </header>
        <div className=" flex flex-col gap-5">
          <div className="inline-flex gap-2">
            <IconMapPin /> "location"
          </div>
          {rate && (
            <div className="inline-flex gap-2">
              <IconCurrencyDollar /> {rate}$/h
            </div>
          )}
          <div className="inline-flex gap-2">Capcity: {capacity}</div>
        </div>
        <div>
          <div className="text-center mt-10">open in maps...</div>
          <div className=" flex p-5 justify-center gap-10">
            <a
              target="_blank"
              href={`https://www.waze.com/en/live-map/directions?latlng=${lat}%2C${lng}`}
            >
              <img className=" w-12 h-12" src={wazeMapsIcon} alt="waze maps" />
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
      </div>
    </div> */
  );
};
