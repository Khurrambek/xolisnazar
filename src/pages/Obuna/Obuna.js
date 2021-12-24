import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Obuna.css";
import indexhttp from "../../config/indexConfig";
import { Link, useHistory } from "react-router-dom";

const Obuna = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("xolisnazar@mail.ru");
  const [phone, setPhone] = useState("");
  const [checkbox1, setCheckbox1] = useState("");
  const [checkbox2, setCheckbox2] = useState("");
  const [checkbox3, setCheckbox3] = useState("");
  const [checkbox4, setCheckbox4] = useState("");
  const [checkbox5, setCheckbox5] = useState("");
  const [checkbox6, setCheckbox6] = useState("");
  const [checkbox7, setCheckbox7] = useState("");
  const [checkbox8, setCheckbox8] = useState("");
  const [checkbox9, setCheckbox9] = useState("");
  const [checkbox10, setCheckbox10] = useState("");
  const [checkbox11, setCheckbox11] = useState("");
  const [checkbox12, setCheckbox12] = useState("");

  const history = useHistory();

  let month = [
    checkbox1,
    checkbox2,
    checkbox3,
    checkbox4,
    checkbox5,
    checkbox6,
    checkbox7,
    checkbox8,
    checkbox9,
    checkbox10,
    checkbox11,
    checkbox12,
  ];

  let paymentMonth = [];
  for (let i = 0; i <= 11; i++) {
    if (month[i] !== "") {
      paymentMonth.push(month[i]);
    }
  }

  let paymentAmount = 0;
  const submitSubscription = (e) => {
    e.preventDefault();
    setName("");
    setSurName("");
    setAddress("");
    setEmail("");
    setPhone("");
    paymentAmount = 0;
  };
  var subscriptionType;
  var subType = document.getElementsByName("subscription");
  for (var i = 0; i < subType.length; i++) {
    if (subType[i].checked) {
      subscriptionType = subType[i].value;
    }
  }
  if (subscriptionType === "Journal") {
    paymentAmount = paymentMonth.length * 33000;
  } else {
    paymentAmount = paymentMonth.length * 50000;
  }
  let obunaSubscriptionType;
  const postSubscription = () => {
    var paymentTypeObuna = document.getElementsByName("paymentTypeObuna");
    for (var i = 0; i < paymentTypeObuna.length; i++) {
      if (paymentTypeObuna[i].checked) {
        obunaSubscriptionType = paymentTypeObuna[i].value;
      }
    }
    indexhttp
      .post("/createSubsBill", {
        firstname: name,
        surname: surName,
        address: address,
        email: email,
        phone: phone,
        type: subscriptionType,
        subscriptionMonths: paymentMonth.toString(),
        amount: paymentAmount,
        paymentMethod: obunaSubscriptionType,
      })
      .then((res) => {
        if (
          res.data.message === "Bill was saved" &&
          res.data.savedBill.paymentMethod === "Click"
        ) {
          window.location.assign(
            `https://my.click.uz/services/pay?service_id=18769&merchant_id=13404&amount=${res.data.savedBill.amount}&transaction_param=${res.data.savedBill._id}&return_url=http://xolisnazar.uz`
          );
        } else if (
          res.data.message === "Bill was saved" &&
          res.data.savedBill.paymentMethod === "Payme"
        ) {
          window.location.assign(
            `https://checkout.paycom.uz/base64(m=61371681c517ef555a8af3c2;ac.check_id=${res.data.savedBill._id};a=${res.data.savedBill.amount})`
          );
        } else {
          history.push("/");
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="obuna-full-container">
        <div className="obuna-wrapper">
          <div className="obuna-backgroun-image">
            <div>{t("obuna_title")}</div>
          </div>
          <div className="obuna-secondPart-container">
            <div className="obuna-secondPart-wrapper">
              <form onSubmit={submitSubscription}>
                <div className="obuna-title-div">
                  <div className="obuna-secondPart-title changingText">
                    {t("obuna_enter_title")}
                  </div>
                  <p className="changingText">{t("obuna_text-info")}</p>{" "}
                  <a
                    href="./contract.pdf"
                    className="fs-4 text-info "
                    target="_blank"
                    download
                  >
                    {t("download_btn")}
                  </a>
                </div>
                <div className="obuna-input-div">
                  <div className="obuna-secondPart-title text-center changingText">
                    {t("obuna_enter")}{" "}
                  </div>
                  <form
                    // onSubmit={submitSubscription}
                    className="obuna-input-form"
                    action=""
                    method="post"
                  >
                    <input
                      required
                      className="changingText"
                      placeholder={t("obuna_input_name")}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      value={name}
                    />
                    <input
                      required
                      className="changingText"
                      placeholder={t("obuna_input_last-name")}
                      onChange={(e) => setSurName(e.target.value)}
                      type="text"
                      value={surName}
                    />
                    <input
                      required
                      className="changingText"
                      placeholder={t("obuna_input_address")}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      value={address}
                    />
                    <input
                      required
                      className="obuna-input-inputBottom0 changingText"
                      placeholder={t("obuna_input_number")}
                      type="number"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                  </form>
                </div>
                <div className="obuna-turi-wrapper">
                  <div className="obuna-turi-title-obuna">
                    {t("obuna_type_opt")}
                  </div>
                  <br />
                  <form onSubmit={submitSubscription} action="">
                    <input
                      required
                      className="obuna-input"
                      type="radio"
                      id="gazeta"
                      name="subscription"
                      value="Gazeta"
                    />
                    <label className="obuna-label-newspaper" htmlFor="gazeta">
                      {t("obuna_typeG")}
                    </label>
                    <input
                      required
                      className="obuna-input"
                      type="radio"
                      id="jurnal"
                      name="subscription"
                      value="Journal"
                    />
                    <label className="obuna-label-newspaper" htmlFor="jurnal">
                      {t("obuna_typeJ")}
                    </label>
                  </form>
                </div>
                {/* ------------------------------------------------------------- */}
                <div className="obuna-obunaOyi-div">
                  <div className="obuna-obunaOyi-title changingText">
                    {t("obuna_months")}
                  </div>
                  <form
                    onSubmit={submitSubscription}
                    className="obuna-btnsInput-container"
                    action=""
                    method="post"
                  >
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-1"
                      onChange={() => {
                        if (checkbox1 === "") {
                          setCheckbox1("yanvar");
                        } else {
                          setCheckbox1("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-1">
                      {t("obuna_month-jan")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-2"
                      onChange={() => {
                        if (checkbox2 === "") {
                          setCheckbox2("fevral");
                        } else {
                          setCheckbox2("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-2">
                      {t("obuna_month-feb")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-3"
                      onChange={() => {
                        if (checkbox3 === "") {
                          setCheckbox3("mart");
                        } else {
                          setCheckbox3("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-3">
                      {t("obuna_month-mar")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-4"
                      onChange={() => {
                        if (checkbox4 === "") {
                          setCheckbox4("aprel");
                        } else {
                          setCheckbox4("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-4">
                      {t("obuna_month-apr")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-5"
                      onChange={() => {
                        if (checkbox5 === "") {
                          setCheckbox5("may");
                        } else {
                          setCheckbox5("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-5">
                      {t("obuna_month-may")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-6"
                      onChange={() => {
                        if (checkbox6 === "") {
                          setCheckbox6("iyun");
                        } else {
                          setCheckbox6("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-6">
                      {t("obuna_month-jun")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-7"
                      onChange={() => {
                        if (checkbox7 === "") {
                          setCheckbox7("iyul");
                        } else {
                          setCheckbox7("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-7">
                      {t("obuna_month-jly")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-8"
                      onChange={() => {
                        if (checkbox8 === "") {
                          setCheckbox8("avgust");
                        } else {
                          setCheckbox8("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-8">
                      {t("obuna_month-aug")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-9"
                      onChange={() => {
                        if (checkbox9 === "") {
                          setCheckbox9("sentabr");
                        } else {
                          setCheckbox9("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-9">
                      {t("obuna_month-sep")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-10"
                      onChange={() => {
                        if (checkbox10 === "") {
                          setCheckbox10("oktabr");
                        } else {
                          setCheckbox10("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-10">
                      {t("obuna_month-oct")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-11"
                      onChange={() => {
                        if (checkbox11 === "") {
                          setCheckbox11("noyabr");
                        } else {
                          setCheckbox11("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-11">
                      {t("obuna_month-nov")}
                    </label>
                    <input
                      required
                      type="checkbox"
                      className="obunaInputBtn"
                      name="rate"
                      id="rate-12"
                      onChange={() => {
                        if (checkbox12 === "") {
                          setCheckbox12("dekabr");
                        } else {
                          setCheckbox12("");
                        }
                      }}
                    />
                    <label className="obunaLabelBtn changingText" for="rate-12">
                      {t("obuna_month-dec")}
                    </label>
                  </form>
                </div>
                <div className="obuna-umumiy-hisob">
                  <h1 className="changingText">{t("obuna_total_cost")}:</h1>
                  <h6 className="changingText">
                    {paymentAmount} {t("obuna_total_price")}
                  </h6>
                </div>
                {/* ---------------------------------------------------------- */}
                <div className="obuna-obuna-tolov-title">
                  {t("magazine-modal-tolov-type")}
                </div>
                <form className="obuna-form-payme" action="">
                  <input
                    required
                    className="obuna-payment-input"
                    type="radio"
                    id="payme"
                    name="paymentTypeObuna"
                    value="Payme"
                  />
                  <label className="obuna-payment-label" htmlFor="payme">
                    Payme
                  </label>
                  <input
                    required
                    className="obuna-payment-input"
                    type="radio"
                    id="click"
                    name="paymentTypeObuna"
                    value="Click"
                  />
                  <label className="obuna-payment-label" htmlFor="click">
                    Click
                  </label>
                </form>
                {/* ---------------------------------------------------------- */}
                <button
                  onClick={postSubscription}
                  className="obuna-bottom-btn changingText"
                  type="submit"
                >
                  {t("obuna_button")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Obuna;
