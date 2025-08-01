import React, { useState, useEffect } from 'react';
import './StudentCourses.css';
import Student_navabar from "../Student_navabar";
import CCard from "../components/CCard";
import Myenrollcard from "../components/Myenrollcard";
import axios from "axios";

const StudentCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  useEffect(() => {
    // Fetch Enrolled Courses
    const studentdata = JSON.parse(localStorage.getItem('userData')); // ✅ parse it
    const studentid = studentdata?.id; // use optional chaining to prevent crash
    console.log("Student Data:", studentdata, "Student ID:", studentid);

    if (!studentid) {
    console.error("No student ID found in localStorage.");
    return;
   }
    axios.get(`http://localhost:3000/enrolled-courses/${studentid}`)
      .then(res => {
        console.log("Enrolled API response:", res.data);
        setEnrolledCourses(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Error fetching enrolled courses:", err);
      });

    // Fetch Recommended Courses
    axios.get(`http://localhost:3000/recommended-courses/${studentid}`)
      .then(res => {
        console.log("Recommended API response:", res.data);
        setRecommendedCourses(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Error fetching recommended courses:", err);
      });
  }, []);

  const filterCourses = (courses) => {
    if (!Array.isArray(courses)) return [];
    return courses.filter(course =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  };

  return (
    <>
      <Student_navabar />
      <div className="courses-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <h1 className="section-title">My Enrolled Courses</h1>
        <div className="courses-grid">
          {filterCourses(enrolledCourses).map((course, index) => (
            <Myenrollcard
              key={index}
              id={index}
              title={course.title}
              description={course.description}
              mentor={course.mentor}
              endDate={course.endDate}
              tags={course.tags || []}
            />
          ))}
        </div>

        <h1 className="section-title">Recommended for You</h1>
        <div className="courses-grid">
          {filterCourses(recommendedCourses).map((course, index) => (
            <CCard
              key={index}
              id={course.id}
              title={course.title}
              description={course.description}
              mentor={course.mentor}
              endDate={course.endDate}
              tags={course.tags || []}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentCourses;