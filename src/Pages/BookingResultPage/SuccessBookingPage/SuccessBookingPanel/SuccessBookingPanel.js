import axios from "axios";
import React,{useRef} from "react";
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
  const { bookData, setTicketData, setLoading, loading } = useAuth();
  console.log(bookData);
  const handleEmail = () => {
    const html = document.getElementById("sendEmailDiv").innerHTML;
    const obj ={
      to: bookData.data?.item1.passengerInfoes[0].contactInfo.email,
      templateCode: "T0017",
      html: html
    }
    axios.post(environment.sendEmailBooking,obj)
    .then(response => (response.status===200? alert("Success") : alert("Failed")));
    // window.print();
  };
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
            // localStorage.setItem(
            //   "ticketConfirm",
            //   JSON.stringify(response.data)
            // );
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
                        onClick={handleEmail}
                        data-abc="true"
                      >
                        <i className="fa fa-envelope"></i>
                        <span className="ms-1">Email</span>
                      </Link>
                    </span>
                  </div>
                  <div className="card-body" ref={componentRef} id="sendEmailDiv">
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
                          <td className="bg-light">26/05/2022 06:01:00</td>
                          <td>Triplover Ref:</td>
                          <td className="bg-light">
                            <strong>
                              {" "}
                              TLL-{bookData.data?.item1.bookingRefNumber}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <th>Issue Before:</th>
                          <td className="bg-light">
                            <strong>
                              {bookData.data?.item1.ticketingTimeLimit}
                            </strong>
                          </td>
                          <td>PNR</td>
                          <td className="bg-light">
                            <strong>{bookData.data?.item1.pnr}</strong>
                          </td>
                        </tr>
                        {/* <tr>
                          <th>Extend Time Limit:</th>
                          <td className="bg-light">
                            <strong>
                              {bookData.data?.item1.ticketingTimeLimit}
                            </strong>
                          </td>
                          <td>Airline PNR:</td>
                          <td className="bg-light">
                            <strong>
                              {bookData.data?.item1.airlinesPNR[0]}
                            </strong>
                          </td>
                        </tr> */}
                        <tr>
                          <th>Booking Status:</th>
                          <td className="bg-light">
                            <strong>
                              {bookData.data?.item1.bookingStatus}
                            </strong>
                          </td>
                          <td>Booked By:</td>
                          <td className="bg-light">
                            <strong>
                              {sessionStorage.getItem("agentName")}
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
                                  {moment(item.dateOfBirth).format(
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
                      {/* <p className="bg-dark p-2">
                        PASSENGER DETAILS
                      </p> */}
                      <table className="table table-bordered table-sm">
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
                              return(
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
                                  </span>
                                </td>
                                <td>
                                  {moment(item.arrival).format(
                                    "DD-MMMM-yyyy hh:mm:ss"
                                  )}
                                </td>
                                <td>{item.fareBasisCode}</td>
                                <td>{item.serviceClass}</td>
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
                                      </span>
                                    </td>
                                    <td>
                                      {moment(item.arrival).format(
                                        "DD-MMMM-yyyy hh:mm:ss"
                                      )}
                                    </td>
                                    <td>{item.fareBasisCode}</td>
                                    <td>Economy</td>
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
                      <table className="table table-bordered table-sm">
                        <thead>
                          <tr>
                            <th colspan="3" className="fw-bold py-2 bg-light">
                              CONTACT DETAILS
                            </th>
                          </tr>
                          <tr className="text-center">
                            <th>DEPARTS</th>
                            <th></th>
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
                                      <td></td>
                                      <td>
                                        {item.contactInfo.phoneCountryCode +
                                          item.contactInfo.phone}{" "}
                                      </td>
                                    </tr>
                                    <tr key={index}>
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
                                        {/* {bookData.data?.item1.flightInfo.dirrections[0][0].from} */}
                                      </td>
                                      <td></td>
                                      <td>
                                        {item.contactInfo.phoneCountryCode +
                                          item.contactInfo.phone}{" "}
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
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
                                      <td></td>
                                      <td>
                                        {item.contactInfo.phoneCountryCode +
                                          item.contactInfo.phone}{" "}
                                      </td>
                                    </tr> */}
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
                        className="btn button-color text-white fw-bold w-25 mt-2 rounded"
                        onClick={handleGenarateTicket}
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
