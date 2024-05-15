import { Button, ScrollArea, Stack, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";
import { RootState } from "../../libs/store";
import NetworkItem from "../atom-ui/NetworkItem";
import { NetworkIF } from "../../common/types";
import { ethers } from "ethers";
import { NotifySystem } from "../../common/notify";
import { ErrorBlockChain, PATH_ROUTER_BASE } from "../../common/enum/base";
import { useNavigate } from "react-router-dom";
import {
  actionLoadingNetwork,
  actionSelectNetwork,
} from "../../libs/store/reducers/selector.slice";
import { switchChain } from "@wagmi/core";
import { wagmiConfig } from "../../main";

type Props = {
  onClose: () => void;
};

function ModalSelectNetwork({ onClose }: Props) {
  const [search, setSearch] = useState<string>("");
  const networks = useSelector((state: RootState) => state.source.networks);
  const navigate = useNavigate();
  const networkSelect = useSelector(
    (state: RootState) => state.selector.network
  );
  const dispatch = useDispatch();
  const handlerAddNetwork = () => {
    onClose();
    return navigate(PATH_ROUTER_BASE.NETWORK_PAGE);
  };

  const handlerSelectNetwork = async (network: NetworkIF) => {
    dispatch(actionLoadingNetwork(true));
    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const RPC_URL = network?.rpcUrl;
      const SYMBOL_NAME = network?.currencySymbol;
      const NETWORK_NAME = network?.networkName;
      const CHAIN_ID = ethers.utils.hexStripZeros(
        ethers.utils.hexlify(Number(network?.chainId))
      );
      const BLOCK_EXPLORER = network?.blockExplorerUrl;
      const ICON_URL = network?.icon;
      try {
        await switchChain(wagmiConfig, { chainId: Number(network?.chainId) });
        dispatch(actionSelectNetwork(network));
        return onClose();
      } catch (err: any) {
        if (err?.code === 4902) {
          try {
            await provider.send("wallet_addEthereumChain", [
              {
                chainName: NETWORK_NAME,
                chainId: CHAIN_ID,
                rpcUrls: [RPC_URL],
                nativeCurrency: {
                  name: SYMBOL_NAME,
                  symbol: SYMBOL_NAME,
                  decimals: 18,
                },
                iconUrls: [ICON_URL],
                blockExplorerUrls: [BLOCK_EXPLORER],
              },
            ]);
            dispatch(actionSelectNetwork(network));
            return onClose();
          } catch (err: any) {
            if (err.code === 4001) {
              NotifySystem.error(ErrorBlockChain[4001]);
            }
          }
        } else if (err.code === 4001) {
          NotifySystem.error(ErrorBlockChain[4001]);
        }
      } finally {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        window.myProvider = provider;
      }
    } else {
      NotifySystem.error(ErrorBlockChain[9999]);
    }
  };

  return (
    <Stack p="md" spacing="xl">
      <TextInput
        placeholder="Search network"
        radius="xl"
        icon={<IconSearch size="1rem" />}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Network List */}

      <ScrollArea h={300}>
        <Stack>
          {lodash
            .filter(networks, (item) =>
              lodash.includes(
                lodash.toLower(item.networkName),
                lodash.toLower(search)
              )
            )
            .map((network) => {
              return (
                <React.Fragment key={network.uid}>
                  <NetworkItem
                    network={network}
                    onSelect={() =>
                      handlerSelectNetwork(network).finally(() =>
                        dispatch(actionLoadingNetwork(false))
                      )
                    }
                    uidActive={networkSelect?.uid}
                  />
                </React.Fragment>
              );
            })}
        </Stack>
      </ScrollArea>
      <Button onClick={handlerAddNetwork} variant="outline" radius="xl">
        Add Network
      </Button>
    </Stack>
  );
}

export default ModalSelectNetwork;
