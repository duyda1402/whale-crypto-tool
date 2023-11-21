import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { store } from "./libs/store/index.ts";
import { router } from "./routers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        fontFamily: "'Lato', sans-serif",
        lineHeight: 1.4,
      }}
    >
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </Provider>
);
