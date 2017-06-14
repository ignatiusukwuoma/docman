import React from 'react';
import { Link } from 'react-router';

function Nav({ logout }) {
  return (
    <nav className="navbar-main">
      <div className="nav-wrapper">
        <Link to="/home" className="brand-logo">Docman Pro</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <Link to="" onClick={logout}> Logout </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
