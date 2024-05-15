import {
  ActionIcon,
  Box,
  Group,
  Loader,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCurrencyEthereum } from "@tabler/icons-react";
import { getBalance } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useAccount, useChainId } from "wagmi";
import { wagmiConfig } from "../../main";
import { shortenString } from "../../ultis";

type Props = {};

const RootSelector = ({}: Props) => {
  // const [isHoverNetwork, setIsHoverNetwork] = useState<boolean>(false);
  const [isHoverAccount, setIsHoverWallet] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("0");

  const { address, status } = useAccount();
  const { open: openModalConnect } = useWeb3Modal();

  const chainId = useChainId();

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

  return (
    <Stack align="flex-end">
      {/* Network */}
      {/* <Group
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
        {chainId ? (
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
            display: isHoverNetwork && network ? "block" : "none",
          }}
        >
          <Text size="sm">{network?.networkName}</Text>
          <Text size="xs" opacity={0.65}>
            chainId: {network?.chainId}
          </Text>
        </Box>
      </Group> */}
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
        <Tooltip label={`Chain Id: ${chainId}`} position="bottom-start">
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
            <Text size="xs" opacity={0.65}></Text>
          </Box>
        </Tooltip>
      </Group>
    </Stack>
  );
};

export default RootSelector;
