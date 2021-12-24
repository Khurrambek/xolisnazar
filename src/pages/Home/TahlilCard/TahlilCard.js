import React from "react";
import { FiEye } from "react-icons/all";
import { Link } from "react-router-dom";
import "./TahlilCard.css";

const TahlilCard = (props) => {
  return (
    <>
      <Link to={`/blog/${props.id}?id=${props.id}`} className="tahlilCard">
        <div className="tahlilCardImg">
          <img src={props.img} alt="img" />
        </div>
        <div className="tahlilCard-text">
          <h4 className="changingText">{props.title}</h4>
          <p className="changingText">
            {props.author} - {props.date}
          </p>
          <h5 className="changingText">{props.subTitle.slice(0, 120)} ...</h5>
        </div>
      </Link>
    </>
  );
};

export default TahlilCard;
