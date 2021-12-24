import React, { useState } from "react";
import "./Admin.css";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sections from "./pages/Sections/Sections";
import Adverts from "./pages/Adverts/Adverts";
import Accounts from "./pages/Accounts/Accounts";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Navigation from "./components/Navigation/Navigation";
import NavbarTop from "./components/NavbarTop/NavbarTop";
import AddCategory from "./pages/AddCategory/AddCategory";
import AddSection from "./pages/AddSection/AddSection";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import CreateAdverts from "./pages/Adverts/CreateAdverts/CreateAdverts";
import AdminContext from "./AdminContext";
import EditAdvert from "./pages/Adverts/editAdvert/EditAdvert";
import EditSection from "./pages/EditSection/EditSection";
import Contacts from "./pages/Contacts/Contacts";
import Newspapers from "./components/Newspapers/Newspapers";
import AddNewspaper from "./components/Newspapers/AddNewsPaper/AddNewspaper";
import EditNewspaper from "./components/Newspapers/EditNewspaper/EditNewspaper";
import Subscribe from "./pages/Subscribe/Subscribe";
import Soldnewspapers from "./pages/Soldnewspapers/Soldnewspapers";
import Portret from "./pages/Portret/Portret";
import AddPortret from "./pages/Portret/AddPortret/AddPortret";
import EditCategory from "./pages/AddCategory/EditCategory";
import EditPortret from "./pages/Portret/EditPortret/EditPortret";

let token = JSON.parse(localStorage.getItem("token"));
function AdminApp({ authorized }) {
  const [globalEditAdvertId, setGlobalEditAdvertId] = useState(null);
  const [globalCategorydata, setGlobalCategorydata] = useState(null);
  const [globalNewspaperData, setGlobalNewspaperData] = useState(null);
  const [categoryArray, setCategoryArray] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [getNewspapers, setGetNewspapers] = useState("");
  const [getJournals, setGetJournals] = useState("");
  const [editCategoryData, setEditCategoryData] = useState([]);
  const [globalPortret, setGlobalPortret] = useState([]);

  //Authenticate admin with the token
  if (authorized && !token) {
    return <Redirect to="/login" />;
  }

  //remove token after some time
  setTimeout(() => {
    localStorage.removeItem("token");
  }, 86400000);

  return (
    <AdminContext.Provider
      value={{
        globalEditAdvertId,
        setGlobalEditAdvertId,
        globalCategorydata,
        setGlobalCategorydata,
        categoryArray,
        setCategoryArray,
        sectionId,
        setSectionId,
        setGlobalNewspaperData,
        globalNewspaperData,
        getNewspapers,
        setGetNewspapers,
        getJournals,
        setGetJournals,
        setEditCategoryData,
        editCategoryData,
        setGlobalPortret,
        globalPortret,
      }}
    >
      <div className="app">
        <div className="row row-bg-main">
          <aside className="col-md-2 navigation-wrapper">
            <Navigation />
          </aside>
          <main className="col-md-10">
            <nav className="navbar-section">
              <NavbarTop />
            </nav>
            <Router forceRefresh={false}>
              <Switch>
                <Route path="/admin" exact component={Dashboard} />
                <Route path="/admin/sections" component={Sections} />
                <Route path="/admin/adverts" component={Adverts} />
                <Route path="/admin/addcategory" component={AddCategory} />
                <Route path="/admin/editcategory" component={EditCategory} />
                <Route path="/admin/accounts" component={Accounts} />
                <Route path="/admin/addadvert" component={CreateAdverts} />
                <Route path="/admin/editadvert" component={EditAdvert} />
                <Route path="/admin/addsection" component={AddSection} />
                <Route path="/admin/editsection" component={EditSection} />
                <Route path="/admin/contacts" component={Contacts} />
                <Route path="/admin/newspapers" component={Newspapers} />
                <Route path="/admin/addnewspaper" component={AddNewspaper} />
                <Route path="/admin/editnewspaper" component={EditNewspaper} />
                <Route path="/admin/subscribe" component={Subscribe} />
                <Route path="/admin/soldnewspaper" component={Soldnewspapers} />
                <Route path="/admin/portret" component={Portret} />
                <Route path="/admin/addportret" component={AddPortret} />
                <Route path="/admin/editportret" component={EditPortret} />
                <Route path="/admin/*" component={ErrorPage} />
              </Switch>
            </Router>
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}

export default AdminApp;
