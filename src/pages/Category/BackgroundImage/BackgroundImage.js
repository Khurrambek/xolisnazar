import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import indexhttp from "../../../config/indexConfig";
import IndexContext from "../../../indexContect";
import "./BackgroundImage.css";

const BackgroundImage = (props) => {
  const { til } = useContext(IndexContext);
  const [category, setCategory] = useState([]);
  let params = useParams();

  useEffect(() => {
    indexhttp
      .get(`/getCategory/${params.id}`)
      .then((res) => setCategory(res.data.category));
  }, []);
  return (
    <div className="container_background_image">
      <div className="category-heading">
        <div
          className="background_image_section"
          style={{ backgroundImage: `url(${category.categoryImage})` }}
        >
          <div className="category_kundalik changingText">
            {til ? category.titleUz : category.titleKr}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
