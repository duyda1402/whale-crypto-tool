import { Button, Group, Stack, TextInput, Text, Space } from "@mantine/core";
import { ContextModalProps, modals } from "@mantine/modals";
import { BigNumber, utils } from "ethers";
import { useState } from "react";
import ViewBigNumber from "../atom-ui/ViewBigNumber";

type Props = ContextModalProps<{ modalBody: string }>;

const ModalConvertNumber = ({}: Props) => {
  const [amount, setAmount] = useState<BigNumber>(utils.parseEther("0"));
  return (
    <Stack p="md" spacing="xl">
      <Space h="md" />
      <TextInput
        description="Enter amount"
        placeholder="Enter number"
        label="Input Number"
        type="number"
        withAsterisk
        onChange={(e) =>
          setAmount(utils.parseEther(`${e?.target?.value || 0}`))
        }
      />

      <Text fw={600}>Result:</Text>
      <ViewBigNumber value={amount} />

      <Group position="right">
        <Button
          color="cyan"
          variant="outline"
          onClick={() => modals.closeAll()}
        >
          Cancel
        </Button>
      </Group>
    </Stack>
  );
};

export default ModalConvertNumber;
