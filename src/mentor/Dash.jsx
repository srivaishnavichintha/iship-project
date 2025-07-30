import React, { useEffect, useState } from "react";
import "./Dash.css";
import Mccard from '../components/Mccard';
import axios from "axios";
import Dash_leaderboard from "../components/Dash_leaderboard";

export default function Dash() {
  const [popularCourse, setPopularCourse] = useState([]);
  const [upcomingCourse, setUpcomingCourse] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch popular courses
    axios.get("http://localhost:3000/popular-course")
      .then((res) => {
        setPopularCourse(res.data);
      })
      .catch((err) => {
        console.error("Error fetching popular course:", err);
      });

    // Fetch upcoming courses
    axios.get("http://localhost:3000/upcoming-course")
      .then((res) => {
        setUpcomingCourse(res.data);
      })
      .catch((err) => {
        console.error("Error fetching upcoming course:", err);
      });

    // Fetch top students data
    axios.get("http://localhost:3000/top-students") // Adjust this endpoint to match your API
      .then((res) => {
        setTopStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top students:", err);
        setError("Failed to load leaderboard data");
        setLoading(false);
      });
  }, []);

  function scrollCards(section, direction) {
    const container = document.getElementById(`${section}-scroll`);
    const scrollAmount = 320;
    if (container) {
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  }

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
                title={course.coursetitle}
                description={course.description}
                mentor={course.mentor}
                endDate={course.endDate}
                tags={course.tags}
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
                title={course.coursetitle}
                description={course.description}
                mentor={course.mentor}
                endDate={course.endDate}
                tags={course.tags}
              />
            ))}
          </div>

          <button className="scroll-button right" onClick={() => scrollCards("upcoming", "right")}>▶</button>
        </div>
      </div>

      {/* Enhanced Leaderboard Section */}
      <div className="section leaderboard-section">
        {loading ? (
          <div className="loading-message">Loading leaderboard...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <Dash_leaderboard students={topStudents} />
        )}
      </div>
    </div>
  );
}