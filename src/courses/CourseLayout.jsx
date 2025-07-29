import { NavLink, Outlet } from "react-router-dom";
import "./CourseLayout.css";

const CourseLayout = () => {
  return (
    <div className="course-layout">
      <div className="course-header">
        <h1>Interview Crash Course</h1>
        <p>Master DSA and Algorithms for technical interviews...</p>
      </div>

      <nav className="course-navbar">
        <NavLink to="levels" className={({ isActive }) => isActive ? "active" : ""}>
          Levels
        </NavLink>
        <NavLink to="problems" className={({ isActive }) => isActive ? "active" : ""}>
          Problems
        </NavLink>
        <NavLink to="contests" className={({ isActive }) => isActive ? "active" : ""}>
          Contests
        </NavLink>
        <NavLink to="leaderboard" className={({ isActive }) => isActive ? "active" : ""}>
          Leaderboard
        </NavLink>
      </nav>

      <div className="course-content">
        <Outlet />
      </div>
    </div>
  );
};

export default CourseLayout;
