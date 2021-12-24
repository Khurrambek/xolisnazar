import React, { useContext, useState, useEffect } from "react";
import "./section-navbar.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillGridFill, BsList } from "react-icons/bs";
import Context from "../Context";
import SearchBox from "../../../components/SearchBox/SearchBox";
import indexhttp from "../../../../config/indexConfig";
import { NavLink } from "react-router-dom";
import AdminContext from "../../../AdminContext";

const SectionNavbar = () => {
  const { viewListHandler, viewGridHandler, activeList } = useContext(Context);
  const { setSectionId } = useContext(AdminContext);
  const [category, setCategory] = useState([]);
  // const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    indexhttp
      .get("/getAllCategories")
      .then((res) => setCategory(res.data.allCategories));
    return () => {
      setCategory([]);
    };
  }, []);

  const selectChangeHandler = (event) => {
    setSectionId(event.target.value);
  };

  return (
    <div className="section-navbar-wrapper">
      <div className="section-navbar-list">
        <form className="section-navbar-item-left">
          <select
            onChange={selectChangeHandler}
            className="form-select select-style"
          >
            <option selected value="Kategoriya">
              Kategoriyalar
            </option>
            {category.map((category) => (
              <option value={category["_id"]}>{category.titleUz}</option>
            ))}
          </select>
        </form>
        <div className="section-navbar-item-right">
          <NavLink
            to="/admin/addsection"
            className="btn item-right-btn"
            activeClassName={"active"}
          >
            <AiOutlinePlusCircle /> Add
          </NavLink>

          <button
            className={`${activeList ? "" : "active-list"} btn item-right-btn `}
            onClick={viewGridHandler}
          >
            {" "}
            <BsFillGridFill />
          </button>
          <button
            className={`${activeList ? "active-list" : ""} btn item-right-btn`}
            onClick={viewListHandler}
          >
            {" "}
            <BsList />
          </button>
        </div>
      </div>
      <SearchBox />
    </div>
  );
};

export default SectionNavbar;
