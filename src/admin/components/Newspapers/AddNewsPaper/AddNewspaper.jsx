import React, { useState } from "react";
import adminConfig from "../../../../config/adminConfig";
import ImageInput from "../../ImageInput/ImageInput";
import { Redirect } from "react-router";
import useCryllic from "../../Cryllic/useCryllic";
//token
const token = JSON.parse(localStorage.getItem("token"));

const AddNewspaper = () => {
  const [url, setUrl] = useState(
    "Gazeta va Jurnallar pdf format shaklida yuklanadi"
  );
  const [pdf, setPdf] = useState(" ");
  const [imageUrl, setImageUrl] = useState(" ");
  const [title, setTitle] = useState(" ");
  const [amount, setAmount] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [type, setType] = useState("");
  const [titleKr, setTitleKr] = useCryllic();

  const onChange = (e) => {
    const files = e.target.files;
    setPdf(files[0]);
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };

  //submit event
  const submitHandler = (e) => {
    e.preventDefault();
    setTitle("");
    setTitleKr("");
    setUrl("Gazeta va Jurnallar pdf format shaklida yuklanadi");
  };
  //Post => post newspaper to the db
  const postNewsPaper = async () => {
    const body = {
      caption: title,
      type: type,
      amount: amount,
    };

    let formData = new FormData();

    formData.append("caption", body.caption);
    formData.append("captionKr", titleKr);
    formData.append("photo", imageUrl);
    formData.append("pdf", pdf);
    formData.append("type", body.type);
    formData.append("paymentAmount", amount);

    await adminConfig
      .post("/postNewspaper", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      })
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
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleKr(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Gazeta yoki jurnal sarlavhasini kiriting"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gazeta" className="form-label">
            Sarlavha (Lotin)
          </label>
          <input
            onChange={(e) => setTitleKr(e.target.value)}
            type="text"
            value={titleKr}
            className="form-control"
            placeholder="Gazeta yoki jurnal sarlavhasini kiriting"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gazeta" className="form-label">
            Narxini belgilang:
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Gazeta yoki Jurnal narxini kiriting"
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
          <label htmlFor="reklama" className="form-label">
            Gazeta va Jurnal prevyu muqovasini rasm shaklida yuklang.
          </label>
          <ImageInput getPathName={(path) => setImageUrl(path)} />
        </div>

        <div className="form-group">
          <label htmlFor="gazeta" className="form-label"></label>
          <div className="file-upload-wrapper" data-text={url}>
            <input
              type="file"
              accept=".pdf"
              onChange={onChange}
              required
              className="form-control form-image"
            />
          </div>
        </div>
        <div className="form-group">
          <button
            onClick={postNewsPaper}
            type="submit"
            className="btn btn-lg btn-dark py-2 px-5"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewspaper;
