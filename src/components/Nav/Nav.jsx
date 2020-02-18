import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

const Nav = (props) => {
  let nav = props.user &&
    <div>
      <Link to='' className='Nav-link' onClick={props.handleLogout}>LOG OUT</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className='Nav-welcome'>WELCOME, {props.user.name}</span>
    </div>
    ;

  return (
    <div className='Nav'>
      <Link to="/" className="logo">URSA</Link>
      {nav}
    </div>
  );
};

export default Nav;
