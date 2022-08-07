import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo/logo-combined.png";

const ForgotPassword = () => {
  return (
    <div className="hold-transition login-page search-panel-bg">
      <div className="login-box">
        {/* <div className="login-logo">
          <img src={logo} alt="Triplover" />
          <Link to="/"></Link>
        </div> */}

        <div className="card">
          <div class="card-header text-center">
            <Link to="/">
              <img src={logo} alt="Triplover" />
            </Link>
          </div>
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              Provide your registered email with Triplover to reset your
              password.
            </p>

            <form action="recover-password.html" method="post">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control rounded"
                  placeholder="Email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="row pb-4">
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn button-color text-white fw-bold btn-block rounded btn-sm"
                  >
                    Reset password
                  </button>
                </div>
                <div className="col-6">
                  <Link
                    to="/"
                    className="btn text-white fw-bold btn-block rounded btn-sm"
                    style={{ backgroundColor: "#5c5c65" }}
                  >
                    Back
                  </Link>
                </div>
              </div>
            </form>

            {/* <p className="mt-3 mb-1 font-size">
              <Link to="/">
                <span className="fw-bold" style={{ color: "#1d94e4" }}>
                  Sign In
                </span>
              </Link>
            </p> */}
            {/* <p className="mb-0">
              <a href="register.html" className="text-center">
                Register a new membership
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
