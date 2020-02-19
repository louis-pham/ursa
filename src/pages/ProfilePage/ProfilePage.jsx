import React from 'react';
import { Link } from "react-router-dom";

import './ProfilePage.css';

function ProfilePage({ user, match, history }) {
  console.log(match);
  return (
    <div className='ProfilePage'>
      <span className="label">First name</span>
      <span id="firstName">{user.firstName}</span>

      <span className="label">Last name</span>
      <span id="lastName">{user.lastName}</span>

      <span className="label">Email</span>
      <span id="email">{user.email}</span>

      <Link to={`${match.url}/edit`} className="btn">Settings</Link>
      <Link to="/" className="btn btn--minimal">Back</Link>
    </div>
  );
}

export default ProfilePage;
