import React from "react";
import FooterLR from "../FooterLR/FooterLR";
import './Contact.css';
import Navbar from "../Navbar/Navbar"

const Contact = () => {
  window.scrollTo(0,0);
  return (
    <>
    <Navbar></Navbar>
    <div className="hold-transition login-page search-panel-bg">
      <div className="container text-white contact">
        <div className="row">
          <div className="col-lg-12">
            <h3>Keep in touch</h3>
          </div>
          <div className="col-lg-12">
            <p>
              <span className="">Corporate Address:</span>
            </p>
            <p className="mb-0">
              <span className="">
                <i className="la la-home la-lg"></i>
              </span>{" "}
              House # 95, Sohrawardi Avenue, Baridhara Diplomatic Zone,
              Dhaka-1212, Bangladesh.
            </p>
            <p>
              <span className="">
                <i className="la la-phone la-lg"></i>
              </span>{" "}
              +880 9613 345345, +880 1730 785685
            </p>
            <p>
              <span className="">
                <i className="la la-envelope la-lg"></i>
              </span>{" "}
              <a href="mailto:info@triplover.com" className="text-dark fw-bold">info@triplover.com</a>
            </p>
          </div>
          <div className="col-lg-12">
            <p>
              <span className="">Banasree Sales:</span>
            </p>
            <p className="mb-0">
              <span className="">
                <i className="la la-home la-lg"></i>
              </span>{" "}
              House # 08, Road # 02, Block # C, Banasree, Rampura, Dhaka- 1219,
              Bangladesh.
            </p>
            <p>
              <span className="">
                <i className="la la-phone la-lg"></i>
              </span>{" "}
              +880 9613 345345
            </p>
            <p>
              <span className="">
                <i className="la la-envelope la-lg"></i>
              </span>{" "}
              <a href="mailto:info@triplover.com" className="text-dark fw-bold">info@triplover.com</a>
            </p>
          </div>
        </div>
      </div>
      <FooterLR></FooterLR>
    </div>
    </>
  );
};

export default Contact;
