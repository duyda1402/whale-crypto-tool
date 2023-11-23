import {
  ActionIcon,
  Button,
  Group,
  Image,
  Stack,
  TextInput,
  Text,
  Tooltip,
  Textarea,
} from "@mantine/core";
import { Buffer } from "buffer";
import * as ethers from "ethers";
import { Controller, useForm } from "react-hook-form";
import IconMetaMask from "../../assets/metamask.svg";
import { AbiDecode } from "../../common/types";
import { useState } from "react";

const WriteReadMethodForm = ({
  func,
  label = "Read",
}: {
  func: AbiDecode;
  label: string;
}) => {
  const { control, watch, setValue, handleSubmit } = useForm<any>();
  const [tx, _setTx] = useState<any>(null);
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const convertTextToHex = (key: string) => {
    let convert;
    if (!ethers.utils.isHexString(watch(key))) {
      convert = ethers.utils.hexlify(Buffer.from(watch(key)));
    }
    if (Array.isArray(convert)) {
      convert = JSON.stringify(convert);
    }
    return setValue(key, convert);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack px="md">
        {/* Input List */}
        {func?.inputs?.map((input, index: number) => {
          return (
            <Group key={index} align="end" noWrap pos="relative">
              <Controller
                control={control}
                name={input.name}
                rules={{
                  required: "Required",
                  validate: {
                    address: (v) =>
                      (input.type === "address" &&
                        !ethers.utils.getAddress(v)) ||
                      "Invalid address",
                  },
                }}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextInput
                    w="100%"
                    size="xs"
                    label={`${input.name} (${input.type})`}
                    {...field}
                    error={invalid ? error?.message : undefined}
                    placeholder={`${input.name} (${input.type})`}
                    withAsterisk
                  />
                )}
              />

              {input.type === "address" && true && (
                <Group pos="absolute" top={24} right={2}>
                  <ActionIcon
                    variant="outline"
                    color="orange"
                    sx={{ borderWidth: 0 }}
                  >
                    <Image
                      height={18}
                      width={18}
                      src={IconMetaMask}
                      alt="web3"
                    />
                  </ActionIcon>
                </Group>
              )}

              {input.type?.startsWith("bytes") && (
                <Tooltip
                  label={
                    input.type?.includes("[]")
                      ? "Must be array of hex"
                      : "Must be hex"
                  }
                >
                  <Button
                    pos="absolute"
                    top={24}
                    right={2}
                    variant="subtle"
                    compact
                    onClick={() => convertTextToHex(input.name)}
                  >
                    hexlify
                  </Button>
                </Tooltip>
              )}
            </Group>
          );
        })}
        {/* Input Required */}
        {func?.inputs?.length && (
          <Text fz="xs" span color="gray.6">
            [{" "}
            <Text span color="red">
              *
            </Text>{" "}
            = Required ]
          </Text>
        )}
        {/* Input Option */}

        {/* Output List */}
        {func?.outputs?.length ? (
          <div>
            <Text fw={500} color="gray.7" my="md">
              Return values
            </Text>
            <ol>
              {func?.outputs?.map((obj: any) => {
                return (
                  <li key={obj.name}>
                    {obj.name} ({obj.type})
                  </li>
                );
              })}
            </ol>
          </div>
        ) : null}
        {tx && (
          <div>
            <Text fw={500} color="gray.7" my="md">
              Transaction object
            </Text>
            <Textarea disabled value={JSON.stringify(tx, null, 2)}></Textarea>
          </div>
        )}
        <Group>
          <Button size="xs" type="submit" color="violet">
            {label}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default WriteReadMethodForm;
