import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  breakpoints: {
    sm: "35em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
      },
    },
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
