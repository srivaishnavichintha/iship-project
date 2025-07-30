import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Course.css";
import Mentor_navbar from "../Mentor_navbar";
import Mccard from "../components/Mccard";
import { useParams } from "react-router-dom";

export default function Course() {
  const { mentorid } = useParams(); // ⬅️ Move this line here

  const [showForm, setShowForm] = useState(false);
  const [prerequisites, setPrerequisites] = useState([]);
  const [prereqInput, setPrereqInput] = useState("");
  const [my_mentor_courses, setmy_mentor_courses] = useState([]);
  const [formData, setFormData] = useState({
    courseid: "",
    coursename: "",
    description: "",
    category: "",
    level: "",
    enrollmentend: "",
    max_participants: ""
  });

  // rest of your code...

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
    useEffect(() => {
  if (!mentorid) return;

  axios.get(`http://localhost:3000/mentor/courses/${mentorid}`)
    .then((res) => {
      setmy_mentor_courses(res.data);
    })
    .catch((err) => {
      console.error("Error fetching mentor's courses:", err);
    });
}, [mentorid]);



  const handlecourse = async () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      const mentorid =user?.id;
    if (!formData.coursename || !formData.description || !formData.category ||
        !formData.level || !formData.enrollmentend || !formData.max_participants) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const endpoint = "http://localhost:3000/mentor/courses";
      const payload = {
        ...formData,
        max_participants: Number(formData.max_participants),
        enrollmentend: new Date(formData.enrollmentend).toISOString(),
        prerequisites,
        mentorid,
        // created_at: new Date().toISOString()
      };

      if (new Date(payload.enrollmentend) < new Date()) {
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
        enrollmentend: "",
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
              <h2 >Add New Course</h2>

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
                  name="enrollmentend"
                  value={formData.enrollmentend}
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
           {/* <Mccard
              title="Interview Crash Course"
              description="Master D and Algorithms for technical interviews. Includes mock tests and live sessions."
              mentor="Pawan"
              endDate="25/05/2020"
              tags={["DSA", "Interview Prep", "Live Sessions", "Mock Tests"]}
            /> */}
            {my_mentor_courses.map((course, index) => (
                <Mccard
                key={index}
                id={course.courseid}
                title={course.coursename}
                description={course.description}
                mentor={course.mentorname}
                endDate={course.enrollmentend}
                tags={course.prerequisites}
                />
            ))}

        </div>
      </div>
    </>
  );
}