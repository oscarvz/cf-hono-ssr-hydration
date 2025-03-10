import type { PropsWithChildren } from "react";

import type * as components from "./components";
type Components = typeof components;

// This implementation can be a whole lot better - explore options

// *sobs* probably go for an 'islands' directory instead of treating every
// single component as one that needs to be hydrated - and therefor wrapping it
const globImports: Record<
  string,
  Record<string, React.FC<unknown>>
> = import.meta.glob("./components/**/*.tsx", { eager: true });

export const { ...hydratedComponents } = Object.values(globImports)
  .map((obj) => {
    const [[name, Component]] = Object.entries(obj);
    const wrappedComponent = hydrate(Component, name);
    return Object.fromEntries([[name, wrappedComponent]]);
  })
  .reduce((acc, curr) => Object.assign(curr, acc), {} as Components);

function hydrate<P extends PropsWithChildren>(
  Component: React.FC<P>,
  name: string,
) {
  return (props: P) => (
    <div data-hydrate-name={name} data-hydrate-props={JSON.stringify(props)}>
      <Component {...props} />
    </div>
  );
}
