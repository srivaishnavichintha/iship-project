import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ContestData.css";

export default function ContestData() {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [showProblemForm, setShowProblemForm] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "easy",
    points: 10,
    testCases: [{ input: "", output: "" }]
  });

  // Fetch contest data
  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const contestRes = await axios.get(`http://localhost:3000/contests/${contestId}`);
        setContest(contestRes.data);
        
        const problemsRes = await axios.get(`http://localhost:3000/contests/${contestId}/problems`);
        setProblems(problemsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchContestData();
  }, [contestId]);

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/contests/${contestId}/leaderboard`);
      setLeaderboard(res.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const points = name === "level" ? 
      (value === "easy" ? 10 : value === "medium" ? 20 : 30) : 
      formData.points;
    
    setFormData({
      ...formData,
      [name]: value,
      points
    });
  };

  // Handle test case changes
  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...formData.testCases];
    updatedTestCases[index][field] = value;
    setFormData({
      ...formData,
      testCases: updatedTestCases
    });
  };

  // Add/remove test cases
  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: "", output: "" }]
    });
  };

  const removeTestCase = (index) => {
    if (formData.testCases.length > 1) {
      const updatedTestCases = formData.testCases.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        testCases: updatedTestCases
      });
    }
  };

  // Submit problem
  const submitProblem = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(
        `http://localhost:3000/contests/${contestId}/problems`,
        formData
      );
      
      setProblems([...problems, res.data]);
      setShowProblemForm(false);
      setFormData({
        title: "",
        description: "",
        level: "easy",
        points: 10,
        testCases: [{ input: "", output: "" }]
      });
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  // Show leaderboard
  const toggleLeaderboard = async () => {
    if (!showLeaderboard) {
      await fetchLeaderboard();
    }
    setShowLeaderboard(!showLeaderboard);
  };

  if (!contest) return <div>Loading contest data...</div>;

  return (
    <div className="contest-management">
      {/* Contest Header */}
      <div className="contest-header">
        <h1>{contest.name}</h1>
        <p className="contest-description">{contest.description}</p>
        <div className="contest-meta">
          <span>Starts: {new Date(contest.startTime).toLocaleString()}</span>
          <span>Ends: {new Date(contest.endTime).toLocaleString()}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="add-problem-btn"
          onClick={() => setShowProblemForm(true)}
        >
          Add Problem
        </button>
        <button 
          className="leaderboard-btn"
          onClick={toggleLeaderboard}
        >
          View Leaderboard
        </button>
      </div>

      {/* Problem Form (slides down from top) */}
      {showProblemForm && (
        <div className="problem-form-container">
          <div className="problem-form">
            <h2>Add Problem to Contest</h2>
            <form onSubmit={submitProblem}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Difficulty Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleFormChange}
                >
                  <option value="easy">Easy (10 points)</option>
                  <option value="medium">Medium (20 points)</option>
                  <option value="hard">Hard (30 points)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Test Cases</label>
                {formData.testCases.map((testCase, index) => (
                  <div key={index} className="test-case">
                    <div className="test-case-header">
                      <span>Test Case {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeTestCase(index)}
                        disabled={formData.testCases.length <= 1}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="test-case-inputs">
                      <input
                        type="text"
                        placeholder="Input"
                        value={testCase.input}
                        onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Expected Output"
                        value={testCase.output}
                        onChange={(e) => handleTestCaseChange(index, "output", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-test-case-btn"
                  onClick={addTestCase}
                >
                  Add Test Case
                </button>
              </div>

              <div className="form-actions">
                <button type="submit">Submit Problem</button>
                <button 
                  type="button"
                  onClick={() => setShowProblemForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Problems List */}
      <div className="problems-list">
        <h2>Contest Problems</h2>
        {problems.length === 0 ? (
          <p>No problems added yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                <tr key={problem._id}>
                  <td>{index + 1}</td>
                  <td>{problem.title}</td>
                  <td className={`difficulty ${problem.level}`}>
                    {problem.level}
                  </td>
                  <td>{problem.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="leaderboard-modal">
          <div className="leaderboard-content">
            <h2>Leaderboard</h2>
            <button 
              className="close-btn"
              onClick={() => setShowLeaderboard(false)}
            >
              &times;
            </button>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Participant</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.userId}>
                    <td>{index + 1}</td>
                    <td>{entry.username}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}