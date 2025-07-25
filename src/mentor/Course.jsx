import React, { useState } from "react";
import "./Course.css";

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

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div className="stu_con">
      {showForm && (
        <div className="form_overlay">
          <div className="course_form slide-down">
            <h2>Add New Course</h2>
            <input type="text" placeholder="Course Name" />
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="Level (Beginner, Intermediate, Advanced)" />
            <input type="text" placeholder="Category" />
            <div className="form_buttons">
              <button className="submit_btn">Add Course</button>
              <button className="cancel_btn" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="title_bar">
        <h1>My Courses</h1>
        <button className="plus_btn" onClick={handleAddClick}>+</button>
      </div>

      <div className="card_cover">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
}
