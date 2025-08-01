import React, { useState, useEffect } from 'react';
import "./Submissions.css";
import Student_navbar from '../Student_navabar';

const SubmissionsPage = () => {
  const [submissionsData, setSubmissionsData] = useState([]);
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { id: studentId } = JSON.parse(storedUserData);

      fetch(`http://localhost:3000/submissions/${studentId}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch submissions");
          return res.json();
        })
        .then(data => {
          console.log(data);
          setSubmissionsData(data);
        })
        .catch(error => {
          console.error("Error fetching submissions:", error);
        });
    }
  }, []);

  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('accepted')) return 'accepted';
    if (statusLower.includes('wrong')) return 'wrong-answer';
    if (statusLower.includes('error')) return 'runtime-error';
    return '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleViewCode = (code) => {
    setSelectedCode(code);
    setShowCodeModal(true);
  };

  const handleCloseModal = () => {
    setShowCodeModal(false);
    setSelectedCode('');
  };

  return (
    <>
      <Student_navbar />
      <div className="submissions-container">
        <h2>Submission History</h2>

        <div className="submissions-table">
          <table>
            <thead>
              <tr>
                <th>Problem ID</th>
                <th>Language</th>
                <th>Status</th>
                <th>Execution Time</th>
                <th>Test Results</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              {submissionsData.map((submission, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{submission.problemId}</td>
                    <td>{submission.language}</td>
                    <td>
                      <span className={`status ${getStatusClass(submission.status)}`}>
                        {submission.status}
                      </span>
                    </td>
                    <td>{formatDate(submission.executionTime)}</td>
                    <td className="test-results">
                      {submission.testResults.length} test cases
                      {submission.testResults.length > 0 && (
                        <button 
                          className="expand-button"
                          onClick={() => setExpandedSubmission(expandedSubmission === index ? null : index)}
                        >
                          {expandedSubmission === index ? 'Hide' : 'Show'}
                        </button>
                      )}
                    </td>
                    <td>
                      <button 
                        className="expand-button"
                        onClick={() => handleViewCode(submission.code)}
                      >
                        View
                      </button>
                    </td>
                  </tr>

                  {expandedSubmission === index && (
                    <tr className="test-details">
                      <td colSpan="6">
                        <div className="test-cases">
                          {submission.testResults.map((test, testIndex) => (
                            <div key={testIndex} className={`test-case ${test.passed ? 'passed' : 'failed'}`}>
                              <h4>Test Case {testIndex + 1}: {test.passed ? '✅ Passed' : '❌ Failed'}</h4>
                              <p><strong>Input:</strong> {test.input}</p>
                              <p><strong>Expected:</strong> {test.expected}</p>
                              <p><strong>Actual:</strong> {test.actual}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {showCodeModal && (
          <div className="modal">
            <div className="modal-content">
              <button className="modal-close" onClick={handleCloseModal}>×</button>
              <pre>{selectedCode}</pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubmissionsPage;
