import React, { useContext, useState, useEffect } from "react";
import adminhttp from "../../../config/adminConfig";
import indexhttp from "../../../config/indexConfig";
import AdminContext from "../../AdminContext";
import ReactTagInput from "@pathofdev/react-tag-input";
import ImageInput from "../../components/ImageInput/ImageInput";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Redirect } from "react-router";
import "../../components/AreaInput/areainput.css";
import "./addsection.css";
import "@pathofdev/react-tag-input/build/index.css";
import useCryllic from "../../components/Cryllic/useCryllic";
import axios from "axios";

//token
const token = JSON.parse(localStorage.getItem("token"));

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

const AddSection = () => {
  const { categoryArray, setCategoryArray } = useContext(AdminContext);
  //Get Cryllic text

  const [redirect, setRedirect] = useState(false);
  const [heading, setHeading] = useState("");
  const [author, setAuthor] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [hashTag, setHashTag] = useState([""]);
  const [imageUrl, setImageUrl] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [newsCategoryName, setNewsCategoryName] = useState("");
  const [showInputs, setshowInputs] = useState(false);
  const [headingKr, setHeadingKr] = useCryllic();
  const [authorKr, setAuthorKr] = useCryllic();
  const [paragraphKr, setParagraphKr] = useCryllic();
  const [subtitleKr, setSubtitleKr] = useCryllic();
  const [categoryNameKr, setCategoryNameKr] = useCryllic();

  useEffect(() => {
    indexhttp
      .get("/getAllCategories")
      .then((res) => setCategoryArray(res.data.allCategories));
  }, []);
  const postNews = async () => {
    const body = {
      title: heading,
      subTitle: subtitle,
      paragraphUz: paragraph,
      parapraphKr: paragraph,
      hashTag: hashTag,
      categoryId: categoryId,
      categoryName: newsCategoryName.toUpperCase(),
      journalistFullName: author,
    };
    let formData = new FormData();
    formData.append("photo", imageUrl);
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
      .post("/postNews", formData, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => setRedirect(!redirect));
  };
  const translate = async () => {
    await adminhttp
      .post("/translate", { paragraph: paragraph })
      .then((res) => setParagraphKr(res.data.lotin));
  };
  const newsSubmitHandler = (e) => {
    e.preventDefault();

    // setSubtitle("");
    // setParagraph("");
    // setHeading("");
    // setAuthor("");
  };

  // if (redirect === true) {
  //   return <Redirect to="/admin/sections" />;
  // }

  return (
    <>
      <form className="navbar-secondary">
        <select
          onChange={(e) => {
            setCategoryId(e.target.value);
            setshowInputs(true);
          }}
          className="form-select select-style addsection-select"
        >
          <option selected value="Kategoriya">
            Kategoriyani tanlang
          </option>
          {categoryArray.map((category) => (
            <option value={category["_id"]}>{category.titleUz}</option>
          ))}
        </select>
      </form>
      {showInputs && (
        <section className="create-news-section">
          <form
            onSubmit={newsSubmitHandler}
            className="create-news-wrapper row"
            encType="multipart/form-data"
          >
            <div className="create-news-input col-md-6">
              <div className="create-news-header">
                <h4>Yangilik Qo'shish</h4>
              </div>
              <div className="form-group">
                <label htmlFor="kategoriya" className="form-label">
                  Qaysi kategoriyaga post qilmoqchisiz?
                </label>
                <input
                  onChange={(e) => {
                    setCategoryNameKr(e.target.value);
                    setNewsCategoryName(e.target.value);
                  }}
                  required
                  type="text"
                  className="form-control"
                  placeholder="Kategoriya nomini kiriting..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="Sarlavha" className="form-label">
                  Sarlavha
                </label>
                <textarea
                  type="text"
                  value={heading}
                  required
                  onChange={(event) => {
                    setHeadingKr(event.target.value);
                    setHeading(event.target.value);
                  }}
                  className="form-control title-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="form-label">
                  Subtitle (asosiy sahifada ko'rinadigan yangilik prevyusi va
                  maximum 30 ta so'zdan iborat bo'lishi kerak)
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  required
                  value={subtitle}
                  onChange={(e) => {
                    setSubtitleKr(e.target.value);
                    setSubtitle(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hashtag" className="form-label">
                  Yangilik uchun tag larni kiriting va enter tugmasini bosing.
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
                <label htmlFor="muharrir" className="form-label">
                  Muharrir
                </label>
                <input
                  onChange={(e) => {
                    setAuthorKr(e.target.value);
                    setAuthor(e.target.value);
                  }}
                  required
                  type="text"
                  value={author}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Rasm" className="form-label">
                  Rasm
                </label>
                <ImageInput getPathName={(path) => setImageUrl(path)} />
              </div>
              <div className="form-group">
                <label htmlFor="paragraph" className="form-label">
                  Paragraph
                </label>
                <CKEditor
                  editor={Editor}
                  data={paragraph}
                  onInit={(editor) => {}}
                  onChange={(event, editor) => {
                    setParagraph(editor.getData());
                    setParagraphKr(editor.getData());
                    // translate();
                  }}
                  config={editorConfiguration}
                />
              </div>
              <div className="form-group">
                <button
                  onClick={postNews}
                  type="submit"
                  className="btn btn-dark py-1 px-4"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="create-news-input col-md-6">
              <div className="create-news-header">
                <h4>Lotin Ko'rinishi</h4>
              </div>
              <div className="form-group">
                <label htmlFor="kategoriya" className="form-label">
                  Kategoriya Nomi (Lotin)
                </label>
                <input
                  onChange={(e) => {
                    setCategoryNameKr(e.target.value);
                  }}
                  value={categoryNameKr}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Sarlavha" className="form-label">
                  Sarlavha (Lotin)
                </label>
                <textarea
                  type="text"
                  value={headingKr}
                  onChange={(event) => {
                    setHeadingKr(event.target.value.replace(/['"]+/g, ""));
                  }}
                  className="form-control title-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subtitle" className="form-label">
                  Subtitle (Lotin) <br />
                  <br />
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  value={subtitleKr}
                  onChange={(e) => {
                    setSubtitleKr(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <br />
                <br />
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="muharrir" className="form-label">
                  Muharrir (Lotin)
                </label>
                <input
                  onChange={(e) => {
                    setAuthorKr(e.target.value);
                  }}
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
              </div>
              <div className="form-group">
                <label htmlFor="paragraph" className="form-label">
                  Paragraph (Lotin)
                </label>
                <CKEditor
                  editor={Editor}
                  data={paragraphKr}
                  onChange={(event, editor) => {
                    setParagraphKr(editor.getData());
                  }}
                  config={editorConfiguration}
                />
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default AddSection;
