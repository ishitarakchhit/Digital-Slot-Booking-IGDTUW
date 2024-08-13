import React, { useState, useEffect } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitButton, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  useEffect(() => {
    if (formType === "adminlogin") {
      setRole("admin");
    } else {
      setRole("student");
    }
  }, [formType]);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <form
        onSubmit={(e) => {
          if (formType === "login" || formType === "adminlogin")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(e, name, role, email, password);
        }}
      >
        <h3 className="text-center">{formTitle}</h3>
        <hr />

        {/* switch statement */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "adminlogin": {
              return (
                <>
                  <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  <InputType
                    labelText={"Name"}
                    labelFor={"forName"}
                    inputType={"text"}
                    name={"name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

        <div className="justify-content-between">
          <button
            className="btn btn-primary celestial-color px-5"
            type="submit"
          >
            {submitButton}
          </button>
          {role === "student" &&
            (formType === "login" ? (
              <div className="">
                <p className="ml-5">
                  <hr />
                  Register Now!
                </p>
                <Link
                  className="btn btn-primary celestial-color text-white px-5"
                  to="/studentregister"
                >
                  {" "}
                  Sign Up!
                </Link>
              </div>
            ) : (
              <div className="">
                <p className="ml-5">
                  <hr />
                  Already a User?
                </p>
                <Link
                  className="btn btn-primary celestial-color text-white px-5"
                  to="/studentlogin"
                >
                  {" "}
                  Login
                </Link>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default Form;
