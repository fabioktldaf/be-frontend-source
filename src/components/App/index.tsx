import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultLanguage } from "../../config/const";
import translations from "../../config/translations";
import Layout from "../Layout";

import "antd/dist/antd.css";
import "./App.css";

i18n.use(initReactI18next).init({
  resources: translations,
  lng: defaultLanguage,
  fallbackLng: "empty",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  return <Layout />;
}

export default App;
