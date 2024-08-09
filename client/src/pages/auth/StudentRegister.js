import React from "react";
import Form from "../../components/shared/Form/Form";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner.js";
import { toast } from "react-toastify";

export const StudentRegister = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assets/images/banner2.jpg" alt="RegisterImage" />
          </div>
          <div className="col-md-4 form-container">
            <Form
              formTitle={"Register Here!"}
              submitButton={"SIGN UP"}
              formType={"register"}
            />
            <div>
              Are you an Admin?
              <Link to="/AdminLogin">Login Here!</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
