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
        <div className="w-100">
          <div className="row g-0">
            <div className="col-md-6 form-banner d-flex flex-column align-items-center justify-content-center">
              <div>Are you an Admin?</div>
              <div className="mt-3">
                {" "}
                {/* Add margin-top to create some space between the text and button */}
                <Link
                  className="btn btn-primary celestial-color text-white px-5"
                  to="/AdminLogin"
                >
                  Login Here!
                </Link>
              </div>
            </div>
            <div className="col-md-6 form-container gradient-background">
              <div className="form-inside-container">
                <Form
                  formTitle={"Hello Student!"}
                  submitButton={"LOGIN"}
                  formType={"login"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
