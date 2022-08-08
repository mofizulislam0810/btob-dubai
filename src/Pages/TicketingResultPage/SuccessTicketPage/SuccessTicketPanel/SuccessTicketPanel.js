import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import logo from "../../../../images/logo/logo-combined.png";
import moment from "moment";
import Loading from "../../../Loading/Loading";
import ReactToPrint from "react-to-print";
import axios from "axios";
import { environment } from "../../../SharePages/Utility/environment";
import './SuccessTicketPanel.css'

const SuccessTicketPanel = () => {
  const { ticketData, loading } = useAuth();
  let [isFareHide, setIsFareHide] = useState(false);
  let [agentInfo,setAgentInfo] = useState([]);
  const componentRef = useRef();
  const print = () => {
    window.print();
  };

  const getAgentInfo = async() =>{
    const response = await axios.get(environment.agentInfo,environment.headerToken);
    console.log(response);
    setAgentInfo(response.data);
  }

console.log(agentInfo);

useEffect(()=>{
  getAgentInfo();
},[])
  console.log(ticketData);
  // const filterParam = JSON.parse(localStorage.getItem("Database"));
  // const flightType = filterParam.flightType;
  // const direction0 = JSON.parse(localStorage.getItem("direction0"));
  // const direction1 = JSON.parse(localStorage.getItem("direction1"));
  // const direction2 = JSON.parse(localStorage.getItem("direction2"));
  // const direction3 = JSON.parse(localStorage.getItem("direction3"));
  // const direction4 = JSON.parse(localStorage.getItem("direction4"));
  // const direction5 = JSON.parse(localStorage.getItem("direction5"));
  const currency = JSON.parse(localStorage.getItem("currency"));
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
                    {/* <img
                      src={logo}
                      alt="Triplover logo"
                      style={{ width: "100px" }}
                    />
                    <span className="ms-3">
                      Ticketing pnr :&nbsp;
                      <strong> {ticketData.item1?.pnr}</strong>
                    </span> */}
                    <ReactToPrint
                      trigger={() => (
                        <button className="btn btn-sm btn-secondary float-right mr-1 d-print-none">
                          <span className="me-1">
                            <i className="fa fa-print"></i>
                          </span>
                          Print
                        </button>
                      )}
                      content={() => componentRef.current}
                    />
                    {/* <Link
                      className="btn btn-sm btn-secondary float-right mr-1 d-print-none"
                      to="#"
                      onClick={print}
                      data-abc="true"
                    >
                      <i className="fa fa-print"></i> Print
                    </Link> */}
                  </div>
                  <div className="card-body" ref={componentRef}>
                    <table class="table table-borderless mt-2 table-sm">
                      <tbody>
                        <tr>
                          <td className="text-start">
                            {agentInfo.logoName !==undefined ? (
                              <>
                                {agentInfo.logoName !== null &&
                                agentInfo.logoName !== "" ? (
                                  <img
                                    alt="img01"
                                    src={
                                      environment.baseApiURL +
                                      `agentinfo/GetLogo/${agentInfo.logoName}`
                                    }
                                    style={{ width: "250px",height:"100px"}}
                                  ></img>
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
                            {/* 
                            <img
                              src={logo}
                              alt="Triplover logo"
                              style={{ width: "250px" }}
                            /> */}
                          </td>
                          <td className="text-end">
                            <address>
                              {agentInfo.name} Travel Agrncy
                              <br />
                              {agentInfo.address}
                              <br />
                              {/* Baridhara Diplomatic Zone, Dhaka-1212, Bangladesh.
                              <br /> */}
                              +88{agentInfo.mobileNo}
                            </address>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table class="table table-borderless mb-2 table-sm lh-1">
                      <tbody>
                        <tr>
                          <td className="text-start">
                            Booking Reference :&nbsp;
                            <strong> {ticketData.item1?.pnr}</strong>
                          </td>
                          <td className="text-end fw-bold">
                            Issue Date : 03-Mar-2022
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="row mb-4">
                      <div className="col-lg-8">
                        <table class="table table-bordered my-2 mb-3 table-sm">
                          <thead>
                            <tr className="text-center">
                              <th>PASSENGER NAME</th>
                              <th>TYPE</th>
                              <th>TICKET NUMBER</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ticketData.item1?.ticketInfoes.map(
                              (item, index) => (
                                <tr key={index} className="text-center">
                                  <td>
                                    {item.passengerInfo.nameElement.title}{" "}
                                    {item.passengerInfo.nameElement.firstName}{" "}
                                    {item.passengerInfo.nameElement.lastName}
                                  </td>
                                  <td>{item.passengerInfo.passengerType}</td>
                                  <td>{item.ticketNumbers[0]}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="col-lg-4">
                        <table class="table table-bordered my-2 mb-3 table-sm">
                          <tbody>
                            <tr>
                              <td className="fw-bold">TLL REFERENCE</td>
                              <td>TLL-220101987654</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">FLIGHT TYPE</td>
                              <td>Internation</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">JOURNEY TYPE</td>
                              <td>Round way</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">STATUS</td>
                              <td>Confirm</td>
                            </tr>
                          </tbody>
                        </table>

                        {/* <h6 className="mb-3">TYPE</h6>
                        <div>
                          {ticketData.item1?.ticketInfoes.map((item, index) => (
                            <div key={index}>
                              <strong>
                                {item.passengerInfo.passengerType}
                              </strong>
                            </div>
                          ))}
                        </div> */}
                      </div>
                    </div>
                    <div className="table-responsive-sm">
                      <p className="bg-dark p-2">FLIGHT DETAILS</p>
                      {ticketData.item1?.flightInfo.directions.length > 2 ? (
                        <>
                          {/* <>
                        <div className="col-lg-1 my-auto me-3">
                          <img
                            src={ImageUrlD}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        </div>

                        <div className="col-lg-2 my-auto">
                          <span className="fw-bold">
                            {direction0.segments[0].departure.substr(11, 5)}
                          </span>
                          <p className="my-auto">{direction0.from}</p>
                        </div>
                        <div className="col-lg-6 my-auto">
                          <div className="row">
                            <div className="col-lg-12 text-center">
                              <span className="text-danger fw-bold font-size">
                                {direction0.stops === 0
                                  ? "Direct"
                                  : direction0.stops + " Stop(s)"}
                              </span>
                            </div>
                            <div className="col-lg-12">
                              <span className="text-success">
                                -----------------------------
                                <i className="fas fa-plane fa-sm"></i>
                              </span>
                            </div>
                            <div className="col-lg-12 text-center ms-4">
                              <span className="text-success me-5">
                                <i className="fas fa-clock fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {direction0.segments[0].duration[0]}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <span className="fw-bold">
                            {direction0.segments[
                              direction0.segments.length - 1
                            ].arrival.substr(11, 5)}
                          </span>
                          <p className="my-auto">{direction0.to}</p>
                        </div>
                      </>
                      <>
                        <div className="col-lg-1 my-auto me-3">
                          <img
                            src={ImageUrlD}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        </div>

                        <div className="col-lg-2 my-auto">
                          <span className="fw-bold">
                            {direction1.segments[0].departure.substr(11, 5)}
                          </span>
                          <p className="my-auto">{direction1.from}</p>
                        </div>
                        <div className="col-lg-6 my-auto">
                          <div className="row">
                            <div className="col-lg-12 text-center">
                              <span className="text-danger fw-bold font-size">
                                {direction1.stops === 0
                                  ? "Direct"
                                  : direction1.stops + " Stop"}
                              </span>
                            </div>
                            <div className="col-lg-12">
                              <span className="text-success">
                                -----------------------------
                                <i className="fas fa-plane fa-sm"></i>
                              </span>
                            </div>
                            <div className="col-lg-12 text-center ms-4">
                              <span className="text-success me-5">
                                <i className="fas fa-clock fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {direction1.segments[0].duration[0]}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <span className="fw-bold">
                            {direction1.segments[
                              direction1.segments.length - 1
                            ].arrival.substr(11, 5)}
                          </span>
                          <p className="my-auto">{direction1.to}</p>
                        </div>
                      </>
                      {direction2.segments !== undefined ? (
                        <>
                          <div className="col-lg-1 my-auto me-3">
                            <img
                              src={ImageUrlD}
                              alt=""
                              width="40px"
                              height="40px"
                            />
                          </div>

                          <div className="col-lg-2 my-auto">
                            <span className="fw-bold">
                              {direction2.segments[0].departure.substr(11, 5)}
                            </span>
                            <p className="my-auto">{direction2.from}</p>
                          </div>
                          <div className="col-lg-6 my-auto">
                            <div className="row">
                              <div className="col-lg-12 text-center">
                                <span className="text-danger fw-bold font-size">
                                  {direction2.stops === 0
                                    ? "Direct"
                                    : direction2.stops + " Stop"}
                                </span>
                              </div>
                              <div className="col-lg-12">
                                <span className="text-success">
                                  -----------------------------
                                  <i className="fas fa-plane fa-sm"></i>
                                </span>
                              </div>
                              <div className="col-lg-12 text-center ms-4">
                                <span className="text-success me-5">
                                  <i className="fas fa-clock fa-sm"></i>
                                  <span className="ms-1 font-size">
                                    {direction2.segments[0].duration[0]}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 my-auto">
                            <span className="fw-bold">
                              {direction2.segments[
                                direction2.segments.length - 1
                              ].arrival.substr(11, 5)}
                            </span>
                            <p className="my-auto">{direction2.to}</p>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {direction3.segments !== undefined ? (
                        <>
                          <div className="col-lg-1 my-auto me-3">
                            <img
                              src={ImageUrlD}
                              alt=""
                              width="40px"
                              height="40px"
                            />
                          </div>

                          <div className="col-lg-2 my-auto">
                            <span className="fw-bold">
                              {direction3.segments[0].departure.substr(11, 5)}
                            </span>
                            <p className="my-auto">{direction3.from}</p>
                          </div>
                          <div className="col-lg-6 my-auto">
                            <div className="row">
                              <div className="col-lg-12 text-center">
                                <span className="text-danger fw-bold font-size">
                                  {direction3.stops === 0
                                    ? "Direct"
                                    : direction3.stops + " Stop"}
                                </span>
                              </div>
                              <div className="col-lg-12">
                                <span className="text-success">
                                  -----------------------------
                                  <i className="fas fa-plane fa-sm"></i>
                                </span>
                              </div>
                              <div className="col-lg-12 text-center ms-4">
                                <span className="text-success me-5">
                                  <i className="fas fa-clock fa-sm"></i>
                                  <span className="ms-1 font-size">
                                    {direction3.segments[0].duration[0]}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 my-auto">
                            <span className="fw-bold">
                              {direction3.segments[
                                direction3.segments.length - 1
                              ].arrival.substr(11, 5)}
                            </span>
                            <p className="my-auto">{direction3.to}</p>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {direction4.segments !== undefined ? (
                        <>
                          <div className="col-lg-1 my-auto me-3">
                            <img
                              src={ImageUrlD}
                              alt=""
                              width="40px"
                              height="40px"
                            />
                          </div>

                          <div className="col-lg-2 my-auto">
                            <span className="fw-bold">
                              {direction4.segments[0].departure.substr(11, 5)}
                            </span>
                            <p className="my-auto">{direction4.from}</p>
                          </div>
                          <div className="col-lg-6 my-auto">
                            <div className="row">
                              <div className="col-lg-12 text-center">
                                <span className="text-danger fw-bold font-size">
                                  {direction4.stops === 0
                                    ? "Direct"
                                    : direction4.stops + " Stop"}
                                </span>
                              </div>
                              <div className="col-lg-12">
                                <span className="text-success">
                                  -----------------------------
                                  <i className="fas fa-plane fa-sm"></i>
                                </span>
                              </div>
                              <div className="col-lg-12 text-center ms-4">
                                <span className="text-success me-5">
                                  <i className="fas fa-clock fa-sm"></i>
                                  <span className="ms-1 font-size">
                                    {direction4.segments[0].duration[0]}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 my-auto">
                            <span className="fw-bold">
                              {direction4.segments[
                                direction4.segments.length - 1
                              ].arrival.substr(11, 5)}
                            </span>
                            <p className="my-auto">{direction4.to}</p>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {direction5.segments !== undefined ? (
                        <>
                          <div className="col-lg-1 my-auto me-3">
                            <img
                              src={ImageUrlD}
                              alt=""
                              width="40px"
                              height="40px"
                            />
                          </div>

                          <div className="col-lg-2 my-auto">
                            <span className="fw-bold">
                              {direction5.segments[0].departure.substr(11, 5)}
                            </span>
                            <p className="my-auto">{direction5.from}</p>
                          </div>
                          <div className="col-lg-6 my-auto">
                            <div className="row">
                              <div className="col-lg-12 text-center">
                                <span className="text-danger fw-bold font-size">
                                  {direction5.stops === 0
                                    ? "Direct"
                                    : direction5.stops + " Stop"}
                                </span>
                              </div>
                              <div className="col-lg-12">
                                <span className="text-success">
                                  -----------------------------
                                  <i className="fas fa-plane fa-sm"></i>
                                </span>
                              </div>
                              <div className="col-lg-12 text-center ms-4">
                                <span className="text-success me-5">
                                  <i className="fas fa-clock fa-sm"></i>
                                  <span className="ms-1 font-size">
                                    {direction5.segments[0].duration[0]}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 my-auto">
                            <span className="fw-bold">
                              {direction5.segments[
                                direction5.segments.length - 1
                              ].arrival.substr(11, 5)}
                            </span>
                            <p className="my-auto">{direction5.to}</p>
                          </div>
                        </>
                      ) : (
                        <></>
                      )} */}
                        </>
                      ) : (
                        <>
                          <table class="table table-borderless my-2 mb-3 table-sm lh-1">
                            {ticketData.item1?.flightInfo.directions[0][0].segments.map(
                              (item, index) => (
                                <tbody>
                                  <tr>
                                    <td
                                      className="fw-bold align-middle"
                                      colSpan={3}
                                    >
                                      <img
                                        src={ImageUrlD}
                                        className=""
                                        alt=""
                                        width="40px"
                                        height="40px"
                                      />
                                      <span className="ms-2">
                                        {item.airline}
                                      </span>
                                      <span
                                        className="ms-2"
                                        style={{ fontSize: "12px" }}
                                      >
                                        ({item.plane[0]})
                                      </span>
                                    </td>
                                    <td>
                                      <tr>
                                        <td>
                                          DEPARTS - {item.fromAirport} (
                                          {item.from})
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          ARRIVES - {item.toAirport} ({item.to})
                                        </td>
                                      </tr>
                                    </td>

                                    {/* <td>TLL-220101987654</td> */}
                                  </tr>

                                  <tr>
                                    <td className="fw-bold lh-1">
                                      <h5 className="fw-bold">{item.from}</h5>
                                      <h6>
                                        {" "}
                                        {moment(item.departure).format(
                                          "hh:mm:ss"
                                        )}
                                      </h6>
                                      <h6>
                                        <strong>
                                          {" "}
                                          {moment(item.departure).format(
                                            "DD-MMMM-yyyy ddd"
                                          )}
                                        </strong>
                                      </h6>
                                    </td>
                                    <td className="align-middle">
                                      {" "}
                                      <i class="fas fa-circle fa-xs"></i>
                                      ------------------{" "}
                                      <i className="fas fa-plane fa-sm"></i>
                                    </td>
                                    <td className="fw-bold">
                                      <h5 className="fw-bold">{item.to}</h5>
                                      <h6>
                                        {moment(item.arrival).format(
                                          "hh:mm:ss"
                                        )}
                                      </h6>
                                      <h6>
                                        <strong>
                                          {" "}
                                          {moment(item.arrival).format(
                                            "DD-MMMM-yyyy ddd"
                                          )}
                                        </strong>
                                      </h6>
                                    </td>
                                    <td className="align-middle">
                                      <tr>
                                        <td>BAGGAGE:</td>
                                        <td> ADT25K, CHD-25K, INF-10K</td>
                                      </tr>
                                      <tr>
                                        <td>AIRLINE PNR: </td>
                                        <td>{ticketData.item1?.pnr}</td>
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
                        <table class="table table-borderless my-2 mb-3 table-sm lh-1">
                          {ticketData.item1?.flightInfo.directions[1][0].segments.map(
                            (item, index) => (
                              <tbody>
                                <tr>
                                  <td
                                    className="fw-bold align-middle"
                                    colSpan={3}
                                  >
                                    <img
                                      src={ImageUrlR}
                                      className=""
                                      alt=""
                                      width="40px"
                                      height="40px"
                                    />
                                    <span className="ms-2">{item.airline}</span>
                                    <span
                                      className="ms-2"
                                      style={{ fontSize: "12px" }}
                                    >
                                      ({item.plane[0]})
                                    </span>
                                  </td>
                                  <td>
                                    <tr>
                                      <td>
                                        DEPARTS - {item.fromAirport} (
                                        {item.from})
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        ARRIVES - {item.toAirport} ({item.to})
                                      </td>
                                    </tr>
                                  </td>

                                  {/* <td>TLL-220101987654</td> */}
                                </tr>

                                <tr>
                                  <td className="fw-bold">
                                    <h5 className="fw-bold">{item.from}</h5>
                                    <h6>
                                      {" "}
                                      {moment(item.departure).format(
                                        "hh:mm:ss"
                                      )}
                                    </h6>
                                    <h6>
                                      <strong>
                                        {" "}
                                        {moment(item.departure).format(
                                          "DD-MMMM-yyyy ddd"
                                        )}
                                      </strong>
                                    </h6>
                                  </td>
                                  <td className="align-middle">
                                    {" "}
                                    <i class="fas fa-circle fa-xs"></i>
                                    ------------------{" "}
                                    <i className="fas fa-plane fa-sm"></i>
                                  </td>
                                  <td className="fw-bold">
                                    <h5 className="fw-bold">{item.to}</h5>
                                    <h6>
                                      {moment(item.arrival).format("hh:mm:ss")}
                                    </h6>
                                    <h6>
                                      <strong>
                                        {" "}
                                        {moment(item.arrival).format(
                                          "DD-MMMM-yyyy ddd"
                                        )}
                                      </strong>
                                    </h6>
                                  </td>
                                  <td className="align-middle">
                                    <tr>
                                      <td>BAGGAGE:</td>
                                      <td> ADT25K, CHD-25K, INF-10K</td>
                                    </tr>
                                    <tr>
                                      <td>AIRLINE PNR: </td>
                                      <td>{ticketData.item1?.pnr}</td>
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
                        <div className="table-responsive-sm">
                          <p className="bg-dark p-2">FARE DETAILS</p>

                          <table class="table table-bordered my-2 mb-3 table-sm lh-1 text-center">
                            <thead>
                              <tr>
                                <th>Type</th>
                                <th>Base Price</th>
                                <th>Tax</th>
                                <th>AIT</th>
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
                                    <td>Adult</td>
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
                                          .passengerFares.adt.ait
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
                                      {currency!==undefined ? currency : "BDT"}  {" "}
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
                                    <td>Child</td>
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
                                          .passengerFares.cnn.ait
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
                                      {currency!==undefined ? currency : "BDT"}  {" "}
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
                                    <td>Infant</td>
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
                                          .passengerFares.inf.ait
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
                                      {currency!==undefined ? currency : "BDT"}  {" "}
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

                    <div className="pb-3">
                      <p className="bg-dark p-2 ">
                        IMPORTANT NOTICE FOR TRAVELLERS
                      </p>
                      <p>
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
