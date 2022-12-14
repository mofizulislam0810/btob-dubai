import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import logo from "../../../../images/logo/logo-combined.png";
import moment from "moment";
import Loading from "../../../Loading/Loading";
import ReactToPrint from "react-to-print";
import axios from "axios";
import { environment } from "../../../SharePages/Utility/environment";
import './SuccessTicketPanel.css';
import airports from "../../../../JSON/airports.json";

const SuccessTicketPanel = () => {
  const { ticketData, loading } = useAuth();
  let [isFareHide, setIsFareHide] = useState(false);
  let [agentInfo, setAgentInfo] = useState([]);
  const componentRef = useRef();
  const print = () => {
    window.print();
  };

  const getAgentInfo = async () => {
    const response = await axios.get(environment.agentInfo, environment.headerToken);
    console.log(response);
    setAgentInfo(response.data);
  }

  console.log(agentInfo);

  useEffect(() => {
    getAgentInfo();
  }, [])
  console.log(ticketData);
  // const currency = JSON.parse(localStorage.getItem("currency"));
  const ImageUrlD = `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketData.item1?.flightInfo?.directions[0][0].platingCarrierCode}.png`;
  const ImageUrlR =
    ticketData.item1?.flightInfo?.directions.length === 2
      ? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketData.item1?.flightInfo?.directions[1][0].platingCarrierCode}.png`
      : ``;
  return (
    <div>
      <Loading loading={loading}></Loading>
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <section className="content">
          <div className="container mt-3">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="fw-bold text-center bg-white text-dark p-2">
                  Ticket Successfully
                </h4>
              </div>
            </div>
          </div>

          <div className="container mt-3 py-2 pb-5">
            <div id="ui-view" data-select2-id="ui-view">
              <div>
                <div className="card box-shadow">
                  <div className="card-header">
                    <input
                      className="ms-3"
                      type={"checkbox"}
                      onChange={(e) => {
                        setIsFareHide(e.target.checked);
                      }}
                    />{" "}
                    Hide Fare Information
                    <ReactToPrint
                      trigger={() => (
                        <button className="btn btn-sm btn-secondary float-right mr-1 d-print-none rounded">
                          <span className="me-1">
                            <i className="fa fa-print"></i>
                          </span>
                          Print
                        </button>
                      )}
                      content={() => componentRef.current}
                    />
                  </div>
                  <div className="card-body py-5" ref={componentRef}>

                    <h4 className="text-center pb-2">E-Ticket</h4>

                    <table class="table table-borderless table-sm">
                      <tbody>
                        <tr>
                          <td className="text-start bg-white">
                            {agentInfo.logoName !== undefined ? (
                              <>
                                {agentInfo.logoName !== null &&
                                  agentInfo.logoName !== "" ? (
                                  <img
                                    alt="img01"
                                    src={
                                      environment.baseApiURL +
                                      `agentinfo/GetLogo/${agentInfo.logoName}`
                                    }
                                    style={{ width: "150px", height: "50px" }}
                                  ></img>
                                ) : (
                                  <>
                                    <img
                                      alt="img02"
                                      className="p-2"
                                      src={logo}
                                      style={{ width: "150px", height: "50px" }}
                                    ></img>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <img
                                  alt="img02"
                                  className="p-2"
                                  src={logo}
                                  style={{ width: "250px" }}
                                ></img>

                              </>
                            )}
                          </td>
                          <td className="text-end bg-white">
                            <address>
                              <span className="fw-bold fs-6">
                                {agentInfo.name}
                              </span>
                              <br />
                              <div
                                className="mt-2"
                                style={{ fontSize: "10px", lineHeight: "12px" }}
                              >
                                {agentInfo.address}
                                <br />
                                Phone: {agentInfo.mobileNo}<br></br>
                                Email: {agentInfo.email}
                              </div>
                            </address>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table class="table table-borderless my-3 table-sm" style={{ fontSize: "10px" }}>
                      <tbody>
                        <tr>
                          <td className="text-start bg-white" style={{ width: "10%" }}>
                            Booking Reference :&nbsp;
                            <span className="fw-bold fs-6"> {ticketData.item1?.pnr}</span>
                          </td>
                          <td className="text-end bg-white" style={{ width: "10%" }}>
                            Issue Date :
                            <span className="fw-bold">{moment().format("DD-MMMM-yyyy ddd")}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="d-flex gap-3 justify-content-between">
                      <div className="">
                        <table
                          class="table table-bordered table-sm"
                          style={{ fontSize: "10px", width: "35rem" }}
                        >
                          <thead>
                            <tr className="text-start">
                              <th>PASSENGER NAME</th>
                              <th
                                className="text-center"
                                style={{ width: "10%" }}
                              >
                                TYPE
                              </th>
                              <th style={{ width: "20%" }}>TICKET NUMBER</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ticketData.item1?.ticketInfoes.map((item, index) => {
                              return (
                                <tr className="text-start">
                                  <td>
                                    {item.passengerInfo.nameElement.title}{" "}
                                    {item.passengerInfo.nameElement.firstName}{" "}
                                    {item.passengerInfo.nameElement.lastName}
                                  </td>
                                  <td
                                    className="text-center"
                                    style={{ width: "10%" }}
                                  >
                                    {item.passengerInfo.passengerType}
                                  </td>
                                  <td style={{ width: "20%" }}>
                                    {item.ticketNumbers[0]}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="">
                        <table
                          class="table table-bordered table-sm float-right"
                          style={{ fontSize: "10px", width: "20rem" }}
                        >
                          <tbody className="text-start">
                            <tr>
                              <td className="fw-bold">BOOKING ID</td>
                              <td>{ticketData.item1?.uniqueTransID}</td>
                            </tr>
                            {/* <tr>
                            <td className="fw-bold">FLIGHT TYPE</td>
                            <td>International</td>
                          </tr> */}
                            <tr>
                              <td className="fw-bold">JOURNEY TYPE</td>
                              <td>{ticketData.item1?.flightInfo.directions[0] !==undefined && ticketData.item1?.flightInfo.directions[1] !==undefined ? "Return" : "Oneway"}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">STATUS</td>
                              <td>Ticketed</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>


                    <div className="table-responsive-sm mt-2">
                      <p className="bg-secondary ps-1 py-2 fw-bold text-start text-white"
                        style={{ fontSize: "10px" }}>FLIGHT DETAILS</p>
                      {ticketData.item1?.flightInfo.directions.length > 2 ? (
                        <>
                        </>
                      ) : (
                        <>
                          <table class="table table-borderless table-sm"
                            style={{ fontSize: "10px", lineHeight: "1px" }}>
                            {ticketData.item1?.flightInfo.directions[0][0].segments.map(
                              (item, index) => (
                                <tbody>
                                  <tr>
                                    <td
                                      className="fw-bold text-start d-flex bg-white align-items-center"
                                      style={{ paddingTop: "8px" }}
                                      colSpan={1}
                                    >
                                      <img
                                        src={ImageUrlD}
                                        className=""
                                        alt=""
                                        width="40px"
                                        height="40px"
                                      />

                                      <div>
                                        <h6 className="ms-2 h6-line-height" style={{ fontSize: "15px" }}>{item.airline}</h6>
                                        <h6
                                          className="ms-2 pt-2 h6-line-height"
                                          style={{
                                            fontSize: "12px",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          ({item.plane[0]})
                                        </h6>
                                      </div>
                                    </td>

                                    <td className="bg-white align-middle"
                                      style={{ lineHeight: "13px", paddingTop: "8px" }}>
                                      <tr>
                                        <td
                                          className="text-start bg-white p-0"
                                          style={{ fontSize: "11px", width: "6rem" }}
                                        >
                                          DEPARTS{" "}
                                        </td>
                                        <td className="text-start p-0">
                                          <span>
                                            {item.fromAirport},{" "}
                                            {airports
                                              .filter((f) => f.iata === item.from)
                                              .map((item) => item.city)}
                                              {(item.details[0].originTerminal)}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white p-0"
                                          style={{ fontSize: "11px" }}
                                        >
                                          ARRIVES{" "}
                                        </td>
                                        <td className="text-start p-0">
                                          <sapn>
                                            {item.toAirport},{" "}
                                            {airports
                                              .filter((f) => f.iata === item.to)
                                              .map((item) => item.city)}
                                              {(item.details[0].destinationTerminal)}
                                          </sapn>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td
                                      className="text-start bg-white"
                                      colSpan={1}
                                    >
                                      <tr>
                                        <td style={{ width: "40%" }}>
                                          <h6 className="fw-bold" style={{ fontSize: "15px" }}>{item.from}</h6>
                                          <h6 style={{ fontSize: "12px" }}>
                                            {" "}
                                            {moment(item.departure).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(
                                              item.departure
                                            ).format("DD-MMMM-yyyy ddd")}
                                          </h6>
                                        </td>
                                        <td className="align-middle" style={{ width: "34%" }}>
                                          <i class="fas fa-circle"></i>
                                          --------------{" "}
                                          <i className="fas fa-plane"></i>
                                        </td>
                                        <td>
                                          <h6 className="fw-bold" style={{ fontSize: "15px" }}>{item.to}</h6>
                                          <h6 style={{ fontSize: "12px" }}>
                                            {moment(item.arrival).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.arrival).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                      </tr>
                                    </td>
                                    <td className="bg-white align-middle"
                                      style={{ lineHeight: "13px" }}>
                                      <tr>
                                        <td
                                          className="text-start fw-bold fs-6 bg-white p-0"
                                          style={{ width: "20%" }}
                                        >
                                          {
                                            ticketData.item1?.flightInfo.directions[0][0].platingCarrierCode
                                          }{" "}
                                          {item.flightNumber}
                                          <span className="">

                                            <span style={{ marginLeft: "43px" }}>
                                              {item.serviceClass === "Y"
                                                ? "ECONOMY" + "(" + item.bookingClass + ")"
                                                : item.serviceClass === "C"
                                                  ? "BUSINESS CLASS" + "(" + item.bookingClass + ")"
                                                  : item.serviceClass +"(" + item.bookingClass + ")"}
                                            </span>
                                          </span>
                                        </td>
                                      </tr>
                                      <tr
                                        className="text-start"
                                        style={{ fontSize: "11px" }}
                                      >
                                        <td className="text-start bg-white p-0">
                                          BAGGAGE
                                          <span className="ms-5">
                                            ADT-
                                            {item.baggage[0]?.amount +
                                              item.baggage[0]?.units}
                                            {ticketData.item1?.flightInfo.passengerCounts
                                              .cnn > 0 ? (
                                              <>
                                                , CHD-
                                                {item.baggage[0]?.amount +
                                                  item.baggage[0]?.units}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </span>{" "}
                                        </td>
                                      </tr>
                                      <tr
                                        className="text-start"
                                        style={{ fontSize: "11px" }}
                                      >
                                        <td className="bg-white p-0">
                                          AIRLINE PNR{" "}
                                          <span style={{ marginLeft: "31px" }}>
                                            {ticketData.item1?.pnr}
                                          </span>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            )}
                          </table>
                        </>
                      )}
                    </div>

                    {ticketData.item1?.flightInfo.directions[1] !==
                      undefined ? (
                      <>
                        <hr></hr>
                        <table class="table table-borderless table-sm"
                          style={{ fontSize: "10px", lineHeight: "1px" }}>
                          {ticketData.item1?.flightInfo.directions[1][0].segments.map(
                            (item, index) => (
                              <tbody>
                                <tr>
                                  <td
                                    className="fw-bold text-start d-flex bg-white align-items-center"
                                    style={{ paddingTop: "8px" }}
                                    colSpan={1}
                                  >
                                    <img
                                      src={ImageUrlD}
                                      className=""
                                      alt=""
                                      width="40px"
                                      height="40px"
                                    />

                                    <div>
                                      <h6 className="ms-2 h6-line-height" style={{ fontSize: "15px" }}>{item.airline}</h6>
                                      <h6
                                        className="ms-2 pt-2 h6-line-height"
                                        style={{
                                          fontSize: "12px",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        ({item.plane[0]})
                                      </h6>
                                    </div>
                                  </td>

                                  <td className="bg-white align-middle"
                                    style={{ lineHeight: "13px", paddingTop: "8px" }}>
                                    <tr>
                                      <td
                                        className="text-start bg-white p-0"
                                        style={{ fontSize: "11px", width: "6rem" }}
                                      >
                                        DEPARTS{" "}
                                      </td>
                                      <td className="text-start p-0">
                                        <span>
                                          {item.fromAirport},{" "}
                                          {airports
                                            .filter((f) => f.iata === item.from)
                                            .map((item) => item.city)}
                                            {(item.details[0].originTerminal)}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="text-start bg-white p-0"
                                        style={{ fontSize: "11px" }}
                                      >
                                        ARRIVES{" "}
                                      </td>
                                      <td className="text-start p-0">
                                        <sapn>
                                          {item.toAirport},{" "}
                                          {airports
                                            .filter((f) => f.iata === item.to)
                                            .map((item) => item.city)}
                                            {(item.details[0].destinationTerminal)}
                                        </sapn>
                                      </td>
                                    </tr>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    className="text-start bg-white"
                                    colSpan={1}
                                  >
                                    <tr>
                                      <td style={{ width: "40%" }}>
                                        <h6 className="fw-bold" style={{ fontSize: "15px" }}>{item.from}</h6>
                                        <h6 style={{ fontSize: "12px" }}>
                                          {" "}
                                          {moment(item.departure).format(
                                            "hh:mm A"
                                          )}
                                        </h6>
                                        <h6
                                          className="text-secondary"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {" "}
                                          {moment(
                                            item.departure
                                          ).format("DD-MMMM-yyyy ddd")}
                                        </h6>
                                      </td>
                                      <td className="align-middle" style={{ width: "34%" }}>
                                        <i class="fas fa-circle"></i>
                                        --------------{" "}
                                        <i className="fas fa-plane"></i>
                                      </td>
                                      <td>
                                        <h6 className="fw-bold" style={{ fontSize: "15px" }}>{item.to}</h6>
                                        <h6 style={{ fontSize: "12px" }}>
                                          {moment(item.arrival).format(
                                            "hh:mm A"
                                          )}
                                        </h6>
                                        <h6
                                          className="text-secondary"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {" "}
                                          {moment(item.arrival).format(
                                            "DD-MMMM-yyyy ddd"
                                          )}
                                        </h6>
                                      </td>
                                    </tr>
                                  </td>
                                  <td className="bg-white align-middle"
                                    style={{ lineHeight: "13px" }}>
                                    <tr>
                                      <td
                                        className="text-start fw-bold fs-6 bg-white p-0"
                                        style={{ width: "20%" }}
                                      >
                                        {
                                          ticketData.item1?.flightInfo.directions[1][0].platingCarrierCode
                                        }{" "}
                                        {item.flightNumber}
                                        <span className="">

                                          <span style={{ marginLeft: "43px" }}>
                                            {item.serviceClass === "Y"
                                              ? "ECONOMY" + "(" + item.bookingClass + ")"
                                              : item.serviceClass === "C"
                                                ? "BUSINESS CLASS" + "(" + item.bookingClass + ")"
                                                : item.serviceClass +"(" + item.bookingClass + ")"}
                                          </span>
                                        </span>
                                      </td>
                                    </tr>
                                    <tr
                                      className="text-start"
                                      style={{ fontSize: "11px" }}
                                    >
                                      <td className="text-start bg-white p-0">
                                        BAGGAGE
                                        <span className="ms-5">
                                          ADT-
                                          {item.baggage[0]?.amount +
                                            item.baggage[0]?.units}
                                          {ticketData.item1?.flightInfo.passengerCounts
                                            .cnn > 0 ? (
                                            <>
                                              , CHD-
                                              {item.baggage[0]?.amount +
                                                item.baggage[0]?.units}
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </span>{" "}
                                      </td>
                                    </tr>
                                    <tr
                                      className="text-start"
                                      style={{ fontSize: "11px" }}
                                    >
                                      <td className="bg-white p-0">
                                        AIRLINE PNR{" "}
                                        <span style={{ marginLeft: "31px" }}>
                                          {ticketData.item1?.pnr}
                                        </span>
                                      </td>
                                    </tr>
                                  </td>
                                </tr>
                              </tbody>
                            )
                          )}
                        </table>
                      </>
                    ) : (
                      <></>
                    )}

                    {isFareHide === false ? (
                      <>
                        <div className="table-responsive-sm mt-2">
                          <p className="bg-secondary ps-1 py-2 fw-bold text-start text-white"
                            style={{ fontSize: "10px", marginBottom: "8px" }}>FARE DETAILS</p>

                          <table class="table table-bordered table-sm text-end"
                            style={{ fontSize: "10px" }}>
                            <thead>
                              <tr>
                                <th className="text-start">Type</th>
                                <th>Base Price</th>
                                <th>Tax</th>
                                <th>Discount</th>
                                <th>Pax</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ticketData.item1?.flightInfo.passengerFares
                                .adt !== null ? (
                                <>
                                  <tr>
                                    <td className="text-start">Adult</td>
                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerFares.adt.basePrice
                                      }
                                    </td>

                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerFares.adt.taxes
                                      }
                                    </td>
                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerFares.adt.discountPrice
                                      }
                                    </td>
                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerCounts.adt
                                      }
                                    </td>
                                    <td className="fw-bold">
                                      AED  {" "}
                                      {ticketData.item1?.flightInfo
                                        .passengerFares.adt.totalPrice *
                                        ticketData.item1?.flightInfo
                                          .passengerCounts.adt}
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <></>
                              )}
                              {ticketData.item1?.flightInfo.passengerFares
                                .cnn !== null ? (
                                <>
                                  <tr>
                                    <td className="text-start">Child</td>
                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerFares.cnn.basePrice
                                      }
                                    </td>

                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerFares.cnn.taxes
                                      }
                                    </td>
                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerFares.cnn.discountPrice
                                      }
                                    </td>
                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerCounts.cnn
                                      }
                                    </td>
                                    <td className="fw-bold">
                                      AED  {" "}
                                      {ticketData.item1?.flightInfo
                                        .passengerFares.cnn.totalPrice *
                                        ticketData.item1?.flightInfo
                                          .passengerCounts.cnn}
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <></>
                              )}

                              {ticketData.item1?.flightInfo.passengerFares
                                .inf !== null ? (
                                <>
                                  <tr>
                                    <td className="text-start">Infant</td>
                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerFares.inf.basePrice
                                      }
                                    </td>

                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerFares.inf.taxes
                                      }
                                    </td>
                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerFares.inf.discountPrice
                                      }
                                    </td>
                                    <td>
                                      {
                                        ticketData.item1?.flightInfo
                                          .passengerCounts.inf
                                      }
                                    </td>
                                    <td className="fw-bold">
                                      AED  {" "}
                                      {ticketData.item1?.flightInfo
                                        .passengerFares.inf.totalPrice *
                                        ticketData.item1?.flightInfo
                                          .passengerCounts.inf}
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <></>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="mt-2 pb-5">
                      <p className="bg-secondary ps-1 py-2 fw-bold text-start text-white"
                        style={{ fontSize: "10px", marginBottom: "8px" }}>
                        IMPORTANT NOTICE FOR TRAVELLERS
                      </p>
                      <p style={{ fontSize: "10px" }} className="text-start">
                        BAGGAGE DISCOUNTS MAY APPLY BASED ON FREQUENT FLYER
                        STATUS/ONLINE CHECKIN/FORM OF PAYMENT/MILITARY/ETC.
                        Carriage and other services provided by the carrier are
                        subject to conditions of carriage, which are hereby
                        incorporated by reference. These conditions may be
                        obtained from the issuing carrier. Passengers on a
                        journey involving an ultimate destination or a stop in a
                        country other than the country of departure are advised
                        that international treaties known as the Montreal
                        Convention, or its predecessor, the Warsaw Convention,
                        including its amendments (the Warsaw Convention System),
                        may apply to the entire journey, including any portion
                        thereof within a country.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SuccessTicketPanel;
