import { Button, Group, Stack, Text } from "@mantine/core";
import { ContextModalProps, modals } from "@mantine/modals";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { actionResetStore } from "../../libs/store/reducers/source.slice";
import { NotifySystem } from "../../common/notify";

type Props = ContextModalProps<{ modalBody: string }>;

const ModalResetStore = ({}: Props) => {
  const dispatch = useDispatch();

  const handlerResetStore = useCallback(() => {
    dispatch(actionResetStore());
    NotifySystem.success("Reset database successful!");
    modals.closeAll();
  }, []);

  return (
    <Stack p="md" spacing="md">
      <Text>
        Are you sure you want to do this? This will reset your browser's
        LocalStorage for {import.meta.env.VITE_APP_TITLE!} and clear all of your
        settings. This cannot be undone.
      </Text>

      <Group position="right">
        <Button
          color="cyan"
          variant="outline"
          onClick={() => modals.closeAll()}
        >
          Cancel
        </Button>
        <Button color="red" variant="outline" onClick={handlerResetStore}>
          Reset
        </Button>
      </Group>
    </Stack>
  );
};

export default ModalResetStore;
