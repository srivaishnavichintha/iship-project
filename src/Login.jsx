import React, { useState } from "react";
import "./Login.css";
import logo from "./logo.png";

export default function Login() {
  const [role, setRole] = useState("student");
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Toggle Tabs */}
        <div className="tabs">
          <div
            className={`tab ${role === "student" ? "active" : ""}`}
            onClick={() => setRole("student")}
          >
            Student
          </div>
          <div
            className={`tab ${role === "mentor" ? "active" : ""}`}
            onClick={() => setRole("mentor")}
          >
            Mentor
          </div>
        </div>

        <img src={logo} alt="Logo" className="logo" />
        <h3>LeetCode</h3>

        {/* Form Content */}
        {isSignup ? (
          <>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <div className="verify"></div>
            <button>Sign Up as {role === "student" ? "Student" : "Mentor"}</button>

            <div className="t1">
              <span onClick={() => setIsSignup(false)} style={{ cursor: "pointer" }}>
                Already have an account? Sign In
              </span>
            </div>
          </>
        ) : (
          <>
            <input type="text" placeholder="Username or E-mail" />
            <input type="password" placeholder="Password" />
            <div className="verify"></div>
            <button>Login as {role === "student" ? "Student" : "Mentor"}</button>

            <div className="t1">
              <span>Forgot Password?</span>
              <span onClick={() => setIsSignup(true)} style={{ cursor: "pointer" }}>
                Sign Up
              </span>
            </div>
          </>
        )}

        <p>or you can sign in with</p>

        {/* Social Icons */}
        <div className="social-icons">
          <i className="fab fa-google"></i>
          <i className="fab fa-linkedin"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>
    </div>
  );
}
