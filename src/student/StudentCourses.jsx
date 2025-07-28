import React, { useState } from 'react';
import './StudentCourses.css';
import Student_navabar from "../Student_navabar";

const coursesData = {
  enrolled: [
    {
      title: 'DSA Mastery',
      description: 'Data Structures and Algorithms for beginners and intermediates',
      image: '/images/dsa-course.png',
      progress: 60,
    },
    {
      title: 'Web Development',
      description: 'HTML, CSS, JS and React - Build responsive websites',
      image: '/images/web-course.png',
      progress: 35,
    }
  ],
  available: [
    {
      title: 'Machine Learning Basics',
      description: 'Learn Python and ML algorithms from scratch',
      image: '/images/ml-course.png',
      tags: ['New', 'ML', 'Beginner'],
      duration: '12 hrs | 10 modules',
    },
    {
      title: 'C++ Programming',
      description: 'Master C++ for competitive programming',
      image: '/images/cpp-course.png',
      tags: ['Popular', 'DSA', 'Intermediate'],
      duration: '20 hrs | 15 modules',
    }
  ],
  recommended: [
    {
      title: 'JavaScript Advanced',
      description: 'Deep dive into async, closures, ES6+ and more',
      image: '/images/js-course.png',
      tags: ['Web', 'Advanced'],
      duration: '8 hrs | 6 modules',
    },
    {
      title: 'SQL for Developers',
      description: 'Learn to query and manage databases effectively',
      image: '/images/sql-course.png',
      tags: ['Backend', 'Beginner'],
      duration: '10 hrs | 7 modules',
    }
  ]
};

const StudentCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filterCourses = (courses) => {
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

        <h1 className="section-title">📘 My Enrolled Courses</h1>
        <div className="courses-grid">
          {filterCourses(coursesData.enrolled).map((course, index) => (
            <div className="course-card enrolled" key={index}>
              <img src={course.image} alt={course.title} className="course-thumb" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${course.progress}%` }}></div>
                </div>
                <button className="continue-btn">Continue Learning</button>
              </div>
            </div>
          ))}
        </div>

        <h1 className="section-title">🆕 Available Courses</h1>
        <div className="courses-grid">
          {filterCourses(coursesData.available).map((course, index) => (
            <div className="course-card available" key={index}>
              <img src={course.image} alt={course.title} className="course-thumb" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="tags">
                  {course.tags.map((tag, i) => (
                    <span key={i} className={`tag ${tag.toLowerCase()}`}>{tag}</span>
                  ))}
                </div>
                <p className="duration">{course.duration}</p>
                <button className="enroll-btn">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>

        <h1 className="section-title">✨ Recommended for You</h1>
        <div className="courses-grid recommended">
          {filterCourses(coursesData.recommended).map((course, index) => (
            <div className="course-card suggested" key={index}>
              <img src={course.image} alt={course.title} className="course-thumb" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="tags">
                  {course.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <p className="duration">{course.duration}</p>
                <button className="enroll-btn">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentCourses;
