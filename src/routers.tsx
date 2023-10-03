import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/not-found";

import HomePage from "./pages/home";
import RootLayout from "./components/layout/RootLayout";
import SettingPage from "./pages/settings";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "settings", element: <SettingPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
