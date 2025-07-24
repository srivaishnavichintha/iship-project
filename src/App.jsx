import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Student_main_dashboard from "./Student_main_dashboard";
import Practice_board from "./Practice_board";
import Login from "./Login"
import Mentor_dashboard from "./Mentor_dashboard"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/studentdashboard" element={<Student_main_dashboard/>} />
        <Route path="/practice" element={<Practice_board />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/mentordashboard" element={<Mentor_dashboard />} />
      </Routes>
    </Router> 
  );
}

export default App;
