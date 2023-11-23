import { Center, Container, Text } from "@mantine/core";
import React from "react";
import TitleRoot from "../../components/atom-ui/TitleRoot";
import HeaderRoot from "../../components/atom-ui/HeaderRoot";

const HomePage = () => {
  return (
    <React.Fragment>
      <TitleRoot title="Home" />
      {/* Header */}
      <HeaderRoot title="Home" />
      <Container p="xl" fluid miw={700}>
        <Center mih={300}>
          <Text fz="xl" fw={600} color="gray.5">
            Come soon!
          </Text>
        </Center>
      </Container>
    </React.Fragment>
  );
};

export default HomePage;
