import { AppShell, Box, Container, Group, ScrollArea } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { useWeb3ModalTheme } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { useChainId } from "wagmi";
import { KEY_MENU_ACTIVE } from "../../common";
import { ErrorBlockChain } from "../../common/enum/base";
import { NotifySystem } from "../../common/notify";
import { RootState } from "../../libs/store";
import { actionSelectNetwork } from "../../libs/store/reducers/selector.slice";
import ModalConvertNumber from "../modals/ModalConvertNumber";
import ModalDecoderData from "../modals/ModalDecoderData";
import ModalExportStore from "../modals/ModalExportStore";
import ModalImportStore from "../modals/ModalImportStore";
import ModalResetStore from "../modals/ModalResetStore";
import Footer from "./Footer";
import NavbarRoot from "./Navbar";
import RootSelector from "./RootSelector";
import RootTool from "./RootTool";

const RootLayout = () => {
  const { setThemeMode, setThemeVariables } = useWeb3ModalTheme();

  useEffect(() => {
    setThemeMode("light");
    setThemeVariables({
      "--w3m-color-mix": "#f1f5f9",
      "--w3m-color-mix-strength": 40,
    });
  }, []);

  const location = useLocation();
  const { pathname } = location;

  const networks =
    useSelector((state: RootState) => state.source.networks) || [];

  const chainId = useChainId();
  const dispatch = useDispatch();

  useEffect(() => {
    const keyActive = pathname.split("/")[1] || "$home";
    localStorage.setItem(KEY_MENU_ACTIVE, keyActive);
  }, [pathname]);

  const connectProvider = async () => {
    if (window.ethereum) {
      const network = networks.find(
        (n) => n.chainId.toString() === chainId.toString()
      );
      if (network) {
        dispatch(actionSelectNetwork(network));
        NotifySystem.success(`Connected to ${network.networkName} network`);
      } else {
        NotifySystem.warn("Connected to unknown network");
      }
    } else {
      NotifySystem.warn(ErrorBlockChain[9999]);
    }
  };

  useEffect(() => {
    connectProvider();
  }, []);

  return (
    <ModalsProvider
      modals={{
        modalDecoderData: ModalDecoderData,
        modalExportStore: ModalExportStore /* ...other modals */,
        modalImportStore: ModalImportStore,
        modalResetStore: ModalResetStore,
        modalConvertNumber: ModalConvertNumber,
      }}
    >
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
        <Box pos="fixed" right={32} bottom={28} sx={{ zIndex: 100 }}>
          <RootTool />
        </Box>
        <Container
          size="xl"
          sx={{
            height: "100%",
          }}
        >
          <ScrollArea
            sx={(theme) => ({
              height: "97%",
              backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[6] : "#fff",
              boxShadow: theme.shadows.lg,
            })}
          >
            <Outlet />
          </ScrollArea>
          <Group position="center" py="xs">
            <Footer />
          </Group>
        </Container>
      </AppShell>
    </ModalsProvider>
  );
};

export default RootLayout;
