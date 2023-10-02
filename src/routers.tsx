import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/not-found";

import HomePage from "./pages/home";
import RootLayout from "./components/layout/RootLayout";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [{ path: "", element: <HomePage /> }],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
