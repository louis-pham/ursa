import React from 'react';
import { Link } from "react-router-dom";

import './ProfilePage.css';
import * as Constants from "../../constants";

function ProfilePage({ user, match, history }) {
  return (
    <div className='ProfilePage'>
      <h1>My Details <i class="fas fa-user"></i></h1>
      <img alt={`${user.firstName}'s avatar'`} src={user.avatar || Constants.NOAVATAR} />

      <span className="label">Username</span>
      <span id="username" className="user-detail">{user.username}</span>

      <span className="label">First name</span>
      <span id="firstName" className="user-detail">{user.firstName}</span>

      <span className="label">Last name</span>
      <span id="lastName" className="user-detail">{user.lastName}</span>

      <span className="label">Email</span>
      <span id="email" className="user-detail">{user.email}</span>

      <span className="label">Joined</span>
      <span id="email" className="user-detail">{new Date(user.createdAt).toLocaleDateString()}</span>

      <Link to={`${match.url}/edit`} className="btn">Settings</Link>
      <Link to="/" className="btn btn--minimal">Back</Link>
    </div>
  );
}

export default ProfilePage;
