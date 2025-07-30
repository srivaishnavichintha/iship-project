import React from "react";
import "./Past_contests.css";
import contest from "../assets/contest.jpeg";


const contestList = [
  { name: "Weekly Contest 460", date: "Jul 27, 2025 8:00 AM", type: "Virtual", image: contest },
  { name: "Weekly Contest 459", date: "Jul 20, 2025 8:00 AM", type: "Virtual", image: contest },
  { name: "Biweekly Contest 161", date: "Jul 19, 2025 8:00 PM", type: "Virtual", image: contest },
  { name: "Weekly Contest 458", date: "Jul 13, 2025 8:00 AM", type: "Virtual", image: contest },
  { name: "Weekly Contest 457", date: "Jul 6, 2025 8:00 AM", type: "Virtual", image: contest },
  { name: "Biweekly Contest 160", date: "Jul 5, 2025 8:00 PM", type: "Virtual", image: contest }
];

export default function PastContests() {
  return (
    <div className="past-contests-wrapper">
      {contestList.map((contest, index) => (
        <div className="past-contest-card" key={index}>
          <img src={contest.image} className="past-contest-img" alt="contest" />
          <div className="past-contest-info">
            <h4 className="past-title">{contest.name}</h4>
            <p className="past-date">{contest.date} GMT+5:30</p>
          </div>
          <div className="past-contest-tag">
            <span className="past-tag">{contest.type}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
