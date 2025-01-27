import { type PropsWithChildren, useEffect, useRef } from "react";

export function Thing(
  {
    children,
    // color,
  }: PropsWithChildren /* <{ color: string }> */,
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.style.backgroundColor = "green";
  }, []);

  return (
    <div style={{ backgroundColor: "orange", height: 40 }} ref={ref}>
      {children}
    </div>
  );
}
