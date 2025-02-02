import { useEffect, useState } from "react";
import { useBearStore } from "../../hooks";

type TotalLikesProps = {
  totalLikes: number;
};

export function TotalLikes({ totalLikes }: TotalLikesProps) {
  const [likes, setLikes] = useState(totalLikes);

  const stateLikes = useBearStore((state) => state.totalLikes);
  const setTotalLikes = useBearStore((state) => state.setTotalLikes);

  useEffect(() => setTotalLikes(totalLikes), [setTotalLikes, totalLikes]);
  useEffect(() => setLikes(stateLikes), [stateLikes]);

  return <div>Total likes: {likes}</div>;
}
