import { Map } from "mapbox-gl";
import { create } from "zustand";

export interface MapStore {
  map: Map | null;
  isLoaded: boolean;
  setMap: (map: Map) => void;
  setLoaded: (value: boolean) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  map: null,
  isLoaded: false,
  setMap: (map: Map) => set({ map }),
  setLoaded: (isLoaded: boolean) => set({ isLoaded }),
}));
