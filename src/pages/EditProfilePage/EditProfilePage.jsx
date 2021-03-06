import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './EditProfilePage.css';
import * as Constants from "../../constants";
import userService from "../../utils/userService";

function EditProfilePage({ user, history, handleSignupOrLogin, handleLogout, notify }) {
  const [state, setState] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: "",
    password: '',
    passwordConf: ''
  });

  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const isNewPassword = () => {
    return state.password || state.passwordConf;
  };

  const isNewPasswordValid = () => {
    return state.password === state.passwordConf;
  };

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newData = {...state};
      console.log(isNewPassword);
      if (!isNewPassword()) {
        delete newData.password;
        delete newData.passwordConf;
      } else {
        if (!isNewPasswordValid()) {
          throw new Error("Password does not match confirmation!");
        }
      }
      await userService.update(newData);
      // user may have changed their username, so get user again
      handleSignupOrLogin();
      history.push('/profile');
      notify("success", "Updated user credentials successfully");
    } catch (err) {
      notify("error", err.message);
    }
  }

  const handleDelete = async () => {
    try {
      await userService.deleteUser();
      history.push('/');
      handleLogout();
    }catch (err) {
      notify("error", err.message);
    }
  }

  const isModified = () => {
    return state.username === user.username &&
      state.firstName === user.firstName &&
      state.lastName === user.lastName &&
      state.avatar === undefined &&
      state.email === user.email &&
      state.password === "" &&
      state.passwordConf === "";
  };

  return (
    <>
    <div className='EditProfilePage'>
      <h1>Edit My Details <i className="fas fa-user-cog"></i></h1>
      <img alt={`${user.firstName}'s avatar`} src={user.avatar || Constants.NOAVATAR} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" placeholder="username" value={state.username} id="username" name="username" onChange={handleChange} />

        <label htmlFor="firstName">First name</label>
        <input type="text" className="form-control" placeholder="John" value={state.firstName} id="firstName" name="firstName" onChange={handleChange} />

        <label htmlFor="lastName">Last name</label>
        <input type="text" className="form-control" placeholder="Doe" value={state.lastName} id="lastName" name="lastName" onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" placeholder="you@example.com" value={state.email} id="email" name="email" onChange={handleChange} />

        <label htmlFor="avatar">Avatar (external link)</label>
        <input type="text" className="form-control" id="avatar" name="avatar" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" placeholder="････････" value={state.password} id="password" name="password" onChange={handleChange} />

        <label htmlFor="passwordConf">Confirm Password</label>
        <input type="password" className="form-control" placeholder="････････" value={state.passwordConf} id="passwordConf" name="passwordConf" onChange={handleChange} />

        <button type="submit" className="btn btn--secondary" disabled={isModified()}>Update</button>

      </form>
      <button className="btn btn--alert" onClick={() => setConfirmModalVisible(true)}>Delete Account</button>
      <Link to="/profile" className="btn btn--minimal">Cancel</Link>
    </div>
    <div className="confirm-delete" style={{display: isConfirmModalVisible ? "block" : "none"}}>
      <div className="delete-modal">
        <span>Are you sure you want to delete your account?</span>
        <button className="btn btn--alert" onClick={handleDelete}>Delete</button>
        <button className="btn btn--minimal" onClick={() => setConfirmModalVisible(false)}>Cancel</button>
      </div>
    </div>
    </>
  );
}

export default EditProfilePage;
