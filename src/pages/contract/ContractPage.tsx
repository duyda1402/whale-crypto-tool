import {
  ActionIcon,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  JsonInput,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCheck,
  IconLockCog,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import lodash from "lodash";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import HeaderRoot from "../../components/common-ui/HeaderRoot";
import TitleRoot from "../../components/common-ui/TitleRoot";
import { RootState } from "../../libs/store";
import { ContractIF } from "../../common/types";
import {
  actionSetAbis,
  actionSetContracts,
} from "../../libs/store/reducers/source.slice";

function ContractPage() {
  return (
    <React.Fragment>
      <TitleRoot title="Contract" />
      {/* Header */}
      <HeaderRoot title="Contract" />
      <Container p="xl" fluid miw={700}>
        <Tabs radius="xs" defaultValue="interact">
          <Tabs.List>
            <Tabs.Tab value="interact">
              <Text fw={600} fz="lg" color="gray.7">
                Interact
              </Text>
            </Tabs.Tab>

            <Tabs.Tab value="manual">
              <Text fw={600} fz="lg" color="gray.7">
                Add Manual
              </Text>
            </Tabs.Tab>

            <Tabs.Tab value="deploy">
              <Text fw={600} fz="lg" color="gray.7">
                Deploy
              </Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="interact" pt="xs">
            <InteractContractTab />
          </Tabs.Panel>

          <Tabs.Panel value="manual" pt="xs">
            <AddManualContractTab />
          </Tabs.Panel>

          <Tabs.Panel value="deploy" pt="xs">
            <Center mih={300}>
              <Text fz="xl" fw={600} color="gray.5">
                Come soon!
              </Text>
            </Center>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </React.Fragment>
  );
}

export default ContractPage;

const InteractContractTab = () => {
  return <Stack></Stack>;
};

interface ContractForm extends ContractIF {
  abiJson: string;
  abiName: string;
}

const AddManualContractTab = () => {
  //State Init
  const contracts = useSelector((state: RootState) => state.source.contracts);
  const abis = useSelector((state: RootState) => state.source.abis);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  // Hook Form Init
  const { control, watch, reset, handleSubmit } = useForm<ContractForm>({
    defaultValues: {
      uid: uuidV4(),
      name: "",
      address: "",
      isSystem: false,
      abi: uuidV4(),
      abiJson: "",
      abiName: "",
    },
  });

  const handlerNewContract = useCallback(() => {
    reset({
      uid: uuidV4(),
      name: "",
      address: "",
      isSystem: false,
      abi: uuidV4(),
      abiJson: "",
      abiName: "",
    });
  }, []);
  console.log("Crr", watch());
  const handlerSubmit = useCallback((data: any) => {
    const findIndex = contracts.findIndex(
      (contract) => contract.uid === data.uid
    );
    const findAbiIndex = abis.findIndex((abi) => abi.uid === data.abi);
    const dataContract = {
      uid: data.uid,
      name: data.name,
      address: data.address,
      abi: data.abi,
      isSystem: false,
    };
    const curContract = lodash.cloneDeep(contracts);
    if (findIndex === -1) {
      dispatch(actionSetContracts(curContract.concat(dataContract)));
    } else {
      curContract.splice(findIndex, 1, dataContract);
      dispatch(actionSetContracts(curContract));
    }
    if (findAbiIndex === -1) {
      const curAbis = lodash.cloneDeep(abis);
      dispatch(
        actionSetAbis(
          curAbis.concat({
            uid: data.abi,
            name: data.abiName,
            payload: data.abiJson,
            isSystem: false,
          })
        )
      );
    }
  }, []);

  const handlerDelete = useCallback(
    (uid: string) => {
      const findIndex = contracts.findIndex((contract) => contract.uid === uid);
      const curNetworks = lodash.cloneDeep(contracts);
      curNetworks.splice(findIndex, 1);
      dispatch(actionSetContracts(curNetworks));
    },
    [contracts]
  );
  const handlerSelect = useCallback((contract: ContractIF) => {
    const abi = abis.find((abi) => abi.uid === contract.abi);
    reset({ ...contract, abiName: abi?.name, abiJson: abi?.payload });
  }, []);

  const handlerCancel = useCallback(
    (uid: string) => {
      reset(contracts.find((contract) => contract.uid === uid));
    },
    [contracts]
  );

  return (
    <Stack p="lg">
      <Group noWrap w="100%" position="apart">
        <Text fw={600} fz="lg" color="gray.7">
          Contracts
        </Text>

        <Button radius="xl" color="blue" onClick={handlerNewContract}>
          Add a contract
        </Button>
      </Group>
      <Stack spacing={0}>
        <Divider />
        <Flex>
          {/* List contract */}
          <Stack miw="50%" mih="300px" p="md" spacing="xl">
            <TextInput
              placeholder="Search contract"
              radius="xl"
              icon={<IconSearch size="1rem" />}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Contract List */}
            <Stack>
              {lodash
                .filter(contracts, (item) =>
                  lodash.includes(
                    lodash.toLower(item.name),
                    lodash.toLower(search)
                  )
                )
                .map((contract) => {
                  return (
                    <React.Fragment key={contract.uid}>
                      {/* Contract Item */}
                      <ContractItem
                        contract={contract}
                        uidActive={watch("uid")}
                        onSelect={() => handlerSelect(contract)}
                        onDelete={() => handlerDelete(contract.uid)}
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
            <form onSubmit={handleSubmit(handlerSubmit)}>
              <Stack>
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: "Required" }}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextInput
                      {...field}
                      error={invalid ? error?.message : undefined}
                      label="Contract name"
                      placeholder="Enter name"
                      withAsterisk
                      readOnly={watch("isSystem")}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="address"
                  rules={{
                    required: "Required",
                    validate: {
                      addressExists: (v) =>
                        !contracts.find((contract) => contract.address === v) ||
                        "address exists",
                    },
                  }}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextInput
                      {...field}
                      error={invalid ? error?.message : undefined}
                      label="Address"
                      placeholder="Enter address"
                      withAsterisk
                      readOnly={watch("isSystem")}
                    />
                  )}
                />

                <Tabs radius="xs" defaultValue="select">
                  <Tabs.List>
                    <Tabs.Tab value="select">
                      <Text fw={600} fz="sm" color="gray.7">
                        Select ABI
                      </Text>
                    </Tabs.Tab>
                    <Tabs.Tab value="add">
                      <Text fw={600} fz="sm" color="gray.7">
                        Add ABI
                      </Text>
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="add" pt="xs">
                    <Stack p="sm">
                      <Controller
                        control={control}
                        name="abiName"
                        render={({ field, fieldState: { invalid, error } }) => (
                          <TextInput
                            {...field}
                            error={invalid ? error?.message : undefined}
                            label="ABI name"
                            placeholder="Enter name"
                            readOnly={
                              watch("isSystem") ||
                              !!abis.find((abi) => abi.uid === watch("abi"))
                            }
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="abiJson"
                        render={({ field, fieldState: { invalid, error } }) => (
                          <JsonInput
                            {...field}
                            minRows={5}
                            maxRows={6}
                            formatOnBlur
                            validationError="Invalid JSON"
                            error={invalid ? error?.message : undefined}
                            placeholder="Enter file.json"
                            label="ABI / JSON Interface"
                            readOnly={
                              watch("isSystem") ||
                              !!abis.find((abi) => abi.uid === watch("abi"))
                            }
                          />
                        )}
                      />
                    </Stack>
                  </Tabs.Panel>

                  <Tabs.Panel value="select" pt="xs">
                    <Controller
                      control={control}
                      name="abi"
                      rules={{ required: "Required" }}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <Select
                          {...field}
                          placeholder="Select abi"
                          error={invalid ? error?.message : undefined}
                          data={abis.map((i) => ({
                            label: i.name,
                            value: i.uid,
                          }))}
                          label="ABI"
                          readOnly={watch("isSystem")}
                        />
                      )}
                    />
                  </Tabs.Panel>
                </Tabs>

                <SimpleGrid cols={2} mt="md">
                  <Button
                    radius="xl"
                    variant="outline"
                    h={44}
                    onClick={() => handlerCancel(watch("uid"))}
                    disabled={lodash.isEqual(
                      contracts.find((n) => n.uid === watch("uid")),
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
                      contracts.find((n) => n.uid === watch("uid")),
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
  );
};

type ContractItemProps = {
  contract: ContractIF;
  onSelect?: () => void;
  uidActive?: string;
  onDelete?: () => void;
};
const ContractItem = ({
  contract,
  onSelect,
  uidActive,
  onDelete,
}: ContractItemProps) => {
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);
  const selector = useSelector((state: RootState) => state.selector);
  return (
    <Box
      px="xl"
      pos="relative"
      onMouseEnter={() => setIsShowDelete(true)}
      onMouseLeave={() => setIsShowDelete(false)}
    >
      {selector.network?.uid === contract.uid && (
        <ThemeIcon
          pos="absolute"
          top={0}
          left={-8}
          variant="outline"
          color="green"
          sx={{ borderWidth: 0 }}
        >
          <IconCheck size="1.25rem" />
        </ThemeIcon>
      )}
      {/* View network item */}
      <Group onClick={onSelect} noWrap sx={{ cursor: "pointer" }}>
        <Box sx={{ flex: 1 }}>
          <Jazzicon diameter={40} seed={jsNumberForAddress(contract.address)} />
        </Box>
        <Box>
          <Text fw={contract.uid === uidActive ? 600 : 400} color="gray.7">
            {contract?.name}
          </Text>
          <Text fz="sm" color="gray.5" lineClamp={1}>
            {contract?.address}
          </Text>
        </Box>

        {contract?.isSystem && (
          <ThemeIcon variant="outline" color="gray" sx={{ borderWidth: 0 }}>
            <IconLockCog size="1rem" />
          </ThemeIcon>
        )}
      </Group>
      {/* Delete network item */}
      {!contract.isSystem && isShowDelete && (
        <ActionIcon
          color="red"
          onClick={onDelete}
          pos="absolute"
          top={0}
          right={-8}
        >
          <IconTrash size="1.125rem" />
        </ActionIcon>
      )}
    </Box>
  );
};
