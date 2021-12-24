import React, { useEffect, useMemo, useState } from "react";
import adminhttp from "../../../../src/config/adminConfig";
import Pagination from "../../../components/Pagination/CategoryPagination";

//token
let token = JSON.parse(localStorage.getItem("token"));
let PageSize = 8;

const Contacts = () => {
  const [contactData, setContactData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return contactData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, contactData]);
  useEffect(() => {
    adminhttp
      .get("/getContacts", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => setContactData(res.data.contacts));
  }, []);
  return (
    <>
      <section className="contacts-section">
        <div className="row contacts-wrapper h-100">
          <div className="col-md-11 mx-auto">
            <div className="table-responsive">
              <table className="table table-hover table-bordered contact-table-border">
                <thead className="bg-dark text-light">
                  <tr>
                    <th>#</th>
                    <th>Ism</th>
                    <th>Email</th>
                    <th>Telefon Raqami</th>
                    <th>Xabar</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>{data.message}</td>
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
        totalCount={contactData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Contacts;
