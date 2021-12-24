import React, { useContext } from "react";
import "./BlogTextPart.css";
import {
  FaTelegramPlane,
  FaFacebookF,
  IoIosInfinite,
  AiFillYoutube,
} from "react-icons/all";
import IndexContext from "../../../indexContect";

const BlogTextPart = () => {
  const { blogNewsData, til } = useContext(IndexContext);
  return (
    <div className="blog-text-container">
      <div className="blog-top-icons">
        {til ? (
          <div className="blog-top-icons-text changingText">
            {blogNewsData.journalistName}
          </div>
        ) : (
          <div className="blog-top-icons-text changingText">
            {blogNewsData.journalistNameKr}
          </div>
        )}

        <div className="blog-top-icons-wrapper">
          <a
            href="https://www.youtube.com/channel/UCmmg6hT60gJ3I5i0BOYSoog"
            className="home-youTubeIcon"
          >
            <AiFillYoutube className="home-dot-icon" color="white" />
          </a>
          <a href="https://t.me/Xolis_nazar" className="blog-top-telegramIcon">
            <FaTelegramPlane className="home-dot-icon" color="white" />
          </a>
          <a
            href="https://www.facebook.com/Xolis-Nazar-104958581725934/?ref=pages_you_manage"
            className="blog-top-facebookIcon"
          >
            <FaFacebookF className="home-dot-icon" color="white" />
          </a>
        </div>
      </div>

      <div className="blog-firstText">
        {til ? (
          <div className="blog-half-text changingText">
            <div
              dangerouslySetInnerHTML={{ __html: blogNewsData.paragraphUz }}
            ></div>
          </div>
        ) : (
          <div className="blog-half-text changingText">
            <div
              dangerouslySetInnerHTML={{ __html: blogNewsData.parapraphKr }}
            ></div>
          </div>
        )}
      </div>

      <div className="blog-fourth-text changingText"></div>

      <div className="blog-bottom-icons">
        <div className="blog-bottom-icons-wrapper">
          <a
            href="https://www.youtube.com/channel/UCmmg6hT60gJ3I5i0BOYSoog"
            className="home-youTubeIcon"
          >
            <AiFillYoutube className="home-dot-icon" color="white" />
          </a>
          <a href="https://t.me/Xolis_nazar" className="blog-top-telegramIcon">
            <FaTelegramPlane className="home-dot-icon" color="white" />
          </a>
          <a
            href="https://www.facebook.com/Xolis-Nazar-104958581725934/?ref=pages_you_manage"
            className="blog-top-facebookIcon"
          >
            <FaFacebookF className="home-dot-icon" color="white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogTextPart;
