import React from "react";
import { useState } from "react";
import ImageInput from "../../../components/ImageInput/ImageInput";
import adminhttp from "../../../../config/adminConfig";
import indexhttp from "../../../../config/indexConfig";
import "./create-adverts.css";
import { useEffect } from "react";
import { Redirect } from "react-router";

const token = JSON.parse(localStorage.getItem("token"));

const CreateAdverts = () => {
  const [refresh, setRefresh] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [advertLinkValue, setAdvertLinkValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [adHome, setAdHome] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [showInputs, setshowInputs] = useState(false);

  useEffect(() => {
    indexhttp
      .get("/getAllCategories")
      .then((res) => setCategoryData(res.data.allCategories));
  }, [refresh]);

  const submitHandler = (e) => {
    e.preventDefault();
    setAdvertLinkValue("");
  };

  //post adverts
  const postAds = async () => {
    let formData = new FormData();
    formData.append("photo", imageUrl);
    formData.append("adsLink", advertLinkValue);
    formData.append("homepage", adHome);
    formData.append("categoryId", categoryId);
    await adminhttp
      .post("/postAd", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      })
      .then(() => setRefresh(!refresh));
  };

  if (refresh === true) {
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
        <h3 className="fs-4">Reklama Qo'shish</h3>
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
          <ImageInput getPathName={(path) => setImageUrl(path)} />
        </div>
        <div className="form-group">
          <button onClick={postAds} className="btn btn-dark py-2 px-4">
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateAdverts;
