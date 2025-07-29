import React, { useState } from "react";
import "./StudentContest.css";
import Student_navabar from "../Student_navabar";
import trophy from "../assets/trophy.png";
import Past_contests from "../components/Past_contests";
import Mycontest from "../components/Mycontest";
import Contest_on_card from "../components/Contest_on_card";

export default function StudentContest() {
  const [activeTab, setActiveTab] = useState("past");

  return (
    <>
      <Student_navabar />
      <div className="contest-wrapper">
        <div className="header-section">
          <img src={trophy} className="trophy-img" alt="Trophy" />
          <h1><span className="contest">Contest</span></h1>
          <p className="subheading">Compete every possiable minute. Compete and see your ranking!</p>
        </div>

        {/* 📦 Contest Card Display */}
        <div className="card-container">
          <Contest_on_card
            image="https://cdn.pixabay.com/photo/2017/05/23/22/36/banner-2337081_1280.jpg"
            title="JS Weekly Challenge"
            countdown="1h 24m"
            status="Ends in"
            mentor="Suresh R"
            level="Intermediate"
          />
        </div>

        {/* 🧭 Tab Switcher */}
        <div className="tab-buttons">
          <button
            className={activeTab === "past" ? "active" : ""}
            onClick={() => setActiveTab("past")}
          >
            Past Contests
          </button>
          <button
            className={activeTab === "my" ? "active" : ""}
            onClick={() => setActiveTab("my")}
          >
            My Contests
          </button>
        </div>

        {/* 🔄 Tab Content */}
        <div className="tab-content">
          {activeTab === "past" ? <Past_contests /> : <Mycontest />}
        </div>
      </div>
    </>
  );
}
