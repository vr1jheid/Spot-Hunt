import { create } from "zustand";

export interface SpotsSheetStore {
  open: boolean;
  setOpen: (state: boolean) => void;
}

export const useSpotsSheet = create<SpotsSheetStore>((set) => ({
  open: false,
  setOpen: (state: boolean) => set({ open: state }),
}));
