import { useEffect, useState } from "react";
import { useBearStore } from "../../hooks";

type TotalLikesProps = {
  totalLikes: number;
};

export function TotalLikes({ totalLikes }: TotalLikesProps) {
  const stateLikes = useBearStore((state) => state.totalLikes);
  const [likes, setLikes] = useState(totalLikes);

  useEffect(() => setLikes(stateLikes), [stateLikes]);

  return <div>Total likes: {likes}</div>;
}
