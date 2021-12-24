import React, { useState } from "react";
import CatRelatedCard from "./CatRaletedSingleCard/CatRelatedCard";

import { useContext } from "react";
import { useTranslation } from "react-i18next";
import IndexContext from "../../../indexContect";
import "./RelatedNewsCard.css";

const RelatedNewsCard = () => {
  const [cardCount, setCardCount] = useState(5);

  const { categoryNewsData, til } = useContext(IndexContext);

  const { t } = useTranslation();
  const changeCount = () => {
    setCardCount(10);
    const btnName = document.getElementsByClassName("categoryCardBtn");
    const btnDiv = document.getElementsByClassName("categoryCardBtnDiv");
    btnName[0].style.display = "none";
    btnDiv[0].style.margin = "50px";
  };
  return (
    <div className="RelatedNewsCardContainer">
      <div className="RelatedNewsCardWrapper">
        <h1 className="RelatedNewsCardContainerHeader changingText">
          {t("related_news")}
        </h1>
        <div className="RelatedNewsCardDiv">
          {categoryNewsData
            .slice(0, cardCount)
            .map((categoryNews) =>
              til ? (
                <CatRelatedCard
                  id={categoryNews._id}
                  cardImg={categoryNews.mainPhoto}
                  cardHeading={categoryNews.title}
                  cardTitle={categoryNews.subTitle}
                  cardAuthor={categoryNews.journalistName}
                />
              ) : (
                <CatRelatedCard
                  id={categoryNews._id}
                  cardImg={categoryNews.mainPhoto}
                  cardHeading={categoryNews.titleKr}
                  cardTitle={categoryNews.subTitleKr}
                  cardAuthor={categoryNews.journalistNameKr}
                />
              )
            )}
          <div className="categoryCardBtnDiv">
            <button
              onClick={changeCount}
              type="submit"
              className="categoryCardBtn changingText"
              type="button"
            >
              {t("category_button_read-more")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedNewsCard;
