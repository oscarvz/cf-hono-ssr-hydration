import { useRequestContext } from "@hono/react-renderer";
import { Badge, Box, Switch } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { useBearStore } from "../../hooks";

type TotalLikesProps = {
  totalLikes: number;
};

export function TotalLikes({ totalLikes }: TotalLikesProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stateLikes = useBearStore((state) => state.totalLikes);
  const [likes, setLikes] = useState(totalLikes);

  useEffect(() => {
    setLikes(stateLikes);
    rootRef.current = document.getElementById("root");
  }, [stateLikes]);

  const handleOnClick = ({
    currentTarget: { dataset },
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const theme = dataset.state === "unchecked" ? "light" : "dark";
    document.cookie = `theme=${theme}; path=/; SameSite=Strict`;

    const root = rootRef.current;
    if (!root) return;

    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
  };

  return (
    <Box>
      <Badge size="3">{likes}</Badge>
      <Switch
        onClick={handleOnClick}
        variant="classic"
        style={{ cursor: "pointer" }}
      />
    </Box>
  );
}
