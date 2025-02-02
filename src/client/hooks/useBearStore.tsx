import { create } from "zustand/react";

type State = {
  totalLikes: number;
  incrementLikes: () => void;
  setTotalLikes: (totalLikes: number) => void;
};

export const useBearStore = create<State>((set) => {
  if (typeof window === "undefined" || !document) {
    return {
      totalLikes: 0,
      incrementLikes: () => {},
      setTotalLikes: () => {},
    };
  }

  const initialStateData = document.body.dataset.initialState;
  const state: Pick<State, "totalLikes"> = initialStateData
    ? JSON.parse(initialStateData)
    : { totalLikes: 0 };

  document.body.removeAttribute("data-initial-state");

  return {
    totalLikes: state.totalLikes,
    incrementLikes: () =>
      set((state) => ({ totalLikes: state.totalLikes + 1 })),
    setTotalLikes: (totalLikes: number) => set({ totalLikes }),
  };
});
