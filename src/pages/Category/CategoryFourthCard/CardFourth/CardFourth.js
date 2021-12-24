import React from "react";
import { Link } from "react-router-dom";
import "./CardFourth.css";

const CardFourth = (props) => {
  return (
    <Link to={`/blog/${props.id}?id=${props.id}`} className="fourtCardWrapContainer">
      <div className="fourtCardImgWrapper">
        <img className="fourtCardImg" src={props.cardFourthImage} alt="img" />
      </div>
      <div className="card-fourt-titles">
        <h1 className="changingText">{props.cardFourthTitle}</h1>
        <h6 className="card-fourth-author changingText">
          {props.cardFourthAuthor}
        </h6>
        <h3 className="changingText">{props.cardFourthTitle2}</h3>
      </div>
    </Link>
  );
};

export default CardFourth;
