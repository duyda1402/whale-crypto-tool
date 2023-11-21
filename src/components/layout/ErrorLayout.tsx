import { Stack, SystemProp, Text, rem } from "@mantine/core";
import { CSSProperties } from "react";

type Props = {
  code?: number;
  description?: string;
  height?: SystemProp<CSSProperties["height"]>;
};

const ErrorLayout = ({
  code = 404,
  description = "Page not found!",
  height,
}: Props) => {
  return (
    <Stack spacing="xs" h={height} justify="center" px="xl">
      <Text fw={900} fz={rem(54)}>
        {code}
      </Text>
      <Text color="gray.7" fz={rem(24)}>
        {description}
      </Text>
    </Stack>
  );
};

export default ErrorLayout;
