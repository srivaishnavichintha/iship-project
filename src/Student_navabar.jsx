import "./Student_navbar.css";
import { useState, useRef, useEffect } from "react";
import logo from "./assets/react.png";
import moon from "./assets/moon.png";
import sun from "./assets/sun.png";
import env from "./assets/envelope.png";
import whiteenv from "./assets/white_env.png";
import { Link } from "react-router-dom";

export default function Student_navbar() {
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const theme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    document.body.className = isDark ? "dark" : "light";
    if (navRef.current) {
      navRef.current.className = isDark ? "dtheme" : "";
    }
  }, [isDark]);

  useEffect(() => {
    const username = localStorage.getItem("username");
     console.log("Username from localStorage:", username);
    if (username && username.length > 0) {
      setFirstLetter(username[0].toUpperCase());
    }
  }, []);

  return (
    <nav ref={navRef} id="nava">
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <Link to="/courses" className="nav-con">Courses</Link>
        <Link to="/practice" className="nav-con">Practice</Link>
        <Link to="/leaderboard" className="nav-con">My Leaderboard</Link>
        <Link to="/contests" className="nav-con">Contests</Link>
        <Link to="/peer2peer" className="nav-con">Peer2Peer</Link>
      </div>

      <div className="nav-right">
        <div className="profile_wrapper">
          <div className="profile_circle" onClick={toggleDropdown}>
            {firstLetter}
          </div>
          <div className={`dash-drop ${showDropdown ? "open" : ""}`}>
            <p>My Profile</p>
            <p>My Leaderboard</p>
            <p>Submissions</p>
            <p>Log Out</p>
          </div>
        </div>
        <img src={isDark ? whiteenv : env} alt="Envelope" />
        <img
          src={isDark ? sun : moon}
          alt="Theme Toggle"
          onClick={theme}
          className="theme"
        />
      </div>
    </nav>
  );
}
