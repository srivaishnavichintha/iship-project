import React, { useState } from "react";
import "./Peer2peer.css";
import Student_navbar from "../Student_navabar";

const PeerToPeer = () => {
  const [view, setView] = useState("history"); // "history" or "invite"
  const [selectedCourse, setSelectedCourse] = useState("");

  const contests = [
    { name: "Array Showdown", date: "2025-07-15", course: "DSA", status: "Won" },
    { name: "String Sprint", date: "2025-07-20", course: "DSA", status: "Lost" },
    { name: "React Duel", date: "2025-07-10", course: "Frontend", status: "Won" },
  ];

  const filteredContests = contests; // Apply filter logic if needed

  const peersByCourse = {
    DSA: [
      { name: "Ravi Kumar", points: 130 },
      { name: "Pooja Sharma", points: 145 },
    ],
    Frontend: [
      { name: "Kiran Patil", points: 120 },
      { name: "Meena Joshi", points: 110 },
    ],
  };

  const currentUser = { name: "You", level: 2, points: 135, nextLevel: 150 };

  return (
    <>
    <Student_navbar/>
    <div className="peer-to-peer-container">
      {view === "history" ? (
        <>
          <h2>Peer-to-Peer Contest History</h2>
          <div className="filters">
            <select>
              <option>All Courses</option>
              <option>DSA</option>
              <option>Frontend</option>
            </select>
            <input type="date" />
          </div>
          <table className="contest-history-table">
            <thead>
              <tr>
                <th>Contest Name</th>
                <th>Date</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredContests.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.name}</td>
                  <td>{c.date}</td>
                  <td>{c.course}</td>
                  <td className={c.status.toLowerCase()}>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="status-summary">
            <p>🎯 Your Points: {currentUser.points}</p>
            <p>🎉 Next Level: {currentUser.nextLevel} pts</p>
          </div>
          <button className="btn invite" onClick={() => setView("invite")}>Invite Peers</button>
        </>
      ) : (
        <>
          <h2>Invite Peers</h2>
          <div className="course-picker">
            <label>Select Course: </label>
            <select onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">-- Choose --</option>
              {Object.keys(peersByCourse).map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div className="invite-section">
              <h3>Invite Peers from {selectedCourse}</h3>
              <ul className="peer-list">
                {peersByCourse[selectedCourse].map((peer, index) => (
                  <li key={index}>
                    <span>{peer.name}</span>
                    <span className="points">{peer.points} pts</span>
                    <button className="btn invite-btn">Invite</button>
                  </li>
                ))}
              </ul>
              <button className="btn back-btn" onClick={() => setView("history")}>← Back</button>
            </div>
          )}
        </>
      )}
    </div>
    </>
  );
};

export default PeerToPeer;
