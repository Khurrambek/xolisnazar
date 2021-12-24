import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import adminConfig from "../../../../config/adminConfig";
import AdminContext from "../../../AdminContext";

const EditNewspaper = () => {
  //local token
  let token = JSON.parse(localStorage.getItem("token"));
  const { globalNewspaperData } = useContext(AdminContext);

  const [title, setTitle] = useState(``);
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setTitle("");
  };
  const updateNewsPaper = async () => {
    await adminConfig
      .put(
        `/putNewspaper/${globalNewspaperData._id}`,
        {
          title: title,
          type: type,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      )
      .then(() => setRedirect(!redirect));
  };

  if (redirect) {
    return <Redirect to="/admin/newspapers" />;
  }
  return (
    <div className="create-advert-form-wrapper">
      <form onSubmit={submitHandler} className="create-advert-form col-md-8">
        <h3 className="fs-4">Gazeta va Jurnal qo'shish.</h3>
        <div className="form-group">
          <label htmlFor="gazeta" className="form-label">
            Gazeta yoki Jurnal sarlavhasi
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            required
            value={title}
            className="form-control"
            placeholder="Gazeta yoki jurnal sarlavhasini kiriting"
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="form-label">
            Yuklanayotgan post turini tanlang:
          </label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              value="Newspaper"
              name="NewspaperRadio"
              id="flexRadioDefault1"
              onChange={(e) => setType(e.target.value)}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Gazeta
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              value="Journal"
              name="NewspaperRadio"
              id="flexRadioDefault2"
              onChange={(e) => setType(e.target.value)}
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Jurnal
            </label>
          </div>
        </div>
        <div className="form-group">
          <button onClick={updateNewsPaper} className="btn btn-dark py-2 px-4">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNewspaper;
