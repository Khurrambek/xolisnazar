import React, { useState, useEffect, useMemo } from "react";
import MagazineCard from "./MagazineCard/MagazineCard";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import indexhttp from "../../config/indexConfig";
import MagazineBackground from "./assets/magazine01.jpg";
import JournalsBackground from "./assets/kop_soraladigan_savollar.jpg";
import Pagination from "../../components/Pagination/CategoryPagination";
import { useLoading, ThreeDots } from "@agney/react-loading";
import "./Magazine.css";
let PageSize = 12;
function Magazine(props) {
  const [isLoading, setIsloading] = useState(false);
  const [magazineData, setMagazineData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [title, setTitle] = useState("");

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return magazineData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, magazineData]);

  const { t } = useTranslation();

  useEffect(() => {
    indexhttp
      .get(`/${props.match.params.id}`)
      .then((res) => setMagazineData(res.data.newsPapers))
      .then(() => setIsloading(true));
  }, [isLoading]);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="70" color="#05AF7E" />,
  });

  return (
    <>
      {isLoading ? (
        <>
          <Navbar />
          <div className="magazine-full-container">
            <div className="magazine-wrapper">
              {props.match.params.id === "getJournals" ? (
                <div
                  className="magazine-backgroun-image"
                  style={{
                    backgroundImage: `url(${MagazineBackground})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* <p className="changingText magazine-title">
                    {t("magazine_title1")}
                  </p> */}
                </div>
              ) : (
                <div
                  className="magazine-backgroun-image"
                  style={{
                    backgroundImage: `url(${JournalsBackground})`,
                  }}
                >
                  <p className="changingText magazine-title">
                    {t("magazine_title2")}
                  </p>
                </div>
              )}
              <div className="magazine-card-wrapper">
                {currentTableData.map((data) => (
                  <div className="magazine-card" key={data.id}>
                    <MagazineCard
                      cardImage={data.image}
                      cardTitle={data.newspaperTitle}
                      type={data.type}
                      id={data._id}
                      data={data}
                    />
                  </div>
                ))}
              </div>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={magazineData.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div
          {...containerProps}
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#eee",
          }}
        >
          <div
            style={{ width: "100px", height: "120px", paddingBottom: "2rem" }}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src="/assets/loading/LogoLoading.png"
              alt=""
            />
          </div>
          {indicatorEl}
        </div>
      )}
    </>
  );
}

export default Magazine;
