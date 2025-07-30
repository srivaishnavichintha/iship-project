import "./Student_navbar.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "./assets/react.png";
import env from "./assets/envelope.png"


export default function Student_navbar() {
  const navRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
   const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

 



  return (
    <nav ref={navRef} id="nava">
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo"/>
        <Link className="nav-con" to="/mentor/courses" >Courses</Link>
         <Link className="nav-con" to="/mentor/mentorcontest" >Contest</Link>
           <Link className="nav-con" to="/mentor/problems" >Problems</Link>
           <Link className="nav-con" to="/mentor/leaderboard" >Leaderboard</Link>
      </div>
      <div className="nav-right">
         <div className="profile_circle" onClick={toggleDropdown}></div>
         <img src={ env} />
         <div id="main_nav"></div>
       {showDropdown && (
        <div className="dropdown-content">
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </div>
      )}
      </div>
    </nav>

  );
}
