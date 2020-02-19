import React from "react";
import { Link } from "react-router-dom";

import "./PollPreview.css";

function PollPreview(props) {
  return (
    <div className="PollPreview">
      <div className="user-info">
        <img alt="user avatar" className="avatar avatar--small" src={false ? "USERAVATAR" : "static/media/user-image-with-black-background.svg" } />
        <Link className="username" to="">@username</Link>
      </div>
      <div className="poll-contents">
        <span className="poll-question">
          Why did the chicken cross the road?
        </span>
        <div className="poll-options">
          <div className="preview hidden-ellipsis">To flex</div>
          <div className="preview hidden-ellipsis">To eat</div>
          <div className="preview hidden-ellipsis">To get to the other side</div>
        </div>
      </div>
      <Link className="poll-link" to="">View details</Link>
    </div>
  );
}

export default PollPreview;
