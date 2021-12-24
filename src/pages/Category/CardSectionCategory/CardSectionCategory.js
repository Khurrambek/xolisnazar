import React, { useState, useEffect, useMemo, useContext } from "react";
import CategoryCard from "./CategoryCard/CategoryCard";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import IndexContext from "../../../indexContect";
import indexhttp from "../../../config/indexConfig";
import CategoryPagination from "../../../components/Pagination/CategoryPagination";
import "./CardSectionCategory.css";

let PageSize = 9;
const CardSectionCategory = () => {
  const { categoryNewsData, til } = useContext(IndexContext);
  const [categoryAds, setCategoryAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  useEffect(() => {
    indexhttp
      .get(`/getCategoryAds/${id}`)
      .then((res) => setCategoryAds(res.data.ads));
  }, []);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return categoryNewsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, categoryNewsData]);

  const { t } = useTranslation();
  return (
    <div className="categoryCardSection">
      <div className="categoryCard1800">
        {/* <h1 className="categoryCardLatest changingText">
          {t("category_latest")}
        </h1> */}
        <div className="categoryCardSectionInner">
          <div className="categoryCardDiv">
            {currentTableData.map((cardNews) => (
              <div className="categoryCardWrap">
                {til ? (
                  <CategoryCard
                    id={cardNews._id}
                    cardImage={cardNews.mainPhoto}
                    cardTitle1={cardNews.title}
                    cardTitle2={cardNews.subTitle}
                    cardAuthor={cardNews.journalistName}
                  />
                ) : (
                  <CategoryCard
                    id={cardNews._id}
                    cardImage={cardNews.mainPhoto}
                    cardTitle1={cardNews.titleKr}
                    cardTitle2={cardNews.subTitleKr}
                    cardAuthor={cardNews.journalistNameKr}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="category-card-imageDiv">
            {categoryAds.slice(0, 1).map((data) => (
              <Link key={data._id} to={data.adsLink}>
                <div className="category_ad_wrapper">
                  <img
                    className="categoryCardSample"
                    src={data.adsPhoto}
                    alt="img"
                  />
                </div>
              </Link>
            ))}
            {categoryAds.slice(1, 2).map((data) => (
              <Link key={data._id} to={data.adsLink}>
                <div className="category_ad_wrapper">
                  <img
                    className="categoryCardSample"
                    src={data.adsPhoto}
                    alt="img"
                  />
                </div>
              </Link>
            ))}
            {categoryAds.slice(2, 3).map((data) => (
              <Link key={data._id} to={data.adsLink}>
                <div className="category_ad_wrapper">
                  <img
                    className="categoryCardSample"
                    src={data.adsPhoto}
                    alt="img"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <CategoryPagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={categoryNewsData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default CardSectionCategory;
