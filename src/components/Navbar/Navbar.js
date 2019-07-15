import React from 'react';

import { NavLink, Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <Link to="/" className="navbar-brand">
      PM dApp
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown active">
          <Link
            to=""
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Account
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link to="" className="dropdown-item">
              &nbsp; Sign Out
            </Link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
