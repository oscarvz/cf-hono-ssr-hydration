import { Flex, Grid } from "@radix-ui/themes";

export function ImageGrid({ children }: { children: React.ReactNode }) {
  return (
    <Flex align="center" justify="center">
      <Grid columns={{ xs: "2" }} gap="4">
        {children}
      </Grid>
    </Flex>
  );
}
