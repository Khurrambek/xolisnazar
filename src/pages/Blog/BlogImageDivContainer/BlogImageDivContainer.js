import React, { useContext } from "react";
import IndexContext from "../../../indexContect";
import "./BlogImageDivContainer.css";

const BlogImageDivContainer = () => {
  const { til } = useContext(IndexContext);
  const { blogNewsData } = useContext(IndexContext);
  return (
    <div className="blog-image-container">
      {til ? (
        <div className="blog-text-div">
          <div className="blog-text-img-h1 changingText">
            {blogNewsData.title}
          </div>
          <div className="blog-text-img-h4 changingText">
            {blogNewsData.subTitle}
          </div>
        </div>
      ) : (
        <div className="blog-text-div">
          <div className="blog-text-img-h1 changingText">
            {blogNewsData.titleKr}
          </div>
          <div className="blog-text-img-h4 changingText">
            {blogNewsData.subTitleKr}
          </div>
        </div>
      )}

      <div className="blog-image-div-wrap">
      <img className="blog-image-div" src={blogNewsData.mainPhoto} alt="" />
      </div>
    </div>
  );
};

export default BlogImageDivContainer;
