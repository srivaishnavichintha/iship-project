// import React, { useState } from 'react';
// import './StudentCourses.css';
// import Student_navabar from "../Student_navabar";
// import CCard from "../components/CCard"; 
// import Myenrollcard from "../components/Myenrollcard"; 

// const coursesData = {
//   enrolled: [
//     {
//      id: 2,
//       title: 'SQL for Developers',
//       description: 'Learn to query and manage databases effectively Learn to query and manage databases effectively Learn to query and manage databases effectively',
//       image: '/images/sql-course.png',
//       tags: ['Backend', 'Beginner'],
//       duration: '10 hrs | 7 modules',
//       mentor: 'Prof. R. Kumar',
//       endDate: 'Aug 18, 2025'
//     },
//     {
//       id: 2,
//       title: 'SQL for Developers',
//       description: 'Learn to query and manage databases effectively',
//       image: '/images/sql-course.png',
//       tags: ['Backend', 'Beginner'],
//       duration: '10 hrs | 7 modules',
//       mentor: 'Prof. R. Kumar',
//       endDate: 'Aug 18, 2025'
//     }
//   ],
//   recommended: [
//     {
//       id: 2,
//       title: 'SQL for Developers',
//       description: 'Learn to query and manage databases effectively',
//       image: '/images/sql-course.png',
//       tags: ['Backend', 'Beginner'],
//       duration: '10 hrs | 7 modules',
//       mentor: 'Prof. R. Kumar',
//       endDate: 'Aug 18, 2025'
//     }
//   ]
// };

// const StudentCourses = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filterCourses = (courses) => {
//     return courses.filter(course =>
//       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
//     );
//   };

//   return (
//     <>
//       <Student_navabar />
//       <div className="courses-container">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by title or tag..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <h1 className="section-title">My Enrolled Courses</h1>
//         <div className="courses-grid">
//           {filterCourses(coursesData.enrolled).map((course, index) => (
//             <Myenrollcard
//               key={index}
//               id={index}
//               title={course.title}
//               description={course.description}
//               mentor={course.mentor}
//               endDate={course.endDate}
//               tags={course.tags || []}
//             />
//           ))}
//         </div>
//         <h1 className="section-title">Recommended for You</h1>
//         <div className="courses-grid">
//           {filterCourses(coursesData.recommended).map((course, index) => (
//             <CCard
//               key={index}
//               id={course.id}
//               title={course.title}
//               description={course.description}
//               mentor={course.mentor}
//               endDate={course.endDate}
//               tags={course.tags}
//             />
//           ))}
           
           
//         </div>
//       </div>
//     </>
//   );
// };

// export default StudentCourses;


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
    axios.get("/api/enrolled-courses")
      .then(res => {
        setEnrolledCourses(res.data);
      })
      .catch(err => {
        console.error("Error fetching enrolled courses:", err);
      });

    // Fetch Recommended Courses
    axios.get("/api/recommended-courses")
      .then(res => {
        setRecommendedCourses(res.data);
      })
      .catch(err => {
        console.error("Error fetching recommended courses:", err);
      });
  }, []);

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

        <h1 className="section-title">My Enrolled Courses</h1>
        <div className="courses-grid">
          {filterCourses(enrolledCourses).map((course, index) => (
            <Myenrollcard
              key={course.id || index}
              id={course.id}
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
              key={course.id || index}
              id={course.id}
              title={course.title}
              description={course.description}
              mentor={course.mentor}
              endDate={course.endDate}
              tags={course.tags}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentCourses;

