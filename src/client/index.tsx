import { type ComponentProps, StrictMode, useMemo } from "react";
import { createPortal } from "react-dom";
import { hydrateRoot, createRoot } from "react-dom/client";

import * as components from "./components";
import "./index.css";

// const globImports = import.meta.glob("./components/**/*.tsx");
// console.log("globImports", globImports);

console.log(components);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

Object.entries(components).map(([name, Component]) => {
  // console.log("name", name);
  // const something = import.meta.resolve(`./components/${name}.tsx`);
  // const something = import.meta.;
  // console.log("something", something);

  const element = document.querySelector(`[data-hydrate-id="${name}"]`);
  if (!element) {
    return null;
  }

  const props: ComponentProps<typeof Component> = JSON.parse(
    element.getAttribute("data-hydrate-props") ?? "{}",
  );

  // @ts-expect-error
  hydrateRoot(element, createPortal(<Component {...props} />, element));
});
