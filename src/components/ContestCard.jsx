import { useNavigate } from "react-router-dom";
import "./ContestCard.css";

function ContestCard({ id, title, date, status, description, mentor }) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    if (!id) {
      console.error('No contest ID provided');
      return;
    }
    const contestSlug = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/mentor/mentorcontest/${contestSlug}`, {
      state: {
        courseid: courseid,  
      }
    });
  };

  return (
    <div className="contest-card">
      <div className="card-header">
        <h3>{title}</h3>
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
      </div>
      <p className="card-description">{description}</p>
      <div className="card-footer">
        <div>
          <p className="mentor-label">Mentor:</p>
          <p className="mentor-name">{mentor}</p>
        </div>
        <div>
          <p className="date-label">Conducted By:</p>
          <p className="date">{new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>
      <button className="view-btn" onClick={handleViewClick}>
        View Details
      </button>
    </div>
  );
}

export default ContestCard;