import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="logo">
        <Link to="/" className="btn">
          <img src="assets/navigation/Logo.png" alt="" />
        </Link>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            exact
            to="/admin"
            className="nav-link admin-navigation-link"
            activeClassName={"active active-item"}
          >
            Bosh Sahifa
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/sections"
            className="nav-link admin-navigation-link"
            activeClassName={"active active-item"}
          >
            Bo'limlar
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/adverts"
            className="nav-link admin-navigation-link"
            activeClassName={"active active-item"}
          >
            Reklamalar
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/portret"
            className="nav-link admin-navigation-link"
            activeClassName={"active active-item"}
          >
            Portret
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/newspapers"
            className="nav-link admin-navigation-link"
            activeClassName={"active active-item"}
          >
            Gazetalar
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/addcategory"
            className="nav-link admin-navigation-link"
            activeClassName={"active active-item"}
          >
            Kategoriya Qo'shish
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/accounts"
            className="nav-link admin-navigation-link"
            activeClassName={"active active-item"}
          >
            Akkauntlar
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/contacts"
            className="nav-link admin-navigation-link"
            activeClassName={"active active-item"}
          >
            Kontaktlar
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/subscribe"
            className="nav-link admin-navigation-link"
            activeClassName={"active active-item"}
          >
            Obunalar
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/soldnewspaper"
            className="nav-link admin-navigation-link"
            activeClassName={"active active-item"}
          >
            Sotilgan Gazetalar
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
