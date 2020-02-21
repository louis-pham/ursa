import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "./PollPage.css";
import pollService from "../../utils/pollService";

function PollPage(props) {
  const [poll, setPoll] = useState({});
  const [response, setResponse] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState("");
  const choiceForm = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await pollService.get(props.match.params.id);
      console.log(data);
      setPoll(data.poll);
      setResponse(data.response);
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
      {Object.keys(poll).length ?
        (<>
          <div className="question">
            <div className="creator-info">
              {poll.creator.username}
            </div>
            <h1>{poll.question}</h1>
          </div>
          <div className="response">
            <form onSubmit={handleSubmit} ref={choiceForm}>
              {poll.choices.map((choice, idx) =>
                <span key={idx} className="response-choice">
                  <input id={idx} type="radio" name="choice" value={choice._id} checked={selectedChoice === choice._id || (response.length && response[0]._id === choice._id)} onChange={handleChoiceChange} disabled={response.length > 0} />
                  <label>{choice.content}</label>
                </span>
              )}
              <button className="btn" type="submit" disabled={response.length > 0}>Cast vote</button>
            </form>
            <div className="your-info">
              {}
            </div>
          </div>
          <div className="results" style={{ display: response.length > 0 ? "block" : "none" }}>
            {poll.choices.map((choice, idx) =>
              <span key={idx} className="results-choice">{choice.responses.length}</span>
            )}
          </div>
        </>)
        :
        <div className="lds-dual-ring"></div>
      }
    </div>
  );
}

export default PollPage;
