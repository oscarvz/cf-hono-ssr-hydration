import { reactRenderer } from "@hono/react-renderer";
import { Theme } from "@radix-ui/themes";
import type { ReactNode } from "react";
import type { Manifest } from "vite";
import { type State, StateContext } from "../context";

declare module "@hono/react-renderer" {
  interface Props {
    initialState: Pick<State, "totalLikes">;
    title?: string;
  }
}

export const reactRendererMiddleware = reactRenderer(
  ({ children, initialState, title }) => (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>{title ?? "Home"}</title>
        <link rel="icon" href="/favicon.svg" />
        <AssetTags />
      </head>

      {/*
        Pass the global state as a data attribute; read it in the client-side
        context provider.
      */}
      <body data-initial-state={JSON.stringify(initialState)}>
        <Theme id="root" appearance="dark" accentColor="cyan" radius="large">
          <StateContext.Provider value={initialState}>
            {children}
          </StateContext.Provider>
        </Theme>
      </body>
    </html>
  ),
  { docType: true },
);

/**
 * Helper component that reads the Vite manifest and returns the import tags for
 * the JS/CSS assets processed by Vite.
 * Setting `build.manifest` to `true` in the Vite config is required for this.
 * Borrowed from Honox's excellent link component:
 * https://github.com/honojs/honox/blob/main/src/server/components/link.tsx
 */
function AssetTags() {
  if (import.meta.env.DEV) {
    return <script type="module" src="/src/client/index.tsx" />;
  }

  const rootManifest = import.meta.glob<{ default: Manifest }>(
    "/public/.vite/manifest.json",
    { eager: true },
  );

  const manifest = Object.values(rootManifest).at(0)?.default;
  if (!manifest) {
    return null;
  }

  const importTags = Object.values(manifest).reduce<ReactNode[]>(
    (tags, { file, css }) =>
      tags.concat([
        <script key={file} type="module" src={file} />,

        ...(css?.map((cssPath) => (
          <link key={cssPath} rel="stylesheet" href={cssPath} />
        )) || []),
      ]),
    [],
  );

  return importTags;
}
