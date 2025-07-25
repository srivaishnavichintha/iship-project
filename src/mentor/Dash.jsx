import React from "react";
import "./Dash.css";

const Card = ({ type }) => {
  return (
    <div className={`${type}_card`}>
      <div className="rec">
        <div className="rec1"></div>
        <div className="rec2"></div>
        <div className="rec3"></div>
      </div>
    </div>
  );
};

const StudentRow = ({ sno, name, points, submissions }) => {
  return (
    <tr>
      <td>{sno}</td>
      <td>{name}</td>
      <td>{points}</td>
      <td>{submissions}</td>
    </tr>
  );
};

export default function MentorDashboard() {
  return (
    <div className="mentor_dashboard">
      {/* Popular Courses */}
      <div className="section">
        <h2>Popular Courses</h2>
        <div className="card_cover">
          <Card type="popular" />
          <Card type="popular" />
          <Card type="popular" />
        </div>
      </div>

      {/* Upcoming Courses */}
      <div className="section">
        <h2>Upcoming Courses</h2>
        <div className="card_cover">
          <Card type="upcoming" />
          <Card type="upcoming" />
          <Card type="upcoming" />
        </div>
      </div>

      {/* Top Students */}
      <div className="section">
        <h2>Top Students</h2>
        <table className="top_students_table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Student Name</th>
              <th>Points</th>
              <th>Submissions</th>
            </tr>
          </thead>
          <tbody>
            <StudentRow sno="1" name="Alice" points="95" submissions="23" />
            <StudentRow sno="2" name="Bob" points="89" submissions="20" />
            <StudentRow sno="3" name="Charlie" points="85" submissions="18" />
            <StudentRow sno="4" name="David" points="82" submissions="17" />
            <StudentRow sno="5" name="Eve" points="78" submissions="15" />
          </tbody>
        </table>
      </div>
    </div>
  );
}
