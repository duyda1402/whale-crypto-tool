import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  HoverCard,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { IconAlertCircleFilled, IconSearch } from "@tabler/icons-react";
import lodash from "lodash";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";

import { Notify } from "../../common/notify";
import { NetworkIF } from "../../common/types";
import HeaderRoot from "../../components/atom-ui/HeaderRoot";
import NetworkItem from "../../components/atom-ui/NetworkItem";
import TitleRoot from "../../components/atom-ui/TitleRoot";
import { RootState } from "../../libs/store";
import {
  actionAddNetworks,
  actionRemoveNetworks,
  actionUpdateNetworks,
} from "../../libs/store/reducers/source.slice";

function NetworkPage() {
  //State Init
  const [search, setSearch] = useState<string>("");
  const [chainId, setChainId] = useState<string | number>("");
  const networks = useSelector((state: RootState) => state.source.networks);
  const dispatch = useDispatch();
  // Hook Form Init
  const { control, watch, reset, handleSubmit } = useForm<NetworkIF>({
    defaultValues: {
      uid: uuidV4(),
      blockExplorerUrl: "",
      chainId: "",
      connectionInfo: undefined,
      icon: "",
      currencySymbol: "",
      isSystem: false,
      rpcUrl: "",
      networkName: "",
    },
  });

  const handlerNewNetwork = useCallback(() => {
    setChainId("");
    reset({
      uid: uuidV4(),
      blockExplorerUrl: "",
      chainId: "",
      connectionInfo: undefined,
      icon: "",
      currencySymbol: "",
      isSystem: false,
      rpcUrl: "",
      networkName: "",
    });
  }, []);

  const handlerSelectNetwork = useCallback((network: NetworkIF) => {
    setChainId(network.chainId);
    reset(network);
  }, []);

  const onSubmit = useCallback((data: NetworkIF) => {
    const findIndex = networks.findIndex((network) => network.uid === data.uid);
    if (findIndex === -1) {
      dispatch(actionAddNetworks(data));
      Notify.success("Created new network successfully!");
    } else {
      dispatch(
        actionUpdateNetworks({
          uid: data.uid,
          network: data,
        })
      );
      Notify.success("Updated network successfully!");
    }
  }, []);

  const handlerCancel = useCallback(
    (uid: string) => {
      reset(networks.find((network) => network.uid === uid));
    },
    [networks]
  );

  const handlerDelete = useCallback(
    (uid: string) => {
      dispatch(actionRemoveNetworks(uid));
      reset({
        uid: uuidV4(),
        blockExplorerUrl: "",
        chainId: "",
        connectionInfo: undefined,
        icon: "",
        currencySymbol: "",
        isSystem: false,
        rpcUrl: "",
        networkName: "",
      });
      Notify.success("Deleted network successfully!");
    },
    [networks]
  );

  return (
    <React.Fragment>
      <TitleRoot title="Network" />
      {/* Header */}
      <HeaderRoot title="Network" />
      <Container p="xl" fluid miw={700}>
        <Stack>
          <Group noWrap w="100%" position="apart">
            <Text fw={600} fz="lg" color="gray.7">
              Networks
            </Text>
            <Button radius="xl" color="blue" onClick={handlerNewNetwork}>
              Add a network
            </Button>
          </Group>
          <Stack spacing={0}>
            <Divider />
            <Flex>
              {/* List network */}
              <Stack miw="50%" mih="400px" p="md" spacing="xl">
                <TextInput
                  placeholder="Search network"
                  radius="xl"
                  icon={<IconSearch size="1rem" />}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* Network List */}
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
                            onSelect={() => handlerSelectNetwork(network)}
                            uidActive={watch("uid")}
                            onDelete={() => handlerDelete(network.uid)}
                          />
                        </React.Fragment>
                      );
                    })}
                </Stack>
                {/* ============ */}
              </Stack>
              {/* ============ */}
              <Divider orientation="vertical" />
              {/* Form Edit and New */}
              <Stack miw="50%" p="md">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack>
                    <Text fz="xs" color="gray.5">
                      UID: {watch("uid")}
                    </Text>
                    <Controller
                      control={control}
                      name="networkName"
                      rules={{ required: "Required" }}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextInput
                          {...field}
                          error={invalid ? error?.message : undefined}
                          label="Network name"
                          placeholder="Enter value"
                          withAsterisk
                          readOnly={watch("isSystem")}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="rpcUrl"
                      rules={{ required: "Required" }}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextInput
                          {...field}
                          error={invalid ? error?.message : undefined}
                          label="New RPC URL"
                          placeholder="Enter value"
                          withAsterisk
                          readOnly={watch("isSystem")}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="chainId"
                      rules={{
                        required: "Required",
                        validate: {
                          chainIdExists: (v) =>
                            !networks.find(
                              (network) =>
                                network.chainId === v &&
                                network.chainId.toString() !==
                                  chainId.toString()
                            ) || "Chain ID exists",
                        },
                      }}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <Box pos="relative">
                          <TextInput
                            {...field}
                            error={invalid ? error?.message : undefined}
                            label="Chain ID"
                            placeholder="Enter value"
                            withAsterisk
                            readOnly={watch("isSystem")}
                          />
                          <HoverCard
                            width={200}
                            shadow="md"
                            position="top"
                            withArrow
                          >
                            <HoverCard.Target>
                              <ThemeIcon
                                pos="absolute"
                                top={4}
                                left={68}
                                variant="outline"
                                color="gray"
                                size="xs"
                                sx={{ borderWidth: 0 }}
                              >
                                <IconAlertCircleFilled />
                              </ThemeIcon>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <Text fz="xs" color="gray.5">
                                The chain ID is used for signing transactions.
                                It must match the chain ID returned by the
                                network. You can enter a decimal or
                                '0x'-prefixed hexadecimal number, but we will
                                display the number in decimal.
                              </Text>
                            </HoverCard.Dropdown>
                          </HoverCard>
                        </Box>
                      )}
                    />

                    <Controller
                      control={control}
                      name="currencySymbol"
                      rules={{ required: "Required" }}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextInput
                          {...field}
                          error={invalid ? error?.message : undefined}
                          label="Currency Symbol"
                          placeholder="Enter value"
                          withAsterisk
                          readOnly={watch("isSystem")}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="blockExplorerUrl"
                      render={({ field }) => (
                        <Box pos="relative">
                          <TextInput
                            {...field}
                            label="Block Explorer URL"
                            placeholder="Enter value"
                            readOnly={watch("isSystem")}
                          />
                          <Text
                            fz="xs"
                            color="gray.7"
                            pos="absolute"
                            top={3}
                            right={3}
                          >
                            (Optional)
                          </Text>
                        </Box>
                      )}
                    />

                    <Controller
                      control={control}
                      name="icon"
                      render={({ field }) => (
                        <Box pos="relative">
                          <TextInput
                            {...field}
                            label="Icon URL"
                            placeholder="Enter value"
                            readOnly={watch("isSystem")}
                          />
                          <Text
                            fz="xs"
                            color="gray.7"
                            pos="absolute"
                            top={3}
                            right={3}
                          >
                            (Optional)
                          </Text>
                        </Box>
                      )}
                    />

                    <SimpleGrid cols={2} mt="md">
                      <Button
                        radius="xl"
                        variant="outline"
                        h={44}
                        onClick={() => handlerCancel(watch("uid"))}
                        disabled={lodash.isEqual(
                          networks.find((n) => n.uid === watch("uid")),
                          watch()
                        )}
                      >
                        Cancel
                      </Button>
                      <Button
                        radius="xl"
                        type="submit"
                        h={44}
                        disabled={lodash.isEqual(
                          networks.find((n) => n.uid === watch("uid")),
                          watch()
                        )}
                      >
                        Save
                      </Button>
                    </SimpleGrid>
                  </Stack>
                </form>
              </Stack>
            </Flex>
          </Stack>
        </Stack>
      </Container>
    </React.Fragment>
  );
}

export default NetworkPage;
