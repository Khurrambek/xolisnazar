import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Contact.css";
import indexConfig from "../../config/indexConfig";

const Contact = () => {
  const { t } = useTranslation();
  const [nameValue, setNameValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const contactFormHandler = (e) => {
    e.preventDefault();
    setNameValue("");
    setNumberValue("");
    setEmailValue("");
    setMessageValue("");
  };

  //* Post => post user contact to the db
  const postContacts = async () => {
    return await indexConfig.post("/postContact", {
      name: nameValue,
      phone: numberValue,
      email: emailValue,
      message: messageValue,
    });
  };

  return (
    <>
      <Navbar />
      <div className="contact-full-container">
        <div className="contact-wrapper">
          <div className="contact-backgroun-image">
            {/* <div>{t("contact_top_contact-with-us")}</div> */}
          </div>
          <div className="contact-adverts-div">
            <div>
              <strong>{t("contact_page_ads_text1")}</strong>
              {t("contact_page_ads_text2")}
              <strong>{t("contact_page_ads_text3")}</strong>
              {t("contact_page_ads_text4")}
            </div>
          </div>
          <div className="contact-page-form-wrapper">
            <div className="contact-form-map">
              <div className="contact-form-map-wrap">
                <iframe
                  title="This is a unique title"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1259.8797455704762!2d69.29574742577154!3d41.31939351292815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef4d19a1409b9%3A0x2a532a4038fed1d9!2sKhamid%20Alimdjan!5e0!3m2!1sen!2s!4v1632808942608!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="contact-form-form">
              <div className="contact-form-title changingText">
                {t("contact_form_title")}
              </div>
              <div className="contact-form-input-wrap">
                <form onSubmit={contactFormHandler} action="" method="post">
                  <input
                    onChange={(e) => setNameValue(e.target.value)}
                    value={nameValue}
                    className="changingText"
                    type="text"
                    placeholder={t("contact_input_name")}
                  />
                  <input
                    onChange={(e) => setNumberValue(e.target.value)}
                    value={numberValue}
                    className="changingText"
                    type="text"
                    placeholder={t("contact_input_number")}
                  />
                  <input
                    onChange={(e) => setEmailValue(e.target.value)}
                    value={emailValue}
                    className="changingText"
                    type="text"
                    placeholder={t("contact_input_e-mail")}
                  />
                  <input
                    onChange={(e) => setMessageValue(e.target.value)}
                    value={messageValue}
                    className="changingText"
                    type="text"
                    placeholder={t("contact_input_message")}
                  />
                  <button
                    onClick={postContacts}
                    type="submit"
                    name=""
                    id="contact-btn"
                  >
                    {t("contact_button")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
