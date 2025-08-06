import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';  
import './P2pmatching.css';
import Student_navbar from '../Student_navabar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const navigate = useNavigate(); 

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
      navigate(`/solve/${problemid}`); 
    } else {
      toast.warn("⏰ Contest is not available yet. Please wait for the scheduled time.");
    }
  };

  if (!location.state) {
    return <div className="error">No match data found. Please go back and try again.</div>;
  }

  return (
    <>
      <Student_navbar />
      <ToastContainer position="top-right" />
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
        </div>

        <div className="p2p-action-buttons">
          <button className="enter-contest-btn" onClick={handleEnterContest}>
            🚀 Enter Contest
          </button>
        </div>

        <button className="p2p-back-button" onClick={() => window.history.back()}>
          ⬅ Back to Matches
        </button>
      </div>
    </>
  );
};

export default P2pmatching;
