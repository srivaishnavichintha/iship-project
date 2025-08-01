import "./Student_navbar.css";
import { useState, useEffect } from "react";
import logo from "./assets/react.png";
import env from "./assets/envelope.png";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaListOl,
  FaFileAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Mentor_navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEnvelopeBox, setShowEnvelopeBox] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [mentorid, setMentorId] = useState(null);

  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleEnvelopeBox = () => setShowEnvelopeBox((prev) => !prev);
  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const confirmLogout = () => setShowLogoutConfirm(true);
  const cancelLogout = () => setShowLogoutConfirm(false);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const handleCoursesClick = () => {
    if (mentorid) {
      navigate(`/mentor/courses/${mentorid}`);
    } else {
      alert("Mentor ID not found");
    }
  };

  // Get user info from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setMentorId(userData.id);
      const name = userData.name;
      if (name) setFirstLetter(name[0].toUpperCase());
    }
  }, []);

  // Auto-close sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 760) setShowSidebar(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav id="nava">
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <p className="nav-con" onClick={handleCoursesClick}>Courses</p>
        <Link to="/mentor/mentorcontest" className="nav-con">Contest</Link>
        <Link to="/mentor/problems" className="nav-con">Problems</Link>
      </div>

      <div className="nav-right">
        <div className="profile_wrapper">
          <div className="profile_circle" onClick={toggleDropdown}>
            {firstLetter}
          </div>
          <div className={`dash-drop ${showDropdown ? "open" : ""}`}>
            <p><FaUser /> My Profile</p>
            <p><FaListOl /> Leaderboard</p>
            <p onClick={confirmLogout}><FaSignOutAlt /> Log Out</p>
          </div>
        </div>

        <div className="envelope-wrapper">
          <img src={env} alt="Envelope" onClick={toggleEnvelopeBox} className="envelope-icon" />
          {showEnvelopeBox && (
            <div className="envelope-popup">
              <p>(empty)</p>
            </div>
          )}
        </div>

        <div className="hamburger-icon" onClick={toggleSidebar}>
          {showSidebar ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar-menu ${showSidebar ? "open" : ""}`}>
        <FaTimes className="sidebar-close" onClick={() => setShowSidebar(false)} />
        <Link to={`/mentor/courses/${mentorid}`} onClick={toggleSidebar}>Courses</Link>
        <Link to="/mentor/mentorcontest" onClick={toggleSidebar}>Contest</Link>
        <Link to="/mentor/problems" onClick={toggleSidebar}>Problems</Link>
        <p onClick={() => { confirmLogout(); toggleSidebar(); }}>
          <FaSignOutAlt /> Logout
        </p>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="logout-box">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-actions">
              <button onClick={handleLogout} className="logout-btn confirm">Yes</button>
              <button onClick={cancelLogout} className="logout-btn cancel">No</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
