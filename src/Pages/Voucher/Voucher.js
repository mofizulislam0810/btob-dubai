import React, { useEffect, useRef, useState } from "react";
import Footer from "../SharePages/Footer/Footer";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import axios from "axios";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import { useLocation } from "react-router-dom";
import tllLogo from "../../../src/images/logo/logo-combined.png";
import ReactToPrint from "react-to-print";
const Voucher = () => {
  let [ticketingList, setTicketingList] = useState([]);
  let [passengerList, setPassengerList] = useState([]);
  let [agentInfo, setAgentInfo] = useState([]);
  const location = useLocation();
  const componentRef = useRef();
  console.log(location);
  const getAgentInfo = async () => {
    const response = await axios.get(
      environment.agentInfo,
      environment.headerToken
    );
    console.log(response);
    setAgentInfo(response.data);
  };
  const handleGetList = () => {
    const getTicketingList = async () => {
      let sendObj = { uniqueTransID: location.search.split("=")[1] };
      console.log(sendObj);
      const response = await axios.post(
        environment.getTicketingList,
        sendObj,
        environment.headerToken
      );
      setTicketingList(response.data.data);
      handleGetPassengerList(
        response.data.data[0].passengerIds,
        response.data.data[0].uniqueTransID
      );
    };
    getTicketingList();
  };
  const handleGetPassengerList = (ids, trid) => {
    const getPassengerList = async () => {
      const response = await axios.get(
        environment.passengerListByIds + "/" + ids + "/" + trid,
        environment.headerToken
      );
      passengerList = response.data;
      setPassengerList(response.data);
      console.log(passengerList);
    };
    getPassengerList();
  };
  useEffect(() => {
    handleGetList();
    getAgentInfo()
  }, []);
  const print = () => {
    window.print();
  };
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <section className="content">
          <div className="container mt-3">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="fw-bold text-center bg-white text-dark p-2">
                  Voucher
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
                        >
                          Download
                        </a>
                      </li>
                    </ul>
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
                                    style={{ width: "300px", height: "50px" }}
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
                              <td>TLL-220101987654</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">FLIGHT TYPE</td>
                              <td>Internation</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">JOURNEY TYPE</td>
                              <td>{ticketingList[0]?.journeyType}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">STATUS</td>
                              <td>Confirm</td>
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
                    
                  </div> */}
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

export default Voucher;
