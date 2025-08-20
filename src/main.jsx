import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
//import ErrorBoundary from "./ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

      <ChakraProvider value={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </ChakraProvider>

);


// // createRoot(document.getElementById('root')).render(
// //     <App />,
// // )