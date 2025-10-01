import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import PublicApp from "./PublicApp"; // App untuk HashRouter
import './index.css';
import './custom.css';
import "react-day-picker/dist/style.css";
import { ThemeProvider } from "@material-tailwind/react";
import { CookiesProvider } from "react-cookie";
const isPublicRoute = window.location.hash.startsWith("#/privasi") || window.location.hash.startsWith("#/termservice");
const customTheme = {
  select: {
    styles: {
      base: {
        container: {
          minWidth: "min-w-[80px]",
        },
      },
    },
  },
  input: {
    styles: {
      base: {
        container: {
          position: "relative",
          width: "w-full",
          minWidth: "min-w-[170px]",
        },
        label:{
          disabled: "peer-disabled:text-gray-800"
        }
      }
    }
  }
};
if (isPublicRoute) {
  const publicRoot = document.getElementById("public-root");
  if (publicRoot) {
    ReactDOM.createRoot(publicRoot).render(<PublicApp />);
  }
} else {
  const root = document.getElementById("root");
  if (root) {
    ReactDOM.createRoot(root).render(<CookiesProvider>
    <ThemeProvider value={customTheme}>
      <App />
    </ThemeProvider>
  </CookiesProvider>);
  }
}
