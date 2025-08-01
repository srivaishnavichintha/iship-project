import React, { useState, useEffect } from "react";
import "./Peer2peer.css";
import Student_navbar from "../Student_navabar";

const Peer2peer = () => {
  const [view, setView] = useState("history");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [inviteCourseFilter, setInviteCourseFilter] = useState("All");
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [inviteDateTime, setInviteDateTime] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [contests, setContests] = useState([]);
  const [filteredPeers, setFilteredPeers] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const studentid = userData?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/courses/student/${studentid}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setAllCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/history/${studentid}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setContests(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    if (studentid) {
      fetchCourses();
      fetchHistory();
    }
  }, [studentid]);

  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/peers/${inviteCourseFilter}/${studentid}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setFilteredPeers(data);
      } catch (error) {
        console.error("Error fetching peers:", error);
      }
    };

    if (view === "invite" && inviteCourseFilter !== "All") {
      fetchPeers();
    } else {
      setFilteredPeers([]);
    }
  }, [inviteCourseFilter, view]);

  const handleInviteClick = (peer) => {
    setSelectedPeer(peer);
    setIsFormOpen(true);
  };

  const handleSendInvite = async () => {
    if (!inviteDateTime) {
      alert("Please select date and time");
      return;
    }

    const payload = {
      challengerId: studentid,
      opponentId: selectedPeer.id,
      course: selectedPeer.course,
      datetime: inviteDateTime,
    };

    try {
      const response = await fetch("http://localhost:3000/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(response);
      if (response.ok) {
        alert(`Invite successfully sent to ${selectedPeer.name}`);
      } else {
        alert("Failed to send invite");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
    }

    setIsFormOpen(false);
    setSelectedPeer(null);
    setInviteDateTime("");
  };

  const handleCancelInvite = () => {
    setIsFormOpen(false);
    setSelectedPeer(null);
    setInviteDateTime("");
  };

  const filteredContests = contests.filter((c) => {
    const courseMatch = courseFilter === "All" || c.course === courseFilter;
    const statusMatch = statusFilter === "All" || c.status === statusFilter;
    const dateMatch = !dateFilter || c.date === dateFilter;
    return courseMatch && statusMatch && dateMatch;
  });

  return (
    <>
      <Student_navbar />
      <div className="peer-container">
        <header className="peer-header">
          <div className="header-content">
            <h1 className="peer-title">
              {view === "history" ? "Peer2peer Battleground" : "Peer Challenges"}
            </h1>
            <p className="peer-subtitle">
              {view === "history" ? "Your complete battle record" : "Find worthy opponents"}
            </p>
          </div>
          <button
            className="view-toggle-btn"
            onClick={() => {
              setView(view === "history" ? "invite" : "history");
              setIsFormOpen(false);
            }}
          >
            {view === "history" ? "Invite Peers" : "goto battleground"}
            <span className="toggle-icon">→</span>
          </button>
        </header>

        <main className="peer-main">
          <section className="filters-section">
            {view === "history" ? (
              <div className="vertical-filters">
                <div className="filter-item">
                  <label>Course</label>
                  <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
                    <option value="All">select</option>
                    {allCourses.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                <div className="filter-item">
                  <label>Date</label>
                  <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
                </div>
                <div className="filter-item">
                  <label>Status</label>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All Status</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="filter-single">
                <div className="filter-item">
                  <label>Filter Peers</label>
                  <select value={inviteCourseFilter} onChange={(e) => setInviteCourseFilter(e.target.value)}>
                    <option value="All">select</option>
                    {allCourses.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </section>

          <section className="data-section">
            {view === "history" ? (
              <div className="table-card">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Contest</th>
                      <th>Date</th>
                      <th>Course</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContests.map((contest, index) => (
                      <tr key={index}>
                        <td>{contest.name}</td>
                        <td>{new Date(contest.date).toLocaleDateString()}</td>
                        <td><span className="course-badge">{contest.course}</span></td>
                        <td><span className={`status-badge ${contest.status.toLowerCase()}`}>{contest.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="table-card">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Peer</th>
                      <th>Points</th>
                      <th>Contests</th>
                      <th>Course</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPeers.map((peer) => (
                      <tr key={peer.id}>
                        <td>{peer.name}</td>
                        <td>{peer.points}</td>
                        <td>{peer.contests}</td>
                        <td>{peer.course}</td>
                        <td><button className="challenge-btn" onClick={() => handleInviteClick(peer)}>Challenge</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {isFormOpen && selectedPeer && (
            <div className="invite-modal-overlay">
              <div className="invite-modal">
                <div className="modal-header">
                  <h3>Challenge {selectedPeer.name}</h3>
                  <button className="close-btn" onClick={handleCancelInvite}>×</button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Select Date & Time</label>
                    <input
                      type="datetime-local"
                      value={inviteDateTime}
                      onChange={(e) => setInviteDateTime(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="cancel-btn" onClick={handleCancelInvite}>Cancel</button>
                  <button className="send-btn" onClick={handleSendInvite}>Send Invite</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Peer2peer;
