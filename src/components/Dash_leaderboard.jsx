import React from "react";
import "./Dash_leaderboard.css";

const Dash_leaderboard = ({ students }) => {
  return (
    <div className="leaderboard-container">
      <h3 className="leaderboard-title">Student Performance Leaderboard</h3>
      
      <div className="leaderboard-header">
        <div className="header-cell name">STUDENT NAME</div>
        <div className="header-cell points">POINTS</div>
        <div className="header-cell submissions">SUBMISSIONS</div>
        <div className="header-cell course">COURSE</div>
      </div>
      
      <div className="leaderboard-body">
        {students.map((student, index) => (
          <div className="data-row" key={`student-${index}`}>
            <div className="data-cell name">{student.user}</div>
            <div className="data-cell points">{student.coursepoints}</div>
            <div className="data-cell submissions">{student.submissions}</div>
            <div className="data-cell course">{student.coursename}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dash_leaderboard;