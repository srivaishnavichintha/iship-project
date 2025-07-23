import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Student_main_dashboard from "./Student_main_dashboard";
import Practice_board from "./Practice_board";
import Login from "./Login"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/navbar" element={<Student_main_dashboard/>} />
        <Route path="/practice" element={<Practice_board />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router> 
  );
}

<<<<<<< HEAD
export default App;
=======
import Login from "./Login"
export default function App(){
    return(
        <Login 
        />
    )
}
>>>>>>> 259e1b9ddbaf7468d6aee0b4a043349b687dd6a9
