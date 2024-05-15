import { Box, Center, Group, Select, Stack, Tabs, Text } from "@mantine/core";
import lodash from "lodash";
import { forwardRef, useCallback, useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useDispatch, useSelector } from "react-redux";
import { useChainId } from "wagmi";
import { AbiDecode } from "../../common/types";
import { RootState } from "../../libs/store";
import { actionSelectContract } from "../../libs/store/reducers/selector.slice";
import EventABI from "../atom-ui/EventABI";
import ReadABI from "../atom-ui/ReadABI";
import WriteABI from "../atom-ui/WriteABI";
type Props = {};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  address: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ address, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Box>
          <Jazzicon diameter={36} seed={jsNumberForAddress(address)} />
        </Box>
        <Box>
          <Text fw={600} color="gray.7">
            {label}
          </Text>
          <Text fz="sm" color="gray.5" lineClamp={1}>
            {address}
          </Text>
        </Box>
      </Group>
    </div>
  )
);

const InteractContract = ({}: Props) => {
  //State Init
  const [actionAbi, setActionAbi] = useState<AbiDecode[]>([]);
  const contracts = useSelector((state: RootState) => state.source.contracts);
  const abis = useSelector((state: RootState) => state.source.abis);
  const dispatch = useDispatch();

  const chainId = useChainId();

  const handlerChangeContract = useCallback(
    (value: string) => {
      const curContract = contracts.find((c) => c.uid === value) || null;
      const abi = lodash.find(abis, { uid: curContract?.abi });
      const actions = JSON.parse(abi?.payload || "[]");
      setActionAbi(actions);
      dispatch(actionSelectContract(curContract));
    },
    [contracts, abis]
  );

  return (
    <Stack p="lg">
      <Group noWrap align="end">
        <Select
          w="100%"
          label="Contract"
          searchable
          clearable
          onChange={handlerChangeContract}
          placeholder="Select contract"
          nothingFound="Nobody here. Please select a other network and try again!"
          maxDropdownHeight={400}
          data={contracts
            .filter((c) => c.chainId.toString() === chainId.toString())
            .map((i) => ({
              label: i.name,
              name: i.name,
              address: i.address,
              key: i.uid,
              value: i.uid,
            }))}
          itemComponent={SelectItem}
          filter={(value, item) =>
            item.address.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.name.toLowerCase().includes(value.toLowerCase().trim())
          }
        />
      </Group>

      {actionAbi.length > 0 ? (
        <Tabs
          radius="xl"
          variant="pills"
          color="violet"
          allowTabDeactivation
          defaultValue="read-contract"
        >
          <Tabs.List>
            <Tabs.Tab value="read-contract" bg="gray.1">
              <Text fz="xs" fw={600}>
                Read Contract
              </Text>
            </Tabs.Tab>
            <Tabs.Tab value="write-contract" bg="gray.1">
              <Text fz="xs" fw={600}>
                Write Contract
              </Text>
            </Tabs.Tab>
            <Tabs.Tab value="event-contract" bg="gray.1">
              <Text fz="xs" fw={600}>
                Event
              </Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="write-contract" pt="xs">
            <WriteABI
              funcs={lodash.filter(actionAbi, {
                type: "function",
                stateMutability: "nonpayable",
              })}
            />
          </Tabs.Panel>

          <Tabs.Panel value="read-contract" pt="xs">
            <ReadABI
              funcs={lodash.filter(actionAbi, {
                type: "function",
                stateMutability: "view" || "pure",
              })}
            />
          </Tabs.Panel>

          <Tabs.Panel value="event-contract" pt="xs">
            <EventABI
              events={lodash.filter(actionAbi, {
                type: "event",
              })}
            />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <Center mih={300}>
          <Text color="gray.5">Select a contract</Text>
        </Center>
      )}
    </Stack>
  );
};

export default InteractContract;
