import { useState } from "react";
import axios from "axios";
import "./Login.css";
import logo from "./assets/react.svg";

export default function Login() {
  const [role, setRole] = useState("student");
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const endpoint = isSignup
        ? "http://localhost:3000/signup"
        : "http://localhost:3000/login";

      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: role
      };

      const res = await axios.post(endpoint, payload);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
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

        {isSignup ? (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>
              {`Sign Up as ${role}`}
            </button>

            <div className="t1">
              <span
                onClick={() => setIsSignup(false)}
                style={{ cursor: "pointer" }}
              >
                Already have an account? Sign In
              </span>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username or E-mail"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button onClick={handleSubmit}>
              {`Login as ${role}`}
            </button>

            <div className="t1">
              <span>Forgot Password?</span>
              <span
                onClick={() => setIsSignup(true)}
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </span>
            </div>
          </>
        )}

        <p>or you can sign in with</p>
        <div className="social-icons">
          <i className="fab fa-google"></i>
          <i className="fab fa-linkedin"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>
    </div>
  );
}
