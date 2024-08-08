import React from "react";
import Form from "../../components/shared/Form/Form.js";
import { Link } from "react-router-dom";
export const AdminLogin = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner">
          {/* <img src="./assets/images/banner1.jpg" alt="LoginImage" /> */}
        </div>
        <div className="col-md-4 form-container">
          <Form
            formTitle={"Hello Admin!"}
            submitButton={"LOGIN"}
            formType={"adminlogin"}
          />
          <div>
            Are you a student?
            <Link to="/StudentLogin">Login Here!</Link>
          </div>
        </div>
      </div>
    </>
  );
};
