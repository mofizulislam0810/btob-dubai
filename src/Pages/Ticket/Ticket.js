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
        toast.error("Thanks! data updated successfully..");
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
                    <table class="table table-borderless mt-2 table-sm">
                      <tbody>
                        <tr>
                          <td className="text-start">
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
                                    style={{ width: "200px", height: "80px" }}
                                  ></img>
                                ) : (
                                  <>
                                    <img
                                      alt="img01"
                                      className="p-2"
                                      src={tllLogo}
                                      style={{ width: "200px", height: "80px" }}
                                    ></img>
                                  </>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
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
                            {passengerList.map((item, index) => {
                              return (
                                <tr className="text-center">
                                  <td>
                                    {item.title +
                                      " " +
                                      item.first +
                                      " " +
                                      item.middle +
                                      " " +
                                      item.last}
                                  </td>
                                  <td>{item.passengerType}</td>
                                  <td>{item.ticketNumbers}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="col-lg-4">
                        <table class="table table-bordered my-2 mb-3 table-sm">
                          <tbody>
                            <tr>
                              <td className="fw-bold">TLL REFERENCE</td>
                              <td>{ticketingList[0]?.uniqueTransID}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">FLIGHT TYPE</td>
                              <td>{ticketingList[0]?.journeyType}</td>
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

                    <div className="table-responsive-sm">
                      <p className="bg-dark p-2">FLIGHT DETAILS</p>
                      {ticketingList.length > 0 ? (
                        <>
                          <table class="table table-borderless my-2 mb-3 table-sm lh-1">
                            <tbody>
                              <tr>
                                <td
                                  className="fw-bold align-middle"
                                  colSpan={3}
                                >
                                  <img
                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList[0].airlineCode}.png`}
                                    className=""
                                    alt=""
                                    width="40px"
                                    height="40px"
                                  />
                                  <span className="ms-2">
                                    {ticketingList[0].airlineName}
                                  </span>
                                  <span
                                    className="ms-2"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {/* ({item.plane[0]}) */}
                                  </span>
                                </td>
                                <td>
                                  <tr>
                                    <td>DEPARTS - {ticketingList[0].origin}</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      ARRIVES - {ticketingList[0].destination}
                                    </td>
                                  </tr>
                                </td>

                                {/* <td>TLL-220101987654</td> */}
                              </tr>

                              <tr>
                                <td className="fw-bold lh-1">
                                  <h5 className="fw-bold">
                                    {ticketingList[0].origin}{" "}
                                  </h5>
                                  <h6>
                                    {" "}
                                    {moment(ticketingList[0].departure).format(
                                      "hh:mm:ss"
                                    )}
                                  </h6>
                                  <h6>
                                    <strong>
                                      {" "}
                                      {moment(
                                        ticketingList[0].departure
                                      ).format("DD-MMMM-yyyy ddd")}
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
                                  <h5 className="fw-bold">
                                    {ticketingList[0].destination}
                                  </h5>
                                  <h6>
                                    {moment(ticketingList[0].arrival).format(
                                      "hh:mm:ss"
                                    )}
                                  </h6>
                                  <h6>
                                    <strong>
                                      {" "}
                                      {moment(ticketingList[0].arrival).format(
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
                                    <td>{ticketingList[0].pnr}</td>
                                  </tr>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

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
                    )}

                    {/* <div className="card-head">
                  <h4>Traveler</h4>
                </div>
                <table className="table table-bordered">
                  <thead style={{ background: "gray", color: "white" }}>
                    <tr>
                      <th>Passenger Name</th>
                      <th>Mobile No</th>
                      <th>Ticket Number</th>
                      <th>PNR</th>
                      <th>Issue Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passengerList.map((item, index) => {
                      return (
                        <tr>
                          <td>
                            {item.title +
                              " " +
                              item.first +
                              " " +
                              item.middle +
                              " " +
                              item.last}
                          </td>
                          <td>{item.phone}</td>
                          <td>{item.ticketNumbers}</td>
                          <td>
                            {ticketingList.length > 0
                              ? ticketingList[0]?.pnr
                              : ""}
                          </td>
                          <td>
                            {ticketingList.length > 0
                              ? moment(ticketingList[0].ticketingDate).format(
                                  "DD-MMMM-yyyy hh:mm:ss A"
                                )
                              : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table> */}

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

                  {/* <div className="card-body">
                <div className="card-head">
                  <h4>Travel Details</h4>
                </div>
                <table className="table table-bordered">
                  <thead style={{ background: "gray", color: "white" }}>
                    <tr>
                      <th>Flight</th>
                      <th>Departure</th>
                      <th>Arrival</th>
                      <th>Status</th>
                      <th>Class Type</th>
                      <th>Baggage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {ticketingList.length > 0 ? (
                        <>
                          <td>
                            {ticketingList[0].airlineName}
                            <br />(
                            {ticketingList[0].origin +
                              "-" +
                              ticketingList[0].destination}
                            )
                          </td>
                          <td className="fw-bold">
                            {moment(ticketingList[0].departure).format(
                              "DD-MMMM-yyyy hh:mm:ss A"
                            )}
                          </td>
                          <td className="fw-bold">
                            {moment(ticketingList[0].arrival).format(
                              "DD-MMMM-yyyy hh:mm:ss A"
                            )}
                          </td>
                          <td>{ticketingList[0].status}</td>
                          <td>{ticketingList[0].cabinClass}</td>
                          <td>
                            {ticketingList[0].bagAmount +
                              " " +
                              ticketingList[0].bagUnit}
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
              {isFareHide === false ? (
                <>
                  {" "}
                  <div className="card-body">
                    <div className="card-head">
                      <h4>Fare Information</h4>
                    </div>
                    <table className="table table-bordered">
                      <thead style={{ background: "gray", color: "white" }}>
                        <tr>
                          <th>Base Price</th>
                          <th>Tax</th>
                          <th>AIT</th>
                          <th>Discount</th>
                          <th>Additional Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {ticketingList.length > 0 ? (
                            <>
                              <td>{ticketingList[0].basePrice}</td>
                              <td>{ticketingList[0].tax}</td>

                              <td>{ticketingList[0].ait}</td>
                              <td>{ticketingList[0].discount}</td>
                              <td>{ticketingList[0].agentAdditionalPrice}</td>
                              <td className="fw-bold">
                                BDT{" "}
                                {ticketingList[0].basePrice +
                                  ticketingList[0].tax +
                                  ticketingList[0].ait +
                                  ticketingList[0].discount}
                              </td>
                            </>
                          ) : (
                            <></>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <></>
              )} */}

                  {/* <div className="card-body">
                <div className="card-head">
                  <h4>Agency Information</h4>
                </div>
                <table className="table table-bordered">
                  <thead style={{ background: "gray", color: "white" }}>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {ticketingList.length > 0 ? (
                        <>
                          {" "}
                          <td>{ticketingList[0].agencyName}</td>
                          <td>{ticketingList[0].agentAddress}</td>
                          <td>{ticketingList[0].agentMobileNo}</td>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div> */}
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
            <div className="modal-dialog">
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
                              <td>
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
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn button-color fw-bold text-white"
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
