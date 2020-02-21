import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Line } from 'rc-progress';

import "./PollPage.css";
import * as Constants from "../../constants";
import pollService from "../../utils/pollService";

function PollPage(props) {
  const [poll, setPoll] = useState({});
  const [response, setResponse] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState("");
  const choiceForm = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pollService.get(props.match.params.id);
        setPoll(data.poll);
        setResponse(data.response);
        setTotalResponses(data.totalResponses);
      } catch (err) {
        props.notify("error", `Couldn't get poll data - ${err.message}`);
      }


    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await pollService.castVote(props.match.params.id, selectedChoice);
      window.location.reload();
    } catch (err) {
      props.notify("error", err.message);
    }
  };

  const handleChoiceChange = e => {
    setSelectedChoice(e.target.value);
  };

  // const isEdited = poll && poll.createdAt !== poll.updatedAt;

  return (
    <div className="PollPage">
      <h1>Poll Details <i className="fas fa-person-booth"></i></h1>
      {Object.keys(poll).length ?
        (<>
          <div className="question">
            <div className="creator-info">
              <img alt={`${poll.creator.firstName}'s avatar`} src={poll.creator.avatar || Constants.NOAVATAR} />
              <Link to={`/users/${poll.creator.username}`}>@{poll.creator.username}</Link>
            </div>
            <h2 className="content">{poll.question}</h2>
          </div>
          <div className="response">
            <form onSubmit={handleSubmit} ref={choiceForm}>
              {poll.choices.map((choice, idx) =>
                <span key={idx} className="response-choice">
                  <input id={idx} type="radio" name="choice" value={choice._id} checked={selectedChoice === choice._id || (response.length && response[0]._id === choice._id)} onChange={handleChoiceChange} disabled={response.length > 0} />
                  <label htmlFor={idx}>{choice.content}</label>
                </span>
              )}
              <button className="btn" type="submit" disabled={response.length > 0}>Cast vote</button>
            </form>
            <div className="your-info">
              <img alt={`${poll.creator.firstName}'s avatar`} src={poll.creator.avatar || Constants.NOAVATAR} />
              <Link to="/profile">You</Link>
            </div>
          </div>
          <div className="results" style={{ display: response.length > 0 ? "block" : "none" }}>
            <h2>Results <i className="fas fa-award"></i></h2>
            {poll.choices.map((choice, idx) =>
              <div key={`result${idx}`} className="results-choice">
                <Line percent={choice.responses.length / totalResponses * 100} strokeWidth="1" strokeColor="#91dec9" />
                <span className="result-count">Votes: <b>{choice.responses.length}</b></span>
              </div>
            )}
            <hr />
            <span className="total-responses">Total: <b>{totalResponses}</b></span>
          </div>
        </>)
        :
        <div className="lds-dual-ring"></div>
      }
    </div>
  );
}

export default PollPage;
