import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './EditProfilePage.css';
import userService from "../../utils/userService";

function EditProfilePage({ user, history, handleSignupOrLogin, handleLogout }) {
  const [state, setState] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: '',
    passwordConf: ''
  });

  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

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
      if (!newData.password) {
        delete newData.password;
        delete newData.passwordConf;
      }
      await userService.update(newData);
      // user may have changed their username, so get user again
      handleSignupOrLogin();
      history.push('/profile');
    } catch (err) {
      alert("Error updating");
    }
  }

  const handleDelete = async () => {
    try {
      await userService.deleteUser();
      history.push('/');
      handleLogout();
    }catch (err) {
      alert("Error deleting");
    }
  }

  const isModified = () => {
    return state.username === user.username &&
      state.firstName === user.firstName &&
      state.lastName === user.lastName &&
      state.avatar === undefined &&
      state.email === user.email;
  };

  return (
    <>
    <div className='EditProfilePage'>
      <h2>Edit Details</h2>
      <img alt={`${user.firstName}'s avatar`} src={user.avatar || "/static/media/user-image-with-black-background.svg"} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" placeholder="username" value={state.username} id="username" name="username" onChange={handleChange} />

        <label htmlFor="firstName">First name</label>
        <input type="text" className="form-control" placeholder="John" value={state.firstName} id="firstName" name="firstName" onChange={handleChange} />

        <label htmlFor="lastName">Last name</label>
        <input type="text" className="form-control" placeholder="Doe" value={state.lastName} id="lastName" name="lastName" onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" placeholder="you@example.com" value={state.email} id="email" name="email" onChange={handleChange} />

        <label htmlFor="avatar">Avatar</label>
        <input type="file" className="form-control" id="avatar" name="avatar" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" placeholder="････････" value={state.password} id="password" name="password" onChange={handleChange} />

        <label htmlFor="passwordConf">Confirm Password</label>
        <input type="password" className="form-control" placeholder="････････" value={state.passwordConf} id="passwordConf" name="passwordConf" onChange={handleChange} />

        <button type="submit" className="btn btn-default" disabled={isModified()}>Update</button>
        <Link to="/profile" className="btn btn--minimal">Cancel</Link>
      </form>
      <button className="btn btn--alert" onClick={() => setConfirmModalVisible(true)}>Delete</button>
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
