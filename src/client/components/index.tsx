import { hydrate } from "../hydrate";

export * from "./Counter";
export * from "./Thing";
export * from "./Hello";

const globImports: Record<
  string,
  Record<string, React.FC<unknown>>
> = import.meta.glob("./**/*.tsx", { eager: true });

const mergedObject = Object.values(globImports)
  .map((importer) => Object.fromEntries(Object.entries(importer)))
  .map((obj) => {
    const [[name, Component]] = Object.entries(obj);
    const newComponent = hydrate(Component, name);
    return Object.fromEntries([[name, newComponent]]);
  })
  .reduce((acc, curr) => Object.assign(curr, acc), {});

export default mergedObject;
