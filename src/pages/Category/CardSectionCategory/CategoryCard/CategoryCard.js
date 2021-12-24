import React from "react";
import { Link } from "react-router-dom";

import "./CategoryCard.css";

const CategoryCard = (props) => {
  return (
    <Link to={`/blog/${props.id}?id=${props.id}`} className="category-card-border1">
      <div className="categoryCardContainer">
        <div className="categoryCardImage-wrap ">
          <img className="categoryCardImg" src={props.cardImage} alt="" />
        </div>
        <div className="categoryCardTitleDiv">
          <h1 className="categoryCardTitle changingText">{props.cardTitle1}</h1>
          <h3 className="categoryCardTitle2 changingText">
            {props.cardTitle2}
          </h3>
          <h6 className="categoryCardAuthor changingText">
             {props.cardAuthor}
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
