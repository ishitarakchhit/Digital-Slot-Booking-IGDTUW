import React from "react";
import Form from "../../components/shared/Form/Form";
import { Link } from "react-router-dom";
export const StudentRegister = () => {
  return (
    <>
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
    </>
  );
};
