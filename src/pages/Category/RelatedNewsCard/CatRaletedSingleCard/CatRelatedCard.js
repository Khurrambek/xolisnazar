import React from "react";
import { Link } from "react-router-dom";
import "./CatRelatedCard.css";

const CatRelatedCard = (props) => {
  return (
    <Link to={`/blog/${props.id}?id=${props.id}`} className="categorySecondCardContainer">
      <div className="category-secondCard-img-Div">
        <img className="category-secondCard-img" src={props.cardImg} alt="" />
      </div>
      <div className="category-second-card-titles">
        <h2 className="changingText">{props.cardHeading}</h2>
        <h3 className="changingText">{props.cardTitle}</h3>
        <h5 className="changingText">{props.cardAuthor}</h5>
      </div>
    </Link>
  );
};

export default CatRelatedCard;
