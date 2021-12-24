import React, { useState, useEffect, useRef, useContext } from "react";
import { Redirect } from "react-router";
import adminhttp from "../../../config/adminConfig";
import indexhttp from "../../../config/indexConfig";
import AdminContext from "../../AdminContext";
import useCryllic from "../../components/Cryllic/useCryllic";
import ImageInput from "../../components/ImageInput/ImageInput";
import "./addcategory.css";

const AddCategory = () => {
  const { setEditCategoryData } = useContext(AdminContext);

  //token
  const token = JSON.parse(localStorage.getItem("token"));
  const editClicked = useRef();
  const [categoryUzValue, setcategoryUzValue] = useState("");
  const [dataCategory, setdataCategory] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [categoryKrValue, setCategoryKrValue] = useCryllic();
  const categorySubmitHandler = () => {
    setcategoryUzValue("");
    setCategoryKrValue("");
    setRefresh(!refresh);
  };

  useEffect(() => {
    indexhttp
      .get("/getAllCategories")
      .then((res) => setdataCategory(res.data.allCategories));
  }, [refresh]);

  //Post category to the server database
  const postCategory = async () => {
    const formData = new FormData();
    formData.append("titleUz", categoryUzValue);
    formData.append("titleKr", categoryUzValue);
    formData.append("photo", imageUrl);
    return await adminhttp
      .post("/postCategory", formData, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => setRefresh(!refresh));
  };

  //Delete categories in the server database
  const deleteCategory = async (id) => {
    return await adminhttp
      .delete(`/deleteCategory/${id}`, {
        headers: { "x-access-token": token },
      })
      .then(() => setRefresh(!refresh));
  };

  const handleEdit = (category) => {
    setEditCategoryData(category);
    setRedirect(!redirect);
  };

  if (redirect) {
    return <Redirect to="/admin/editcategory" />;
  }

  return (
    <>
      <section className="addcategory-form-section">
        <div className="addcategory-form-wrapper">
          <form onSubmit={categorySubmitHandler} className="addcategory-form">
            <h3>Kategoriya Qo'shish</h3>
            <div className="form-group">
              <label htmlFor="kategoriyaNomi" className="form-label">
                Kategoriya nomi
              </label>
              <input
                type="text"
                className="form-control addcategory-input"
                required
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
              <label htmlFor="reklama" className="form-label">
                Reklamani joylashtiring.
              </label>
              <ImageInput getPathName={(path) => setImageUrl(path)} />
            </div>
            <div className="form-group">
              <button
                onClick={postCategory}
                type="submit"
                className="btn btn-dark px-5 "
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="addcategory-card-hero row">
          {dataCategory.map((category) => (
            <div className="card-hero-wrapper col-md-12 ">
              <div
                className="card-hero row align-items-center justify-content-between"
                key={category["_id"]}
              >
                <div className="col-md-9">
                  <h5 className="d-inline">Kategoriya Nomi:</h5>
                  <h5 className="d-inline fs-6 text-capitalize px-3 text-muted">
                    {category.titleUz} ({category.titleKr})
                  </h5>
                  <div className="category-bg-img-wrap">
                    <img
                      src={category.categoryImage}
                      className="category-bg-img"
                    />
                  </div>
                </div>

                <div className="card-hero-button col-md-3">
                  <button
                    onClick={() => handleEdit(category)}
                    type="submit"
                    className="btn btn-primary px-5"
                    ref={editClicked}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category["_id"])}
                    type="submit"
                    className="btn btn-danger px-5"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AddCategory;
