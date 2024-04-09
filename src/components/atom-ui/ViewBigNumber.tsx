import { ActionIcon, Group, Menu, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";

type Props = {
  value: BigNumber;
};

export default function ViewBigNumber({ value }: Props) {
  const [until, setUntil] = useState<number>(-1);
  return (
    <Group>
      {until > 0 ? (
        <Text color="violet.8" fs="italic" fz="sm">
          {ethers.utils.formatUnits(value, until)}
        </Text>
      ) : (
        <Text color="violet.8" fw={500} fz="sm">
          {value._hex}
        </Text>
      )}
      <Menu shadow="md">
        <Menu.Target>
          <ActionIcon size="xs">
            <IconRefresh />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => setUntil(6)}>mwei</Menu.Item>
          <Menu.Item onClick={() => setUntil(9)}>gwei</Menu.Item>
          <Menu.Item onClick={() => setUntil(18)}>ether</Menu.Item>
          <Menu.Item onClick={() => setUntil(-1)}>hex</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
