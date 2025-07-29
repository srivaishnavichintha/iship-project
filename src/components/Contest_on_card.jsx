import React, { useEffect, useState } from "react";
import "./Contest_on_card.css";

export default function Contest_on_card() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeLeft() {
    const targetTime = new Date("2025-07-30T18:00:00"); // Set your contest end time
    const now = new Date();
    const diff = targetTime - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return diff > 0 ? { hours, minutes, seconds } : { hours: 0, minutes: 0, seconds: 0 };
  }

  const formatTime = (val) => val.toString().padStart(2, '0');

  return (
    <section className="contest-section">
      <div className="contest-card">
        <h3 className="contest-title">Code Clash</h3>
        <p className="contest-desc">Live DSA challenge – solve 5 problems in 1.5 hours</p>
        <div className="tags">
          <span className="tag">DSA</span>
          <span className="tag">Medium</span>
        </div>
        <div className="timer">
          ⏳ {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)} remaining
        </div>
        <p className="mentor">Host: <strong>Pawan</strong></p>
        <button className="join-button">Enter Contest</button>
      </div>
    </section>
  );
}
