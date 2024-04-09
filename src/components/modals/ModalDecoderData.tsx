import {
  Badge,
  Box,
  Group,
  Select,
  Stack,
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

type Props = ContextModalProps<{ modalBody: string }>;
type DataDecode = {
  method: string | null;
  types: Array<any>;
  inputs: Array<any>;
  names: Array<any>;
};

type DataDecodeKey = keyof DataDecode;
const ModalDecoderData = ({}: Props) => {
  const abis = useSelector((state: RootState) => state.source.abis);
  const [dataDecode, setDataDecode] = useState<DataDecode>({
    method: null,
    types: [],
    inputs: [],
    names: [],
  });
  const [abiSelect, setAbiSelect] = useState<AbiIF | null>(null);

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
    console.log(result);
  };

  return (
    <Stack p="md" spacing="md">
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
      <Text fw={500}>Result :</Text>
      <ViewUInputDataDecoder data={dataDecode} />
    </Stack>
  );
};

export default ModalDecoderData;

const ViewUInputDataDecoder = ({ data }: { data: DataDecode }) => {
  return (
    <Stack>
      {Object.keys(data).map((key: string, index: number) => (
        <React.Fragment key={index}>
          <Group>
            <Badge>{key}</Badge>
          </Group>
          {typeof data?.[key as DataDecodeKey] === "string" ? (
            <Text color="gray.7" fw={500} px="md">
              {data[key as DataDecodeKey]}
            </Text>
          ) : (
            <Box px="md">
              {((data?.[key as DataDecodeKey] as Array<any>) || []).map(
                (v: any, index: number) => (
                  <React.Fragment key={index}>
                    {typeof v === "string" && (
                      <Text color="gray.7" fw={500} fz="sm">
                        {v.toString()}
                      </Text>
                    )}
                    {ethers.BigNumber.isBigNumber(v) && (
                      <ViewBigNumber value={v} />
                    )}
                  </React.Fragment>
                )
              )}
            </Box>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
};
