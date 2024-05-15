import {
  Button,
  Flex,
  Group,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";

type Props = {};

const SettingGeneral = ({}: Props) => {
  return (
    <Stack p="lg" spacing="xl">
      {/* Import or Export */}
      <Flex justify="space-between" align="center">
        <Text fz="lg" color="gray.8">
          Store Settings
        </Text>
        <Group align="center">
          <Button
            color="cyan"
            variant="outline"
            onClick={() =>
              modals.openContextModal({
                modal: "modalImportStore",
                title: <Title order={3}>Import</Title>,
                innerProps: {},
                size: "xl",
              })
            }
          >
            Import
          </Button>
          <Button
            color="cyan"
            variant="outline"
            onClick={() =>
              modals.openContextModal({
                modal: "modalExportStore",
                title: <Title order={3}>Export</Title>,
                innerProps: {},
                size: "xl",
              })
            }
          >
            Export
          </Button>
        </Group>
      </Flex>
      {/* EIP 1559*/}
      <Flex justify="space-between" align="center">
        <Text fz="lg" color="gray.8">
          Base Currency
        </Text>
        <Group align="center">
          <Select
            defaultValue="usd"
            placeholder="Pick currency"
            data={[
              { value: "usd", label: "USD" },
              { value: "vnd", label: "VND" },
              { value: "eur", label: "EUR" },
              { value: "cny", label: "CNY" },
              { value: "rub", label: "RUB" },
            ]}
          />
        </Group>
      </Flex>
      {/* EIP 1559*/}
      <Flex justify="space-between" align="center">
        <Text fz="lg" color="gray.8">
          EIP 1559
        </Text>
        <Group align="center">
          <Switch color="cyan" defaultChecked={true} />
        </Group>
      </Flex>
      {/* Product Analytics */}
      <Flex justify="space-between" align="center">
        <Text fz="lg" color="gray.8">
          Product Analytics
        </Text>
        <Group align="center">
          <Switch color="cyan" defaultChecked={true} />
        </Group>
      </Flex>
      {/* Reset Store */}
      <Flex justify="space-between" align="center">
        <Text fz="lg" color="gray.8">
          Reset Database
        </Text>
        <Group align="center">
          <Button
            color="red"
            variant="outline"
            onClick={() =>
              modals.openContextModal({
                modal: "modalResetStore",
                title: <Title order={3}>Reset Database</Title>,
                innerProps: {},
                size: "xl",
              })
            }
          >
            Reset
          </Button>
        </Group>
      </Flex>
    </Stack>
  );
};

export default SettingGeneral;
