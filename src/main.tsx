import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { Global } from "@mantine/styles";
import "@mantine/core/styles.css";
import { store } from "./store/store.tsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <MantineProvider>
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.colors.gray[0],
            },
          })}
        />
        <App />
      </MantineProvider>
    </StrictMode>
  </Provider>
);
