import React, { useContext, useEffect, useMemo, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Redirect } from "react-router";
import Pagination from "../../../../components/Pagination/CategoryPagination";
import adminConfig from "../../../../config/adminConfig";
import indexConfig from "../../../../config/indexConfig";
import AdminContext from "../../../AdminContext";
let PageSize = 8;

const NewsPaperPreview = () => {
  //Token
  let token = JSON.parse(localStorage.getItem("token"));

  const { setGlobalNewspaperData, getNewspapers } = useContext(AdminContext);
  const [newsPaperData, setNewsPaperData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return newsPaperData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, newsPaperData]);

  //* Get => get newspaper data from db
  useEffect(() => {
    indexConfig.get(`/${getNewspapers}`).then((res) => {
      setNewsPaperData(res.data.newsPapers);
    });
  }, [refresh, getNewspapers]);

  //* Put => edit and update newspaper data from db
  const editNewspaper = (data) => {
    setRedirect(!redirect);
    setGlobalNewspaperData(data);
  };

  //* Delete => delete newspapers from db
  const deleteNewspaper = async (id) => {
    await adminConfig
      .delete(`/deleteNewspaper/${id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => setRefresh(!refresh));
  };

  if (redirect) {
    return <Redirect to="/admin/editnewspaper" />;
  }

  return (
    <>
      {currentTableData.slice(0, 8).map((data) => (
        <div className="col-md-3 adverts-img">
          <h5 className="date fs-6">{data.newspaperTitle}</h5>
          <div className="advert-img-card">
            <img src={data.image} alt="Hello" />
          </div>
          <h6>{data.updatedAt}</h6>
          <div className="adverts-btn w-100">
            <button
              onClick={() => deleteNewspaper(data._id)}
              className="btn btn-danger btn-advert-custom w-100"
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
        totalCount={newsPaperData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default NewsPaperPreview;
