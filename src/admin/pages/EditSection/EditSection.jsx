import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../AdminContext";
import adminhttp from "../../../config/adminConfig";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { Redirect } from "react-router";
import ReactTagInput from "@pathofdev/react-tag-input";
import useCryllic from "../../components/Cryllic/useCryllic";

const editorConfiguration = {
  removePlugins: ["Title"],
  toolbar: [
    "heading",
    "alignment",
    "bold",
    "italic",
    "link",
    "uploadImage",
    "insertTable",
    "mediaEmbed",
    "bulletedList",
    "numberedList",
    "todoList",
    "blockQuote",
    "undo",
    "redo",
    "removeFormat",
    "outdent",
    "indent",
    "strikethrough",
    "fontColor",
    "fontBackgroundColor",
    "underline",
    "subscript",
    "superscript",
  ],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
    ],
  },
  image: {
    toolbar: [
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "|",
      "toggleImageCaption",
      "imageTextAlternative",
    ],
  },
  mediaEmbed: {
    previewsInData: true,
  },
};

const EditSection = () => {
  const { globalCategorydata, categoryArray } = useContext(AdminContext);

  const [redirect, setRedirect] = useState(false);
  const [heading, setHeading] = useState(globalCategorydata.title);
  const [author, setAuthor] = useState(globalCategorydata.journalistName);
  const [paragraph, setParagraph] = useState(globalCategorydata.paragraphUz);
  const [subtitle, setSubtitle] = useState(globalCategorydata.subTitle);
  const [hashTag, setHashTag] = useState([""]);
  const [categoryId, setCategoryId] = useState(globalCategorydata.categoryId);
  const [categoryName, setCategoryName] = useState(
    globalCategorydata.categoryName
  );
  const [headingKr, setHeadingKr] = useCryllic();
  const [authorKr, setAuthorKr] = useCryllic();
  const [paragraphKr, setParagraphKr] = useState("");
  const [subtitleKr, setSubtitleKr] = useCryllic();
  const [categoryNameKr, setCategoryNameKr] = useCryllic();
  const [fileName, setfileName] = useState(globalCategorydata.mainPhoto);
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

  //token
  const token = JSON.parse(localStorage.getItem("token"));

  const updateNews = async () => {
    const body = {
      title: heading,
      subTitle: subtitle,
      paragraphUz: paragraph,
      parapraphKr: paragraph,
      hashTag: hashTag,
      categoryId: categoryId,
      categoryName: categoryName.toUpperCase(),
      journalistFullName: author,
    };
    let formData = new FormData();
    formData.append("photo", image);
    formData.append("title", body.title);
    formData.append("subTitle", body.subTitle);
    formData.append("paragraphUz", body.paragraphUz);
    formData.append("parapraphKr", body.parapraphKr);
    formData.append("hashTag", body.hashTag);
    formData.append("categoryId", body.categoryId);
    formData.append("categoryName", body.categoryName);
    formData.append("journalistFullName", body.journalistFullName);
    formData.append("journalistNameKr", authorKr);
    formData.append("titleKr", headingKr);
    formData.append("subTitleKr", subtitleKr);
    formData.append("paragraphKr", paragraphKr);
    formData.append("categoryNameKr", categoryNameKr);

    await adminhttp
      .put(`/updateNews/${globalCategorydata["_id"]}`, formData, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => setRedirect(!redirect));
  };

  const newsSubmitHandler = (e) => {
    e.preventDefault();
    setSubtitle("");
    setParagraph("");
    setHeading("");
    setAuthor("");
    setCategoryName("");
  };

  if (redirect === true) {
    return <Redirect to="/admin/sections" />;
  }

  return (
    <>
      <form className="navbar-secondary row">
        <select
          onChange={(e) => setCategoryId(e.target.value)}
          className="form-select select-style addsection-select"
        >
          <option selected value="0">
            Kategoriyalar
          </option>
          {categoryArray.map((data) => (
            <option value={data._id}></option>
          ))}
        </select>
      </form>
      <section className="create-news-section">
        <form
          onSubmit={newsSubmitHandler}
          className="create-news-wrapper row"
          encType="multipart/form-data"
        >
          <div className="create-news-input col-md-6">
            <div className="create-news-header">
              <h4>Yangilikni Tahrirlash</h4>
            </div>
            <div className="form-group">
              <label htmlFor="categoryName" className="form-label">
                Kategoriya nomini tahrirlang.
              </label>
              <input
                onChange={(e) => {
                  setCategoryNameKr(e.target.value);
                  setCategoryName(e.target.value);
                }}
                type="text"
                value={categoryName}
                placeholder="Kategoriya nomi"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Sarlavha" className="form-label">
                Sarlavha
              </label>
              <textarea
                value={heading}
                onChange={(event) => {
                  setHeading(event.target.value);
                  setHeadingKr(event.target.value);
                }}
                type="text"
                className="form-control title-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subtitle" className="for-label">
                Subsarlavha (asosiy sahifada ko'rinadigan post yozuvi va maximum
                30 ta so'zdan iborat bo'lish kerak.).
              </label>
              <textarea
                onChange={(event) => {
                  setSubtitle(event.target.value);
                  setSubtitleKr(event.target.value);
                }}
                type="text"
                value={subtitle}
                className="form-control"
                placeholder="Subsarlavha"
              />
            </div>
            <div className="form-group">
              <label htmlFor="muharrir" className="form-label">
                Muharrir
              </label>
              <input
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setAuthorKr(e.target.value);
                }}
                type="text"
                value={author}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="hashtag" className="form-label">
                Hashtagni tahririlang
              </label>
              <ReactTagInput
                tags={hashTag}
                placeholder="Type and press enter"
                maxTags={15}
                editable={true}
                readOnly={false}
                removeOnBackspace={true}
                onChange={(newTags) => setHashTag(newTags)}
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
                    className="form-control form-image"
                    onChange={fileHandler}
                  />
                </div>
              </form>
            </div>
            <div className="form-group">
              <label htmlFor="paragraph" className="form-label">
                Paragraph
              </label>
              <CKEditor
                editor={Editor}
                data={paragraph}
                onChange={(event, editor) => {
                  setParagraph(editor.getData());
                  // setParagraphKr(editor.getData());
                }}
                config={editorConfiguration}
              />
            </div>
            <div className="form-group">
              <button
                onClick={updateNews}
                type="submit"
                className="btn btn-primary py-1 px-4"
              >
                Save Changes
              </button>
            </div>
          </div>
          <div className="create-news-input col-md-6">
            <div className="create-news-header">
              <h4>Lotin Ko'rinishi</h4>
            </div>
            <div className="form-group">
              <label htmlFor="categoryName" className="form-label">
                Kategoriya (Lotin)
              </label>
              <input
                onChange={(e) => setCategoryNameKr(e.target.value)}
                type="text"
                value={categoryNameKr}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Sarlavha" className="form-label">
                Sarlavha (Lotin)
              </label>
              <textarea
                value={headingKr}
                onChange={(event) => setHeadingKr(event.target.value)}
                type="text"
                className="form-control title-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subtitle" className="for-label">
                Subsarlavha (Lotin).
                <br />
              </label>
              <textarea
                onChange={(event) => setSubtitleKr(event.target.value)}
                type="text"
                value={subtitleKr}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="muharrir" className="form-label">
                Muharrir (Lotin)
              </label>
              <input
                onChange={(e) => setAuthorKr(e.target.value)}
                type="text"
                value={authorKr}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>

            <div className="form-group">
              <label htmlFor="paragraph" className="form-label">
                Paragraph (Lotin)
              </label>
              <CKEditor
                editor={Editor}
                onChange={(event, editor) => {
                  setParagraphKr(editor.getData());
                }}
                config={editorConfiguration}
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditSection;
