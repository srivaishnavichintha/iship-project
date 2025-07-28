import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Student_main_dashboard from "./student/Student_main_dashboard";
import Practice_board from "./Practice_board";
import Login from "./Login"
import Mentor_dashboard from "./Mentor_dashboard"
import Course from "./mentor/Course";
import MentorContest from "./mentor/MentorContest";
import LeaderBoard from "./mentor/LeaderBoard";
import Problems from "./mentor/Problems";
import StudentCourses from "./student/StudentCourses"
import StudentLeader from "./student/StudentLeader"
import StudentContest from "./student/StudentContest"
import Peer2peer from "./student/Peer2peer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student/dashboard" element={<Student_main_dashboard/>} />
        <Route path="/practice" element={<Practice_board />} />
        <Route path="/login" element={<Login/>} />
         <Route path="/mentor/dashboard" element={<Mentor_dashboard />} /> 
         <Route path="/mentor/courses" element={<Course />} />
         <Route path="/mentor/mentorcontest" element={<MentorContest/>}/>
         <Route path="/mentor/leaderboard" element={<LeaderBoard/>}/>
         <Route path="/mentor/problems" element={<Problems/>}/>
          <Route path="/student/courses" element={<StudentCourses />} />
          <Route path="/student/leaderboard" element={<StudentLeader/>}/>
           <Route path="/student/contest" element={<StudentContest/>}/>
           <Route path="/student/peer2peer" element={<Peer2peer/>}/>
      </Routes>
    </Router> 
  );
}

export default App;
