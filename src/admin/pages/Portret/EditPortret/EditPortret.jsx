import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import adminConfig from "../../../../config/adminConfig";
import AdminContext from "../../../AdminContext";
import useCryllic from "../../../components/Cryllic/useCryllic";

const EditPortret = () => {
  const { globalPortret } = useContext(AdminContext);
  const [title, setTitle] = useState(globalPortret.titleUz);
  const [titleKr, setTitleKr] = useCryllic();
  const [iframe, setIframe] = useState(globalPortret.iframe);
  const [youtubeLink, setYoutubeLink] = useState(globalPortret.youtubeLink);
  const [descriptionUz, setDescriptionUz] = useCryllic();
  const [descriptionKr, setDescriptionKr] = useState(
    globalPortret.descriptionKr
  );
  const [redirect, setRedirect] = useState(false);
  //Edit => edits portrets
  const editPortret = async () => {
    adminConfig
      .put(`/putPortret/${globalPortret._id}`, {
        iframe: iframe,
        titleKr: title,
        titleUz: titleKr,
        youtubeLink: youtubeLink,
        descriptionUz: descriptionUz,
        descriptionKr: descriptionKr,
      })
      .then(() => setRedirect(!redirect));
  };

  const submitHandler = (e) => {
    e.preventDefault();
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
            value={title}
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
            value={titleKr}
            required
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
            value={iframe}
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
            className="form-control"
            required
            value={youtubeLink}
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
            value={descriptionUz}
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
            value={descriptionUz}
            required
            className="form-control"
            onChange={(e) => setDescriptionUz(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button onClick={editPortret} className="btn btn-dark py-2 px-4">
            Save changes
          </button>
        </div>
      </form>
      )
    </section>
  );
};

export default EditPortret;
