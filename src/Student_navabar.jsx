import "./Student_navbar.css";
import { useState, useEffect } from "react";
import logo from "./assets/react.png";
import env from "./assets/envelope.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaListOl, FaFileAlt, FaSignOutAlt } from "react-icons/fa";

export default function Student_navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEnvelopeBox, setShowEnvelopeBox] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");

  const navigate = useNavigate();
  

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleEnvelopeBox = () => setShowEnvelopeBox((prev) => !prev);
  const confirmLogout = () => setShowLogoutConfirm(true);
  const cancelLogout = () => setShowLogoutConfirm(false);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  useEffect(() => {
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    const name = userData.name;
    if (name) setFirstLetter(name[0].toUpperCase());
  }
}, []);


  return (
    <nav id="nava">
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <Link to="/student/courses" className="nav-con">Courses</Link>
        <Link to="/practice" className="nav-con">Practice</Link>
        <Link to="/student/peer2peer" className="nav-con">peer2peer</Link>
         <Link to="/student/playground" className="nav-con">Playground</Link>
      </div>

      <div className="nav-right">
        <div className="profile_wrapper">
          <div className="profile_circle" onClick={toggleDropdown}>
            {firstLetter}
          </div>
          <div className={`dash-drop ${showDropdown ? "open" : ""}`}>
            <p><FaUser /> My Profile</p>
            <p ><FaFileAlt /> Submissions</p>
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
