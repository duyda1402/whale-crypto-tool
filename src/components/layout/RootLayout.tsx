import { AppShell, Container, ScrollArea } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import NavbarRoot from "./Navbar";
import { useEffect } from "react";
import { KEY_MENU_ACTIVE } from "../../common";

const RootLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    const keyActive = pathname.split("/")[1] || "$home";
    localStorage.setItem(KEY_MENU_ACTIVE, keyActive);
  }, [pathname]);
  return (
    <AppShell
      navbar={<NavbarRoot />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[1],
        },
      })}
    >
      <Container
        size="xl"
        sx={{
          height: "100%",
        }}
      >
        <ScrollArea
          sx={(theme) => ({
            height: "100%",
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : "#fff",
            boxShadow: theme.shadows.lg,
          })}
        >
          <Outlet />
        </ScrollArea>
      </Container>
    </AppShell>
  );
};

export default RootLayout;
