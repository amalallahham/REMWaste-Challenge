import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './styles/fonts.css';
import "./index.css";
import "./styles/override.css";


import "antd/dist/reset.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "../store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
