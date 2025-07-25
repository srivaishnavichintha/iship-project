import "./LeaderBoard.css";
import { useState } from "react";

export default function Leaderboard() {
  const [filterCourse, setFilterCourse] = useState("All");

  const data = [
    { name: "Harika", course: "DSA", level: 3, points: 980 },
    { name: "Ravi", course: "Web Dev", level: 2, points: 850 },
    { name: "Priya", course: "DSA", level: 1, points: 750 },
    { name: "Karthik", course: "Web Dev", level: 3, points: 900 },
    { name: "Anjali", course: "DSA", level: 2, points: 820 }
  ];

  const filteredData =
    filterCourse === "All"
      ? data
      : data.filter((user) => user.course === filterCourse);

  const sorted = filteredData.sort((a, b) => b.points - a.points);

  return (
    <div className="leaderboard-container">
      <div className="header">
        <h1>Leaderboard</h1>
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option value="All">All Courses</option>
          <option value="DSA">DSA</option>
          <option value="Web Dev">Web Dev</option>
        </select>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Course</th>
            <th>Level</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((user, index) => (
            <tr
              key={index}
              className={user.name === "Harika" ? "highlight" : ""}
            >
              <td>#{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.course}</td>
              <td>Level {user.level}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
