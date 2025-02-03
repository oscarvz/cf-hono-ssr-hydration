import { reactRenderer, useRequestContext } from "@hono/react-renderer";
import { Theme } from "@radix-ui/themes";
import { Hono } from "hono";
import { ImageGrid, Layout } from "./client/components";
import { hydratedComponents } from "./client/components-hydrate";
import { AssetTags } from "./utils";
import { getCookie } from "hono/cookie";

const { ImageCard, Title, TotalLikes } = hydratedComponents;

const web = new Hono();

declare module "@hono/react-renderer" {
  interface Props {
    initialState?: {
      totalLikes?: number;
    };
  }
}

function isValidTheme(cookieString?: string): cookieString is "dark" | "light" {
  return cookieString === "dark" || cookieString === "light";
}

web.use(
  "*",
  reactRenderer(
    ({ children, initialState, c }) => {
      const cookieString = getCookie(c, "theme");
      const appearance = isValidTheme(cookieString) ? cookieString : "dark";

      return (
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
            <title>turtles</title>
            <link rel="icon" href="/favicon.svg" />
            <AssetTags />
          </head>

          <body data-initial-state={JSON.stringify(initialState)}>
            <Theme
              id="root"
              appearance={appearance}
              accentColor="cyan"
              radius="large"
            >
              {children}
            </Theme>
          </body>
        </html>
      );
    },
    { docType: true },
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
  const state = { initialState: { totalLikes } };

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
    state,
  );
});

export default web;
