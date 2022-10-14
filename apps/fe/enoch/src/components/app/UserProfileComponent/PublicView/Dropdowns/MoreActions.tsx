import React from "react";

interface actionObj {
  id: number;
  value: string;
  title: string;
}

const Actions: actionObj[] = [
  {
    id: 1,
    title: "Leaderboard",
    value: "leaderboard",
  },
  {
    id: 2,
    title: "Send Gift",
    value: "sendgift",
  },
  {
    id: 3,
    title: "Mute@Alvaro Stats",
    value: "Mute@AlvaroStats",
  },
  {
    id: 4,
    title: "Block@Alvaro Stats",
    value: "Block@AlvaroStats",
  },
  {
    id: 5,
    title: "Report@Alvaro Stats",
    value: "Report@AlvaroStats",
  },
];

const MoreActions = () => (
  <div className="public-user-view followng onboardthreeDots-btn-content">
    <ul>
      {Actions.map((action: actionObj) => (
        <li key={action.id}>{action.title}</li>
      ))}
    </ul>
  </div>
);

export default MoreActions;
