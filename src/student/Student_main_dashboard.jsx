import Student_navabar from "../Student_navabar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CCard from "../components/CCard"
import { Link } from "react-router-dom";
import "./Student_main_dashboard.css";



export default function Student_main_dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/active-courses")
      .then((res) => {
        setCourses(res.data);
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
      {/* <Stu_dash_con /> */}
      <h1 className="dash-head">Popular Courses</h1>
      <div className="cdata-wrapper">
          <button className="scroll-button left" onClick={() => scrollCards("left")}>◀</button>

          <div className="cdata" id="scrollContainer">
   <Link to="/courses/interview-crash-course" style={{ textDecoration: "none" }}>
  <CCard
    title="Interview Crash Course"
    description="Master D and Algorithms for technical interviews. Includes mock tests and live sessions."
    mentor="Pawan"
    endDate="25/05/2020"
    tags={["DSA", "Interview Prep", "Live Sessions", "Mock Tests"]}
  />
</Link>

           {/* {courses.map((course, index) => (
            <CCard
              key={index}
              title={course.title}
              description={course.description}
              mentor={course.mentor}
              endDate={new Date(course.endDate).toLocaleDateString()}
               tags={course.tags || []}
            />
          ))} */}
          </div>

          <button className="scroll-button right" onClick={() => scrollCards("right")}>▶</button>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-heading">Practice Problems</h2>
        <div className="dashboard-card-container">
          <div className="dashboard-card">
            <h3>Daily Problem</h3>
            <p>Sharpen your skills with today's coding challenge!</p>
            <Link to="/practice/daily" className="dashboard-button">Solve Now</Link>
          </div>
          <div className="dashboard-card">
            <h3>Topic-wise Practice</h3>
            <p>Choose a topic and start solving relevant problems.</p>
            <Link to="/practice/topics" className="dashboard-button">Start Practicing</Link>
          </div>
          <div className="dashboard-card">
            <h3>Unsolved Problems</h3>
            <p>Pick up from where you left off last time.</p>
            <Link to="/practice/unsolved" className="dashboard-button">Resume</Link>
          </div>
        </div>
      </div>

      {/* Upcoming Contests Section */}
      <div className="dashboard-section">
        <h2 className="dashboard-heading">Upcoming Contests</h2>
        <div className="dashboard-card-container">
          <div className="dashboard-card">
            <h3>July Clash</h3>
            <p>Date: July 30, 2025<br />Time: 6:00 PM - 8:00 PM</p>
            <Link to="/contests/july-clash" className="dashboard-button">Register</Link>
          </div>
          <div className="dashboard-card">
            <h3>August Challenge</h3>
            <p>Date: August 10, 2025<br />Time: 7:00 PM - 9:00 PM</p>
            <Link to="/contests/august-challenge" className="dashboard-button">Register</Link>
          </div>
          <div className="dashboard-card">
            <h3>Weekly Sprint</h3>
            <p>Date: Every Sunday<br />Time: 5:00 PM - 6:30 PM</p>
            <Link to="/contests/weekly-sprint" className="dashboard-button">Join</Link>
          </div>
        </div>
      </div>

      {/* Student Progress Section */}
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

      {/* Recent Activity Timeline Section */}
<div className="dashboard-section">
  <h2 className="dashboard-heading">Recent Activity</h2>
  <div className="timeline">
    <div className="timeline-item">
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <h4>Solved “Binary Search Problem”</h4>
        <p>2 hours ago</p>
      </div>
    </div>
    <div className="timeline-item">
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <h4>Registered for “July Clash” Contest</h4>
        <p>Yesterday</p>
      </div>
    </div>
    <div className="timeline-item">
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <h4>Completed “Recursion” Module</h4>
        <p>3 days ago</p>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
