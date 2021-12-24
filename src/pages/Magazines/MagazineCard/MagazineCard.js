import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import indexConfig from "../../../config/indexConfig";
import IndexContext from "../../../indexContect";
import { useTranslation } from "react-i18next";
import { base64encode } from "nodejs-base64";
import "./MagazineCard.css";
function MyVerticallyCenteredModal(props) {
  const { magazineData } = useContext(IndexContext);
  const { t } = useTranslation();
  const history = useHistory();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setFullName("");
    setPhone("");
    setAddress("");
  };

  //Post => posts new bill
  const postPaymentBill = async () => {
    let magazineSubscriptionType;
    var paymentType = document.getElementsByName("paymentType");
    for (var i = 0; i < paymentType.length; i++) {
      if (paymentType[i].checked) {
        magazineSubscriptionType = paymentType[i].value;
      }
    }
    let paymentAmountData = parseFloat(magazineData.paymentAmount);
    await indexConfig
      .post("/createNewspaperBill", {
        newspaperid: magazineData._id,
        caption: magazineData.newspaperTitle,
        type: magazineData.type,
        fullname: fullName,
        address: address,
        phone: phone,
        paymentAmount: paymentAmountData,
        paymentMethod: magazineSubscriptionType,
      })
      .then((res) => {
        const paymeEncode = base64encode(
          `m=61371681c517ef555a8af3c2;ac.check_id=${res.data.savedBill._id};a=${res.data.savedBill.paymentAmount}00;c=http://xolisnazar.uz`
        );
        if (
          res.data.message === "Bill was saved" &&
          res.data.savedBill.paymentMethod === "Click"
        ) {
          window.location.assign(
            `https://my.click.uz/services/pay?service_id=18769&merchant_id=13404&amount=${res.data.savedBill.paymentAmount}&transaction_param=${res.data.savedBill._id}&return_url=http://xolisnazar.uz`
          );
        } else if (
          res.data.message === "Bill was saved" &&
          res.data.savedBill.paymentMethod === "Payme"
        ) {
          window.location.assign(
            `https://checkout.paycom.uz/${paymeEncode}`
          );
        } else {
          history.push("/");
        }
      });
  };
  return (
    <Modal
      className="magazine-modal-container"
      contentClassName="magazine-modal-content"
      {...props}
      size="lg"
      centered
    >
      <Modal.Body>
        <div className="magazine-modal-wrapper">
          <div className="magazine-modal-titleDiv">
            <div className="magazine-modal-title changingText">
              {t("magazine-modal-top-title")}
            </div>
            <div className="magazine-modal-X" onClick={props.onHide}>
              <i class="fal fa-times changingText"></i>
            </div>
          </div>
          <div>
            <form onSubmit={submitHandler} className="magazine-modal-form">
              <input
                required
                onChange={(e) => setFullName(e.target.value)}
                className="changingText"
                type="text"
                placeholder={t("magazine-modal-input-f_i_sh")}
                value={fullName}
              />
              <input
                required
                onChange={(e) => setAddress(e.target.value)}
                className="changingText"
                type="text"
                placeholder={t("magazine-modal-input-manzil")}
                value={address}
              />
              <input
                required
                onChange={(e) => setPhone(e.target.value)}
                className="changingText"
                type="text"
                placeholder={t("magazine-modal-input-tel-num")}
                value={phone}
              />
              <input
                value={magazineData.paymentAmount}
                className="changingText"
                type="text"
                placeholder={t("magazine-modal-input-tolov-summasi")}
              />
              {/* --------------------------- */}
              <div className="magazine-tolov-modal-wrap">
                <div className="magazine-tolov-modal-title">
                  {t("magazine-modal-tolov-type")}
                </div>
                <form className="modal-magazine-form-payme" action="">
                  <input
                    required
                    className="modal-magazine-input"
                    type="radio"
                    id="payme"
                    name="paymentType"
                    value="Payme"
                  />
                  <label className="modal-magazine-label" htmlFor="payme">
                    Payme
                  </label>
                  <input
                    required
                    className="modal-magazine-input"
                    type="radio"
                    id="click"
                    name="paymentType"
                    value="Click"
                  />
                  <label className="modal-magazine-label" htmlFor="click">
                    Click
                  </label>
                </form>
              </div>
              {/* --------------------------- */}
              <button
                type="submit"
                onClick={postPaymentBill}
                className="magazine-bootom-btn changingText"
              >
                Oldinga
              </button>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const MagazineCard = (props) => {
  const { setMagazineData } = useContext(IndexContext);
  const [modalShow, setModalShow] = React.useState(false);

  const { t } = useTranslation();

  const magazineButton = (data) => {
    setModalShow(true);
    setMagazineData(data);
  };
  return (
    <div className="magazine-card-container">
      <div className="magazine-card-title changingText">{props.cardTitle}</div>
      <div className="magazine-card-image-wrap">
        <img
          className="magazine-card-img"
          src={props.cardImage}
          alt="magazine"
        />
      </div>
      <button
        onClick={() => magazineButton(props.data)}
        className="magazine-card-button changingText"
      >
        {t("magazine-download-btn")}
      </button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default MagazineCard;
