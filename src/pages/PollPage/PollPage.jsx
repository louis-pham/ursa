import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
      const data = await pollService.get(props.match.params.id);
      console.log(data);
      setPoll(data.poll);
      setResponse(data.response);
      setTotalResponses(data.totalResponses);
    }
    fetchData();
    console.log(props.match);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await pollService.castVote(props.match.params.id, selectedChoice);
    window.location.reload();
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
                  <label for={idx}>{choice.content}</label>
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
                <span className="result-content">{choice.content}</span>
                <span className="result-count">{choice.responses.length}</span>
              </div>
            )}
            <span className="total-responses">{totalResponses}</span>
          </div>
        </>)
        :
        <div className="lds-dual-ring"></div>
      }
    </div>
  );
}

export default PollPage;