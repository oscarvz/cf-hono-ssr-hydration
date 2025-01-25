import { Hono } from "hono";
import { reactRenderer } from "@hono/react-renderer";
import { Children, isValidElement } from "react";

import { Counter } from "./client/components";
import { AssetTags } from "./utils";

const web = new Hono();

web.use(
  "*",
  reactRenderer(
    ({ children }) => {
      const newChildren = Children.toArray(children)
        .filter(isValidElement)
        .map((child) => {
          const anonymousFunction =
            child.type.toString(); /* wonky but fine in dev */
          const componentName =
            anonymousFunction.match(/fileName: ".*\/(.*?)\.tsx"/)?.[1] ?? "";

          if (
            child.props &&
            typeof child.props === "object" &&
            Object.keys(child.props).length === 0
          ) {
            return child;
          }

          const props = JSON.stringify(child.props);

          return [
            <div
              style={{ display: "contents" }}
              key={componentName}
              data-hydrate-name={componentName}
              data-hydrate-props={props}
            />,
            child,
          ];
        });

      return (
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
            <title>Wow cf-workers-hono-client-side</title>
            <link rel="icon" href="/favicon.svg" />

            <AssetTags />
          </head>

          <body>
            <div id="root">{newChildren}</div>
          </body>
        </html>
      );
    },
    { docType: true },
  ),
);

web.get("/", (c) => c.render(<Counter score={1} />));

export default web;
