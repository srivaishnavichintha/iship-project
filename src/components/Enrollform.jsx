import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EnrollForm() {
  const { courseName } = useParams();
  const { state } = useLocation();
  const courseTitle = state?.title || courseName.replace(/-/g, " ");
  const courseId = 1234;
//   const courseId = state?.courseId;

  // Simulating logged-in student (use your own logic)
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    // Simulate getting from localStorage or auth context
    setStudentId(localStorage.getItem("studentId") || "stu001");
    setStudentName(localStorage.getItem("studentName") || "Vaishu");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      courseId,
      courseTitle,
      studentId,
      studentName
    };

    try {
      await axios.post("http://localhost:5000/api/enroll", payload);
      alert("Enrollment successful!");
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Failed to enroll");
    }
  };

  if (!courseId || !courseTitle) {
    return <p style={{ color: "red" }}>Missing course details. Please return to the course page.</p>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Enroll in <span style={{ color: "#007777" }}>{courseTitle}</span></h2>
      <p><strong>Course ID:</strong> {courseId}</p>
      <p><strong>Student ID:</strong> {studentId}</p>
      <p><strong>Student Name:</strong> {studentName}</p>

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
