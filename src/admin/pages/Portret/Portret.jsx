import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { Link, Redirect } from "react-router-dom";
import Pagination from "../../../components/Pagination/CategoryPagination";
import adminConfig from "../../../config/adminConfig";
import indexConfig from "../../../config/indexConfig";
import AdminContext from "../../AdminContext";

let PageSize = 8;
const Portret = () => {
  const [portretData, setPortretData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { setGlobalPortret } = useContext(AdminContext);

  //Get => gets portret videos
  const iframeTag = document.getElementsByTagName("iframe");
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return portretData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, portretData]);
  useEffect(async () => {
    await indexConfig
      .get("getAllPortret")
      .then((res) => setPortretData(res.data.data));
    if (iframeTag.length) {
      for (let i = 0; i < iframeTag.length; i++) {
        iframeTag[i].style.width = "100%";
      }
    }
  }, [refresh, iframeTag, currentTableData]);

  //Delete => deletes portret videos
  const deletePortret = async (id) => {
    return adminConfig
      .delete(`/deletePortret/${id}`)
      .then(() => setRefresh(!refresh));
  };

  //Edit
  const editPortret = (data) => {
    setRedirect(!redirect);
    setGlobalPortret(data);
  };

  if (redirect) {
    return <Redirect to="/admin/editportret" />;
  }

  return (
    <>
      <section className="navbar-secondary">
        <div className="right-btn">
          <Link to="/admin/addportret" className="btn item-right-btn">
            {" "}
            <AiOutlinePlusCircle /> Add
          </Link>
        </div>
      </section>
      <section className="adverts-img-section">
        <div className="row wrap adverts-img-wrapper">
          {currentTableData.map((data) => (
            <div key={data._id} className="col-md-3 adverts-img">
              <h5 style={{height: '20%', paddingTop: '1rem'}} className="date fs-6">{data.titleUz}</h5>
              <div>
                <div
                  style={{ height: "80%" }}
                  dangerouslySetInnerHTML={{ __html: data.iframe }}
                ></div>
              </div>
              <div className="adverts-btn w-100">
                <button
                  onClick={() => deletePortret(data._id)}
                  className="btn btn-danger btn-advert-custom w-100"
                >
                  <div className="btn-custom-icon">
                    <AiOutlineDelete />
                  </div>
                  Delete
                </button>
                <button
                  onClick={() => editPortret(data)}
                  className="btn btn-success btn-advert-custom w-100"
                >
                  <div className="btn-custom-icon">
                    <AiOutlineEdit />
                  </div>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={portretData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Portret;
