import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Center,
  CopyButton,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import React from "react";
import { AbiDecode } from "../../common/types";

type Props = {
  events: AbiDecode[];
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

function EventABI({ events }: Props) {
  return (
    <Stack mt="lg">
      <Accordion chevronPosition="left" variant="separated" multiple>
        {events.map((evt, index: number) => (
          <React.Fragment key={index}>
            <Accordion.Item value={`${evt.name}-${index}`}>
              <AccordionControl name={evt?.name}>
                <Text fz="sm">
                  {index + 1}. {evt.name}
                </Text>
              </AccordionControl>
              <Accordion.Panel>
                <Center mih={100}>
                  <Text fz="sm" fw={600} color="gray.5">
                    Come soon!
                  </Text>
                </Center>
              </Accordion.Panel>
            </Accordion.Item>
          </React.Fragment>
        ))}
      </Accordion>
    </Stack>
  );
}
export default EventABI;
