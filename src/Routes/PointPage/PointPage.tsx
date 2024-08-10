import { CloseButton, Image } from "@mantine/core";
import photoPlug from "../../Assets/no_photo.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PointLocalData } from "../../Types/PointData";
import { IconCurrencyDollar, IconMapPin } from "@tabler/icons-react";
import googleMapsIcon from "../../Assets/google-maps-icon.png";
import wazeMapsIcon from "../../Assets/waze-maps-icon.svg";

export const PointPage = () => {
  const { data } = useQuery<PointLocalData[]>({ queryKey: ["points"] });
  const navigate = useNavigate();
  const closePage = () => navigate(-1);
  const params = useParams();
  const id = params.id;
  if (!id || !data) return;
  const pointData = data?.find((p) => p.id == +id);
  if (!pointData) {
    navigate(-1);
    return;
  }
  const { title, rate, capacity, coordinates } = pointData;
  const { lng, lat } = coordinates;

  return (
    <div className="absolute bottom-0 h-[630px] w-full p-2 bg-white z-10">
      <div className="w-full h-52">
        <div className=" absolute top-1 right-1">
          <CloseButton onClick={closePage} size="lg" />
        </div>
        <header className="flex justify-center flex-col">
          <img src={photoPlug} className="rounded-lg h-[300px]" />
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
    </div>
  );
};
