import { Center, Container, Tabs, Text } from "@mantine/core";
import React from "react";
import HeaderRoot from "../../components/atom-ui/HeaderRoot";
import TitleRoot from "../../components/atom-ui/TitleRoot";

function SettingPersonal() {
  return (
    <React.Fragment>
      <TitleRoot title="Setting Personal" />
      {/* Header */}
      <HeaderRoot title="Setting Personal" />
      <Container p="xl" fluid miw={700}>
        <Tabs radius="xs" defaultValue="general">
          <Tabs.List>
            <Tabs.Tab value="general">
              <Text fw={600} fz="lg" color="gray.7">
                General
              </Text>
            </Tabs.Tab>

            <Tabs.Tab value="advanced">
              <Text fw={600} fz="lg" color="gray.7">
                Advanced
              </Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="general" pt="xs">
            <Center mih={300}>
              <Text fz="xl" fw={600} color="gray.5">
                Coming soon!
              </Text>
            </Center>
          </Tabs.Panel>

          <Tabs.Panel value="advanced" pt="xs">
            <Center mih={300}>
              <Text fz="xl" fw={600} color="gray.5">
                Coming soon!
              </Text>
            </Center>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </React.Fragment>
  );
}

export default SettingPersonal;
