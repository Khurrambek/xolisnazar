import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoading, ThreeDots } from "@agney/react-loading";
/*-------------- Cards ---------------*/
import KundalikNewsCard from "./KundalikNewsCard/KundalikNewsCard";
import TahlilCard from "./TahlilCard/TahlilCard";
import PortretCard from "./PortretCard/PortretCard";
import AksiyaCard from "./AksiyaCard/AksiyaCard";
import DunyoCard from "./DunyoCard/DunyoCard";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer";
/*--------------- Bottom sec images -------------------*/
// import bottomMagazine from "./assets/magazine1.png";

import indexhttp from "../../config/indexConfig";
import IndexContext from "../../indexContect";
import { useTranslation } from "react-i18next";
// icons
import "./Home.css";

const Home = () => {
  const [adsDataHome, setAdsDataHome] = useState([]);
  useEffect(() => {
    indexhttp
      .get("/getAds/homepage")
      .then((res) => setAdsDataHome(res.data.allAds));
  }, []);

  const { setRefresh, refresh, setLatestNewsData, latestNewsData, til } =
    useContext(IndexContext);
  const [isLoading, setIsloading] = useState(true);
  const [homeCategory, setHomeCategory] = useState([]);
  const [categoryNewsOne, setCategoryNewsOne] = useState([]);
  const [categoryNewsTwo, setCategoryNewsTwo] = useState([]);
  const [categoryNewsThree, setCategoryNewsThree] = useState([]);
  const [categoryNewsFour, setCategoryNewsFour] = useState([]);
  const [portret, setPortret] = useState([]);
  const [categoryNewsSix, setCategoryNewsSix] = useState([]);
  const [categoryId, setcategoryId] = useState([]);
  const { t } = useTranslation();

  // get api ------ get api
  const iframeTagHome = document.getElementsByTagName("iframe");
  if (iframeTagHome.length) {
    for (let i = 0; i < iframeTagHome.length; i++) {
      iframeTagHome[i].style.width = "100%";
      iframeTagHome[i].style.height = "100%";
    }
  }
  useEffect(async () => {
    await indexhttp.get("/getLastNews").then((res) => {
      setLatestNewsData(res.data.lastNews);
    });
    await indexhttp
      .get("/getAllCategories")
      .then((res) => {
        setHomeCategory(res.data.allCategories);
        setcategoryId(res.data.allCategories.map((data) => data._id));
      })
      .then(() => setIsloading(false));
    await indexhttp
      .get(`/getAllPortret`)
      .then((res) => setPortret(res.data.data))
      .then(() => setIsloading(false));

    let [
      categoryOne,
      categoryTwo,
      categoryThree,
      categoryFour,
      categorFive,
      categorySix,
    ] = categoryId;
    await indexhttp
      .get(`/getLastNews/${categoryOne}`)
      .then((res) => setCategoryNewsOne(res.data.news))
      .then(() => setIsloading(false));
    await indexhttp
      .get(`/getLastNews/${categoryTwo}`)
      .then((res) => setCategoryNewsTwo(res.data.news))
      .then(() => setIsloading(false));
    await indexhttp
      .get(`/getLastNews/${categoryThree}`)
      .then((res) => setCategoryNewsThree(res.data.news))
      .then(() => setIsloading(false));
    await indexhttp
      .get(`/getLastNews/${categoryFour}`)
      .then((res) => setCategoryNewsFour(res.data.news))
      .then(() => setIsloading(false));
    await indexhttp
      .get(`/getLastNews/${categorySix}`)
      .then((res) => setCategoryNewsSix(res.data.news))
      .then(() => setIsloading(false));
  }, [isLoading, iframeTagHome]);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="70" color="#05AF7E" />,
  });

  return (
    <>
      {categoryNewsThree.length ? (
        <>
          {" "}
          <Navbar />
          <div className="home-container">
            <div className="home-kundalik">
              <div className="kundalik-container">
                {/* ---------- Ad --------- */}
                {adsDataHome.slice(0, 1).map((data) => (
                  <div className="kundalik-right-950px">
                    <img src={data.adsPhoto} alt="Ad" />
                  </div>
                ))}
                <div className="home-kundalik-wrapper">
                  <div className="kundalik-left">
                    <div style={{ height: "100%" }}>
                      <div className="kundalik-left-top">
                        <p className="changingText">{}</p>
                        {latestNewsData.slice(0, 1).map((data) =>
                          til ? (
                            <Link
                              onClick={() => setRefresh(!refresh)}
                              to={`/blog/${data._id}?id=${data._id}`}
                              className="kundalik-left-top-wrapper"
                            >
                              <div className="kundalik-left-top-img-wrapper">
                                <img src={data.mainPhoto} alt="img" />
                              </div>
                              <div className="kundalik-left-top-body">
                                <h2 className="changingText">{data.title}</h2>
                                <div className="kundalik-left-top-body-info">
                                  <p className="changingText">
                                    {data.journalistName}
                                  </p>
                                  <h3 className="changingText">
                                    {data.subTitle.slice(0, 185)}...
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <Link
                              onClick={() => setRefresh(!refresh)}
                              to={`/blog/${data._id}?id=${data._id}`}
                              className="kundalik-left-top-wrapper"
                            >
                              <div className="kundalik-left-top-img-wrapper">
                                <img src={data.mainPhoto} alt="img" />
                              </div>
                              <div className="kundalik-left-top-body">
                                <h2 className="changingText">{data.titleKr}</h2>
                                <div className="kundalik-left-top-body-info">
                                  <p className="changingText">
                                    {data.journalistNameKr}
                                  </p>
                                  <h3 className="changingText">
                                    {data.subTitleKr}
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          )
                        )}
                      </div>

                      <div className="home-kun-line"></div>
                      <div className="kundalik-left-bottom">
                        <div className="kundalik-left-bottom-body">
                          <div className="kun-left-bottom-body-wraper-1">
                            <div className="kundalik-left-bottom-body-1">
                              {latestNewsData.slice(4, 5).map((data) =>
                                til ? (
                                  <Link
                                    className="kun-left-bottom-link"
                                    to={`/blog/${data._id}?id=${data._id}`}
                                  >
                                    <div className="kundalik-left-bottom-all kundalik-left-bottom-1 kundalik-left-bottom">
                                      <p className="changingText">
                                        {data.categoryName}
                                      </p>
                                      <div className="kundalik-left-bottom-all-imgDiv">
                                        <img src={data.mainPhoto} alt="img" />
                                      </div>
                                      <h4 className="changingText">
                                        {data.title}
                                      </h4>
                                    </div>
                                  </Link>
                                ) : (
                                  <Link
                                    className="kun-left-bottom-link"
                                    to={`/blog/${data._id}?id=${data._id}`}
                                  >
                                    <div className="kundalik-left-bottom-all kundalik-left-bottom-1 kundalik-left-bottom">
                                      <p className="changingText">
                                        {data.categoryNameKr}
                                      </p>
                                      <div className="kundalik-left-bottom-all-imgDiv">
                                        <img src={data.mainPhoto} alt="img" />
                                      </div>
                                      <h4 className="changingText">
                                        {data.titleKr}
                                      </h4>
                                    </div>
                                  </Link>
                                )
                              )}
                            </div>

                            <div className="kundalik-left-bottom-body-1">
                              {latestNewsData.slice(6, 7).map((data) =>
                                til ? (
                                  <Link
                                    className="kun-left-bottom-link"
                                    to={`/blog/${data._id}?id=${data._id}`}
                                  >
                                    <div className="kundalik-left-bottom-all kundalik-left-bottom-1">
                                      <p className="changingText">
                                        {data.categoryName}
                                      </p>
                                      <div className="kundalik-left-bottom-all-imgDiv">
                                        <img src={data.mainPhoto} alt="img" />
                                      </div>
                                      <h4 className="changingText">
                                        {data.title}
                                      </h4>
                                    </div>
                                  </Link>
                                ) : (
                                  <Link
                                    className="kun-left-bottom-link"
                                    to={`/blog/${data._id}?id=${data._id}`}
                                  >
                                    <div className="kundalik-left-bottom-all kundalik-left-bottom-1">
                                      <p className="changingText">
                                        {data.categoryNameKr}
                                      </p>
                                      <div className="kundalik-left-bottom-all-imgDiv">
                                        <img src={data.mainPhoto} alt="img" />
                                      </div>
                                      <h4 className="changingText">
                                        {data.titleKr}
                                      </h4>
                                    </div>
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                          <div className="kundalik-left-bottom-body-1 kundalik-left-bottom-body-3">
                            {latestNewsData.slice(7, 9).map((data) =>
                              til ? (
                                <Link
                                  className="kun-left-bottom-link kun-left-bottom-link-4"
                                  to={`/blog/${data._id}?id=${data._id}`}
                                >
                                  <div className="kundalik-left-bottom-all kundalik-left-bottom-3">
                                    <p className="changingText">
                                      {data.categoryName}
                                    </p>
                                    <div className="kundalik-left-bottom-all-imgDiv">
                                      <img src={data.mainPhoto} alt="img" />
                                    </div>
                                    <h4 className="changingText">
                                      {data.title}
                                    </h4>
                                  </div>
                                </Link>
                              ) : (
                                <Link
                                  className="kun-left-bottom-link kun-left-bottom-link-4"
                                  to={`/blog/${data._id}?id=${data._id}`}
                                >
                                  <div className="kundalik-left-bottom-all kundalik-left-bottom-3">
                                    <p className="changingText">
                                      {data.categoryNameKr}
                                    </p>
                                    <div className="kundalik-left-bottom-all-imgDiv">
                                      <img src={data.mainPhoto} alt="img" />
                                    </div>
                                    <h4 className="changingText">
                                      {data.titleKr}
                                    </h4>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="kundalik-mid">
                    <div className="kundalik-left-bottom-heading changingText">
                      {t("home-latest-eng-songillari")}
                    </div>
                    {latestNewsData
                      .slice(2, 5)
                      .map((data) =>
                        til ? (
                          <KundalikNewsCard
                            id={data._id}
                            key={data._id}
                            img={data.mainPhoto}
                            title={data.title}
                            author={data.journalistName}
                            date={data.publishTime}
                            views={data.views}
                            subTitle={data.subTitle}
                          />
                        ) : (
                          <KundalikNewsCard
                            id={data._id}
                            key={data._id}
                            img={data.mainPhoto}
                            title={data.titleKr}
                            author={data.journalistNameKr}
                            date={data.publishTime}
                            views={data.views}
                            subTitle={data.subTitleKr}
                          />
                        )
                      )}
                  </div>
                  {adsDataHome.slice(0, 1).map((data) => (
                    <div className="kundalik-right">
                      <img src={data.adsPhoto} alt="Ad" />
                    </div>
                  ))}
                </div>

                <div className="kundalik-left-bottom kundalik-left-bottom-mobile">
                  <div className="kundalik-left-bottom-heading changingText">
                    {t("home-latest-eng-songillari")}
                  </div>
                  <div className="kundalik-left-bottom-body">
                    <div className="kun-left-bottom-body-wraper-1 kun-left-bottom-body-wraper-1-mobile">
                      <div className="kundalik-left-bottom-body-1">
                        {latestNewsData.slice(4, 5).map((data) =>
                          til ? (
                            <Link
                              className="kun-left-bottom-link"
                              to={`/blog/${data._id}?id=${data._id}`}
                            >
                              <div className="kundalik-left-bottom-all kundalik-left-bottom-1 kundalik-left-bottom kundalik-left-bottom-all-mobile">
                                <div className="kundalik-left-bottom-all-imgDiv">
                                  <img src={data.mainPhoto} alt="img" />
                                </div>
                                <p className="changingText">
                                  {data.categoryName}
                                </p>
                                <h4 className="changingText">{data.title}</h4>
                              </div>
                            </Link>
                          ) : (
                            <Link
                              className="kun-left-bottom-link"
                              to={`/blog/${data._id}?id=${data._id}`}
                            >
                              <div className="kundalik-left-bottom-all kundalik-left-bottom-1 kundalik-left-bottom kundalik-left-bottom-all-mobile">
                                <div className="kundalik-left-bottom-all-imgDiv">
                                  <img src={data.mainPhoto} alt="img" />
                                </div>
                                <p className="changingText">
                                  {data.categoryNameKr}
                                </p>
                                <h4 className="changingText">{data.titleKr}</h4>
                              </div>
                            </Link>
                          )
                        )}
                      </div>

                      <div className="kundalik-left-bottom-body-1 kundalik-left-bottom-body-1-mobile">
                        {latestNewsData.slice(5, 6).map((data) =>
                          til ? (
                            <Link
                              className="kun-left-bottom-link"
                              to={`/blog/${data._id}?id=${data._id}`}
                            >
                              <div className="kundalik-left-bottom-all kundalik-left-bottom-1 kundalik-left-bottom-all-mobile">
                                <div className="kundalik-left-bottom-all-imgDiv">
                                  <img src={data.mainPhoto} alt="img" />
                                </div>
                                <p className="changingText">
                                  {data.categoryName}
                                </p>
                                <h4 className="changingText">{data.title}</h4>
                              </div>
                            </Link>
                          ) : (
                            <Link
                              className="kun-left-bottom-link"
                              to={`/blog/${data._id}?id=${data._id}`}
                            >
                              <div className="kundalik-left-bottom-all kundalik-left-bottom-1 kundalik-left-bottom-all-mobile">
                                <div className="kundalik-left-bottom-all-imgDiv">
                                  <img src={data.mainPhoto} alt="img" />
                                </div>
                                <p className="changingText">
                                  {data.categoryNameKr}
                                </p>
                                <h4 className="changingText">{data.titleKr}</h4>
                              </div>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                    <div className="kundalik-left-bottom-body-1 kundalik-left-bottom-body-3 kundalik-left-bottom-body-3-mobile">
                      {latestNewsData.slice(6, 8).map((data) =>
                        til ? (
                          <Link
                            className="kun-left-bottom-link kun-left-bottom-link-4 kun-left-bottom-link-4-mobile"
                            to={`/blog/${data._id}?id=${data._id}`}
                          >
                            <div className="kundalik-left-bottom-all kundalik-left-bottom-3 kundalik-left-bottom-all-mobile">
                              <div className="kundalik-left-bottom-all-imgDiv">
                                <img src={data.mainPhoto} alt="img" />
                              </div>
                              <p className="changingText">
                                {data.CategoryName}
                              </p>
                              <h4 className="changingText">{data.title}</h4>
                            </div>
                          </Link>
                        ) : (
                          <Link
                            className="kun-left-bottom-link kun-left-bottom-link-4 kun-left-bottom-link-4-mobile"
                            to={`/blog/${data._id}?id=${data._id}`}
                          >
                            <div className="kundalik-left-bottom-all kundalik-left-bottom-3 kundalik-left-bottom-all-mobile">
                              <div className="kundalik-left-bottom-all-imgDiv">
                                <img src={data.mainPhoto} alt="img" />
                              </div>
                              <p className="changingText">
                                {data.CategoryNameKr}
                              </p>
                              <h4 className="changingText">{data.titleKr}</h4>
                            </div>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="home-kundalik-see-all-btn">
                  {homeCategory.slice(0, 1).map((data) =>
                    til ? (
                      <>
                        <Link
                          to={`/category/${data._id}`}
                          className="changingText kundalik-btn-home-all"
                        >
                          {data.titleUz}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/category/${data._id}`}
                          className="changingText kundalik-btn-home-all"
                        >
                          {data.titleKr}
                        </Link>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="home-dunyo">
              <div className="home-dunyo-wrapper">
                <div className="home-dunyo-main">
                  {categoryNewsOne.slice(0, 3).map((data, index) =>
                    til ? (
                      <div
                        className={`home-dunyo-same home-dunyo-${index + 1}`}
                      >
                        <DunyoCard
                          id={data._id}
                          // heading={data.categoryName}
                          img={data.mainPhoto}
                          title={data.title}
                          author={data.journalistName}
                          date={data.publishTime}
                          views={data.views}
                          description={data.subTitle}
                        />
                      </div>
                    ) : (
                      <div
                        className={`home-dunyo-same home-dunyo-${index + 1}`}
                      >
                        <DunyoCard
                          id={data._id}
                          // heading={data.categoryNameKr}
                          img={data.mainPhoto}
                          title={data.titleKr}
                          author={data.journalistNameKr}
                          date={data.publishTime}
                          views={data.views}
                          description={data.subTitleKr}
                        />
                      </div>
                    )
                  )}
                </div>
                <div className="home-dunyo-btn">
                  {homeCategory.slice(1, 2).map((data) =>
                    til ? (
                      <>
                        <Link
                          to={`/category/${data._id}`}
                          className="changingText dunyo-btn-home-all"
                        >
                          {data.titleUz}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/category/${data._id}`}
                          className="changingText dunyo-btn-home-all"
                        >
                          {data.titleKr}
                        </Link>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="home-fikr">
              {categoryNewsTwo.slice(0, 1).map((data) =>
                til ? (
                  <div className="home-fikr-wrapper">
                    <div
                      className="home-fikr-img"
                      style={{ backgroundImage: `url(${data.mainPhoto})` }}
                    >
                      <Link to={`/blog/${data._id}?id=${data._id}`}>
                        <h2 className="home-fikr-img-h2 changingText">
                          {data.title}
                        </h2>
                      </Link>
                      <p className="changingText home-fikr-author">
                        {data.journalistName}
                      </p>
                    </div>
                    <div className="home-fikr-btn">
                      {homeCategory.slice(2, 3).map((data) => (
                        <>
                          <Link
                            to={`/category/${data._id}?id=${data._id}`}
                            className="changingText fikr-btn-home-all"
                          >
                            {data.titleUz}
                          </Link>
                        </>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="home-fikr-wrapper">
                    <div
                      className="home-fikr-img"
                      style={{ backgroundImage: `url(${data.mainPhoto})` }}
                    >
                      <Link to={`/blog/${data._id}`}>
                        <h2 className="home-fikr-img-h2 changingText">
                          {data.titleKr}
                        </h2>
                      </Link>
                      <p className="changingText home-fikr-author">
                        {data.journalistNameKr}
                      </p>
                    </div>
                    <div className="home-fikr-btn">
                      {homeCategory.slice(2, 3).map((data) => (
                        <>
                          <Link
                            to={`/category/${data._id}`}
                            className="changingText fikr-btn-home-all"
                          >
                            {data.titleKr}
                          </Link>
                        </>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="home-tahlil">
              <div className="home-tahlil-wrapper">
                <div className="home-tahlil-body">
                  <div className="home-tahlil-left">
                    {categoryNewsThree.slice(0, 1).map((data) =>
                      til ? (
                        <Link
                          to={`/blog/${data._id}?id=${data._id}`}
                          className="home-tahlil-left-wrapper"
                        >
                          <div className="home-tahlil-left-img-wrapper">
                            <img src={data.mainPhoto} alt="img" />
                          </div>
                          <h3 className="changingText">{data.title}</h3>
                          <p className="changingText">{data.journalistName}</p>
                          <h6 className="changingText">{data.subTitle}</h6>
                        </Link>
                      ) : (
                        <Link
                          to={`/blog/${data._id}?id=${data._id}`}
                          className="home-tahlil-left-wrapper"
                        >
                          <div className="home-tahlil-left-img-wrapper">
                            <img src={data.mainPhoto} alt="img" />
                          </div>
                          <h3 className="changingText">{data.titleKr}</h3>
                          <p className="changingText">
                            {data.journalistNameKr}
                          </p>
                          <h6 className="changingText">{data.subTitleKr}</h6>
                        </Link>
                      )
                    )}
                  </div>

                  <div className="home-tahlil-right">
                    {categoryNewsThree
                      .slice(1, 4)
                      .map((data) =>
                        til ? (
                          <TahlilCard
                            id={data._id}
                            img={data.mainPhoto}
                            title={data.title}
                            author={data.journalistName}
                            date={data.publishTime}
                            views={data.views}
                            subTitle={data.subTitle}
                          />
                        ) : (
                          <TahlilCard
                            id={data._id}
                            img={data.mainPhoto}
                            title={data.titleKr}
                            author={data.journalistNameKr}
                            date={data.publishTime}
                            views={data.views}
                            subTitle={data.subTitleKr}
                          />
                        )
                      )}
                  </div>
                </div>
                <div className="home-tahlil-btn">
                  {homeCategory.slice(3, 4).map((data) =>
                    til ? (
                      <>
                        <Link
                          to={`/category/${data._id}`}
                          className="changingText tahlil-btn-home-all"
                        >
                          {data.titleUz}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/category/${data._id}`}
                          className="changingText tahlil-btn-home-all"
                        >
                          {data.titleKr}
                        </Link>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="home-portret">
              <div className="home-portret-wrapper">
                <div className="home-portret-body">
                  <div className="home-portret-wrap1">
                    {categoryNewsFour.slice(0, 1).map((data) =>
                      til ? (
                        <div className="home-protret-wrap-inside-1 home-protret-wrap-inside-1-1">
                          <PortretCard
                            id={data._id}
                            title={data.title}
                            author={data.journalistName}
                            date={data.publishTime}
                            views={data.views}
                            text={data.subTitle}
                          />
                          <div className="home-portret-empty"></div>
                        </div>
                      ) : (
                        <div className="home-protret-wrap-inside-1 home-protret-wrap-inside-1-1">
                          <PortretCard
                            id={data._id}
                            title={data.titleKr}
                            author={data.journalistNameKr}
                            date={data.publishTime}
                            views={data.views}
                            text={data.subTitleKr}
                          />
                          <div className="home-portret-empty"></div>
                        </div>
                      )
                    )}
                    {categoryNewsFour.slice(1, 2).map((data) =>
                      til ? (
                        <div className="home-protret-wrap-inside-1 home-protret-wrap-inside-1-2">
                          <PortretCard
                            id={data._id}
                            title={data.title}
                            author={data.journalistName}
                            date={data.publishTime}
                            text={data.subTitle}
                          />
                          <div className="home-portret-empty"></div>
                        </div>
                      ) : (
                        <div className="home-protret-wrap-inside-1 home-protret-wrap-inside-1-2">
                          <PortretCard
                            id={data._id}
                            title={data.titleKr}
                            author={data.journalistNameKr}
                            date={data.publishTime}
                            text={data.subTitleKr}
                          />
                          <div className="home-portret-empty"></div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="home-portret-wrap1">
                    {categoryNewsFour.slice(2, 3).map((data) =>
                      til ? (
                        <div className="home-protret-wrap-inside-1 home-protret-wrap-inside-1-3">
                          <PortretCard
                            id={data._id}
                            title={data.title}
                            author={data.journalistName}
                            date={data.publishTime}
                            text={data.subTitle}
                          />
                          <div className="home-portret-empty"></div>
                        </div>
                      ) : (
                        <div className="home-protret-wrap-inside-1 home-protret-wrap-inside-1-3">
                          <PortretCard
                            id={data._id}
                            title={data.titleKr}
                            author={data.journalistNameKr}
                            date={data.publishTime}
                            text={data.subTitleKr}
                          />
                          <div className="home-portret-empty"></div>
                        </div>
                      )
                    )}
                    {categoryNewsFour.slice(3, 4).map((data) =>
                      til ? (
                        <div className="home-protret-wrap-inside-1 home-protret-wrap-inside-1-4">
                          <PortretCard
                            id={data._id}
                            title={data.title}
                            author={data.journalistName}
                            date={data.publishTime}
                            views={data.views}
                            text={data.subTitle}
                          />
                          <div className="home-portret-empty"></div>
                        </div>
                      ) : (
                        <div className="home-protret-wrap-inside-1 home-protret-wrap-inside-1-4">
                          <PortretCard
                            id={data._id}
                            title={data.titleKr}
                            author={data.journalistNameKr}
                            date={data.publishTime}
                            views={data.views}
                            text={data.subTitleKr}
                          />
                          <div className="home-portret-empty"></div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="home-portret-btn">
                  {homeCategory.slice(4, 5).map((data) =>
                    til ? (
                      <>
                        <Link
                          to={`/portret/${data._id}`}
                          className="changingText portret-btn-home-all"
                        >
                          {data.titleUz}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/portret/${data._id}`}
                          className="changingText portret-btn-home-all"
                        >
                          {data.titleKr}
                        </Link>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="home-aksiya">
              <div className="home-aksiya-wrapper">
                <div className="home-aksiya-body">
                  {/* className="home-aksiya-iframe changingText" */}
                  {portret.slice(0, 1).map((data) => (
                    <a href={data.youtubeLink} className="home-aksiya-left">
                      <div
                        dangerouslySetInnerHTML={{ __html: data.iframe }}
                        className="home-aksiya-video home-aksiya-iframe changingText"
                      ></div>
                      <h3 className="changingText">{data.titleUz}</h3>
                      <p className="changingText">{data.publishTime}</p>
                    </a>
                  ))}

                  <div className="home-aksiya-right">
                    {portret.slice(1, 4).map((data) => (
                      <a href={data.youtubeLink}>
                        <AksiyaCard
                          title={data.titleUz}
                          author="XolisNazar uz"
                          date={data.publishTime}
                          iframe={data.iframe}
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* <div className="home-aksiya-btn">
              {homeCategory.slice(5, 6).map((data) =>
                til ? (
                  <>
                    <Link to={`/category/${data._id}`} className="changingText">
                      {data.titleUz}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={`/category/${data._id}`} className="changingText">
                      {data.titleKr}
                    </Link>
                  </>
                )
              )}
            </div> */}
              </div>
            </div>

            {/* <div className="home-bottom">
          <div className="home-bottom-wrapper">
            <div className="home-bottom-top">
              <div className="home-bottom-card">
                {categoryNewsSix.slice(0, 3).map((data) =>
                  til ? (
                    <>
                      <BottomCard
                        img={data.mainPhoto}
                        title={data.title}
                        author={data.journalistName}
                        date={data.publishTime}
                      />
                      <div className="home-bottom-empty"></div>
                    </>
                  ) : (
                    <>
                      <BottomCard
                        img={data.mainPhoto}
                        title={data.titleKr}
                        author={data.journalistNameKr}
                        date={data.publishTime}
                      />
                      <div className="home-bottom-empty"></div>
                    </>
                  )
                )}
              </div>
              <div className="home-bottom-see-all-div">
                <h5 className="changingText">
                  {t("home_bottom_latest_magazine")}
                </h5>
                <a href="http://xolisnazar.uz/api/index/getNewspapers">
                  <p className="changingText">{t("home_body_see-all")}</p>
                </a>
              </div>
            </div>

            <div className="home-bottom-bottom">
              <div className="home-bottom-bottom-body">
                <div className="home-bottom-bottom-left">
                  <div className="home-bottom-bottom-text changingText">
                    {t("home_bottom_text-1")}
                  </div>
                  <div className="home-bottom-bottom-text changingText">
                    {t("home_bottom_text-2")}
                  </div>
                  <div className="home-bottom-bottom-empty"></div>
                  <div className="home-bottom-bottom-payment">
                    <h4 className="changingText">{t("home_bottom_payment")}</h4>
                    <div className="home-bottom-payment">
                      <Link to="/" className="home-payment-payme">
                        <img src={bottomPayMe} alt="img" />
                      </Link>
                      <Link to="/" className="home-payment-click">
                        <img src={bottomClick} alt="img" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
};

export default Home;
