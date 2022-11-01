import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo/logo-combined.png";



const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid ms-5">
          <Link class="navbar-brand" to="/search">
            {/* <img src={logo} alt="" width="60%" height="40"  /> */}
            <img src={logo} alt="" width='160px' />
          </Link>
          {/* <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active fs-5 fw-bold me-3" aria-current="page" to="/">
                  Login
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
