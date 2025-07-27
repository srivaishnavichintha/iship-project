import React, { useState } from "react";
import "./Course.css";
import Mentor_navbar from "../Mentor_navbar";
import { v4 as uuidv4 } from "uuid"; 

const CourseCard = () => {
  return (
    <div className="card">
      <div className="rec">
        <div className="rec1"></div>
        <div className="rec2"></div>
        <div className="rec3"></div>
      </div>
    </div>
  );
};

export default function Course() {
  const [showForm, setShowForm] = useState(false);
  const [peerOption, setPeerOption] = useState("disable");
  const [prerequisites, setPrerequisites] = useState([]);
  const [prereqInput, setPrereqInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && prereqInput.trim() !== "") {
      e.preventDefault();
      const newTag = {
        id: uuidv4(),
        value: prereqInput.trim(),
      };
      setPrerequisites((prev) => [...prev, newTag]);
      setPrereqInput("");
    }
  };

  const removePrerequisite = (idToRemove) => {
    setPrerequisites((prev) => prev.filter((tag) => tag.id !== idToRemove));
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <Mentor_navbar />
      <div className="stu_con">
        {showForm && (
          <div className="form_overlay">
            <div className="course_form slide-down">
              <h2>Add New Course</h2>

              <label>
                Course Name:<br />
                <input type="text" placeholder="Course Name" required />
              </label>

              <label>
                Description:<br />
                <textarea placeholder="Enter course description here" required />
              </label>

              <label>
                Category:<br />
                <input type="text" placeholder="e.g., DSA, Web Dev" required />
              </label>

              <label>
                Prerequisites:<br />
                <div className="tag-container">
                  {prerequisites.map((tag) => (
                    <span key={tag.id} className="tag">
                      {tag.value}
                      <button
                        type="button"
                        className="remove-tag"
                        onClick={() => removePrerequisite(tag.id)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Press Enter to add"
                  value={prereqInput}
                  onChange={(e) => setPrereqInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </label>

              <label htmlFor="enrollmentEnd">
                Enrollment End Date:
                <input
                  type="date"
                  id="enrollmentEnd"
                  name="enrollmentEnd"
                  required
                />
              </label>

              <label>
                Peer-to-Peer Access:
                <div className="peer-radio-group">
                  <label
                    className={
                      peerOption === "enable" ? "radio-btn selected" : "radio-btn"
                    }
                  >
                    <input
                      type="radio"
                      value="enable"
                      checked={peerOption === "enable"}
                      onChange={() => setPeerOption("enable")}
                    />
                    Enable
                  </label>
                  <label
                    className={
                      peerOption === "disable" ? "radio-btn selected" : "radio-btn"
                    }
                  >
                    <input
                      type="radio"
                      value="disable"
                      checked={peerOption === "disable"}
                      onChange={() => setPeerOption("disable")}
                    />
                    Disable
                  </label>
                </div>
              </label>

              <label>
                Max Participants:<br />
                <input type="number" placeholder="e.g., 60" required />
              </label>

              <div className="form_buttons">
                <button className="submit_btn">Add Course</button>
                <button className="cancel_btn" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="title_bar">
          <h1>My Courses</h1>
          <button className="plus_btn" onClick={handleAddClick}>
            +
          </button>
        </div>

        <div className="card_cover">
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </>
  );
}
