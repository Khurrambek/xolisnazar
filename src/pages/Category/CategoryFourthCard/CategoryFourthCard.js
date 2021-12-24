import React, { useEffect, useState, useContext } from "react";
// import CategoryCard from "../CardSectionCategory/CategoryCard/CategoryCard";
import CardFourth from "./CardFourth/CardFourth";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import indexhttp from "../../../config/indexConfig";
import "./CategoryFourthCard.css";
import IndexContext from "../../../indexContect";

const CategoryFourthCard = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [categoryAds, setCategoryAds] = useState([]);
  const { til } = useContext(IndexContext);
  useEffect(() => {
    indexhttp.get("/getLastNews").then((res) => setData(res.data.lastNews));
    indexhttp
      .get(`/getCategoryAds/${id}`)
      .then((res) => setCategoryAds(res.data.ads));
  }, []);
  const { t } = useTranslation();

  return (
    <div className="CategoryFourthCardContainer">
      <div className="CategoryFourtCardWrapper">
        <div className="categoryCardFirstTitle">
          <div className="changingText">{t("category_latest_news")}</div>
        </div>
        <div className="categoryFourthCardWrap">
          <div className="category-card-block">
            {data.slice(0, 3).map((data) => (
              <div className="category-card-borderBlock">
                {til ? (
                  <CardFourth
                    id={data._id}
                    cardFourthImage={data.mainPhoto}
                    cardFourthTitle={data.title}
                    cardFourthAuthor={data.journalistName}
                    cardFourthViews={data.views}
                    cardFourthTitle2={data.subTitle}
                  />
                ) : (
                  <CardFourth
                    id={data._id}
                    cardFourthImage={data.mainPhoto}
                    cardFourthTitle={data.titleKr}
                    cardFourthAuthor={data.journalistNameKr}
                    cardFourthViews={data.views}
                    cardFourthTitle2={data.subTitleKr}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="categoryDefaultImgWrap">
            {categoryAds.slice(3, 4).map((data) => (
              <Link to={data.adsLink} key={data._id}>
                <div className="categoryImgDiv">
                  <img
                    className="categoryDefaultImg"
                    src={data.adsPhoto}
                    alt=""
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFourthCard;
