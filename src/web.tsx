import type { ReactNode } from "hono/jsx";
import { Hono } from "hono";
import { reactRenderer } from "@hono/react-renderer";
import { Children, isValidElement, type ReactElement } from "react";

import components from "./client/components";
import { AssetTags } from "./utils";

const web = new Hono();

web.use(
  "*",
  reactRenderer(
    ({ children }) => {
      // const mapChildren = (children: ReactElement) =>
      //   Children.toArray(children)
      //     .filter(isValidElement)
      //     .map((child) => {
      //       const anonFn = child.type.toString(); /* wonky but fine in dev */
      //       const cName = anonFn.match(/fileName: ".*\/(.*?)\.tsx"/)?.[1] ?? "";

      //       if (cName) {
      //         console.log("hi got to the cName", cName);

      //         const props = JSON.stringify(child.props);

      //         return [
      //           <div
      //             style={{ display: "contents" }}
      //             key={cName}
      //             data-hydrate-name={cName}
      //             data-hydrate-props={props}
      //           >
      //             {child}
      //           </div>,
      //         ];
      //       }

      //       if (
      //         child.props &&
      //         typeof child.props === "object" &&
      //         "children" in child.props &&
      //         typeof child.props.children !==
      //           "string" /* NEEDS WORK, check if type is proper */
      //       ) {
      //         return mapChildren(child.props.children);
      //       }

      //       return child;
      //     });

      // const newChildren = mapChildren(children);

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
            <div id="root">{children}</div>
          </body>
        </html>
      );
    },
    {
      docType: true,
    },
  ),
);

const Hello = components.Counter;

web.get("/", (c) =>
  c.render(
    <div>
      <Hello count={2} />
    </div>,
  ),
);

// web.get("/", (c) =>
//   c.render(
//     <div>
//       <Thing />
//       <h1>
//         <p>hellllllo</p>
//       </h1>
//       <Counter score={1} />
//     </div>,
//   ),
// );

export default web;
