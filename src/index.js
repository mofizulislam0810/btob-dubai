import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter";

const colors = {
  primary: "#068b9f",
  primaryLight: "#b4dce2",
  secondary: "#ed7f22",
  secondaryLight: "##F9D8BC",
  backgroundVariant: "#FAF9FF",
  text: "#1E1E1E",
  inactiveText: "##6F6F6F",
  inactiveIcon: "#8796A1",
  white: "#FFFFFF",
  black: "#000000",
  gradient: "linear-gradient(100.94deg, #ed7f22 -9.51%, #ed7f22 115.79%)",
};

const fonts = {
  heading: "Inter",
  body: "Inter",
};

const theme = extendTheme({ colors, fonts });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
