import React from "react";
import TitleRoot from "../../components/common-ui/TitleRoot";
import HeaderRoot from "../../components/common-ui/HeaderRoot";
import { Center, Container, Text } from "@mantine/core";

function SettingPage() {
  return (
    <React.Fragment>
      <TitleRoot title="Setting" />
      {/* Header */}
      <HeaderRoot title="Setting" />
      <Container p="xl" fluid miw={700}>
        <Center mih={300}>
          <Text fz="xl" fw={600} color="gray.5">
            Come soon!
          </Text>
        </Center>
      </Container>
    </React.Fragment>
  );
}

export default SettingPage;
