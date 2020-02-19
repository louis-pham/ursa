import React, { useState } from "react";
import { Link } from "react-router-dom"
import "./LoginPage.css";
import userService from "../../utils/userService";

function LoginPage(props) {
  const [state, setState] = useState({
    username: '',
    pw: ''
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Update to call login instead of signup
      await userService.login(state);
      props.handleSignupOrLogin()
      props.history.push('/');
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      console.log(err);
      alert('Invalid Credentials!');
    }
  }

  return (
    <div className="LoginPage">
      <header><h1>Log In</h1></header>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" className="form-control" placeholder="username" value={state.email} id="username" name="username" onChange={handleChange} />

      <label htmlFor="pw">Password</label>
      <input type="password" className="form-control" placeholder="********" value={state.pw} id="pw" name="pw" onChange={handleChange} />

      <button className="btn btn-default">Log In</button>
      <Link to='/'>Cancel</Link>
      </form>
    </div>
  );
}

export default LoginPage;
