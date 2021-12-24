import React from "react";
import { Link } from "react-router-dom";
import "./DunyoCard.css";

const DunyoCard = (props) => {
  return (
    <>
      <Link to={`/blog/${props.id}?id=${props.id}`} className="dunyo-new-card">
        <h6 className="changingText dunyo-1-h6">{props.heading}</h6>
        <div className="dunyo-new-card-1">
          <div className="dunyo-new-card-img-wrapper">
            <img src={props.img} alt="img" />
          </div>
        </div>
        <div className="dunyo-new-card-1 dunyo-new-card-2">
          <h3 className="changingText">{props.title}</h3>
          <p className="changingText">
            {props.author} - {props.date}
          </p>
          <span className="changingText">
            {props.description.slice(0, 95)} ...
          </span>
        </div>
      </Link>
    </>
  );
};

export default DunyoCard;
