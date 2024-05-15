import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  JsonInput,
  SimpleGrid,
  Stack,
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
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { NotifySystem } from "../../common/notify";
import { AbiIF } from "../../common/types";
import { RootState } from "../../libs/store";
import {
  actionAddAbis,
  actionRemoveAbis,
  actionUpdateAbis,
} from "../../libs/store/reducers/source.slice";

type Props = {};

const SettingABI = ({}: Props) => {
  //State Init
  const contracts = useSelector((state: RootState) => state.source.contracts);
  const abis = useSelector((state: RootState) => state.source.abis);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  // Hook Form Init
  const { control, watch, reset, handleSubmit } = useForm<AbiIF>({
    defaultValues: {
      uid: uuidV4(),
      name: "",
      isSystem: false,
      payload: "",
    },
  });

  const handlerNewABI = useCallback(() => {
    reset({
      uid: uuidV4(),
      name: "",
      isSystem: false,
      payload: "",
    });
  }, []);

  const handlerSubmit = useCallback(
    (data: AbiIF) => {
      const dataABI = {
        uid: data.uid,
        name: data.name,
        payload: data.payload,
        isSystem: data.isSystem,
      };
      const findAbiIndex = abis.findIndex((abi) => abi.uid === data.uid);

      if (findAbiIndex !== -1) {
        dispatch(actionUpdateAbis({ uid: dataABI.uid, data: dataABI }));
        NotifySystem.success("Updated ABI successfully!");
      } else {
        dispatch(actionAddAbis(dataABI));
        NotifySystem.success("Created new ABI successfully!");
      }
    },
    [abis]
  );

  const handlerDelete = useCallback(
    (uid: string) => {
      dispatch(actionRemoveAbis(uid));
      NotifySystem.success("Deleted ABI successfully!");
      return handlerNewABI();
    },

    [contracts]
  );
  const handlerSelect = useCallback(
    (abi: AbiIF) =>
      reset({
        isSystem: abi.isSystem,
        name: abi.name,
        payload: abi.payload,
        uid: abi.uid,
      }),
    []
  );

  const handlerCancel = useCallback(
    (uid: string) => {
      const curAbi = lodash.find(abis, { uid: uid });
      reset({
        ...curAbi,
      });
    },
    [contracts]
  );

  return (
    <Stack p="lg">
      <Group noWrap w="100%" position="apart">
        <Text fw={600} fz="lg" color="gray.7">
          ABIs
        </Text>

        <Button radius="xl" color="blue" onClick={handlerNewABI}>
          Add new ABI
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
                .filter(abis, (item) =>
                  lodash.includes(
                    lodash.toLower(item.name),
                    lodash.toLower(search)
                  )
                )
                .map((abi) => {
                  return (
                    <React.Fragment key={abi.uid}>
                      {/* Contract Item */}
                      <AbiItem
                        abi={abi}
                        uidActive={watch("uid")}
                        onSelect={() => handlerSelect(abi)}
                        onDelete={() => handlerDelete(abi.uid)}
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
              <Text fz="xs" color="gray.5">
                UID: {watch("uid")}
              </Text>
              <Stack>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextInput
                      {...field}
                      error={invalid ? error?.message : undefined}
                      label="ABI name"
                      placeholder="Enter name"
                      readOnly={watch("isSystem")}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="payload"
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
                      readOnly={watch("isSystem")}
                    />
                  )}
                />
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

export default SettingABI;

type AbiItemProps = {
  abi: AbiIF;
  onSelect?: () => void;
  uidActive?: string;
  onDelete?: () => void;
};
const AbiItem = ({ abi, onSelect, uidActive, onDelete }: AbiItemProps) => {
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);
  const selector = useSelector((state: RootState) => state.selector);
  return (
    <Box
      px="xl"
      pos="relative"
      onMouseEnter={() => setIsShowDelete(true)}
      onMouseLeave={() => setIsShowDelete(false)}
    >
      {selector.network?.uid === abi.uid && (
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
      <Group onClick={onSelect} spacing="sm" noWrap sx={{ cursor: "pointer" }}>
        <Box>
          <Avatar>{abi?.name?.at(0)}</Avatar>
        </Box>
        <Box>
          <Text fw={abi.uid === uidActive ? 600 : 400} color="gray.7">
            {abi?.name}
          </Text>
        </Box>

        {abi?.isSystem && (
          <ThemeIcon variant="outline" color="gray" sx={{ borderWidth: 0 }}>
            <IconLockCog size="1rem" />
          </ThemeIcon>
        )}
      </Group>
      {/* Delete network item */}
      {!abi.isSystem && isShowDelete && (
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
