import React, { useState } from "react";
import "./StudentContest.css";
import Student_navabar from "../Student_navabar";
import trophy from "../assets/trophy.png";

export default function StudentContest() {
  const [activeTab, setActiveTab] = useState("past");

  const pastContests = [
    { id: 1, name: "Weekly Contest 460", date: "Jul 27, 2025 8:00 AM GMT+5:30", type: "regular" },
    { id: 2, name: "Weekly Contest 459", date: "Jul 20, 2025 8:00 AM GMT+5:30", type: "regular" },
    { id: 3, name: "Biweekly Contest 161", date: "Jul 19, 2025 8:00 PM GMT+5:30", type: "regular" },
    { id: 4, name: "Weekly Contest 458", date: "Jul 17, 2025 8:00 PM GMT+5:30", type: "regular" },
    { id: 5, name: "Virtual Contest", date: "Jul 18, 2025 8:00 PM GMT+5:30", type: "virtual" },
    { id: 6, name: "Virtual Contest", date: "Jul 19, 2025 8:00 PM GMT+5:30", type: "virtual" }
  ];

  return (
    <>
      <Student_navabar />
      <div className="contest-container">
        {/* Header Section */}
        <div className="contest-header">
  <div className="header-content">
    <div className="trophy-container">
      <img src={trophy} alt="Trophy" className="trophy-icon" />
      <div className="trophy-glow"></div>
    </div>
    <h1 className="contest-title">Contest</h1>
    <p className="contest-subtitle">
      Compete every possible minute. Compete and see your ranking!
    </p>
  </div>
</div>

        {/* Tab Navigation */}
        <div className="contest-tabs">
          <button
            className={`tab-button ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past Contests
          </button>
          <button
            className={`tab-button ${activeTab === "my" ? "active" : ""}`}
            onClick={() => setActiveTab("my")}
          >
            My Contests
          </button>
        </div>

        {/* Contest List */}
        <div className="contest-list">
          {pastContests.map((contest) => (
            <div key={contest.id} className={`contest-item ${contest.type}`}>
              <div className="contest-info">
                <h3 className="contest-name">{contest.name}</h3>
                <p className="contest-date">{contest.date}</p>
              </div>
              <div className="contest-status">
                {contest.type === "virtual" && (
                  <span className="virtual-badge">Virtual</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}