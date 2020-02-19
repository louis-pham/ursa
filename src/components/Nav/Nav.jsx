import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

const Nav = (props) => {
  let nav = props.user &&
    <div>
      <Link to='' className='Nav-link' onClick={props.handleLogout}>LOG OUT</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className='Nav-welcome'>WELCOME, {props.user.firstName}</span>
    </div>
    ;

  return (
    <div className='Nav'>
      <Link to="/" className="logo"><img alt="Ursa logo" src="static/media/fgPTrlTWKzx7u2-5y1-ZVgvML_3lA_hZXonp41yTyXo.png"/></Link>
      {nav}
    </div>
  );
};

export default Nav;
