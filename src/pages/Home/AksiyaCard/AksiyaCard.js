import React from "react";
import { Link } from "react-router-dom";
import "./AksiyaCard.css";

const AksiyaCard = (props) => {
  return (
    <>
      {/* className="home-aksiya-card-video" */}
      <div className="AksiyaCard ">
        <div
          dangerouslySetInnerHTML={{ __html: props.iframe }}
          className="aksiya-card-wrapper home-aksiya-card-video "
        ></div>
        <div className="aksiyaCardBody">
          <h3 className="changingText">{props.title}</h3>
          <p className="changingText">
            {props.author} - {props.date}
          </p>
        </div>
      </div>
    </>
  );
};

export default AksiyaCard;
