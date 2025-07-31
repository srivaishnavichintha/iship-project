import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './P2pmatching.css';

const P2pmatching = () => {
  const { id } = useParams();
  const location = useLocation();
  const {
    student1,
    student2,
    course,
    level,
    contestTime,
    matchDate,
    tags = [],
    submissions = [] // Added submissions data
  } = location.state || {};

  // Sample leaderboard data (replace with actual data from props)
  const leaderboard = [
    { problem: 'Array Sorting', student1Score: 85, student2Score: 92 },
    { problem: 'Dynamic Programming', student1Score: 78, student2Score: 88 },
    { problem: 'Graph Traversal', student1Score: 95, student2Score: 90 },
    { problem: 'String Manipulation', student1Score: 82, student2Score: 85 }
  ];

  if (!location.state) {
    return <div className="error">No match data found. Please go back and try again.</div>;
  }

  return (
    <div className="p2p-matching-container">
      <div className="header-section">
        <h1>Peer-to-Peer Match Details</h1>
        <div className="match-id">Match ID: {id}</div>
      </div>
      
      <div className="profile-cards">
        <div className="profile-card">
          <div className="avatar">{student1.charAt(0)}</div>
          <h3>{student1}</h3>
          <div className="stats">
            <span>Total Submissions: 24</span>
            <span>Success Rate: 85%</span>
          </div>
        </div>
        
        <div className="vs-circle">VS</div>
        
        <div className="profile-card">
          <div className="avatar">{student2.charAt(0)}</div>
          <h3>{student2}</h3>
          <div className="stats">
            <span>Total Submissions: 28</span>
            <span>Success Rate: 89%</span>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="match-details">
          <h2>Match Information</h2>
          
          <div className="detail-section">
            <h3>Course Details</h3>
            <p><strong>Course:</strong> {course}</p>
            <p><strong>Level:</strong> {level}</p>
            <p><strong>Session Time:</strong> {contestTime}</p>
            <p><strong>Match Date:</strong> {new Date(matchDate).toLocaleDateString()}</p>
          </div>

          <div className="detail-section">
            <h3>Tags</h3>
            <div className="tags-container">
              {tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <div className="leaderboard-header">
            <span>Problem</span>
            <span>{student1}</span>
            <span>{student2}</span>
          </div>
          <div className="leaderboard-body">
            {leaderboard.map((item, index) => (
              <div key={index} className="leaderboard-row">
                <span>{item.problem}</span>
                <span className={item.student1Score > item.student2Score ? 'winner' : ''}>
                  {item.student1Score}%
                </span>
                <span className={item.student2Score > item.student1Score ? 'winner' : ''}>
                  {item.student2Score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="back-button" onClick={() => window.history.back()}>
        Back to Matches
      </button>
    </div>
  );
};

export default P2pmatching;