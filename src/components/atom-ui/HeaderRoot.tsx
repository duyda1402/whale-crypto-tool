import { Center, Group, Title } from "@mantine/core";

type Props = {
  title: string;
  leftRender?: React.ReactNode;
  rightRender?: React.ReactNode;
};

function HeaderRoot({ title, leftRender, rightRender }: Props) {
  return (
    <Center
      h="100%"
      pos="relative"
      p="md"
      sx={(theme) => ({
        boxShadow: theme.shadows.sm,
      })}
    >
      <Group pos="absolute" left={28}>
        {leftRender}
      </Group>
      <Title order={3} color="gray.8">
        {title}
      </Title>
      <Group pos="absolute" right={28}>
        {rightRender}
      </Group>
    </Center>
  );
}

export default HeaderRoot;
