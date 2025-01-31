import { create } from "zustand";

type State = {
  totalLikes: number;
  incrementLikes: () => void;
  setTotalLikes: (totalLikes: number) => void;
};

export const useBearStore = create<State>((set, get) => ({
  totalLikes: 0,
  incrementLikes: () => set((state) => ({ totalLikes: state.totalLikes + 1 })),
  setTotalLikes: (totalLikes: number) => set({ totalLikes }),
}));
