import React, { useState } from "react";
import "./loginPage.css";
import { AiFillEye, RiEyeCloseFill } from "react-icons/all";
import http from "../../../config/adminConfig";
import { useHistory } from "react-router";
import { useContext } from "react";
import IndexContext from "../../../indexContect";

const LoginPage = () => {
  const { setRefresh, refresh } = useContext(IndexContext);
  const history = useHistory();
  const [isVisibility, setvisibility] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const handleClick = () => {
    setvisibility(!isVisibility);
  };

  const passwordInput = (event) => {
    setPasswordValue(event.target.value);
  };

  const emailInput = (event) => {
    setEmailValue(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setEmailValue("");
    setPasswordValue("");
  };

  const getToken = async () => {
    return await http
      .post("/signIn", {
        email: emailValue,
        password: passwordValue,
      })
      .then((res) =>
        localStorage.setItem("token", JSON.stringify(res.data.token))
      )
      .then(() => {
        let dataToken = JSON.parse(localStorage.getItem("token"));
        dataToken ? history.push("/admin") : console.log("hello");
        setRefresh(!refresh);
      });
  };

  return (
    <div className="login">
      <h3 className="login-heading">Sign in to admin panel</h3>
      <div className="login-form">
        <form onSubmit={submitHandler}>
          <div className="login-form-group">
            <label htmlFor="Email" className="form-label login-form-label">
              E-Mail
            </label>
            <input
              type="text"
              className="login-form-control form-control"
              placeholder="Your Email"
              value={emailValue}
              onChange={emailInput}
            />
            <div id="emailHelp" className="login-form-text form-text">
              Please, enter a valid e-mail address
            </div>
          </div>
          <div className="login-form-group form-password">
            <label htmlFor="password" className="form-label login-form-label">
              Password
            </label>
            <input
              type={isVisibility ? "text" : "password"}
              value={passwordValue}
              name=""
              id=""
              className="login-form-control form-control"
              placeholder="Your password"
              onChange={passwordInput}
            />
            <div className="login-icons">
              <AiFillEye
                className={`icon ${
                  isVisibility ? "active-show" : "active-hidden"
                }`}
                onClick={handleClick}
              />
              <RiEyeCloseFill
                className={`icon ${
                  isVisibility ? "active-hidden" : "active-show"
                }`}
                onClick={handleClick}
              />
            </div>
          </div>
          <div className="login-form-group">
            <label htmlFor="keep me" className="form-label">
              <input type="checkbox" name="" id="" />{" "}
              <small className="text-muted login-form-label">
                Keep me signed in
              </small>
            </label>
          </div>

          <button onClick={getToken} type="submit" className="submitBtn btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
