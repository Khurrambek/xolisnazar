import React, { useEffect, useState, useContext } from "react";
import { useLoading, ThreeDots } from "@agney/react-loading";
import BackgroundImage from "./BackgroundImage/BackgroundImage";
import CardSectionCategory from "./CardSectionCategory/CardSectionCategory";
import RelatedNewsCard from "./RelatedNewsCard/RelatedNewsCard";
import CategoryFourthCard from "./CategoryFourthCard/CategoryFourthCard";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer";

import IndexContext from "../../indexContect";
import indexhttp from "../../config/indexConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Category.css";

const Category = (props) => {
  const [loading, setLoading] = useState(false);
  const { setCategoryNewsData, refresh } =
    useContext(IndexContext);

  useEffect(() => {
    indexhttp
      .get(`/getCategoryNews/${props.match.params.id}`)
      .then((res) => setCategoryNewsData(res.data.news))
      .then(() => setLoading(true));
  }, [refresh]);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="70" color="#05AF7E" />,
  });

  return (
    <>
      {setCategoryNewsData.length ? (
        <>
          <Navbar />
          <div className="container-fluit page-category">
            <BackgroundImage />
            <CardSectionCategory />
            <RelatedNewsCard />
            <CategoryFourthCard />
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

export default Category;
