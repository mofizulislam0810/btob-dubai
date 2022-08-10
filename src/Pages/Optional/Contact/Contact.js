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
      <div className="container contact border-1 border-secondary p-4">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="py-2">Keep in touch</h1>
          </div>
          <div className="col-lg-12">
            <p>
              <span className="">Corporate Address:</span>
            </p>
            <p className="mb-0">
              <span className="">
                <i className="la la-home la-lg"></i>
              </span>{" "}
              Al Muhairi 113-127, Al Dhagaya, Deira, Dubai, United Arab Emirates
            </p>
            <p>
              <span className="">
                <i className="la la-phone la-lg"></i>
              </span>{" "}
              +97143375728
            </p>
            <p>
              <span className="">
                <i className="la la-envelope la-lg"></i>
              </span>{" "}
              <a href="mailto:info@triplover.com" className="text-dark fw-bold">info@triplover.ae</a>
            </p>
          </div>
          {/* <div className="col-lg-12">
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
          </div> */}
        </div>
      </div>
      <FooterLR></FooterLR>
    </div>
    </>
  );
};

export default Contact;
