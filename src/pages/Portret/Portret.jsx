import React, { useContext, useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer/Footer";
import IndexContext from "../../indexContect.js";
import PortretCard from "./PortretCard/PortretCard";
import indexhttp from "../../config/indexConfig.js";
import CategoryPagination from "../../components/Pagination/CategoryPagination";
import { useParams } from "react-router";

import "./Portret.css";
let PageSize = 10;
const Portret = () => {
  const { til } = useContext(IndexContext);
  const [portretsAll, setPortretsAll] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let params = useParams();
  const getPortret = async () => {
    await indexhttp
      .get("/getAllPortret")
      .then((res) => setPortretsAll(res.data.data));
  };

  const getCategory = async () => {
    await indexhttp
      .get(`/getCategory/${params.id}`)
      .then((res) => setCategory(res.data.category));
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return portretsAll.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, portretsAll]);

  useEffect(() => {
    getPortret();
    getCategory();
  }, [currentTableData]);

  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <div className="container-fluit">
        {/* background */}
        <div className="portret_container_background_image">
          <div className="portret_category-heading">
            <div
              className="portret_background_image_section"
              style={{ backgroundImage: `url(${category.categoryImage})` }}
            >
              <div className="category_portret changingText">
                {til ? category.titleUz : category.titleKr}
              </div>
            </div>
          </div>
        </div>
        {/* background */}
        {/* card */}
        <div className="RelatedNewsCardContainer">
          <div className="RelatedNewsCardWrapper">
            {/* <h1 className="RelatedNewsCardContainerHeader changingText">
              {t("portret_title")}
            </h1> */}
            <div className="RelatedNewsCardDiv portret-padding">
              {currentTableData.map((data, index) =>
                til ? (
                  <PortretCard
                    key={index}
                    id={data._id}
                    iframe={data.iframe}
                    cardHeading={data.titleUz}
                    cardAuthor="XolisNazar.uz"
                    cardPublishTime={data.publishTime}
                    link={data.youtubeLink}
                    description={data.descriptionKr}
                  />
                ) : (
                  <PortretCard
                    key={index}
                    id={data._id}
                    iframe={data.iframe}
                    cardHeading={data.titleKr}
                    link={data.youtubeLink}
                    description={data.descriptionUz}
                  />
                )
              )}
            </div>
          </div>
        </div>
        {/* card */}
        <CategoryPagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={portretsAll.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Portret;
