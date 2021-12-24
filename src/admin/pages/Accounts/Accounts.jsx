import React, { useState } from "react";
import http from "../../../config/adminConfig";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import "./accounts.css";
import AccountBarChart from "./AccountBarChart/AccountBarChart";

const Accounts = () => {
  const [fullNameValue, setfullNameValue] = useState("");
  const [phoneNumberValue, setphoneNumberValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setpasswordvalue] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const getNameHandler = (e) => {
    setfullNameValue(e.target.value);
  };
  const getNumberHandler = (e) => {
    setphoneNumberValue(e.target.value);
  };
  const getEmailHandler = (e) => {
    setEmailValue(e.target.value);
  };
  const getPasswordHandler = (e) => {
    setpasswordvalue(e.target.value);
  };
  const getSecondPasswordHandler = (e) => {
    setSecondPassword(e.target.value);
  };

  //validation
  if (secondPassword !== passwordValue) {
  }

  const submitNewAccountHandler = (e) => {
    e.preventDefault();

    setfullNameValue("");
    setphoneNumberValue("");
    setEmailValue("");
    setpasswordvalue("");
    setSecondPassword("");
  };

  const postUser = async () => {
    return await http.post("/signUp", {
      fullname: fullNameValue,
      phone: phoneNumberValue,
      email: emailValue,
      password: passwordValue,
    });
  };

  return (
    <>
      <section className="banner-section">
        <div
          className="banner-wrapper"
          style={{ backgroundImage: "url(assets/accounts/Rectangle.png)" }}
        >
          <div className="account-info">
            <div className="circle-img">
              <img src="assets/weather/user2.jpg" alt="Admin" />
              <h3 className="fs-4">Account Name</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="row account-card-section">
        <div className="col-md-3 account-stats">
          <div className="account-stats-card">
            <div className="account-stats-icon">
              <img src="assets/dashboard/people.png" alt="Admin rounded" />
            </div>
            <div className="account-stats-number">
              <h4>92.7k</h4>
              <p>Sizning yangiliklaringiz</p>
            </div>
            <div className="account-stats-chart">
              <img src="assets/accounts/chart.png" alt="Chart" />
            </div>
          </div>
        </div>
        <div className="col-md-3 account-stats">
          <div className="account-stats-card">
            <div className="account-stats-icon bg-orange">
              <AiOutlineEye />
            </div>
            <div className="account-stats-number">
              <h4>92.7k</h4>
              <p>Sizning yangiliklaringiz</p>
            </div>
            <div className="account-stats-chart">
              <img src="assets/accounts/chart-2.png" alt="chart-2" />
            </div>
          </div>
        </div>

        <div className="col-md-6 account-edit-wrapper">
          <form
            onSubmit={submitNewAccountHandler}
            action=""
            className="account-edit-form"
          >
            <h3 className="fs-4 pb-2">Ma'lumotlar</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="account-form-group">
                  <input
                    className="account-form-control form-control"
                    type="text"
                    placeholder="Full Name"
                    value={fullNameValue}
                    onChange={getNameHandler}
                  />
                  <span className="account-control-icon">
                    <AiOutlineEdit />
                  </span>
                </div>
                <div className="account-form-group">
                  <input
                    className="account-form-control form-control"
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumberValue}
                    onChange={getNumberHandler}
                  />
                  <span className="account-control-icon">
                    <AiOutlineEdit />
                  </span>
                </div>
                <div className="account-form-group">
                  <input
                    className="account-form-control form-control"
                    type="email"
                    placeholder="Email"
                    value={emailValue}
                    onChange={getEmailHandler}
                  />
                  <span className="account-control-icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="account-form-group">
                  <input
                    className="account-form-control form-control"
                    type="text"
                    placeholder="Password"
                    value={passwordValue}
                    onChange={getPasswordHandler}
                  />
                  <span className="account-control-icon">
                    <AiOutlineEdit />
                  </span>
                </div>
                <div className="account-form-group">
                  <input
                    className="account-form-control form-control"
                    type="text"
                    placeholder="Re-enter password"
                    value={secondPassword}
                    onChange={getSecondPasswordHandler}
                  />
                  <span className="account-control-icon">
                    <AiOutlineEdit />
                  </span>
                </div>

                <button
                  onClick={postUser}
                  type="submit"
                  className="btn btn-dark px-4 py-2 w-100"
                >
                  {" "}
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="row account-chart-section">
        <div className="col-md-8 account-chart-wrapper">
          <div className="account-chart">
            <div className="row top">
              <div className="col-md-6">
                <div className="month">
                  <h3 className=" fs-4 month-number">2.5k</h3>
                  <p className="month-name m-0">Avg sessions:</p>
                </div>
                <p className="change m-1">
                  <span className="change-difference">+5.3%</span> vs last 7
                  days
                </p>
              </div>
              <div className="col-md-6">
                <select
                  name=""
                  id=""
                  className="form-select account-chart-select"
                >
                  <option value="1">7 days</option>
                  <option value="2">14 days</option>
                  <option value="3">21 days</option>
                  <option value="4">30 days</option>
                </select>
                <div className="account-chart">
                  <AccountBarChart />
                </div>
              </div>
            </div>
            <div className="row account-range">
              <div className="col-md-6">
                <div className="account-progress">
                  <p className="my-1">Obuna: $5500</p>
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{ width: " 25%", background: "#7467F0" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="account-progress">
                  <p className="my-1">Retention: 90%</p>
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{ width: " 90%", background: "#FA678E" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="account-progress">
                  <p className="my-1">Users: 100k</p>
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{ width: " 45%", background: "#FF9F43" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="account-progress">
                  <p className="my-1">Duration: 1 year</p>
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{ width: " 65%", background: "#28C76F" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 account-new-user-wrapper">
          <div className="account-new-user">
            <h3>New User</h3>
            <form action="" className="account-new-user-form">
              <div className="new-user-form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input type="email" className="form-control" />
              </div>
              <div className="new-user-form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" />
              </div>
              <div className="new-user-form-group">
                <label htmlFor="password" className="form-label">
                  Re-enter password
                </label>
                <input type="password" className="form-control" />
              </div>
              <div className="new-user-form-group">
                <button type="submit" className="btn btn-dark w-100">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Accounts;
