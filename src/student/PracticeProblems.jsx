import React, { useState, useEffect } from "react";
import Student_navabar from "../Student_navabar";
import axios from "axios";
import "./PracticeProblems.css";
import { useNavigate } from "react-router-dom";

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");

  const levels = ["Easy", "Medium", "Hard"];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsRes = await axios.get("http://localhost:3000/mentor/problems/tags");
        setTopics(tagsRes.data.topics || []);
        setCompanies(tagsRes.data.companies || []);

        const problemsRes = await axios.get("http://localhost:3000/mentor/problems");
        setProblems(problemsRes.data || []);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProblems = problems.filter((problem) => {
    const matchesTopic =
      selectedTopic === "All Topics" || problem.prerequisites.includes(selectedTopic);
    const matchesLevel =
      selectedLevel === "All Levels" || problem.level === selectedLevel;
    const matchesCompany =
      selectedCompany === "All Companies" || problem.companyTags.includes(selectedCompany);
    const matchesSearch =
      problem.problemtitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTopic && matchesLevel && matchesCompany && matchesSearch;
  });

  const handleSolveClick = (problemId) => {
    navigate(`/solve/${problemId}`);
  };

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

          {filteredProblems.map((problem, index) => (
            <div key={problem._id} className="student-problem-card">
              <div className="problem-id">{index + 1}</div>
              <div className="problem-title">{problem.problemtitle}</div>
              <div className={`problem-difficulty ${problem.level.toLowerCase()}`}>
                {problem.level}
              </div>
              <div className="problem-acceptance">--</div>

              <div className="problem-tags-container">
                <div className="problem-tags-scroll">
                  <div className="topic-tags">
                    {problem.prerequisites.map((topic, index) => (
                      <span key={index} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                  <div className="company-tags">
                    {problem.companyTags.map((company, index) => (
                      <span key={index} className="company-tag">{company}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="problem-action">
                <button className="solve-button" onClick={() => handleSolveClick(problem._id)}>
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
