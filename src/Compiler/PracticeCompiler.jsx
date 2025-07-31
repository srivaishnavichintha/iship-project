import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import "./PracticeCompiler.css";

export default function PracticeCompiler() {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const [languageId, setLanguageId] = useState("71");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("problem");
  const [testCases, setTestCases] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  const problemData = {
    title: "898. Bitwise ORs of Subarrays",
    description: `Given an integer array arr, return the number of distinct bitwise ORs of all the non-empty subarrays of arr.

The bitwise OR of a subarray is the bitwise OR of each integer in the subarray. The bitwise OR of a subarray of one integer is that integer.

A subarray is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      {
        input: "[0]",
        output: "1",
        explanation: "There is only one possible result: 0."
      },
      {
        input: "[1,2,4]",
        output: "6",
        explanation: "The possible subarrays are: [1], [2], [4], [1,2], [2,4], [1,2,4]. Their bitwise ORs are: 1, 2, 4, 3, 6, 7. There are 6 unique values."
      }
    ],
    level: "Medium",
    topics: ["Array", "Bit Manipulation", "Dynamic Programming"],
    companies: ["Google", "Amazon", "Microsoft"],
    constraints: [
      "1 <= arr.length <= 5 * 10^4",
      "0 <= arr[i] <= 10^9"
    ]
  };

  const languageMap = {
    "71": "python",
    "50": "c",
    "54": "cpp",
    "62": "java",
    "63": "javascript",
  };

  const defaultCode = {
    "71": `print("Hello, World!")`,
    "50": `#include <stdio.h>

int main() {
  printf("Hello World!");
  return 0;
}`,
    "54": `#include <iostream>
using namespace std;

int main() {
  cout << "Hello World!";
  return 0;
}`,
    "62": `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}
`,
    "63": `/**
 * @param {number[]} arr
 * @return {number}
 */
    console.log("Hello, World!");`
  };

  useEffect(() => {
    if (editorRef.current && !monacoRef.current) {
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
  }, []);

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
            stdin: userInput || problemData.examples[0].input,
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
        input: userInput || problemData.examples[0].input,
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
  setIsRunning(true);
  const code = monacoRef.current.getValue();
  setOutput("⏳ Submitting your solution...");

  try {
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
    
    const newSubmission = {
      code,
      language: languageMap[languageId],
      timestamp: new Date().toLocaleString(),
      status: allPassed ? "Accepted" : "Wrong Answer",
      testResults
    };
    
    setSubmissions(prev => [newSubmission, ...prev]);
    
    // Generate formatted output for test cases
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
          
          <div className="constraints-section">
            <h3>Constraints:</h3>
            <ul>
              {problemData.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
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
                      {submission.testResults.map((test, testIdx) => (
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