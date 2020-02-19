import React from "react";

import "./Dashboard.css";
import PollPreview from "../PollPreview/PollPreview";

function Dashboard(props) {
  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      <section className="polls">
      <h2>Your Timeline</h2>
        <PollPreview />
        <PollPreview />
      </section>
    </div>
  );
}

export default Dashboard;
