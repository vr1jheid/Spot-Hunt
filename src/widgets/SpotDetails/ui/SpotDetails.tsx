import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Divider, Image, LoadingOverlay } from "@mantine/core";
import {
  IconCar,
  IconCashBanknote,
  IconRulerMeasure,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { getDistanceBetweenPoints } from "entities/map/lib/getDistanceBetweenPoints";
import { SpotTypes } from "entities/parkingSpot";
import { useUserStore } from "entities/user";
import { useSpotVote } from "features/parkingSpot/lib/useSpotVote";
import googleMapsIcon from "shared/assets/google-maps-icon.png";
import wazeMapsIcon from "shared/assets/waze-maps-icon.svg";
import { convertDistanceToText } from "shared/lib/convertDistanceToText";

import { SpotDetailsListItem } from "./SpotDetailsListItem";

interface Props extends SpotTypes.SpotLocalData {
  isFetching: boolean;
}

export const SpotDetails = ({
  id,
  title,
  images,
  coordinates,
  capacity,
  rate,
  voteCode,
  votedAgainst,
  votedFor,
}: Props) => {
  const { VoteCode } = SpotTypes;
  const { location } = useUserStore();
  const { lng, lat } = coordinates;

  const voteMutation = useSpotVote();
  const thumbUpIcon =
    voteCode === VoteCode.Positive ? <IconThumbUpFilled /> : <IconThumbUp />;

  const thumpDownIcon =
    voteCode === VoteCode.Negative ? (
      <IconThumbDownFilled />
    ) : (
      <IconThumbDown />
    );

  return (
    <>
      <header className="relative flex flex-col justify-center">
        <h1
          style={{ boxShadow: "inset 0px 0px 40px 40px #0505051b" }}
          className="absolute left-3 top-3 z-10 rounded-md bg-[#05050521] px-2 text-xl font-semibold text-white first-letter:capitalize"
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
        <div className="absolute bottom-1 right-1 z-10 flex h-10 gap-3 rounded-lg bg-white p-2">
          <LoadingOverlay
            visible={voteMutation.isPending}
            overlayProps={{ radius: "sm" }}
            loaderProps={{ type: "dots" }}
          />
          <button
            onClick={async () => {
              voteMutation.mutate({ id, vote: VoteCode.Positive });
            }}
            className="inline-flex grow items-center justify-between gap-1"
          >
            {thumbUpIcon}
            {votedFor}
          </button>
          <Divider orientation="vertical" />
          <button
            onClick={async () => {
              voteMutation.mutate({ id, vote: VoteCode.Negative });
            }}
            className="inline-flex grow items-center justify-between gap-1"
          >
            {thumpDownIcon} {votedAgainst}
          </button>
        </div>
      </header>
      <div className="flex flex-col gap-3 p-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 p-2">
              <IconRulerMeasure size={25} />
            </span>
            <span className="inline-flex flex-col">
              <span className="text-md font-medium">Distance from you</span>
              <span>
                {!location
                  ? "We cant get your location"
                  : convertDistanceToText(
                      getDistanceBetweenPoints(location, coordinates),
                    )}
              </span>
            </span>
          </div>
          <ul className="flex justify-center gap-4">
            <li>
              <a target="_blank" href={`https://waze.com/ul?ll=${lat},${lng}`}>
                <img className="h-9 w-9" src={wazeMapsIcon} alt="waze maps" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href={`https://www.google.com/maps/place/${lat},${lng}`}
              >
                <img
                  className="h-9 w-9"
                  src={googleMapsIcon}
                  alt="google maps"
                />
              </a>
            </li>
          </ul>
        </div>

        <SpotDetailsListItem
          icon={<IconCar size={25} />}
          title="Capacity"
          text={`${capacity ?? "no data"}`}
        />
        <SpotDetailsListItem
          icon={<IconCashBanknote size={25} />}
          title="Rate"
          text={rate ? `${rate}$/h` : "no data"}
        />
      </div>
    </>
  );
};
