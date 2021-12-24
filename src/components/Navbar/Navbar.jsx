import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Logo from "./assets/xolisNazarLogo.png";
import nav_magazine from "./assets/magazine1.png";
import SearchIcon from "./assets/Vector.svg";
import { IoMdClose, AiOutlineSearch } from "react-icons/all";
import indexhttp from "../../config/indexConfig";
import white_logo from "./assets/white_logo.png";
import "./Navbar.css";

import {
  GrLinkedinOption,
  FaTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
  FaTelegramPlane,
  FaFacebookF,
} from "react-icons/all";

import { ScaleLoader } from "react-spinners";
import { getwheatherData } from "./WheatherData/weatherapi";
import { Link } from "react-router-dom";

// Language
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import IndexContext from "../../indexContect";

const languages = [
  {
    code: "ўз",
    name: "O'z",
  },
  {
    code: "uz",
    name: "Ўз",
  },
];

function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [wheatherdata, setWheatherData] = useState(null);
  const city = "Tashkent";
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getwheatherData(city);
      setWheatherData(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
  `;

  useEffect(() => {
    getData();
  }, []);

  let x = 0;
  const changeFontSizeIncrease = () => {
    x++;
    let changeText = document.getElementsByClassName("changingText");

    if (x < 6) {
      for (let i = 0; i < changeText.length; i++) {
        let fontSize = window
          .getComputedStyle(changeText[i], null)
          .getPropertyValue("font-size");
        fontSize = parseFloat(fontSize);
        changeText[i].style.fontSize = fontSize + 0.8 + "px";
      }
    } else {
      x = 5;
    }
  };

  const changeFontSizeDecrease = () => {
    let changeText = document.getElementsByClassName("changingText");

    if (x > 0 && x < 6) {
      for (let i = 0; i < changeText.length; i++) {
        let fontSize = window
          .getComputedStyle(changeText[i], null)
          .getPropertyValue("font-size");
        fontSize = parseFloat(fontSize);
        changeText[i].style.fontSize = fontSize - 0.8 + "px";
      }
    } else {
      x = 1;
    }
    x--;
  };

  const changeFontSizeDefault = () => {
    let changeText = document.getElementsByClassName("changingText");

    for (let i = 0; i < changeText.length; i++) {
      let fontSize = window
        .getComputedStyle(changeText[i], null)
        .getPropertyValue("font-size");
      fontSize = parseInt(fontSize.slice(0, fontSize.length - 2));
      changeText[i].style.fontSize = fontSize - x * 0.8 + "px";
    }
    x = 0;
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // return <Link to={`/search/${searchTerm}`} />;
      setSearchTerm(e.target.value);
      return <Redirect to={`/search/${searchTerm}`} />;
    }
  };

  let currentDate = new Date();
  let dayName = currentDate.getDate();
  let yearName = currentDate.getFullYear();
  let monthNumber = new Date().getMonth();
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthName = monthNames[monthNumber];
  let fullDate = monthName + " " + dayName + ", " + yearName;

  const { setRefresh, refresh, setTil, til, setSearchValue } =
    useContext(IndexContext);
  const [isLoading, setIsloading] = useState(true);
  const [homeCategory, setHomeCategory] = useState([]);
  const [newspapersData, setNewspapersData] = useState([]);
  const [journalsData, setJournalsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    indexhttp
      .get("/getAllCategories")
      .then((res) => setHomeCategory(res.data.allCategories))
      .then(() => setIsloading(false));
    indexhttp
      .get("/currency")
      .then((res) => setCurrency(res.data.currencyData));
  }, [isLoading, refresh]);

  useEffect(() => {
    indexhttp
      .get("/getNewspapers")
      .then((res) => setNewspapersData(res.data.newsPapers));
    indexhttp
      .get("/getJournals")
      .then((res) => setJournalsData(res.data.newsPapers));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="navbar-container">
        <div className="nav-top">
          <div className="nav-top-left">
            {loading ? (
              <div className="loader-wrapper">
                <div className="loader-container">
                  {" "}
                  <ScaleLoader
                    css={override}
                    size={200}
                    color={"#000"}
                    loading={loading}
                  />
                </div>
              </div>
            ) : (
              <>
                {wheatherdata !== null ? (
                  <div className="weather-wrapper">
                    <div className="weather-icon">
                      <img
                        src={`https://openweathermap.org/img/w/${wheatherdata.weather[0].icon}.png`}
                        alt="imgicon"
                      />
                    </div>
                    <div className="weather-info">
                      <div className="temperature">
                        <h1 className="changingText">
                          {parseFloat(wheatherdata.main.temp - 273.15).toFixed(
                            0
                          )}
                          &deg;C
                        </h1>
                      </div>
                      <div className="weather-date-wrapper changingText">
                        {fullDate}
                      </div>
                    </div>
                  </div>
                ) : (
                  setLoading(true)
                )}
              </>
            )}
          </div>

          <div className="nav-top-mid">
            {currency.slice(0, 1).map((data) => (
              <div key={data._id} className="currency-usa-wrap">
                <div className="currencyUsaText">{data.Ccy}:</div>
                <div className="currencyUsaNum">{data.Rate}</div>
              </div>
            ))}
            {currency.slice(1, 2).map((data) => (
              <div key={data._id} className="currency-euro-wrap">
                <div className="currencyEuroText">{data.Ccy}:</div>
                <div className="currencyEuroNum">{data.Rate}</div>
              </div>
            ))}
          </div>

          <div className="nav-top-right">
            <div className="nav-top-right-empty"></div>
            <p className="changingText language-wrapper">
              {languages.slice(0, 1).map(({ code, name }) => (
                <div
                  className="changingText"
                  onClick={() => {
                    i18next.changeLanguage(code);
                    setTil(false);
                  }}
                >
                  {name}
                </div>
              ))}
              {languages.slice(1, 2).map(({ code, name }) => (
                <div
                  className="changingText"
                  onClick={() => {
                    i18next.changeLanguage(code);
                    setTil(true);
                  }}
                >
                  {name}
                </div>
              ))}
            </p>
            <div className="nav-top-right-size-changer">
              <button
                className="changingText size-btn"
                onClick={() => changeFontSizeDecrease()}
              >
                A-
              </button>
              <button
                className="changingText size-btn"
                onClick={() => changeFontSizeDefault()}
              >
                A
              </button>
              <button
                className="changingText size-btn"
                onClick={() => changeFontSizeIncrease()}
              >
                A+
              </button>
            </div>
          </div>
        </div>

        <div className="nav-bottom">
          <div className="nav-bottom-left">
            {/* share img not in home page but all other pages */}
            {/* <img src={share} alt="share-icon" /> */}

            {/* magazine img is only in home page */}
            {newspapersData.slice(0, 1).map((data) => (
              <Link
                key={data._id}
                className="nav_left_magazine"
                to={`/magazine/getNewspapers`}
              >
                <img
                  className="nav-magazine-img"
                  src={data.image}
                  alt="magazine-img"
                />
              </Link>
            ))}
            {journalsData.slice(0, 1).map((data) => (
              <Link
                key={data._id}
                className="nav_left_newspaper"
                to={`/magazine/getJournals`}
              >
                <img
                  className="nav-magazine-img"
                  src={data.image}
                  alt="magazine-img"
                />
              </Link>
            ))}
            {/* empty div is only in home page */}
            <div className="nav-bottom-left-empty"></div>
          </div>
          <Link to="/" className="nav-bottom-mid">
            <img src={Logo} alt="xolis-nazar-logo" />
            {/* <div className="nav-test-test">Сайт тест режимида ишламоқда!</div> */}
          </Link>

          <div className="nav-bottom-right">
            {/* <p className="changingText">{t("home_nav_quote")}</p> */}
            <div className="nav-bottom-right_empty"></div>
            <div className="home-kundalik-icons">
              <a
                href={"https://www.instagram.com/xolis_nazaruz/"}
                className="home-instagramIcon"
              >
                <AiOutlineInstagram className="home-dot-icon" color="white" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCmmg6hT60gJ3I5i0BOYSoog"
                className="home-youTubeIcon"
              >
                <AiFillYoutube className="home-dot-icon" color="white" />
              </a>
              <a href="https://t.me/Xolis_nazar" className="home-telegramIcon">
                <FaTelegramPlane className="home-dot-icon" color="white" />
              </a>
              <a
                href="https://www.facebook.com/Xolis-Nazar-104958581725934/?ref=pages_you_manage"
                className="home-facebookIcon"
              >
                <FaFacebookF className="home-dot-icon" color="white" />
              </a>
            </div>
            <img
              src={SearchIcon}
              alt="SearchMenu"
              onClick={() => toggle(setIsOpen(false))}
            />
          </div>
        </div>

        {/* --------------------------------- Search Content ------------------------ */}
        <div
          className={isOpen ? "search-contanerInVisible" : "search-contaner"}
        >
          <div className="topIconsBlock">
            <Link to="/">
              <img src={white_logo} alt="" />
            </Link>
            <IoMdClose
              className="close-iconx"
              onClick={() => toggle(setIsOpen)}
            />
          </div>
          <div className="searchInputDiv">
            <input
              type="text"
              placeholder={t("navbar_search")}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {/* </Link> */}
            <Link to={`/search/${searchTerm}`} className="search-link">
              <AiOutlineSearch className="nav_search_icon" />
            </Link>
          </div>

          {/*  ----------------------------------------------------------------------*/}
          <div className="search-weather-container">
            {loading ? (
              <div className="loader-wrapper">
                <div className="loader-container">
                  {" "}
                  <ScaleLoader
                    css={override}
                    size={200}
                    color={"#000"}
                    loading={loading}
                  />
                </div>
              </div>
            ) : (
              <>
                {wheatherdata !== null ? (
                  <div className="search-weather-container">
                    <div className="search-weather-icon">
                      <img
                        src={`https://openweathermap.org/img/w/${wheatherdata.weather[0].icon}.png`}
                        alt="imgicon"
                      />
                    </div>
                    <div className="search-weather-text-wrap">
                      <div className="">
                        <h1 className="search-weather-temperature">
                          {parseFloat(wheatherdata.main.temp - 273.15).toFixed(
                            0
                          )}
                          &deg;C
                        </h1>
                      </div>
                      <div className="search-weather-date-wrapper">
                        {fullDate}
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>

          <div className="search-currency-div">
            {currency.slice(0, 1).map((data) => (
              <div key={data.id} className="search-currency-usa-wrap">
                <div className="search-currencyUsaText">{data.Ccy}:</div>
                <div className="search-currencyUsaNum">{data.Rate}</div>
              </div>
            ))}
            {currency.slice(1, 2).map((data) => (
              <div key={data.id} className="search-currency-euro-wrap">
                <div className="search-currencyEuroText">{data.Ccy}:</div>
                <div className="search-currencyEuroNum">{data.Rate}</div>
              </div>
            ))}
          </div>
          {/*  ---------------------------------------------------------------------------------------------*/}

          <div className="search-links-wrap">
            {homeCategory.slice(0, 4).map((category) =>
              til ? (
                <Link
                  className="searchLinks"
                  key={category._id}
                  onClick={() => {
                    setRefresh(!refresh);
                  }}
                  to={`/category/${category._id}`}
                >
                  {category.titleUz}
                </Link>
              ) : (
                <Link
                  className="searchLinks"
                  key={category._id}
                  onClick={() => {
                    setRefresh(!refresh);
                  }}
                  to={`/category/${category._id}`}
                >
                  {category.titleKr}
                </Link>
              )
            )}

            {homeCategory.slice(4, 5).map((category) =>
              til ? (
                <Link
                  className="searchLinks"
                  key={category._id}
                  onClick={() => {
                    setRefresh(!refresh);
                  }}
                  to={`/portret/${category._id}`}
                >
                  {category.titleUz}
                </Link>
              ) : (
                <Link
                  className="searchLinks"
                  key={category._id}
                  onClick={() => {
                    setRefresh(!refresh);
                  }}
                  to={`/portret/${category._id}`}
                >
                  {category.titleKr}
                </Link>
              )
            )}
            {homeCategory.slice(5, 2021).map((category) =>
              til ? (
                <Link
                  className="searchLinks"
                  key={category._id}
                  onClick={() => {
                    setRefresh(!refresh);
                  }}
                  to={`/category/${category._id}`}
                >
                  {category.titleUz}
                </Link>
              ) : (
                <Link
                  className="searchLinks"
                  key={category._id}
                  onClick={() => {
                    setRefresh(!refresh);
                  }}
                  to={`/category/${category._id}`}
                >
                  {category.titleKr}
                </Link>
              )
            )}

            <Link className="searchLinks bottomLink" to="/obuna">
              {t("category_name_obuna")}
            </Link>
          </div>
          <div className="search-icons-wrap">
            <a
              href="https://www.instagram.com/xolis_nazaruz/"
              className="search-instagramIcon"
            >
              <AiOutlineInstagram className="home-dot-icon" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCmmg6hT60gJ3I5i0BOYSoog"
              className="search-youTubeIcon"
            >
              <AiFillYoutube className="home-dot-icon" />
            </a>
            <a href="https://t.me/Xolis_nazar" className="search-telegramIcon">
              <FaTelegramPlane className="home-dot-icon" />
            </a>
            <a
              href="https://www.facebook.com/Xolis-Nazar-104958581725934/?ref=pages_you_manage"
              className="search-facebookIcon"
            >
              <FaFacebookF className="home-dot-icon" />
            </a>
          </div>
          <Link to="/magazine" className="search-bottom-magazine">
            <img src={nav_magazine} alt="" />
          </Link>
        </div>
      </div>

      <div className="home-catalog-wrapper">
        <div className="home-catalog">
          <ul>
            {homeCategory.slice(0, 4).map((category) =>
              til ? (
                <div className="home-catalog-li-last">
                  <Link
                    key={category._id}
                    onClick={() => {
                      setRefresh(!refresh);
                    }}
                    to={`/category/${category._id}`}
                  >
                    {category.titleUz}
                  </Link>
                </div>
              ) : (
                <div className="home-catalog-li-last">
                  <Link
                    key={category._id}
                    onClick={() => {
                      setRefresh(!refresh);
                    }}
                    to={`/category/${category._id}`}
                  >
                    {category.titleKr}
                  </Link>
                </div>
              )
            )}

            {homeCategory.slice(4, 5).map((category) =>
              til ? (
                <div className="home-catalog-li-last">
                  <Link
                    key={category._id}
                    onClick={() => {
                      setRefresh(!refresh);
                    }}
                    to={`/portret/${category._id}`}
                  >
                    {category.titleUz}
                  </Link>
                </div>
              ) : (
                <div className="home-catalog-li-last">
                  <Link
                    key={category._id}
                    onClick={() => {
                      setRefresh(!refresh);
                    }}
                    to={`/portret/${category._id}`}
                  >
                    {category.titleKr}
                  </Link>
                </div>
              )
            )}
            {homeCategory.slice(5, 2021).map((category) =>
              til ? (
                <div className="home-catalog-li-last">
                  <Link
                    key={category._id}
                    onClick={() => {
                      setRefresh(!refresh);
                    }}
                    to={`/category/${category._id}`}
                  >
                    {category.titleUz}
                  </Link>
                </div>
              ) : (
                <div className="home-catalog-li-last">
                  <Link
                    key={category._id}
                    onClick={() => {
                      setRefresh(!refresh);
                    }}
                    to={`/category/${category._id}`}
                  >
                    {category.titleKr}
                  </Link>
                </div>
              )
            )}

            <div className="home-catalog-li-last">
              <Link to="/obuna"> {t("category_name_obuna")}</Link>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
