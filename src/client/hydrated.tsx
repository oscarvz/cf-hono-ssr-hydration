import type { PropsWithChildren } from "react";

import type * as components from "./components";
type Components = typeof components;

const globImports: Record<
  string,
  Record<string, React.FC<unknown>>
> = import.meta.glob("./components/**/*.tsx", { eager: true });

export const { ...Components } = Object.values(globImports)
  .map((importer) => Object.fromEntries(Object.entries(importer)))
  .map((obj) => {
    const [[name, Component]] = Object.entries(obj);
    const newComponent = hydrate(Component, name);
    return Object.fromEntries([[name, newComponent]]);
  })
  .reduce((acc, curr) => Object.assign(curr, acc), {} as Components);

function hydrate<P extends PropsWithChildren>(
  Component: React.FC<P>,
  name: string,
): React.FC<P> {
  return (props) => {
    const { children, ...hydrationProps } = props;

    return (
      <div
        data-hydrate-name={name}
        data-hydrate-props={JSON.stringify(hydrationProps)}
      >
        <Component {...props} />
      </div>
    );
  };
}
