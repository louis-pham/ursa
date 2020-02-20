import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import './UserPage.css';
import * as Constants from "../../constants";
import userService from "../../utils/userService";

function UserPage({ user, match, history }) {
  const [requestedUser, setRequestedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getRequestedUser(match.params.username);
      console.log(data);
      setRequestedUser(data);
    }
    fetchData();
    }, []);

  return (
    <div className='UserPage'>
      {requestedUser ?
        (<>
        <h2>{requestedUser.firstName}'s Details</h2>
        <img alt={`${requestedUser.firstName}'s avatar'`} src={requestedUser.avatar || Constants.NOAVATAR} />

        <span className="label">Username</span>
        <span id="username">{requestedUser.username}</span>

        <span className="label">First name</span>
        <span id="firstName">{requestedUser.firstName}</span>

        <span className="label">Last name</span>
        <span id="lastName">{requestedUser.lastName}</span>

        <span className="label">Joined</span>
        <span id="email">{requestedUser.createdAt}</span>
        </>)
        :
        <div>Loading...</div>
      }
      <Link to="/" className="btn btn--minimal">Back</Link>
    </div>
  );
}

export default UserPage;
