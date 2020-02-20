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
      console.log(data);
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <div className="UserDirectory">
      { users.length ?
          users.map(user =>
            <div className="user-preview">
              <Link to={`/users/${user.username}`}>{user.username}</Link>
            </div>
          )
          :
          <div>Loading...</div>
      }
    </div>
  );
}

export default UserDirectory;
