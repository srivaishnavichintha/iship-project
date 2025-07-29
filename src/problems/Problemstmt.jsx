import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProblemStatement() {
  const { slug } = useParams();
  const { state } = useLocation();
  const [problemData, setProblemData] = useState(null);

  useEffect(() => {
    if (state?.problemId) {
      axios
        .post("http://localhost:5000/getProblemById", { problemId: state.problemId })
        .then((res) => {
          setProblemData(res.data);
        })
        .catch((err) => console.error("Error fetching problem:", err));
    }
  }, [state]);

  if (!problemData) return <div>Loading...</div>;

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ color: "#0077ff" }}>{problemData.title}</h2>
      <p><strong>Level:</strong> {problemData.level}</p>
      <p><strong>Description:</strong></p>
      <p>{problemData.description}</p>
    </div>
  );
}
