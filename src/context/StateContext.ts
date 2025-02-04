import { createContext } from "react";

export type State = {
  totalLikes: number;
  theme: "dark" | "light";
};

const initialState: State = {
  totalLikes: 0,
  theme: "dark",
};

export const StateContext = createContext<State>(getInitialState());

function getInitialState(): State {
  if (typeof window === "undefined" || !document) {
    return initialState;
  }

  const initialStateData = document.body.dataset.initialState;
  const initial: State = initialStateData
    ? JSON.parse(initialStateData)
    : initialState;

  document.body.removeAttribute("data-initial-state");

  return initial;
}

export function isValidTheme(string?: string): string is State["theme"] {
  return string === "dark" || string === "light";
}
