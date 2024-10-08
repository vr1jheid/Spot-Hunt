import { Coords } from "shared/model/coords.types";
import { create } from "zustand";

export interface UserStore {
  id: string | null;
  setID: (id: string) => void;
  location: Coords | null;
  setLocation: (location: Coords) => void;
  showUnapproved: boolean;
  setShowUnapproved: (showUnapproved: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  id: null,
  location: null,
  showUnapproved: false,

  setLocation: (location: Coords) => set(() => ({ location })),
  setID: (id) => set(() => ({ id })),
  setShowUnapproved: (showUnapproved) => set(() => ({ showUnapproved })),
}));
