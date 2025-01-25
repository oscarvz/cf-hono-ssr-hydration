import { type ComponentProps, StrictMode, useMemo } from "react";
import { createPortal } from "react-dom";
import { hydrateRoot } from "react-dom/client";

import * as components from "./components";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

function App() {
  const portals = useMemo(() => {
    return Object.entries(components).flatMap(([name, Component]) => {
      const elements = [
        ...document.querySelectorAll(`[data-hydrate-name="${name}"]`),
      ];

      return elements.map((element) => {
        const props: ComponentProps<typeof Component> = JSON.parse(
          element.getAttribute("data-hydrate-props") ?? "{}",
        );

        return createPortal(<Component {...props} />, element);
      });
    });
  }, []);

  return portals;
}

hydrateRoot(
  root,
  <StrictMode>
    <App />
  </StrictMode>,
);
