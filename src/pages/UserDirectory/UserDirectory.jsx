import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./UserDirectory.css";
import * as Constants from "../../constants";
import userService from "../../utils/userService";

function UserDirectory(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getAllUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <div className="UserDirectory">
      <h1>User Directory <i className="fas fa-users"></i></h1>
      <div className="users">
        { users.length ?
            users.map((user, idx) =>
              <Link className="user-preview" to={`/users/${user.username}`}>
                <img src={user.avatar || Constants.NOAVATAR} />
                <span>{user.username}</span>
              </Link>
            )
            :
            <div className="lds-dual-ring"></div>
        }
      </div>
    </div>
  );
}

export default UserDirectory;
