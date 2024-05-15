import {
  Avatar,
  Button,
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
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import lodash from "lodash";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { NotifySystem } from "../../common/notify";
import { ContractIF, NetworkIF } from "../../common/types";
import { RootState } from "../../libs/store";
import {
  actionAddAbis,
  actionAddContracts,
  actionRemoveContracts,
  actionUpdateContracts,
} from "../../libs/store/reducers/source.slice";
import ContractItem from "../atom-ui/ContractItem";

interface ContractForm extends ContractIF {
  abiJson: string;
  abiName: string;
}

type Props = {};

const ManualContractTab = ({}: Props) => {
  //State Init
  const contracts = useSelector((state: RootState) => state.source.contracts);
  const abis = useSelector((state: RootState) => state.source.abis);
  const networks = useSelector((state: RootState) => state.source.networks);
  const [addressSelect, setAddressSelect] = useState<string>("");
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  // Hook Form Init
  const { control, watch, reset, setValue, handleSubmit } =
    useForm<ContractForm>({
      defaultValues: {
        uid: uuidV4(),
        name: "",
        address: "",
        isSystem: false,
        abi: uuidV4(),
        abiJson: "",
        abiName: "",
        chainId: "",
      },
    });

  const handlerNewContract = useCallback(() => {
    setAddressSelect("");
    reset({
      uid: uuidV4(),
      name: "",
      address: "",
      isSystem: false,
      abi: uuidV4(),
      abiJson: "",
      abiName: "",
      chainId: "",
    });
  }, []);

  useEffect(() => {
    const curAbi = lodash.find(abis, { uid: watch("abi") });
    setValue("abiName", curAbi?.name || "");
    setValue("abiJson", curAbi?.payload || "");
  }, [watch("abi")]);

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
      chainId: data.chainId,
    };
    if (findIndex === -1) {
      dispatch(actionAddContracts(dataContract));
      NotifySystem.success("Created new contract successfully!");
    } else {
      dispatch(
        actionUpdateContracts({ uid: dataContract.uid, data: dataContract })
      );
      NotifySystem.success("Updated contract successfully!");
    }
    if (findAbiIndex === -1) {
      dispatch(
        actionAddAbis({
          uid: data.abi,
          name: data.abiName,
          payload: data.abiJson,
          isSystem: false,
        })
      );
      NotifySystem.success("Created new ABI successfully!");
    }
  }, []);

  const handlerDelete = useCallback(
    (uid: string) => {
      dispatch(actionRemoveContracts(uid));
      NotifySystem.success("Deleted contract successfully!");
      return handlerNewContract();
    },
    [contracts]
  );
  const handlerSelect = useCallback((contract: ContractIF) => {
    const abi = abis.find((abi) => abi.uid === contract.abi);
    setAddressSelect(contract.address);
    reset({ ...contract, abiName: abi?.name, abiJson: abi?.payload });
  }, []);

  const handlerCancel = useCallback(
    (uid: string) => {
      const curContract = lodash.find(contracts, { uid: uid });
      const curAbi = lodash.find(abis, { uid: curContract?.abi });
      reset({
        ...curContract,
        abiJson: curAbi?.payload,
        abiName: curAbi?.name,
      });
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
                <Text fz="xs" color="gray.5">
                  UID: {watch("uid")}
                </Text>
                <Controller
                  control={control}
                  name="chainId"
                  rules={{ required: "Required" }}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <Select
                      label="Network"
                      error={invalid ? error?.message : undefined}
                      placeholder="Choose network"
                      itemComponent={SelectItem}
                      withAsterisk
                      data={networks.map((network: NetworkIF) => ({
                        value: network.chainId.toString(),
                        label: network.networkName,
                        image: network.icon,
                        chainId: network.chainId,
                      }))}
                      {...field}
                      searchable
                      maxDropdownHeight={400}
                      nothingFound="No data"
                      filter={(value, item) =>
                        (item?.label || "")
                          .toLowerCase()
                          .includes(value.toLowerCase().trim())
                      }
                    />
                  )}
                />

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
                        !contracts.find(
                          (contract) =>
                            contract.address === v &&
                            contract.address !== addressSelect
                        ) || "address exists",
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
                {!watch("isSystem") && (
                  <SimpleGrid cols={2} mt="md">
                    <Button
                      radius="xl"
                      variant="outline"
                      h={44}
                      onClick={() => handlerCancel(watch("uid"))}
                    >
                      Cancel
                    </Button>
                    <Button radius="xl" type="submit" h={44}>
                      Save
                    </Button>
                  </SimpleGrid>
                )}
              </Stack>
            </form>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default ManualContractTab;

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  chainId: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, chainId, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar radius={99} src={image} />
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            chainId: {chainId}
          </Text>
        </div>
      </Group>
    </div>
  )
);
