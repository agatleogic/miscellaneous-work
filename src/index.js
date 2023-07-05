/* eslint-disable no-undef */
import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import i18next from "i18next";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import common_de from "./translations/de/common.json";
import common_fr from "./translations/fr/common.json";
import common_es from "./translations/es/common.json";
import common_en from "./translations/en/common.json";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

import { I18nextProvider } from "react-i18next";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store";
import { API_BASE_URL } from "./store/Constants";

axios.defaults.baseURL = API_BASE_URL;

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en", // language to use
  resources: {
    en: {
      common: common_en // 'common' is our custom namespace
    },
    de: {
      common: common_de
    },
    fr: {
      common: common_fr
    },
    es: {
      common: common_es
    }
  }
});
// const root = ReactDOM.createRoot(document.getElementById("root"));
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
