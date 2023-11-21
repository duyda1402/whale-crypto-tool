import React, { useCallback, useEffect, useState } from "react";
import { networkSystem } from "../../common/mockup/network";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  HoverCard,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import TitleRoot from "../../components/common-ui/TitleRoot";
import HeaderRoot from "../../components/common-ui/HeaderRoot";
import {
  IconAlertCircleFilled,
  IconLockCog,
  IconSearch,
} from "@tabler/icons-react";
import { NetworkIF } from "../../common/types";
import { useForm, Controller } from "react-hook-form";
import lodash from "lodash";
import { v4 as uuidV4 } from "uuid";
import { KEY_NETWORK } from "../../common";

function NetworkPage() {
  //State Init
  const [networks, _setNetworks] = useState<NetworkIF[]>(networkSystem);

  // Hook Init
  const { control, watch, reset, handleSubmit } = useForm<NetworkIF>();
  // Effect Init
  useEffect(() => {
    const networks = localStorage.getItem(KEY_NETWORK);
    if (networks) {
      _setNetworks(JSON.parse(networks));
    }
  }, []);

  const handlerNewNetwork = useCallback(() => {
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
    reset(network);
  }, []);

  const handlerSubmit = useCallback((data: NetworkIF) => {
    const findIndex = networks.findIndex((network) => network.uid === data.uid);
    if (findIndex === -1) {
      const list = lodash.cloneDeep(networks).concat(data);
      localStorage.setItem(KEY_NETWORK, JSON.stringify(list));
      _setNetworks(list);
    } else {
      const list = lodash.cloneDeep(networks);
      list.splice(findIndex, 1, data);
      localStorage.setItem(KEY_NETWORK, JSON.stringify(list));
      _setNetworks(list);
    }
  }, []);

  const handlerCancel = useCallback(
    (uid: string) => {
      reset(networks.find((network) => network.uid === uid));
    },
    [networks]
  );

  return (
    <React.Fragment>
      <TitleRoot title="Network" />
      {/* Header */}
      <HeaderRoot title="Network" leftRender={<Select data={[]} />} />
      <Container p="xl" fluid>
        <Stack>
          <Group noWrap w="100%" position="apart">
            <Text size="lg" fw={500}>
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
                />
                {/* Network List */}
                <Stack>
                  {networks.map((network) => (
                    <Group
                      onClick={() => handlerSelectNetwork(network)}
                      noWrap
                      sx={{ cursor: "pointer" }}
                      px="xl"
                      key={network.chainId}
                    >
                      <Avatar src={network?.icon} radius="xl" size="sm">
                        {network?.networkName?.at(0)?.toLocaleUpperCase()}
                      </Avatar>
                      <Text
                        fw={network.uid === watch("uid") ? 500 : 400}
                        color="gray.7"
                      >
                        {network?.networkName}
                      </Text>
                      {network?.isSystem && (
                        <ThemeIcon
                          variant="outline"
                          color="gray"
                          sx={{ borderWidth: 0 }}
                        >
                          <IconLockCog size="1rem" />
                        </ThemeIcon>
                      )}
                    </Group>
                  ))}
                </Stack>
                {/* ============ */}
              </Stack>
              {/* ============ */}
              <Divider orientation="vertical" />
              {/* Form Edit and New */}
              <Stack miw="50%" p="md">
                <form onSubmit={handleSubmit(handlerSubmit)}>
                  <Stack>
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
                      rules={{ required: "Required" }}
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
                            left={128}
                          >
                            (Optional)
                          </Text>
                        </Box>
                      )}
                    />

                    <SimpleGrid cols={2}>
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
