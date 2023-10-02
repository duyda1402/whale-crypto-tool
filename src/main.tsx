import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routers.tsx";
import { store } from "./libs/store/index.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </Provider>
);
