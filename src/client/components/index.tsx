import type { PropsWithChildren } from "react";

export * from "./Counter";
export * from "./Thing";
export * from "./Hello";

const globImports: Record<
  string,
  Record<string, React.ComponentType>
> = import.meta.glob("./**/*.tsx", { eager: true });

const mergedObject = Object.values(globImports)
  .map((importer) =>
    Object.fromEntries(Object.entries(importer)),
  ) /* add wrapping div with props etc. somewhere here */
  .reduce((acc, curr) => Object.assign(curr, acc), {});

export default mergedObject;

function hydrate<P extends PropsWithChildren>(
  Component: React.FC<P>,
  name: string,
): React.FC<P> {
  return (props) => {
    const { children, ...hydrationProps } = props;

    return (
      <div
        data-hydrate-props={JSON.stringify(hydrationProps)}
        data-hydrate-name={name}
      >
        <Component {...props} />
      </div>
    );
  };
}
