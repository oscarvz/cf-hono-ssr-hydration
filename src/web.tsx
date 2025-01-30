import { Hono } from "hono";
import { reactRenderer } from "@hono/react-renderer";

import { AssetTags } from "./utils";
import { Components } from "./client/hydrated";
const { Counter } = Components;

const web = new Hono();

web.use(
  "*",
  reactRenderer(
    ({ children }) => (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>Wow cf-workers-hono-client-side</title>
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

web.get("/", (c) => c.render(<Counter score={6554} />));

export default web;
