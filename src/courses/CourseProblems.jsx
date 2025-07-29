import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./CourseProblems.css";

const allProblems = [
  {
    title: "Reverse an Array",
    company: "Google",
    topics: ["Arrays"],
  },
  {
    title: "Binary Tree Traversal",
    company: "Amazon",
    topics: ["Trees"],
  },
  {
    title: "Detect Cycle in Graph",
    company: "Meta",
    topics: ["Graphs"],
  },
  {
    title: "Sort an Array",
    company: "Microsoft",
    topics: ["Sorting"],
  },
  {
    title: "Fibonacci using DP",
    company: "Adobe",
    topics: ["Dynamic Programming"],
  },
];

export default function CourseProblems() {
  const { courseId } = useParams(); // ensure this route matches in App.jsx
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const selectedTopic = params.get("topic");
  const selectedCompany = params.get("company");

  const [activeTopic, setActiveTopic] = useState(selectedTopic || "");
  const [activeCompany, setActiveCompany] = useState(selectedCompany || "");

  const topics = [...new Set(allProblems.flatMap((p) => p.topics))];
  const companies = [...new Set(allProblems.map((p) => p.company))];

  const filteredProblems = allProblems.filter((problem) => {
    const matchTopic = activeTopic ? problem.topics.includes(activeTopic) : true;
    const matchCompany = activeCompany ? problem.company === activeCompany : true;
    return matchTopic && matchCompany;
  });

  const handleTopicClick = (topic) => {
    const newTopic = topic === activeTopic ? "" : topic;
    setActiveTopic(newTopic);
    updateURL(newTopic, activeCompany);
  };

  const handleCompanyClick = (company) => {
    const newCompany = company === activeCompany ? "" : company;
    setActiveCompany(newCompany);
    updateURL(activeTopic, newCompany);
  };

  const updateURL = (topic, company) => {
    const query = new URLSearchParams();
    if (topic) query.set("topic", topic);
    if (company) query.set("company", company);
    window.history.replaceState(null, "", `?${query.toString()}`);
  };

  return (
    <div className="problems-container">
      <h2>Problems</h2>

      <div className="filters">
        <h4>Topics</h4>
        {topics.map((topic, index) => (
          <div
            key={index}
            className={`tag ${activeTopic === topic ? "active" : ""}`}
            onClick={() => handleTopicClick(topic)}
          >
            {topic}
          </div>
        ))}
      </div>

      <div className="filters">
        <h4>Companies</h4>
        {companies.map((company, index) => (
          <div
            key={index}
            className={`tag ${activeCompany === company ? "active" : ""}`}
            onClick={() => handleCompanyClick(company)}
          >
            {company}
          </div>
        ))}
      </div>

      <div className="problem-list">
        {filteredProblems.map((problem, index) => (
          <div key={index} className="problem-card">
            <h3>{problem.title}</h3>
            <div className="problem-tags">
              {problem.topics.map((t, i) => (
                <div
                  key={i}
                  className={`tag ${activeTopic === t ? "active" : ""}`}
                  onClick={() => handleTopicClick(t)}
                >
                  {t}
                </div>
              ))}
              <div
                className={`tag ${activeCompany === problem.company ? "active" : ""}`}
                onClick={() => handleCompanyClick(problem.company)}
              >
                {problem.company}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
