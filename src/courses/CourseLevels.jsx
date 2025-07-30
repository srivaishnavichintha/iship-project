import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseLevels.css";

const levelsData = [
  {
    level: "Level 1",
    title: "Programming Basics",
    topics: [
      { name: "Variables", id: "Variables" },
      { name: "Loops", id: "Loops" },
      { name: "Functions", id: "Functions" },
    ],
  },
  {
    level: "Level 2",
    title: "Intermediate DSA",
    topics: [
      { name: "Arrays", id: "Arrays" },
      { name: "Stacks", id: "Stacks" },
      { name: "Sorting", id: "Sorting" },
    ],
  },
  {
    level: "Level 3",
    title: "Advanced Concepts",
    topics: [
      { name: "Trees", id: "Trees" },
      { name: "Graphs", id: "Graphs" },
      { name: "DP", id: "DP" },
    ],
  },
];

export default function CourseLevels() {
  return (
    <div className="levels-wrapper">
      {levelsData.map((level, idx) => (
        <LevelCard key={idx} level={level} />
      ))}
    </div>
  );
}

function LevelCard({ level }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleTopicClick = (topicId) => {
    navigate(`/courses/interview-crash-course/problems?topic=${encodeURIComponent(topicId)}`);
  };

  return (
    <div className="level-card">
      <div className="level-header" onClick={() => setExpanded(!expanded)}>
        <div>
          <h3>{level.level}</h3>
          <p>{level.title}</p>
        </div>
        <button className="toggle-button">{expanded ? "▲" : "▼"}</button>
      </div>
      {expanded && (
        <ul className="topic-list">
          {level.topics.map((topic, index) => (
            <li
              key={index}
              className="topic-bar"
              onClick={() => handleTopicClick(topic.id)}
            >
              {topic.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
