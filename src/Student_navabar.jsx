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
        <img src={logo} alt="logo" className="logo" />
        <Link to="/courses" className="nav-con">Courses</Link>
        <Link to="/practice" className="nav-con">Practice</Link>
        <Link to="/leaderboard" className="nav-con">My Leaderboard</Link>
        <Link to="/contests" className="nav-con">Contests</Link>
        <Link to="/peer2peer" className="nav-con">peer2peer</Link>
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
