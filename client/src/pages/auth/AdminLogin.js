import React from "react";
import Form from "../../components/shared/Form/Form.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner.js";

export const AdminLogin = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-100">
          <div className="row g-0">
            <div className="col-md-6 form-banner d-flex flex-column align-items-center justify-content-center">
              <div>Are you a Student?</div>
              <div className="mt-3">
                {" "}
                {/* Add margin-top to create some space between the text and button */}
                <Link
                  className="btn btn-primary celestial-color text-white px-5"
                  to="/studentlogin"
                >
                  Login Here!
                </Link>
              </div>
            </div>
            <div className="col-md-6 form-container gradient-background">
              <div className="form-inside-container">
                <Form
                  formTitle={"Hello Admin!"}
                  submitButton={"LOGIN"}
                  formType={"adminlogin"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
