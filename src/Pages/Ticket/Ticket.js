import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../SharePages/Footer/Footer";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import "./Ticket.css";
import axios from "axios";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import { useLocation } from "react-router-dom";
import produce from "immer";
import tllLogo from "../../../src/images/logo/logo-combined.png";
import ReactToPrint from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import airports from "../../JSON/airports.json";



const Ticket = () => {
  let [ticketingList, setTicketingList] = useState([]);
  let [passengerList, setPassengerList] = useState([]);
  let [basePrice, setBasePrice] = useState(0);
  let [tax, setTax] = useState(0);
  let [ait, setAIT] = useState(0);
  let [discount, setDiscount] = useState(0);
  let [additionalPrice, setAdditionalPrice] = useState(0);
  let [totalPrice, setTotalPrice] = useState(0);
  let [passengerListEdited, setPassengerListEdited] = useState([]);
  let [totalPriceEdited, setTotalPriceEdited] = useState(0);
  let [agentInfo, setAgentInfo] = useState([]);
  const componentRef = useRef();
  const getAgentInfo = async () => {
    const response = await axios.get(
      environment.agentInfo,
      environment.headerToken
    );
    console.log(response);
    setAgentInfo(response.data);
  };
  const location = useLocation();
  const handleGetList = () => {
    const getTicketingList = async () => {
      let sendObj = { uniqueTransID: location.search.split("=")[1] };
      const response = await axios.post(
        environment.getTicketingList,
        sendObj,
        environment.headerToken
      );
      setTicketingList(response.data.data);
      console.log(response.data.data);
        handleGetPassengerList(
        response.data.data[0].passengerIds,
        response.data.data[0].uniqueTransID
      );
      setBasePrice(response.data[0].basePrice);
      setTax(response.data[0].tax);
      setAIT(Number(response.data[0].basePrice) * 0.003);
      setTotalPrice(response.data[0].ticketingPrice);
      setDiscount(response.data[0].discount);
      setAdditionalPrice(response.data[0].agentAdditionalPrice);
    };
    getTicketingList();
  };
  const handleSubmit = () => {
    console.log(passengerListEdited);
    const postPassengerList = async () => {
      const response = await axios.post(
        environment.updateBookingFareBreakdown,
        passengerListEdited,
        environment.headerToken
      );
      if (response.data > 0) {
        toast.success("Thanks! data updated successfully..");
        handleGetList();
      }
      else{
        toast.error("Sorry! Data not updated..");
      }
    };
    postPassengerList();
  };
  const handleGetPassengerList = (ids, trid) => {
    const getPassengerList = async () => {
      const response = await axios.get(
        environment.passengerListByIds + "/" + ids + "/" + trid,
        environment.headerToken
      );
      passengerList = response.data;
      setPassengerList(response.data);
      let totalPriceTemp = 0;
      response.data.map((item, index) => {
        totalPriceTemp +=
          item.totalPriceEdited > 0 ? item.totalPriceEdited : item.totalPrice;
      });
      setTotalPrice(totalPriceTemp);
      setPassengerListEdited(response.data);
      console.log(response.data);
    };
    getPassengerList();
  };
  useEffect(() => {
    handleGetList();
    getAgentInfo();
  }, []);
  let [isFareHide, setIsFareHide] = useState(false);
  const print = () => {
    window.print();
  };

  console.log(ticketingList);
  console.log(passengerList);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <ToastContainer />
        <section className="content">
          <div className="container mt-3">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="fw-bold text-center bg-white text-dark p-2">
                  Ticket
                </h4>
                {/* <a className='btn btn-warning' href='/queues'>Back to List</a> */}
              </div>
            </div>
          </div>
          <div className="container mt-3 py-2">
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
                    Hide Fare
                    <ul id="menu-standard">
                      <li id="menu-item">
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
                      </li>
                      <li id="menu-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-sm btn-secondary float-right mr-1 d-print-none"
                          data-bs-toggle="modal"
                          data-bs-target="#priceModal"
                        >
                          Edit Price
                        </a>
                      </li>
                      <li id="menu-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-sm btn-secondary float-right mr-1 d-print-none"
                        >
                          Download
                        </a>
                      </li>
                    </ul>
                    {/* <span className="ms-3">
                  PNR : {ticketingList.length > 0 ? ticketingList[0]?.pnr : ""}
                  <strong> </strong>
                </span>
                <input
                  className="ms-3"
                  type={"checkbox"}
                  onChange={(e) => {
                    setIsFareHide(e.target.checked);
                  }}
                />{" "}
                Hide Fare Information */}
                  </div>
                  <div className="card-body" ref={componentRef}>

                  <table class="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td className="text-start bg-white">
                        {ticketingList.length > 0 ? (
                              <>
                                {ticketingList[0].agentLogo !== null &&
                                ticketingList[0].agentLogo !== "" ? (
                                  <img
                                    alt="img01"
                                    src={
                                      environment.baseApiURL +
                                      `agentinfo/GetLogo/${ticketingList[0].agentLogo}`
                                    }
                                    style={{ width: "150px", height: "50px" }}
                                  ></img>
                                ) : (
                                  <>
                                    <img
                                      alt="img01"
                                      className="p-2"
                                      src={tllLogo}
                                      style={{ width: "150px", height: "50px" }}
                                    ></img>
                                  </>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                        </td>
                        <td className="text-end bg-white">
                          <address>
                            <span className="fw-bold fs-6">
                              {agentInfo.name} Travel Agrncy
                            </span>
                            <br />
                            <div
                              className="mt-2"
                              style={{ fontSize: "10px", lineHeight: "12px" }}
                            >
                              {agentInfo.address}
                              <br />
                              {agentInfo.mobileNo}<br></br>
                              Email: support@triplover.ae
                            </div>
                          </address>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table
                    class="table table-borderless my-1 table-sm"
                    style={{ fontSize: "10px" }}
                  >
                    <tbody>
                      <tr>
                        <td
                          className="text-start bg-white"
                          style={{ width: "10%" }}
                        >
                          Booking Reference :{" "}
                          <span className="fw-bold fs-6">
                            {ticketingList[0]?.pnr}
                          </span>
                        </td>
                        <td
                          className="text-end bg-white"
                          style={{ width: "10%" }}
                        >
                          Issue Date :{" "}
                          <span className="fw-bold">{moment(ticketingList[0]?.issueDate).format("DD-MMMM-yyyy ddd")}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>


                  <div className="d-flex gap-3 justify-content-between">
                    <div className="">
                      <table
                        class="table table-bordered table-sm"
                        style={{ fontSize: "10px",width:"35rem" }}
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
                          {passengerList.map((item, index) => {
                            return (
                              <tr className="text-start">
                                <td>
                                  {item.title}{" "}
                                  {item.first}{" "}
                                  {item.last}
                                </td>
                                <td
                                  className="text-center"
                                  style={{ width: "10%" }}
                                >
                                  {item.passengerType}
                                </td>
                                <td style={{ width: "20%" }}>
                                  {item.ticketNumbers}
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
                            <td className="fw-bold">TLL REFERENCE</td>
                            <td>{ticketingList[0]?.uniqueTransID}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">FLIGHT TYPE</td>
                            <td>International</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">JOURNEY TYPE</td>
                            <td>{ticketingList[0]?.journeyType}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">STATUS</td>
                            <td>{ticketingList[0]?.status}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>


                  <div className="table-responsive-sm mt-2">
                    <p
                      className="bg-secondary p-1 fw-bold text-start text-white"
                      style={{ fontSize: "10px" }}
                    >
                      FLIGHT DETAILS
                    </p>
                    <table
                      class="table table-borderless table-sm"
                      style={{ fontSize: "10px"}}
                    >
                      {ticketingList.length > 0 ? (
                          <tbody>
                            <tr>
                              <td
                                className="fw-bold text-start d-flex bg-white align-items-center"
                                style={{ paddingTop: "2px" }}
                                colSpan={1}
                              >
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList[0].airlineCode}.png`}
                                  className=""
                                  alt=""
                                  width="40px"
                                  height="40px"
                                />
                                <div>
                                  <h6 className="ms-2" style={{ fontSize: "12px" }}>{ticketingList[0].airlineName}</h6>
                                  {/* <h6
                                    className="ms-2 pt-1"
                                    style={{ fontSize: "12px" }}
                                  >
                                    ({item.plane[0]})
                                  </h6> */}
                                </div>
                              </td>
                              <td className="ps-1 bg-white">
                                <tr>
                                  <td
                                    className="text-start bg-white"
                                    style={{ fontSize: "11px" }}
                                  >
                                    DEPARTS{" "}
                                    <span className="ms-5">
                                    {ticketingList[0].origin},{" "}
                                      {airports
                                        .filter((f) => f.iata === ticketingList[0].origin)
                                        .map((item) => item.city)}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="text-start bg-white"
                                    style={{ fontSize: "11px" }}
                                  >
                                    ARRIVES{" "}
                                    <sapn className="ms-5">
                                    {ticketingList[0].destination},
                                      {airports
                                        .filter((f) => f.iata === ticketingList[0].destination)
                                        .map((item) => item.city)}
                                    </sapn>
                                  </td>
                                </tr>
                              </td>
                            </tr>

                            <tr>
                              <td
                                className="text-start bg-white"
                                style={{ paddingTop: "2px" }}
                                colSpan={1}
                              >
                                <tr>
                                  <td className="" style={{ fontSize: "18px" }}>
                                    <h4 className="fw-bold">{ticketingList[0].origin}</h4>
                                    <h6>
                                      {" "}
                                      {moment(ticketingList[0].departure).format(
                                      "hh:mm:ss"
                                    )}
                                    </h6>
                                    <h6
                                      className="text-secondary"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {" "}
                                      {moment(
                                        ticketingList[0].departure
                                      ).format("DD-MMMM-yyyy ddd")}
                                    </h6>
                                  </td>
                                  <td className="align-middle mx-auto">
                                    <i class="fas fa-circle fa-xs"></i>
                                    --------------{" "}
                                    <i className="fas fa-plane fa-sm"></i>
                                  </td>
                                  <td className="" style={{ fontSize: "18px" }}>
                                    <h6 className="fw-bold">{ticketingList[0].destination}</h6>
                                    <h6>
                                    {moment(ticketingList[0].arrival).format(
                                      "hh:mm:ss"
                                    )}
                                    </h6>
                                    <h6
                                      className="text-secondary"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {" "}
                                      {moment(ticketingList[0].arrival).format(
                                        "DD-MMMM-yyyy ddd"
                                      )}
                                    </h6>
                                  </td>
                                </tr>
                              </td>
                              <td className="bg-white">
                                <tr>
                                  <td
                                    className="text-start bg-white"
                                    style={{ fontSize: "12px" }}
                                  >
                                    <span className="fw-bold fs-6">
                                      BS-101
                                      <span style={{ marginLeft: "45px" }}>
                                       ECONOMY   
                                      </span>
                                    </span>
                                  </td>
                                </tr>
                                <tr
                                  className="text-start"
                                  style={{ fontSize: "11px" }}
                                >
                                  <td className="text-start bg-white">
                                    BAGGAGE
                                    <span className="ms-5">
                                      ADT25K, CHD-25K, INF-10K
                                    </span>{" "}
                                  </td>
                                </tr>
                                <tr
                                  className="text-start"
                                  style={{ fontSize: "11px" }}
                                >
                                  <td className="bg-white">
                                    AIRLINE PNR{" "}
                                    <span style={{ marginLeft: "30px" }}>
                                      {ticketingList[0]?.pnr}
                                    </span>
                                  </td>
                                </tr>
                              </td>
                            </tr>
                          </tbody>
                        ) :(<></>)
                      }
                    </table>
                  </div>
                  
                  {isFareHide === false ? (
                  <div className="table-responsive-sm mt-2">
                    <p
                      className="bg-secondary  p-1 fw-bold text-start text-white"
                      style={{ fontSize: "10px" }}
                    >
                      FARE DETAILS
                    </p>

                    <table
                      class="table table-bordered table-sm text-end"
                      style={{ fontSize: "10px" }}
                    >
                      <thead>
                        <tr>
                          <th className="text-start">Type</th>
                          <th>Base Fare</th>
                          <th>Tax</th>
                          <th>AIT</th>
                          <th>Discount</th>
                          <th>Person</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                      {passengerList.map((item, index) => (
                                <>
                                  {item.passengerType === "ADT" ? (
                                    <>
                                      <tr>
                                        <td className="text-start">Adult</td>
                                        <td>{item.basePrice}</td>
                                        <td>{item.tax}</td>

                                        <td>{item.ait}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.passengerCount}</td>
                                        <td className="fw-bold">
                                          {item.currencyName}{" "}
                                          {item.totalPrice *
                                            item.passengerCount}
                                        </td>
                                      </tr>
                                    </>
                                  ) : item.passengerType === "CNN" ? (
                                    <>
                                      <tr>
                                        <td className="text-start">Child</td>
                                        <td>{item.basePrice}</td>
                                        <td>{item.tax}</td>

                                        <td>{item.ait}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.passengerCount}</td>
                                        <td className="fw-bold">
                                        {item.currencyName}{" "}
                                          {item.totalPrice *
                                            item.passengerCount}
                                        </td>
                                      </tr>
                                    </>
                                  ) : item.passengerType === "INF" ? (
                                    <>
                                      <tr>
                                        <td className="text-start">Infant</td>
                                        <td>{item.basePrice}</td>
                                        <td>{item.tax}</td>

                                        <td>{item.ait}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.passengerCount}</td>
                                        <td className="fw-bold">
                                        {item.currencyName}{" "}
                                          {item.totalPrice *
                                            item.passengerCount}
                                        </td>
                                      </tr>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ))}
                      </tbody>
                    </table>
                  </div> ) : (
                    <></>
                  )}



                    {/* {isFareHide === false ? (
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
                                <th>Agent Additional Price</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {passengerList.map((item, index) => (
                                <>
                                  {item.passengerType === "ADT" ? (
                                    <>
                                      <tr>
                                        <td>Adult</td>
                                        <td>{item.basePrice}</td>
                                        <td>{item.tax}</td>

                                        <td>{item.ait}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.passengerCount}</td>
                                        <td>{item.agentAdditionalPrice}</td>
                                        <td className="fw-bold">
                                          {item.currencyName}{" "}
                                          {item.totalPrice *
                                            item.passengerCount}
                                        </td>
                                      </tr>
                                    </>
                                  ) : item.passengerType === "CNN" ? (
                                    <>
                                      <tr>
                                        <td>Child</td>
                                        <td>{item.basePrice}</td>
                                        <td>{item.tax}</td>

                                        <td>{item.ait}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.passengerCount}</td>
                                        <td>{item.agentAdditionalPrice}</td>
                                        <td className="fw-bold">
                                        {item.currencyName}{" "}
                                          {item.totalPrice *
                                            item.passengerCount}
                                        </td>
                                      </tr>
                                    </>
                                  ) : item.passengerType === "INF" ? (
                                    <>
                                      <tr>
                                        <td>Infant</td>
                                        <td>{item.basePrice}</td>
                                        <td>{item.tax}</td>

                                        <td>{item.ait}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.passengerCount}</td>
                                        <td>{item.agentAdditionalPrice}</td>
                                        <td className="fw-bold">
                                        {item.currencyName}{" "}
                                          {item.totalPrice *
                                            item.passengerCount}
                                        </td>
                                      </tr>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <></>
                    )} */}

                  <div className="mt-2">
                    <p
                      className="bg-secondary p-1 fw-bold text-start text-white"
                      style={{ fontSize: "10px" }}
                    >
                      IMPORTANT NOTICE FOR TRAVELLERS
                    </p>
                    <p style={{ fontSize: "10px" }} className="text-start">
                      BAGGAGE DISCOUNTS MAY APPLY BASED ON FREQUENT FLYER
                      STATUS/ONLINE CHECKIN/FORM OF PAYMENT/MILITARY/ETC.
                      Carriage and other services provided by the carrier are
                      subject to conditions of carriage, which are hereby
                      incorporated by reference. These conditions may be
                      obtained from the issuing carrier. Passengers on a journey
                      involving an ultimate destination or a stop in a country
                      other than the country of departure are advised that
                      international treaties known as the Montreal Convention,
                      or its predecessor, the Warsaw Convention, including its
                      amendments (the Warsaw Convention System), may apply to
                      the entire journey, including any portion thereof within a
                      country.
                    </p>
                  </div>
                  </div>
                  <div className="card-body">
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="priceModal"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="modal-dialog" style={{minWidth:"1200px"}}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Price</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <table className="table table-bordered table-hover">
                    <thead style={{ background: "gray", color: "white" }}>
                      <tr>
                        <th>Ticket No</th>
                        <th>Pax Name</th>
                        <th>Base Fare</th>
                        <th>Tax</th>
                        <th>AIT</th>
                        <th>Discount</th>
                        <th>Additional Price</th>
                        <th>Total Fare</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passengerListEdited.map((item, index) => {
                        return (
                          <>
                            <tr>
                              <td>{item.ticketNumbers}</td>
                              <td>
                                {item.title +
                                  " " +
                                  item.first +
                                  " " +
                                  item.middle +
                                  " " +
                                  item.last}
                              </td>
                              <td>
                                <input
                                  value={item.basePrice}
                                  type={"number"}
                                  onChange={(e) =>
                                    setPassengerListEdited((ob) =>
                                      produce(ob, (v) => {
                                        v[index].basePrice = Number(
                                          e.target.value
                                        );
                                      })
                                    )
                                  }
                                  className="form-control"
                                />
                              </td>
                              <td>
                                <input
                                  value={item.tax}
                                  type={"number"}
                                  onChange={(e) =>
                                    setPassengerListEdited((ob) =>
                                      produce(ob, (v) => {
                                        v[index].tax = Number(e.target.value);
                                      })
                                    )
                                  }
                                  className="form-control"
                                />
                              </td>
                              <td>
                                <label
                                  className="form-control"
                                  style={{ background: "#F2F3F4" }}
                                >
                                  {item.ait}
                                </label>
                              </td>
                              <td>
                                <input
                                  value={item.discount}
                                  type={"number"}
                                  onChange={(e) =>
                                    setPassengerListEdited((ob) =>
                                      produce(ob, (v) => {
                                        v[index].discount = Number(
                                          e.target.value
                                        );
                                      })
                                    )
                                  }
                                  className="form-control"
                                />
                              </td>
                              <td>
                                <input
                                  value={item.agentAdditionalPrice}
                                  type={"number"}
                                  onChange={(e) =>
                                    setPassengerListEdited((ob) =>
                                      produce(ob, (v) => {
                                        v[index].agentAdditionalPrice = Number(
                                          e.target.value
                                        );
                                      })
                                    )
                                  }
                                  className="form-control"
                                />
                              </td>
                              <td className="text-end">
                                {item.basePrice +
                                  item.tax +
                                  item.ait +
                                  item.discount}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                      <tr>
                        <td colSpan={11} style={{ textAlign: "right" }}>
                          Total:{" "}
                          {passengerListEdited.map((item, index) => {
                            totalPriceEdited +=
                              item.basePrice +
                              item.tax +
                              item.ait +
                              item.discount;
                            return index === passengerListEdited.length - 1
                              ? totalPriceEdited
                              : "";
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary rounded"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn button-color fw-bold text-white rounded"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
};

export default Ticket;
