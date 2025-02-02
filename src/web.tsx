import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { ImageGrid, Layout } from "./client/components";
import { hydratedComponents } from "./client/components-hydrate";
import { AssetTags } from "./utils";

const { ImageCard, Title, TotalLikes } = hydratedComponents;

const web = new Hono();

declare module "@hono/react-renderer" {
  interface Props {
    inistialState: { totalLikes: number };
  }
}

web.use(
  "*",
  reactRenderer(
    ({ children, inistialState }) => (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>turtles</title>
          <link rel="icon" href="/favicon.svg" />
          <AssetTags />
        </head>

        <body data-initial-state={JSON.stringify(inistialState)}>
          <div id="root">{children}</div>
        </body>
      </html>
    ),
    {
      docType: true,
    },
  ),
);

web.get("/", (c) => {
  // const db = c.get("db");
  // fetch some of the doawgs and their amount of likes

  const dogs = [
    { imgSrc: "https://placedog.net/500", alt: "kitten", likes: 1 },
    { imgSrc: "https://placedog.net/501", alt: "kitten", likes: 8 },
  ];

  const totalLikes = dogs.reduce((acc, { likes }) => acc + likes, 0);

  return c.render(
    <Layout
      title={<Title>Shokaki</Title>}
      nav={<TotalLikes totalLikes={totalLikes} />}
    >
      <ImageGrid>
        {dogs.map(({ alt, imgSrc, likes }) => (
          <ImageCard key={imgSrc} src={imgSrc} alt={alt} likes={likes} />
        ))}
      </ImageGrid>
    </Layout>,
    {
      inistialState: {
        totalLikes,
      },
    },
  );
});

export default web;
