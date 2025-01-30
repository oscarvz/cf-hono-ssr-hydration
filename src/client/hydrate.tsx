import type { PropsWithChildren } from "react";

export function hydrate<P extends PropsWithChildren>(
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
