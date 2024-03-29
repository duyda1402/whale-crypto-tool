import {
  ActionIcon,
  Avatar,
  Group,
  Loader,
  Stack,
  Tooltip,
  Text,
  Box,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTopologyStar3 } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { RootState } from "../../libs/store";
import ModalSelectNetwork from "../modals/ModalSelectNetwork";
import { useState } from "react";

type Props = {};

const RootSelector = ({}: Props) => {
  const network = useSelector((state: RootState) => state.selector.network);
  const [isHoverNetwork, setIsHoverNetwork] = useState<boolean>(false);
  const isLoadingNetwork = useSelector(
    (state: RootState) => state.selector.isLoadingNetwork
  );
  const openModalSelectNetwork = () =>
    modals.open({
      title: "Select a network",
      children: <ModalSelectNetwork onClose={modals.closeAll} />,
    });

  return (
    <Stack>
      {/* Network */}
      <Group
        onClick={openModalSelectNetwork}
        onMouseLeave={() => setIsHoverNetwork(false)}
        onMouseEnter={() => setIsHoverNetwork(true)}
        bg="white"
        px="sm"
        py="xs"
        sx={(theme) => ({
          borderTopLeftRadius: theme.radius.xl,
          borderBottomLeftRadius: theme.radius.xl,
          boxShadow: theme.shadows.sm,
          cursor: "pointer",
          transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          transitionProperty: "all",
          transitionDuration: "500ms",
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
        <Box
          sx={{
            display: isHoverNetwork ? "block" : "none",
          }}
        >
          <Text size="sm">{network?.networkName}</Text>
          <Text size="xs" opacity={0.65}>
            chainId: {network?.chainId}
          </Text>
        </Box>
      </Group>
    </Stack>
  );
};

export default RootSelector;
