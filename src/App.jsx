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
import Peer2peer from "./student/Peer2peer";
import EnrollForm from "./components/Enrollform";
import CourseLayout from "./courses/CourseLayout";
import CourseLevels from "./courses/CourseLevels";
import CourseProblems from "./courses/CourseProblems";
import MentorContestDetails from "./components/MentorcontestDetails";
import ContestData from "./components/ContestData";
import PracticeProblems from "./student/PracticeProblems";
import PracticeCompiler from "./Compiler/PracticeCompiler";
import P2pmatching from './student/P2pmatching'; 
import Playground from "./student/Playground"
import Practicedescription from "./Compiler/Problemdescription"
import Submissions from "./student/Submissions"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<Student_main_dashboard />} />
        <Route path="/mentor/dashboard" element={<Mentor_dashboard />} />
        <Route path="/mentor/courses/:mentorid" element={<Course />} />
        <Route path="/mentor/mentorcontest" element={<MentorContest />} />
        <Route path="/mentor/leaderboard" element={<LeaderBoard />} />
        <Route path="/mentor/problems" element={<Problems />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/leaderboard" element={<StudentLeader />} />
        <Route path="/student/peer2peer" element={<Peer2peer />} />
        <Route path="/enroll/:courseName" element={<EnrollForm />} />
         <Route path="/student/courses/:courseName" element={<CourseLayout />}>
  <Route index element={<CourseLevels />} />
  <Route path="levels" element={<CourseLevels />} />
  <Route path="problems" element={< CourseProblems />} /> 
  <Route path="contests" element={<MentorContest />} />
  <Route path="contests/:contestSlug" element={<MentorContestDetails />} />
  <Route path="leaderboard" element={<LeaderBoard />} />
</Route>
        <Route path="/practice" element={<PracticeProblems />} />
        <Route path="/solve/:problemId" element={<PracticeCompiler />} />
        <Route path="/student/playground" element={<Playground/>} />
        <Route path="/p2p/p2pmatching" element={<Playground/>} />
         <Route path="/p2p/:id" element={<P2pmatching />} />
         <Route  path="/mentor/mentorcontest/:contestSlug"  element={<ContestData />} />
          <Route  path="/contestdata"  element={<ContestData />} />
          <Route path="/problemdescription/:problemId" element={<Practicedescription/>} />
           <Route path="/student/submissions" element={<Submissions/>} />
      </Routes>
    </Router>
  );
}

export default App;
