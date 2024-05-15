import React from "react";
import TitleRoot from "../../components/atom-ui/TitleRoot";
import HeaderRoot from "../../components/atom-ui/HeaderRoot";
import { Center, Container, Tabs, Text } from "@mantine/core";
import SettingGeneral from "../../components/screen/SettingGeneral";

function SettingPage() {
  return (
    <React.Fragment>
      <TitleRoot title="Setting" />
      {/* Header */}
      <HeaderRoot title="Setting" />
      <Container p="xl" fluid miw={700}>
        <Tabs radius="xs" defaultValue="general">
          <Tabs.List>
            <Tabs.Tab value="general">
              <Text fw={600} fz="lg" color="gray.7">
                General
              </Text>
            </Tabs.Tab>

            <Tabs.Tab value="setting">
              <Text fw={600} fz="lg" color="gray.7">
                Setting
              </Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="general" pt="xs">
            <SettingGeneral />
          </Tabs.Panel>

          <Tabs.Panel value="setting" pt="xs">
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

export default SettingPage;
