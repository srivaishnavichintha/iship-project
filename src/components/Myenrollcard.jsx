import "./MyEnrollCard.css";
import { useNavigate } from "react-router-dom";

const cardColors = [
  "#FFFAE5", "#E6F7FF", "#EAF6F6", "#FDE2E4", "#F3F0FF", "#E0F7FA",
  "#FFF0F5", "#F9FBE7", "#F1F8E9", "#ECEFF1", "#FFEBEE", "#FFF3E0"
];

function getRandomColor() {
  return cardColors[Math.floor(Math.random() * cardColors.length)];
}

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export default function MyEnrollCard({ id, title, description, progress, tags = [] }) {
  const navigate = useNavigate();
  const bgColor = getRandomColor();

  const handleContinueClick = () => {
    const slug = slugify(title);
    navigate(`/course/${slug}`, { state: { title, courseid: id } });
  };

  return (
    <div className="course-card">
      <div className="card-top" style={{ backgroundColor: bgColor }}>
        <h2 className="course-title">{title}</h2>
        <p className="course-desc">{description}</p>

        <div className="tags-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{progress}% completed</p>
        </div>
      </div>

      <div className="card-bottom">
        <button className="continue-button" onClick={handleContinueClick}>
          Continue Learning
        </button>
      </div>
    </div>
  );
}
