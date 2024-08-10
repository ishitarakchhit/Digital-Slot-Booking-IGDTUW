import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged Out Successfully");
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand h1">
            <img src="/assets/Logo.png" alt="logo" />
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                Welcome {user?.name ? user.name : "Admin"}!
              </p>
            </li>
            <li className="nav-item mx-3 position-relative">
              <IoIosArrowDropdownCircle
                className="dropdown-icon"
                onClick={toggleDropdown}
                style={{ cursor: "pointer" }}
              />
              {isDropdownOpen && (
                <div className="dropdown-menu show">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </li>
            <li className="nav-item mx-3">
              <FaRegUserCircle />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
