import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Navbar from "../components/shared/Layout/Navbar";
export const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  console.log(loading);
  console.log(error);
  return (
    <div
      style={{ backgroundImage: 'url("/assets/Landing_bg.png")' }}
      className="homepage"
    >
      <div className="hh">
        <Navbar />

        {error && <span>{toast.error(error)}</span>}
        {loading ? (
          <Spinner />
        ) : (
          <div className="container flex-row">
            <div className="landing-message container">
              <h1 className="">WELCOME TO SLOT BOOKING PORTAL OF IGDTUW</h1>
              <h5 className="mt-5">Login As:</h5>
              <div className="d-flex mt-4 linkButtons ">
                <Link
                  to="/adminlogin"
                  className="text-white text-decoration-none"
                >
                  <span className="text-white">Admin</span>
                </Link>
                <Link
                  to="/studentlogin"
                  className="text-white text-decoration-none"
                >
                  <span className="text-white mx-5">Student</span>
                </Link>
              </div>
            </div>
            <img src="/assets/Rocket.png" alt="rocket" />
          </div>
        )}
      </div>
    </div>
  );
};
