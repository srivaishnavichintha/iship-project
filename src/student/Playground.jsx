// import React from 'react';
// import P2pCard from '../components/P2pcard';
// import Student_navbar from '../Student_navabar';
// import './Playground.css';

// const Playground = () => {
//   const p2pMatches = [
//     {
//       id: 'p2p-001',
//       student1: 'Alex Johnson',
//       student2: 'Sam Wilson',
//       course: 'Advanced Calculus',
//       level: 'Intermediate',
//       contestTime: '10:00 AM - 12:00 PM',
//       matchDate: '2023-11-15',
//       tags: ['Same Section', 'Math Focus']
//     },
//     {
//       id: 'p2p-002',
//       student1: 'Maria Garcia',
//       student2: 'James Lee',
//       course: 'Data Structures',
//       level: 'Advanced',
//       contestTime: '2:00 PM - 4:00 PM',
//       matchDate: '2023-11-16',
//       tags: ['Algorithm Focus', 'Same Batch']
//     },
//     {
//       id: 'p2p-003',
//       student1: 'Taylor Swift',
//       student2: 'Emma Watson',
//       course: 'English Literature',
//       level: 'Beginner',
//       contestTime: '4:00 PM - 6:00 PM',
//       matchDate: '2023-11-17',
//       tags: ['Creative Writing', 'Same Class']
//     },
//     {
//       id: 'p2p-004',
//       student1: 'John Doe',
//       student2: 'Jane Smith',
//       course: 'Physics',
//       level: 'Advanced',
//       contestTime: '9:00 AM - 11:00 AM',
//       matchDate: '2023-11-18',
//       tags: ['Lab Partners', 'Research Team']
//     }
//   ];

//   return (
//     <>
//     <Student_navbar />
//     <div className="playground-container">
//       <h1 className="playground-title">Peer-to-Peer Matching Dashboard</h1>
//       <div className="p2p-grid">
//         {p2pMatches.map((match) => (
//           <P2pCard
//             key={match.id}
//             {...match}
//           />
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default Playground;


import React, { useState, useEffect } from 'react';
import P2pCard from '../components/P2pcard';
import Student_navbar from '../Student_navabar';
import './Playground.css';
import axios from 'axios'; // or your preferred HTTP client

const Playground = () => {
  const [p2pMatches, setP2pMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchP2pMatches = async () => {
      try {
        const response = await axios.get('http://localhost:3000/p2p-matches');
        setP2pMatches(response.data);
      } catch (err) {
        console.error('Error fetching P2P matches:', err);
        setError('Failed to load peer matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchP2pMatches();
  }, []); 

  


  return (
    <>
      <Student_navbar />
      <div className="playground-container">
        <h1 className="playground-title">Peer-to-Peer Matching Dashboard</h1>
        {p2pMatches.length > 0 ? (
          <div className="p2p-grid">
            {p2pMatches.map((match) => (
              <P2pCard
                key={match.id}
                id={match.id}
                student1={match.student1}
                student2={match.student2}
                course={match.course}
                level={match.level}
                contestTime={match.contestTime}
                matchDate={match.matchDate}
                tags={match.tags || []}
                problemid={match.problemid}
              />
            ))}
          </div>
        ) : (
          <div className="no-matches">No peer matches found.</div>
        )}
      </div>
    </>
  );
};

export default Playground;