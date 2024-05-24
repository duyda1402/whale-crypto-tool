import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { store } from "./libs/store/index.ts";
import { router } from "./routers.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { Chain, defineChain } from "viem";
import { mainnet } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { KEY_DATA_LOCALE } from "./common/index.ts";
import { NetworkIF } from "./common/types/index.ts";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId
const PROJECT_ID = import.meta.env.VITE_PRO_ID_WALLET_CONNECT!;
const networks: NetworkIF[] =
  JSON.parse(localStorage.getItem(KEY_DATA_LOCALE) || "{}")?.networks || [];
// 2. Set chains
let chains: Chain[] = networks.map((n) =>
  defineChain({
    id: Number(n.chainId),
    name: n.networkName,
    nativeCurrency: {
      name: n.currencySymbol,
      symbol: n.currencySymbol,
      decimals: 18,
    },
    rpcUrls: {
      default: { http: [`${n.rpcUrl}`] },
    },
    blockExplorers: {
      default: {
        name: `${n.networkName} scan`,
        url: n?.blockExplorerUrl || "",
      },
    },
  })
);
// 3. Create a metadata object
const metadata = {
  name: "Whale Crypto",
  description: "Whale Crypto tool",
  url: window.location.origin, // origin must match your domain & subdomain
  icons: [`${window.location.origin}/logo.svg`],
};

export const wagmiConfig = defaultWagmiConfig({
  projectId: PROJECT_ID,
  chains: [mainnet, ...chains],
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId: PROJECT_ID,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{
            fontFamily: "'Lato', sans-serif",
            lineHeight: 1.4,
          }}
        >
          <RouterProvider router={router} />

          <Notifications position="top-right" />
        </MantineProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </Provider>
);
