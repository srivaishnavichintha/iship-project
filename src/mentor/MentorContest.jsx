// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./MentorContest.css";
// import Mentor_navbar from "../Mentor_navbar";
// import ContestCard from "../components/ContestCard";

// export default function MentorContest() {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     coursetitle: "",
//     coursedate: "",
//     coursestatus: "Upcoming",
//     coursedifficulty: "Medium",
//     coursedescription: ""
//   });
  
//   // All contests (original data)
//   const [allContests, setAllContests] = useState([
//     { 
//       coursetitle: "DSA Interview Prep", 
//       coursedate: "2025-08-01", 
//       coursestatus: "Upcoming",
//       coursedifficulty: "Medium",
//       coursedescription: "Master DSA for technical interviews. Includes mock tests and live sessions.",
//       coursementor: "Pawan"
//     },
//     { 
//       coursetitle: "System Design Challenge", 
//       coursedate: "2025-07-15", 
//       coursestatus: "Completed",
//       coursedifficulty: "Hard",
//       coursedescription: "Advanced system design concepts with real-world case studies.",
//       coursementor: "Anjali"
//     },
//     { 
//       coursetitle: "Frontend Mastery", 
//       coursedate: "2025-07-25", 
//       coursestatus: "Live",
//       coursedifficulty: "Easy",
//       coursedescription: "Modern frontend development with React, TypeScript and best practices.",
//       coursementor: "Rahul"
//     },
//   ]);
  
//   // Filtered contests (displayed data)
//   const [contests, setContests] = useState(allContests);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [courseFilter, setCourseFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [difficultyFilter, setDifficultyFilter] = useState("all");

//   // Get mentor data from localStorage
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const mentorid = userData?.mentorid;
//   const mentorname = userData?.username;

//   // Apply filters whenever filter states or allContests change
//   useEffect(() => {
//     const filtered = allContests.filter(contest => {
//       // Search term filter (case insensitive)
//       const matchesSearch = contest.coursetitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                            contest.coursedescription.toLowerCase().includes(searchTerm.toLowerCase());
      
//       // Course type filter
//       const matchesCourse = courseFilter === "all" || 
//                           (courseFilter === "dsa" && contest.coursetitle.toLowerCase().includes("dsa")) ||
//                           (courseFilter === "system-design" && contest.coursetitle.toLowerCase().includes("system")) ||
//                           (courseFilter === "frontend" && contest.coursetitle.toLowerCase().includes("frontend"));
      
//       // Status filter
//       const matchesStatus = statusFilter === "all" || 
//                            contest.coursestatus.toLowerCase() === statusFilter.toLowerCase();
      
//       // Difficulty filter
//       const matchesDifficulty = difficultyFilter === "all" || 
//                               contest.coursedifficulty.toLowerCase() === difficultyFilter.toLowerCase();
      
//       return matchesSearch && matchesCourse && matchesStatus && matchesDifficulty;
//     });
    
//     setContests(filtered);
//   }, [searchTerm, courseFilter, statusFilter, difficultyFilter, allContests]);

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data being submitted:", formData);
    
//     try {
//       // Prepare the payload with mentor info
//       const payload = {
//         ...formData,
//         mentorid,
//         mentorname,
//         createdBy: mentorid
//       };

//       console.log("Full payload:", payload);

//       const response = await axios.post("http://localhost:3000/api/contests", payload, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem("token")}`
//         }
//       });

//       // Add the new contest to local state
//       const newContest = {
//         ...response.data,
//         coursementor: mentorname
//       };
      
//       // Update both allContests and contests
//       setAllContests(prev => [...prev, newContest]);
      
//       // Reset form and close it
//       setFormData({
//         coursetitle: "",
//         coursedate: "",
//         coursestatus: "Upcoming",
//         coursedifficulty: "Medium",
//         coursedescription: ""
//       });
//       toggleForm();
      
//       alert('Challenge created successfully!');
      
//     } catch (error) {
//       console.error('Error creating challenge:', error);
//       alert(error.response?.data?.message || 'Failed to create challenge. Please try again.');
//     }
//   };

//   return (
//     <>
//       <Mentor_navbar />
//       <div className="mentor-contest-container">
//         <div className="header-section">
//           <div>
//             <h1>Contests</h1>
//             <p className="subtitle">Manage and create technical challenges for students</p>
//           </div>
//           <button className="add-btn" onClick={toggleForm}>
//             <span>+</span> Create Challenge
//           </button>
//         </div>

//         {showForm && (
//           <div className="slide-form-overlay">
//             <div className="slide-form">
//               <h2>Create New Contest</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Challenge Title</label>
//                   <input 
//                     type="text" 
//                     name="coursetitle"
//                     placeholder="e.g. DSA Interview Prep" 
//                     value={formData.coursetitle}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
                
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Date</label>
//                     <input 
//                       type="date" 
//                       name="coursedate"
//                       value={formData.coursedate}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Status</label>
//                     <select 
//                       name="coursestatus"
//                       value={formData.coursestatus}
//                       onChange={handleChange}
//                     >
//                       <option value="Upcoming">Upcoming</option>
//                       <option value="Live">Live</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="form-group">
//                   <label>Difficulty</label>
//                   <select 
//                     name="coursedifficulty"
//                     value={formData.coursedifficulty}
//                     onChange={handleChange}
//                   >
//                     <option value="Easy">Easy</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Hard">Hard</option>
//                   </select>
//                 </div>
                
//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea 
//                     name="coursedescription"
//                     placeholder="Brief description of the challenge..."
//                     value={formData.coursedescription}
//                     onChange={handleChange}
//                     rows="3"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Mentor</label>
//                   <input 
//                     type="text" 
//                     value={mentorname || "Not available"}
//                     readOnly
//                     className="read-only-input"
//                   />
//                 </div>
                
//                 <div className="form-buttons">
//                   <button type="button" className="cancel-btn" onClick={toggleForm}>
//                     Cancel
//                   </button>
//                   <button type="submit" className="submit-btn">
//                     Create Challenge
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className="filters">
//           <div className="search-group">
//             <svg className="search-icon" viewBox="0 0 24 24">
//               <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
//             </svg>
//             <input 
//               type="text" 
//               placeholder="Search challenges..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           <div className="filter-group">
//             <label>Filter by:</label>
//             <select
//               value={courseFilter}
//               onChange={(e) => setCourseFilter(e.target.value)}
//             >
//               <option value="all">All Courses</option>
//               <option value="dsa">DSA</option>
//               <option value="system-design">System Design</option>
//               <option value="frontend">Frontend</option>
//             </select>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="upcoming">Upcoming</option>
//               <option value="live">Live</option>
//               <option value="completed">Completed</option>
//             </select>
//             <select
//               value={difficultyFilter}
//               onChange={(e) => setDifficultyFilter(e.target.value)}
//             >
//               <option value="all">All Difficulty</option>
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>
//           </div>
//         </div>

//         <div className="contest-card-wrapper">
//           {contests.length > 0 ? (
//             contests.map((contest, index) => (
//               <ContestCard
//                 key={index}
//                 title={contest.coursetitle}
//                 date={contest.coursedate}
//                 status={contest.coursestatus}
//                 difficulty={contest.coursedifficulty}
//                 description={contest.coursedescription}
//                 mentor={contest.coursementor}
//               />
//             ))
//           ) : (
//             <div className="no-results">
//               <p>No challenges found matching your filters.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import "./MentorContest.css";
import Mentor_navbar from "../Mentor_navbar";
import ContestCard from "../components/ContestCard";

export default function MentorContest() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    contesttitle: "",
    contestdate: "",
    conteststatus: "Upcoming",
    contestdifficulty: "Medium",
    contestdescription: ""
  });

  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [contestTypeFilter, setContestTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const mentorid = userData?.mentorid;
  const mentorname = userData?.username;

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/contests");
        setContests(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch contests");
        console.error("Error fetching contests:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContests();
  }, []);

  useEffect(() => {
    const filteredContests = contests.filter(contest => {
      const matchesSearch = contest.contesttitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contest.contestdescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesContestType = contestTypeFilter === "all" ||
        (contestTypeFilter === "dsa" && contest.contesttitle.toLowerCase().includes("dsa")) ||
        (contestTypeFilter === "system-design" && contest.contesttitle.toLowerCase().includes("system")) ||
        (contestTypeFilter === "frontend" && contest.contesttitle.toLowerCase().includes("frontend"));

      const matchesStatus = statusFilter === "all" ||
        contest.conteststatus.toLowerCase() === statusFilter.toLowerCase();

      const matchesDifficulty = difficultyFilter === "all" ||
        contest.contestdifficulty.toLowerCase() === difficultyFilter.toLowerCase();

      return matchesSearch && matchesContestType && matchesStatus && matchesDifficulty;
    });

    setContests(filteredContests);
  }, [searchTerm, contestTypeFilter, statusFilter, difficultyFilter]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!mentorid || !mentorname) {
    alert("Mentor information missing. Please log in again.");
    return;
  }

  try {
    const payload = {
      contesttitle: formData.contesttitle,
      contestdate: formData.contestdate,
      conteststatus: formData.conteststatus.toLowerCase(),
      contestdifficulty: formData.contestdifficulty.toLowerCase(),
      contestdescription: formData.contestdescription,
      mentorid: Number(mentorid),
      mentorname
    };

    console.log("Submitting contest with data:", payload);

    const response = await axios.post("http://localhost:3000/mentor/contests", payload);

    console.log("Contest created successfully:", response.data);

    // Refresh contest list or UI update
  } catch (error) {
    console.error("Error creating contest:", error);
    alert("Failed to create contest. Please check all fields.");
  }
};


  return (
    <>
      <Mentor_navbar />
      <div className="mentor-contest-container">
        <div className="header-section">
          <div>
            <h1>Contests</h1>
            <p className="subtitle">Manage and create technical challenges for students</p>
          </div>
          <button className="add-btn" onClick={toggleForm}>
            <span>+</span> Create Contest
          </button>
        </div>

        {showForm && (
          <div className="slide-form-overlay">
            <div className="slide-form">
              <h2>Create New Contest</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Contest Title</label>
                  <input
                    type="text"
                    name="contesttitle"
                    placeholder="e.g. DSA Interview Prep"
                    value={formData.contesttitle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="contestdate"
                      value={formData.contestdate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="conteststatus"
                      value={formData.conteststatus}
                      onChange={handleChange}
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Live">Live</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Difficulty</label>
                  <select
                    name="contestdifficulty"
                    value={formData.contestdifficulty}
                    onChange={handleChange}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="contestdescription"
                    placeholder="Brief description of the contest..."
                    value={formData.contestdescription}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Mentor</label>
                  <input
                    type="text"
                    value={mentorname || "Not available"}
                    readOnly
                    className="read-only-input"
                  />
                </div>

                <div className="form-buttons">
                  <button type="button" className="cancel-btn" onClick={toggleForm}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Create Contest
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="filters">
          <div className="search-group">
            <svg className="search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search contests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Filter by:</label>
            <select
              value={contestTypeFilter}
              onChange={(e) => setContestTypeFilter(e.target.value)}
            >
              <option value="all">All Contests</option>
              <option value="dsa">DSA</option>
              <option value="system-design">System Design</option>
              <option value="frontend">Frontend</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="all">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="contest-card-wrapper">
          {contests.length > 0 ? (
            contests.map((contest) => (
              <ContestCard
                key={contest.contestid}
                id={contest.contestid}
                title={contest.contesttitle}
                date={contest.contestdate}
                status={contest.conteststatus}
                difficulty={contest.contestdifficulty}
                description={contest.contestdescription}
                mentor={mentorname}
              />
            ))
          ) : (
            <div className="no-results">
              <p>No contests found matching your filters or you haven't created one yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
