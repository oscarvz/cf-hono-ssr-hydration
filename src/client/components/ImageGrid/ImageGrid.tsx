import styles from "./ImageGrid.module.css";

export function ImageGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}
