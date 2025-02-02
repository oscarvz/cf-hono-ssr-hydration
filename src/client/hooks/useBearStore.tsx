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

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const initialStateData = rootElement.dataset.initialState;
  const state: State = initialStateData
    ? JSON.parse(initialStateData)
    : { totalLikes: 0 };

  return {
    totalLikes: state.totalLikes,
    incrementLikes: () =>
      set((state) => ({ totalLikes: state.totalLikes + 1 })),
    setTotalLikes: (totalLikes: number) => set({ totalLikes }),
  };
});
