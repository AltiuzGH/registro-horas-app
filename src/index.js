import React from "react";
import reactDom from "react-dom";
import { RouterApp } from "./RouterApp";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./styles/_index"



reactDom.render(
  <ThemeProvider theme={theme}>
    <RouterApp />
  </ThemeProvider>,
  document.getElementById("root")
);
