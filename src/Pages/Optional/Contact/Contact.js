import React from "react";
import './Contact.css';
import Navbar from "../Navbar/Navbar"
import Footer from "../../SharePages/Footer/Footer";

const Contact = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <Navbar></Navbar>
      <div className="hold-transition login-page search-panel-bg" >
        <div className="container border-2 border-secondary contact p-3">
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
                39 Sharif Plaza, Kemal Ataturk Avenue, Banani, Dhaka 1213
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
                <a href="mailto:info@triplover.com" className="text-dark fw-bold">info@FirstTrip.com</a>
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

      </div>
      <Footer></Footer>
    </>
  );
};

export default Contact;
