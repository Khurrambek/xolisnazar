import React from "react";

const PortretCard = (props) => {
  const iframeArr = document.getElementsByTagName("iframe");

  for (let i = 0; i < iframeArr.length; i++) {
    const element = iframeArr[i];
    element.style.width = "100%";
    element.style.height = "100%";
  }
  return (
    <a href={props.link} className="portret_link">
      <div className="categorySecondCardContainer portret_card_unique">
        <div
          dangerouslySetInnerHTML={{ __html: props.iframe }}
          className="category-secondCard-img-Div"
        ></div>
        <div className="category-second-card-titles">
          <h2 className="changingText portret_title_unique" >
            {props.cardHeading}
          </h2>
          <h3 className="changingText portret_description">
            {props.description}
          </h3>
          <h3 className="changingText portret_big_title">{props.cardAuthor}</h3>
          <h3 className="changingtext">{props.cardPublishTime}</h3>
        </div>
      </div>
    </a>
  );
};

export default PortretCard;
