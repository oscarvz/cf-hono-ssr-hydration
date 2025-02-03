import { useEffect, useState } from "react";
import { useBearStore } from "../../hooks";
import { Badge } from "@radix-ui/themes";

type TotalLikesProps = {
  totalLikes: number;
};

export function TotalLikes({ totalLikes }: TotalLikesProps) {
  const stateLikes = useBearStore((state) => state.totalLikes);
  const [likes, setLikes] = useState(totalLikes);

  useEffect(() => setLikes(stateLikes), [stateLikes]);

  return <Badge size="3">{likes}</Badge>;
}
