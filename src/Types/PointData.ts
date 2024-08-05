import { Coords } from "./Сoords";

export interface PointServerData {
  id: number;
  title: string;
  coordinates: Coords;
  images: unknown[];
  rate: number | null;
  capacity: number | null;
}

export interface PointDataToSend
  extends Omit<PointServerData, "id" | "images" | "coordinates"> {
  longitude: string;
  latitude: string;
}
