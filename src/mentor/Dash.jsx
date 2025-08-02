import React, { useEffect, useState } from "react";
import "./Dash.css";
import Mccard from "../components/Mccard";
import axios from "axios";
import Dash_leaderboard from "../components/Dash_leaderboard";

export default function Dash() {
  const [popularCourse, setPopularCourse] = useState([]);
  const [upcomingCourse, setUpcomingCourse] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/popular-courses")
      .then((res) => setPopularCourse(res.data))
      .catch((err) => console.error("Popular course error:", err));

    axios.get("http://localhost:3000/mentor/upcoming-course")
      .then((res) => setUpcomingCourse(res.data))
      .catch((err) => console.error("Upcoming course error:", err));

    axios.get("http://localhost:3000/top-students")
      .then((res) => {
        setTopStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Leaderboard error:", err);
        setError("Failed to load leaderboard data");
        setLoading(false);
      });
  }, []);

  const scrollCards = (section, direction) => {
    const container = document.getElementById(`${section}-scroll`);
    const scrollAmount = 320;
    if (container) {
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mentor_dashboard">
      {/* Popular Courses */}
      <div className="section">
        <h2>Popular Courses</h2>
        <div className="scrollable-wrapper">
          <button className="scroll-button left" onClick={() => scrollCards("popular", "left")}>◀</button>
          <div className="card_cover scrollable" id="popular-scroll">
            {popularCourse.map((course) => (
              <Mccard
                key={course.courseid}
                id={course.courseid}
                title={course.coursename}
                description={course.description || ""}
                username={course.mentorname}
                endDate={course.enrollmentend}
                tags={course.tags || []}
              />
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scrollCards("popular", "right")}>▶</button>
        </div>
      </div>

      {/* Upcoming Courses */}
      <div className="section">
        <h2>Upcoming Courses</h2>
        <div className="scrollable-wrapper">
          <button className="scroll-button left" onClick={() => scrollCards("upcoming", "left")}>◀</button>
          <div className="card_cover scrollable" id="upcoming-scroll">
            {upcomingCourse.map((course) => (
              <Mccard
                key={course.courseid}
                id={course.courseid}
                title={course.coursename}
                description={course.description}
                mentor={"Platform Mentor"}
                endDate={new Date(course.enrollmentend).toLocaleDateString()}
                tags={course.prerequisites}
              />
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scrollCards("upcoming", "right")}>▶</button>
        </div>
      </div>

      {/* Leaderboard */}
      {/* <div className="section leaderboard-section">
        {loading ? (
          <div className="loading-message">Loading leaderboard...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <Dash_leaderboard students={topStudents} />
        )}
      </div> */}
    </div>
  );
}
