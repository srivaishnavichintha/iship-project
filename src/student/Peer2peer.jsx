import React, { useState } from "react";
import "./Peer2peer.css";
import Student_navbar from "../Student_navabar";

const Peer2peer = () => {
  const [view, setView] = useState("history");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [inviteCourseFilter, setInviteCourseFilter] = useState("All");

  const contests = [
    { name: "Array Showdown", date: "2025-07-15", course: "DSA", status: "Won" },
    { name: "String Sprint", date: "2025-07-20", course: "DSA", status: "Lost" },
    { name: "React Duel", date: "2025-07-10", course: "Frontend", status: "Won" },
    { name: "Flex Grid Fight", date: "2025-07-27", course: "Frontend", status: "Virtual" },
  ];

  const peersByCourse = {
    DSA: [
      { name: "Ravi Kumar", points: 130, contests: 12, course: "DSA" },
      { name: "Pooja Sharma", points: 145, contests: 15, course: "DSA" },
    ],
    Frontend: [
      { name: "Kiran Patil", points: 120, contests: 8, course: "Frontend" },
      { name: "Meena Joshi", points: 110, contests: 10, course: "Frontend" },
    ],
    Algorithms: [
      { name: "Amit Singh", points: 150, contests: 20, course: "Algorithms" },
      { name: "Priya Patel", points: 125, contests: 18, course: "Algorithms" },
    ]
  };

  const currentUser = { name: "You", level: 2, points: 135, nextLevel: 150 };

  // Filter contests for history view
  const filteredContests = contests.filter((c) => {
    const courseMatch = courseFilter === "All" || c.course === courseFilter;
    const statusMatch = statusFilter === "All" || c.status === statusFilter;
    const dateMatch = !dateFilter || c.date === dateFilter;
    return courseMatch && statusMatch && dateMatch;
  });

  // Filter peers for invite view
  const filteredPeers = inviteCourseFilter === "All" 
    ? Object.values(peersByCourse).flat() 
    : peersByCourse[inviteCourseFilter] || [];

  return (
    <>
      <Student_navbar />
      <div className="peer-to-peer-container">
        <div className="header-section">
          <h2>{view === "history" ? "Peer-to-Peer Contest History" : "Invite Peers"}</h2>
          <button 
            className="btn toggle-view-btn"
            onClick={() => setView(view === "history" ? "invite" : "history")}
          >
            {view === "history" ? "Invite Peers" : "View History"}
          </button>
        </div>

        {view === "history" ? (
          <>
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

            <div className="table-wrapper">
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
                      <td className="name-cell">{c.name}</td>
                      <td>{c.date}</td>
                      <td>{c.course}</td>
                      <td className={`status ${c.status.toLowerCase()}`}>
                        <span className="status-badge">{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="status-summary">
              <div className="progress-info">
                <span>🎯 Your Points: {currentUser.points}</span>
                <span>🎉 Next Level: {currentUser.nextLevel} pts</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentUser.points / currentUser.nextLevel) * 100}%` }}
                ></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="filters">
              <select 
                value={inviteCourseFilter} 
                onChange={(e) => setInviteCourseFilter(e.target.value)}
              >
                <option value="All">All Courses</option>
                {Object.keys(peersByCourse).map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div className="table-wrapper">
              <table className="peer-list-table">
                <thead>
                  <tr>
                    <th>Peer Name</th>
                    <th>Points</th>
                    <th>Contests</th>
                    <th>Course</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPeers.map((peer, index) => (
                    <tr key={index}>
                      <td className="name-cell">{peer.name}</td>
                      <td>{peer.points} pts</td>
                      <td>{peer.contests}</td>
                      <td>{peer.course}</td>
                      <td>
                        <button className="btn invite-btn">Invite</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Peer2peer;