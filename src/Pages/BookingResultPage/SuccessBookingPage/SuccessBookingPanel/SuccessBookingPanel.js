import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { environment } from "../../../SharePages/Utility/environment";
import { Link } from "react-router-dom";
import logo from "../../../../images/logo/logo-combined.png";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import Loading from "../../../Loading/Loading";
import airports from "../../../../JSON/airports.json";
import ReactToPrint from 'react-to-print';
import { getDefaultNormalizer } from "@testing-library/react";

const SuccessBookingPanel = () => {
  const { setTicketData, setLoading, loading } = useAuth();

  const bookData = JSON.parse(sessionStorage.getItem('bookData'));
  // const handleEmail = () => {
  //   const html = document.getElementById("sendEmailDiv").innerHTML;
  //   const obj = {
  //     to: bookData.data?.item1.passengerInfoes[0].contactInfo.email,
  //     templateCode: "T0017",
  //     html: html
  //   }
  //   axios.post(environment.sendEmailBooking, obj)
  //     .then(response => (response.status === 200 ? alert("Success") : alert("Failed")));
  // };
  const navigate = useNavigate();
  const componentRef = useRef();

  const filterParam = JSON.parse(localStorage.getItem("Database"));
  const flightType = filterParam.flightType;
  const direction0 = JSON.parse(localStorage.getItem("direction0"));
  const direction1 = JSON.parse(localStorage.getItem("direction1"));
  const direction2 = JSON.parse(localStorage.getItem("direction2"));
  const direction3 = JSON.parse(localStorage.getItem("direction3"));
  const direction4 = JSON.parse(localStorage.getItem("direction4"));
  const direction5 = JSON.parse(localStorage.getItem("direction5"));
  const ImageUrlD = `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${direction0.platingCarrierCode}.png`;
  const ImageUrlR =
    Object.keys(direction1).length > 0
      ? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${direction1.platingCarrierCode}.png`
      : ``;

  const handleGenarateTicket = () => {

    setLoading(true);
    const sendObjTicket = {
      pnr: bookData.data.item1.pnr,
      bookingRefNumber: bookData.data.item1.bookingRefNumber,
      priceCodeRef: bookData.data.item1.priceCodeRef,
      uniqueTransID: bookData.data.item1.uniqueTransID,
      itemCodeRef: bookData.data.item1.itemCodeRef,
      bookingCodeRef: bookData.data.item1.bookingCodeRef,
      commission: 0,
    };

    async function fetchOptions() {
      await axios
        .post(
          environment.ticketingFlight,
          sendObjTicket,
          environment.headerToken
        )
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
            navigate("/failticket");
          }
        });
    }
    fetchOptions();
  };
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
                  Thank you for your booking
                </h4>
              </div>
            </div>
          </div>

          <div className="container mt-3 py-2 pb-5">
            <div id="ui-view" data-select2-id="ui-view">
              <div>
                <div className="card box-shadow">
                  <div className="card-header">

                    <span className="me-3 float-end">
                      <ReactToPrint
                        trigger={() => (
                          <button className="btn btn-secondary rounded btn-sm">
                            <span className="me-1">
                              <i className="fa fa-print"></i>
                            </span>
                            Print
                          </button>
                        )}
                        content={() => componentRef.current}
                      />
                      {/* <Link
                        className="btn btn-secondary ms-2 d-print-none rounded btn-sm"
                        to="#"
                        onClick={handleEmail}
                        data-abc="true"
                      >
                        <i className="fa fa-envelope"></i>
                        <span className="ms-1">Email</span>
                      </Link> */}
                    </span>
                  </div>
                  <div className="card-body" ref={componentRef} id="sendEmailDiv">
                    {/* <img
                      src={logo}
                      className="my-3"
                      alt="Triplover logo"
                      style={{ width: "100px", height: "30px" }}
                    /> */}
                    <table class="table table-bordered my-2 mb-3 table-sm" style={{ fontSize: "11px" }}>
                      <thead>
                        <tr>
                          <th colspan="4" className="fw-bold py-2 bg-light">
                            BOOKING CONFIRMED
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="fw-bold">Booking ID:</td>
                          <td>
                            {bookData.data?.item1.uniqueTransID}
                          </td>
                          <td className="fw-bold">PNR</td>
                          <td>
                            {bookData.data?.item1.pnr}
                          </td>
                        </tr>
                        <tr>
                          <th>Booking Status:</th>
                          <td>
                            {bookData.data?.item1.bookingStatus === 'Created' ? 'Booked' : bookData.data?.item1.bookingStatus}
                          </td>
                          <td className="fw-bold">Booked By:</td>
                          <td>
                            {sessionStorage.getItem("agentName")}
                          </td>
                        </tr>
                        {
                          bookData.data?.item1.ticketingTimeLimit !== '' ? <>
                            <tr>
                              <th>Issue Before:</th>
                              <td style={{ color: 'red' }}>
                                {/* {console.log(bookData.data?.item1.ticketingTimeLimit)} */}
                                {bookData.data?.item1.ticketingTimeLimit}
                              </td>
                            </tr>
                          </> : <>

                          </>
                        }
                      </tbody>
                    </table>

                    <div className="table-responsive-sm">
                      <table className="table table-bordered table-sm" style={{ fontSize: "11px" }}>
                        <thead>
                          <tr>
                            <th colspan="5" className="fw-bold py-2 bg-light">
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
                          {bookData.data?.item1.passengerInfoes.map(
                            (item, index) => (
                              <tr key={index}>
                                <td>
                                  {item.nameElement.title}{" "}
                                  {item.nameElement.firstName}{" "}
                                  {item.nameElement.lastName}
                                </td>
                                <td>{item.passengerType}</td>
                                <td>{item.gender}</td>
                                <td>
                                  {item.dateOfBirth === null ? "---" : moment(item.dateOfBirth).format(
                                    "DD-MMMM-yyyy"
                                  )}
                                </td>
                                <td>{item.documentInfo.documentNumber}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="table-responsive-sm">
                      <table className="table table-bordered table-sm" style={{ fontSize: "11px" }}>
                        <thead>
                          <tr>
                            <th colspan="8" className="fw-bold py-2 bg-light">
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
                          {bookData.data?.item1.flightInfo?.directions[0][0].segments.map(
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
                                  <td>{item.flightNumber}</td>
                                  <td>
                                    {item.from}
                                    <br></br>
                                    <span style={{ fontSize: "12px" }}>
                                      {airports
                                        .filter((f) => f.iata === item.from)
                                        .map((item) => item.city)}
                                      {item.details[0].originTerminal !== null && item.details[0].originTerminal !== '' ? <>(Terminal-{item.details[0].originTerminal})</> : <></>}
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
                                        .filter((f) => f.iata === item.to)
                                        .map((item) => item.city)}
                                      {item.details[0].destinationTerminal !== null && item.details[0].destinationTerminal !== '' ? <>(Terminal-{item.details[0].destinationTerminal})</> : <></>}
                                    </span>
                                  </td>
                                  <td>
                                    {moment(item.arrival).format(
                                      "DD-MMMM-yyyy hh:mm:ss"
                                    )}
                                  </td>
                                  <td>{item.fareBasisCode}</td>
                                  <td> {item.serviceClass === "Y"
                                    ? "ECONOMY" + " (" + item.bookingClass + ")"
                                    : item.serviceClass === "C"
                                      ? "BUSINESS CLASS" + " (" + item.bookingClass + ")"
                                      : item.serviceClass + " (" + item.bookingClass + ")"}</td>
                                </tr>
                              );
                            }
                          )}

                          {bookData.data?.item1.flightInfo.directions[1] !==
                            undefined ? (
                            <>
                              {bookData.data?.item1.flightInfo.directions[1][0].segments.map(
                                (item, index) => (
                                  <tr key={index}>
                                    {console.log(item)}
                                    <td>
                                      {item.airline}
                                      <br></br>
                                      <span style={{ fontSize: "12px" }}>
                                        {item.plane[0]}
                                      </span>
                                    </td>
                                    <td>{item.flightNumber}</td>
                                    <td>
                                      {item.from}
                                      <br></br>
                                      <span style={{ fontSize: "12px" }}>
                                        {airports
                                          .filter((f) => f.iata === item.from)
                                          .map((item) => item.city)}
                                        (Terminal-{(item.details[0].originTerminal)})
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
                                          .filter((f) => f.iata === item.to)
                                          .map((item) => item.city)}
                                        (Terminal-{(item.details[0].destinationTerminal)})
                                      </span>
                                    </td>
                                    <td>
                                      {moment(item.arrival).format(
                                        "DD-MMMM-yyyy hh:mm:ss"
                                      )}
                                    </td>
                                    <td>{item.fareBasisCode}</td>
                                    <td> {item.serviceClass === "Y"
                                      ? "ECONOMY" + " (" + item.bookingClass + ")"
                                      : item.serviceClass === "C"
                                        ? "BUSINESS CLASS" + " (" + item.bookingClass + ")"
                                        : item.serviceClass + " (" + item.bookingClass + ")"}</td>
                                  </tr>
                                )
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="table-responsive-sm">
                      <table className="table table-bordered table-sm" style={{ fontSize: "11px" }}>
                        <thead>
                          <tr>
                            <th colspan="6" className="fw-bold py-2 bg-light">
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

                          {bookData.data?.item1.flightInfo?.passengerFares.adt !== null ? (
                            <>
                              <tr>
                                <td className="left">ADT</td>
                                <td className="left">
                                  {bookData.data?.item1.flightInfo?.passengerFares.adt.basePrice}
                                </td>
                                <td className="center">
                                  {bookData.data?.item1.flightInfo?.passengerFares.adt.taxes}
                                </td>
                                <td className="right">
                                  {bookData.data?.item1.flightInfo?.passengerFares.adt.discountPrice}
                                </td>
                                {/* <td className="right">
                                  {passengerFares.adt.ait}
                                </td> */}
                                <td className="right">{bookData.data?.item1.flightInfo?.passengerCounts.adt}</td>
                                <td className="right fw-bold">
                                  AED {(bookData.data?.item1.flightInfo?.passengerFares.adt.totalPrice *
                                    bookData.data?.item1.flightInfo?.passengerCounts.adt).toFixed(2)}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <></>
                          )}

                          {bookData.data?.item1.flightInfo?.passengerFares.cnn !== null ? (
                            <>
                              <tr>
                                <td className="left">CNN</td>
                                <td className="left">
                                  {bookData.data?.item1.flightInfo?.passengerFares.cnn.basePrice}
                                </td>
                                <td className="center">
                                  {bookData.data?.item1.flightInfo?.passengerFares.cnn.taxes}
                                </td>
                                <td className="right">
                                  {bookData.data?.item1.flightInfo?.passengerFares.cnn.discountPrice}
                                </td>
                                <td className="right">{bookData.data?.item1.flightInfo?.passengerCounts.cnn}</td>
                                <td className="right fw-bold">
                                  AED {(bookData.data?.item1.flightInfo?.passengerFares.cnn.totalPrice *
                                    bookData.data?.item1.flightInfo?.passengerCounts.cnn).toFixed(2)}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <></>
                          )}

                          {bookData.data?.item1.flightInfo?.passengerFares.inf !== null ? (
                            <>
                              <tr>
                                <td className="left">INF</td>
                                <td className="left">
                                  {bookData.data?.item1.flightInfo?.passengerFares.inf.basePrice}
                                </td>
                                <td className="center">
                                  {bookData.data?.item1.flightInfo?.passengerFares.inf.taxes}
                                </td>
                                <td className="right">
                                  {bookData.data?.item1.flightInfo?.passengerFares.inf.discountPrice}
                                </td>
                                <td className="right">{bookData.data?.item1.flightInfo?.passengerCounts.inf}</td>
                                <td className="right fw-bold">
                                  AED {(bookData.data?.item1.flightInfo?.passengerFares.inf.totalPrice *
                                    bookData.data?.item1.flightInfo?.passengerCounts.inf).toFixed(2)}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <></>
                          )}
                          <tr className="fw-bold">
                            <td colSpan={4} className='border-none'></td>
                            <td>Grand Total</td>
                            <td>AED{" "}
                              {bookData.data?.item1.flightInfo?.bookingComponents[0].totalPrice}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>


                    <div className="table-responsive-sm">
                      <table className="table table-bordered table-sm" style={{ fontSize: "11px" }}>
                        <thead>
                          <tr>
                            <th colspan="3" className="fw-bold py-2 bg-light">
                              CONTACT DETAILS
                            </th>
                          </tr>
                          <tr className="text-center">
                            <th>DEPARTS</th>
                            <th>Phone Number</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {bookData.data?.item1.passengerInfoes.map(
                            (item, index) => (
                              <>
                                {index === 0 ? (
                                  <>
                                    <tr key={index}>
                                      <td>
                                        {airports
                                          .filter(
                                            (f) =>
                                              f.iata ===
                                              bookData.data?.item1.flightInfo
                                                ?.directions[0][0].from
                                          )
                                          .map((item) => item.city)}{" "}
                                        (Mandatory)
                                        {/* {bookData.data?.item1.flightInfo.dirrections[0][0].from} */}
                                      </td>
                                      <td>
                                        {item.contactInfo.phoneCountryCode +
                                          item.contactInfo.phone}{" "}
                                      </td>
                                    </tr>
                                    {/* <tr key={index}>
                                      <td>
                                        {airports
                                          .filter(
                                            (f) =>
                                              f.iata ===
                                              bookData.data?.item1.flightInfo
                                                ?.directions[0][0].to
                                          )
                                          .map((item) => item.city)}{" "}
                                        (Optional)
                                      </td>
                                      <td>
                                        {item.contactInfo.phoneCountryCode +
                                          item.contactInfo.phone}{" "}
                                      </td>
                                    </tr> */}
                                  </>
                                ) : (
                                  <>
                                  </>
                                )}
                              </>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>

                  </div>
                  <div className="row mb-5 mt-2">
                    <div className="col-lg-12 text-center">
                      <button
                        className="btn button-color text-white fw-bold w-25 mt-2 rounded btn-sm"
                        onClick={handleGenarateTicket}
                        disabled={loading ? true : false}
                      >
                        Issue Ticket
                      </button>
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

export default SuccessBookingPanel;
