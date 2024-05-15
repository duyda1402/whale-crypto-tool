import { Button, Group, Stack, Text, Textarea } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { KEY_DATA_LOCALE } from "../../common";
import { ContextModalProps } from "@mantine/modals";

type Props = ContextModalProps<{ modalBody: string }>;

const ModalExportStore = ({}: Props) => {
  const [store, setStore] = useState();

  useEffect(() => {
    const localStore = localStorage.getItem(KEY_DATA_LOCALE);
    setStore(JSON.parse(localStore || "{}"));
  }, []);

  const handlerDownload = useCallback(() => {
    const jsonString = JSON.stringify(store);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${import.meta.env.VITE_APP_TITLE}_${Date.now()}`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <Stack p="md" spacing="md">
      <Text>
        Your {import.meta.env.VITE_APP_TITLE!} settings file is ready.
      </Text>

      <Textarea minRows={10} readOnly value={JSON.stringify(store)} />
      <Group position="right">
        <Button color="cyan" variant="outline" onClick={handlerDownload}>
          Download
        </Button>
      </Group>
    </Stack>
  );
};

export default ModalExportStore;
