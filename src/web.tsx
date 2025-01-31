import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { ImageGrid, Layout } from "./client/components";
import { hydratedComponents } from "./client/components-hydrate";
import { AssetTags } from "./utils";

const { ImageCard, Title } = hydratedComponents;

const web = new Hono();

web.use(
  "*",
  reactRenderer(
    ({ children }) => (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>turtles</title>
          <link rel="icon" href="/favicon.svg" />
          <AssetTags />
        </head>

        <body>
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
    { imgSrc: "https://placedog.net/500", alt: "kitten" },
    { imgSrc: "https://placedog.net/501", alt: "kitten" },
  ];

  return c.render(
    <Layout title={<Title>Shokaki</Title>}>
      <ImageGrid>
        {dogs.map(({ alt, imgSrc }) => (
          <ImageCard key={imgSrc} src={imgSrc} alt={alt} />
        ))}
      </ImageGrid>
    </Layout>,
  );
});

export default web;
