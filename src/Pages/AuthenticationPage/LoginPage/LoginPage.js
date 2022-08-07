import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/logo/logo-combined.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterLR from "../../Optional/FooterLR/FooterLR";
import "./LoginPage.css";

const LoginPage = () => {
  const { onClickLoginButton } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  // const handleOnBlur = (e) => {
  //   const field = e.target.name;
  //   const value = e.target.value;
  //   const newLoginData = { ...loginData };
  //   newLoginData[field] = value;
  //   setLoginData(newLoginData);
  // };

  const handleLoginUser = (e) => {
    let loginData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    onClickLoginButton(loginData, navigate, location, toast);
    e.preventDefault();
  };

  return (
    <>
      <div className="hold-transition login-page search-panel-bg">
        <div className="login-box">
          <ToastContainer />
          <div className="card">
            <div className="card-header text-center">
              <img src={logo} alt="Triplover" />
            </div>
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>

              <form onSubmit={handleLoginUser}>
                <div className="input-group mb-3">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control rounded"
                    placeholder="Email"
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    id="password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    className="form-control rounded"
                    placeholder="Password"
                    required
                  />
                  <div className="input-group-append" onClick={togglePassword}>
                    <div className="input-group-text">
                      {passwordShown ? (
                        <i class="fas fa-eye"></i>
                      ) : (
                        <i class="fa fa-eye-slash" aria-hidden="true"></i>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="icheck-primary">
                      <input className="me-1" type="checkbox" id="remember" />
                      <label htmlFor="remember" className="font-size">
                        Remember Me
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 my-2">
                    <button
                      type="submit"
                      className="btn button-color text-white fw-bold btn-block rounded btn-sm"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
              <p className="lh-2">
                <Link to="/forgotpassword">
                  <span className="font-size" style={{ color: "#66667f" }}>
                    Forgot password?
                  </span>
                </Link>
                <br></br>
                <Link to="/registration">
                  <span className="font-size mt-1" style={{ color: "#66667f" }}>
                    <span className="fw-bold" style={{ color: "#1d94e4" }}>
                      Sign Up
                    </span>{" "}
                    for new user
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* <div className="login-form">
          <FooterLR></FooterLR>
        </div> */}
      </div>
    </>
  );
};

export default LoginPage;
