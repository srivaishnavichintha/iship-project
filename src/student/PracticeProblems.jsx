import React, { useState } from "react";
import Student_navabar from "../Student_navabar";
import "./PracticeProblems.css"; 
import { useNavigate } from "react-router-dom";
export default function Problems() {
  const topics = ["Arrays", "Strings", "Recursion"];
  const companies = ["Google", "Amazon", "Meta"];
  const levels = ["Easy", "Medium", "Hard"];

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      level: "Easy",
      acceptance: "78%",
      topics: ["Arrays"],
      companies: ["Google", "Amazon"]
    },
    {
      id: 2,
      title: "Longest Substring Without Repeating Characters",
      level: "Medium",
      acceptance: "60%",
      topics: ["Strings"],
      companies: ["Meta"]
    },
    {
      id: 3,
      title: "Word Break",
      level: "Hard",
      acceptance: "43%",
      topics: ["Recursion", "Strings"],
      companies: ["Amazon"]
    }
  ];
  const navigate = useNavigate();

// const handleSolveClick = (problemId) => {
//   navigate(`/solve/${problemId}`);
// };


  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProblems = problems.filter((problem) => {
    const matchesTopic =
      selectedTopic === "All Topics" || problem.topics.includes(selectedTopic);
    const matchesLevel =
      selectedLevel === "All Levels" || problem.level === selectedLevel;
    const matchesCompany =
      selectedCompany === "All Companies" || problem.companies.includes(selectedCompany);
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesLevel && matchesCompany && matchesSearch;
  });

  return (
    <>
      <Student_navabar />
      <div className="student-problems-container">
        <div className="student-problems-header">
          <h1>PROBLEMS</h1>
        </div>

        <div className="student-filters-section">
          <div className="student-filters-group">
            <div className="student-filter-item">
              <label htmlFor="topic-filter">Topic</label>
              <select id="topic-filter" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                <option value="All Topics">All Topics</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <div className="student-filter-item">
              <label htmlFor="level-filter">Level</label>
              <select id="level-filter" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                <option value="All Levels">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="student-filter-item">
            <label htmlFor="company-filter">Company</label>
            <select id="company-filter" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
              <option value="All Companies">All Companies</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="student-problems-list">
          <div className="student-problems-list-header">
            <div className="header-id">#</div>
            <div className="header-title">Title</div>
            <div className="header-difficulty">Difficulty</div>
            <div className="header-acceptance">Acceptance</div>
            <div className="header-tags">Tags</div>
            <div className="header-action"></div>
          </div>
            {filteredProblems.map(problem => (
                <div key={problem.id} className="student-problem-card">
                <div className="problem-id">{problem.id}</div>
                <div className="problem-title">{problem.title}</div>
                <div className={`problem-difficulty ${problem.level.toLowerCase()}`}>
                {problem.level}
                </div>

                <div className="problem-acceptance">{problem.acceptance}</div>

                <div className="problem-tags-container">
                <div className="problem-tags-scroll">
                <div className="topic-tags">
                {problem.topics.map((topic, index) => (
                <span key={index} className="topic-tag">{topic}</span>
                ))}
                </div>
                <div className="company-tags">
                {problem.companies.map((company, index) => (
                <span key={index} className="company-tag">{company}</span>
            ))}
            </div>
            </div>
            </div>

            <div className="problem-action">
             <button className="solve-button" onClick={() => handleSolveClick(problem.id)}>
                 Solve Challenge
             </button>

            </div>
            </div>
            ))}

        </div>
      </div>
    </>
  );
}