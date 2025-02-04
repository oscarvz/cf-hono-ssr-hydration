import { Heading } from "@radix-ui/themes";
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
    <Heading as="h1" m="0">
      {children} <span ref={ref}>🔥🧡</span>
    </Heading>
  );
}
