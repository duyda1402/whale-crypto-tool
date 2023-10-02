import { Group, Stack, SystemProp, Text, Title } from "@mantine/core";
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
    <Group h={height} align="center" px="xl">
      <Stack spacing="xs">
        <Title>{code}</Title>
        <Text color="gray.7">{description}</Text>
      </Stack>
    </Group>
  );
};

export default ErrorLayout;
