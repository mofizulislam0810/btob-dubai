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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  let s3URL = "https://tlluploaddocument.s3.ap-southeast-1.amazonaws.com/";
	let staticURL ="wwwroot/Uploads/Support/";
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
      let sendObj = location.search.split("=")[1];
      console.log(sendObj);
      const response = await axios.get(
        environment.getTicketingDetails + '/' + sendObj,
        environment.headerToken
      );
      setTicketingList(response.data);
      setPassengerListEdited(response.data.passengerInfo);
      // console.log(response.data.data);
      //   handleGetPassengerList(
      //   response.data.data[0].passengerIds,
      //   response.data.data[0].uniqueTransID
      // );
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
      else {
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
  // console.log(agentInfo);
  const donwloadRef = useRef();
  const handleDownloadPdf = async () => {
    const element = donwloadRef.current;
    const canvas = await html2canvas(element, {
      scrollX: 0,
      scrollY: 0,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4", true);
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight, "", "FAST");
    pdf.save("ticket_triplover.pdf");

  }
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
                          onClick={handleDownloadPdf}
                        >
                          Download
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body py-5" ref={componentRef}>
                  <div className="px-5" ref={donwloadRef}>
                    <h4 className="text-center pb-2">E-Ticket</h4>

                    <table class="table table-borderless table-sm">
                      <tbody>
                        <tr>
                          <td className="text-start bg-white">
                            {ticketingList.ticketInfo?.agentLogo !== null &&
                              ticketingList.ticketInfo?.agentLogo !== "" ? (
                              <img
                                alt="img01"
                                src={
                                  s3URL+`${ticketingList.ticketInfo?.agentLogo}`
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

                    <table
                      class="table table-borderless my-3 table-sm"
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
                              {ticketingList.ticketInfo?.pnr}
                            </span>
                          </td>
                          <td
                            className="text-end bg-white"
                            style={{ width: "10%" }}
                          >
                            Issue Date :{" "}
                            <span className="fw-bold">{moment(ticketingList.ticketInfo?.issueDate).format("DD-MMMM-yyyy ddd")}</span>
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
                            {ticketingList.passengerInfo?.map((item, index) => {
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
                              <td className="fw-bold">BOOKING ID</td>
                              <td>{ticketingList.ticketInfo?.uniqueTransID}</td>
                            </tr>
                            {/* <tr>
                            <td className="fw-bold">FLIGHT TYPE</td>
                            <td>International</td>
                          </tr> */}
                            <tr>
                              <td className="fw-bold">JOURNEY TYPE</td>
                              <td>{ticketingList.ticketInfo?.journeyType}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">STATUS</td>
                              <td>{ticketingList.ticketInfo?.status === 'Issued' ? "Ticketed" : ticketingList.ticketInfo?.status}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>


                    <div className="table-responsive-sm mt-2">
                      <p
                        className="bg-secondary ps-1 py-2 fw-bold text-start text-white"
                        style={{ fontSize: "10px" }}
                      >
                        FLIGHT DETAILS
                      </p>
                      <table
                        class="table table-borderless table-sm"
                        style={{ fontSize: "10px", lineHeight: "1px" }}
                      >
                        {ticketingList.segmentInfo?.map((item, index) => {
                          let baggage = JSON.parse(item.baggageInfo);
                          return (
                            <>
                              <tbody key={index} className={index !== 0 ? "border-top" : ""}>
                                <tr>
                                  <td
                                    className="fw-bold text-start d-flex bg-white align-items-center"
                                    style={{ paddingTop: "8px" }}
                                    colSpan={1}
                                  >
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList.ticketInfo?.airlineCode}.png`}
                                      className=""
                                      alt=""
                                      width="40px"
                                      height="40px"
                                      ></img>
                                    <div>
                                      <h6 className="ms-2 h6-line-height" style={{ fontSize: "15px" }}>{item.operationCarrierName}</h6>
                                      <h6
                                        className="ms-2 pt-2 h6-line-height"
                                        style={{
                                          fontSize: "12px",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {(item.equipment)}
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
                                          {item.originName},{" "}
                                          {airports
                                            .filter((f) => f.iata === item.origin)
                                            .map((item) => item.city)}
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
                                          {item.destinationName},{" "}
                                          {airports
                                            .filter((f) => f.iata === item.destination)
                                            .map((item) => item.city)}
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
                                        <h6 className="fw-bold" style={{ fontSize: "15px" }}>{item.origin}</h6>
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
                                        <h6 className="fw-bold" style={{ fontSize: "15px" }}>{item.destination}</h6>
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
                                        {item.operationCarrier}-{item.flightNumber}
                                        <span className="">

                                          <span style={{ marginLeft: "43px" }}>
                                            {item.cabinClass}
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
                                          {baggage[0]?.Amount}{baggage[0]?.Units}
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
                                          {ticketingList.ticketInfo?.airlinePNRs}
                                        </span>
                                      </td>
                                    </tr>
                                  </td>
                                </tr>
                              </tbody>

                            </>
                          )
                        })
                        }
                      </table>
                    </div>

                    {isFareHide === false ? (
                      <div className="table-responsive-sm mt-2">
                        <p
                          className="bg-secondary ps-1 py-2 fw-bold text-start text-white"
                          style={{ fontSize: "10px", marginBottom: "8px" }}
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
                              {/* <th>AIT</th> */}
                              <th>Discount</th>
                              <th>Person</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ticketingList.passengerInfo?.map((item, index) => (
                              <>
                                {item.passengerType === "ADT" ? (
                                  <>
                                    <tr>
                                      <td className="text-start">Adult</td>
                                      <td>{item.basePrice}</td>
                                      <td>{item.tax}</td>

                                      {/* <td>{item.ait}</td> */}
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

                                      {/* <td>{item.ait}</td> */}
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

                                      {/* <td>{item.ait}</td> */}
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
                      </div>) : (
                      <></>
                    )}

                    <div className="mt-2 pb-5">
                      <p
                        className="bg-secondary ps-1 py-2 fw-bold text-start text-white"
                        style={{ fontSize: "10px", marginBottom: "8px" }}
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
            <div className="modal-dialog" style={{ minWidth: "1200px" }}>
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
                        {/* <th>AIT</th> */}
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
                              {/* <td>
                                <label
                                  className="form-control"
                                  style={{ background: "#F2F3F4" }}
                                >
                                  {item.ait}
                                </label>
                              </td> */}
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
      <Footer />
    </div>
  );
};

export default Ticket;
