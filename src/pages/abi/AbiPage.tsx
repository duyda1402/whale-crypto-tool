import { Container } from "@mantine/core";
import React from "react";
import HeaderRoot from "../../components/atom-ui/HeaderRoot";
import TitleRoot from "../../components/atom-ui/TitleRoot";
import SettingABI from "../../components/screen/SettingABI";

function AbiPage() {
  return (
    <React.Fragment>
      <TitleRoot title="ABI" />
      {/* Header */}
      <HeaderRoot title="ABI" />
      <Container p="xl" fluid miw={700}>
        <SettingABI />
      </Container>
    </React.Fragment>
  );
}

export default AbiPage;
