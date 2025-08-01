import Student_navabar from "../Student_navabar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CCard from "../components/CCard";
import { Link } from "react-router-dom";
import "./Student_main_dashboard.css";

export default function Student_main_dashboard() {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({
  problemsSolved: 0,
  accuracy: 0,
  contests: 0
});

useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const studentId = userData?.id;

  if (studentId) {
    axios.get(`http://localhost:3000/student-progress/${studentId}`)
      .then((res) => {
        setProgress(res.data);
      })
      .catch((err) => {
        console.error("Error fetching student progress", err);
      });
  }
}, []);
  
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
        <h2 className="dashboard-heading">Practice Paths</h2>
        <div className="dashboard-card-container">
          <div className="dashboard-card">
            <h3>Sharpen by Topic</h3>
            <p>Pick a topic and dive into handpicked problems to build deep, focused skills.</p>
            <Link to="/practice" className="dashboard-button">Start Practicing</Link>
          </div>
          <div className="dashboard-card">
            <h3>Battle Your Peers</h3>
            <p>Unleash your coding skills in thrilling challenges and climb the leaderboard like a true warrior!</p>
            <Link to="/student/peer2peer" className="dashboard-button">Solve Now</Link>
          </div>
          <div className="dashboard-card">
            <h3>Climb the Ladder</h3>
            <p>Beat beginner levels, unlock harder ones, and become the boss coder you’re meant to be</p>
            <Link to="/practice/courses" className="dashboard-button">Resume</Link>
          </div>
        </div>
      </div>

     

      <div className="dashboard-section">
        <h2 className="dashboard-heading">Your Progress</h2>
        <div className="dashboard-card-container">
          <div className="dashboard-card">
            <h3>Problems Solved</h3>
            <p><strong>{progress.problemsSolved}</strong></p>
          </div>
          <div className="dashboard-card">
            <h3>Accuracy</h3>
            <p><strong>{progress.accuracy}%</strong></p>
          </div>
          <div className="dashboard-card">
            <h3>Contests Attended</h3>
            <p><strong>{progress.contests}</strong></p>
          </div>
        </div>
      </div>

      
    </>
  );
}