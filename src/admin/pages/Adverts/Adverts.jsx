import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import SearchBox from "../../components/SearchBox/SearchBox";
import "./advert.css";
import AdvertsImg from "./AdvertsImg/AdvertsImg";

const Adverts = () => {
  return (
    <>
      <section className="navbar-secondary">
        <select name="" id="" className="form-select advert-form-select">
          <option value="1">1-25</option>
          <option value="1">26-50</option>
          <option value="1">51-75</option>
          <option value="1">76-100</option>
        </select>
        <div className="right-btn">
          <Link to="/admin/addadvert" className="btn item-right-btn">
            {" "}
            <AiOutlinePlusCircle /> Add
          </Link>
        </div>
      </section>
      <section className="search-box">
        <SearchBox />
      </section>
      <section className="adverts-img-section">
        <div className="row wrap adverts-img-wrapper">
          <AdvertsImg />
        </div>
      </section>
    </>
  );
};

export default Adverts;
