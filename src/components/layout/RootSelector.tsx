import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Loader,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCurrencyEthereum, IconTopologyStar3 } from "@tabler/icons-react";
import { getBalance } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { RootState } from "../../libs/store";
import { wagmiConfig } from "../../main";
import { shortenString } from "../../ultis";
import ModalSelectNetwork from "../modals/ModalSelectNetwork";

type Props = {};

const RootSelector = ({}: Props) => {
  const network = useSelector((state: RootState) => state.selector.network);
  const [isHoverNetwork, setIsHoverNetwork] = useState<boolean>(false);
  const [isHoverAccount, setIsHoverWallet] = useState<boolean>(false);
  const isLoadingNetwork = useSelector(
    (state: RootState) => state.selector.isLoadingNetwork
  );
  const [balance, setBalance] = useState<string>("0");

  const { address, status } = useAccount();
  const { open: openModalConnect } = useWeb3Modal();

  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        const value = await getBalance(wagmiConfig, {
          address: address,
        });

        setBalance(value?.formatted || "0");
      }
    };
    fetchBalance();
  }, [address]);

  const openModalSelectNetwork = () =>
    modals.open({
      title: "Select a network",
      children: <ModalSelectNetwork onClose={modals.closeAll} />,
    });

  return (
    <Stack align="flex-end">
      {/* Network */}
      <Group
        onClick={openModalSelectNetwork}
        onMouseLeave={() => setIsHoverNetwork(false)}
        onMouseEnter={() => setIsHoverNetwork(true)}
        bg="white"
        px="sm"
        py="xs"
        noWrap
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
            <ActionIcon variant="filled" color="cyan" radius={99}>
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
      {/* connect wallet */}
      <Group
        onClick={() => openModalConnect()}
        onMouseLeave={() => setIsHoverWallet(false)}
        onMouseEnter={() => setIsHoverWallet(true)}
        bg="white"
        px="sm"
        py="xs"
        noWrap
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
        {status === "connected" && (
          <Jazzicon diameter={38} seed={jsNumberForAddress(`${address}`)} />
        )}
        {status === "disconnected" && (
          <Tooltip label="Connecting Wallet" position="right">
            <ActionIcon variant="filled" color="cyan" radius={99}>
              <IconCurrencyEthereum />
            </ActionIcon>
          </Tooltip>
        )}
        {status === "connecting" || (status === "reconnecting" && <Loader />)}
        <Box
          sx={{
            maxWidth: "200px",
            display:
              isHoverAccount && status === "connected" ? "block" : "none",
          }}
        >
          <Text size="sm" lineClamp={1}>
            {shortenString(address || "", 18)}
          </Text>
          <Text size="xs" opacity={0.65}>
            Balance: {balance}
          </Text>
        </Box>
      </Group>
    </Stack>
  );
};

export default RootSelector;
