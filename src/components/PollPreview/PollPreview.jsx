import React from "react";
import { Link } from "react-router-dom";

import "./PollPreview.css";
import * as Constants from "../../constants";

function PollPreview(props) {
  const poll = props.poll;
  return (
    <div className="PollPreview">
      <div className="user-info">
        <img alt="user avatar" className="avatar avatar--small" src={poll.creator.avatar || Constants.NOAVATAR } />
        <Link className="username" to={`/users/${poll.creator.username}`}>@{poll.creator.username}</Link>
      </div>
      <div className="poll-contents">
        <span className="poll-question">
          {poll.question}
        </span>
        <div className="poll-options">
          {poll.choices.slice(0,4).map((choice, idx) =>
            <div key={idx} className="preview hidden-ellipsis">{choice.content}</div>
          )}
          {poll.choices.length > 4 && <span className="more-options">...</span>}
        </div>
      </div>
      <Link className="poll-link" to={`/polls/${poll._id}`}>View details</Link>
    </div>
  );
}

export default PollPreview;
