import React from "react";
import { Link } from "react-router-dom";
import "./PortretCard.css";

const PortretCard = (props) => {
  return (
    <>
      <Link to={`/blog/${props.id}?id=${props.id}`} className="portretCard">
        <h3 className="changingText">{props.title}</h3>
        <p className="changingText">
          {props.author} - {props.date}
        </p>
        <h5 className="changingText">{props.text}</h5>
      </Link>
    </>
  );
};

export default PortretCard;
