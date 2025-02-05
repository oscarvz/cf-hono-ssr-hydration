import { Hono } from "hono";
import { ImageGrid, Layout } from "./client/components";
import { hydratedComponents } from "./client/components-hydrate";
import { reactRendererMiddleware } from "./middleware";

// TODO: Awkward api, explore options
const { ImageCard, Title, TotalLikes } = hydratedComponents;

const web = new Hono();

web.use("*", reactRendererMiddleware);

web.get("/", (c) => {
  // const db = c.get("db");
  // const dogs = db.get(dogs)...
  const dogs = [
    { imgSrc: "https://placedog.net/500", alt: "portrait of Jules", likes: 7 },
    { imgSrc: "https://placedog.net/501", alt: "action pic of Pip", likes: 8 },
    { imgSrc: "https://placedog.net/502", alt: "July", likes: 12 },
    { imgSrc: "https://placedog.net/503", alt: "kitten", likes: 3 },
  ];

  const totalLikes = dogs.reduce((acc, { likes }) => acc + likes, 0);
  const state = { initialState: { totalLikes } };

  return c.render(
    <Layout title={<Title>Shokaki</Title>} nav={<TotalLikes />}>
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
