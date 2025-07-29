import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EnrollForm() {
  const { courseName } = useParams();
  const { state } = useLocation();
  const coursename = state?.title || courseName.replace(/-/g, " ");
    const courseid = state?.courseid ;

  const [studentid, setStudentId] = useState("");
  const [username, setStudentName] = useState("");

  useEffect(() => {
    // Simulate getting from localStorage or auth context
    setStudentId(localStorage.getItem("studentId"));
    setStudentName(localStorage.getItem("studentName")  );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      courseid,
      coursename,
      studentid,
      username
    };

    try {
      await axios.post("http://localhost:3000/enroll", payload);
      alert("Enrollment successful!");
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Failed to enroll");
    }
  };

  if (!courseid || !coursename) {
    return <p style={{ color: "red" }}>Missing course details. Please return to the course page.</p>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Enroll in <span style={{ color: "#007777" }}>{coursename}</span></h2>
      <p><strong>Course ID:</strong> {courseid}</p>
      <p><strong>Student ID:</strong> {studentid}</p>
      <p><strong>Student Name:</strong> {username}</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
        <button
          type="submit"
          style={{ padding: "10px 20px", backgroundColor: "#007777", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Confirm Enroll
        </button>
      </form>
    </div>
  );
}
