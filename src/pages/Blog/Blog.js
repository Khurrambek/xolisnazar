import React, { useState } from "react";
import { useLoading, ThreeDots } from "@agney/react-loading";
import BlogImageDivContainer from "./BlogImageDivContainer/BlogImageDivContainer";
import BlogTextPart from "./BlogTextPart/BlogTextPart";
import BlogCard from "./BlogCard/BlogCard";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer";

import { useEffect } from "react";
import { useContext } from "react";
import IndexContext from "../../indexContect";
import indexConfig from "../../config/indexConfig";
import "./Blog.css";

const Blog = (props) => {
  const [isLoading, setIsloading] = useState(false);

  const { setBlogNewsData, blogNewsData, refresh } = useContext(IndexContext);
  useEffect(() => {
    indexConfig
      .get(`/getNews/${props.match.params.id}`)
      .then((res) => setBlogNewsData(res.data.news))
      .then(() => setIsloading(true));
  }, [refresh]);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="70" color="#05AF7E" />,
  });

 

  return (
    <>
      {isLoading ? (
        <>
          <Navbar />
          <div className="container-fluit">
            <BlogImageDivContainer />
            <BlogTextPart />
            <BlogCard />
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

export default Blog;
