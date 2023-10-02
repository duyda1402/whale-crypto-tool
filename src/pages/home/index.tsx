import { Container } from "@mantine/core";
import React from "react";
import TitleRoot from "../../components/common-ui/TitleRoot";

const HomePage = () => {
  return (
    <React.Fragment>
      <TitleRoot title="Home" />
      <Container>
        <div>Home</div>
      </Container>
    </React.Fragment>
  );
};

export default HomePage;
