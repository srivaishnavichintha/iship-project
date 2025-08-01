import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';  // ✅ FIXED HERE
import './P2pmatching.css';

const accentColors = [
  '--accent-blue', '--accent-purple', '--accent-orange',
  '--accent-green', '--accent-pink', '--accent-teal',
  '--accent-red', '--accent-yellow'
];

const getRandomColor = () => {
  return accentColors[Math.floor(Math.random() * accentColors.length)];
};

const P2pmatching = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // ✅ FIXED HERE

  const [accentColor1, setAccentColor1] = useState('--accent-blue');
  const [accentColor2, setAccentColor2] = useState('--accent-purple');

  const {
    student1,
    student2,
    course,
    level,
    contestTime,
    matchDate,
    problemid,
    tags = [],
    submissions = [],
    skills1 = ['DSA', 'JavaScript'],
    skills2 = ['Python', 'Graph Theory']
  } = location.state || {};

  const leaderboard = [
    { problem: 'Array Sorting', student1Score: 85, student2Score: 92 },
    { problem: 'Dynamic Programming', student1Score: 78, student2Score: 88 },
    { problem: 'Graph Traversal', student1Score: 95, student2Score: 90 },
    { problem: 'String Manipulation', student1Score: 82, student2Score: 85 }
  ];

  useEffect(() => {
    setAccentColor1(getRandomColor());
    setAccentColor2(getRandomColor());
  }, []);

  const handleEnterContest = () => {
    const now = new Date();
    const [hours, minutes] = contestTime.split(':');
    const contestDateTime = new Date(matchDate);
    contestDateTime.setHours(parseInt(hours));
    contestDateTime.setMinutes(parseInt(minutes));
    contestDateTime.setSeconds(0);

    if (now >= contestDateTime) {
      navigate(`/solve/${problemid}`); // ✅ Redirect when time is valid
    } else {
      alert("⏰ Contest is not available yet. Please wait for the scheduled time.");
    }
  };

  if (!location.state) {
    return <div className="error">No match data found. Please go back and try again.</div>;
  }

  return (
    <div className="p2p-modern-container">
      <div className="p2p-header">
        <h1>Peer Match Battle</h1>
        <p>Match ID: <strong>{id}</strong></p>
      </div>

      <div className="p2p-card-grid">
        {[{ name: student1, color: accentColor1, skills: skills1 }, { name: student2, color: accentColor2, skills: skills2 }].map((user, index) => (
          <div
            key={index}
            className="p2p-player-card"
            style={{ '--accent-color': `var(${user.color})` }}
          >
            <div className="p2p-card-accent" />
            <div className="p2p-card-avatar" style={{ backgroundColor: `var(${user.color})` }}>
              {user.name?.charAt(0)}
            </div>
            <div className="p2p-card-info">
              <h3>{user.name}</h3>
              <p className="p2p-subtext">Level: {level}</p>
              <p>Total Submissions: 24</p>
              <p>Success Rate: {index === 0 ? '85%' : '89%'}</p>
              <div className="p2p-skill-tags">
                {user.skills.map(skill => (
                  <span key={skill} className="p2p-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p2p-match-info">
        <h2>Match Information</h2>
        <div className="p2p-info-grid">
          <div><strong>Course:</strong> {course}</div>
          <div><strong>Level:</strong> {level}</div>
          <div><strong>Session Time:</strong> {contestTime}</div>
          <div><strong>Date:</strong> {new Date(matchDate).toLocaleDateString()}</div>
        </div>

        <div className="p2p-tags-container">
          <h3>Tags:</h3>
          {tags.map((tag, i) => (
            <span key={i} className="p2p-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="p2p-leaderboard">
        <h2>Leaderboard</h2>
        <div className="p2p-leaderboard-header">
          <span>Problem</span>
          <span>{student1}</span>
          <span>{student2}</span>
        </div>
        {leaderboard.map((entry, i) => (
          <div key={i} className="p2p-leaderboard-row">
            <span>{entry.problem}</span>
            <span className={entry.student1Score > entry.student2Score ? 'winner' : ''}>
              {entry.student1Score}%
            </span>
            <span className={entry.student2Score > entry.student1Score ? 'winner' : ''}>
              {entry.student2Score}%
            </span>
          </div>
        ))}
      </div>

      {/* ✅ Enter Contest Button */}
      <div className="p2p-action-buttons">
        <button className="enter-contest-btn" onClick={handleEnterContest}>
          🚀 Enter Contest
        </button>
      </div>

      <button className="p2p-back-button" onClick={() => window.history.back()}>
        ⬅ Back to Matches
      </button>
    </div>
  );
};

export default P2pmatching;
