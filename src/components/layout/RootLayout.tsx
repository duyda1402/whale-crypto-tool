import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import NavbarRoot from "./Navbar";

const RootLayout = () => {
  return (
    <AppShell navbar={<NavbarRoot />}>
      <Outlet />
    </AppShell>
  );
};

export default RootLayout;
