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
  let [lastTicketTime,setLastTicketTime] = useState('');
  let [isLoading,setIsLoading] = useState(false);

  const location = useLocation();
  console.log(ticketingList);
  const handleGetList = () => {
    const getTicketingList = async () => {
      let sendObj = { uniqueTransID: location.search.split("=")[1] };
      const response = await axios.post(
        environment.getTicketingList,
        sendObj,
        environment.headerToken
      );
      setTicketingList(response.data.data);
      setLastTicketTime(response.data.data[0]?.lastTicketTimeNote)
      console.log(response.data.data);
      // alert(ticketingList[0].uniqueTransID)
      handleGetPassengerList(
        response.data.data[0].passengerIds,
        response.data.data[0].uniqueTransID
      );
      handleGetSegmentList(response.data.data[0].uniqueTransID);
      localStorage.setItem("uniqueTransID", JSON.stringify(response.data.data[0].uniqueTransID));
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
    ticketingList[0]?.referenceLog !== undefined
      ? ticketingList[0].referenceLog
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
            // localStorage.setItem(
            //   "ticketConfirm",
            //   JSON.stringify(response.data)
            // );
            setLoading(false);
            navigate("/successticket");
          } else {
            setLoading(false);
            navigate("/failticket");
          }
        });
    }
    fetchOptions();
  };

  const handleGetTime=(referenceLog)=>{
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
          // console.log(res.data.item1)
          // console.log(res.data.item1?.remarks)
          if(res.data.item1 !== undefined && res.data.item1 !== null && res.data.item1?.remarks !== null && res.data.item1?.remarks !== ""){
            // console.log('SET Ticketing Time');
            setLastTicketTime(res.data.item1?.remarks);
          }else{
            toast.error("Please try again after five minutes.")
            setIsLoading(false);
          }
        })
        .catch((res) => {
          toast.error("Please try again after five minutes.")
          setIsLoading(false);
        });
    };
    getTimeReq();
  }

 console.log(lastTicketTime);

  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <ToastContainer position="bottom-right" autoClose={1500} />
      {
        loading ? <>
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
                      <div className="card-header">
                        <img
                          src={logo}
                          alt="Triplover logo"
                          style={{ width: "100px", height: "30px" }}
                        />
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
                            className="btn  btn-secondary ms-2 d-print-none"
                            to="#"
                            data-abc="true"
                          >
                            <i className="fa fa-envelope"></i>
                            <span className="ms-1">Email</span>
                          </Link>
                        </span>
                        {/* {ticketingList.length > 0 ? (
                      <>
                        {ticketingList[0].agentLogo !== null &&
                        ticketingList[0].agentLogo !== "" ? (
                          <img
                            alt="img01"
                            src={
                              environment.baseApiURL +
                              `agentinfo/GetLogo/${ticketingList[0].agentLogo}`
                            }
                            style={{ width: "300px", height: "100px" }}
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
                    <span className="ms-3">
                      PNR :{" "}
                      {ticketingList.length > 0 ? ticketingList[0]?.pnr : ""}
                      <strong> </strong>
                    </span>
                    <input
                      className="ms-3"
                      type={"checkbox"}
                      onChange={(e) => {
                        setIsFareHide(e.target.checked);
                      }}
                    />{" "}
                    Hide Fare Information
                    <ul id="menu-standard">
                      <li id="menu-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-default"
                          onClick={print}
                        >
                          Print
                        </a>
                      </li>
                      <li id="menu-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-default"
                          data-bs-toggle="modal"
                          data-bs-target="#priceModal"
                        >
                          Edit Price
                        </a>
                      </li>
                      <li id="menu-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-default"
                        >
                          Download
                        </a>
                      </li>
                    </ul> */}
                      </div>
                      <div className="card-body" ref={componentRef}>
                        <table class="table table-bordered my-2 mb-3 table-sm">
                          <thead>
                            <tr>
                              <th colspan="4" className="fw-bold py-2 bg-light">
                                BOOKING CONFIRMED
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Booking Date:</th>
                              <td className="bg-light">
                                {moment(ticketingList[0]?.bookingDate).format("DD-MMMM-yyyy")}
                              </td>
                              <td className="fw-bold">Booking ID:</td>
                              <td className="bg-light">
                                <strong>
                                  {" "}
                                  {/* TLL-{ticketingList[0].data?.item1.bookingRefNumber} */}{" "}
                                  {ticketingList[0]?.uniqueTransID}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <th>Issue Before:</th>
                              <td className="bg-light">
                                <strong> {ticketingList[0]?.lastTicketTimeNote}</strong>
                              </td>
                              <td className="fw-bold">PNR</td>
                              <td className="bg-light">
                                <strong> {ticketingList[0]?.pnr}</strong>
                              </td>
                            </tr>
                            <tr>
                              <th>Booking Status:</th>
                              <td className="bg-light">
                                <strong>
                                  {ticketingList[0]?.status}
                                </strong>
                              </td>
                              <td className="fw-bold">Booked By:</td>
                              <td className="bg-light">
                                <strong>
                                  {ticketingList[0]?.agentName}
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="table-responsive-sm">
                          {/* <p className="bg-dark p-2">
                        PASSENGER DETAILS
                      </p> */}
                          <table className="table table-bordered table-sm">
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
                              {passengerList.map((item, index) => {
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
                                    <td>{item.passengerType}</td>
                                    <td>{item.gender}</td>
                                    <td>
                                      {moment(item.dateOfBirth).format(
                                        "DD-MMMM-yyyy"
                                      )}
                                    </td>
                                    <td>{item.documentNumber}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive-sm">
                          {/* <p className="bg-dark p-2">
                        PASSENGER DETAILS
                      </p> */}
                          <table className="table table-bordered table-sm">
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
                              {segmentList.map((item, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{ticketingList[0].airlineName}</td>
                                      <td>{item.flightNumber}</td>
                                      <td>{item.origin}</td>
                                      <td>
                                        {moment(item.departure).format(
                                          "DD-MMMM-yyyy hh:mm:ss"
                                        )}
                                      </td>
                                      <td>{item.destination}</td>
                                      <td>
                                        {moment(item.arrival).format(
                                          "DD-MMMM-yyyy hh:mm:ss"
                                        )}
                                      </td>
                                      <td>{item.fareBasisCode}</td>
                                      <td>{item.cabinClass}</td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive-sm">
                          <table className="table table-bordered table-sm">
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
                              {passengerList.map((item, index) => {
                                return (
                                  <>
                                    {index === 0 ? (
                                      <>
                                        <tr key={index}>
                                          <td>
                                            {item.cityName} (Mandatory)
                                            {/* {bookData.data?.item1.flightInfo.dirrections[0][0].from} */}
                                          </td>
                                          <td>
                                            {item.phoneCountryCode + item.phone}{" "}
                                          </td>
                                        </tr>
                                        <tr key={index}>
                                          <td>
                                            {item.cityName} (Optional)
                                            {/* {bookData.data?.item1.flightInfo.dirrections[0][0].from} */}
                                          </td>

                                          <td>
                                            {item.phoneCountryCode + item.phone}{" "}
                                          </td>
                                        </tr>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="container mt-3 mb-5">
                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <button
                              className="btn button-color text-white w-25 fw-bold"
                              onClick={handleGenerateTicket}
                            >
                              Issue Ticket
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <div className="card-body">
                <div className="card-head">
                  <h4>Notes</h4>
                </div>
                <p>
                  BAGGAGE DISCOUNTS MAY APPLY BASED ON FREQUENT FLYER
                  STATUS/ONLINE CHECKIN/FORM OF PAYMENT/MILITARY/ETC.
                  <h5>
                    IMPORTANT INFORMATION FOR TRAVELERS WITH ELECTRONIC TICKETS
                    ‐ PLEASE READ:
                  </h5>
                  Carriage and other services provided by the carrier are
                  subject to conditions of carriage, which are hereby
                  incorporated by reference. These conditions may be obtained
                  from the issuing carrier. Passengers on a journey involving an
                  ultimate destination or a stop in a country other than the
                  country of departure are advised that international treaties
                  known as the Montreal Convention, or its predecessor, the
                  Warsaw Convention, including its amendments (the Warsaw
                  Convention System), may apply to the entire journey, including
                  any portion thereof within a country. For such passengers, the
                  applicable treaty, including special contracts of carriage
                  embodied in any applicable tariffs, governs and may limit the
                  liability of the carrier. The carriage of certain hazardous
                  materials, like aerosols, fireworks, and flammable liquids,
                  aboard the aircraft is forbidden. If you do not understand
                  these restrictions, further information may be obtained from
                  your airline The passengers are requested to follow below
                  notes accordingly: * Domestic Passengers should report to the
                  Airport before 90 minutes (maximum) and 30 minutes (minimum)
                  of flight departure.* International Passengers should report
                  to the Airport before 180 minutes (maximum) and 90 minutes
                  (minimum) of flight departure.* All Passengers to mandatorily
                  wear musk and hand gloves all the way from entering the
                  Airport up to delivery of baggage on Arrival.* Any Passenger
                  with minimum COVID19 symptom or body temperature of 99°
                  Fahrenheit or above should avoid travelling on Air.*
                  Passengers to maintain social distance in different parts of
                  the Airport area as shall be guided by the Airline and Airport
                  Authority.* No Passenger meal shall be offered by the Domestic
                  Airlines except plain water.* Passengers should be encouraged
                  to use our web check-in for contactless check in process and
                  to avoid queue in check in counters. COUNTER CLOSE
                  TIME:International before 90 Minutes & Domestic before 30
                  Minutes of Flight Departure.
                </p>
              </div> */}
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
              </div>
            </section>
          </div></> : <>
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
                          alt="Triplover logo"
                          style={{ width: "100px", height: "30px" }}
                        />
                        <table class="table table-bordered my-2 mb-3 table-sm" style={{fontSize:"11px"}}>
                          <thead>
                            <tr>
                              <th colspan="4" className="fw-bold py-2 bg-light">
                                BOOKING CONFIRMED
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Booking Date:</th>
                              <td>
                                {moment(ticketingList[0]?.bookingDate).format("DD-MMMM-yyyy")}
                              </td>
                              <td className="fw-bold">Booking ID:</td>
                              <td>
                                  {ticketingList[0]?.uniqueTransID}
                              </td>
                            </tr>
                            <tr>
                              <th>Issue Before:</th>
                              <td  style={{color:'red'}}>
                              {
                                lastTicketTime !== '' && lastTicketTime !== null && lastTicketTime !== undefined? lastTicketTime : <>
                                  <a href="javascript:void(0)"
                                          title="Last Ticketing Time"
                                          onClick={() =>
                                            handleGetTime(
                                              ticketingList[0]?.referenceLog,
                                            )
                                          }
                                        >
                                          <Button
                                            isLoading = {isLoading}
                                            border="2px solid"
                                            colorScheme='blue'
                                            variant="outline"
                                            size="xsm"
                                            borderRadius="16px"
                                            p="1"
                                            m="1"
                                            // disabled = {click}
                                          >
                                            <span style={{fontSize:"10px"}}>Get Limit</span>
                                          </Button>
                                    </a>
                                </>  
                                }
                                    
                              </td>
                              <td className="fw-bold">PNR</td>
                              <td>
                                 {ticketingList[0]?.pnr}
                              </td>
                            </tr>
                            <tr>
                              <th>Booking Status:</th>
                              <td>
                                  {ticketingList[0]?.status}
                              </td>
                              <td className="fw-bold">Booked By:</td>
                              <td>
                                  {ticketingList[0]?.agentName}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="table-responsive-sm">
                          <table className="table table-bordered table-sm" style={{fontSize:"11px"}}>
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
                              {passengerList.map((item, index) => {
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
                                    <td>{item.passengerType}</td>
                                    <td>{item.gender}</td>
                                    <td>
                                      {moment(item.dateOfBirth).format(
                                        "DD-MMMM-yyyy"
                                      )}
                                    </td>
                                    <td>{item.documentNumber}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive-sm">
                          <table className="table table-bordered table-sm" style={{fontSize:"11px"}}>
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
                              {segmentList.map((item, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{ticketingList[0].airlineName}</td>
                                      <td>{item.flightNumber}</td>
                                      <td>{item.origin}</td>
                                      <td>
                                        {moment(item.departure).format(
                                          "DD-MMMM-yyyy hh:mm:ss"
                                        )}
                                      </td>
                                      <td>{item.destination}</td>
                                      <td>
                                        {moment(item.arrival).format(
                                          "DD-MMMM-yyyy hh:mm:ss"
                                        )}
                                      </td>
                                      <td>{item.fareBasisCode}</td>
                                      <td>{item.cabinClass}</td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive-sm">
                          <table className="table table-bordered table-sm" style={{fontSize:"11px"}}>
                            <thead>
                              <tr>
                                <th
                                  colspan="6"
                                  className="fw-bold py-2 bg-light"
                                >
                                  FARE DETAILS
                                </th>
                              </tr>
                              <tr className="text-center">
                                <th>Type</th>
                                <th>Base</th>
                                <th>Tax</th>
                                <th>Discount</th>
                                {/* <th>AIT</th> */}
                                <th>Pax</th>
                                <th>Total Pax Fare</th>
                             </tr>
                            </thead>
                            <tbody className="text-center">
                              {passengerList.map((item, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{item.passengerType}</td>
                                      <td>{item.basePrice}</td>
                                      <td>{item.tax}</td>
                                      <td>{item.discount}</td>
                                      <td>{item.passengerCount}</td>
                                      <td>{item.totalPrice}</td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive-sm">
                          <table className="table table-bordered table-sm" style={{fontSize:"11px"}}>
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
                              {passengerList.map((item, index) => {
                                return (
                                  <>
                                    {index === 0 ? (
                                      <>
                                        <tr key={index}>
                                          <td>
                                            {item.cityName} (Mandatory)
                                            {/* {bookData.data?.item1.flightInfo.dirrections[0][0].from} */}
                                          </td>
                                          <td>
                                            {item.phoneCountryCode + item.phone}{" "}
                                          </td>
                                        </tr>
                                        <tr key={index}>
                                          <td>
                                            {item.cityName} (Optional)
                                            {/* {bookData.data?.item1.flightInfo.dirrections[0][0].from} */}
                                          </td>

                                          <td>
                                            {item.phoneCountryCode + item.phone}{" "}
                                          </td>
                                        </tr>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {ticketingList[0]?.status==="Booking Cancelled" ||  ticketingList[0]?.status==="Ticket Cancelled" 	?<>
                      </>:<>
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
                      </>}
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
              </div>
            </section>
          </div></>
      }


      <Footer></Footer>
    </div>
  );
};

export default BookedView;
