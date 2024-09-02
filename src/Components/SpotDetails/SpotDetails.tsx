import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Image } from "@mantine/core";
import {
  IconCar,
  IconCashBanknote,
  IconRulerMeasure,
} from "@tabler/icons-react";

import googleMapsIcon from "../../Assets/google-maps-icon.png";
import wazeMapsIcon from "../../Assets/waze-maps-icon.svg";
import { useUserStore } from "../../Store/userStore";
import { SpotLocalData } from "../../Types/SpotTypes";
import { convertDistanceToText } from "../../Utils/convertDistanceToText";
import { getDistanceBetweenPoints } from "../../Utils/getDistanceBetweenPoints";
import { AboutListItem } from "../AboutListItem/AboutListItem";

export const SpotDetails = ({
  title,
  images,
  coordinates,
  capacity,
  rate,
}: SpotLocalData) => {
  const { location } = useUserStore();
  const { lng, lat } = coordinates;

  return (
    <>
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
    </>
  );
};
