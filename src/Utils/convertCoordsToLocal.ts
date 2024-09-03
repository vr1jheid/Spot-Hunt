import { LocalCoords, ServerCoords } from "../Types/spotTypes";

export const convertCoordsToLocal = ({
  longitude,
  latitude,
}: ServerCoords): LocalCoords => ({ lng: +longitude, lat: +latitude });
