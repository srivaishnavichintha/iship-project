import React, { useState } from "react";
import "../Practice_data.css";
import Mentor_navbar from "../Mentor_navbar";
import axios from "axios";

export default function Problems() {
  const [showForm, setShowForm] = useState(false);
  const [prerequisites, setPrerequisites] = useState([]);
  const [prereqInput, setPrereqInput] = useState("");

  const [companyTags, setCompanyTags] = useState([]);
  const [companyInput, setCompanyInput] = useState("");

  const [formData, setFormData] = useState({
    problemtitle: "",
    description: "",
    level: "",
  });

  const [inputs, setInputs] = useState([""]);
  const [outputs, setOutputs] = useState([""]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      };
      const res = await axios.post("http://localhost:3000/mentor/problems", payload);
      alert("Problem added successfully!");
      setShowForm(false);
      setFormData({ problemtitle: "", description: "", level: "" });
      setInputs([""]);
      setOutputs([""]);
      setPrerequisites([]);
      setCompanyTags([]);
    } catch (err) {
      console.error(err);
      alert("Failed to add problem!");
    }
  };

  return (
    <>
      <Mentor_navbar />
      <div className="dash">
        {showForm && (
          <div className="form_overlay">
            <div className="course_form slide-down">
              <h2>Add New Problem</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Problem Title:<br />
                  <input
                    type="text"
                    placeholder="Title"
                    name="problemtitle"
                    value={formData.problemtitle}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  Description:<br />
                  <textarea
                    placeholder="Enter problem description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  Level:<br />
                  <input
                    type="text"
                    placeholder="e.g., Easy, Medium, Hard"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Category:<br />
                  <div className="tag-container">
                    {prerequisites.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                        <button
                          type="button"
                          className="remove-tag"
                          onClick={() => removeTag(tag, "prereq")}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Press Enter to add category"
                    value={prereqInput}
                    onChange={(e) => setPrereqInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, "prereq")}
                  />
                </label>
                <label>
                  Company Tags:<br />
                  <div className="tag-container">
                    {companyTags.map((tag, index) => (
                      <span key={index} className="tag company">
                        {tag}
                        <button
                          type="button"
                          className="remove-tag"
                          onClick={() => removeTag(tag, "company")}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Press Enter to add company tag"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, "company")}
                  />
                </label>
                <label>
                  Test Cases:<br />
                  {inputs.map((input, i) => (
                    <div className="testcase-row" key={i}>
                      <input
                        type="text"
                        placeholder={`Input ${i + 1}`}
                        value={input}
                        onChange={(e) => handleChangeInput(i, e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder={`Output ${i + 1}`}
                        value={outputs[i]}
                        onChange={(e) => handleChangeOutput(i, e.target.value)}
                      />
                    </div>
                  ))}

                  <div className="testcase-buttons">
                    <button type="button" onClick={handleAddTestCase}>+ Add Test Case</button>
                    <button type="button" onClick={handleRemoveTestCase} className="cancel-testcase-btn">– Cancel Last</button>
                  </div>
                </label>

                <div className="form_buttons">
                  <button type="submit" className="submit_btn">Add Problem</button>
                  <button type="button" className="cancel_btn" onClick={handleClose}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="problemsdata">
          <div className="headingcard">
            <h1>PROBLEMS</h1>
            <button onClick={handleclick}>Add Problems</button>
          </div>

          <div className="coding_data">
            <div className="c1">
              <h4>1</h4>
              <h4>Adding two numbers</h4>
            </div>
            <div className="c2">
              <p>Easy</p>
              <p>10%</p>
              <button>Solve Challenge</button>
            </div>
          </div>

          <div className="coding_data">
            <div className="c1">
              <h4>2</h4>
              <h4>Reverse a string</h4>
            </div>
            <div className="c2">
              <p>Easy</p>
              <p>15%</p>
              <button>Solve Challenge</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
