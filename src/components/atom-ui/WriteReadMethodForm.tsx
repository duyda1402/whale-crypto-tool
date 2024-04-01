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
  Badge,
  CopyButton,
  Loader,
} from "@mantine/core";
import { Buffer } from "buffer";
import * as ethers from "ethers";
import { Controller, useForm } from "react-hook-form";
import IconMetaMask from "../../assets/metamask.svg";
import { AbiDecode } from "../../common/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../libs/store";
import { Notify } from "../../common/notify";
import { ErrorBlockChain } from "../../common/enum/base";
import lodash from "lodash";
import { IconCheck, IconCopy } from "@tabler/icons-react";

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
      return Notify.error(ErrorBlockChain[5002]);
    }
    if (!CONTRACT || !func.name) {
      return Notify.error(ErrorBlockChain[9000]);
    }
    setLoading(() => true);
    try {
      const abiObj = lodash.find(abis, { uid: CONTRACT?.abi });
      const ABI_USE = JSON.parse(abiObj?.payload || "[]");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const curNetwork = await provider.getNetwork();
      if (curNetwork?.chainId?.toString() !== CONTRACT.chainId?.toString()) {
        return Notify.error(ErrorBlockChain[5001]);
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
        console.log("tx", func.type, res);
        setResult(res);
      }
    } catch (err: any) {
      Notify.error(err.message);
    } finally {
      setLoading(() => false);
    }
  };

  const handlerSetWallet = async (inputName: string) => {
    if (!network || !window.ethereum) {
      return Notify.error(ErrorBlockChain[5002]);
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    window.myProvider = provider;
    try {
      await provider.send("wallet_requestPermissions", [
        {
          eth_accounts: {},
        },
      ]);
      const signer = provider.getSigner();
      setValue(inputName, await signer.getAddress());
    } catch (err: any) {
      Notify.error(err.message);
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
                {func?.outputs?.map((output: any) => {
                  return (
                    <Group key={output.name}>
                      <Badge size="sm">{output.type}</Badge>
                      {result !== null && result !== undefined && (
                        <>
                          {output.type === "bool" && (
                            <Text color="gray.8" fz="sm">
                              {(func?.outputs || []).length > 1
                                ? result?.[output.name]?.toString()
                                : result?.toString()}
                            </Text>
                          )}
                          {output.type === "uint256" && (
                            <Text color="gray.8" fz="sm">
                              {(func?.outputs || []).length > 1
                                ? result?.[output.name]?._hex
                                : result?._hex}
                            </Text>
                          )}
                          {output.type !== "bool" &&
                            output.type !== "uint256" && (
                              <>
                                <Text color="gray.8" fz="sm">
                                  {(func?.outputs || []).length > 1
                                    ? result?.[output.name]?.toString()
                                    : result?.toString()}
                                </Text>
                                <CopyButton
                                  value={
                                    (func?.outputs || []).length > 1
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
