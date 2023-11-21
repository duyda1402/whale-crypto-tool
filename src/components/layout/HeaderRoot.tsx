import { Group, Text, UnstyledButton, createStyles, rem } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { HEADER_HEIGHT } from "../../common";

const useStyles = createStyles((_theme) => ({
  header: {
    height: rem(HEADER_HEIGHT),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const HeaderRoot = () => {
  const { classes } = useStyles();
  return (
    <header className={classes.header}>
      <UnstyledButton
        onClick={() => {
          console.log("Click");
        }}
      >
        <Group spacing={4}>
          <IconArrowLeft />
          <Text fw={700}>Back to dashboard</Text>
        </Group>
      </UnstyledButton>
    </header>
  );
};

export default HeaderRoot;
