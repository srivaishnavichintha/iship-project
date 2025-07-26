import "./Student_navbar.css";
import { useState, useRef, useEffect } from "react";
import logo from "./assets/react.svg";
import moon from "./assets/moon.png";
import sun from "./assets/sun.png";
import env from "./assets/envelope.png"
import whiteenv from "./assets/white_env.png"
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
        <img src={logo} alt="logo" />
        <a className="nav-con">Courses</a>
        <a className="nav-con" > <Link to="/practice">Practice</Link></a>
        <a className="nav-con">My Leaderboard</a>
         <a className="nav-con">Contests</a>
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
