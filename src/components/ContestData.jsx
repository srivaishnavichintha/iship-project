import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContestData.css';

export default function ContestData() {
  const location = useLocation();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [studentsEnrolled, setStudentsEnrolled] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  // Get contest data from navigation state or fetch from API
  useEffect(() => {
    if (location.state?.contestData) {
      setContest(location.state.contestData);
      fetchContestDetails(location.state.contestData._id);
    } else if (location.state?.contestId) {
      fetchContestDetails(location.state.contestId);
    }
  }, [location.state]);

  const fetchContestDetails = async (contestId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/contests/${contestId}`);
      setContest(response.data);
      
      // Fetch additional data like enrolled students and leaderboard
      const enrollResponse = await axios.get(`http://localhost:3000/contests/${contestId}/enrollments`);
      setStudentsEnrolled(enrollResponse.data.count);
      
      const leaderboardResponse = await axios.get(`http://localhost:3000/contests/${contestId}/leaderboard`);
      setLeaderboard(leaderboardResponse.data);
    } catch (error) {
      console.error('Error fetching contest details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="contest-data-loading">
        <div className="loading-spinner"></div>
        <p>Loading contest details...</p>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="contest-data-error">
        <h2>Contest not found</h2>
        <button 
          className="back-button"
          onClick={() => navigate('/mentor/contests')}
        >
          Back to Contests
        </button>
      </div>
    );
  }

  return (
    <div className="contest-data-container">
      {/* Header Section */}
      <div className="contest-header">
        <h1>{contest.contesttitle}</h1>
        <div className="contest-meta">
          <span className={`status-badge ${contest.conteststatus.toLowerCase()}`}>
            {contest.conteststatus}
          </span>
          <span className="difficulty-badge">{contest.contestdifficulty}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="contest-content">
        {/* Left Panel - Contest Details */}
        <div className="contest-details-panel">
          <div className="details-card">
            <h2>Contest Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Date & Time:</span>
                <span className="info-value">{formatDate(contest.contestdate)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Students Enrolled:</span>
                <span className="info-value">{studentsEnrolled}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Duration:</span>
                <span className="info-value">2 hours</span>
              </div>
              <div className="info-item">
                <span className="info-label">Mentor:</span>
                <span className="info-value">{contest.contestmentor}</span>
              </div>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p>{contest.contestdescription}</p>
            </div>

            <div className="action-buttons">
              <button 
                className="add-problems-btn"
                onClick={() => navigate(`/mentor/contests/${contest._id}/problems`)}
              >
                Add Problems
              </button>
              <button 
                className="edit-contest-btn"
                onClick={() => navigate(`/mentor/contests/${contest._id}/edit`)}
              >
                Edit Contest
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Leaderboard */}
        <div className="leaderboard-panel">
          <div className="leaderboard-card">
            <h2>Leaderboard</h2>
            {leaderboard.length > 0 ? (
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Student</th>
                    <th>Score</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry._id}>
                      <td>{index + 1}</td>
                      <td>{entry.studentName}</td>
                      <td>{entry.score}</td>
                      <td>{entry.timeTaken} mins</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-leaderboard">
                <p>No leaderboard data available yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}