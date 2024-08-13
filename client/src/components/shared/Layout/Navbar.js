import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-transparent ">
        <div className="container-fluid  h-25">
          <div className="navbar-header">
            <img
              className="w-50 h-50"
              src="/assets/Logo.png"
              alt="landing logo"
            />
          </div>
          <div className="navbar w-50 bg-light smallnavbar">
            <ul className="nav navbar-nav flex-row align-items-center py-0 mr-auto">
              <li className="active">
                <a href="/">Home</a>
              </li>
              <li className="mx-5">
                <a href="/team">Team</a>
              </li>
              <li>
                <a href="about">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
