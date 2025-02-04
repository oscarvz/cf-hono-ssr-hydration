import type { PropsWithChildren, ReactNode } from "react";
import { Box, Grid } from "@radix-ui/themes";

type LayoutProps = PropsWithChildren<{
  title: ReactNode;
  nav?: ReactNode;
}>;

export function Layout({ children, nav, title }: LayoutProps) {
  return (
    <Grid rows="auto 100%" height="100%">
      <Grid
        columns="auto 1fr auto"
        style={{ boxShadow: "0 1px var(--gray-a4)" }}
        align="center"
        px="6"
        height="4rem"
      >
        {title}
        <div />
        {nav}
      </Grid>

      <Box px="6" py="4">
        <main>{children}</main>
      </Box>
    </Grid>
  );
}
