import { createGlobalStyle } from "styled-components";
import reset from "./reset";
import normalize from "./normalize";

export const theme = {
  colors: {
    primary: "hsla(213, 47%, 47%, 1)",
    secondary: "hsla(219, 38%, 90%, 1)",
    caption: "hsla(213, 20%, 63%, 1)",
    light: "hsla(212, 5%, 98%, 1)",
    dark: "hsla(212, 64%, 19%, 1)",
    darkAlpha: "hsla(212, 64%, 19%, 0.7)",
    background: "hsla(0, 14%, 97%, 1)",
    backgroundFaded: "hsla(0, 14%, 95%, 1)",
    error: "hsl(352, 78%, 35%)",
  },
};

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${reset}

  html, body {
    font-family: 'Roboto', sans-serif;
    --box-shadow-default: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
  }
`;
