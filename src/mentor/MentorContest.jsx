import { useState } from "react";
import "./MentorContest.css";

function ContestCard({ title, date, status }) {
  return (
    <div className="contest-card">
      <div className="contest-content">
        <h3>{title}</h3>
        <p>{date}</p>
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
      </div>
    </div>
  );
}

export default function MentorContest() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const contests = [
    { title: "Frontend Contest", date: "2025-08-01", status: "Upcoming" },
    { title: "Backend Challenge", date: "2025-07-15", status: "Completed" },
    { title: "Data Structures", date: "2025-07-25", status: "Live" },
  ];

  return (
    <div className="mentor-contest-container">
      <div className="header-section">
        <h1>My Contests</h1>
        <button className="add-btn" onClick={toggleForm}>+ Add</button>
      </div>

      {showForm && (
  <div className="slide-form">
    <h2>Add New Contest</h2>
    <input type="text" placeholder="Contest Title" />
    <input type="date" />
    <select>
      <option>Status</option>
      <option>Upcoming</option>
      <option>Live</option>
      <option>Completed</option>
    </select>
    <div className="form-buttons">
      <button className="submit-btn">Create</button>
      <button className="cancel-btn" onClick={toggleForm}>Cancel</button>
    </div>
  </div>
)}


      <div className="filters">
        <select>
          <option>All Courses</option>
          <option>DSA</option>
        </select>
        <select>
          <option>Status</option>
          <option>Upcoming</option>
          <option>Live</option>
        </select>
        <input type="date" />
        <input type="text" placeholder="Search by title..." />
      </div>

      <div className="contest-card-wrapper">
        {contests.map((contest, index) => (
          <ContestCard
            key={index}
            title={contest.title}
            date={contest.date}
            status={contest.status}
          />
        ))}
      </div>
    </div>
  );
}
