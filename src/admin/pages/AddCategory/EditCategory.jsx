import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import adminConfig from "../../../config/adminConfig";
import AdminContext from "../../AdminContext";
import useCryllic from "../../components/Cryllic/useCryllic";

//token

let token = JSON.parse(localStorage.getItem("token"));
const EditCategory = () => {
  const { editCategoryData } = useContext(AdminContext);
  //Update categories in the server database
  const [categoryUzValue, setcategoryUzValue] = useState(
    editCategoryData.titleUz
  );
  const [redirect, setRedirect] = useState(false);
  const [categoryKrValue, setCategoryKrValue] = useCryllic();
  const editCategory = async () => {
    const formData = new FormData();
    formData.append("titleUz", categoryUzValue);
    formData.append("titleKr", categoryKrValue);
    formData.append("photo", image);
    return await adminConfig
      .put(`/updateCategory/${editCategoryData._id}`, formData, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => setRedirect(!redirect));
  };

  const [fileName, setfileName] = useState(
    "Kategoriya Orqa Foni Uchun Rasm Tanlang"
  );
  const [image, setimage] = useState("");
  const [preview, setpreview] = useState();

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
  }, [image]);

  const submitHandler = (e) => {
    e.preventDefault();
    setcategoryUzValue("");
    setCategoryKrValue("");
  };

  if (redirect) {
    return <Redirect to="/admin/addcategory" />;
  }
  return (
    <>
      <div className="addcategory-form-wrapper">
        <form onSubmit={submitHandler} className="addcategory-form">
          <h3>Kategoriya Qo'shish</h3>
          <div className="form-group">
            <label htmlFor="kategoriyaNomi" className="form-label">
              Kategoriya nomi
            </label>
            <input
              type="text"
              value={categoryUzValue}
              required
              className="form-control addcategory-input"
              onChange={(e) => {
                setcategoryUzValue(e.target.value);
                setCategoryKrValue(e.target.value);
              }}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="kategoriyaNomi" className="form-label">
              (Lotin)
            </label>
            <input
              type="text"
              value={categoryKrValue}
              required
              className="form-control addcategory-input"
              onChange={(e) => {
                setCategoryKrValue(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Rasm" className="form-label">
              Rasm
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
                  required
                  className="form-control form-image"
                  onChange={fileHandler}
                />
              </div>
            </form>
          </div>
          <div className="form-group">
            <button
              onClick={editCategory}
              type="submit"
              className="btn btn-dark px-5 "
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
