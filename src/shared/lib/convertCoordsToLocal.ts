import { LocalCoords, ServerCoords } from "shared/model/spotTypes";

export const convertCoordsToLocal = ({
  longitude,
  latitude,
}: ServerCoords): LocalCoords => ({ lng: +longitude, lat: +latitude });
