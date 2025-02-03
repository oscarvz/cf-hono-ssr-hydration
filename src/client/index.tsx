import "@radix-ui/themes/styles.css";
import { createPortal } from "react-dom";
import { hydrateRoot } from "react-dom/client";
import "./index.css";

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
  .reduce((acc, curr) => Object.assign(curr, acc), {});

for (const [name, Component] of Object.entries(hydratedComponents)) {
  const elements = document.querySelectorAll(`[data-hydrate-name="${name}"]`);

  for (const mountingElement of elements) {
    const props = JSON.parse(
      mountingElement.getAttribute("data-hydrate-props") ?? "{}",
    );

    hydrateRoot(
      mountingElement,
      createPortal(<Component {...props} />, mountingElement),
    );
    mountingElement.removeAttribute("data-hydrate-props");
  }
}
