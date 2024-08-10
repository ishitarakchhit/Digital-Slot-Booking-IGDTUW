import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  console.log(loading);
  console.log(error);
  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="landing-page">
            <h1>Login As: </h1>
            <div className="d-flex mx-5 ">
              <span className="btn btn-dark text-light text-decoration-none ">
                {" "}
                <Link to="/adminlogin">Admin</Link>
              </span>
              <span className="btn btn-dark text-light text-decoration-none">
                <Link to="/studentlogin">Student</Link>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
