import React, { useState, useContext, useEffect } from "react";
import adminhttp from "../../../../config/adminConfig";
import "../CreateAdverts/create-adverts.css";
import AdminContext from "../../../AdminContext";
import { Redirect } from "react-router";
import indexConfig from "../../../../config/indexConfig";

const EditAdvert = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const { globalEditAdvertId } = useContext(AdminContext);

  //image input
  const [fileName, setfileName] = useState(`${globalEditAdvertId.adsPhoto}`);
  const [image, setimage] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [preview, setpreview] = useState(null);
  const [redirect, setredirect] = useState(false);
  const [advertLinkValue, setAdvertLinkValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [adHome, setAdHome] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    indexConfig
      .get("/getAllCategories")
      .then((res) => setCategoryData(res.data.allCategories));
  }, []);

  const fileHandler = (event) => {
    setfileName(event.target.files["0"].name);
    if (event.target.files["0"]) {
      setimage(event.target.files["0"]);
    } else {
      setimage(null);
    }
  };
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setpreview(`${reader.result}`);
      };
      reader.readAsDataURL(image);
    } else {
      setpreview(null);
    }
  }, [image, refresh]);

  const submitHandler = (e) => {
    e.preventDefault();
    setpreview(null);
  };

  //Update ads
  const updateAds = async () => {
    const formData = new FormData();
    formData.append("photo", image);
    formData.append("adsLink", advertLinkValue);
    formData.append("homepage", adHome);
    formData.append("categoryId", categoryId);
    adminhttp
      .put(`/updateAds/${globalEditAdvertId["_id"]}`, formData, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => setrefresh(!refresh))
      .then(() => setredirect(!redirect));
  };

  if (redirect === true) {
    return <Redirect to="/admin/adverts" />;
  }

  return (
    <section className="create-advert-form-wrapper">
      <section className="navbar-secondary">
        <select
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
          className="form-select advert-form-select"
        >
          <option value="1">Kategoriyani Tanlang</option>
          {categoryData.map((data) => (
            <option value={data._id}>{data.titleUz}</option>
          ))}
        </select>
      </section>
      <form onSubmit={submitHandler} className="create-advert-form col-md-8">
        <h3 className="fs-4">Reklamani O'zgartirish</h3>
        <div className="form-group">
          <label htmlFor="sana" className="form-label">
            Sanani kiriting.
          </label>
          <input type="date" className="form-control calendar-input" />
        </div>
        <div className="form-group">
          <label htmlFor="sahifa" className="form-label">
            Joylashtirayotgan reklamangiz asosiy sahifada ko'rinsinmi? (Hozirgi
            holati: Yo'q){" "}
          </label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={true}
              onChange={(e) => {
                setAdHome(e.target.value);
              }}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Ha (Bosh sahifada ko'rinadi)
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value={false}
              onChange={(e) => {
                setAdHome(e.target.value);
              }}
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Yo'q (Bosh sahifada ko'rinmaydi)
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="link" className="form-label">
            Reklama uchun yo'naltiruvchi link shu yerga qo'yiladi.
          </label>
          <input
            onChange={(event) => setAdvertLinkValue(event.target.value)}
            placeholder="Link shu yerga qo'yiladi"
            value={advertLinkValue}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reklama" className="form-label">
            Reklamani joylashtiring.
          </label>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="file-upload-container"
          >
            <div className="file-upload-preview">
              <img src={preview} accept=".jpg" alt="file preview" />
            </div>
            <div className="file-upload-wrapper" data-text={fileName}>
              <input
                type="file"
                placeholder={fileName}
                className="form-control form-image"
                onChange={fileHandler}
              />
            </div>
          </form>
        </div>
        <div className="form-group">
          <button onClick={updateAds} className="btn btn-dark py-2 px-4">
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditAdvert;
