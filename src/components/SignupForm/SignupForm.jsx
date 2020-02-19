import React, { useState } from "react";
import { Link } from "react-router-dom";

import userService from '../../utils/userService';

function SignupForm(props) {
  const [state, setState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConf: ""
  });

  const handleChange = e => {
    props.updateMessage("");
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(state);
      // Successfully signed up - show GamePage
      props.handleSignupOrLogin()
      props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      props.updateMessage(err.message);
    }
  }

  const isFormInvalid = () => {
    const valid = !(state.username && state.firstName && state.lastName && state.email && state.password && state.passwordConf && state.password === state.passwordConf);
    return valid;
  }

  return (
    <>
      <header className="">
        <h1>Sign Up</h1>
        <img alt="" src="static/media/user-image-with-black-background.svg" />
      </header>
      <form className="" onSubmit={handleSubmit} >
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" placeholder="username" value={state.username} id="username" name="username" onChange={handleChange} />

        <label htmlFor="firstName">First name</label>
        <input type="text" className="form-control" placeholder="John" value={state.firstName} id="firstName" name="firstName" onChange={handleChange} />

        <label htmlFor="lastName">Last name</label>
        <input type="text" className="form-control" placeholder="Doe" value={state.lastName} id="lastName" name="lastName" onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" placeholder="you@example.com" value={state.email} id="email" name="email" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" placeholder="🕶" value={state.password} id="password" name="password" onChange={handleChange} />

        <label htmlFor="passwordConf">Confirm Password</label>
        <input type="password" className="form-control" placeholder="🕶" value={state.passwordConf} id="passwordConf" name="passwordConf" onChange={handleChange} />

        <button className="btn btn-default" disabled={isFormInvalid()}>Sign Up</button>
        <Link to='/'>Cancel</Link>
      </form>
    </>
  );
}

export default SignupForm;
