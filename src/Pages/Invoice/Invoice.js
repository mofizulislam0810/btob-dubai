import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../SharePages/Footer/Footer";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import axios from "axios";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import tllLogo from "../../../src/images/logo/logo-combined.png";
import produce from "immer";
import { ToastContainer, toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Heading, Icon, Text } from "@chakra-ui/react";
import { GoPrimitiveDot } from 'react-icons/go'
import invoiceLogo from '../../images/invoice.png';


const Invoice = () => {
  let [ticketingList, setTicketingList] = useState([]);
  let [passengerList, setPassengerList] = useState([]);
  let [passengerListEdited, setPassengerListEdited] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [totalPriceEdited, setTotalPriceEdited] = useState(0);
  // let s3URL = "https://fstuploaddocument.s3.ap-southeast-1.amazonaws.com/";
  // let staticURL ="wwwroot/Uploads/Support/";
  const location = useLocation();

  const table = {
    backgroundColor: 'gray'
  }
  let [agentInfo, setAgentInfo] = useState([]);
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
        toast.success("Thanks! data updated successfully..");
        handleGetList();
      }
    };
    postPassengerList();
  };

  useEffect(() => {
    handleGetList();
    getAgentInfo();
  }, []);
  const print = () => {
    window.print();
  };

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
    pdf.save("invoice_triplover.pdf");

  }

  console.log(ticketingList);
  // console.log(passengerList);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <ToastContainer position="bottom-right" autoClose={1500} />
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
                          className="btn btn-sm btn-secondary float-right mr-1 d-print-none rounded"
                          onClick={print}
                        >
                          <span className="me-1">
                            <i className="fa fa-print"></i>
                          </span>
                          Print
                        </a>
                      </li>

                    </ul>
                  </div>
                  <div className="card-body pt-5" ref={donwloadRef}>
                    {/* <div className="row text-center">
                      <h4 className="pb-2">INVOICE</h4>
                    </div> */}


                    <div className='d-flex' style={{ justifyContent: 'space-between', marginBottom: '8px', }}>
                      <div className="text-start ">
                        {ticketingList.length > 0 ? (
                          <>
                            {ticketingList[0].agentLogo !== null &&
                              ticketingList[0].agentLogo !== "" ? (
                              <img
                                alt="img01"
                                src={
                                  environment.s3URL + `${ticketingList[0].agentLogo}`
                                }
                                style={{ width: "150px" }}
                              ></img>
                            ) : (
                              <>
                                <img
                                  alt="img01"
                                  className="p-2"
                                  src={tllLogo}
                                  style={{ width: "150px" }}
                                ></img>
                              </>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div style={{ position: "absolute", right: 0, marginTop: '20px', color: 'white', width: '246px', height: '50px', borderRadius: '10px 0px 0px 10px', }}>
                        <img src={invoiceLogo}/>
                      </div>
                    </div>



                    {/* <table class="table table-borderless table-sm">
                      <tbody>
                        <tr>
                          <td className="text-start bg-white">
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


                          <td className="text-end bg-white">
                            <address>
                              <span className="fw-bold fs-6">
                                First Trip Ltd.
                              </span>
                              <br />
                              <div
                                className="mt-2"
                                style={{ fontSize: "10px", lineHeight: "12px" }}
                              >
                                39 Sharif Plaza, Kemal Ataturk
                                <br />
                                Avenue, Banani, Dhaka 1213<br></br>
                                Phone: 09613123123<br></br>
                                Email: support@firsttrip.com
                              </div>
                            </address>
                          </td>
                        </tr>
                      </tbody>
                    </table> */}

                    <Box display={'flex'} justifyContent='space-between'>
                      <Box mt={'10px'}>
                        <Text fontWeight={700} fontSize='15px'>First Trip Ltd.</Text>
                        <Text fontWeight={600} fontSize='13px'>
                          39 Sharif Plaza, kemal Ataturk,<br />
                          Avenue, Banani, Dhaka 1213<br />
                          Contact No : 09613123123<br />
                          Email : support@firsttrip.com<br />
                        </Text>
                      </Box>

                      <Box mr={'55px'} >
                        <Text fontWeight={700} fontSize='15px'>Customer Details-</Text>
                        <Text fontWeight={600} fontSize='13px'>{agentInfo.name}</Text>
                        <Text fontWeight={600} fontSize='13px'>{agentInfo.address}</Text>
                        <Text fontWeight={600} fontSize='13px'>Contact No: {agentInfo.mobileNo}</Text>
                        <Text fontWeight={600} fontSize='13px'>Email: {agentInfo.email}</Text>
                      </Box>

                    </Box>

                    <Box display={'flex'} justifyContent='space-between' mt={'15px'} mb='10px'>
                      <Text fontSize='15px'><b>Receipt No:</b>{ticketingList[0]?.tnxNumber}</Text>
                      <Text fontSize='15px' mr={'70px'} ><b>Date :</b> {moment(ticketingList[0]?.issueDate).format("DD-MMM-yyyy")}</Text>
                    </Box>




                    {/* <table
                      class="table table-borderless table-sm"
                      style={{ fontSize: "10px", lineHeight: "8px" }}
                    >
                      <tbody>
                        <tr className="d-flex">
                          <td className="bg-white" style={{ width: "70%" }}>

                          </td>
                          <td className="bg-white" style={{ width: "30%" }}>
                            <tr>
                              <td
                                className="text-end fw-bold"

                              >
                                Invoice Number<span className="mx-2">:</span>
                              </td>
                              <td className="text-end" style={{ width: "7%" }}>
                                {ticketingList[0]?.tnxNumber}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="text-end fw-bold"

                              >
                                Invoice Date<span className="mx-2">:</span>
                              </td>
                              <td className="text-end" style={{ width: "7%" }}>
                                {moment(ticketingList[0]?.issueDate).format("DD-MMM-yyyy")}
                              </td>
                            </tr>
                          </td>
                        </tr>
                      </tbody>
                    </table> */}

                    {/* <div className="row">
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
                </div> */}

                    <table className="table table-bordered table-sm my-4" style={{ fontSize: "14px" }}>
                      <thead className="fw-bold text-dark">
                        {/* <tr>
                      <td colSpan={11}>Flights</td>
                    </tr> */}
                        <tr>
                          <td>Booked on</td>
                          <td colSpan={4}>Details</td>
                          <td className="text-end">Price</td>
                        </tr>
                      </thead>
                      <tbody>
                        {passengerList.map((item, index) => {
                          return (
                            <>
                              <tr>
                                <th rowSpan={3} className="align-middle">
                                  {/* {ticketingList.length > 0
                                ? ticketingList[0].uniqueTransID
                                : ""}
                             
                              <br /> */}
                                  {ticketingList.length > 0
                                    ? moment(ticketingList[0].bookingDate).format(
                                      "DD-MMMM-yyyy"
                                    )
                                    : ""}
                                  <br />
                                </th>
                                <th colSpan={4}>
                                  {ticketingList.length > 0
                                    ? ticketingList[0].airlineName
                                    : ""}
                                  , &nbsp;
                                  {ticketingList.length > 0
                                    ? ticketingList[0].origin +
                                    " - " +
                                    ticketingList[0].destination
                                    : ""}
                                </th>
                                <th className="text-end align-middle" rowSpan={3}>{item.totalPrice.toLocaleString("en-US")}</th>
                              </tr>
                              <tr>
                                <th>Ticket No</th>
                                <th>PNR</th>
                                <th>Passenger</th>
                                {/* <th>Travel Class</th> */}
                              </tr>
                              <tr>
                                <td>{item.ticketNumbers}</td>
                                <td>{ticketingList.length > 0 ? ticketingList[0]?.pnr : ""}</td>
                                <td>
                                  {item.title +
                                    " " +
                                    item.first +
                                    " " +
                                    item.middle +
                                    " " +
                                    item.last}
                                </td>
                                {/* <td>
                              {ticketingList.length > 0
                                ? ticketingList[0].cabinClass
                                : ""}
                            </td> */}
                              </tr>
                            </>
                          );
                        })}
                        <tr>
                          <td className="fw-bold" colSpan={11} style={{ textAlign: "right" }}>
                            Total:  BDT {totalPrice.toLocaleString("en-US")}
                          </td>
                        </tr>
                      </tbody>
                      {/* <tfoot>
                    <tr>
                      <td colSpan={11}>Remarks:</td>
                    </tr>
                  </tfoot> */}
                    </table>
                    <div className="container pb-5 mt-2">
                      <div class="row text-start">
                        <b className="p-0" style={{ color: '#9F55CA', fontSize: '18px' }}>Terms & Conditions :</b>
                        <ul style={{ fontSize: "13px", fontWeight: '' }}>
                          <li>
                            <Icon as={GoPrimitiveDot} style={{ color: '#9F55CA' }} />{' '}
                            This is a computer generated statement, hence does not
                            require any signature.
                          </li>
                          <li>
                            <Icon as={GoPrimitiveDot} style={{ color: '#9F55CA' }} />
                            {" "}
                            Refunds & Cancellations are subject to Airline's
                            approval.
                          </li>
                          <li>
                            <Icon as={GoPrimitiveDot} style={{ color: '#9F55CA' }} />{' '}
                            Kindly check all details carefully to avoid unnecessary
                            complications.
                          </li>
                        </ul>
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
      <Footer />
    </div>
  );
};

export default Invoice;
