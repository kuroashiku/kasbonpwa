import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './custom.css';
import "react-day-picker/dist/style.css";
import { ThemeProvider } from "@material-tailwind/react";
import { CookiesProvider } from "react-cookie";
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

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CookiesProvider>
    <ThemeProvider value={customTheme}>
      <App />
    </ThemeProvider>
  </CookiesProvider>
  // </React.StrictMode>,
)
