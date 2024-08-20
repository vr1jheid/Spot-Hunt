import { create } from "zustand";

export interface PointsSheetStore {
  open: boolean;
  setOpen: (state: boolean) => void;
}

export const usePointsSheet = create<PointsSheetStore>((set) => ({
  open: false,
  setOpen: (state: boolean) => set({ open: state }),
}));
