import { useLocation, useParams } from "react-router-dom";

function MentorContestDetails() {
  const { contestSlug } = useParams(); // Extract the contestSlug from the URL
  const location = useLocation();
  const { courseid } = location.state || {}; // Access the passed state

  return (
    <div>
      <h1>Contest Details: {contestSlug}</h1>
      <p>Course ID: {courseid}</p>
      {/* Render contest details here */}
    </div>
  );
}

export default MentorContestDetails;