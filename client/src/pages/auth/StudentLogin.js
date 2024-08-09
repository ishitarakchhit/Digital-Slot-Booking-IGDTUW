import React from "react";
import Form from "../../components/shared/Form/Form.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner.js";
import { toast } from "react-toastify";

export const StudentLogin = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            {/* <img src="./assets/images/banner1.jpg" alt="LoginImage" /> */}
          </div>
          <div className="col-md-4 form-container">
            <Form
              formTitle={"Hello Student!"}
              submitButton={"LOGIN"}
              formType={"login"}
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
