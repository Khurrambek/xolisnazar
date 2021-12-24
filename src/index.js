import React, { Suspense } from "react";

import ReactDOM from "react-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

import App from "./App";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["uz", "ўз"],
    fallbackLng: "uz",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

// const loadingMarkup = (
//   <div className="py-4 text-center">
//     <h5>Loading..</h5>
//   </div>
// );

const loadingMarkup = (
  <div
    style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#eee",
    }}
  >
    <div style={{ width: "100px", height: "120px", paddingBottom: "2rem" }}>
      <img
        style={{ width: "100%", height: "100%" }}
        src="/assets/loading/LogoLoading.png"
        alt=""
      />
    </div>
  </div>
);

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
