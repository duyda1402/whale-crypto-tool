import { AppShell, Box, Container, ScrollArea } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import NavbarRoot from "./Navbar";
import { useEffect } from "react";
import { KEY_MENU_ACTIVE } from "../../common";
import { Notify } from "../../common/notify";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../libs/store";
import RootSelector from "./RootSelector";
import { actionSelectNetwork } from "../../libs/store/reducers/selector.slice";
import { ErrorBlockChain } from "../../common/enum/base";
import { ModalsProvider } from "@mantine/modals";

const RootLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const networks =
    useSelector((state: RootState) => state.source.networks) || [];

  const dispatch = useDispatch();
  useEffect(() => {
    const keyActive = pathname.split("/")[1] || "$home";
    localStorage.setItem(KEY_MENU_ACTIVE, keyActive);
  }, [pathname]);

  const connectProvider = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkByProvider = await provider.getNetwork();
      const network = networks.find(
        (n) => n.chainId.toString() === networkByProvider.chainId.toString()
      );
      if (network) {
        dispatch(actionSelectNetwork(network));
        Notify.success(`Connected to ${network.networkName} network`);
        window.myProvider = provider;
      } else {
        Notify.warn("Connected to unknown network");
      }
    } else {
      Notify.warn(ErrorBlockChain[9999]);
    }
  };

  useEffect(() => {
    connectProvider();
  }, []);

  return (
    <ModalsProvider>
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
        <Box pos="fixed" right={0} top="20%" sx={{ zIndex: 100 }}>
          <RootSelector />
        </Box>
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
    </ModalsProvider>
  );
};

export default RootLayout;
