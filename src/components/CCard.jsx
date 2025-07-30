import "./CCard.css";
import { useNavigate } from "react-router-dom";

const cardColors = [
  "#FFFAE5", "#E6F7FF", "#EAF6F6", "#FDE2E4", "#F3F0FF", "#E0F7FA",
  "#FFF0F5", "#F9FBE7", "#F1F8E9", "#ECEFF1", "#FFEBEE", "#FFF3E0"
];

function getRandomColor() {
  return cardColors[Math.floor(Math.random() * cardColors.length)];
}

// 🧠 Slugify the course name for URL friendliness
function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export default function CourseCard({ id, title, description, mentor, endDate, tags = [] }) {
  const bgColor = getRandomColor();
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    const slug = slugify(title);
    navigate(`/enroll/${slug}`, { state: { title, courseid: id } });
  };
  const  handlecourseclick = () => {
    const enrol = slugify(title);
    navigate(`/course/${enrol}`,{state: {title,courseid: id}});
  }

  return (
    <div className="course-card">
      <div className="card-top" style={{ backgroundColor: bgColor }} onClick={handlecourseclick}>
        <h2 className="course-title">{title}</h2>
        <p className="course-desc">{description}</p>

        <div className="tags-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="card-bottom">
        <p>Mentor: <strong>{mentor}</strong></p>
        <p>Enroll By: <strong>{endDate}</strong></p>
        <button className="enroll-button" onClick={handleEnrollClick}>
          Enroll Now
        </button>
      </div>
    </div>
  );
}
