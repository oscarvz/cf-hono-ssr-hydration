import { useContext, useMemo } from "react";
import type { StoreApi } from "zustand";
import { create, type UseBoundStore } from "zustand/react";
import { StateContext, type State } from "../../context/StateContext";

type BearState = State & {
  incrementLikes: () => void;
  setTotalLikes: (totalLikes: number) => void;
};

let bearStoreInstance: UseBoundStore<StoreApi<BearState>> | undefined;
function getBearStoreInstance(initialState: State) {
  if (!bearStoreInstance) {
    bearStoreInstance = create<BearState>((set) => ({
      ...initialState,
      incrementLikes: () =>
        set((state) => ({ totalLikes: state.totalLikes + 1 })),
      setTotalLikes: (totalLikes) => set({ totalLikes }),
    }));
  }

  return bearStoreInstance;
}

type StateSelector<T> = (state: BearState) => T;

export function useBearStore<T>(args: StateSelector<T>) {
  const state = useContext(StateContext);
  const bearStore = useMemo(() => getBearStoreInstance(state), [state]);

  return bearStore(args);
}
