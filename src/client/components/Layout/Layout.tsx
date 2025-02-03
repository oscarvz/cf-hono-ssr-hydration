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
        style={{ borderBottom: "1px solid limegreen" }}
        align="center"
        py="4"
        px="6"
      >
        {title}
        <div />
        {nav}
      </Grid>

      <Box p="4">
        <main>{children}</main>
      </Box>
    </Grid>
  );
}
