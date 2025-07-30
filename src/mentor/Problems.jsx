
import React, { useState, useEffect } from "react";
import Mentor_navbar from "../Mentor_navbar";
import axios from "axios";
import "./Problems.css";

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsRes = await axios.get("http://localhost:3000/mentor/problems/tags");
        console.log(tagsRes.data.companies);
        setTopics(tagsRes.data.topics || []);
        setCompanies(tagsRes.data.companies || []);

        const problemsRes = await axios.get("http://localhost:3000/mentor/problems");
        setProblems(problemsRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const levels = ["Easy", "Medium", "Hard"];

  const [showForm, setShowForm] = useState(false);
  const [prerequisites, setPrerequisites] = useState([]);
  const [prereqInput, setPrereqInput] = useState("");
  const [companyTags, setCompanyTags] = useState([]);
  const [companyInput, setCompanyInput] = useState("");
  const [formData, setFormData] = useState({
    problemtitle: "",
    description: "",
    level: ""
  });
  const [inputs, setInputs] = useState([""]);
  const [outputs, setOutputs] = useState([""]);

  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter" && (type === "prereq" ? prereqInput : companyInput).trim() !== "") {
      e.preventDefault();
      const trimmed = (type === "prereq" ? prereqInput : companyInput).trim();
      if (type === "prereq" && !prerequisites.includes(trimmed)) {
        setPrerequisites((prev) => [...prev, trimmed]);
        setPrereqInput("");
      }
      if (type === "company" && !companyTags.includes(trimmed)) {
        setCompanyTags((prev) => [...prev, trimmed]);
        setCompanyInput("");
      }
    }
  };

  const removeTag = (valueToRemove, type) => {
    if (type === "prereq") {
      setPrerequisites((prev) => prev.filter((tag) => tag !== valueToRemove));
    } else {
      setCompanyTags((prev) => prev.filter((tag) => tag !== valueToRemove));
    }
  };

  const handleclick = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleAddTestCase = () => {
    setInputs([...inputs, ""]);
    setOutputs([...outputs, ""]);
  };

  const handleRemoveTestCase = () => {
    if (inputs.length > 1) {
      setInputs(inputs.slice(0, -1));
      setOutputs(outputs.slice(0, -1));
    }
  };

  const handleChangeInput = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const handleChangeOutput = (index, value) => {
    const updated = [...outputs];
    updated[index] = value;
    setOutputs(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        prerequisites,
        companyTags,
        inputs,
        outputs,
        mentorId: "tej"
      };
      await axios.post("http://localhost:3000/mentor/problems/add", payload);
      alert("Problem added successfully!");
      setShowForm(false);
      setFormData({ problemtitle: "", description: "", level: "" });
      setInputs([""]);
      setOutputs([""]);
      setPrerequisites([]);
      setCompanyTags([]);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to add problem!");
    }
  };

  return (
    <>
      <Mentor_navbar />
      <div className="problems-container">
        {showForm && (
          <div className="form_overlay">
            <div className="course_form slide-down">
              <h2>Add New Problem</h2>
              {/* [form section remains unchanged] */}
              {/* ... */}
            </div>
          </div>
        )}

        <div className="problems-header">
          <h1>PROBLEMS</h1>
          <button className="add-problem-btn" onClick={handleclick}>Add Problems</button>
        </div>

        <div className="filters-section">
          <div className="filters-group">
            <div className="filter-item">
              <label htmlFor="topic-filter">Topic</label>
              <select id="topic-filter" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                <option value="All Topics">All Topics</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label htmlFor="level-filter">Level</label>
              <select id="level-filter" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                <option value="All Levels">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-item">
            <label htmlFor="company-filter">Company</label>
            <select id="company-filter" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
              <option value="All Companies">All Companies</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="problems-list">
          <div className="problems-list-header">
            <div className="header-id">#</div>
            <div className="header-title">Title</div>
            <div className="header-difficulty">Difficulty</div>
            <div className="header-acceptance">Acceptance</div>
            <div className="header-tags">Tags</div>
            <div className="header-action"></div>
          </div>

          {filteredProblems.map(problem => (
            <div key={problem._id} className="problem-card">
              <div className="problem-id">{problem.problemid}</div>
              <div className="problem-title">{problem.problemtitle}</div>
              <div className={`problem-difficulty ${problem.level.toLowerCase()}`}>{problem.level}</div>
              {/* Acceptance (optional) */}
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
                <button className="solve-button">View Challenge</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
