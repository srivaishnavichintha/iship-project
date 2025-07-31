import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./assets/react.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [role, setRole] = useState("student");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    identifier: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignup
      ? "http://localhost:3000/signup"
      : "http://localhost:3000/login";

    const payload = isSignup
      ? {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: role,
        }
      : {
          identifier: formData.identifier,
          password: formData.password,
          role: role,
        };

    if (isSignup && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success(res.data.message);

      const user = res.data.user;
      const userData = {
        role: user.role,
        id: user.role === "mentor" ? user.mentorid : user.studentid,
        name: user.username,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("Saved to localStorage:", localStorage.getItem("userData"));

      if (user.role === "student") {
        navigate("/student/dashboard", { state: { user: userData } });
      } else if (user.role === "mentor") {
        navigate("/mentor/dashboard", { state: { user: userData } });
      }
    } catch (err) {
      toast.error(`Failed to login: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Role Tabs */}
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

        {/* Logo */}
        <img src={logo} alt="Logo" className="logo" />
        <h3>Welcome to Code verse</h3>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isSignup ? (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Signing up..." : `Sign Up as ${role}`}
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
                name="identifier"
                placeholder="Username or Email"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : `Login as ${role}`}
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
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
