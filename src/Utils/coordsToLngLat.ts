import { Coords } from "../Types/Сoords";

export const coordsToLngLat = ({ longitude, latitude }: Coords) => {
  return {
    lng: +longitude,
    lat: +latitude,
  };
};
