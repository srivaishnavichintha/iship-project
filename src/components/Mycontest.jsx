import React from "react";
import "./MyContest.css";

const myContestData = [
  { name: "Weekly Contest 458", date: "Jul 13, 2025", rating: -12, score: 1403, time: "0:36:22", solved: "1 / 4", rank: "15854 / 32157" },
  { name: "Weekly Contest 457", date: "Jul 6, 2025", rating: +7, score: 1415, time: "0:37:24", solved: "1 / 4", rank: "11795 / 30574" },
  { name: "Biweekly Contest 160", date: "Jul 5, 2025", rating: -26, score: 1408, time: "1:21:25", solved: "1 / 4", rank: "16766 / 29470" },
  { name: "Weekly Contest 454", date: "Jun 15, 2025", rating: -29, score: 1435, time: "1:43:15", solved: "1 / 4", rank: "15935 / 28300" },
  { name: "Biweekly Contest 151", date: "Mar 1, 2025", rating: -18, score: 1464, time: "0:09:03", solved: "1 / 4", rank: "16881 / 31175" },
  { name: "Weekly Contest 407", date: "Jul 21, 2024", rating: +13, score: 1482, time: "0:35:05", solved: "2 / 4", rank: "12841 / 34231" }
];

export default function MyContests() {
  return (
    <div className="my-contests-table">
      <table>
        <thead>
          <tr>
            <th>Contest</th>
            <th>Rating</th>
            <th>Finish Time</th>
            <th>Solved</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {myContestData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}<br /><span>{data.date} 8:00 AM GMT+5:30</span></td>
              <td className={data.rating < 0 ? "down" : "up"}>
                {data.rating > 0 ? `+${data.rating}` : data.rating} <br />
                <span className="score">{data.score}</span>
              </td>
              <td>{data.time}</td>
              <td>{data.solved}</td>
              <td>{data.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
