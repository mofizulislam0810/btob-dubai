import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../SharePages/Footer/Footer";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import axios from "axios";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import tllLogo from "../../../src/images/logo/logo-combined.png";
import produce from "immer";
const Invoice = () => {
  let [ticketingList, setTicketingList] = useState([]);
  let [passengerList, setPassengerList] = useState([]);
  let [passengerListEdited, setPassengerListEdited] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [totalPriceEdited, setTotalPriceEdited] = useState(0);
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
      let passengerTempList = [];
      let totalPriceTemp = 0;
      response.data.map((item, index) => {
        //  const passengerTemp={uniqueTransID:item.uniqueTransID,title:item.title,first:item.first,middle:item.middle,last:item.last,ticketNumbers:item.ticketNumbers,passengerType:item.passengerType,basePrice:item.basePrice,tax:item.tax,discount:item.discount,agentAdditionalPrice:item.agentAdditionalPrice,totalPrice:item.totalPrice}
        // passengerTempList.push(passengerTemp);
        totalPriceTemp += item.totalPrice;
      });
      setTotalPrice(totalPriceTemp);
      setPassengerListEdited(response.data);
      console.log(passengerTempList);
    };
    getPassengerList();
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
        alert("Thanks! data updated successfully..");
        handleGetList();
      }
    };
    postPassengerList();
  };

  useEffect(() => {
    handleGetList();
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
      {/* <div className="container mt-3">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="fw-bold text-center bg-primary p-2">Invoice</h4>
          </div>
        </div>
      </div> */}
      <div className="container mt-3 pb-5 py-2">
        <div id="ui-view" data-select2-id="ui-view">
          <div>
            <div className="card box-shadow">
              <div className="card-header">
                <span className="ms-3">
                  PNR :&nbsp;
                  {ticketingList.length > 0 ? ticketingList[0]?.pnr : ""}
                  <strong> </strong>
                </span>

                <ul id="menu-standard">
                  <li id="menu-item">
                    <a
                      href="javascript:void(0)"
                      className="btn btn-sm btn-secondary float-right mr-1 d-print-none"
                      onClick={print}
                    >
                      <span className="me-1">
                                <i className="fa fa-print"></i>
                      </span>
                      Print
                    </a>
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
                    <a href="javascript:void(0)" className="btn btn-sm btn-secondary float-right mr-1 d-print-none">
                      Download
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <h4>INVOICE</h4>
                </div>
                <div className="row">
                  <div className="col-md-8">
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
                  </div>
                  <div className="col-md-4 text-right">
                    {ticketingList.length > 0 ? (
                      <>
                        <strong>{ticketingList[0].agentName}</strong>
                        <br />
                        <span>{ticketingList[0].agentAddress}</span>
                        <br />
                        <span>{ticketingList[0].agentMobileNo}</span>
                        <br />
                        <span>{ticketingList[0].agentEmail}</span>
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-md-2">
                    <strong>Customer :</strong>
                  </div>
                  <div className="col-md-4">
                    {ticketingList.length > 0 ? (
                      <>
                        <strong>{ticketingList[0].bookedByName}</strong> <br />
                        {ticketingList[0].bookedByEmail}
                        <br />
                        {ticketingList[0].bookedByMobile}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-6 text-right">
                    Date: 22-04-2022
                    <br />
                    Invoice Number: 22042022
                    <br />
                    Invoice Date: 22-04-2022
                    <br />
                  </div>
                </div>

                <br />
                <table className="table table-bordered">
                  <thead style={{ background: "white", color: "black" }}>
                    <tr>
                      <td colSpan={11}>Flights:</td>
                    </tr>
                    <tr>
                      <td>Booked on</td>
                      <td colSpan={4}>Details</td>
                      <td>Price</td>
                    </tr>
                  </thead>
                  <tbody>
                    {passengerList.map((item, index) => {
                      return (
                        <>
                          <tr>
                            <th rowSpan={3}>
                              {ticketingList.length > 0
                                ? moment(ticketingList[0].bookingDate).format(
                                    "DD-MMMM-yyyy"
                                  )
                                : ""}
                              <br />
                              {ticketingList.length > 0
                                ? ticketingList[0].uniqueTransID
                                : ""}
                              <br />
                            </th>
                            <th colSpan={4}>
                              {ticketingList.length > 0
                                ? ticketingList[0].airlineName
                                : ""}
                              , &nbsp;{" "}
                              {ticketingList.length > 0
                                ? ticketingList[0].origin +
                                  "-" +
                                  ticketingList[0].origin
                                : ""}
                            </th>
                            <th className="text-end" rowSpan={3}>{item.totalPrice}</th>
                          </tr>
                          <tr>
                            <th>Ticket No</th>
                            <th>Passenger</th>
                            <th>Travel Class</th>
                          </tr>
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
                              {ticketingList.length > 0
                                ? ticketingList[0].cabinClass
                                : ""}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    <tr>
                      <td className="fw-bold" colSpan={11} style={{ textAlign: "right" }}>
                        Total:  BDT {totalPrice}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={11}>Remarks:</td>
                    </tr>
                  </tfoot>
                </table>
                <div className="row">
                  <strong>Terms & Conditions :</strong>
                  <span>
                    This is a computer generated statement ,hence does not
                    require any signature
                  </span>
                  <span>
                    * Refunds & Cancellations are subject to Airline's approval.
                  </span>
                  <span>
                    * Kindly check all details carefully to avoid unnecessary
                    complications.
                  </span>
                  <span>* CHEQUE : drawn in favour of Triplover Limited</span>
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
                                    v[index].basePrice = Number(e.target.value);
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
                                    v[index].discount = Number(e.target.value);
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
                          item.basePrice + item.tax + item.ait + item.discount;
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
    </div>
  );
};

export default Invoice;
