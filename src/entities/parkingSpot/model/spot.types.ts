import { Coords, ServerCoords } from "shared/model/coords.types";

export interface SpotServerBrief {
  id: number;
  title: string;
  coordinates: ServerCoords;
  rate: number | null;
  capacity: number | null;
  mainImage: string;
}

export interface SpotLocalBrief extends Omit<SpotServerBrief, "coordinates"> {
  coordinates: {
    lng: number;
    lat: number;
  };
}

export interface SpotServerData extends SpotServerBrief {
  images: string[];
  votedFor: number;
  votedAgainst: number;
}

export interface SpotLocalData extends Omit<SpotServerData, "coordinates"> {
  coordinates: Coords;
  voteCode: number;
}

export interface SpotDataToSend
  extends Omit<SpotServerBrief, "id" | "mainImage" | "coordinates"> {
  longitude: string;
  latitude: string;
}

export interface VoteInfo {
  vote: number;
  parkPointId: number;
}
export enum VoteCode {
  Error = -1,
  Positive = 1,
  Negative = 2,
  Neutral = 3,
}
