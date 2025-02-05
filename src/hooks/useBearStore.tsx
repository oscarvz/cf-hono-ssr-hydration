import { useContext, useMemo } from "react";
import type { StoreApi } from "zustand";
import { type UseBoundStore, create } from "zustand/react";
import { type State, StateContext } from "../context";

// This needs work as it's absolultely not scalable
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
