import { create } from "zustand";

export interface MenuStore {
  open: boolean;
  setOpen: (state: boolean) => void;
}

export const useMenu = create<MenuStore>((set) => ({
  open: false,
  setOpen: (state: boolean) => set({ open: state }),
}));
