import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/not-found";

import HomePage from "./pages/home/HomePage";
import RootLayout from "./components/layout/RootLayout";
import NetworkPage from "./pages/network/NetworkPage";
import ContractPage from "./pages/contract/ContractPage";
import AbiPage from "./pages/abi/AbiPage";
import SettingPage from "./pages/settings";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "network", element: <NetworkPage /> },
      { path: "contract", element: <ContractPage /> },
      { path: "abi", element: <AbiPage /> },
      { path: "setting", element: <SettingPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
