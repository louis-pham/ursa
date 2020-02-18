import React, { useState } from "react";
import { Link } from "react-router-dom"
import "./LoginPage.css";
import userService from "../../utils/userService";

function LoginPage(props) {
  const [state, setState] = useState({
    email: '',
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
      <header className="header-footer">Log In</header>
      <form className="form-horizontal" onSubmit={handleSubmit} >
        <div className="form-group">
          <div className="col-sm-12">
            <input type="email" className="form-control" placeholder="Email" value={state.email} name="email" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input type="password" className="form-control" placeholder="Password" value={state.pw} name="pw" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
            <Link to='/'>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
