import React from 'react';
import SearchBar from './SearchBar';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <a className="navbar-brand me-auto" href="/">LearnToEarn</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <SearchBar/>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="learn">Learn</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="about">About</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-dark" onClick={() => window.location.href = "/signup"}>Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
