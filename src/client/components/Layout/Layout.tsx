import type { PropsWithChildren, ReactNode } from "react";

import styles from "./Layout.module.css";

type LayoutProps = PropsWithChildren<{
  title: ReactNode;
  nav?: ReactNode;
}>;

export function Layout({ children, nav, title }: LayoutProps) {
  return (
    <div className={styles.grid}>
      <header className={styles.header}>
        {title}
        {nav}
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
