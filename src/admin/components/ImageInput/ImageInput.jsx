import React, { useState, useEffect } from "react";
import "./imageinput.css";

const ImageInput = ({ getPathName }) => {
  const [fileName, setfileName] = useState("Select Your Files.");
  const [image, setimage] = useState("");
  const [preview, setpreview] = useState();

  getPathName(image);
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
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="file-upload-container"
    >
      <div className="file-upload-preview">
        <img src={preview} accept=".jpg" alt="Rasm shu yerda ko'rinadi" />
      </div>
      <div className="file-upload-wrapper" data-text={fileName}>
        <input
          type="file"
          placeholder={fileName}
          accept=".jpg, .png"
          required
          className="form-control form-image"
          onChange={fileHandler}
        />
      </div>
    </form>
  );
};

export default ImageInput;
