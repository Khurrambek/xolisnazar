import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Faq.css";

const Faq = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <div className="faq-full-container">
        <div className="faq-wrapper">
          <div className="faq-backgroun-image">
            <div>{t("faq_faq")}</div>
          </div>
          <div className="faq-text-wrapper">
            <h4 className="changingText">{t("faq_how_title")}</h4>
            <p className="changingText">{t("faq_how_text")}</p>
            <h4 className="changingText">{t("faq_when_title")}</h4>
            <p className="faq-p-1 changingText">{t("faq_when_text")}</p>
            <p className="changingText">{t("faq_when_text-2")}</p>
            <h4 className="changingText">{t("faq_what_title")}</h4>
            <p className="changingText">{t("faq_what_text")}</p>
            <h4 className="changingText">{t("faq_when_bag")}</h4>
            <p className="faq-p-1 changingText">{t("faq_when_bag_text-1")}</p>
            <h4 className="changingText">{t("faq_when_bag_title")}</h4>
            <p className="changingText">{t("faq_when_bag_text-2")}</p>
            <h4 className="changingText">{t("faq_title_6")}</h4>
            <p className="changingText">{t("faq_text_6")}</p>
            <h4 className="changingText">{t("faq_title_7")}</h4>
            <p className="changingText">{t("faq_text_7")}</p>
            <h4 className="changingText">{t("faq_title_8")}</h4>
            <p className="changingText">{t("faq_text_8")}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
