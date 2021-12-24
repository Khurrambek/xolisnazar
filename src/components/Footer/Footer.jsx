import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import indexhttp from "../../config/indexConfig";
import IndexContext from "../../indexContect";
import Logo from "./assets/white_logo.png";

import "./Footer.css";

function Footer() {
  const { t } = useTranslation();

  const {
    setCategoryRoute,
    categoryRoute,
    setCategoryRouteId,
    setRefresh,
    refresh,
    til,
  } = useContext(IndexContext);
  const [isLoading, setIsloading] = useState(true);
  const [homeCategory, setHomeCategory] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  // get api ------ get api
  useEffect(() => {
    indexhttp
      .get("/getAllCategories")
      .then((res) => setHomeCategory(res.data.allCategories))
      .then(() => setIsloading(false));
  }, [isLoading, categoryRoute]);

  useEffect(() => {
    window.sessionStorage.setItem("routeName", categoryRoute);
  }, [categoryRoute]);

  useEffect(() => {
    setCategoryRoute(window.sessionStorage.getItem("routeName"));
  }, [refresh, categoryRoute]);

  const footerFormHandler = (e) => {
    e.preventDefault();
    setNameValue("");
    setNumberValue("");
    setEmailValue("");
    setMessageValue("");
  };

  //* Post => footer form contacts post to db

  const postContacts = async () => {
    return await indexhttp.post("/postContact", {
      name: nameValue,
      phone: numberValue,
      email: emailValue,
      message: messageValue,
    });
  };
  return (
    <div className="footer-container">
      <div className="footer-top">
        <Link to="/" className="footer-top-img">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="footer-second">
        <div className="footer-wrapper">
          <div className="footer-second-wrapper-1">
            <div className="footer-second-1">
              <p className="footer-second-p-second">
                {t("home_footer_subscribe1")} {t("home_footer_subscribe2")}
              </p>
              {/* <p className="footer-second-p-second">
                {t("home_footer_subscribe3")}
              </p> */}
            </div>

            <div className="footer-second-2">
              <ul>
                {homeCategory.slice(0, 4).map((category) =>
                  til ? (
                    <Link
                      className="footer-link"
                      key={category._id}
                      onClick={() => {
                        setCategoryRouteId(category._id);
                        setCategoryRoute(
                          category.titleUz.toLowerCase().split(" ").join("")
                        );
                        setRefresh(!refresh);
                      }}
                      to={`/category/${category._id}`}
                    >
                      <li>{category.titleUz}</li>
                    </Link>
                  ) : (
                    <Link
                      className="footer-link"
                      key={category._id}
                      onClick={() => {
                        setCategoryRouteId(category._id);
                        setCategoryRoute(
                          category.titleUz.toLowerCase().split(" ").join("")
                        );
                        setRefresh(!refresh);
                      }}
                      to={`/category/${category._id}`}
                    >
                      <li>{category.titleKr}</li>
                    </Link>
                  )
                )}
                {homeCategory.slice(4, 5).map((category) =>
                  til ? (
                    <Link
                      className="footer-link"
                      key={category._id}
                      onClick={() => {
                        setCategoryRouteId(category._id);
                        setCategoryRoute(
                          category.titleUz.toLowerCase().split(" ").join("")
                        );
                        setRefresh(!refresh);
                      }}
                      to={`/portret/${category._id}`}
                    >
                      <li>{category.titleUz}</li>
                    </Link>
                  ) : (
                    <Link
                      className="footer-link"
                      key={category._id}
                      onClick={() => {
                        setCategoryRouteId(category._id);
                        setCategoryRoute(
                          category.titleUz.toLowerCase().split(" ").join("")
                        );
                        setRefresh(!refresh);
                      }}
                      to={`/portret/${category._id}`}
                    >
                      <li>{category.titleKr}</li>
                    </Link>
                  )
                )}
                {homeCategory.slice(5, 2021).map((category) =>
                  til ? (
                    <Link
                      className="footer-link"
                      key={category._id}
                      onClick={() => {
                        setCategoryRouteId(category._id);
                        setCategoryRoute(
                          category.titleUz.toLowerCase().split(" ").join("")
                        );
                        setRefresh(!refresh);
                      }}
                      to={`/category/${category._id}`}
                    >
                      <li>{category.titleUz}</li>
                    </Link>
                  ) : (
                    <Link
                      className="footer-link"
                      key={category._id}
                      onClick={() => {
                        setCategoryRouteId(category._id);
                        setCategoryRoute(
                          category.titleUz.toLowerCase().split(" ").join("")
                        );
                        setRefresh(!refresh);
                      }}
                      to={`/category/${category._id}`}
                    >
                      <li>{category.titleKr}</li>
                    </Link>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="footer-second-wrapper-2">
            <div className="footer-second-3">
              <p>xolisnazar@mail.ru</p>
              <a
                className="footer-phome-number first-phone-number-footer d-block"
                href="tel:+998712331092"
              >
                +998 71 233 10 92
              </a>
              <a
                className="footer-phome-number d-block"
                href="tel:+99871233389"
              >
                +998 71 233 39 89
              </a>
              <p>{t("home_footer_address")}</p>
            </div>

            <div className="footer-second-4">
              <form onSubmit={footerFormHandler}>
                <input
                  onChange={(e) => setNameValue(e.target.value)}
                  value={nameValue}
                  type="text"
                  name="name"
                  id="footer-name"
                  placeholder={t("home_footer_input_name")}
                />
                <input
                  onChange={(e) => setNumberValue(e.target.value)}
                  value={numberValue}
                  type="text"
                  name="phoneNumber"
                  id="footer-phoneNumber"
                  placeholder={t("home_footer_input_number")}
                />
                <input
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={emailValue}
                  type="email"
                  name="email"
                  required
                  id="footer-email"
                  placeholder={t("home_footer_input_email")}
                />
                <input
                  onChange={(e) => setMessageValue(e.target.value)}
                  value={messageValue}
                  type="text"
                  name="message"
                  id="footer-message"
                  placeholder={t("home_footer_input_message")}
                />
                <button
                  type="submit"
                  onClick={postContacts}
                  className="footer-yuborish-a"
                >
                  {/* <div className="footer-yuborish"> */}
                  {t("home_footer_button")}
                  {/* </div> */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-third">
        <div className="footer-wrapper">
          <ul>
            <li className="faq">
              <Link to="/contact">{t("footer-title-contact")}</Link>
            </li>
            <li className="faq">
              <Link to="/faq">{t("footer-title-faq")}</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="poweredBy">Powered by MBM IT Company</p>
      <div className="footer-bottom">
        &copy;2021 {t("home_footer_copy-right")}
      </div>
    </div>
  );
}

export default Footer;
