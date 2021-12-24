import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import { getwheatherData } from "../../../../components/Navbar/WheatherData/weatherapi";
import indexConfig from "../../../../config/indexConfig";
import "./footerDashboard.css";

const FooterDashboard = () => {
  const [wheatherdata, setWheatherData] = useState(null);
  const city = "Tashkent";
  const [loading, setLoading] = useState(false);
  const [adsData, setAdsData] = useState([]);

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

  useEffect(() => {
    getData();
    indexConfig.get("/getAllAds").then((res) => setAdsData(res.data.allAds));
    return () => {
      setAdsData([]);
    };
  }, []);
  let dateToday = Date.now();
  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
  `;

  return (
    <div className="row footer-wrapper">
      <div className="col-md-4 weather-wrapper-admin">
        <div className="weather-container">
          <div className="nav-top-left pr-3">
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
                        {new Date(dateToday).toString()}
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-8 advert-wrapper">
        <div className="advert-header">
          <h3>So'ngi Reklamar</h3>
          <Link to="/" className="btn">
            <img src="assets/dashboard/share-icon.png" alt="" />
          </Link>
        </div>
        <div className="row adverts">
          {adsData.slice(0, 6).map((data) => (
            <Link
              key={data._id}
              to={data.adsLink}
              className="col-md-2 adverts-img"
            >
              <img src={data.adsPhoto} alt="" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterDashboard;
