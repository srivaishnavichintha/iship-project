import "./P2pCard.css";
import { useNavigate } from "react-router-dom";

const cardColors = [
  "#FFFAE5", "#E6F7FF", "#EAF6F6", "#FDE2E4", "#F3F0FF", "#E0F7FA",
  "#FFF0F5", "#F9FBE7", "#F1F8E9", "#ECEFF1", "#FFEBEE", "#FFF3E0"
];

function getRandomColor() {
  return cardColors[Math.floor(Math.random() * cardColors.length)];
}

function formatDateTime(dateString, timeString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString).toLocaleDateString(undefined, options);
  return `${date} • ${timeString}`;
}

export default function P2pCard({ 
  id, 
  student1, 
  student2, 
  course, 
  level, 
  contestTime,
  matchDate,
  tags = []
}) {
  const bgColor = getRandomColor();
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/p2p/${id}`, { 
      state: { 
        student1, 
        student2, 
        course, 
        level,
        contestTime,
        matchDate,
        tags
      } 
    });
  };

  return (
    <div className="p2p-card">
      <div className="card-top" style={{ backgroundColor: bgColor }} onClick={handleViewClick}>
        <h2 className="pair-title">{student1} & {student2}</h2>
        <div className="pair-details">
          <p><strong>Course:</strong> {course}</p>
          <p><strong>Level:</strong> {level}</p>
          <p className="session-time">
            <strong>Session:</strong> {formatDateTime(matchDate, contestTime)}
          </p>
        </div>

        <div className="tags-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="card-bottom">
        <p>Matched on: <strong>{new Date(matchDate).toLocaleDateString()}</strong></p>
        <button className="details-button" onClick={handleViewClick}>
          View Details
        </button>
      </div>
    </div>
  );
}