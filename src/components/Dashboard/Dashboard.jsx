import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css";
import PollPreview from "../PollPreview/PollPreview";
import pollService from "../../utils/pollService";

function Dashboard(props) {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPollsData = async () => {
      const data = await pollService.getAllPolls();
      setPolls(data);
    };
    fetchPollsData();
  }, []);

  return (
    <div className="Dashboard">
      <span className="welcome-msg">Hi, {props.user.firstName}!</span>
      <h1>Dashboard</h1>
      <div className="btn-group">
        <Link to="/polls/create" className="btn btn--primary">Create A Poll</Link>
        <Link to="/profile" className="btn btn--secondary">Your Profile</Link>
      </div>
      <h2>Your Timeline</h2>
      <section className="polls">
        {polls.length ?
          polls.map((poll, idx) =>
          <PollPreview key={idx} poll={poll} />)
        :
          <div className="lds-dual-ring"></div>
        }
      </section>
    </div>
  );
}

export default Dashboard;
