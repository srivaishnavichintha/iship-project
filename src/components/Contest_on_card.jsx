import React from "react";
import "./Contest_on_card.css";
import image from "../assets/contest.jpeg"

export default function Contest_on_card({ title, dateTime, countdown }) {
  return (
    <div className="lcv-card">
      <div className="lcv-image-container">
        <img
          src={image}
          alt="contest banner"
          className="lcv-image"
        />
        <div className="lcv-countdown">
          <i className="fa-regular fa-clock"></i>&nbsp;
          Starts in {countdown}
        </div>
      </div>
      <div className="lcv-details">
        <div className="lcv-title">{title}</div>
        <div className="lcv-time">{dateTime}</div>
      </div>
    </div>
  );
}
