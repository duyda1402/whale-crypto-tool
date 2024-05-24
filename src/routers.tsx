import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/not-found";

import HomePage from "./pages/home/HomePage";
import RootLayout from "./components/layout/RootLayout";
import NetworkPage from "./pages/network/NetworkPage";
import ContractPage from "./pages/contract/ContractPage";
import AbiPage from "./pages/abi/AbiPage";
import SettingPage from "./pages/settings";
import FirebaseProvider from "./components/layout/FirebaseProvider";
import LoginPage from "./pages/auth/LoginPage";
import SettingPersonal from "./pages/settings/SettingPersonal";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <FirebaseProvider>
        <RootLayout />
      </FirebaseProvider>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "network", element: <NetworkPage /> },
      { path: "contract", element: <ContractPage /> },
      { path: "abi", element: <AbiPage /> },
      { path: "setting", element: <SettingPage /> },
      { path: "personal", element: <SettingPersonal /> },
    ],
  },
  {
    path: "auth/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
