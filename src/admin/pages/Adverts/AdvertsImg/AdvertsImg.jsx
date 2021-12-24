import React, { useContext, useMemo, useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import indexhttp from "../../../../config/indexConfig";
import adminhttp from "../../../../config/adminConfig";
import AdminContext from "../../../AdminContext";
import { Redirect } from "react-router";
import "./adverts-img.css";
import Pagination from "../../../../components/Pagination/CategoryPagination";

//token
const token = JSON.parse(localStorage.getItem("token"));
let PageSize = 8;

const AdvertsImg = () => {
  const { setGlobalEditAdvertId } = useContext(AdminContext);
  const [advertData, setAdvertData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return advertData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, advertData]);
  useEffect(() => {
    //get advert data from db
    indexhttp.get("/getAllAds").then((res) => setAdvertData(res.data.allAds));
  }, [refresh]);

  //delete ads
  const deleteAds = async (id) => {
    return await adminhttp
      .delete(`/deleteAds/${id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => setRefresh(!refresh));
  };

  //get edit id
  const editAdverts = (advert) => {
    setRedirect(!redirect);
    setGlobalEditAdvertId(advert);
  };

  //update ads
  if (redirect === true) {
    return <Redirect to="/admin/editadvert" />;
  }

  return (
    <>
      {currentTableData.map((advert) => (
        <div key={advert["_id"]} className="col-md-3 adverts-img">
          <h5 className="date fs-6">{advert.postedTime}</h5>
          <div className="advert-img-card">
            <img src={advert.adsPhoto} alt="" />
          </div>
          <div className="adverts-btn">
            <button
              onClick={() => editAdverts(advert)}
              className="btn btn-success btn-advert-custom"
            >
              <div className="btn-custom-icon">
                <AiOutlineEdit />
              </div>
              Edit
            </button>
            <button
              onClick={() => deleteAds(advert["_id"])}
              className="btn btn-danger btn-advert-custom"
            >
              <div className="btn-custom-icon">
                <AiOutlineDelete />
              </div>
              Delete
            </button>
          </div>
        </div>
      ))}

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={advertData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default AdvertsImg;
