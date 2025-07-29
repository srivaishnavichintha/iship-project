import { useState } from "react";
import "./Practice_data.css";

export default function Practice_data({ companyTags, problems }) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const filteredProblems = selectedCompany
    ? problems.filter((problem) => problem.company === selectedCompany)
    : problems;

  return (
    <div className="dash">
      <div id="Companytags">
        <h3>Company wise problems</h3>
        {companyTags.map((company, index) => (
          <button
            key={index}
            className={selectedCompany === company ? "active-tag" : ""}
            onClick={() =>
              setSelectedCompany(company === selectedCompany ? null : company)
            }
          >
            {company}
          </button>
        ))}
      </div>

      <div className="problemsdata">
        <h1>Problems</h1>
        {filteredProblems.map((problem, index) => (
          <div className="coding_data" key={index}>
            <div className="c1">
              <h4>{problem.id}</h4>
              <h4>{problem.title}</h4>
            </div>
            <div className="c2">
              <p>{problem.level}</p>
              <p>{problem.successRate}</p>

              <div className="problem-tags">
                {problem.tags && problem.tags.map((tag, idx) => (
                  <span className="tag" key={idx}>{tag}</span>
                ))}
              </div>

              <button>Solve Challenge</button>
            </div>
          </div>
        ))}
        {filteredProblems.length === 0 && (
          <p style={{ marginTop: "20px", color: "gray" }}>
            No problems found for {selectedCompany}
          </p>
        )}
      </div>
    </div>
  );
}
