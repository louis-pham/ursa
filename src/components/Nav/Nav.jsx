import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

const Nav = (props) => {
  let nav = props.user ?
    <div>
      <Link to='' className='Nav-link' onClick={props.handleLogout}>LOG OUT</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className='Nav-welcome'>WELCOME, {props.user.name}</span>
    </div>
    :
    <div>
      <Link to='/login' className='Nav-link'>LOG IN</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to='/signup' className='Nav-link'>SIGN UP</Link>
    </div>;

  return (
    <div className='Nav'>
      {nav}
    </div>
  );
};

export default Nav;
