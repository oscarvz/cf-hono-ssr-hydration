import { hc } from "hono/client";
import {
  Children,
  Fragment,
  type PropsWithChildren,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

import type { Api } from "../../api";
import styles from "./Counter.module.css";
const client = hc<Api>("/api");

function componentDecorator<P>(Component: React.ComponentType<P>): React.FC<P> {
  return (props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const placeholder = ref.current;
      const component = placeholder?.nextSibling;
      if (!placeholder || !component || !(component instanceof HTMLElement)) {
        return;
      }

      console.log("component name in hoc", Component.name);
      component.setAttribute("data-component", Component.name);
      component.setAttribute("data-props", JSON.stringify(props));
    }, [Component.name, props]);

    return (
      <Fragment>
        <div ref={ref} style={{ display: "none" }} />
        {/* @ts-ignore */}
        <Component {...props} />
      </Fragment>
    );
  };
}

function Island({ children }: PropsWithChildren) {
  const rootElement = Children.toArray(children).find(isValidElement);
  // console.log("rootElement", rootElement);

  return children;
}

export function Counter({ score }: { score: number }) {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>();

  const getScore = async () => {
    try {
      const res = await client.index.$get();
      const { message } = await res.json();
      setMessage(message);
    } catch (error) {
      console.error("Error fetching message", error);
    }
  };

  return (
    <section className={styles.section}>
      <div data-content-grid>
        <div>
          <button type="button" onClick={() => setCount((c) => c + 1)}>
            Increase count
          </button>
          <span>Count: {count}</span>
          <span>score: {score}</span>
        </div>

        <div>
          <button type="button" onClick={getScore} disabled={!!message}>
            Fetch message
          </button>
          <span>{message}</span>
        </div>
      </div>
    </section>
  );
}
