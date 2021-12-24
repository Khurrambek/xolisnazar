import React, { useContext } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import AdminContext from "../../AdminContext";
import SearchBox from "../../components/SearchBox/SearchBox";
import NewsPaperPreview from "./NewsPaperPreview/NewsPaperPreview";

const Newspapers = () => {
  const { setGetNewspapers } = useContext(AdminContext);
  return (
    <>
      <section className="navbar-secondary">
        <select
          onChange={(e) => {
            setGetNewspapers(e.target.value);
          }}
          className="form-select advert-form-select"
        >
          {" "}
          <option value="Gazeta turini tanlang">Gazeta turini tanlang</option>
          <option value="getNewspapers">Gazetalar</option>
          <option value="getJournals">Journal</option>
        </select>
        <div className="right-btn">
          <Link to="/admin/addnewspaper" className="btn item-right-btn">
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
          <NewsPaperPreview />
        </div>
      </section>

      
    </>
  );
};

export default Newspapers;
