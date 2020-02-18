import React from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

function Landing(props) {
  return (
    <div className="Landing center">
      <h1>Ursa</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum, eros vitae pretium auctor, ligula diam aliquet nulla, maximus imperdiet dolor odio in odio. </p>
      <Link className="btn btn--primary" to="/signup">Get Started</Link>
      <Link className="btn" to="/login">Login</Link>
    </div>
  );
}

export default Landing;
