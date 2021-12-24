import React from "react";
import { Link } from "react-router-dom";
import "./BlogCardItem.css";

const BlogCardItem = (props) => {
  return (
    <Link to={`/blog/${props.id}?id=${props.id}`} className="BlogfourtCardWrapContainer">
      <div className="BlogfourtCardImgWrapper">
        <img className="BlogfourtCardImg" src={props.cardImage} alt="blog img" />
      </div>
      <div className="blog-card-fourt-titles">
        <h1 className="changingText">{props.cardTitle}</h1>
        <h6 className="blog-card-fourth-author changingText">
         {props.cardAuthor}
        </h6>
        <h3 className="changingText">{props.cardTitle2}</h3>
      </div>
    </Link>
  );
};

export default BlogCardItem;
