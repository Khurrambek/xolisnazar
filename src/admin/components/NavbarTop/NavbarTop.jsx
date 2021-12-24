import React, { useContext } from "react";
import IndexContext from "../../../indexContect";
import "./navbarTop.css";

const NavbarTop = () => {
  const { setRefresh, refresh, setisToken } = useContext(IndexContext);
  const logOutHandler = () => {
    localStorage.removeItem("token");
    setisToken(true);
    setRefresh(!refresh);
  };
  return (
    <div className="navbar-wrapper">
      <div className="calendar">
        <div className="calendar-img">
          <img src="assets/navbarTop/calendar.png" alt="" />
        </div>
      </div>
      <ul className="nav-right-container">
        <li className="language-changer item">
          <button
            onClick={logOutHandler}
            className="btn-dark px-2 py-1 rounded"
          >
            Log Out
          </button>
        </li>
        <li className="account-wrapper item">
          <div className="account-name">
            <h6>John Doe</h6>
            <span className="account-state">
              <small>Online</small>
            </span>
          </div>
          <div className="account-img">
            <img src="assets/navbarTop/Oval.png" alt="" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavbarTop;
