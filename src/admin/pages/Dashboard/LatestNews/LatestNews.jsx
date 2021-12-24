import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import indexConfig from "../../../../config/indexConfig";
const LatestNews = () => {
  const [latestNewsData, setLatestNewsData] = useState([]);
  useEffect(() => {
    indexConfig
      .get("/getLastNews")
      .then((res) => setLatestNewsData(res.data.lastNews));

    return () => {
      setLatestNewsData([]);
    };
  }, []);
  return (
    <>
      <div className="col-md-12 latest-news-wrapper">
        <div className="latest-header">
          <h3>So'ngi yangiliklar</h3>
          <Link to="/" className="btn">
            <img src="assets/dashboard/share-icon.png" alt="" />
          </Link>
        </div>
        {latestNewsData.slice(0, 3).map((data, index) => (
          <div key={index} className="news-wrapper row">
            <div className="col-md-2 latest-img">
              <img src={data.mainPhoto} alt="" />
            </div>
            <div className="col-md-10 latest-text">
              <h5>{data.subTitle.replace(/"([^"]+(?="))"/g, "$1")}</h5>
              <p className="text-wrapped">
                {data.paragraphUz.replace(/"([^"]+(?="))"/g, "$1")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestNews;
