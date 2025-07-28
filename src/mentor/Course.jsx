import React, { useState } from "react";
import axios from "axios";
import "./Course.css";
import Mentor_navbar from "../Mentor_navbar";

const CourseCard = ({ title }) => {
  return (
    <div className="card">
      <div className="rec">
        <div className="rec1"></div>
        <div className="rec2"></div>
        <div className="rec3"></div>
      </div>
      {title && <h4 className="card-title">{title}</h4>}
    </div>
  );
};

export default function Course() {
  const [showForm, setShowForm] = useState(false);
  const [prerequisites, setPrerequisites] = useState([]);
  const [prereqInput, setPrereqInput] = useState("");
  const [formData, setFormData] = useState({
    courseid:"",
    coursename: "",
    description: "",
    category: "",
    level: "",
    enrollementend: "",
    max_participants: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && prereqInput.trim() !== "") {
      e.preventDefault();
      const trimmedValue = prereqInput.trim();
      if (!prerequisites.includes(trimmedValue)) {
        setPrerequisites((prev) => [...prev, trimmedValue]);
      }
      setPrereqInput("");
    }
  };

  const removePrerequisite = (valueToRemove) => {
    setPrerequisites((prev) => prev.filter((tag) => tag !== valueToRemove));
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handlecourse = async () => {
    if (!formData.coursename || !formData.description || !formData.category ||
        !formData.level || !formData.enrollementend || !formData.max_participants) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const endpoint = "http://localhost:3000/mentor/courses";
      const payload = {
        ...formData,
        max_participants: Number(formData.max_participants),
        enrollementend: new Date(formData.enrollementend).toISOString(),
        prerequisites,
        // created_at: new Date().toISOString()
      };

      if (new Date(payload.enrollementend) < new Date()) {
        alert("Enrollment end date must be in the future");
        return;
      }

      if (payload.max_participants <= 0) {
        alert("Max participants must be a positive number");
        return;
      }

      const res = await axios.post(endpoint, payload);

      console.log("Course added:", res.data);
      alert("Course added successfully!");

      setShowForm(false);
      setFormData({
        courseid:"",
        coursename: "",
        description: "",
        category: "",
        level: "",
        enrollementend: "",
        max_participants: ""
      });
      setPrerequisites([]);

    } catch (error) {
      console.error("Error adding course:", error.response?.data || error.message);
     alert(`Failed to add course: ${error.response?.data?.message || error.message}`);
    }

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
                Course Id:<br />
                <input
                  type="text"
                  placeholder="Course ID"
                  name="courseid"
                  value={formData.courseid}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Course Name:<br />
                <input
                  type="text"
                  placeholder="Course Name"
                  name="coursename"
                  value={formData.coursename}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Description:<br />
                <textarea
                  placeholder="Enter course description here"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Category:<br />
                <input
                  type="text"
                  placeholder="e.g., DSA, Web Dev"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Level:<br />
                <input
                  type="text"
                  placeholder="e.g., Beginner, Intermediate, Advanced"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Prerequisites:<br />
                <div className="tag-container">
                  {prerequisites.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                      <button
                        type="button"
                        className="remove-tag"
                        onClick={() => removePrerequisite(tag)}
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

              <label>
                Enrollment End Date:<br />
                <input
                  type="date"
                  name="enrollementend"
                  value={formData.enrollementend}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Max Participants:<br />
                <input
                  type="number"
                  placeholder="e.g., 60"
                  name="max_participants"
                  value={formData.max_participants}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <div className="form_buttons">
                <button className="submit_btn" onClick={handlecourse}>
                  Add Course
                </button>
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
          <CourseCard  />
          <CourseCard />
          <CourseCard  />
        </div>
      </div>
    </>
  );
}