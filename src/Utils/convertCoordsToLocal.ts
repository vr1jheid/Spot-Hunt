import { LocalCoords, ServerCoords } from "../Types/SpotTypes";

export const convertCoordsToLocal = ({
  longitude,
  latitude,
}: ServerCoords): LocalCoords => ({ lng: +longitude, lat: +latitude });
