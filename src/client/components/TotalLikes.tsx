import { Badge } from "@radix-ui/themes";
import { useBearStore } from "../../hooks";

export function TotalLikes() {
  const totalLikes = useBearStore((state) => state.totalLikes);

  return <Badge size="3">{totalLikes}</Badge>;
}
