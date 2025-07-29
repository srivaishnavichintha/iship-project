import "./Student_navbar.css";
import { useState, useRef, useEffect } from "react";
import logo from "./assets/react.png";
import env from "./assets/envelope.png"
import { Link } from "react-router-dom";


export default function Student_navbar() {
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
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
        <Link to="/student/courses" className="nav-con">Courses</Link>
        <Link to="/practice" className="nav-con">Practice</Link>
        <Link to="/student/leaderboard" className="nav-con">My Leaderboard</Link>
        <Link to="/student/contest" className="nav-con">Contests</Link>
        <Link to="/student/peer2peer" className="nav-con">peer2peer</Link>
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
        <img src={env} alt="Envelope" />
      </div>
    </nav>
  );
}
