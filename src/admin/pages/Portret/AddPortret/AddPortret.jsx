import React, { useState } from "react";
import { Redirect } from "react-router";
import adminConfig from "../../../../config/adminConfig";
import useCryllic from "../../../components/Cryllic/useCryllic";

const AddPortret = () => {
  const [title, setTitle] = useState("");
  const [titleKr, setTitleKr] = useCryllic();
  const [iframe, setIframe] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [descriptionUz, setDescriptionUz] = useCryllic();
  const [descriptionKr, setDescriptionKr] = useState("");
  const [redirect, setRedirect] = useState(false);
  //Submit => clear inputs
  const submitHandler = (e) => {
    e.preventDefault();
    setTitle("");
    setTitleKr("");
    setIframe("");
  };

  //Post => posts youtbe videos
  const postPortret = async () => {
    return await adminConfig
      .post("/postPortret", {
        iframe: iframe,
        titleUz: title,
        titleKr: titleKr,
        youtubeLink: youtubeLink,
        descriptionKr: descriptionKr,
        descriptionUz: descriptionUz,
      })
      .then(() => setRedirect(!redirect));
  };

  if (redirect) {
    return <Redirect to="/admin/portret" />;
  }
  return (
    <section className="create-advert-form-wrapper">
      (
      <form onSubmit={submitHandler} className="create-advert-form col-md-8">
        <h3 className="fs-4">Portretga Video Qo'shish</h3>

        <div class="form-group">
          <label htmlFor="name" className="form-label">
            Kiritilayotgan Video Sarlavhasi
          </label>

          <input
            type="text"
            required
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleKr(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div class="form-group">
          <label htmlFor="name" className="form-label">
            Sarlavha (Lotin)
          </label>

          <input
            type="text"
            required
            value={titleKr}
            onChange={(e) => setTitleKr(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            YouTube Linki (Embed)
          </label>
          <input
            type="text"
            required
            onChange={(e) => setIframe(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Yo'naltiruvchi Youtube Link
          </label>
          <input
            type="text"
            required
            className="form-control"
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Subtitle (qisqacha ma'lumot)
          </label>
          <textarea
            type="text"
            required
            className="form-control"
            onChange={(e) => {
              setDescriptionKr(e.target.value);
              setDescriptionUz(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Subtitle (Lotin)
          </label>
          <textarea
            type="text"
            required
            value={descriptionUz}
            className="form-control"
            onChange={(e) => setDescriptionUz(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button onClick={postPortret} className="btn btn-dark py-2 px-4">
            Save
          </button>
        </div>
      </form>
      )
    </section>
  );
};

export default AddPortret;
