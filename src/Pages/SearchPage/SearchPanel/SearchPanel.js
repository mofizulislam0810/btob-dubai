import React, { useEffect, useState } from "react";
import "./SearchPanel.css";
import $ from "jquery";
import SearchFrom from "../SearchFrom/SearchFrom";
import AddPanel from "../AddPanel/AddPanel";
import Marquee from "react-fast-marquee";
import currentYear from "../../SharePages/Utility/currentYear";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { environment } from "../../SharePages/Utility/environment";
import Footer from "../../SharePages/Footer/Footer";

const SearchPanel = () => {
  const { setId } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // filght panel click color chenge
    $("#flight-panal").addClass("bottom-border");

    $("#flight-panal").click(function () {
      $("#flight-panal").addClass("bottom-border");
      $("#hotel-panal").removeClass("bottom-border");
      $("#car-panal").removeClass("bottom-border");
    });

    $("#hotel-panal").click(function () {
      $("#hotel-panal").addClass("bottom-border");
      $("#flight-panal").removeClass("bottom-border");
      $("#car-panal").removeClass("bottom-border");
    });

    $("#car-panal").click(function () {
      $("#car-panal").addClass("bottom-border");
      $("#flight-panal").removeClass("bottom-border");
      $("#hotel-panal").removeClass("bottom-border");
    });
  }, []);
  // const marqueeText = [
  //   {
  //     "title":"text one",
  //     "description":"Received amount from customer one - Refund Charge (As per Airline Policy)"
  //   },
  //   {
  //     "title":"text two",
  //     "description":"Received amount from customer two - Refund Charge (As per Airline Policy)"
  //   },
  //   {
  //     "title":"text three",
  //     "description":"Received amount from customer three - Refund Charge (As per Airline Policy)"
  //   },
  // ]

  const [text, setText] = useState();
  const getMarqueeText = async () => {
    const response = await axios.get(
      environment.marqueeList,
      environment.headerToken
    );
    setText(response.data.data);
  };
  console.log(text);
  const handleClick = (idx) => {
    setId(idx);
    navigate("/details");
  };
  useEffect(() => {
    getMarqueeText();
  }, []);
  return (
    <div>
      <div className="content-wrapper search-panel-bg">
        {/* Content Header (Page header)  */}
        {/* <Marquee
          className="my-auto"
          pauseOnHover
          gradient={false}
          style={{ backgroundColor: "#041339" }}
        >
          {text?.map((item, index) => {
            return (
              <p
                style={{ fontSize: "15pt", cursor: "pointer" }}
                className="text-white py-2 me-5"
                onClick={() => handleClick(index + 1)}
              >
                {item.title}
              </p>
            );
          })}
        </Marquee> */}
        {/* <marquee className="bg-danger my-auto">
          <p
            style={{ fontFamily: "Impact", fontSize: "15pt" }}
            className="text-white pt-2"
          >
            Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum
            dolor Lorem ipsum dolor Lorem ipsum dolor!
          </p>
        </marquee> */}

        <section className="content-header"></section>

        {/* Main content  */}
        <section className="content">
          {/* main section start  */}
          <div className="container mt-1">
            <div className="position-relative">
              <div
                className="row position-absolute top-0 start-50 translate-middle"
                id="travel-type-panel"
              >
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="bottom-border py-2 px-3" id="flight-panal">
                    <span className="text-white">
                      <i className="fas fa-plane"></i>
                    </span>
                    <span className="ms-2 fs-6 text-white fw-bold">
                      Flights
                    </span>
                  </div>
                  {/* <div
                    className="bottom-border me-4 p-2"
                    id="flight-panal"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="me-1 text-white">
                      <i className="fas fa-plane"></i>
                    </span>
                    <span className="ms-1 fs-4 text-white">Flights</span>
                  </div> */}
                  {/* <div
                    className="me-4 p-2"
                    id="hotel-panal"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="me-1 text-white">
                      <i className="fas fa-hotel"></i>
                    </span>
                    <span className="ms-1 fs-4 text-white">Hotels</span>
                  </div>
                  <div
                    className="me-4 p-2"
                    id="car-panal"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="me-1 text-white">
                      <i className="fas fa-car"></i>
                    </span>
                    <span className="ms-1 fs-4 text-white">Cars</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <SearchFrom state={state} flag={0}></SearchFrom> */}
          <SearchFrom></SearchFrom>
          <AddPanel></AddPanel>
        </section>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default SearchPanel;
