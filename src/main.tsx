import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);