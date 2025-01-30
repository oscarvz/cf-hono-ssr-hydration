import { useId } from "hono/jsx";
import type { PropsWithChildren } from "react";

export function hydrate<P extends PropsWithChildren>(
  Component: React.FC<P>,
): React.FC<P> {
  return (props) => {
    const { children, ...hydrationProps } = props;
    const id = useId();

    return (
      <div
        data-hydrate-props={JSON.stringify(hydrationProps)}
        data-hydrate-id={id}
      >
        <Component {...props} />
      </div>
    );
  };
}
