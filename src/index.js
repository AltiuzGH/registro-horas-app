import React from "react";
import reactDom from "react-dom";
import { RouterApp } from "./RouterApp";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PoppinsRegularTTF from "./assets/fonts/Poppins-Regular.ttf";

const poppinsFont = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Poppins'),
    local('Poppins-Regular'),
    url(${PoppinsRegularTTF}) format('woff2')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins, Segoe UI, Arial, sans-serif",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [poppinsFont],
      },
    },
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3378af",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

reactDom.render(
  <ThemeProvider theme={theme}>
    <RouterApp />
  </ThemeProvider>,
  document.getElementById("root")
);
