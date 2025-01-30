import type { ComponentProps } from "react";
import { createPortal } from "react-dom";
import { hydrateRoot } from "react-dom/client";

import type * as components from "./components";
import "./index.css";

type AllComponents = typeof components;

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const globImports: Record<string, Record<string, React.FC>> = import.meta.glob(
  "./components/**/*.tsx",
  { eager: true },
);

const hydratedComponents = Object.values(globImports)
  .map((importer) => Object.fromEntries(Object.entries(importer)))
  .reduce((acc, curr) => Object.assign(curr, acc), {} as AllComponents);

for (const [name, Component] of Object.entries(hydratedComponents)) {
  const element = document.querySelector(`[data-hydrate-name="${name}"]`);
  if (!element) {
    continue;
  }

  const props: ComponentProps<typeof Component> = JSON.parse(
    element.getAttribute("data-hydrate-props") ?? "{}",
  );

  // @ts-expect-error TODO: map props properly
  hydrateRoot(element, createPortal(<Component {...props} />, element));
  element.removeAttribute("data-hydrate-props");
}
