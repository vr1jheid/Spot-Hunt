import { create } from "zustand";

import { Coords } from "../Types/Сoords";

export interface UserStore {
  id: string | null;
  setID: (id: string) => void;
  location: Coords | null;
  setLocation: (location: Coords) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  id: null,
  location: null,
  setLocation: (location: Coords) => set(() => ({ location })),
  setID: (id) => set(() => ({ id })),
}));
