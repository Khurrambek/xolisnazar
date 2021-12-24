import React from 'react';
import {Link} from 'react-router-dom';
import "./BottomCard.css";

const BottomCard = (props) => {
  return (
    <>
      <Link to='/' className="BottomCard">
        <div className="BottomCard-img-wrapper">
          <img src={props.img} alt="img" />
        </div>
        <div className="BottomCardBody">
          <h3 className="changingText">{props.title}</h3>
          <p className="changingText">{props.author} - {props.date}</p>
        </div>
      </Link>
    </>
  )
}

export default BottomCard
