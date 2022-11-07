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
import logo from "../../images/logo/logo-combined.png";

const Ticket = () => {
  let [ticketingList, setTicketingList] = useState([]);
  let [passengerList, setPassengerList] = useState([]);
  const [loading, setLoading] = useState(false);
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
  let staticURL = "wwwroot/Uploads/Support/";
  const [isDownloading, setIsDownloading] = useState(false);
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
        environment.getTicketingDetails + "/" + sendObj,
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
    setLoading(true);
    console.log(passengerListEdited);
    const postPassengerList = async () => {
      const response = await axios.post(
        environment.updateBookingFareBreakdown,
        passengerListEdited,
        environment.headerToken
      );
      if (response.data > 0) {
        toast.success("Price updated successfully..");
        handleGetList();
      } else {
        toast.error("Price not updated..");
      }
      setLoading(false);
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
  const donwloadRef = useRef();
  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    const element = donwloadRef.current;
    const canvas = await html2canvas(element, {
      logging: true,
      allowTaint: false,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      quality: 4,
      scale: 4,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4", true);
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight, "", "FAST");
    pdf.save("ticket_FirstTrip.pdf");
    setIsDownloading(false);
  };

  console.log(ticketingList.ticketInfo?.airlineCode, "============");
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <ToastContainer position="bottom-right" autoClose={1500} />
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
                            <button className="btn btn-sm btn-secondary float-right mr-1 d-print-none rounded">
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
                          className="btn btn-sm btn-secondary float-right mr-1 d-print-none rounded"
                          data-bs-toggle="modal"
                          data-bs-target="#priceModal"
                        >
                          Edit Price
                        </a>
                      </li>
                      {/* <li id="menu-item">
                        <button
                          href="javascript:void(0)"
                          className="btn btn-sm btn-secondary float-right mr-1 d-print-none rounded"
                          onClick={handleDownloadPdf}
                          disabled={isDownloading ? true : false}
                        >
                          {isDownloading ? (
                            <>
                              <span
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>{" "}
                              Downloading
                            </>
                          ) : (
                            <>Download</>
                          )}
                        </button>
                      </li> */}
                    </ul>
                  </div>
                  <div className="card-body py-5" ref={componentRef}>
                    <div className="px-5" ref={donwloadRef}>
                      <h4 className="text-center pb-2">E-Ticket</h4>

                      <table class="table table-borderless table-sm">
                        <tbody>
                          <tr>
                            {/* FIXED COMPANY LOGO */}
                            {/* CHANGE THIS LATER */}
                            <td className="text-start">
                              {ticketingList.ticketInfo?.agentLogo !== null &&
                              ticketingList.ticketInfo?.agentLogo !== "" ? (
                                <img
                                  alt="img01"
                                  src={`https://tlluploaddocument.s3.ap-southeast-1.amazonaws.com/${ticketingList.ticketInfo?.agentLogo}`}
                                  style={{ width: "160px" }}
                                ></img>
                              ) : (
                                <>
                                  <img
                                    alt="img01"
                                    className="p-2"
                                    src={tllLogo}
                                    style={{ width: "160px" }}
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
                                style={{ fontSize: "12px", lineHeight: "12px" }}
                              >
                                {agentInfo.address}
                                <br />
                               <span style={{fontSize:"8px"}}><i class="fas fa-phone fa-rotate-90"></i></span> Phone: {agentInfo.mobileNo}<br></br>
                               <span className="me-1"><i class="fa fa-envelope" aria-hidden="true"></i></span> Email: {agentInfo.email}
                              </div>
                            </address>
                              {/* <address>
                                <span className="fw-bold fs-6">
                                  {agentInfo.name}
                                </span>
                                <br />
                                <div
                                  className="mt-2"
                                  style={{
                                    fontSize: "12px",
                                    lineHeight: "14px",
                                  }}
                                >
                                  179 Baizid Road Nasirabad <br />
                                  Dhaka-1216, Bangladesh<br></br>
                                  <span style={{ fontSize: "8px" }}>
                                    <i class="fas fa-phone fa-rotate-90"></i>
                                  </span>{" "}
                                  Phone: +8801625987452<br></br>
                                  <span className="me-1">
                                    <i
                                      class="fa fa-envelope"
                                      aria-hidden="true"
                                    ></i>
                                  </span>{" "}
                                  Email: {agentInfo.email}
                                </div>
                              </address> */}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* <table
                        class="table table-borderless my-3 table-sm"
                        style={{ fontSize: "14px" }}
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
                      </table> */}

                      <table
                        class="table table-borderless my-3 table-sm"
                        style={{ fontSize: "14px" }}
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
                            {/* <td
                              className="text-end bg-white"
                              style={{ width: "10%" }}
                            >
                              Booking Id :{" "}
                              <span className="fw-bold fs-6">{ticketingList.ticketInfo?.uniqueTransID}</span>
                            </td> */}
                          </tr>
                        </tbody>
                      </table>

                      <div className="table-responsive-sm mt-2">
                        <p
                          className="ps-1 py-2 fw-bold text-start"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#c3c2c2",
                          }}
                        >
                          Passenger Information
                        </p>
                        <table
                          class="table table-bordered table-sm mt-1"
                          style={{ fontSize: "14px" }}
                        >
                          <thead>
                            <tr className="text-center">
                              <th className="text-start">Name</th>
                              <th>Type</th>
                              <th>E-Ticket Number</th>
                              <th>Booking ID</th>
                              <th>Ticket Issue Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ticketingList.passengerInfo?.map((item, index) => {
                              return (
                                <tr
                                  className="text-center"
                                  style={{ lineHeight: "14px" }}
                                >
                                  <td
                                    className="text-start"
                                    style={{ fontSize: "15px" }}
                                  >
                                    {item.title.toUpperCase()}{" "}
                                    {item.first.toUpperCase()}{" "}
                                    {item.last.toUpperCase()}
                                  </td>
                                  <td>
                                    {item.passengerType === "ADT"
                                      ? "Adult"
                                      : item.passengerType === "CNN"
                                      ? "Child"
                                      : item.passengerType === "INF" ? "Infant" : "Adult"}
                                  </td>
                                  <td>{item.ticketNumbers}</td>
                                  {index === 0 ? (
                                    <td
                                      className="align-middle"
                                      rowSpan={
                                        ticketingList.passengerInfo.length
                                      }
                                    >
                                      {ticketingList.ticketInfo?.uniqueTransID}
                                    </td>
                                  ) : (
                                    <></>
                                  )}
                                  {index === 0 ? (
                                    <td
                                      className="align-middle"
                                      rowSpan={
                                        ticketingList.passengerInfo.length
                                      }
                                    >
                                      {moment(
                                        ticketingList.ticketInfo?.issueDate
                                      ).format("ddd, DD MMM,YY")}
                                    </td>
                                  ) : (
                                    <></>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="table-responsive-sm mt-3">
                        <p
                          className="ps-1 py-2 fw-bold text-start"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#c3c2c2",
                          }}
                        >
                          Flight Details
                        </p>
                        <div className="mt-1">
                          <div
                            className="border p-1"
                            style={{ fontSize: "14px" }}
                          >
                            {ticketingList?.ticketInfo?.bookingType !==
                            "Online" ? (
                              <>
                                {ticketingList.segmentInfo?.map(
                                  (item, index) => {
                                    let baggage = JSON.parse(item.baggageInfo);
                                    return (
                                      <>
                                        <span className="fw-bold">
                                          {airports
                                            .filter(
                                              (f) => f.iata === item.origin
                                            )
                                            .map((item) => item.city)}{" "}
                                          ({item.origin})
                                        </span>
                                        <span className="mx-2 fw-bold">
                                          <i class="fas fa-arrow-right"></i>
                                        </span>
                                        <span className="fw-bold">
                                          {airports
                                            .filter(
                                              (f) => f.iata === item.destination
                                            )
                                            .map((item) => item.city)}{" "}
                                          ({item.destination})
                                        </span>
                                        <span className="d-flex align-items-center fw-bold">
                                          <img
                                            // src={`/airlines-logo${ticketingList.ticketInfo?.airlineCode}.png`}
                                            //  src={`/AirlineLogos/${ticketingList.ticketInfo?.airlineCode}.jpg`} 
                                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList.ticketInfo?.airlineCode}.png`}
                                            className="me-2"
                                            alt=""
                                            width="30px"
                                            height="30px"
                                          ></img>
                                          {item.operationCarrierName} (
                                          {item.operationCarrier}-
                                          {item.flightNumber})
                                        </span>
                                        <table
                                          class="table table-borderless table-sm mt-1"
                                          style={{ fontSize: "14px" }}
                                        >
                                          <thead>
                                            <tr>
                                              <th className="p-0">
                                                <p
                                                  className="py-1 ps-1"
                                                  style={{
                                                    backgroundColor: "#ededed",
                                                  }}
                                                >
                                                  Date
                                                </p>
                                              </th>
                                              <th className="p-0">
                                                <p
                                                  className="py-1 ps-1"
                                                  style={{
                                                    backgroundColor: "#ededed",
                                                  }}
                                                >
                                                  Time
                                                </p>
                                              </th>
                                              <th className="p-0">
                                                <p
                                                  className="py-1 ps-1"
                                                  style={{
                                                    backgroundColor: "#ededed",
                                                  }}
                                                >
                                                  Flight Info
                                                </p>
                                              </th>
                                              <th className="p-0">
                                                <p
                                                  className="py-1 ps-1"
                                                  style={{
                                                    backgroundColor: "#ededed",
                                                  }}
                                                >
                                                  Flight Time
                                                </p>
                                              </th>
                                              <th className="p-0">
                                                <p
                                                  className="py-1 ps-1"
                                                  style={{
                                                    backgroundColor: "#ededed",
                                                  }}
                                                >
                                                  Cabin
                                                </p>
                                              </th>
                                              <th className="p-0">
                                                <p
                                                  className="py-1 ps-1"
                                                  style={{
                                                    backgroundColor: "#ededed",
                                                  }}
                                                >
                                                  Baggage
                                                </p>
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>
                                                {moment(item.departure).format(
                                                  "ddd DD MMM,YY "
                                                )}
                                                <br></br>
                                                {moment(item.arrival).format(
                                                  "ddd DD MMM,YY "
                                                )}
                                              </td>
                                              <td>
                                                {moment(item.departure).format(
                                                  "hh:mm A"
                                                )}
                                                <br></br>
                                                {moment(item.arrival).format(
                                                  "hh:mm A"
                                                )}
                                              </td>
                                              <td>
                                                Departs{" "}
                                                {airports
                                                  .filter(
                                                    (f) =>
                                                      f.iata === item.origin
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.origin})<br></br>
                                                Arrival{" "}
                                                {airports
                                                  .filter(
                                                    (f) =>
                                                      f.iata ===
                                                      item.destination
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.destination})
                                              </td>
                                              <td className="align-middle">
                                                {item.travelTime}
                                              </td>
                                              <td className="align-middle">
                                                {item.cabinClass}(
                                                {item.bookingCode})
                                              </td>
                                              <td className="align-middle">
                                                {ticketingList.passengerInfo?.map(
                                                  (itm, idx) => {
                                                    return (
                                                      <>
                                                        <span>
                                                          {itm.passengerType}{" "}
                                                          <span
                                                            style={{
                                                              fontSize: "10px",
                                                            }}
                                                          >
                                                            <i class="fas fa-arrow-right"></i>
                                                          </span>{" "}
                                                          Check in :{" "}
                                                          {baggage[0]?.Amount}
                                                          {baggage[0]?.Units}
                                                        </span>
                                                        <br></br>
                                                      </>
                                                    );
                                                  }
                                                )}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </>
                                    );
                                  }
                                )}
                              </>
                            ) : (
                              <>
                                {ticketingList?.directions[0] !== undefined &&
                                ticketingList?.directions !== undefined ? (
                                  <div className="border my-1">
                                    {ticketingList?.directions[0][0].segments.map(
                                      (item, index) => {
                                        return (
                                          <div className="p-1">
                                            <span style={{ fontSize: "18px" }}>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.from
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.from})
                                              </span>
                                              <span className="mx-2 fw-bold">
                                                <i class="fas fa-arrow-right"></i>
                                              </span>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.to
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.to})
                                              </span>
                                            </span>
                                            <span className="d-flex align-items-center fw-bold">
                                              <img
                                                // src={`/AirlineLogos/${ticketingList.ticketInfo?.airlineCode}.jpg`}
                                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList.ticketInfo?.airlineCode}.png`}
                                                className="me-2"
                                                alt=""
                                                width="30px"
                                                height="30px"
                                              ></img>
                                              {item.airline} ({item.airlineCode}
                                              -{item.flightNumber})
                                            </span>
                                            <table
                                              class="table table-borderless table-sm mt-1"
                                              style={{ fontSize: "14px" }}
                                            >
                                              <thead>
                                                <tr>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Date
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Info
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Cabin
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Baggage
                                                    </p>
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("ddd DD MMM,YY ")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("ddd DD MMM,YY ")}
                                                  </td>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("hh:mm A")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("hh:mm A")}
                                                  </td>
                                                  <td>
                                                    <table
                                                      className="p-0"
                                                      style={{
                                                        fontSize: "14px",
                                                      }}
                                                    >
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Departs
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.from
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.from}){" "}
                                                          {item.details[0]
                                                            .originTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .originTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .originTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Arrives
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.to
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.to}){" "}
                                                          {item.details[0]
                                                            .destinationTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .destinationTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .destinationTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>

                                                  <td className="align-middle">
                                                    {item.details[0].flightTime}
                                                  </td>
                                                  <td className="align-middle">
                                                    {item.serviceClass === "Y"
                                                      ? "ECONOMY" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass ===
                                                        "C"
                                                      ? "BUSINESS CLASS" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"}
                                                  </td>
                                                  <td className="align-middle">
                                                    {ticketingList.passengerInfo?.map(
                                                      (itm, idx) => {
                                                        return (
                                                          <>
                                                            <span>
                                                              {itm.passengerType ===
                                                              "ADT"
                                                                ? "Adult"
                                                                : itm.passengerType ===
                                                                  "CNN"
                                                                ? "Child"
                                                                : "Infant"}{" "}
                                                              <span
                                                                style={{
                                                                  fontSize:
                                                                    "10px",
                                                                }}
                                                              >
                                                                <i class="fas fa-arrow-right"></i>
                                                              </span>{" "}
                                                              Check in :{" "}
                                                              {itm.passengerType ===
                                                              "INF"
                                                                ? "10"
                                                                : item
                                                                    .baggage[0]
                                                                    ?.amount}
                                                              {
                                                                item.baggage[0]
                                                                  ?.units
                                                              }
                                                            </span>
                                                            <br></br>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {ticketingList?.directions[1] !== undefined &&
                                ticketingList?.directions !== undefined ? (
                                  <div className="border mb-1">
                                    {ticketingList?.directions[1][0].segments.map(
                                      (item, index) => {
                                        return (
                                          <div className="p-1">
                                            <span style={{ fontSize: "18px" }}>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.from
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.from})
                                              </span>
                                              <span className="mx-2 fw-bold">
                                                <i class="fas fa-arrow-right"></i>
                                              </span>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.to
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.to})
                                              </span>
                                            </span>
                                            <span className="d-flex align-items-center fw-bold">
                                              <img
                                                // src={`/AirlineLogos/${ticketingList.ticketInfo?.airlineCode}.jpg`}
                                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList.ticketInfo?.airlineCode}.png`}
                                                className="me-2"
                                                alt=""
                                                width="30px"
                                                height="30px"
                                              ></img>
                                              {item.airline} ({item.airlineCode}
                                              -{item.flightNumber})
                                            </span>
                                            <table
                                              class="table table-borderless table-sm mt-1"
                                              style={{ fontSize: "14px" }}
                                            >
                                              <thead>
                                                <tr>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Date
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Info
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Cabin
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Baggage
                                                    </p>
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("ddd DD MMM,YY ")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("ddd DD MMM,YY ")}
                                                  </td>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("hh:mm A")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("hh:mm A")}
                                                  </td>
                                                  <td>
                                                    <table
                                                      className="p-0"
                                                      style={{
                                                        fontSize: "14px",
                                                      }}
                                                    >
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Departs
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.from
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.from}){" "}
                                                          {item.details[0]
                                                            .originTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .originTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .originTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Arrives
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.to
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.to}){" "}
                                                          {item.details[0]
                                                            .destinationTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .destinationTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .destinationTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>

                                                  <td className="align-middle">
                                                    {item.details[0].flightTime}
                                                  </td>
                                                  <td className="align-middle">
                                                    {item.serviceClass === "Y"
                                                      ? "ECONOMY" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass ===
                                                        "C"
                                                      ? "BUSINESS CLASS" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"}
                                                  </td>
                                                  <td className="align-middle">
                                                    {ticketingList.passengerInfo?.map(
                                                      (itm, idx) => {
                                                        return (
                                                          <>
                                                            <span>
                                                              {itm.passengerType ===
                                                              "ADT"
                                                                ? "Adult"
                                                                : itm.passengerType ===
                                                                  "CNN"
                                                                ? "Child"
                                                                : "Infant"}{" "}
                                                              <span
                                                                style={{
                                                                  fontSize:
                                                                    "10px",
                                                                }}
                                                              >
                                                                <i class="fas fa-arrow-right"></i>
                                                              </span>{" "}
                                                              Check in :{" "}
                                                              {itm.passengerType ===
                                                              "INF"
                                                                ? "10"
                                                                : item
                                                                    .baggage[0]
                                                                    ?.amount}
                                                              {
                                                                item.baggage[0]
                                                                  ?.units
                                                              }
                                                            </span>
                                                            <br></br>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {ticketingList?.directions[2] !== undefined &&
                                ticketingList?.directions !== undefined ? (
                                  <div className="border mb-1">
                                    {ticketingList?.directions[2][0].segments.map(
                                      (item, index) => {
                                        return (
                                          <div className="p-1">
                                            <span style={{ fontSize: "18px" }}>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.from
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.from})
                                              </span>
                                              <span className="mx-2 fw-bold">
                                                <i class="fas fa-arrow-right"></i>
                                              </span>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.to
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.to})
                                              </span>
                                            </span>
                                            <span className="d-flex align-items-center fw-bold">
                                              <img
                                                // src={`/AirlineLogos/${ticketingList.ticketInfo?.airlineCode}.jpg`}
                                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList.ticketInfo?.airlineCode}.png`}
                                                className="me-2"
                                                alt=""
                                                width="30px"
                                                height="30px"
                                              ></img>
                                              {item.airline} ({item.airlineCode}
                                              -{item.flightNumber})
                                            </span>
                                            <table
                                              class="table table-borderless table-sm mt-1"
                                              style={{ fontSize: "14px" }}
                                            >
                                              <thead>
                                                <tr>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Date
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Info
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Cabin
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Baggage
                                                    </p>
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("ddd DD MMM,YY ")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("ddd DD MMM,YY ")}
                                                  </td>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("hh:mm A")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("hh:mm A")}
                                                  </td>
                                                  <td>
                                                    <table
                                                      className="p-0"
                                                      style={{
                                                        fontSize: "14px",
                                                      }}
                                                    >
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Departs
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.from
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.from}){" "}
                                                          {item.details[0]
                                                            .originTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .originTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .originTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Arrives
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.to
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.to}){" "}
                                                          {item.details[0]
                                                            .destinationTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .destinationTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .destinationTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>

                                                  <td className="align-middle">
                                                    {item.duration[0]}
                                                  </td>
                                                  <td className="align-middle">
                                                    {item.serviceClass === "Y"
                                                      ? "ECONOMY" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass ===
                                                        "C"
                                                      ? "BUSINESS CLASS" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"}
                                                  </td>
                                                  <td className="align-middle">
                                                    {ticketingList.passengerInfo?.map(
                                                      (itm, idx) => {
                                                        return (
                                                          <>
                                                            <span>
                                                              {itm.passengerType ===
                                                              "ADT"
                                                                ? "Adult"
                                                                : itm.passengerType ===
                                                                  "CNN"
                                                                ? "Child"
                                                                : "Infant"}{" "}
                                                              <span
                                                                style={{
                                                                  fontSize:
                                                                    "10px",
                                                                }}
                                                              >
                                                                <i class="fas fa-arrow-right"></i>
                                                              </span>{" "}
                                                              Check in :{" "}
                                                              {itm.passengerType ===
                                                              "INF"
                                                                ? "10"
                                                                : item
                                                                    .baggage[0]
                                                                    ?.amount}
                                                              {
                                                                item.baggage[0]
                                                                  ?.units
                                                              }
                                                            </span>
                                                            <br></br>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {ticketingList?.directions[3] !== undefined &&
                                ticketingList?.directions !== undefined ? (
                                  <div className="border mb-1">
                                    {ticketingList?.directions[3][0].segments.map(
                                      (item, index) => {
                                        return (
                                          <div className="p-1 my-1">
                                            <span style={{ fontSize: "18px" }}>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.from
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.from})
                                              </span>
                                              <span className="mx-2 fw-bold">
                                                <i class="fas fa-arrow-right"></i>
                                              </span>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.to
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.to})
                                              </span>
                                            </span>
                                            <span className="d-flex align-items-center fw-bold">
                                              <img
                                                // src={`/AirlineLogos/${ticketingList.ticketInfo?.airlineCode}.jpg`}
                                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList.ticketInfo?.airlineCode}.png`}
                                                className="me-2"
                                                alt=""
                                                width="30px"
                                                height="30px"
                                              ></img>
                                              {item.airline} ({item.airlineCode}
                                              -{item.flightNumber})
                                            </span>
                                            <table
                                              class="table table-borderless table-sm mt-1"
                                              style={{ fontSize: "14px" }}
                                            >
                                              <thead>
                                                <tr>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Date
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Info
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Cabin
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Baggage
                                                    </p>
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("ddd DD MMM,YY ")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("ddd DD MMM,YY ")}
                                                  </td>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("hh:mm A")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("hh:mm A")}
                                                  </td>
                                                  <td>
                                                    <table
                                                      className="p-0"
                                                      style={{
                                                        fontSize: "14px",
                                                      }}
                                                    >
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Departs
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.from
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.from}){" "}
                                                          {item.details[0]
                                                            .originTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .originTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .originTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Arrives
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.to
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.to}){" "}
                                                          {item.details[0]
                                                            .destinationTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .destinationTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .destinationTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>

                                                  <td className="align-middle">
                                                    {item.duration[0]}
                                                  </td>
                                                  <td className="align-middle">
                                                    {item.serviceClass === "Y"
                                                      ? "ECONOMY" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass ===
                                                        "C"
                                                      ? "BUSINESS CLASS" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"}
                                                  </td>
                                                  <td className="align-middle">
                                                    {ticketingList.passengerInfo?.map(
                                                      (itm, idx) => {
                                                        return (
                                                          <>
                                                            <span>
                                                              {itm.passengerType ===
                                                              "ADT"
                                                                ? "Adult"
                                                                : itm.passengerType ===
                                                                  "CNN"
                                                                ? "Child"
                                                                : "Infant"}{" "}
                                                              <span
                                                                style={{
                                                                  fontSize:
                                                                    "10px",
                                                                }}
                                                              >
                                                                <i class="fas fa-arrow-right"></i>
                                                              </span>{" "}
                                                              Check in :{" "}
                                                              {itm.passengerType ===
                                                              "INF"
                                                                ? "10"
                                                                : item
                                                                    .baggage[0]
                                                                    ?.amount}
                                                              {
                                                                item.baggage[0]
                                                                  ?.units
                                                              }
                                                            </span>
                                                            <br></br>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {ticketingList?.directions[4] !== undefined &&
                                ticketingList?.directions !== undefined ? (
                                  <div className="border mb-1">
                                    {ticketingList?.directions[4][0].segments.map(
                                      (item, index) => {
                                        return (
                                          <div className="p-1">
                                            <span style={{ fontSize: "18px" }}>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.from
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.from})
                                              </span>
                                              <span className="mx-2 fw-bold">
                                                <i class="fas fa-arrow-right"></i>
                                              </span>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.to
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.to})
                                              </span>
                                            </span>
                                            <span className="d-flex align-items-center fw-bold">
                                              <img
                                                // src={`/AirlineLogos/${ticketingList.ticketInfo?.airlineCode}.jpg`}
                                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList.ticketInfo?.airlineCode}.png`}
                                                className="me-2"
                                                alt=""
                                                width="30px"
                                                height="30px"
                                              ></img>
                                              {item.airline} ({item.airlineCode}
                                              -{item.flightNumber})
                                            </span>
                                            <table
                                              class="table table-borderless table-sm mt-1"
                                              style={{ fontSize: "14px" }}
                                            >
                                              <thead>
                                                <tr>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Date
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Info
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Cabin
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Baggage
                                                    </p>
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("ddd DD MMM,YY ")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("ddd DD MMM,YY ")}
                                                  </td>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("hh:mm A")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("hh:mm A")}
                                                  </td>
                                                  <td>
                                                    <table
                                                      className="p-0"
                                                      style={{
                                                        fontSize: "14px",
                                                      }}
                                                    >
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Departs
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.from
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.from}){" "}
                                                          {item.details[0]
                                                            .originTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .originTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .originTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Arrives
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.to
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.to}){" "}
                                                          {item.details[0]
                                                            .destinationTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .destinationTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .destinationTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>

                                                  <td className="align-middle">
                                                    {item.duration[0]}
                                                  </td>
                                                  <td className="align-middle">
                                                    {item.serviceClass === "Y"
                                                      ? "ECONOMY" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass ===
                                                        "C"
                                                      ? "BUSINESS CLASS" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"}
                                                  </td>
                                                  <td className="align-middle">
                                                    {ticketingList.passengerInfo?.map(
                                                      (itm, idx) => {
                                                        return (
                                                          <>
                                                            <span>
                                                              {itm.passengerType ===
                                                              "ADT"
                                                                ? "Adult"
                                                                : itm.passengerType ===
                                                                  "CNN"
                                                                ? "Child"
                                                                : "Infant"}{" "}
                                                              <span
                                                                style={{
                                                                  fontSize:
                                                                    "10px",
                                                                }}
                                                              >
                                                                <i class="fas fa-arrow-right"></i>
                                                              </span>{" "}
                                                              Check in :{" "}
                                                              {itm.passengerType ===
                                                              "INF"
                                                                ? "10"
                                                                : item
                                                                    .baggage[0]
                                                                    ?.amount}
                                                              {
                                                                item.baggage[0]
                                                                  ?.units
                                                              }
                                                            </span>
                                                            <br></br>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {ticketingList?.directions[5] !== undefined &&
                                ticketingList?.directions !== undefined ? (
                                  <div className="border mb-1">
                                    {ticketingList?.directions[5][0].segments.map(
                                      (item, index) => {
                                        return (
                                          <div className="p-1">
                                            <span style={{ fontSize: "18px" }}>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.from
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.from})
                                              </span>
                                              <span className="mx-2 fw-bold">
                                                <i class="fas fa-arrow-right"></i>
                                              </span>
                                              <span className="fw-bold">
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.to
                                                  )
                                                  .map(
                                                    (item) => item.city
                                                  )}{" "}
                                                ({item.to})
                                              </span>
                                            </span>
                                            <span className="d-flex align-items-center fw-bold">
                                              <img
                                                // src={`/AirlineLogos/${ticketingList.ticketInfo?.airlineCode}.jpg`}
                                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList.ticketInfo?.airlineCode}.png`}
                                                className="me-2"
                                                alt=""
                                                width="30px"
                                                height="30px"
                                              ></img>
                                              {item.airline} ({item.airlineCode}
                                              -{item.flightNumber})
                                            </span>
                                            <table
                                              class="table table-borderless table-sm mt-1"
                                              style={{ fontSize: "14px" }}
                                            >
                                              <thead>
                                                <tr>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Date
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Info
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Flight Time
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Cabin
                                                    </p>
                                                  </th>
                                                  <th className="p-0">
                                                    <p
                                                      className="py-1 ps-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#ededed",
                                                      }}
                                                    >
                                                      Baggage
                                                    </p>
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("ddd DD MMM,YY ")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("ddd DD MMM,YY ")}
                                                  </td>
                                                  <td>
                                                    {moment(
                                                      item.departure
                                                    ).format("hh:mm A")}
                                                    <br></br>
                                                    {moment(
                                                      item.arrival
                                                    ).format("hh:mm A")}
                                                  </td>
                                                  <td>
                                                    <table
                                                      className="p-0"
                                                      style={{
                                                        fontSize: "14px",
                                                      }}
                                                    >
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Departs
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.from
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.from}){" "}
                                                          {item.details[0]
                                                            .originTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .originTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .originTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                      <tr className="p-0">
                                                        <td className="p-0">
                                                          Arrives
                                                        </td>
                                                        <td className="py-0 fw-bold">
                                                          {airports
                                                            .filter(
                                                              (f) =>
                                                                f.iata ===
                                                                item.to
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.city
                                                            )}{" "}
                                                          ({item.to}){" "}
                                                          {item.details[0]
                                                            .destinationTerminal !==
                                                            null &&
                                                          item.details[0]
                                                            .destinationTerminal !==
                                                            "" ? (
                                                            <>
                                                              Terminal-(
                                                              {
                                                                item.details[0]
                                                                  .destinationTerminal
                                                              }
                                                              )
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>

                                                  <td className="align-middle">
                                                    {item.duration[0]}
                                                  </td>
                                                  <td className="align-middle">
                                                    {item.serviceClass === "Y"
                                                      ? "ECONOMY" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass ===
                                                        "C"
                                                      ? "BUSINESS CLASS" +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"
                                                      : item.serviceClass +
                                                        "(" +
                                                        item.bookingClass +
                                                        ")"}
                                                  </td>
                                                  <td className="align-middle">
                                                    {ticketingList.passengerInfo?.map(
                                                      (itm, idx) => {
                                                        return (
                                                          <>
                                                            <span>
                                                              {itm.passengerType ===
                                                              "ADT"
                                                                ? "Adult"
                                                                : itm.passengerType ===
                                                                  "CNN"
                                                                ? "Child"
                                                                : "Infant"}{" "}
                                                              <span
                                                                style={{
                                                                  fontSize:
                                                                    "10px",
                                                                }}
                                                              >
                                                                <i class="fas fa-arrow-right"></i>
                                                              </span>{" "}
                                                              Check in :{" "}
                                                              {itm.passengerType ===
                                                              "INF"
                                                                ? "10"
                                                                : item
                                                                    .baggage[0]
                                                                    ?.amount}
                                                              {
                                                                item.baggage[0]
                                                                  ?.units
                                                              }
                                                            </span>
                                                            <br></br>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {isFareHide === false ? (
                        <div className="table-responsive-sm mt-3">
                          <p
                            className="ps-1 py-2 fw-bold text-start"
                            style={{
                              fontSize: "14px",
                              backgroundColor: "#c3c2c2",
                            }}
                          >
                            Fare Details
                          </p>

                          <table
                            class="table table-bordered table-sm text-end mt-1"
                            style={{ fontSize: "14px" }}
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
                              {ticketingList.fareBreakdown?.map(
                                (item, index) => (
                                  <>
                                    {item.passengerType === "ADT" ? (
                                      <>
                                        <tr>
                                          <td className="text-start">Adult</td>
                                          <td>{ item.basePriceEdited > 0 ? item.basePriceEdited : item.basePrice}</td>
                                          <td>{item.taxEdited > 0 ? item.taxEdited : item.tax}</td>

                                          <td>{item.ait}</td>
                                          <td>{item.discountEdited > 0 ? item.discountEdited : item.discount}</td>
                                          <td>{item.passengerCount}</td>
                                          <td className="fw-bold">
                                            {item.currencyName}{" "}
                                            {(
                                              item.totalPrice *
                                              item.passengerCount
                                            ).toLocaleString("en-US")}
                                          </td>
                                        </tr>
                                      </>
                                    ) : item.passengerType === "CNN" ? (
                                      <>
                                        <tr>
                                          <td className="text-start">Child</td>
                                          <td>{ item.basePriceEdited > 0 ? item.basePriceEdited : item.basePrice}</td>
                                          <td>{item.taxEdited > 0 ? item.taxEdited : item.tax}</td>

                                          <td>{item.ait}</td>
                                          <td>{item.discountEdited > 0 ? item.discountEdited : item.discount}</td>
                                          <td>{item.passengerCount}</td>
                                          <td className="fw-bold">
                                            {item.currencyName}{" "}
                                            {(
                                              item.totalPrice *
                                              item.passengerCount
                                            ).toLocaleString("en-US")}
                                          </td>
                                        </tr>
                                      </>
                                    ) : item.passengerType === "INF" ? (
                                      <>
                                        <tr>
                                          <td className="text-start">Infant</td>
                                          <td>{ item.basePriceEdited > 0 ? item.basePriceEdited : item.basePrice}</td>
                                          <td>{item.taxEdited > 0 ? item.taxEdited : item.tax}</td>

                                          <td>{item.ait}</td>
                                          <td>{item.discountEdited > 0 ? item.discountEdited : item.discount}</td>
                                          <td>{item.passengerCount}</td>
                                          <td className="fw-bold">
                                            {item.currencyName}{" "}
                                            {(
                                              item.totalPrice *
                                              item.passengerCount
                                            ).toLocaleString("en-US")}
                                          </td>
                                        </tr>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )
                              )}
                              <tr className="fw-bold">
                                <td colSpan={5} className="border-none"></td>
                                <td>Grand Total</td>
                                <td>
                                  {ticketingList.passengerInfo !== undefined
                                    ? ticketingList.passengerInfo[0]
                                        ?.currencyName
                                    : ""}{" "}
                                  {/* {ticketingList.passengerInfo[0]?.currencyName}{" "} */}
                                  {ticketingList.ticketInfo?.ticketingPrice.toLocaleString(
                                    "en-US"
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="mt-3 pb-5">
                        <p
                          className="ps-1 py-2 fw-bold text-start"
                          style={{
                            fontSize: "13px",
                            marginBottom: "8px",
                            backgroundColor: "#c3c2c2",
                          }}
                        >
                          Important Notice
                        </p>
                        <table
                          class="table table-bordered table-sm text-end mt-1 mb-0"
                          style={{ fontSize: "13px" }}
                        >
                          <thead>
                            <tr>
                              <th className="text-start">E-Ticket Notice:</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-start">
                              <p className="border-0">
                                Carriage and other services provided by the
                                carrier are subject to conditions of carriage
                                which are hereby incorporated by reference.
                                These conditions may be obtained from the
                                issuing carrier.
                              </p>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          class="table table-bordered table-sm text-end  mb-0"
                          style={{ fontSize: "13px" }}
                        >
                          <thead>
                            <tr>
                              <th className="text-start">
                                Passport/Visa/Health:
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-start">
                              <p className="border-0">
                                Please ensure that you have all the required
                                travel documents for your entire journey - i.e.
                                valid passport & necessary Visas - and that you
                                have had the recommended
                                vaccinations/immunizations for your
                                destination's.
                              </p>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          class="table table-bordered table-sm text-end mb-0"
                          style={{ fontSize: "13px" }}
                        >
                          <thead>
                            <tr>
                              <th className="text-start">
                                Carry-on Baggage Allowance:
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-start">
                              <p className="border-0">
                                LIMIT: 1 Carry-On bag per passenger / SIZE
                                LIMIT: 22in x 15in x 8in (L+W+H=45 inches) /
                                WEIGHT LIMIT: Max weight 7 kg / 15 lb
                              </p>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          class="table table-bordered table-sm text-end  mb-0"
                          style={{ fontSize: "13px" }}
                        >
                          <thead>
                            <tr>
                              <th className="text-start">Reporting Time:</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-start">
                              <p className="border-0">
                                Flights open for check-in 1 hour before
                                scheduled departure time on domestic flights and
                                3 hours before scheduled departure time on
                                international flights. Passengers must check-in
                                1 hour before flight departure. Check-in
                                counters close 30 minutes before flight
                                departure for domestic, and 90 minutes before
                                the scheduled departure for international
                                flights.
                              </p>
                            </tr>
                          </tbody>
                        </table>

                        {/* <table
                          class="table table-bordered table-sm text-end mb-0"
                          style={{ fontSize: "14px" }}
                        >
                          <thead>
                            <tr>
                              <th className="text-start">IMPORTANT NOTICE:</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-start">
                              <p className="border-0">
                             Baggage discounts may apply based on frequent flyer/status/online checkin/from of payment/military/etc.
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
                            </tr>
                          </tbody>
                        </table> */}
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
                        <th>AIT</th>
                        <th>Discount</th>
                        {/* <th>Additional Price</th> */}
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
                                  disabled
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
                              {/* <td>
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
                              </td> */}
                              <td className="text-end">
                                {(
                                  item.basePrice +
                                  item.tax +
                                  item.ait +
                                  item.discount
                                ).toFixed(2)}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                      <tr>
                        <td colSpan={11} style={{ textAlign: "right" }}>
                          Total:{" "}
                          {passengerListEdited.map((item, index) => {
                            (totalPriceEdited +=
                              item.basePrice +
                              item.tax +
                              item.ait +
                              item.discount).toFixed(2);
                            return index === passengerListEdited.length - 1
                              ? totalPriceEdited.toFixed(2)
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
                    disabled={loading ? true : false}
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
