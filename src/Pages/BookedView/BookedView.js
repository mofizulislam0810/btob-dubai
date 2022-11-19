import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import { environment } from "../SharePages/Utility/environment";
import tllLogo from "../../../src/images/logo/logo-combined.png";
import moment from "moment";
import produce from "immer";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading/Loading";
import logo from "../../images/logo/logo-combined.png";
import ReactToPrint from "react-to-print";
import airports from "../../JSON/airports.json";
import Footer from "../SharePages/Footer/Footer";
import { Button } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import { getCountryCode, getPassengerType } from "../../common/functions";

const BookedView = () => {
  const { setLoading, setTicketData, loading } = useAuth();
  const navigate = useNavigate();
  const componentRef = useRef();
  let [ticketingList, setTicketingList] = useState([]);
  let [passengerList, setPassengerList] = useState([]);
  let [segmentList, setSegmentList] = useState([]);
  let [basePrice, setBasePrice] = useState(0);
  let [tax, setTax] = useState(0);
  let [ait, setAIT] = useState(0);
  let [discount, setDiscount] = useState(0);
  let [additionalPrice, setAdditionalPrice] = useState(0);
  let [totalPrice, setTotalPrice] = useState(0);
  let [passengerListEdited, setPassengerListEdited] = useState([]);
  let [totalPriceEdited, setTotalPriceEdited] = useState(0);
  let [isFareHide, setIsFareHide] = useState(false);
  let [lastTicketTime, setLastTicketTime] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  let [agentInfo, setAgentInfo] = useState(0);
  const getAgentData = async () => {
    axios
      .get(environment.agentInfo, environment.headerToken)
      .then((agentRes) => {
        setAgentInfo(agentRes.data);
      })
      .catch((err) => {
        //alert('Invalid login')
      });
  };

  useEffect(() => {
    getAgentData();
  }, []);

  const location = useLocation();
  console.log(ticketingList);
  const handleGetList = () => {
    const getTicketingList = async () => {
      // let sendObj = { uniqueTransID: location.search.split("=")[1] };
      let sendObj = location.search.split("=")[1];
      const response = await axios.get(
        environment.getTicketingDetails + "/" + sendObj,
        environment.headerToken
      );
      // console.log(response);
      setTicketingList(response.data);
      setLastTicketTime(response.data.ticketInfo?.lastTicketTimeNote);
      console.log(response.data.data);
      // alert(ticketingList[0].uniqueTransID)
      handleGetPassengerList(
        response.data.data[0].passengerIds,
        response.data.data[0].uniqueTransID
      );
      handleGetSegmentList(response.data.data[0].uniqueTransID);
      localStorage.setItem(
        "uniqueTransID",
        JSON.stringify(response.data.data[0].uniqueTransID)
      );
      setBasePrice(response.data.data[0].basePrice);
      setTax(response.data.data[0].tax);
      setAIT(Number(response.data.data[0].basePrice) * 0.003);
      setTotalPrice(response.data.data[0].ticketingPrice);
      setDiscount(response.data.data[0].discount);
      setAdditionalPrice(response.data.data[0].agentAdditionalPrice);
    };
    getTicketingList();
  };

  const handleGetSegmentList = (trid) => {
    const getSegmentList = async () => {
      const response = await axios.get(
        environment.segmentList + "/" + trid,
        environment.headerToken
      );
      setSegmentList(response.data);
      console.log(response.data);
    };
    getSegmentList();
  };

  console.log(segmentList);

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
  }, []);

  console.log(passengerList);

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
    };
    postPassengerList();
  };

  const print = () => {
    window.print();
  };

  const refLog =
    ticketingList.ticketInfo?.referenceLog !== undefined
      ? ticketingList.ticketInfo?.referenceLog
      : "{}";
  const Obj = JSON.parse(refLog);
  // console.log(Obj.BookingRefNumber);
  const handleGenerateTicket = () => {
    setLoading(true);
    const sendObjTicket = {
      pnr: "044NEV",
      bookingRefNumber: "044NEV",
      priceCodeRef:
        "VExMMjEyNTE5MTQxMC02Mzc4ODk4NTIzMDUwOTg5ODR8MS0wLTB8VVNCYW5nbGE=",
      uniqueTransID: "TLL2125191410",
      itemCodeRef:
        "VExMMjEyNTE5MTQxMC02Mzc4ODk4NTA3OTM5MjQ0NzB8WERPTXxVU0JhbmdsYQ==",
      bookingCodeRef:
        "VExMMjEyNTE5MTQxMC02Mzc4ODk4NTI2ODQ3NDA1MjF8MDQ0TkVWfFVTQmFuZ2xh",
      commission: 0,
    };

    async function fetchOptions() {
      await axios
        .post(environment.ticketingFlight, Obj, environment.headerToken)
        .then((response) => {
          if (response.data.item2?.isSuccess === true) {
            console.log(response);
            setTicketData(response.data);
            sessionStorage.setItem("ticketData", JSON.stringify(response.data));
            setLoading(false);
            navigate("/successticket");
          } else {
            setLoading(false);
            setTicketData(response.data);
            navigate("/processticket");
          }
        });
    }
    fetchOptions();
  };

  const handleGetTime = (referenceLog) => {
    setIsLoading(true);
    // alert(referenceLog);
    const getTimeReq = async () => {
      await axios
        .post(
          environment.getLastTicketTime,
          JSON.parse(referenceLog),
          environment.headerToken
        )
        .then((res) => {
          console.log(res.data.item1);
          // console.log(res.data.item1?.remarks)
          if (
            res.data.item1 !== undefined &&
            res.data.item1 !== null &&
            res.data.item1?.lastTicketTime !== null &&
            res.data.item1?.lastTicketTime !== ""
          ) {
            // console.log('SET Ticketing Time');
            setLastTicketTime(res.data.item1?.lastTicketTime);
          } else if (
            res.data.item1 !== undefined &&
            res.data.item1 !== null &&
            res.data.item1?.remarks !== null &&
            res.data.item1?.remarks !== ""
          ) {
            setLastTicketTime(res.data.item1?.remarks);
          } else {
            toast.error("Please try again after five minutes.");
            setIsLoading(false);
          }
        })
        .catch((res) => {
          toast.error("Please try again after five minutes.");
          setIsLoading(false);
        });
    };
    getTimeReq();
  };

  console.log(ticketingList);

  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <ToastContainer position="bottom-right" autoClose={1500} />
      {loading ? (
        <>
          <Loading flag={2} loading={loading}></Loading>
          <div className="content-wrapper search-panel-bg">
            <section className="content-header"></section>
            <section className="content">
              <div className="container mt-3">
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="fw-bold text-center bg-white text-dark p-2">
                      Booking Details
                    </h4>
                  </div>
                </div>
              </div>
              <div className="container mt-3 pb-4 py-2">
                <div id="ui-view" data-select2-id="ui-view">
                  <div>
                    <div className="card box-shadow">
                      {/* <div className="card-header">
                      
                      {
                        ticketingList[0]?.status==="Booking Cancelled" ||  ticketingList[0]?.status==="Ticket Cancelled" ? <> </> :
                        <>
                        <span className="me-3 float-end">
                          <ReactToPrint
                            trigger={() => (
                              <button className="btn btn-secondary">
                                <span className="me-1">
                                  <i className="fa fa-print"></i>
                                </span>
                                Print
                              </button>
                            )}
                            content={() => componentRef.current}
                          />
                          <Link
                            className="btn btn-secondary ms-2 d-print-none"
                            to="#"
                            data-abc="true"
                          >
                            <i className="fa fa-envelope"></i>
                            <span className="ms-1">Email</span>
                          </Link>
                        </span>
                        </>
                      }
                        
                      </div> */}
                      <div className="card-body" ref={componentRef}>
                        <img
                          src={logo}
                          className="my-3"
                          alt="FirstTrip logo"
                          style={{ width: "160px" }}
                        />
                        <table
                          class="table table-bordered my-2 mb-3 table-sm"
                          style={{ fontSize: "11px" }}
                        >
                          <thead>
                            <tr>
                              <th colspan="4" className="fw-bold py-2 bg-light">
                                {ticketingList.ticketInfo?.status ===
                                  "Booking Cancelled"
                                  ? ticketingList.ticketInfo?.status
                                  : "BOOKING CONFIRMED"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Booking Date:</th>
                              <td>
                                {moment(
                                  ticketingList.ticketInfo?.bookingDate
                                ).format("DD-MMMM-yyyy")}
                              </td>
                              <td className="fw-bold">Booking ID:</td>
                              <td>{ticketingList.ticketInfo?.uniqueTransID}</td>
                            </tr>
                            {/* <tr>
                              <th>Issue Before:</th>
                              <td style={{ color: "red" }}>
                                {lastTicketTime !== "" &&
                                lastTicketTime !== null &&
                                lastTicketTime !== undefined ? (
                                  lastTicketTime
                                ) : (
                                  <>
                                    <a
                                      href="javascript:void(0)"
                                      title="Last Ticketing Time"
                                      onClick={() =>
                                        handleGetTime(
                                          ticketingList.ticketInfo?.referenceLog
                                        )
                                      }
                                    >
                                      <Button
                                        isLoading={isLoading}
                                        border="2px solid"
                                        colorScheme="blue"
                                        variant="outline"
                                        size="xsm"
                                        borderRadius="16px"
                                        p="1"
                                        m="1"
                                        // disabled = {click}
                                      >
                                        <span style={{ fontSize: "10px" }}>
                                          Get Limit
                                        </span>
                                      </Button>
                                    </a>
                                  </>
                                )}
                              </td>
                              <td className="fw-bold">PNR</td>
                              <td>{ticketingList.ticketInfo?.pnr}</td>
                            </tr> */}
                            <tr>
                              <th>{ticketingList.ticketInfo?.status === "Ticket Ordered" ? "" : "Booking"} Status:</th>
                              <td>{ticketingList.ticketInfo?.status === "Ticket Ordered" ? "Ticket Processing " : ticketingList.ticketInfo?.status}</td>
                              <td className="fw-bold">Booked By:</td>
                              <td>{ticketingList.ticketInfo?.agentName}</td>
                            </tr>

                            <tr>
                              {ticketingList.ticketInfo?.status === "Ticket Ordered" ? "" : <>
                                <th>Issue Before:</th>
                                <td style={{ color: "red" }}>
                                  {lastTicketTime !== "" &&
                                    lastTicketTime !== null &&
                                    lastTicketTime !== undefined ? (
                                    lastTicketTime
                                  ) : (
                                    <>
                                      <a
                                        href="javascript:void(0)"
                                        title="Last Ticketing Time"
                                        onClick={() =>
                                          handleGetTime(
                                            ticketingList.ticketInfo?.referenceLog
                                          )
                                        }
                                      >
                                        <Button
                                          isLoading={isLoading}
                                          border="2px solid"
                                          colorScheme="blue"
                                          variant="outline"
                                          size="xsm"
                                          borderRadius="16px"
                                          p="1"
                                          m="1"
                                        // disabled = {click}
                                        >
                                          <span style={{ fontSize: "10px" }}>
                                            Get Limit
                                          </span>
                                        </Button>
                                      </a>
                                    </>
                                  )}
                                </td>
                              </>
                              }
                              <td className="fw-bold">PNR</td>
                              <td>{ticketingList.ticketInfo?.pnr}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="table-responsive-sm">
                          <table
                            className="table table-bordered table-sm"
                            style={{ fontSize: "11px" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colspan="5"
                                  className="fw-bold py-2 bg-light"
                                >
                                  PASSENGER DETAILS
                                </th>
                              </tr>
                              <tr className="text-center">
                                <th>Name</th>
                                <th>Type</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>Passport No</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {ticketingList.passengerInfo?.map(
                                (item, index) => {
                                  return (
                                    <tr key={index}>
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
                                        {getPassengerType(item.passengerType)}
                                      </td>
                                      <td>{item.gender}</td>
                                      <td>
                                        {item.dateOfBirth === null
                                          ? "---"
                                          : moment(item.dateOfBirth).format(
                                            "DD-MMMM-yyyy"
                                          )}
                                      </td>
                                      <td>
                                        {item.documentNumber === ""
                                          ? "N/A"
                                          : item.documentNumber}
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive-sm">
                          <table
                            className="table table-bordered table-sm"
                            style={{ fontSize: "11px" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colspan="8"
                                  className="fw-bold py-2 bg-light"
                                >
                                  TRAVEL SEGMENTS
                                </th>
                              </tr>
                              <tr className="text-center">
                                <th>Airline</th>
                                <th>Flight</th>
                                <th>Departs</th>
                                <th>Date/Time</th>
                                <th>Arrives</th>
                                <th>Date/Time</th>
                                <th>Fare Basis</th>
                                <th>Cabin</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {ticketingList?.ticketInfo?.bookingType !==
                                "Online" ? (
                                <>
                                  {ticketingList.segmentInfo?.map(
                                    (item, index) => {
                                      return (
                                        <>
                                          <tr>
                                            <td>
                                              {ticketingList[0].airlineName}
                                            </td>
                                            <td>
                                              {item.airlineCode}-
                                              {item.flightNumber}
                                            </td>
                                            <td>
                                              {item.origin}
                                              <br></br>
                                              <span
                                                style={{ fontSize: "12px" }}
                                              >
                                                {airports
                                                  .filter(
                                                    (f) =>
                                                      f.iata === item.origin
                                                  )
                                                  .map((item) => item.city)}
                                              </span>
                                            </td>
                                            <td>
                                              {moment(item.departure).format(
                                                "DD-MMMM-yyyy hh:mm:ss"
                                              )}
                                            </td>
                                            <td>
                                              {item.destination}
                                              <br></br>
                                              <span
                                                style={{ fontSize: "12px" }}
                                              >
                                                {airports
                                                  .filter(
                                                    (f) =>
                                                      f.iata ===
                                                      item.destination
                                                  )
                                                  .map((item) => item.city)}
                                              </span>
                                            </td>
                                            <td>
                                              {moment(item.arrival).format(
                                                "DD-MMMM-yyyy hh:mm:ss"
                                              )}
                                            </td>
                                            <td>{item.fareBasisCode}</td>
                                            <td>
                                              {item.cabinClass} (
                                              {item.bookingCode})
                                            </td>
                                          </tr>
                                        </>
                                      );
                                    }
                                  )}
                                </>
                              ) : (
                                <>
                                  {ticketingList?.directions[0][0].segments.map(
                                    (item, index) => {
                                      //         (getCountryFomAirport(item.from) !==
                                      // "Bangladesh" ||
                                      // getCountryFomAirport(item.to) !==
                                      //   "Bangladesh") &&
                                      // setIsDomestic(false);
                                      return (
                                        <tr key={index}>
                                          <td>
                                            {item.airline}
                                            <br></br>
                                            <span style={{ fontSize: "12px" }}>
                                              {item.plane[0]}
                                            </span>
                                          </td>
                                          <td>
                                            {item.airlineCode}-
                                            {item.flightNumber}
                                          </td>
                                          <td>
                                            {item.from}
                                            <br></br>
                                            <span style={{ fontSize: "12px" }}>
                                              {airports
                                                .filter(
                                                  (f) => f.iata === item.from
                                                )
                                                .map((item) => item.city)}
                                              <br></br>
                                              {item.details[0]
                                                .originTerminal !== null &&
                                                item.details[0].originTerminal !==
                                                "" ? (
                                                <>
                                                  (Terminal-
                                                  {
                                                    item.details[0]
                                                      .originTerminal
                                                  }
                                                  )
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                            </span>
                                          </td>
                                          <td>
                                            {moment(item.departure).format(
                                              "DD-MMMM-yyyy hh:mm:ss"
                                            )}
                                          </td>
                                          <td>
                                            {item.to}
                                            <br></br>
                                            <span style={{ fontSize: "12px" }}>
                                              {airports
                                                .filter(
                                                  (f) => f.iata === item.to
                                                )
                                                .map((item) => item.city)}
                                              <br></br>
                                              {item.details[0]
                                                .destinationTerminal !== null &&
                                                item.details[0]
                                                  .destinationTerminal !== "" ? (
                                                <>
                                                  (Terminal-
                                                  {
                                                    item.details[0]
                                                      .destinationTerminal
                                                  }
                                                  )
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                            </span>
                                          </td>
                                          <td>
                                            {moment(item.arrival).format(
                                              "DD-MMMM-yyyy hh:mm:ss"
                                            )}
                                          </td>
                                          <td>{item.fareBasisCode}</td>
                                          <td>
                                            {" "}
                                            {item.serviceClass === "Y"
                                              ? "ECONOMY" +
                                              " (" +
                                              item.bookingClass +
                                              ")"
                                              : item.serviceClass === "C"
                                                ? "BUSINESS CLASS" +
                                                " (" +
                                                item.bookingClass +
                                                ")"
                                                : item.serviceClass +
                                                " (" +
                                                item.bookingClass +
                                                ")"}
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                  {ticketingList?.directions[1] !== undefined &&
                                    ticketingList?.directions !== undefined ? (
                                    <>
                                      {ticketingList?.directions[1][0].segments.map(
                                        (item, index) => {
                                          return (
                                            <tr key={index}>
                                              <td>
                                                {item.airline}
                                                <br></br>
                                                <span
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {item.plane[0]}
                                                </span>
                                              </td>
                                              <td>
                                                {item.airlineCode}-
                                                {item.flightNumber}
                                              </td>
                                              <td>
                                                {item.from}
                                                <br></br>
                                                <span
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {airports
                                                    .filter(
                                                      (f) =>
                                                        f.iata === item.from
                                                    )
                                                    .map((item) => item.city)}
                                                  {item.details[0]
                                                    .originTerminal !== null &&
                                                    item.details[0]
                                                      .originTerminal !== "" ? (
                                                    <>
                                                      (Terminal-
                                                      {
                                                        item.details[0]
                                                          .originTerminal
                                                      }
                                                      )
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </span>
                                              </td>
                                              <td>
                                                {moment(item.departure).format(
                                                  "DD-MMMM-yyyy hh:mm:ss"
                                                )}
                                              </td>
                                              <td>
                                                {item.to}
                                                <span
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {airports
                                                    .filter(
                                                      (f) => f.iata === item.to
                                                    )
                                                    .map((item) => item.city)}
                                                  <br></br>
                                                  {item.details[0]
                                                    .destinationTerminal !==
                                                    null &&
                                                    item.details[0]
                                                      .destinationTerminal !==
                                                    "" ? (
                                                    <>
                                                      (Terminal-
                                                      {
                                                        item.details[0]
                                                          .destinationTerminal
                                                      }
                                                      )
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </span>
                                              </td>
                                              <td>
                                                {moment(item.arrival).format(
                                                  "DD-MMMM-yyyy hh:mm:ss"
                                                )}
                                              </td>
                                              <td>{item.fareBasisCode}</td>
                                              <td>
                                                {" "}
                                                {item.serviceClass === "Y"
                                                  ? "ECONOMY" +
                                                  " (" +
                                                  item.bookingClass +
                                                  ")"
                                                  : item.serviceClass === "C"
                                                    ? "BUSINESS CLASS" +
                                                    " (" +
                                                    item.bookingClass +
                                                    ")"
                                                    : item.serviceClass +
                                                    " (" +
                                                    item.bookingClass +
                                                    ")"}
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive-sm">
                          <table
                            className="table table-bordered table-sm"
                            style={{ fontSize: "11px" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colspan="7"
                                  className="fw-bold py-2 bg-light"
                                >
                                  FARE DETAILS
                                </th>
                              </tr>
                              <tr className="text-end">
                                <th className="text-center">Type</th>
                                <th>Base</th>
                                <th>Tax</th>
                                <th>Discount</th>
                                <th>AIT</th>
                                <th>Pax</th>
                                <th>Total Pax Fare</th>
                              </tr>
                            </thead>
                            <tbody className="text-end">
                              {ticketingList.fareBreakdown?.map((item, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td className="text-center">{getPassengerType(item.passengerType)}</td>
                                      <td>{item.basePrice.toLocaleString("en-US")}</td>
                                      <td>{item.tax.toLocaleString("en-US")}</td>
                                      <td>{item.discount.toLocaleString("en-US")}</td>
                                      <td>{item.ait.toLocaleString("en-US")}</td>
                                      <td>{item.passengerCount}</td>
                                      <td>{item.currencyName} {(item.totalPrice *
                                        item.passengerCount).toLocaleString("en-US")}</td>
                                    </tr>
                                  </>
                                );
                              })}
                              <tr className="fw-bold">
                                <td colSpan={5} className="border-none"></td>
                                <td>Grand Total</td>
                                <td>
                                  {ticketingList.passengerInfo !== undefined
                                    ? ticketingList.passengerInfo[0]
                                      ?.currencyName
                                    : ""}{" "}
                                  {/* {ticketingList.passengerInfo[0]?.currencyName}{" "} */}
                                  {ticketingList.ticketInfo?.ticketingPrice}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive-sm">
                          <table
                            className="table table-bordered table-sm"
                            style={{ fontSize: "11px" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colspan="3"
                                  className="fw-bold py-2 bg-light"
                                >
                                  CONTACT DETAILS
                                </th>
                              </tr>
                              <tr className="text-center">
                                <th>DEPARTS</th>
                                <th>Phone Number</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {ticketingList.passengerInfo?.map(
                                (item, index) => {
                                  return (
                                    <>
                                      {index === 0 ? (
                                        <>
                                          <tr key={index}>
                                            <td>
                                              {airports
                                                .filter(
                                                  (f) =>
                                                    f.iata ===
                                                    ticketingList.segmentInfo[0]
                                                      ?.origin
                                                )
                                                .map((item) => item.city)}
                                              {/* {bookData.data?.item1.flightInfo.dirrections[0][0].from} */}
                                            </td>
                                            <td>
                                              {item.phoneCountryCode +
                                                item.phone}{" "}
                                            </td>
                                          </tr>
                                          {/* <tr key={index}>
                                          <td>
                                            {item.cityName} (Optional)
                                          </td>

                                          <td>
                                            {item.phoneCountryCode + item.phone}{" "}
                                          </td>
                                        </tr> */}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {ticketingList.ticketInfo?.status ===
                        "Booking Cancelled" ||
                        ticketingList.ticketInfo?.status ===
                        "Ticket Cancelled" ? (
                        <></>
                      ) : (
                        <>
                          <div className="container mt-3 mb-5">
                            <div className="row">
                              <div className="col-lg-12 text-center">
                                <button
                                  className="btn button-color text-white w-25 fw-bold btn-sm rounded"
                                  onClick={handleGenerateTicket}
                                >
                                  Issue Ticket
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div
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
                                            v[index].tax = Number(
                                              e.target.value
                                            );
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
                                            v[index].agentAdditionalPrice =
                                              Number(e.target.value);
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
              </div> */}
            </section>
          </div>
        </>
      ) : (
        <>
          <div className="content-wrapper search-panel-bg">
            <section className="content-header"></section>
            <section className="content">
              <div className="container mt-3">
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="fw-bold text-center bg-white text-dark p-2">
                      Booking Details
                    </h4>
                  </div>
                </div>
              </div>
              <div className="container mt-3 pb-4 py-2">
                <div id="ui-view" data-select2-id="ui-view">
                  <div>
                    <div className="card box-shadow">
                      <div className="card-body" ref={componentRef}>
                        <img
                          src={logo}
                          className="my-3"
                          alt="FirstTrip logo"
                          style={{ width: "160px" }}
                        />
                        <table
                          class="table table-bordered my-2 mb-3 table-sm"
                          style={{ fontSize: "11px" }}
                        >
                          <thead>
                            <tr>
                              <th colspan="4" className="fw-bold py-2 bg-light">
                                {ticketingList.ticketInfo?.status ===
                                  "Booking Cancelled"
                                  ? ticketingList.ticketInfo?.status
                                  : "BOOKING CONFIRMED"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Booking Date:</th>
                              <td>
                                {moment(
                                  ticketingList.ticketInfo?.bookingDate
                                ).format("DD-MMMM-yyyy")}
                              </td>
                              <td className="fw-bold">Booking ID:</td>
                              <td>{ticketingList.ticketInfo?.uniqueTransID}</td>
                            </tr>

                            <tr>
                              <th>{ticketingList.ticketInfo?.status === "Ticket Ordered" ? "" : "Booking"} Status:</th>
                              <td>{ticketingList.ticketInfo?.status === "Ticket Ordered" ? "Ticket Processing " : ticketingList.ticketInfo?.status}</td>
                              <td className="fw-bold">Booked By:</td>
                              <td>{ticketingList.ticketInfo?.agentName}</td>
                            </tr>
                            <tr>

                              {ticketingList.ticketInfo?.status === "Ticket Ordered" ? "" : <>
                                <th>Issue Before:</th>
                                <td style={{ color: "red" }}>
                                  {lastTicketTime !== "" &&
                                    lastTicketTime !== null &&
                                    lastTicketTime !== undefined ? (
                                    lastTicketTime
                                  ) : (
                                    <>
                                      <a
                                        href="javascript:void(0)"
                                        title="Last Ticketing Time"
                                        onClick={() =>
                                          handleGetTime(
                                            ticketingList.ticketInfo?.referenceLog
                                          )
                                        }
                                      >
                                        <Button
                                          isLoading={isLoading}
                                          border="2px solid"
                                          colorScheme="blue"
                                          variant="outline"
                                          size="xsm"
                                          borderRadius="16px"
                                          p="1"
                                          m="1"
                                        // disabled = {click}
                                        >
                                          <span style={{ fontSize: "10px" }}>
                                            Get Limit
                                          </span>
                                        </Button>
                                      </a>
                                    </>
                                  )}
                                </td>
                              </>}

                              <td className="fw-bold">PNR</td>
                              <td>{ticketingList.ticketInfo?.pnr}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="table-responsive-sm">
                          <table
                            className="table table-bordered table-sm"
                            style={{ fontSize: "11px" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colspan="5"
                                  className="fw-bold py-2 bg-light"
                                >
                                  PASSENGER DETAILS
                                </th>
                              </tr>
                              <tr className="text-center">
                                <th>Name</th>
                                <th>Type</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>Passport No</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {ticketingList.passengerInfo?.map(
                                (item, index) => {
                                  return (
                                    <tr key={index}>
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
                                        {item.passengerType === "ADT"
                                          ? "Adult"
                                          : item.passengerType === "CNN"
                                            ? "Child"
                                            : "Infant"}
                                      </td>
                                      <td>{item.gender}</td>
                                      <td>
                                        {item.dateOfBirth === null
                                          ? "N/A"
                                          : moment(item.dateOfBirth).format(
                                            "DD-MMMM-yyyy"
                                          )}
                                      </td>
                                      <td>
                                        {
                                          ticketingList?.directions !== undefined ? <>
                                            {
                                              ticketingList?.directions[0][0]?.segments.map((itm, index) => {
                                                return (
                                                  <>
                                                    {index === 0 ? <>
                                                      {

                                                        getCountryCode(itm.from) === "Bangladesh" && getCountryCode(itm.to) === "Bangladesh" ? <>
                                                          N/A
                                                        </> : <>
                                                          {item?.documentNumber === "" ? "N/A" : item?.documentNumber}
                                                        </>
                                                      }
                                                    </> : <></>}
                                                  </>
                                                )
                                              })
                                            }
                                          </> : <>
                                            {
                                              ticketingList?.segmentInfo?.map((itm, index) => {
                                                return (
                                                  <>
                                                    {index === 0 ? <>
                                                      {

                                                        getCountryCode(itm.origin) === "Bangladesh" && getCountryCode(itm.destination) === "Bangladesh" ? <>
                                                          N/A
                                                        </> : <>
                                                          {item?.documentNumber === "" ? "N/A" : item?.documentNumber}
                                                        </>
                                                      }
                                                    </> : <></>}
                                                  </>
                                                )
                                              })
                                            }
                                          </>
                                        }

                                        {/* {item.documentNumber === ""
                                          ? "N/A"
                                          : item.documentNumber} */}
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive-sm">
                          <table
                            className="table table-bordered table-sm"
                            style={{ fontSize: "11px" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colspan="8"
                                  className="fw-bold py-2 bg-light"
                                >
                                  TRAVEL SEGMENTS
                                </th>
                              </tr>
                              <tr className="text-center">
                                <th>Airline</th>
                                <th>Flight</th>
                                <th>Departs</th>
                                <th>Date/Time</th>
                                <th>Arrives</th>
                                <th>Date/Time</th>
                                <th>Fare Basis</th>
                                <th>Cabin</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {ticketingList?.directions === undefined
                                ? (
                                  <>
                                    {ticketingList.segmentInfo?.map(
                                      (item, index) => {
                                        return (
                                          <>
                                            <tr>
                                              <td>
                                                {item.operationCarrierName}
                                              </td>
                                              <td>
                                                {item.airlineCode}-
                                                {item.flightNumber}
                                              </td>
                                              <td>
                                                {item.origin}
                                                <br></br>
                                                <span
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {airports
                                                    .filter(
                                                      (f) =>
                                                        f.iata === item.origin
                                                    )
                                                    .map((item) => item.city)}
                                                </span>
                                              </td>
                                              <td>
                                                {moment(item.departure).format(
                                                  "DD-MMMM-yyyy"
                                                )}
                                                <br></br>
                                                {moment(item.departure).format(
                                                  "hh:mm:ss"
                                                )}
                                              </td>
                                              <td>
                                                {item.destination}
                                                <br></br>
                                                <span
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {airports
                                                    .filter(
                                                      (f) =>
                                                        f.iata ===
                                                        item.destination
                                                    )
                                                    .map((item) => item.city)}
                                                </span>
                                              </td>
                                              <td>
                                                {moment(item.arrival).format(
                                                  "DD-MMMM-yyyy"
                                                )}
                                                <br></br>
                                                {moment(item.arrival).format(
                                                  "hh:mm:ss"
                                                )}
                                              </td>
                                              <td>{item.fareBasisCode}</td>
                                              <td>
                                                {item.cabinClass} (
                                                {item.bookingCode})
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      }
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {ticketingList?.directions[0][0].segments.map(
                                      (item, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>
                                              {item.airline}
                                              <br></br>
                                              <span style={{ fontSize: "12px" }}>
                                                {item.plane[0]}
                                              </span>
                                            </td>
                                            <td>
                                              {item.airlineCode}-
                                              {item.flightNumber}
                                            </td>
                                            <td>
                                              {item.from}
                                              <br></br>
                                              <span style={{ fontSize: "12px" }}>
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.from
                                                  )
                                                  .map((item) => item.city)}{" "}
                                                {item.details[0]
                                                  .originTerminal !== null &&
                                                  item.details[0].originTerminal !==
                                                  "" ? (
                                                  <>
                                                    (Terminal-
                                                    {
                                                      item.details[0]
                                                        .originTerminal
                                                    }
                                                    )
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </span>
                                            </td>
                                            <td>
                                              {moment(item.departure).format(
                                                "DD-MMMM-yyyy"
                                              )}
                                              <br></br>
                                              {moment(item.departure).format(
                                                "hh:mm:ss A"
                                              )}
                                            </td>
                                            <td>
                                              {item.to}
                                              <br></br>
                                              <span style={{ fontSize: "12px" }}>
                                                {airports
                                                  .filter(
                                                    (f) => f.iata === item.to
                                                  )
                                                  .map((item) => item.city)}{" "}
                                                {item.details[0]
                                                  .destinationTerminal !== null &&
                                                  item.details[0]
                                                    .destinationTerminal !== "" ? (
                                                  <>
                                                    (Terminal-
                                                    {
                                                      item.details[0]
                                                        .destinationTerminal
                                                    }
                                                    )
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </span>
                                            </td>
                                            <td>
                                              {moment(item.arrival).format(
                                                "DD-MMMM-yyyy"
                                              )}
                                              <br></br>
                                              {moment(item.arrival).format(
                                                "hh:mm:ss A"
                                              )}
                                            </td>
                                            <td>{item.fareBasisCode}</td>
                                            <td>
                                              {" "}
                                              {item.serviceClass === "Y"
                                                ? "ECONOMY" +
                                                " (" +
                                                item.bookingClass +
                                                ")"
                                                : item.serviceClass === "C"
                                                  ? "BUSINESS CLASS" +
                                                  " (" +
                                                  item.bookingClass +
                                                  ")"
                                                  : item.serviceClass +
                                                  " (" +
                                                  item.bookingClass +
                                                  ")"}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                    {ticketingList?.directions[1] !== undefined &&
                                      ticketingList?.directions !== undefined ? (
                                      <>
                                        {ticketingList?.directions[1][0].segments.map(
                                          (item, index) => {
                                            return (
                                              <tr key={index}>
                                                <td>
                                                  {item.airline}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {item.plane[0]}
                                                  </span>
                                                </td>
                                                <td>
                                                  {item.airlineCode}-
                                                  {item.flightNumber}
                                                </td>
                                                <td>
                                                  {item.from}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {airports
                                                      .filter(
                                                        (f) =>
                                                          f.iata === item.from
                                                      )
                                                      .map(
                                                        (item) => item.city
                                                      )}{" "}
                                                    {item.details[0]
                                                      .originTerminal !== null &&
                                                      item.details[0]
                                                        .originTerminal !== "" ? (
                                                      <>
                                                        (Terminal-
                                                        {
                                                          item.details[0]
                                                            .originTerminal
                                                        }
                                                        )
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </td>
                                                <td>
                                                  {moment(item.departure).format(
                                                    "DD-MMMM-yyyy"
                                                  )}
                                                  <br></br>
                                                  {moment(item.departure).format(
                                                    "hh:mm:ss A"
                                                  )}
                                                </td>
                                                <td>
                                                  {item.to}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {airports
                                                      .filter(
                                                        (f) => f.iata === item.to
                                                      )
                                                      .map(
                                                        (item) => item.city
                                                      )}{" "}
                                                    {item.details[0]
                                                      .destinationTerminal !==
                                                      null &&
                                                      item.details[0]
                                                        .destinationTerminal !==
                                                      "" ? (
                                                      <>
                                                        (Terminal-
                                                        {
                                                          item.details[0]
                                                            .destinationTerminal
                                                        }
                                                        )
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </td>
                                                <td>
                                                  {moment(item.arrival).format(
                                                    "DD-MMMM-yyyy"
                                                  )}
                                                  <br></br>
                                                  {moment(item.arrival).format(
                                                    "hh:mm:ss A"
                                                  )}
                                                </td>
                                                <td>{item.fareBasisCode}</td>
                                                <td>
                                                  {" "}
                                                  {item.serviceClass === "Y"
                                                    ? "ECONOMY" +
                                                    " (" +
                                                    item.bookingClass +
                                                    ")"
                                                    : item.serviceClass === "C"
                                                      ? "BUSINESS CLASS" +
                                                      " (" +
                                                      item.bookingClass +
                                                      ")"
                                                      : item.serviceClass +
                                                      " (" +
                                                      item.bookingClass +
                                                      ")"}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {ticketingList?.directions[2] !== undefined &&
                                      ticketingList?.directions !== undefined ? (
                                      <>
                                        {ticketingList?.directions[2][0].segments.map(
                                          (item, index) => {
                                            return (
                                              <tr key={index}>
                                                <td>
                                                  {item.airline}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {item.plane[0]}
                                                  </span>
                                                </td>
                                                <td>
                                                  {item.airlineCode}-
                                                  {item.flightNumber}
                                                </td>
                                                <td>
                                                  {item.from}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {airports
                                                      .filter(
                                                        (f) =>
                                                          f.iata === item.from
                                                      )
                                                      .map(
                                                        (item) => item.city
                                                      )}{" "}
                                                    {item.details[0]
                                                      .originTerminal !== null &&
                                                      item.details[0]
                                                        .originTerminal !== "" ? (
                                                      <>
                                                        (Terminal-
                                                        {
                                                          item.details[0]
                                                            .originTerminal
                                                        }
                                                        )
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </td>
                                                <td>
                                                  {moment(item.departure).format(
                                                    "DD-MMMM-yyyy"
                                                  )}
                                                  <br></br>
                                                  {moment(item.departure).format(
                                                    "hh:mm:ss A"
                                                  )}
                                                </td>
                                                <td>
                                                  {item.to}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {airports
                                                      .filter(
                                                        (f) => f.iata === item.to
                                                      )
                                                      .map(
                                                        (item) => item.city
                                                      )}{" "}
                                                    {item.details[0]
                                                      .destinationTerminal !==
                                                      null &&
                                                      item.details[0]
                                                        .destinationTerminal !==
                                                      "" ? (
                                                      <>
                                                        (Terminal-
                                                        {
                                                          item.details[0]
                                                            .destinationTerminal
                                                        }
                                                        )
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </td>
                                                <td>
                                                  {moment(item.arrival).format(
                                                    "DD-MMMM-yyyy"
                                                  )}
                                                  <br></br>
                                                  {moment(item.arrival).format(
                                                    "hh:mm:ss A"
                                                  )}
                                                </td>
                                                <td>{item.fareBasisCode}</td>
                                                <td>
                                                  {" "}
                                                  {item.serviceClass === "Y"
                                                    ? "ECONOMY" +
                                                    " (" +
                                                    item.bookingClass +
                                                    ")"
                                                    : item.serviceClass === "C"
                                                      ? "BUSINESS CLASS" +
                                                      " (" +
                                                      item.bookingClass +
                                                      ")"
                                                      : item.serviceClass +
                                                      " (" +
                                                      item.bookingClass +
                                                      ")"}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {ticketingList?.directions[3] !== undefined &&
                                      ticketingList?.directions !== undefined ? (
                                      <>
                                        {ticketingList?.directions[3][0].segments.map(
                                          (item, index) => {
                                            return (
                                              <tr key={index}>
                                                <td>
                                                  {item.airline}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {item.plane[0]}
                                                  </span>
                                                </td>
                                                <td>
                                                  {item.airlineCode}-
                                                  {item.flightNumber}
                                                </td>
                                                <td>
                                                  {item.from}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {airports
                                                      .filter(
                                                        (f) =>
                                                          f.iata === item.from
                                                      )
                                                      .map(
                                                        (item) => item.city
                                                      )}{" "}
                                                    {item.details[0]
                                                      .originTerminal !== null &&
                                                      item.details[0]
                                                        .originTerminal !== "" ? (
                                                      <>
                                                        (Terminal-
                                                        {
                                                          item.details[0]
                                                            .originTerminal
                                                        }
                                                        )
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </td>
                                                <td>
                                                  {moment(item.departure).format(
                                                    "DD-MMMM-yyyy"
                                                  )}
                                                  <br></br>
                                                  {moment(item.departure).format(
                                                    "hh:mm:ss A"
                                                  )}
                                                </td>
                                                <td>
                                                  {item.to}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {airports
                                                      .filter(
                                                        (f) => f.iata === item.to
                                                      )
                                                      .map(
                                                        (item) => item.city
                                                      )}{" "}
                                                    {item.details[0]
                                                      .destinationTerminal !==
                                                      null &&
                                                      item.details[0]
                                                        .destinationTerminal !==
                                                      "" ? (
                                                      <>
                                                        (Terminal-
                                                        {
                                                          item.details[0]
                                                            .destinationTerminal
                                                        }
                                                        )
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </td>
                                                <td>
                                                  {moment(item.arrival).format(
                                                    "DD-MMMM-yyyy"
                                                  )}
                                                  <br></br>
                                                  {moment(item.arrival).format(
                                                    "hh:mm:ss A"
                                                  )}
                                                </td>
                                                <td>{item.fareBasisCode}</td>
                                                <td>
                                                  {" "}
                                                  {item.serviceClass === "Y"
                                                    ? "ECONOMY" +
                                                    " (" +
                                                    item.bookingClass +
                                                    ")"
                                                    : item.serviceClass === "C"
                                                      ? "BUSINESS CLASS" +
                                                      " (" +
                                                      item.bookingClass +
                                                      ")"
                                                      : item.serviceClass +
                                                      " (" +
                                                      item.bookingClass +
                                                      ")"}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {ticketingList?.directions[4] !== undefined &&
                                      ticketingList?.directions !== undefined ? (
                                      <>
                                        {ticketingList?.directions[4][0].segments.map(
                                          (item, index) => {
                                            return (
                                              <tr key={index}>
                                                <td>
                                                  {item.airline}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {item.plane[0]}
                                                  </span>
                                                </td>
                                                <td>
                                                  {item.airlineCode}-
                                                  {item.flightNumber}
                                                </td>
                                                <td>
                                                  {item.from}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {airports
                                                      .filter(
                                                        (f) =>
                                                          f.iata === item.from
                                                      )
                                                      .map(
                                                        (item) => item.city
                                                      )}{" "}
                                                    {item.details[0]
                                                      .originTerminal !== null &&
                                                      item.details[0]
                                                        .originTerminal !== "" ? (
                                                      <>
                                                        (Terminal-
                                                        {
                                                          item.details[0]
                                                            .originTerminal
                                                        }
                                                        )
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </td>
                                                <td>
                                                  {moment(item.departure).format(
                                                    "DD-MMMM-yyyy"
                                                  )}
                                                  <br></br>
                                                  {moment(item.departure).format(
                                                    "hh:mm:ss A"
                                                  )}
                                                </td>
                                                <td>
                                                  {item.to}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {airports
                                                      .filter(
                                                        (f) => f.iata === item.to
                                                      )
                                                      .map(
                                                        (item) => item.city
                                                      )}{" "}
                                                    {item.details[0]
                                                      .destinationTerminal !==
                                                      null &&
                                                      item.details[0]
                                                        .destinationTerminal !==
                                                      "" ? (
                                                      <>
                                                        (Terminal-
                                                        {
                                                          item.details[0]
                                                            .destinationTerminal
                                                        }
                                                        )
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </td>
                                                <td>
                                                  {moment(item.arrival).format(
                                                    "DD-MMMM-yyyy"
                                                  )}
                                                  <br></br>
                                                  {moment(item.arrival).format(
                                                    "hh:mm:ss A"
                                                  )}
                                                </td>
                                                <td>{item.fareBasisCode}</td>
                                                <td>
                                                  {" "}
                                                  {item.serviceClass === "Y"
                                                    ? "ECONOMY" +
                                                    " (" +
                                                    item.bookingClass +
                                                    ")"
                                                    : item.serviceClass === "C"
                                                      ? "BUSINESS CLASS" +
                                                      " (" +
                                                      item.bookingClass +
                                                      ")"
                                                      : item.serviceClass +
                                                      " (" +
                                                      item.bookingClass +
                                                      ")"}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {ticketingList?.directions[5] !== undefined &&
                                      ticketingList?.directions !== undefined ? (
                                      <>
                                        {ticketingList?.directions[5][0].segments.map(
                                          (item, index) => {
                                            return (
                                              <tr key={index}>
                                                <td>
                                                  {item.airline}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {item.plane[0]}
                                                  </span>
                                                </td>
                                                <td>
                                                  {item.airlineCode}-
                                                  {item.flightNumber}
                                                </td>
                                                <td>
                                                  {item.from}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {airports
                                                      .filter(
                                                        (f) =>
                                                          f.iata === item.from
                                                      )
                                                      .map(
                                                        (item) => item.city
                                                      )}{" "}
                                                    {item.details[0]
                                                      .originTerminal !== null &&
                                                      item.details[0]
                                                        .originTerminal !== "" ? (
                                                      <>
                                                        (Terminal-
                                                        {
                                                          item.details[0]
                                                            .originTerminal
                                                        }
                                                        )
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </td>
                                                <td>
                                                  {moment(item.departure).format(
                                                    "DD-MMMM-yyyy"
                                                  )}
                                                  <br></br>
                                                  {moment(item.departure).format(
                                                    "hh:mm:ss A"
                                                  )}
                                                </td>
                                                <td>
                                                  {item.to}
                                                  <br></br>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {airports
                                                      .filter(
                                                        (f) => f.iata === item.to
                                                      )
                                                      .map(
                                                        (item) => item.city
                                                      )}{" "}
                                                    {item.details[0]
                                                      .destinationTerminal !==
                                                      null &&
                                                      item.details[0]
                                                        .destinationTerminal !==
                                                      "" ? (
                                                      <>
                                                        (Terminal-
                                                        {
                                                          item.details[0]
                                                            .destinationTerminal
                                                        }
                                                        )
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </td>
                                                <td>
                                                  {moment(item.arrival).format(
                                                    "DD-MMMM-yyyy"
                                                  )}
                                                  <br></br>
                                                  {moment(item.arrival).format(
                                                    "hh:mm:ss A"
                                                  )}
                                                </td>
                                                <td>{item.fareBasisCode}</td>
                                                <td>
                                                  {" "}
                                                  {item.serviceClass === "Y"
                                                    ? "ECONOMY" +
                                                    " (" +
                                                    item.bookingClass +
                                                    ")"
                                                    : item.serviceClass === "C"
                                                      ? "BUSINESS CLASS" +
                                                      " (" +
                                                      item.bookingClass +
                                                      ")"
                                                      : item.serviceClass +
                                                      " (" +
                                                      item.bookingClass +
                                                      ")"}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )}
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive-sm">
                          <table
                            className="table table-bordered table-sm"
                            style={{ fontSize: "11px" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colspan="7"
                                  className="fw-bold py-2 bg-light"
                                >
                                  FARE DETAILS
                                </th>
                              </tr>
                              <tr className="text-end">
                                <th className="text-center">Type</th>
                                <th>Base</th>
                                <th>Tax</th>
                                <th>Discount</th>
                                <th>AIT</th>
                                <th>Pax</th>
                                <th>Total Pax Fare</th>
                              </tr>
                            </thead>
                            <tbody className="text-end">
                              {ticketingList.fareBreakdown?.map((item, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td className="text-center">{getPassengerType(item.passengerType)}</td>
                                      <td>{item.basePrice.toLocaleString("en-US")}</td>
                                      <td>{item.tax.toLocaleString("en-US")}</td>
                                      <td>{item.discount.toLocaleString("en-US")}</td>
                                      <td>{item.ait.toLocaleString("en-US")}</td>
                                      <td>{item.passengerCount}</td>
                                      <td>{item.currencyName} {(item.totalPrice *
                                        item.passengerCount).toLocaleString("en-US")}</td>
                                    </tr>
                                  </>
                                );
                              })}
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

                        <div className="table-responsive-sm">
                          <table
                            className="table table-bordered table-sm"
                            style={{ fontSize: "11px" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colspan="3"
                                  className="fw-bold py-2 bg-light"
                                >
                                  CONTACT DETAILS
                                </th>
                              </tr>
                              <tr className="text-center">
                                <th>DEPARTS</th>
                                <th>Phone Number</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {ticketingList.passengerInfo?.map(
                                (item, index) => {
                                  return (
                                    <>
                                      {index === 0 ? (
                                        <>
                                          <tr key={index}>
                                            <td>
                                              {airports
                                                .filter(
                                                  (f) =>
                                                    f.iata ===
                                                    ticketingList.segmentInfo[0]
                                                      ?.origin
                                                )
                                                .map((item) => item.city)}
                                              {/* {bookData.data?.item1.flightInfo.dirrections[0][0].from} */}
                                            </td>
                                            <td>
                                              {item.phoneCountryCode +
                                                item.phone}{" "}
                                            </td>
                                          </tr>
                                          {/* <tr key={index}>
                                          <td>
                                            {item.cityName} (Optional)
                                          </td>

                                          <td>
                                            {item.phoneCountryCode + item.phone}{" "}
                                          </td>
                                        </tr> */}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {ticketingList.ticketInfo?.status ===
                        "Booking Cancelled" ||
                        ticketingList.ticketInfo?.status ===
                        "Ticket Cancelled" || ticketingList.ticketInfo?.status ===
                        "Ticket Ordered" ? (
                        <></>
                      ) : (
                        <>
                          {agentInfo.activeCredit + agentInfo.currentBalance <
                            ticketingList.ticketInfo?.ticketingPrice ? (
                            <>
                              <div className="row mb-5 mt-2">
                                <div className="col-lg-12 text-center text-danger">
                                  <p>
                                    You don't have available balance to generate
                                    Ticket!
                                  </p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="container mt-3 mb-5">
                                <div className="row">
                                  <div className="col-lg-12 text-center">
                                    <button
                                      className="btn button-color text-white w-25 fw-bold btn-sm rounded"
                                      onClick={handleGenerateTicket}
                                    >
                                      Issue Ticket
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div
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
                                            v[index].tax = Number(
                                              e.target.value
                                            );
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
                                            v[index].agentAdditionalPrice =
                                              Number(e.target.value);
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
              </div> */}
            </section>
          </div>
        </>
      )}
      <Footer></Footer>
    </div>
  );
};

export default BookedView;
