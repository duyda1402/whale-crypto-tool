import {
  Popover,
  ThemeIcon,
  Stack,
  ActionIcon,
  Tooltip,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconApps, IconCode, IconTransform } from "@tabler/icons-react";

type Props = {};

const RootTool = ({}: Props) => {
  return (
    <Popover position="top" shadow="none">
      <Popover.Target>
        <ThemeIcon
          sx={(theme) => ({
            boxShadow: theme.shadows.md,
          })}
          variant="light"
          radius="xl"
          color="cyan"
          size={48}
        >
          <IconApps />
        </ThemeIcon>
      </Popover.Target>
      <Popover.Dropdown sx={{ background: "transparent", border: "none" }}>
        <Stack>
          <Tooltip label="Decoder Data" position="left">
            <ActionIcon
              onClick={() =>
                modals.openContextModal({
                  modal: "modalDecoderData",
                  title: <Title order={3}>Input Decoder Data</Title>,
                  innerProps: {},
                  size: "xl",
                })
              }
              variant="light"
              radius="xl"
              color="blue"
              size={44}
              sx={(theme) => ({
                boxShadow: theme.shadows.md,
              })}
            >
              <IconCode />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Convert Number" position="left">
            <ActionIcon
              onClick={() =>
                modals.openContextModal({
                  modal: "modalConvertNumber",
                  title: <Title order={3}>Convert Number</Title>,
                  innerProps: {},
                  size: "xl",
                })
              }
              variant="light"
              radius="xl"
              color="blue"
              size={44}
              sx={(theme) => ({
                boxShadow: theme.shadows.md,
              })}
            >
              <IconTransform />
            </ActionIcon>
          </Tooltip>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default RootTool;
