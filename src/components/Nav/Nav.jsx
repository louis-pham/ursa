import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";
import * as Constants from "../../constants";

const Nav = (props) => {
  let nav = props.user &&
    <>
      <Link to="/profile" className='Nav-link profile'><img className="avatar" alt={`${props.user.username}'s settings`} src={props.user.avatar || Constants.NOAVATAR } /></Link>
      <div className="Nav-navigation">
        <Link to="/users" className='Nav-link'>Users</Link>
        <Link to='' className='Nav-link' onClick={props.handleLogout}>LOG OUT</Link>
      </div>
    </>
    ;

  return (
    <div className='Nav'>
      <Link to="/" className="logo"><img alt="Ursa logo" src="/media/fgPTrlTWKzx7u2-5y1-ZVgvML_3lA_hZXonp41yTyXo.png"/></Link>
      {nav}
    </div>
  );
};

export default Nav;
