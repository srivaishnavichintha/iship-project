import React, { useState } from "react";
import "./Peer2peer.css";
import Student_navbar from "../Student_navabar";

const Peer2peer = () => {
  const [view, setView] = useState("history");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const contests = [
    { name: "Array Showdown", date: "2025-07-15", course: "DSA", status: "Won" },
    { name: "String Sprint", date: "2025-07-20", course: "DSA", status: "Lost" },
    { name: "React Duel", date: "2025-07-10", course: "Frontend", status: "Won" },
    { name: "Flex Grid Fight", date: "2025-07-27", course: "Frontend", status: "Virtual" },
  ];

  const filteredContests = contests.filter((c) => {
    const courseMatch = courseFilter === "All" || c.course === courseFilter;
    const statusMatch = statusFilter === "All" || c.status === statusFilter;
    const dateMatch = !dateFilter || c.date === dateFilter;
    return courseMatch && statusMatch && dateMatch;
  });

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
      <Student_navbar />
      <div className="peer-to-peer-container">
        <div className="view-toggle">
          <button
            className={view === "history" ? "active" : ""}
            onClick={() => setView("history")}
          >
            History
          </button>
          <button
            className={view === "invite" ? "active" : ""}
            onClick={() => setView("invite")}
          >
            Invite
          </button>
        </div>

        {view === "history" ? (
          <>
            <h2>Peer-to-Peer Contest History</h2>
            <div className="filters">
              <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
                <option value="All">All Courses</option>
                <option value="DSA">DSA</option>
                <option value="Frontend">Frontend</option>
              </select>

              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
                <option value="Virtual">Virtual</option>
              </select>
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
            <button className="btn invite" onClick={() => setView("invite")}>
              Invite Peers
            </button>
          </>
        ) : (
          <>
            <h2>Invite Peers</h2>
            <div className="course-picker">
              <label>Select Course: </label>
              <select
                onChange={(e) => setSelectedCourse(e.target.value)}
                value={selectedCourse}
              >
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
                <button className="btn back-btn" onClick={() => setView("history")}>
                  ← Back
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Peer2peer;
