import "./Student_navbar.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "./assets/react.png";
import moon from "./assets/moon.png";
import sun from "./assets/sun.png";
import env from "./assets/envelope.png"
import whiteenv from "./assets/white_env.png"

export default function Student_navbar() {
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    document.body.className = isDark ? "dark" : "light";
    if (navRef.current) {
      navRef.current.className = isDark ? "dtheme" : "";
    }
  }, [isDark]);

  const theme = () => {
    setIsDark((prev) => !prev);
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
         <img src={isDark ? whiteenv : env} />
         <div id="main_nav"></div>
        <img
        src={isDark ? sun : moon}
        alt="theme toggle"
        onClick={theme}
        className="theme"
      />
      </div>
    </nav>
  );
}
