import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BlogCardItem from "./CardBlogItem/BlogCardItem";
import IndexContext from "../../../indexContect";
import indexhttp from "../../../config/indexConfig";
import "./BlogCard.css";

const BlogCard = (props) => {
  const [data, setData] = useState([]);
  const [blogAds, setBlogAds] = useState([]);
  const { blogNewsData, til } = useContext(IndexContext);
  const { t } = useTranslation();
  useEffect(() => {
    indexhttp
      .get(`/getLastNews/${blogNewsData.categoryId}`)
      .then((res) => setData(res.data.news));
    indexhttp.get("/getAllAds").then((res) => setBlogAds(res.data.allAds));
  }, []);
  return (
    <div className="BlogCardContainer">
      <div className="BlogCardWrapper">
        <div className="blogCardFirstTitle">
          <div className="changingText">{t("related_news")}</div>
        </div>
        <div className="blogCardWrap">
          <div className="blog-card-block">
            {data.slice(0, 3).map((data) => (
              <div className="blog-card-borderBlock">
                {til ? (
                  <BlogCardItem
                    id={data._id}
                    cardImage={data.mainPhoto}
                    cardTitle={data.title}
                    cardAuthor={data.journalistName}
                    cardTitle2={data.subTitle}
                  />
                ) : (
                  <BlogCardItem
                    id={data._id}
                    cardImage={data.mainPhoto}
                    cardTitle={data.titleKr}
                    cardAuthor={data.journalistNameKr}
                    cardTitle2={data.subTitleKr}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="blogDefaultImgWrap">
            {blogAds.slice(0, 1).map((data) => (
              <Link to={data.adsLink} key={data._id}>
                <div className="blogDefaultImgContainer">
                  <img
                    className="blogDefaultImg"
                    src={data.adsPhoto}
                    alt="Blog-Ads_img"
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

export default BlogCard;
