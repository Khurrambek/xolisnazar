import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../../../components/Pagination/CategoryPagination";
import indexConfig from "../../../config/indexConfig";
let PageSize = 8;

const Subscribe = () => {
  const [subscribeData, setSubscribeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return subscribeData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, subscribeData]);
  useEffect(async () => {
    await indexConfig
      .get("/getAllSubscriptionBills")
      .then((res) => setSubscribeData(res.data.bills));
  }, []);
  return (
    <>
      <section className="contacts-section ">
        <div className="row contacts-wrapper h-100">
          <div className="col-md-11 mx-auto h-100">
            <div className="table-responsive">
              <table className="table table-hover table-bordered contact-table-border ">
                <thead className="bg-dark text-light">
                  <tr>
                    <th>#</th>
                    <th>F.I.SH</th>
                    <th>Yashash Manzili</th>
                    <th>Telefon Raqami</th>
                    <th>Sotib Olingan Mahsulot Turi</th>
                    <th>Obuna Oyi</th>
                    <th>To'lov Holati</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((data, index) => (
                    <tr>
                      <td>{index+1}</td>
                      <td>
                        {data.firstname} <span></span>
                        {data.surname}
                      </td>
                      <td>{data.address}</td>
                      <td>{data.phone}</td>
                      <td>{data.type}</td>
                      <td>{data.subscriptionMonths}</td>
                      <td>
                        {data.paid ? (
                          <h4 className="btn btn-success"> To'landi </h4>
                        ) : (
                          <h4 className="btn btn-danger"> To'lanmadi </h4>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={subscribeData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Subscribe;
