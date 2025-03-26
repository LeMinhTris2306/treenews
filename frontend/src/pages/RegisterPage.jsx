import React, { useState } from "react";
import Register from "../components/auth/Register";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container-md main-content" id="register-section">
        <div className="row">
          <div className="col-12 col-sm-3 col-md-12 m-auto">
            <div className="card border-0 shadow">
              <div className="card-body">
                <svg
                  className="mx-auto my-3 bi bi-person-circle"
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                <Register />
              </div>
              <div className="mb-3">
                <a
                  href="#"
                  className="link-offset-1 text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  Đã có tài khoản
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <a className="nav-link text-center">Already have an account ?</a> */}
      </div>
    </>
  );
};

export default RegisterPage;
