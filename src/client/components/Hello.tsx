import { type PropsWithChildren, useEffect, useRef } from "react";

type HelloProps = {
  name: string;
};

export function Hello({ children, name }: PropsWithChildren<HelloProps>) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = "Hello from React";
    }
  }, []);

  return (
    <h1 ref={ref}>
      Hello {name} {children}
    </h1>
  );
}
