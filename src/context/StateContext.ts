import { createContext } from "react";

export type State = {
  totalLikes: number;
};

const initialState: State = {
  totalLikes: 0,
};

/**
 * Context that is responsible for passing down global state props to the
 * Zustand store. When loaded on the client, it'll read the initial state from
 * the `data-initial-state` attribute on the body tag.
 */
export const StateContext = createContext<State>(getInitialState());

function getInitialState(): State {
  if (typeof window === "undefined" || !document) {
    return initialState;
  }

  const initialStateData = document.body.dataset.initialState;
  if (!initialStateData) {
    return initialState;
  }

  document.body.removeAttribute("data-initial-state");
  return JSON.parse(initialStateData);
}
