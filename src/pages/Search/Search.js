import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar/Navbar";
import { AiOutlineSearch } from "react-icons/all";
import indexhttp from "../../config/indexConfig";

import "./Search.css";
import Footer from "../../components/Footer/Footer";

const Search = () => {
  const [allNewsData, setAllNewsData] = useState([]);
  let { id } = useParams();
  const [searchTerm, setSearchTerm] = useState(id);
  const { t } = useTranslation();
 
  useEffect(() => {
    try {
      indexhttp.get("/getAllNews").then((res) => {
        setAllNewsData(res.data.allNews);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="search-full-container">
        <div className="search-wrapper">
          <div className="search_page_search_wrapper">
            <AiOutlineSearch className="search_page_icon" />
            <input
              className="search_page_input"
              type="text"
              placeholder={t("search_input")}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              value={searchTerm}
            />
          </div>
          {allNewsData
            .filter((val, index) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.paragraphUz.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .slice(0, 15)
            .map((val, index) => {
              return (
                <>
                  {!val.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) &&
                    console.log("kjdfkjsdk")}
                  <div className="search_result_container" key={index}>
                    <Link
                      to={`/blog/${val._id}?id=${val._id}`}
                      className="search_result_item"
                    >
                      <div className="search_page_img_wrapper">
                        <img
                          className="search_page_card_img"
                          src={val.mainPhoto}
                          alt="img"
                        />
                      </div>
                      <div className="search_text_wrapper">
                        <h1 className="search_text_title">
                          {val.title.length > 130
                            ? val.title.slice(0, 130) + "..."
                            : val.title}
                        </h1>
                        <h3 className="search_text_subTitle">
                          {val.subTitle.length > 200
                            ? val.subTitle.slice(0, 200) + "..."
                            : val.subTitle}
                        </h3>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
