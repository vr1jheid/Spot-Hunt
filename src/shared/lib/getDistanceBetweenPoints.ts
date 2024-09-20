import { Coords } from "shared/model/coords";

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const getDistanceBetweenPoints = (
  { lat: lat1, lng: lng1 }: Coords,
  { lat: lat2, lng: lng2 }: Coords,
) => {
  const R = 6371; // Радиус Земли в километрах
  const dLat = deg2rad(lat2 - lat1); // Разность широт в радианах
  const dlng = deg2rad(lng2 - lng1); // Разность долгот в радианах
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dlng / 2) *
      Math.sin(dlng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Расстояние в километрах

  return distance;
};
