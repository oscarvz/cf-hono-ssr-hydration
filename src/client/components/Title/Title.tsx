import { useEffect, useRef, type PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.innerHTML = "💧💙";
  }, []);

  return (
    <h1>
      {children} <span ref={ref}>🔥🧡</span>
    </h1>
  );
}
