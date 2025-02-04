import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Box, Card, Grid, IconButton, Inset, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useBearStore } from "../../../hooks";

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
    <Box maxWidth="320px">
      <Card size="1">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={src}
            alt={alt}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 240,
              aspectRatio: "4 / 3",
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>

        <Grid columns="auto 1fr" gap="2" p="0" align="center">
          <IconButton size="1" variant="classic" onClick={handleLike}>
            <HeartFilledIcon />
          </IconButton>

          <Text>{currentLikes}</Text>
        </Grid>
      </Card>
    </Box>
  );
}
