import React from "react";
import "./Dash.css";
import CCard from '../components/CCard'


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

export default function Dash() {
  return (
    <div className="mentor_dashboard">
      {/* Popular Courses */}
      <div className="section">
        <h2>Popular Courses</h2>
        <div className="card_cover">
           <CCard
              title="Interview Crash Course"
              description="Master D and Algorithms for technical interviews. Includes mock tests and live sessions."
              mentor="Pawan"
              endDate="25/05/2020"
              tags={["DSA", "Interview Prep", "Live Sessions", "Mock Tests"]}
            />
        </div>
      </div>

      {/* Upcoming Courses */}
      <div className="section">
        <h2>Upcoming Courses</h2>
        <div className="card_cover">
           <CCard
              title="Interview Crash Course"
              description="Master D and Algorithms for technical interviews. Includes mock tests and live sessions."
              mentor="Pawan"
              endDate="25/05/2020"
              tags={["DSA", "Interview Prep", "Live Sessions", "Mock Tests"]}
            />
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
