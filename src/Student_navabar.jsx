import "./Student_navbar.css";
import { useState, useEffect } from "react";
import logo from "./assets/react.png";
import env from "./assets/envelope.png";
import { BiSolidDollarCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaFileAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Student_navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEnvelopeBox, setShowEnvelopeBox] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");
  const [points, setPoints] = useState(0);
  const [invitations, setInvitations] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

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

  const handleSubmissions = () => {
    navigate("/student/submissions");
  };

  // Fetch points and user initial
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const name = userData.name;
      const studentId = userData.id;

      if (name) setFirstLetter(name[0].toUpperCase());

      // Fetch student points
      fetch(`http://localhost:3000/students/${studentId}/points`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch points");
          return res.json();
        })
        .then((data) => {
          setPoints(data.points || 0);
        })
        .catch((err) => {
          console.error("Error fetching points:", err.message);
        });
    }
  }, []);

  // Fetch invitations every 2 minutes
  useEffect(() => {
    const fetchInvitations = () => {
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) return;

      const { id: studentId } = JSON.parse(storedUserData);

      fetch(`http://localhost:3000/students/${studentId}/invitations`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch invitations");
          return res.json();
        })
        .then((data) => {
          setInvitations(data || []);
        })
        .catch((err) => {
          console.error("Error fetching invitations:", err.message);
        });
    };

    fetchInvitations(); // Initial call

    const interval = setInterval(() => {
      fetchInvitations();
    }, 60 * 1000); // every 1 min

    return () => clearInterval(interval); // cleanup
  }, []);

  // Auto-close sidebar when screen width increases
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
        <Link to="/student/courses" className="nav-con">
          Courses
        </Link>
        <Link to="/practice" className="nav-con">
          Practice
        </Link>
        <Link to="/student/peer2peer" className="nav-con">
          peer2peer
        </Link>
        <Link to="/student/playground" className="nav-con">
          Playground
        </Link>
      </div>

      <div className="nav-right">
        <div className="points">
          <BiSolidDollarCircle style={{ marginRight: "4px", fontSize: "22px" }} />
          {points} pts
        </div>

        <div className="profile_wrapper">
          <div className="profile_circle" onClick={toggleDropdown}>
            {firstLetter}
          </div>
          <div className={`dash-drop ${showDropdown ? "open" : ""}`}>
            <p>
              <FaUser /> My Profile
            </p>
            <p onClick={handleSubmissions}>
              <FaFileAlt /> Submissions
            </p>
            <p onClick={confirmLogout}>
              <FaSignOutAlt /> Log Out
            </p>
          </div>
        </div>

        <div className="envelope-wrapper">
          <img
            src={env}
            alt="Envelope"
            onClick={toggleEnvelopeBox}
            className="envelope-icon"
          />
          {showEnvelopeBox && (
            <div className="envelope-popup">
              {invitations.length === 0 ? (
                <p>(No invitations)</p>
              ) : (
                invitations.map((invite, index) => (
                  <p key={index}>{invite.message}</p>
                ))
              )}
            </div>
          )}
        </div>

        <div className="hamburger-icon" onClick={toggleSidebar}>
          {showSidebar ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Sidebar menu */}
      <div className={`sidebar-menu ${showSidebar ? "open" : ""}`}>
        <FaTimes className="sidebar-close" onClick={() => setShowSidebar(false)} />
        <Link to="/student/courses" onClick={toggleSidebar}>
          Courses
        </Link>
        <Link to="/practice" onClick={toggleSidebar}>
          Practice
        </Link>
        <Link to="/student/peer2peer" onClick={toggleSidebar}>
          peer2peer
        </Link>
        <Link to="/student/playground" onClick={toggleSidebar}>
          Playground
        </Link>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="logout-box">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-actions">
              <button onClick={handleLogout} className="logout-btn confirm">
                Yes
              </button>
              <button onClick={cancelLogout} className="logout-btn cancel">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
