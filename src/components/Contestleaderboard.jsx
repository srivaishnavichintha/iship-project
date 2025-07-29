import React from 'react';
import './Contestleaderboard.css';
import Student_navabar from '../Student_navabar';

const contestResults = [
  { rank: 1, name: 'arghverma...', score: 21, finishTime: '00:13:59', 
    q1: '00:05:22', q2: '00:07:41', q3: '00:12:34', q4: '00:13:59' },
  { rank: 2, name: 'RishavMall...', score: 21, finishTime: '00:20:21', 
    q1: '00:13:05', q2: '00:15:28', q3: '00:17:11', q4: '00:20:21' },
  { rank: 3, name: 'Dominizor0...', score: 21, finishTime: '00:20:33', 
    q1: '00:02:42', q2: '00:06:06', q3: '00:06:38', q4: '00:10:33' },
  { rank: 4, name: 'arignote', score: 21, finishTime: '00:24:18', 
    q1: '00:23:37', q2: '00:23:44', q3: '00:24:11', q4: '00:24:18' },
  { rank: 5, name: 'Anuj98200', score: 21, finishTime: '00:29:29', 
    q1: '00:01:54', q2: '00:12:39', q3: '00:14:29', q4: '00:08:00' },
  { rank: 6, name: 'user6403...', score: 21, finishTime: '00:31:22', 
    q1: '00:03:32', q2: '00:09:46', q3: '00:17:30', q4: '00:31:22' },
  { rank: 7, name: 'Vop2GbhaOK', score: 21, finishTime: '00:32:32', 
    q1: '00:29:46', q2: '00:31:34', q3: '00:32:06', q4: '00:32:32' },
  { rank: 8, name: 'Ishu_IN', score: 21, finishTime: '00:33:03', 
    q1: '00:28:03', q2: '00:25:33', q3: '00:21:36', q4: '00:17:41' },
  { rank: 9, name: 'Evtl.DeAdRiSe', score: 21, finishTime: '00:33:43', 
    q1: '00:05:51', q2: '00:08:07', q3: '00:11:55', q4: '00:18:43' },
];

const StudentLeaderboard = () => {
  return (
    <>
      <Student_navabar />
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h1 className="leaderboard-title">🏆 Contest Leaderboard</h1>
          <div className="leaderboard-subtitle">Top performers in the competition</div>
        </div>
        <div className="table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Finish Time</th>
                <th>Q1 (4)</th>
                <th>Q2 (5)</th>
                <th>Q3 (5)</th>
                <th>Q4 (7)</th>
              </tr>
            </thead>
            <tbody>
              {contestResults.map((contestant) => (
                <tr key={contestant.rank} className={contestant.rank <= 3 ? `top-${contestant.rank}` : ''}>
                  <td>
                    <span className="rank-badge">{contestant.rank}</span>
                  </td>
                  <td className="name-cell">
                    <span className="name-text">{contestant.name}</span>
                  </td>
                  <td>
                    <span className="score-badge">{contestant.score}</span>
                  </td>
                  <td>{contestant.finishTime}</td>
                  <td>{contestant.q1}</td>
                  <td>{contestant.q2}</td>
                  <td>{contestant.q3}</td>
                  <td>{contestant.q4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentLeaderboard;