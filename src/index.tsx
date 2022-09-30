import React from "react";
import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { StoreProvider } from "./store/StoreContext";
import { GlobalStyle, theme } from "./styles/global_styles";

const iconSettings = {
  color: "#666",
  style: { justifySelf: "center", height: "32px" },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <IconContext.Provider value={iconSettings}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </IconContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
