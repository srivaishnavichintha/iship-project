import React from 'react';
import './StudentLeader.css';
import Student_navabar from '../Student_navabar';

const students = [
  { name: 'Harika Allam', level: 'Level 2', points: 980, progress: 80, status: 'Active' },
  { name: 'Rajeev Kumar', level: 'Level 3', points: 1020, progress: 95, status: 'Active' },
  { name: 'Ananya Gupta', level: 'Level 1', points: 650, progress: 60, status: 'Active' },
  { name: 'Dev Mehta', level: 'Level 2', points: 720, progress: 45, status: 'Inactive' },
];

const StudentLeaderboard = () => {
  return (
    <>
      <Student_navabar />
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">🏆 Student Leaderboard</h1>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Level</th>
              <th>Points</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className={student.status.toLowerCase()}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.level}</td>
                <td>{student.points}</td>
                <td>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-label">{student.progress}%</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentLeaderboard;
