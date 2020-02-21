import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CreatePollPage.css";
import pollService from "../../utils/pollService";

function CreatePollPage(props) {
  const [state, setState] = useState({
    question: "",
    time_limit: null,
    choices: []
  });
  const [newChoice, setNewChoice] = useState({
    content: ""
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state.question.length > 140) throw new Error("question longer 140 characters");
      state.choices.forEach(choice => {
        if (choice.content.length > 140) throw new Error("a choice is longer 140 characters");
      });
      await pollService.create(state);
      props.history.push("/");
    } catch (err) {
      alert(err);
    }
  }

  const handleNewChoiceChange = (e) => {
    setNewChoice({
      ...newChoice,
      [e.target.name]: e.target.value
    });
  }

  const handleAddNewChoice = (e) => {
    e.preventDefault();
    // copy choices and push to it, then setState
    const choices = [...state.choices];
    choices.push({...newChoice});
    setState({
      ...state,
      choices
    });
    setNewChoice({
      content: ""
    });
  }

  return (
    <div className="CreatePollPage">
      <h1>Create A Poll</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question (max 140 chars.)</label>
        <input id="question" name="question" type="text" onChange={handleChange} value={state.question} />
        <label htmlFor="time-limit">Expires</label>
        <input id="time-limit" name="time_limit" type="datetime-local" onChange={handleChange} />
        <div className="choices">
          <h3>Choices</h3>
          {state.choices.length ?
            state.choices.map((choice, idx) =>
              <div key={`choice_${idx}`} className="choice">
                <span>{choice.content}</span>
              </div>)
              :
              <span>No choices yet</span>}
          <label htmlFor="content">Choice (max 140 chars.)</label>
          <input id="content" name="content" type="text" value={newChoice.content} onChange={handleNewChoiceChange} />
          <button onClick={handleAddNewChoice}>Add Choice</button>
        </div>
        <button className="btn btn--primary" type="submit">Create</button>
      </form>
      <Link className="btn btn--minimal" to="/">Back</Link>
    </div>
  );
}

export default CreatePollPage;
