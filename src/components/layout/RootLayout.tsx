import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import NavbarRoot from "./Navbar";
import HeaderRoot from "./HeaderRoot";

const RootLayout = () => {
  return (
    <AppShell navbar={<NavbarRoot />}>
      <HeaderRoot />
      <Outlet />
    </AppShell>
  );
};

export default RootLayout;
