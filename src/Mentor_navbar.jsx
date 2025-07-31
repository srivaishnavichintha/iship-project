import "./Student_navbar.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "./assets/react.png";
import moon from "./assets/moon.png";
import sun from "./assets/sun.png";
import env from "./assets/envelope.png";
import whiteenv from "./assets/white_env.png";

export default function Student_navbar() {
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navRef = useRef(null);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Toggle dark theme
  const theme = () => {
    setIsDark((prev) => !prev);
  };

  // Apply theme
  useEffect(() => {
    document.body.className = isDark ? "dark" : "light";
    if (navRef.current) {
      navRef.current.className = isDark ? "dtheme" : "";
    }
  }, [isDark]);

  // Close sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 580) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav ref={navRef} id="nava">
        <div className="nav-left">
          <img src={logo} alt="logo" className="logo" />
          <Link className="nav-con" to="/mentor/courses">Courses</Link>
          <Link className="nav-con" to="/mentor/mentorcontest">Contest</Link>
          <Link className="nav-con" to="/mentor/problems">Problems</Link>
          <Link className="nav-con" to="/mentor/leaderboard">Leaderboard</Link>
        </div>

        <div className="nav-right">
          <div className="profile_circle" onClick={toggleDropdown}></div>
          <img src={isDark ? whiteenv : env} alt="mail" />
         

          <img
            src={isDark ? sun : moon}
            alt="theme toggle"
            onClick={theme}
            className="theme"
          />
           <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </div>

          {showDropdown && (
            <div className="dropdown-content">
              <a href="#">Profile</a>
              <a href="#">Settings</a>
              <a href="#">Logout</a>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar menu */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
        <Link className="nav-con" to="/mentor/courses" onClick={() => setSidebarOpen(false)}>Courses</Link>
        <Link className="nav-con" to="/mentor/mentorcontest" onClick={() => setSidebarOpen(false)}>Contest</Link>
        <Link className="nav-con" to="/mentor/problems" onClick={() => setSidebarOpen(false)}>Problems</Link>
        <Link className="nav-con" to="/mentor/leaderboard" onClick={() => setSidebarOpen(false)}>Leaderboard</Link>
      </div>
    </>
  );
}
