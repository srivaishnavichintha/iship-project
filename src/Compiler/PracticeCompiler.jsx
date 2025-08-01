import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { useParams } from "react-router-dom";
import "./PracticeCompiler.css";


// API configuration
const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend API URL

export default function PracticeCompiler() {
  const { problemId } = useParams();
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const [languageId, setLanguageId] = useState("71");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("problem");
  const [testCases, setTestCases] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const languageMap = {
    "71": "python",
    "50": "c",
    "54": "cpp",
    "62": "java",
    "63": "javascript",
  };

  const defaultCode = {
    "71": `def solution(arr):
    # Write your code here
    pass`,
    "50": `#include <stdio.h>

int main() {
    // Write your code here
    return 0;
}`,
    "54": `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`,
    "62": `public class Main {
    public static void main(String[] args) {
        // Write your code here
    }
}`,
    "63": `/**
 * @param {number[]} arr
 * @return {number}
 */
var solution = function(arr) {
    // Write your code here
};`
  };

  // Fetch problem data
  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/problems/${problemId}`);
console.log(response); // <-- this is your issue

        if (!response.ok) {
          throw new Error('Problem not found');
        }
        const data = await response.json();
        setProblemData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemData();
  }, [problemId]);

  // Fetch submissions for this problem
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/submissions?problemId=${problemId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        console.error('Error fetching submissions:', err);
      }
    };

    if (problemId) {
      fetchSubmissions();
    }
  }, [problemId]);

  // Initialize Monaco editor
  useEffect(() => {
    if (editorRef.current && !monacoRef.current && !loading && problemData) {
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: defaultCode[languageId],
        language: languageMap[languageId],
        theme: "vs-dark",
        fontFamily: "Fira Code",
        fontSize: 14,
        fontLigatures: true,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        lineNumbers: "on",
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 3,
      });

      setTimeout(() => {
        monacoRef.current.revealLineInCenter(1);
        monacoRef.current.setScrollTop(0);
      }, 100);
    }

    return () => {
      monacoRef.current?.dispose();
      monacoRef.current = null;
    };
  }, [loading, problemData]);

  // Handle language change
  useEffect(() => {
    if (monacoRef.current) {
      const model = monacoRef.current.getModel();
      monaco.editor.setModelLanguage(model, languageMap[languageId]);
      monacoRef.current.setValue(defaultCode[languageId]);
      setTimeout(() => {
        monacoRef.current.revealLineInCenter(1);
        monacoRef.current.setScrollTop(0);
      }, 100);
    }
  }, [languageId]);

  const runCode = async () => {
    if (!problemData) return;
    
    setIsRunning(true);
    const code = monacoRef.current.getValue();
    setOutput("⏳ Running your code...");

    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "8cc4b00922msh23ed947ec83e1c5p17e8b5jsnfc26e4851a9f",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: parseInt(languageId),
            stdin: userInput || problemData.examples[0]?.input || "",
          }),
        }
      );

      const result = await response.json();
      
      let outputText = "";
      if (result.stdout) {
        outputText = result.stdout;
      } else if (result.stderr) {
        outputText = `Error: ${result.stderr}`;
      } else if (result.compile_output) {
        outputText = `Compilation Error: ${result.compile_output}`;
      } else if (result.message) {
        outputText = `Error: ${result.message}`;
      } else {
        outputText = "No output";
      }
      
      const newTestCase = {
        input: userInput || problemData.examples[0]?.input || "",
        output: outputText,
        status: result.stderr || result.compile_output ? "failed" : "passed",
        timestamp: new Date().toLocaleString()
      };
      
      setTestCases(prev => [...prev, newTestCase]);
      setOutput(outputText);
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async () => {
    if (!problemData) return;
    
    setIsRunning(true);
    const code = monacoRef.current.getValue();
    setOutput("⏳ Submitting your solution...");

    try {
      // First execute the code against test cases
      const testResults = [];
      let allPassed = true;
      
      for (const example of problemData.examples) {
        const response = await fetch(
          "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": "06a2a6a537msh32bb0379fd0eaa6p1ff34djsn067f549dfdd6",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
            body: JSON.stringify({
              source_code: code,
              language_id: parseInt(languageId),
              stdin: example.input,
            }),
          }
        );
        
        const result = await response.json();
        const output = result.stdout ? result.stdout.trim() : "";
        const isPassed = output === example.output;
        
        if (!isPassed) {
          allPassed = false;
        }
        
        testResults.push({
          input: example.input,
          expected: example.output,
          actual: output,
          passed: isPassed
        });
      }
      
      // Prepare submission data for backend
      const submissionData = {
        problemId,
        code,
        language: languageMap[languageId],
        status: allPassed ? "Accepted" : "Wrong Answer",
        testResults,
        executionTime: new Date().toISOString()
      };

      // Save submission to backend
      const saveResponse = await fetch(`${API_BASE_URL}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(submissionData)
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save submission');
      }

      const savedSubmission = await saveResponse.json();

      // Update local state with the new submission
      const newSubmission = {
        ...savedSubmission,
        timestamp: new Date(savedSubmission.executionTime).toLocaleString()
      };
      
      setSubmissions(prev => [newSubmission, ...prev]);
      
      // Generate output message
      let outputText = "";
      if (allPassed) {
        outputText = "✅ All test cases passed!\n\n";
      } else {
        outputText = "❌ Some test cases failed:\n\n";
      }
      
      testResults.forEach((test, idx) => {
        outputText += `Test Case ${idx + 1}: ${test.passed ? "✅ Passed" : "❌ Failed"}\n`;
        outputText += `Input: ${test.input}\n`;
        outputText += `Expected: ${test.expected}\n`;
        outputText += `Actual: ${test.actual}\n\n`;
      });
      
      setOutput(outputText);
      
    } catch (error) {
      setOutput(`❌ Error during submission: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="practice-compiler-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i> Loading problem...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="practice-compiler-container">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i> {error}
        </div>
      </div>
    );
  }

  if (!problemData) {
    return (
      <div className="practice-compiler-container">
        <div className="no-problem">
          Problem data not available
        </div>
      </div>
    );
  }

  return (
    <div className="practice-compiler-container">
      <div className="problem-panel">
        <div className="problem-header">
          <div className="title-wrapper">
            <h2>{problemData.title}</h2>
            <span className={`difficulty ${problemData.level.toLowerCase()}`}>
              {problemData.level}
            </span>
          </div>
        </div>
        
        <div className="problem-content">
          <div className="description">
            <p>{problemData.description}</p>
          </div>
          
          <div className="examples-section">
            <h3>Examples:</h3>
            {problemData.examples.map((example, index) => (
              <div key={index} className="example-card">
                <div className="example-header">
                  <span className="example-number">Example {index + 1}</span>
                </div>
                <div className="example-io">
                  <div className="input">
                    <strong>Input:</strong> {example.input}
                  </div>
                  <div className="output">
                    <strong>Output:</strong> {example.output}
                  </div>
                  {example.explanation && (
                    <div className="explanation">
                      <strong>Explanation:</strong> {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        
          <div className="problem-footer">
            <div className="tags-section">
              <div className="topics">
                <h4>Related Topics</h4>
                <div className="tags">
                  {problemData.topics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
              <div className="companies">
                <h4>Asked By</h4>
                <div className="tags">
                  {problemData.companies.map((company, index) => (
                    <span key={index} className="company-tag">{company}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="editor-panel">
        <div className="editor-tabs">
          <button 
            className={activeTab === "problem" ? "active" : ""}
            onClick={() => setActiveTab("problem")}
          >
            <i className="fas fa-file-alt"></i> Problem
          </button>
          <button 
            className={activeTab === "submissions" ? "active" : ""}
            onClick={() => setActiveTab("submissions")}
          >
            <i className="fas fa-history"></i> Submissions
          </button>
        </div>
        
        {activeTab === "problem" && (
          <div className="editor-container">
            <div className="editor-toolbar">
              <div className="language-selector">
                <i className="fas fa-code"></i>
                <select 
                  value={languageId} 
                  onChange={(e) => setLanguageId(e.target.value)}
                >
                  <option value="71">Python</option>
                  <option value="63">JavaScript</option>
                  <option value="54">C++</option>
                  <option value="50">C</option>
                  <option value="62">Java</option>
                </select>
              </div>
              <div className="editor-buttons">
                <button 
                  onClick={runCode} 
                  className="run-button"
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <><i className="fas fa-spinner fa-spin"></i> Running</>
                  ) : (
                    <><i className="fas fa-play"></i> Run</>
                  )}
                </button>
                <button 
                  onClick={submitCode} 
                  className="submit-button"
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <><i className="fas fa-spinner fa-spin"></i> Submitting</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Submit</>
                  )}
                </button>
              </div>
            </div>
            <div className="monaco-editor" ref={editorRef}></div>
          </div>
        )}
        
        {activeTab === "submissions" && (
          <div className="submissions-container">
            <h3>Your Submissions</h3>
            {submissions.length === 0 ? (
              <p className="no-submissions">No submissions yet</p>
            ) : (
              <div className="submissions-list">
                {submissions.map((submission, idx) => (
                  <div key={idx} className={`submission-card ${submission.status === "Accepted" ? "accepted" : "rejected"}`}>
                    <div className="submission-header">
                      <span className="submission-time">{submission.timestamp}</span>
                      <span className={`submission-status ${submission.status === "Accepted" ? "accepted" : "rejected"}`}>
                        {submission.status}
                      </span>
                    </div>
                    <div className="submission-language">{submission.language}</div>
                    <div className="submission-test-results">
                      {submission.testResults?.map((test, testIdx) => (
                        <div key={testIdx} className={`test-result ${test.passed ? "passed" : "failed"}`}>
                          Test Case {testIdx + 1}: {test.passed ? "✓ Passed" : "✗ Failed"}
                        </div>
                      ))}
                    </div>
                    <pre className="submission-code">{submission.code}</pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="io-section">
          <div className="output-container">
            <div className="output-header">
              <h4>Output</h4>
              <button 
                className="clear-button"
                onClick={() => setOutput("")}
              >
                <i className="fas fa-trash"></i> Clear
              </button>
            </div>
            <div className="output-content">
              <pre>{output}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}