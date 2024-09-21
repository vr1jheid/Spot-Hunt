import { Coords, ServerCoords } from "shared/model/coords.types";

export const convertCoordsToLocal = ({
  longitude,
  latitude,
}: ServerCoords): Coords => ({ lng: +longitude, lat: +latitude });
