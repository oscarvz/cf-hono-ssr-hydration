import { type ComponentProps, StrictMode, useMemo } from "react";
import { createPortal } from "react-dom";
import { hydrateRoot, createRoot } from "react-dom/client";

import * as components from "./components";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

Object.entries(components).map(([name, Component]) => {
  const element = document.querySelector(`[data-hydrate-name="${name}"]`);
  if (!element) {
    return null;
  }

  const props: ComponentProps<typeof Component> = JSON.parse(
    element.getAttribute("data-hydrate-props") ?? "{}",
  );

  // @ts-expect-error - requires props mapping for different components
  hydrateRoot(element, createPortal(<Component {...props} />, element));
});
