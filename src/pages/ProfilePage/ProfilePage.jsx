import React from 'react';
import { Link } from "react-router-dom";

import './ProfilePage.css';

function ProfilePage({ user, match, history }) {
  return (
    <div className='ProfilePage'>
      <h2>{user.firstName}'s Details</h2>
      <img alt={`${user.firstName}'s avatar'`} src={user.avatar || "static/media/user-image-with-black-background.svg"} />

      <span className="label">Username</span>
      <span id="username">{user.username}</span>

      <span className="label">First name</span>
      <span id="firstName">{user.firstName}</span>

      <span className="label">Last name</span>
      <span id="lastName">{user.lastName}</span>

      <span className="label">Email</span>
      <span id="email">{user.email}</span>

      <span className="label">Joined</span>
      <span id="email">{user.createdAt}</span>

      <Link to={`${match.url}/edit`} className="btn">Settings</Link>
      <Link to="/" className="btn btn--minimal">Back</Link>
    </div>
  );
}

export default ProfilePage;
