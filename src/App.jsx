import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Student_main_dashboard from "./Student_main_dashboard";
import Practice_board from "./Practice_board";
import Login from "./Login"
import Mentor_dashboard from "./Mentor_dashboard"
import Course from "./mentor/Course";
import MentorContest from "./mentor/MentorContest";
import LeaderBoard from "./mentor/LeaderBoard";
import Problems from "./mentor/Problems"
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
      </Routes>
    </Router> 
  );
}

export default App;
