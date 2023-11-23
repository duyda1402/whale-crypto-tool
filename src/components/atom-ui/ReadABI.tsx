import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  CopyButton,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import React from "react";
import { AbiDecode } from "../../common/types";
import WriteReadMethodForm from "./WriteReadMethodForm";

type Props = {
  funcs: AbiDecode[];
};
function AccordionControl(props: AccordionControlProps & { name?: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Accordion.Control {...props} />
      <CopyButton value={props?.name + ""} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip
            label={copied ? "Copied" : "Copy"}
            withArrow
            position="right"
          >
            <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
              {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </Box>
  );
}
function ReadABI({ funcs }: Props) {
  return (
    <Stack mt="lg">
      <Accordion
        radius="md"
        chevronPosition="left"
        variant="separated"
        multiple
      >
        {funcs.map((func, index: number) => (
          <React.Fragment key={index}>
            <Accordion.Item value={`${func?.name}-${index}`}>
              <AccordionControl name={func?.name}>
                <Text fz="sm">
                  {index + 1}. {func?.name}
                </Text>
              </AccordionControl>
              <Accordion.Panel>
                <WriteReadMethodForm func={func} label="Read" />
              </Accordion.Panel>
            </Accordion.Item>
          </React.Fragment>
        ))}
      </Accordion>
    </Stack>
  );
}
export default ReadABI;
