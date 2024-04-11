import { Center, Container, Tabs, Text } from "@mantine/core";
import React from "react";

import { useSearchParams } from "react-router-dom";
import HeaderRoot from "../../components/atom-ui/HeaderRoot";
import TitleRoot from "../../components/atom-ui/TitleRoot";
import InteractContract from "../../components/screen/InteractContract";
import ManualContract from "../../components/screen/ManualContract";

function ContractPage() {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <React.Fragment>
      <TitleRoot title="Contract" />
      {/* Header */}
      <HeaderRoot title="Contract" />
      <Container p="xl" miw={700} fluid>
        <Tabs
          radius="xs"
          defaultValue={searchParams.get("tab") || "interact"}
          onTabChange={(value) => setSearchParams({ tab: `${value}` })}
        >
          <Tabs.List>
            <Tabs.Tab value="interact">
              <Text fw={600} fz="lg" color="gray.7">
                Interact
              </Text>
            </Tabs.Tab>

            <Tabs.Tab value="setting">
              <Text fw={600} fz="lg" color="gray.7">
                Setting
              </Text>
            </Tabs.Tab>

            <Tabs.Tab value="deploy">
              <Text fw={600} fz="lg" color="gray.7">
                Deploy
              </Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="interact" pt="xs">
            <InteractContract />
          </Tabs.Panel>

          <Tabs.Panel value="setting" pt="xs">
            <ManualContract />
          </Tabs.Panel>

          <Tabs.Panel value="deploy" pt="xs">
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

export default ContractPage;
