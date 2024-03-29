import {
  ActionIcon,
  Avatar,
  Group,
  Loader,
  Stack,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTopologyStar3 } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { RootState } from "../../libs/store";
import ModalSelectNetwork from "../modals/ModalSelectNetwork";

type Props = {};

const RootSelector = ({}: Props) => {
  const network = useSelector((state: RootState) => state.selector.network);
  const isLoadingNetwork = useSelector(
    (state: RootState) => state.selector.isLoadingNetwork
  );
  const openModalSelectNetwork = () =>
    modals.open({
      title: "Select a network",
      children: <ModalSelectNetwork onClose={modals.closeAll} />,
    });

  return (
    <Stack maw={120}>
      {/* Network */}
      <Group
        onClick={openModalSelectNetwork}
        bg="white"
        px="sm"
        py="xs"
        sx={(theme) => ({
          borderTopLeftRadius: theme.radius.xl,
          borderBottomLeftRadius: theme.radius.xl,
          boxShadow: theme.shadows.sm,
          transition: "width 2s",
        })}
      >
        {isLoadingNetwork ? (
          <Loader />
        ) : network ? (
          <Tooltip label={network.networkName} position="right">
            <Avatar radius={99} src={network?.icon}>
              {network?.networkName?.at(0)}
            </Avatar>
          </Tooltip>
        ) : (
          <Tooltip label="Select Network" position="right">
            <ActionIcon variant="subtle" color="cyan">
              <IconTopologyStar3 />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Stack>
  );
};

export default RootSelector;
