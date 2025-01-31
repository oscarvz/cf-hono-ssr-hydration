import styles from "./ImageCard.module.css";

export function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={src} alt={alt} />
      </div>

      <div className={styles.vote}>
        <span>🤍</span>
        <span>5</span>
      </div>
    </div>
  );
}
