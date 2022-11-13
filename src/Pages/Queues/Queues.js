import React, { useEffect, useState } from "react";
import "./Queues.css";
import Footer from "../SharePages/Footer/Footer";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import ReactPaginate from "react-paginate";
import Loading from "../Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Center, Spinner, Text } from "@chakra-ui/react";

const Queues = () => {
  const [loading, setLoading] = useState(false);
  let [pageCount, setPageCount] = useState(0);
  let [pageSize, setPageSize] = useState(50);
  let [currentPageNumber, setCurrentPageNumber] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  let searchId = Number(location.search.split("=")[1]);
  let [statusId, setStatusId] = useState(0);
  let [ticketingList, setTicketingList] = useState([]);
  let [uniqueTransID, setUniqueTransID] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [travellDateFrom, setTravellDateFrom] = useState("");
  let [travellDateTo, setTravellDateTo] = useState("");
  let [fromDate, setFromDate] = useState("");
  let [toDate, setToDate] = useState("");
  let [airlineCode, setAirlineCode] = useState("");
  let [flightNumber, setFlightNumber] = useState("");
  let [gdsPnr, setGDSPNR] = useState("");
  const [idxD, setIdxD] = useState(0);

  const [isTimeOut, setIsTimeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsTimeOut(true), 10000);
  }, []);

  let onStatusChange = (statusId) => {
    setIdxD(statusId);
    setStatusId(statusId);
    handleGetList(statusId);
  };
  const handleGetList = (statusId, currentPage) => {
    let status =
      statusId === 1
        ? "Hold"
        : statusId === 2
        ? "Pending"
        : statusId === 3
        ? "Booked"
        : statusId === 4
        ? "Failed"
        : statusId === 5
        ? "Cancelled"
        : statusId === 6
        ? "Issued"
        : statusId === 7
        ? "Ordered"
        : "";
    const getTicketingList = async () => {
      let sendObj = {
        agentId: sessionStorage.getItem("agentId") ?? 0,
        uniqueTransID: uniqueTransID,
        fromDate: fromDate,
        toDate: toDate,
        pnr: gdsPnr,
        status: status,
      };
      const response = await axios.post(
        environment.getTicketingList +
          `?pageNumber=${currentPage}&pageSize=${pageSize}`,
        sendObj,
        environment.headerToken
      );
      //ticketingList= response.data;
      setTicketingList(await response.data.data);
      setPageCount(await response.data.totalPages);
      console.log(ticketingList);
    };
    getTicketingList();
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
  };

  const handleRefreshTicketing = () => {
    setStatusId(0);
    handleGetList(0);
    handleClearTicketing();
  };
  const handleClearTicketing = () => {
    setUniqueTransID("");
    setFromDate("");
    setToDate("");
    setGDSPNR("");
    setStatusId(0);
  };

  const handleDateChange = (status, utid, pnr, ticketno) => {
    if (status === "Issued") {
      window.open(
        "/support?typeid=2&subjectid=2&utid=" +
          utid +
          "&pnr=" +
          pnr +
          "&ticketno=" +
          (ticketno == undefined ? "" : ticketno),
        "_blank"
      );
    } else {
      window.open(
        "/support?typeid=1&subjectid=2&utid=" +
          utid +
          "&pnr=" +
          pnr +
          "&ticketno=" +
          (ticketno == undefined ? "" : ticketno),
        "_blank"
      );
    }
  };
  const handleRaiseSupport = (status, utid, pnr, ticketno) => {
    //window.open("/support?utid="+utid,'_blank')
    if (status === "Issued") {
      window.open(
        "/support?typeid=2&subjectid=0&utid=" +
          utid +
          "&pnr=" +
          pnr +
          "&ticketno=" +
          (ticketno == undefined ? "" : ticketno),
        "_blank"
      );
    } else {
      window.open(
        "/support?typeid=1&subjectid=0&utid=" +
          utid +
          "&pnr=" +
          pnr +
          "&ticketno=" +
          (ticketno == undefined ? "" : ticketno),
        "_blank"
      );
    }
  };
  const handleCancel = (status, utid, pnr, ticketno) => {
    //window.open("/support?utid="+utid,'_blank')
    if (status === "Issued") {
      window.open(
        "/support?typeid=2&subjectid=1&utid=" +
          utid +
          "&pnr=" +
          pnr +
          "&ticketno=" +
          ticketno,
        "_blank"
      );
    } else {
      window.open(
        "/support?typeid=1&subjectid=1&utid=" +
          utid +
          "&pnr=" +
          pnr +
          "&ticketno=" +
          ticketno,
        "_blank"
      );
    }
  };
  const handleTicketingVoid = (status, utid, pnr, ticketno) => {
    // alert(ticketno);
    //window.open("/support?utid="+utid,'_blank')
    if (status === "Issued") {
      window.open(
        "/support?typeid=2&subjectid=5&utid=" +
          utid +
          "&pnr=" +
          pnr +
          "&ticketno=" +
          ticketno,
        "_blank"
      );
    }
  };
  const handleViewTicket = (utid) => {
    window.open("/ticket?utid=" + utid, "_blank");
    //navigate("/ticket?utid="+utid,'_blank');
  };

  const handleBookedView = (utid) => {
    window.open("/bookedview?utid=" + utid, "_blank");
    //navigate("/ticket?utid="+utid,'_blank');
  };

  const handleViewInvoice = (utid) => {
    window.open("/invoice?utid=" + utid, "_blank");
    //navigate("/invoice?utid="+utid,'_blank');
  };
  const handleViewVoucher = (utid) => {
    window.open("/voucher?utid=" + utid, "_blank");
    // navigate("/voucher?utid="+utid,'_blank');
  };
  const handleRefundReq = (utid, ticketNumber) => {
    var result = window.confirm("Are you sure to request refund");
    if (result) {
      console.log(environment.headerToken);
      const refundReq = async () => {
        await axios
          .put(
            environment.ticketRefundRequest + "/" + utid + "/" + ticketNumber,
            null,
            environment.headerToken
          )
          .then((res) => {
            console.log(res.data);
            if (res.data > 0) {
              // alert("OK");
              // window.location.reload();
              toast.success("Thanks! Refund successfully requested..");
              handleGetList(statusId, currentPageNumber);
            }
          });
      };
      refundReq();
    }
  };

  useEffect(() => {
    handleGetList(statusId, currentPageNumber);
    // $(document).ready(function () {
    //   $("div ul li a .nav-link").attr("class", "nav-link");
    //   $(".tab-pane").attr("class", "tab-pane fade");
    //   if (searchId > 0) {
    //     let tabNo =
    //       searchId > 0 && searchId < 8
    //         ? 1
    //         : searchId === 8
    //         ? 2
    //         : searchId === 9
    //         ? 3
    //         : searchId === 10
    //         ? 4
    //         : searchId === 11
    //         ? 5
    //         : searchId === 12
    //         ? 6
    //         : 0;
    //     $("#m" + tabNo).attr("class", "nav-link active");
    //     $("#tp" + tabNo).attr("class", "tab-pane fade show active");
    //   }
    // });
  }, [statusId, currentPageNumber]);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <ToastContainer position="bottom-right" autoClose={1500} />
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <section className="content">
          {/* <Loading loading={loading}></Loading> */}
          <form
            className="mx-5 mt-3"
            encType="multipart/form-data"
            style={{ minHeight: "500px" }}
          >
            <div className="card">
              <div className="card-body">
                <div className="m-4">
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="tp1">
                      <h4>All Bookings</h4>
                      <hr className="my-3" />
                      <div
                        className="row"
                        style={{ width: "100%", paddingBottom: "5px" }}
                      >
                        <div className="col-sm-12 pb-2">
                          <ul id="menu-standard">
                            <li id="menu-item">
                              <a
                                href="javascript:void(0)"
                                className={
                                  idxD === 0
                                    ? "btn btn-secondary text-white rounded"
                                    : "btn btn-default rounded"
                                }
                                onClick={() => onStatusChange(0)}
                                style={{ fontSize: "12px" }}
                              >
                                ALL
                              </a>
                            </li>
                            <li id="menu-item">
                              <a
                                href="javascript:void(0)"
                                className={
                                  idxD === 6
                                    ? "btn btn-secondary text-white rounded"
                                    : "btn btn-default rounded"
                                }
                                onClick={() => onStatusChange(6)}
                                style={{ fontSize: "12px" }}
                              >
                                Ticketed
                              </a>
                            </li>
                            <li id="menu-item">
                              <a
                                href="javascript:void(0)"
                                className={
                                  idxD === 3
                                    ? "btn btn-secondary text-white rounded"
                                    : "btn btn-default rounded"
                                }
                                onClick={() => onStatusChange(3)}
                                style={{ fontSize: "12px" }}
                              >
                                Booked
                              </a>
                            </li>
                            <li id="menu-item">
                              <a
                                href="javascript:void(0)"
                                className={
                                  idxD === 5
                                    ? "btn btn-secondary text-white rounded"
                                    : "btn btn-default rounded"
                                }
                                onClick={() => onStatusChange(5)}
                                style={{ fontSize: "12px" }}
                              >
                                Cancelled
                              </a>
                            </li>
                            <li id="menu-item">
                              <a
                                href="javascript:void(0)"
                                className={
                                  idxD === 2
                                    ? "btn btn-secondary text-white rounded"
                                    : "btn btn-default rounded"
                                }
                                onClick={() => onStatusChange(2)}
                                style={{ fontSize: "12px" }}
                              >
                                Pending
                              </a>
                            </li>
                            <li id="menu-item">
                              <a
                                href="javascript:void(0)"
                                className={
                                  idxD === 7
                                    ? "btn btn-secondary text-white rounded"
                                    : "btn btn-default rounded"
                                }
                                onClick={() => onStatusChange(7)}
                                style={{ fontSize: "12px" }}
                              >
                                Ticket Ordered
                              </a>
                            </li>
                          </ul>
                          <ul>
                            <li id="menu-item">
                              {" "}
                              <a
                                href="javascript:void(0)"
                                className={
                                  idxD === 9
                                    ? "btn btn-secondary text-white rounded"
                                    : "btn btn-default rounded"
                                }
                                data-bs-toggle="collapse"
                                data-bs-target="#f1Collapse"
                                onClick={() => setIdxD(9)}
                                style={{ fontSize: "12px" }}
                              >
                                Filter
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div
                          class="collapse"
                          id="f1Collapse"
                          style={{ paddingTop: "5px" }}
                        >
                          <div class="card card-body">
                            <div className="row my-3">
                              <div className="col-sm-3">
                                <label>GDS PNR</label>
                                <input
                                  type={"text"}
                                  value={gdsPnr}
                                  onChange={(e) => setGDSPNR(e.target.value)}
                                  className="form-control"
                                  placeholder="GDS PNR"
                                ></input>
                              </div>
                              <div className="col-sm-3">
                                <label>Booking ID</label>
                                <input
                                  type={"text"}
                                  value={uniqueTransID}
                                  onChange={(e) =>
                                    setUniqueTransID(e.target.value)
                                  }
                                  className="form-control"
                                  placeholder="Booking ID"
                                ></input>
                              </div>
                              <div className="col-sm-3">
                                <label>From Date (Booking)</label>
                                <input
                                  type={"date"}
                                  pattern="\d{4}-\d{2}-\d{2}"
                                  max="9999-12-31"
                                  value={fromDate}
                                  onChange={(e) => setFromDate(e.target.value)}
                                  className="form-control"
                                  placeholder="From Date"
                                ></input>
                              </div>
                              <div className="col-sm-3">
                                <label>To Date (Booking)</label>
                                <input
                                  type={"date"}
                                  pattern="\d{4}-\d{2}-\d{2}"
                                  max="9999-12-31"
                                  value={toDate}
                                  onChange={(e) => setToDate(e.target.value)}
                                  className="form-control"
                                  placeholder="To Date"
                                ></input>
                              </div>
                            </div>

                            <div className="row">
                              <div
                                className="col-sm-12 text-right"
                                style={{ paddingTop: "2em" }}
                              >
                                <button
                                  type="button"
                                  class="btn button-color fw-bold text-white ms-4 rounded"
                                  onClick={() => handleGetList(statusId, 1)}
                                >
                                  Search
                                </button>
                                <button
                                  type="button"
                                  class="btn button-color fw-bold text-white ms-4 rounded"
                                  onClick={() => handleClearTicketing(statusId)}
                                >
                                  Clear
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{ overflowX: "scroll", marginBottom: "16px" }}
                      >
                        <table
                          className="table table-bordered table-sm"
                          style={{ width: "100%", fontSize: "13px" }}
                        >
                          <thead className="text-center fw-bold bg-secondary">
                            <tr>
                              <th>Issue Date</th>
                              <th>Booking Date</th>
                              <th>Booking ID</th>
                              <th className="text-start">Passenger Name</th>
                              {/* <th>Passenger Type</th> */}
                              <th>Flight Date</th>
                              <th>Route</th>
                              <th>PNR</th>
                              <th>Ticket Number</th>
                              <th>Total Price</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="tbody">
                            {ticketingList.length > 0 ? (
                              ticketingList.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    {/* <td>
                                      {(currentPageNumber - 1) * pageSize +
                                        index +
                                        1}
                                    </td> */}
                                    <td>
                                      {item.issueDate != null ? (
                                        moment(item.issueDate).format(
                                          "DD-MM-YYYY hh:mm:ss A"
                                        )
                                      ) : (
                                        <></>
                                      )}
                                    </td>
                                    <td>
                                      {moment(item.bookingDate).format(
                                        "DD-MM-YYYY hh:mm:ss A"
                                      )}
                                    </td>
                                    <td>
                                      {item.status === "Booked" ? (
                                        <>
                                          <a
                                            href="javascript:void(0)"
                                            onClick={() =>
                                              handleBookedView(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            {item.uniqueTransID}
                                          </a>
                                        </>
                                      ) : (
                                        <>
                                          <a
                                            href="javascript:void(0)"
                                            onClick={() =>
                                              handleViewTicket(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            {item.uniqueTransID}
                                          </a>
                                        </>
                                      )}
                                    </td>
                                    <td>{item.leadPaxName}</td>
                                    {/* <td></td> */}
                                    <td>
                                      {item.departure != null ? (
                                        moment(item.departure).format(
                                          "DD-MM-YYYY hh:mm:ss A"
                                        )
                                      ) : (
                                        <></>
                                      )}
                                    </td>
                                    <td>
                                      {item.origin === "null"
                                        ? ""
                                        : item.journeyType == "Round Trip"
                                        ? item.origin +
                                          (item.destination === ""
                                            ? ""
                                            : "⇔" + item.destination)
                                        : item.origin +
                                          (item.destination === ""
                                            ? ""
                                            : "→" + item.destination)}
                                    </td>
                                    <td>
                                      {item.status === "Booked" ? (
                                        <>
                                          <a
                                            href="javascript:void(0)"
                                            onClick={() =>
                                              handleBookedView(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            {item.pnr}
                                          </a>
                                        </>
                                      ) : (
                                        <>
                                          <a
                                            href="javascript:void(0)"
                                            onClick={() =>
                                              handleViewTicket(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            {item.pnr}
                                          </a>
                                        </>
                                      )}
                                    </td>
                                    <td>{item.ticketNumber}</td>
                                    <td>
                                      {item.ticketingPrice.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td>
                                      {item.status === "Issued"
                                        ? "Ticketed"
                                        : item.status === "Booked"
                                        ? "On Hold"
                                        : item.status}{" "}
                                      <br />{" "}
                                      {item.refundStatus != null
                                        ? "Refund " + item.refundStatus
                                        : ""}
                                    </td>
                                    <td className="text-left">
                                      {item.status === "Booked" ? (
                                        <>
                                          <a
                                            // style={{
                                            //   borderRadius: "50%",
                                            //   fontSize: "12px",
                                            // }}
                                            href="javascript:void(0)"
                                            // className="btn btn-primary fw-bold"
                                            title="View Booking"
                                            onClick={() =>
                                              handleBookedView(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            <Button
                                              border="2px solid"
                                              colorScheme="messenger"
                                              variant="outline"
                                              size="xsm"
                                              borderRadius="16px"
                                              p="1"
                                            >
                                              <span
                                                style={{ fontSize: "10px" }}
                                              >
                                                VB
                                              </span>
                                            </Button>
                                          </a>
                                          &nbsp;{" "}
                                          <a
                                            href="javascript:void(0)"
                                            title="Cancel Booking"
                                            onClick={() =>
                                              handleCancel(
                                                item.status,
                                                item.uniqueTransID,
                                                item.pnr,
                                                item.ticketNumber
                                              )
                                            }
                                          >
                                            <Button
                                              border="2px solid"
                                              colorScheme="messenger"
                                              variant="outline"
                                              size="xsm"
                                              borderRadius="16px"
                                              p="1"
                                            >
                                              <span
                                                style={{ fontSize: "10px" }}
                                              >
                                                CB
                                              </span>
                                            </Button>
                                          </a>
                                          {/* &nbsp;{" "}
                                          <a
                                            href="javascript:void(0)"
                                            title="Raise Support"
                                            onClick={() =>
                                              handleRaiseSupport(
                                                item.status,
                                                item.uniqueTransID,
                                                item.pnr,
                                                item.ticketNumber
                                              )
                                            }
                                          >
                                            <Button
                                              border="2px solid"
                                              colorScheme="messenger"
                                              variant="outline"
                                              size="xsm"
                                              borderRadius="16px"
                                              p='1'
                                            >
                                              <span style={{ fontSize: "10px" }}>RS</span>
                                            </Button>
                                          </a> */}
                                        </>
                                      ) : item.status === "Issued" ? (
                                        <>
                                          <a
                                            href="javascript:void(0)"
                                            title="View Ticket"
                                            onClick={() =>
                                              handleViewTicket(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            <Button
                                              border="2px solid"
                                              colorScheme="messenger"
                                              variant="outline"
                                              size="xsm"
                                              borderRadius="16px"
                                              p="1"
                                            >
                                              <span
                                                style={{ fontSize: "10px" }}
                                              >
                                                VT
                                              </span>
                                            </Button>
                                          </a>
                                          &nbsp;{" "}
                                          <a
                                            href="javascript:void(0)"
                                            title="Invoice"
                                            onClick={() =>
                                              handleViewInvoice(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            <Button
                                              border="2px solid"
                                              colorScheme="messenger"
                                              variant="outline"
                                              size="xsm"
                                              borderRadius="16px"
                                              p="1"
                                            >
                                              <span
                                                style={{ fontSize: "10px" }}
                                              >
                                                IN
                                              </span>
                                            </Button>
                                          </a>
                                          &nbsp;{" "}
                                          <a
                                            href="javascript:void(0)"
                                            title="Raise Support"
                                            onClick={() =>
                                              handleRaiseSupport(
                                                item.status,
                                                item.uniqueTransID,
                                                item.pnr,
                                                item.ticketNumber
                                              )
                                            }
                                          >
                                            <Button
                                              border="2px solid"
                                              colorScheme="messenger"
                                              variant="outline"
                                              size="xsm"
                                              borderRadius="16px"
                                              p="1"
                                            >
                                              <span
                                                style={{ fontSize: "10px" }}
                                              >
                                                RS
                                              </span>
                                            </Button>
                                          </a>
                                          &nbsp;
                                          {/* {moment(
                                            moment(item.issueDate).format(
                                              "YYYY-MM-DD"
                                            ) + " 12:00:00 PM"
                                          ) > moment() ? (
                                            <a
                                              href="javascript:void(0)"
                                              title="Ticketing Cancel"
                                              onClick={() =>
                                                handleCancel(
                                                  item.status,
                                                  item.uniqueTransID,
                                                  item.pnr,
                                                  item.ticketNumber
                                                )
                                              }
                                            >
                                              <Button
                                                border="2px solid"
                                                colorScheme="messenger"
                                                variant="outline"
                                                size="xsm"
                                                borderRadius="16px"
                                                p='1'
                                              >
                                                <span style={{ fontSize: "10px" }}>TC</span>
                                              </Button>
                                            </a>
                                          ) : (
                                            <></>
                                          )} */}
                                          {/* &nbsp;{" "}
                                          <a
                                            href="javascript:void(0)"
                                            title="Ticketing Void"
                                            onClick={() =>
                                              handleTicketingVoid(
                                                item.status,
                                                item.uniqueTransID,
                                                item.pnr,
                                                item.ticketNumber
                                              )
                                            }
                                          >
                                            <Button
                                              border="2px solid"
                                              colorScheme="messenger"
                                              variant="outline"
                                              size="xsm"
                                              borderRadius="16px"
                                              p='1'
                                            >
                                              <span style={{ fontSize: "10px" }}>TV</span>
                                            </Button>
                                          </a> */}
                                        </>
                                      ) : item.status ===
                                        "Booking Cancelled" ? (
                                        <>
                                          <a
                                            href="javascript:void(0)"
                                            title="View Booking"
                                            onClick={() =>
                                              handleBookedView(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            <Button
                                              border="2px solid"
                                              colorScheme="messenger"
                                              variant="outline"
                                              size="xsm"
                                              borderRadius="16px"
                                              p="1"
                                            >
                                              <span
                                                style={{ fontSize: "10px" }}
                                              >
                                                VB
                                              </span>
                                            </Button>
                                          </a>
                                        </>
                                      ) : item.status === "Ticket Cancelled" &&
                                        item.refundStatus == null ? (
                                        <>
                                          <a
                                            href="javascript:void(0)"
                                            title="Refund Request"
                                            onClick={() =>
                                              handleRefundReq(
                                                item.uniqueTransID,
                                                item.ticketNumber
                                              )
                                            }
                                          >
                                            <Button
                                              border="2px solid"
                                              colorScheme="messenger"
                                              variant="outline"
                                              size="xsm"
                                              borderRadius="16px"
                                              p="1"
                                            >
                                              <span
                                                style={{ fontSize: "10px" }}
                                              >
                                                RR
                                              </span>
                                            </Button>
                                          </a>
                                        </>
                                      ) : (
                                        <>
                                          <a
                                            href="javascript:void(0)"
                                            title="View Ticket"
                                            onClick={() =>
                                              handleViewTicket(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            <Button
                                              border="2px solid"
                                              colorScheme="messenger"
                                              variant="outline"
                                              size="xsm"
                                              borderRadius="16px"
                                              p="1"
                                            >
                                              <span
                                                style={{ fontSize: "10px" }}
                                              >
                                                VT
                                              </span>
                                            </Button>
                                          </a>
                                        </>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </tbody>
                        </table>

                        {Object.keys(ticketingList).length === 0 && !isTimeOut && (
                          <Center w="100%" py="50px">
                            <Spinner
                              thickness="4px"
                              speed="0.65s"
                              emptyColor="gray.200"
                              color="red.500"
                              size="xl"
                            />
                          </Center>
                        )}
                      </div>

                      <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Queues;
