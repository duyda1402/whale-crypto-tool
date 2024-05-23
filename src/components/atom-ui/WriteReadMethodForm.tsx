import {
  ActionIcon,
  Badge,
  Button,
  CopyButton,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Buffer } from "buffer";
import * as ethers from "ethers";
import lodash, { isBoolean, isNumber, isObject, isString } from "lodash";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import IconMetaMask from "../../assets/metamask.svg";
import { ErrorBlockChain } from "../../common/enum/base";
import { NotifySystem } from "../../common/notify";
import { AbiDecode } from "../../common/types";
import { RootState } from "../../libs/store";
import ViewBigNumber from "./ViewBigNumber";

const WriteReadMethodForm = ({
  func,
  label = "Read",
}: {
  func: AbiDecode;
  label: string;
}) => {
  const { control, watch, setValue, handleSubmit } = useForm<any>();
  const [tx, _setTx] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const network = useSelector((state: RootState) => state.selector.network);
  const CONTRACT = useSelector((state: RootState) => state.selector.contract);
  const abis = useSelector((state: RootState) => state.source.abis);

  useEffect(() => {
    setResult(null);
  }, [func]);

  const onSubmit = async (_data: any) => {
    if (!network || !window.ethereum) {
      return NotifySystem.error(ErrorBlockChain[5002]);
    }
    if (!CONTRACT || !func.name) {
      return NotifySystem.error(ErrorBlockChain[9000]);
    }
    setLoading(() => true);
    try {
      const abiObj = lodash.find(abis, { uid: CONTRACT?.abi });
      const ABI_USE = JSON.parse(abiObj?.payload || "[]");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const curNetwork = await provider.getNetwork();
      if (curNetwork?.chainId?.toString() !== CONTRACT.chainId?.toString()) {
        return NotifySystem.error(ErrorBlockChain[5001]);
      }
      //Setting Input
      let inputs: any[] = [];
      const contract = new ethers.Contract(
        CONTRACT?.address,
        ABI_USE,
        provider
      );
      func.inputs.forEach((input) => {
        inputs.push(lodash.get(_data, `${func.name}.${input.name}`));
      });

      if (func.name in contract.functions) {
        let res: any;
        if (func.stateMutability === "nonpayable") {
          const signer = provider.getSigner();
          res = await contract.connect(signer)?.[func.name](...inputs);
        } else {
          res = await contract?.[func.name](...inputs);
        }
        setResult(res);
      }
    } catch (err: any) {
      NotifySystem.error(err.message);
    } finally {
      setLoading(() => false);
    }
  };

  const handlerSetWallet = async (inputName: string) => {
    if (!network || !window.ethereum) {
      return NotifySystem.error(ErrorBlockChain[5002]);
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      await provider.send("wallet_requestPermissions", [
        {
          eth_accounts: {},
        },
      ]);
      const signer = provider.getSigner();
      setValue(inputName, await signer.getAddress());
    } catch (err: any) {
      NotifySystem.error(err.message);
    }
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
        {func?.inputs?.length > 0 && (
          <>
            {func?.inputs?.map((input, index: number) => {
              return (
                <Group key={index} align="end" noWrap pos="relative">
                  <Controller
                    control={control}
                    name={`${func.name}.${input.name}`}
                    rules={{
                      required: "Required",
                      validate: {
                        isAddress: (v) => {
                          if (input.type === "address") {
                            return (
                              ethers.utils.isAddress(v) || "Invalid address"
                            );
                          } else {
                            return true;
                          }
                        },
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

                  {input.type === "address" && (
                    <Group pos="absolute" top={24} right={2}>
                      <ActionIcon
                        variant="outline"
                        color="orange"
                        sx={{ borderWidth: 0 }}
                        onClick={() =>
                          handlerSetWallet(`${func.name}.${input.name}`)
                        }
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
                        onClick={() =>
                          convertTextToHex(`${func.name}.${input.name}`)
                        }
                      >
                        hexlify
                      </Button>
                    </Tooltip>
                  )}
                </Group>
              );
            })}
          </>
        )}

        {/* Output List */}
        {func?.outputs?.length ? (
          <Stack>
            <Text fw={700} color="gray.7" fz="sm">
              Return values
            </Text>
            {loading ? (
              <Loader size="sm" />
            ) : (
              <Stack>
                <ViewResult result={result} outputs={func?.outputs} />
              </Stack>
            )}
          </Stack>
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
          <Button size="xs" type="submit" color="violet" loading={loading}>
            {label}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default WriteReadMethodForm;

const ViewResult = ({
  outputs = [],
  result,
}: {
  outputs: Array<any>;
  result: any;
}) => {
  const isResultArray = outputs.length > 1;
  return (
    <React.Fragment>
      {outputs?.map((output: any) => {
        return (
          <Group key={output.name} align="start">
            <Badge size="sm">{output.type}</Badge>
            {result !== null && result !== undefined && (
              <>
                {/* TYPE BOOL */}
                {output.type === "bool" && (
                  <Text color="gray.8" fz="sm">
                    {isResultArray
                      ? result?.[output.name]?.toString()
                      : result?.toString()}
                  </Text>
                )}
                {/* TYPE unit */}
                {output.type.includes("uint") && (
                  <>
                    {ethers.BigNumber.isBigNumber(
                      isResultArray ? result?.[output.name] : result
                    ) ? (
                      <ViewBigNumber
                        value={isResultArray ? result?.[output.name] : result}
                      />
                    ) : (
                      <Text color="gray.8" fz="sm">
                        {isResultArray ? result?.[output.name] : result}
                      </Text>
                    )}
                  </>
                )}
                {/* TYPE tuple */}
                {output.type === "tuple" && <ViewTupleValue value={result} />}
                {/* TYPE address */}
                {output.type === "address" && (
                  <>
                    <Text color="gray.8" fz="sm">
                      {(outputs || []).length > 1
                        ? result?.[output.name]?.toString()
                        : result?.toString()}
                    </Text>
                    <CopyButton
                      value={
                        (outputs || []).length > 1
                          ? result?.[output.name]?.toString()
                          : result?.toString()
                      }
                      timeout={1000}
                    >
                      {({ copied, copy }) => (
                        <Tooltip
                          label={copied ? "Copied" : "Copy"}
                          withArrow
                          position="right"
                        >
                          <ActionIcon
                            size="xs"
                            color={copied ? "teal" : "gray"}
                            onClick={copy}
                          >
                            {copied ? <IconCheck /> : <IconCopy />}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </>
                )}
                {output.type.includes("byte") && (
                  <>
                    <Text color="gray.8" fz="sm">
                      {(outputs || []).length > 1
                        ? result?.[output.name]?.toString()
                        : result?.toString()}
                    </Text>
                    <CopyButton
                      value={
                        (outputs || []).length > 1
                          ? result?.[output.name]?.toString()
                          : result?.toString()
                      }
                      timeout={1000}
                    >
                      {({ copied, copy }) => (
                        <Tooltip
                          label={copied ? "Copied" : "Copy"}
                          withArrow
                          position="right"
                        >
                          <ActionIcon
                            size="xs"
                            color={copied ? "teal" : "gray"}
                            onClick={copy}
                          >
                            {copied ? <IconCheck /> : <IconCopy />}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </>
                )}
              </>
            )}
          </Group>
        );
      })}
    </React.Fragment>
  );
};

const ViewTupleValue = ({ value }: { value: any }) => {
  return (
    <Stack>
      {Object.keys(value)
        .map((i) => i)
        .filter((key) => !Number(key) && Number(key) !== 0)
        .map((key: string) => (
          <Group key={key} spacing="xl">
            <Text color="gray.8" fz="sm">
              {key}
            </Text>
            {ethers.BigNumber.isBigNumber(value[key]) && (
              <ViewBigNumber value={value[key]} />
            )}
            {isBoolean(value[key]) && <Text> {value[key].toString()}</Text>}
            {(isString(value[key]) || isNumber(value[key])) && (
              <Text>{value[key]}</Text>
            )}
            {isObject(value[key]) &&
              !ethers.BigNumber.isBigNumber(value[key]) && (
                <Text> {JSON.stringify(value[key])}</Text>
              )}
          </Group>
        ))}
    </Stack>
  );
};
