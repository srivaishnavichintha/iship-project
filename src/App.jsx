import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Student_main_dashboard from "./student/Student_main_dashboard";
import Login from "./Login";
import Mentor_dashboard from "./Mentor_dashboard";
import Course from "./mentor/Course";
import MentorContest from "./mentor/MentorContest";
import LeaderBoard from "./mentor/LeaderBoard";
import Problems from "./mentor/Problems";
import StudentCourses from "./student/StudentCourses";
import StudentLeader from "./student/StudentLeader";
import StudentContest from "./student/StudentContest";
import Peer2peer from "./student/Peer2peer";
import ProblemStatement from "./problems/Problemstmt";
import EnrollForm from "./components/Enrollform";
import CourseLayout from "./courses/CourseLayout";
import CourseLevels from "./courses/CourseLevels";
import CourseProblems from "./courses/CourseProblems";
import MentorContestDetails from "./components/MentorcontestDetails";
import ContestData from "./components/ContestData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student/dashboard" element={<Student_main_dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mentor/dashboard" element={<Mentor_dashboard />} />
        <Route path="/mentor/courses/:mentorid" element={<Course />} />
        <Route path="/mentor/mentorcontest" element={<MentorContest />} />
        <Route path="/mentor/leaderboard" element={<LeaderBoard />} />
        <Route path="/mentor/problems" element={<Problems />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/leaderboard" element={<StudentLeader />} />
        <Route path="/student/contest" element={<StudentContest />} />
        <Route path="/student/peer2peer" element={<Peer2peer />} />
        <Route path="/problemstatement/:slug" element={<ProblemStatement />} />
        <Route path="/enroll/:courseName" element={<EnrollForm />} />
        <Route path="/courses/:courseName" element={<CourseLayout />}>
          <Route path="levels" element={<CourseLevels />} />
          <Route path="problems" element={<CourseProblems />} />
          <Route 
            path="mentor/mentorcontest/:contestSlug" 
            element={<MentorContestDetails />} 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;