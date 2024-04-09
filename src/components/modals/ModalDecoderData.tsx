import {
  Badge,
  Group,
  JsonInput,
  Select,
  Stack,
  Tabs,
  Text,
  Textarea,
} from "@mantine/core";
import { ContextModalProps } from "@mantine/modals/lib/context";
import InputDataDecoder from "ethereum-input-data-decoder";
import { ethers } from "ethers";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { AbiIF } from "../../common/types";
import { RootState } from "../../libs/store";
import ViewBigNumber from "../atom-ui/ViewBigNumber";
import { v4 as uuidV4 } from "uuid";
type Props = ContextModalProps<{ modalBody: string }>;
type DataDecode = {
  method: string | null;
  types: Array<any>;
  inputs: Array<any>;
  names: Array<any>;
};

const ModalDecoderData = ({}: Props) => {
  const abis = useSelector((state: RootState) => state.source.abis);
  const [dataDecode, setDataDecode] = useState<DataDecode>({
    method: null,
    types: [],
    inputs: [],
    names: [],
  });
  const [abiSelect, setAbiSelect] = useState<AbiIF | null>(null);

  const handlerAddNewAbi = useCallback((value: string) => {
    if (!!value) {
      const abi: AbiIF = {
        uid: uuidV4(),
        name: "Custom ABI",
        payload: value,
      };
      setAbiSelect(abi);
    } else {
      setAbiSelect(null);
    }
  }, []);

  const handlerSelectAbi = useCallback(
    (value: string) => {
      if (!!value) {
        const curAbi = abis.find((a) => a.uid === value) || null;
        setAbiSelect(curAbi);
      } else {
        setAbiSelect(null);
      }
    },
    [abis]
  );

  const handlerChangeData = (value: string) => {
    const decoder = new InputDataDecoder(
      JSON.parse(abiSelect?.payload || "[]")
    );
    const result = decoder.decodeData(value);
    setDataDecode(result);
  };

  return (
    <Stack p="md" spacing="md">
      <Tabs
        radius="xs"
        defaultValue="select"
        onTabChange={() => {
          setAbiSelect(null);
          setDataDecode({
            method: null,
            types: [],
            inputs: [],
            names: [],
          });
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="select">
            <Text fw={600} fz="sm" color="gray.7">
              Select ABI
            </Text>
          </Tabs.Tab>
          <Tabs.Tab value="add">
            <Text fw={600} fz="sm" color="gray.7">
              Custom ABI
            </Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="add" pt="xs">
          <JsonInput
            onChange={handlerAddNewAbi}
            minRows={5}
            maxRows={6}
            formatOnBlur
            validationError="Invalid JSON"
            placeholder="Enter file.json"
            label="ABI - JSON Interface"
          />
        </Tabs.Panel>

        <Tabs.Panel value="select" pt="xs">
          <Select
            onChange={handlerSelectAbi}
            label="Abi"
            withAsterisk
            searchable
            clearable
            placeholder="Select abi"
            data={abis.map((abi) => ({
              label: abi.name,
              value: abi.uid,
            }))}
          />
        </Tabs.Panel>
      </Tabs>

      <Textarea
        label="Data Input"
        placeholder="0x..."
        readOnly={!abiSelect}
        disabled={!abiSelect}
        autosize
        minRows={3}
        maxRows={4}
        onChange={(e) => handlerChangeData(e.target.value)}
      />

      <ViewUInputDataDecoder data={dataDecode} />
    </Stack>
  );
};

export default ModalDecoderData;

const ViewUInputDataDecoder = ({ data }: { data: DataDecode }) => {
  return (
    <Stack>
      {data.method && (
        <Group align="center">
          <Text fw={600}>Result</Text>

          <Badge>{data.method}</Badge>
        </Group>
      )}

      {data.names.map((name: string, index: number) => (
        <Group key={index} px="md" noWrap align="baseline">
          <Text fw={500}>{name}</Text>
          <Badge fullWidth maw={68} size="xs">
            {data.types.at(index)}
          </Badge>

          <React.Fragment key={index}>
            {typeof data.inputs.at(index) === "string" && (
              <Text
                color="gray.7"
                fw={500}
                fz="sm"
                sx={{ wordBreak: "break-word" }}
              >
                {data.types.at(index) === "address"
                  ? `0x${data.inputs.at(index).toString()}`
                  : data.inputs.at(index).toString()}
              </Text>
            )}
            {ethers.BigNumber.isBigNumber(data.inputs.at(index)) && (
              <ViewBigNumber value={data.inputs.at(index)} />
            )}
          </React.Fragment>
        </Group>
      ))}
    </Stack>
  );
};
