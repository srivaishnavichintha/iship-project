import React, { useState, useEffect } from "react";
import "./StudentContest.css";
import Student_navabar from '../Student_navabar';
import Contest_on_card from "../components/Contest_on_card"

const ContestPage = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 24, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (t) => (t < 10 ? `0${t}` : t);

  return (
    <>
    <Student_navabar />
    <div className="contest-page">
      <div className="contest-container">
        <h1 className="page-title">Contests</h1>

        {/* Current Contest */}
        <Contest_on_card />

        {/* Upcoming Contests */}
        <section className="contest-section">
          <h2>Upcoming Contests</h2>
          <div className="contest-grid">
            <div className="contest-card upcoming">
              <h3>React Wizard</h3>
              <p>Frontend skills test</p>
              <div className="meta">
                <span>📅 Starts: July 30</span>
                <span>⏰ Register by: July 28</span>
              </div>
              <button className="btn register">Register Now</button>
            </div>
            <div className="contest-card upcoming">
              <h3>Algo Hunt</h3>
              <p>Level up your algorithm skills</p>
              <div className="meta">
                <span>📅 Starts: August 3</span>
                <span>⏰ Register by: August 1</span>
              </div>
              <button className="btn register">Register Now</button>
            </div>
          </div>
        </section>

        {/* Past Contests */}
        <section className="contest-section past-section">
          <h2>Past Contests</h2>
          <div className="table-wrapper">
            <table className="contest-table">
              <thead>
                <tr>
                  <th>Contest</th>
                  <th>Date</th>
                  <th>Results</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Spring CodeFest</td>
                  <td>May 12, 2025</td>
                  <td><button className="btn view">View</button></td>
                </tr>
                <tr>
                  <td>Algo Blitz</td>
                  <td>April 3, 2025</td>
                  <td><button className="btn view">View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default ContestPage;
