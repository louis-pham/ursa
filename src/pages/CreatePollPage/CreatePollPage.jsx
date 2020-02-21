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

    if (newChoice.content) {
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
    } else {
      alert("cant add a blank choice!");
    }

  }

  return (
    <div className="CreatePollPage">
      <h1>Create A Poll <i class="fas fa-plus-square"></i></h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question<span className="required">*</span> (max length 140 chars.)</label>
        <input id="question" name="question" type="text" onChange={handleChange} value={state.question} />
        <label htmlFor="time-limit">Expires</label>
        <input id="time-limit" name="time_limit" type="datetime-local" onChange={handleChange} />
        <div className="choices">
          <h2>Choices <i class="fas fa-list"></i></h2>
          {state.choices.length ?
            state.choices.map((choice, idx) =>
              <li key={`choice_${idx}`} className="choice">
                <span>{choice.content}</span>
              </li>)
              :
              <span style={{color: "red", fontWeight: 500, fontSize: "1.3rem"}}>No choices yet</span>}
          <label htmlFor="content">New Choice<span className="required">*</span> (max length 140 chars.) (min. 2 choices)</label>
          <input className="new-choice" id="content" name="content" type="text" value={newChoice.content} onChange={handleNewChoiceChange} />
          <button className="btn btn--secondary new-choice" onClick={handleAddNewChoice}>Add Choice</button>
        </div>
        <button className="btn btn--primary" type="submit">Create</button>
      </form>
      <Link className="btn btn--minimal" to="/">Back</Link>
    </div>
  );
}

export default CreatePollPage;
