
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Practice_data.css";

export default function Practice_data({ companyTags, problems }) {
  const [selectedCompany, setSelectedCompany] = useState("All");
  const navigate = useNavigate();

  const handleSolveClick = (problem) => {
    const slug = problem.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/problemstatement/${slug}`, { state: { problemId: problem.id } });
  };

  const filteredProblems = selectedCompany === "All"
    ? problems
    : problems.filter(problem =>
        problem.companyTags && problem.companyTags.includes(selectedCompany)
      );

  return (
    <div className="dash">
      <div id="Companytags">
        <h3>Company wise problems</h3>
        <button
          className={selectedCompany === "All" ? "active" : ""}
          onClick={() => setSelectedCompany("All")}
        >
          All
        </button>
        {companyTags.map((company, index) => (
          <button
            key={index}
            className={selectedCompany === company ? "active" : ""}
            onClick={() => setSelectedCompany(company)}
          >
            {company}
          </button>
        ))}
      </div>

      <div className="problemsdata">
        <h1>Problems</h1>
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem, index) => (
            <div className="coding_data" key={index}>
              <div className="c1">
                <h4>{problem.id}</h4>
                <h4>{problem.title}</h4>
              </div>
              <div className="c2">
                <p>{problem.level}</p>
                <p>{problem.successRate}</p>
                <button onClick={() => handleSolveClick(problem)}>
                  Solve Challenge
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No problems found for {selectedCompany}</p>
        )}
      </div>
    </div>
  );
}


