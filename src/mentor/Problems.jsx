import React, { useState, useEffect } from "react";
import Mentor_navbar from "../Mentor_navbar";
import axios from "axios";
import "./Problems.css";
import { useNavigate } from "react-router-dom";


export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsRes = await axios.get("http://localhost:3000/mentor/problems/tags");
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
  const navigate = useNavigate();

const handleViewChallenge = (problemId) => {
  navigate(`/solve/${problemId}`);
};


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
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = type === "prereq" ? prereqInput.trim() : companyInput.trim();
      if (type === "prereq" && trimmed && !prerequisites.includes(trimmed)) {
        setPrerequisites((prev) => [...prev, trimmed]);
        setPrereqInput("");
      }
      if (type === "company" && trimmed && !companyTags.includes(trimmed)) {
        setCompanyTags((prev) => [...prev, trimmed]);
        setCompanyInput("");
      }
    }
  };

  const removeTag = (tag, type) => {
    if (type === "prereq") {
      setPrerequisites((prev) => prev.filter((t) => t !== tag));
    } else {
      setCompanyTags((prev) => prev.filter((t) => t !== tag));
    }
  };

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
  const userData = JSON.parse(localStorage.getItem("userData"));
  const mentorid = String(userData?.id);
  const mentorname = userData?.name;

  if (!mentorid || !mentorname) {
    alert("Mentor information is missing. Please log in again.");
    return;
  }

  // ✅ Filter out empty test cases
  const cleanedInputs = inputs.map(i => i.trim()).filter(i => i !== "");
  const cleanedOutputs = outputs.map(o => o.trim()).filter(o => o !== "");

  if (
    !formData.problemtitle ||
    !formData.description ||
    !formData.level ||
    cleanedInputs.length === 0 ||
    cleanedOutputs.length === 0
  ) {
    alert("Please fill in all required fields including at least one valid test case.");
    return;
  }

  const payload = {
  problemtitle: formData.problemtitle.trim(),
  description: formData.description.trim(),
  level: formData.level,
  prerequisites,
  companyTags,
  inputs: cleanedInputs,
  outputs: cleanedOutputs,
  mentorid
};


  try {
    console.log("Submitting payload:", payload);
    await axios.post("http://localhost:3000/mentor/problems/add", payload, {
  headers: { "Content-Type": "application/json" }
});

    alert("Problem added successfully!");

    // Reset state
    setShowForm(false);
    setFormData({ problemtitle: "", description: "", level: "" });
    setInputs([""]);
    setOutputs([""]);
    setPrerequisites([]);
    setCompanyTags([]);
  }catch (err) {
  console.error("Submit error:", err.response?.data || err.message);
  alert(`Failed to add problem: ${err.response?.data?.error || err.message}`);
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
              <form onSubmit={handleSubmit}>
                <label>Problem name</label>
                <input
                  type="text"
                  name="problemtitle"
                  placeholder="Problem Title"
                  value={formData.problemtitle}
                  onChange={handleInputChange}
                  required
                />
                <label>Problem description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                <br></br>
                <label>level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Difficulty</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>

                <label>Topic</label>
                <div className="tag-input-section">
                  <input
                    type="text"
                    placeholder="Add Topic"
                    value={prereqInput}
                    onChange={(e) => setPrereqInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, "prereq")}
                  />
                  <div className="tags-display">
                    {prerequisites.map((tag, idx) => (
                      <span key={idx} onClick={() => removeTag(tag, "prereq")}>
                        {tag} ✕
                      </span>
                    ))}
                  </div>
                </div>

                {/* Company Tags */}

                <div className="tag-input-section">
                  <label>Company</label>
                  <input
                    type="text"
                    placeholder="Add Company"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, "company")}
                  />
                  <div className="tags-display">
                    {companyTags.map((tag, idx) => (
                      <span key={idx} onClick={() => removeTag(tag, "company")}>
                        {tag} ✕
                      </span>
                    ))}
                  </div>
                </div>

                {/* Test Cases */}
                <label>Testcases</label>
                {inputs.map((input, idx) => (
                  <div key={idx} className="test-case">
                    <input
                      type="text"
                      placeholder={`Input ${idx + 1}`}
                      value={input}
                      onChange={(e) => handleChangeInput(idx, e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder={`Output ${idx + 1}`}
                      value={outputs[idx]}
                      onChange={(e) => handleChangeOutput(idx, e.target.value)}
                    />
                  </div>
                ))}
                <div className="testcase-buttons">
                  <button type="button" onClick={handleAddTestCase}>+ Add Test Case</button>
                  <button type="button" onClick={handleRemoveTestCase}>- Remove</button>
                </div>

                <div className="form-actions">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PAGE HEADER */}
        <div className="problems-header">
          <h1>PROBLEMS</h1>
          <button className="add-problem-btn" onClick={() => setShowForm(true)}>Add Problems</button>
        </div>

        {/* FILTERS */}
        <div className="filters-section">
          <div className="filters-group">
            <div className="filter-item">
              <label>Topic</label>
              <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                <option>All Topics</option>
                {topics.map(topic => <option key={topic}>{topic}</option>)}
              </select>
            </div>

            <div className="filter-item">
              <label>Level</label>
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                <option>All Levels</option>
                {levels.map(level => <option key={level}>{level}</option>)}
              </select>
            </div>
          </div>

          <div className="filter-item">
            <label>Company</label>
            <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
              <option>All Companies</option>
              {companies.map(company => <option key={company}>{company}</option>)}
            </select>
          </div>
        </div>

        {/* PROBLEMS LIST */}
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
              <div className="problem-id">{problem.problemId}</div>
              <div className="problem-title">{problem.problemtitle}</div>
              <div className={`problem-difficulty ${problem.level.toLowerCase()}`}>{problem.level}</div>
              <div className="problem-acceptance">--</div>
              <div className="problem-tags-container">
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
              <div className="problem-action">
                <button className="solve-button" onClick={handleViewChallenge}>View Challenge</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
