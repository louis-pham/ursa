import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import './UserPage.css';
import * as Constants from "../../constants";
import userService from "../../utils/userService";

function UserPage({ user, match, history, notify }) {
  const [requestedUser, setRequestedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getRequestedUser(match.params.username);
        setRequestedUser(data);
      } catch (err) {
        notify("error", err.message);
      }
    }
    fetchData();
    }, []);

  return (
    <div className='UserPage'>
      {requestedUser ?
        (<>
        <h1>{requestedUser.firstName}'s Details <i className="fas fa-user"></i></h1>
        <img alt={`${requestedUser.firstName}'s avatar'`} src={requestedUser.avatar || Constants.NOAVATAR} />

        <span className="label">Username</span>
        <span id="username" className="user-detail">{requestedUser.username}</span>

        <span className="label">First name</span>
        <span id="firstName" className="user-detail">{requestedUser.firstName}</span>

        <span className="label">Last name</span>
        <span id="lastName" className="user-detail">{requestedUser.lastName}</span>

        <span className="label">Joined</span>
        <span id="email" className="user-detail">{new Date(requestedUser.createdAt).toLocaleDateString()}</span>
        </>)
        :
        <div>Loading...</div>
      }
      <Link to="/" className="btn btn--minimal">Back</Link>
    </div>
  );
}

export default UserPage;
