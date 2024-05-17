import { Box, Group, rem, Stack, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { ContextModalProps, modals } from "@mantine/modals";
import { IconFileTypeJs, IconUpload, IconX } from "@tabler/icons-react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { z, ZodError } from "zod";
import { NotifySystem } from "../../common/notify";
import { DataLocal } from "../../common/types";
import { actionImportStore } from "../../libs/store/reducers/source.slice";
type Props = ContextModalProps<{ modalBody: string }>;

const MyDataSchema = z.object({
  networks: z.array(
    z.object({
      uid: z.string(),
      icon: z.string().optional(),
      networkName: z.string(),
      rpcUrl: z.string(),
      chainId: z.string().or(z.number()),
      currencySymbol: z.string(),
      blockExplorerUrl: z.string().optional(),
      isSystem: z.boolean().optional(),
    })
  ),
  contracts: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
      address: z.string(),
      abi: z.string(),
      isSystem: z.boolean().optional(),
      chainId: z.string().or(z.number()),
    })
  ),
  abis: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
      payload: z.string(),
      isSystem: z.boolean().optional(),
    })
  ),
});

const ModalImportStore = ({}: Props) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const handlerImportFile = useCallback((files: FileWithPath[]) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e: any) {
        try {
          const jsonString = e.target.result;
          const jsonObject = JSON.parse(jsonString) as DataLocal;
          MyDataSchema.parse(jsonObject);
          dispatch(actionImportStore(jsonObject));
          NotifySystem.success("Import data successful!");
          modals.closeAll();
        } catch (error: any) {
          if (error instanceof ZodError) {
            NotifySystem.error(
              `Invalid '${error.errors?.[0]?.path.at(0)}' : ${error.errors?.[0]?.message}`
            );
          } else {
            NotifySystem.error("Validation error: " + error.message);
          }
        }
      };

      reader.onerror = function (e: any) {
        NotifySystem.error("File could not be read: " + e?.target?.error);
      };

      reader.readAsText(file);
    }
  }, []);

  return (
    <Stack p="md" spacing="md">
      <Dropzone
        onDrop={handlerImportFile}
        onReject={(_files: any) =>
          NotifySystem.error("Upload Fail, Please select the json file again")
        }
        maxSize={3 * 1024 ** 2}
        accept={["application/json"]}
        multiple={false}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(220), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.gray[7]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFileTypeJs
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.gray[7]}
            />
          </Dropzone.Idle>

          <Box>
            <Text size="xl" inline color="gray.7">
              Drag *.json here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 3mb
            </Text>
          </Box>
        </Group>
      </Dropzone>
    </Stack>
  );
};

export default ModalImportStore;
