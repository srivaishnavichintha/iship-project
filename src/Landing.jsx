import "./Landing.css";
import { Link } from "react-router-dom";
import Icongrid from "./Icongrid";
import peertopeer from "./assets/2code.png";
import Frontcompiler from "./Frontendcompiler.jsx";
import { useState } from "react";

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on link click
  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <div className="about">
        {/* ===== Navbar ===== */}
        <nav id="nava">
          <div className="nav-left">
            <img className="logo" src="" alt="logo" />
          </div>

          {/* Hamburger Icon (Right Side) */}
          <div className="hamburger" onClick={() => setIsOpen(true)}>
            ☰
          </div>

          {/* Normal Desktop Links */}
          <div className="nav-left">
            <a href="#land-exp" className="nav-con">Explore</a>
            <a href="#land-pro" className="nav-con">Product</a>
            <a href="#land-comp" className="nav-con">Compiler</a>
            <Link to="/login" className="nav-con">Sign in</Link>
          </div>
        </nav>

        {/* ===== Sidebar Menu ===== */}
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          <a href="#land-exp" className="nav-con" onClick={handleLinkClick}>Explore</a>
          <a href="#land-pro" className="nav-con" onClick={handleLinkClick}>Product</a>
          <a href="#land-comp" className="nav-con" onClick={handleLinkClick}>Compiler</a>
          <Link to="/login" className="nav-con" onClick={handleLinkClick}>Sign in</Link>
        </div>

        {/* ===== Hero Section ===== */}
        <div className="land-content">
          <div>
            <h1 className="colorings">
              <strong>Learn</strong>, <strong>Compete</strong>, <strong>Level Up</strong>.
            </h1>
            <p>
              Master coding through peer challenges, mentor-led contests, and a dynamic leaderboard — all in one collaborative platform.
            </p>
          </div>
          <Icongrid />
        </div>
      </div>

      {/* ===== Explore Section ===== */}
      <div id="land-exp" className="land-explore">
        <div className="floating">
          <div className="float-box box1" style={{ animationDelay: "0s" }}></div>
          <div className="float-box box2 rotating-box" style={{ animationDelay: "0.5s" }}></div>
          <div className="float-box box3 floating-box" style={{ animationDelay: "1s" }}>
            <img src={peertopeer} alt="peer coding" />
          </div>
          <div className="float-box box4" style={{ animationDelay: "1.5s" }}></div>
        </div>

        <div className="explore-data">
          <h2 className="colorings">Start Exploring</h2><br /><br />
          <p>An engaging platform that helps you grow through peer challenges, mentor contests, and a leaderboard — guiding your journey to the next level.</p>
          <br />
          <Link to="/login">Get Started</Link>
        </div>
      </div>

      {/* ===== Product Section ===== */}
      <div id="land-pro" className="product">
        <div className="product-left-card">
          <h2 className="colorings">Challenges, Community & Leaderboard</h2><br />
          <p>Over 1000 challenges designed to help you practice, compete, and grow. Join a vibrant community of students, challenge peers at your level, and climb the leaderboard as you learn and earn rewards through mentor-led contests.</p>
          <br /><br />
          <a href="">View Leader Board</a>
        </div>
        <div className="product-right-card">
          <h2 className="colorings">Mentors & Skill Building</h2><br />
          <p>Not only does this platform help students improve their coding and problem-solving skills, it also enables mentors to guide and assess students of all levels. From hosting contests to monitoring progress and rewarding achievements, it’s a complete learning and competitive ecosystem.</p>
          <br />
          <a href="">View Courses</a>
        </div>
      </div>

      {/* ===== Compiler Section ===== */}
      <div id="land-comp" className="land-compiler">
        <div className="comp">
          <h2 className="colorings">Compiler</h2><br />
          <p>
            Our platform empowers students to learn and improve through engaging peer challenges, mentor-led contests, and a dynamic leaderboard. Practice, compete, and measure your progress — all in one collaborative space designed for growth.
          </p>
        </div><br />
        <div className="comp-div">
          <Frontcompiler />
        </div>
      </div>

      {/* ===== About Section ===== */}
      <div className="land-about">
        <h2 className="colorings">We believe learning is better when shared.</h2>
        <br />
        <p>
          With peer challenges, mentor-led contests, and a dynamic leaderboard, we create a space where students unlock their potential. Competing, learning, and growing together, they build skills, track progress, and achieve their goals as a community.
        </p>
      </div>
    </>
  );
}
