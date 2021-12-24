import React, { useContext, useEffect, useMemo, useState } from "react";
import Context from "../Context";
import "./section-card.css";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import adminhttp from "../../../../config/adminConfig";
import indexhttp from "../../../../config/indexConfig";
import AdminContext from "../../../AdminContext";
import Pagination from "../../../../components/Pagination/CategoryPagination";

const token = JSON.parse(localStorage.getItem("token"));

let PageSize = 5;
const SectionCard = () => {
  const { setGlobalCategorydata, sectionId } = useContext(AdminContext);
  const { activeList } = useContext(Context);
  const [newsData, setNewsData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return newsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, newsData]);

  const deleteNews = async (id) => {
    return await adminhttp
      .delete(`/deleteNews/${id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => setRefresh(!refresh));
  };
  const handleEdit = (news) => {
    setGlobalCategorydata(news);
    setRedirect(!redirect);
  };

  useEffect(() => {
    indexhttp
      .get(`/getCategoryNews/${sectionId}`)
      .then((res) => setNewsData(res.data.news));
  }, [refresh, sectionId]);

  if (redirect === true) {
    return <Redirect to="/admin/editsection" />;
  }
  return (
    <>
      {currentTableData.map((news) => (
        <div
          key={news["_id"]}
          className={`${
            activeList ? "" : "active-grid-view"
          } card-inner-wrapper`}
        >
          <div className="row card-inner">
            <div
              className={`${
                activeList ? "col-md-2" : "col-md-12"
              } inner-card-img`}
            >
              <img src={news.mainPhoto} alt="cahrt" />
            </div>
            <div
              className={`${
                activeList ? "col-md-8" : "col-md-12"
              } inner-card-text latest-text`}
            >
              <div className="inner-card-text-heading">
                <h5 className="mb-1">{news.title}</h5>
                <small>
                  by{" "}
                  <Link to="/admin/accounts" style={{ textDecoration: "none" }}>
                    {news.journalistName}
                  </Link>
                </small>
              </div>
              <p className="py-3 text-wrapped">{news.paragraphUz}</p>
            </div>
            <div
              className={`${
                activeList ? "col-md-2" : "col-md-12 inner-card-btn-grid"
              } inner-card-btns`}
            >
              <span className="views btn-custom btn-primary">
                <div className="btn-custom-icon">
                  <AiOutlineEye />
                </div>{" "}
                {news.views}
              </span>
              <button
                onClick={() => handleEdit(news)}
                className="btn edit-btn btn-success btn-custom"
              >
                <div className="btn-custom-icon">
                  {" "}
                  <AiOutlineEdit />
                </div>{" "}
                Edit
              </button>
              <button
                onClick={() => deleteNews(news["_id"])}
                className="btn delete-btn btn-danger btn-custom"
              >
                <div className="btn-custom-icon">
                  <AiOutlineDelete />
                </div>{" "}
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={newsData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default SectionCard;
