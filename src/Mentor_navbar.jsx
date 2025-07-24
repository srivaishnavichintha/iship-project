import "./Student_navbar.css";
import { useState, useRef, useEffect } from "react";
import logo from "./assets/react.svg";
import moon from "./assets/moon.png";
import sun from "./assets/sun.png";
import env from "./assets/envelope.png"

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
        <a className="nav-con" > </a>
        <a className="nav-con">My Leaderboard</a>
      </div>
      <div className="nav-right">
         <img src={env} />
         <div id="main_nav"></div>
        <img
        src={isDark ? sun : moon}
        alt="theme toggle"
        onClick={theme}
        className="theme"
        style={{ cursor: "pointer" }}
      />
      </div>
    </nav>
  );
}
