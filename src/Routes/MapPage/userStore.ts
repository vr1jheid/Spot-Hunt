import { create } from "zustand";
import { Coords } from "../../Types/Сoords";

export interface UserStore {
  location: Coords | null;
  setLocation: (location: Coords) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  location: null,
  setLocation: (location: Coords) => set(() => ({ location })),
}));
