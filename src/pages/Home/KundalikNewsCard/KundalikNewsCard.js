import React from "react";
import { Link } from "react-router-dom";
import "./KundalikNewsCard.css";

const Hero = (props) => {
  return (
    <>
      <Link to={`/blog/${props.id}?id=${props.id}`} className="kun-new-card">
        <div className="kun-new-card-1">
          <h6 className="changingText kun-new-card-h6">{props.categoryName}</h6>
          <div className="kun-new-card-img-wrapper">
            <img src={props.img} alt="img" />
          </div>
        </div>
        <div className="kun-new-card-1 kun-new-card-2">
          <h3 className="changingText">{props.title}</h3>
          <p className="changingText">
            {props.author} - {props.date}
          </p>
          <span className="changingText">
            {props.subTitle.slice(0, 75)} ...
          </span>
        </div>
      </Link>
    </>
  );
};

export default Hero;
