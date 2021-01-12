import React, { createContext } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
} from "@material-ui/core";

export const ThemeContext = createContext();

const ThemeProvider = (props) => {
  const muiTheme = createMuiTheme({});
  const theme = responsiveFontSizes(muiTheme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeContext.Provider value={{}}>{props.children}</ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
