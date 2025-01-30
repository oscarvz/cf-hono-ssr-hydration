import type { ComponentProps } from "react";
import { createPortal } from "react-dom";
import { hydrateRoot } from "react-dom/client";

import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const globImports: Record<string, Record<string, React.FC>> = import.meta.glob(
  "./**/*.tsx",
  { eager: true },
);

const components = Object.values(globImports)
  .map((importer) => Object.fromEntries(Object.entries(importer)))
  .reduce((acc, curr) => Object.assign(curr, acc), {});

for (const [name, Component] of Object.entries(components)) {
  const element = document.querySelector(`[data-hydrate-name="${name}"]`);
  if (!element) {
    continue;
  }

  const props: ComponentProps<typeof Component> = JSON.parse(
    element.getAttribute("data-hydrate-props") ?? "{}",
  );

  hydrateRoot(element, createPortal(<Component {...props} />, element));

  element.removeAttribute("data-hydrate-props");
}
