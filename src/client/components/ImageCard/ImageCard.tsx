import { useState } from "react";
import styles from "./ImageCard.module.css";
import { useBearStore } from "../useBearStore";

type ImageCardProps = {
  alt: string;
  likes: number;
  src: string;
};

export function ImageCard({ alt, likes, src }: ImageCardProps) {
  const [currentLikes, setCurrentLikes] = useState(likes);
  const increment = useBearStore((state) => state.incrementLikes);

  const handleLike = () => {
    increment();
    setCurrentLikes((prev) => prev + 1);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={src} alt={alt} />
      </div>

      <div className={styles.vote}>
        <button type="button" onClick={handleLike}>
          {currentLikes > 0 ? "❤️" : "🩶"}
        </button>
        <span>{currentLikes}</span>
      </div>
    </div>
  );
}
