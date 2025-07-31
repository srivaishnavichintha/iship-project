import Student_navabar from "../Student_navabar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CCard from "../components/CCard";
import { Link } from "react-router-dom";
import "./Student_main_dashboard.css";

export default function Student_main_dashboard() {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3000/active-courses")
      .then((res) => {
        console.log("Courses data:", res.data.activeCourses); // Debug log
        setCourses(res.data.activeCourses);
      })
      .catch((err) => {
        console.error("Error fetching courses", err);
      });
  }, []);

  function scrollCards(direction) {
    const container = document.getElementById("scrollContainer");
    const scrollAmount = 320; 

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  return (
    <>
      <Student_navabar />
      <h1 className="dash-head">Ongoing Courses</h1>
      <div className="cdata-wrapper">
        <button className="scroll-button left" onClick={() => scrollCards("left")}>◀</button>

        <div className="cdata" id="scrollContainer">
          {courses.map((course) => (
            <CCard
              key={course.courseid} 
              id={course.courseid}
              title={course.coursename}
              description={course.description}
              endDate={new Date(course.enrollmentend).toLocaleDateString()}
              tags={Array.isArray(course.category) ? course.category : [course.category]}
              mentor={course.mentor || "Platform Mentor"} // Default mentor if not provided
            />
          ))}
        </div>

        <button className="scroll-button right" onClick={() => scrollCards("right")}>▶</button>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-heading">Practice Problems</h2>
        <div className="dashboard-card-container">
          <div className="dashboard-card">
            <h3>Compete with peers</h3>
            <p>Sharpen your skills with competeing on coding challenge!</p>
            <Link to="/students/peer2peer" className="dashboard-button">Solve Now</Link>
          </div>
          <div className="dashboard-card">
            <h3>Topic-wise Practice</h3>
            <p>Choose a topic and start solving relevant problems.</p>
            <Link to="/practice" className="dashboard-button">Start Practicing</Link>
          </div>
          <div className="dashboard-card">
            <h3>Level based Problems</h3>
            <p>Every expert was once a beginner who kept leveling up.</p>
            <Link to="/practice/courses" className="dashboard-button">Resume</Link>
          </div>
        </div>
      </div>

     

      <div className="dashboard-section">
        <h2 className="dashboard-heading">Student Progress</h2>
        <div className="dashboard-card-container">
          <div className="dashboard-card">
            <h3>Problems Solved</h3>
            <p><strong>124</strong></p>
          </div>
          <div className="dashboard-card">
            <h3>Accuracy</h3>
            <p><strong>87%</strong></p>
          </div>
          <div className="dashboard-card">
            <h3>Daily Streak</h3>
            <p><strong>10 Days</strong></p>
          </div>
        </div>
      </div>

      
    </>
  );
}