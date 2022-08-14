import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import flightoneway from "../../JSON/flightoneway.json";
import $ from "jquery";
import logo from "../../images/logo/logo-combined.png";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import airports from "../../JSON/airports.json";
import moment from "moment";
import "./Proposal.css";
import axios from "axios";
import { environment } from "../SharePages/Utility/environment";

const Proposal = () => {
  let defaultPriceList=[];
  let flightList = JSON.parse(sessionStorage.getItem("checkList"));
  console.log(flightList);
  flightList.map((item, index) => {
    console.log(item.bookingComponents[0].totalPrice)
    defaultPriceList.push(item.bookingComponents[0].totalPrice);
  });

  const ImageUrlD = `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightList[0].directions[0][0].platingCarrierCode}.png`;
  const ImageUrlR =
    flightList[0].directions[1] !== undefined
      ? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightList[0].directions[1][0].platingCarrierCode}.png`
      : ``;
  useEffect(() => {
    // $(function () {
    //   //Add text editor
    //   $("#compose-textarea").summernote({
    //     airMode: true,
    //   });
    // });

    flightList.map((item, index) => {
      // console.log(item.bookingComponents[0].totalPrice)
      // defaultPriceList.push(item.bookingComponents[0].totalPrice);
      // console.log(defaultPriceList)
      $(document).ready(function () {
        $("#flightId" + index).attr("style", "background:#ed5c2b");
        $("#baggageId" + index).attr("style", "background:#02046a");
        $("#changeId" + index).attr("style", "background:#02046a");
        $("#fareId" + index).attr("style", "background:#02046a");
      });

      $("#flightId" + index).click(function () {
        $("#flightId" + index).attr("style", "background:#ed5c2b");
        $("#baggageId" + index).attr("style", "background:#02046a");
        $("#changeId" + index).attr("style", "background:#02046a");
        $("#fareId" + index).attr("style", "background:#02046a");
      });

      $("#baggageId" + index).click(function () {
        $("#flightId" + index).attr("style", "background:#02046a");
        $("#baggageId" + index).attr("style", "background:#ed5c2b");
        $("#changeId" + index).attr("style", "background:#02046a");
        $("#fareId" + index).attr("style", "background:#02046a");
      });

      $("#changeId" + index).click(function () {
        $("#flightId" + index).attr("style", "background:#02046a");
        $("#baggageId" + index).attr("style", "background:#02046a");
        $("#changeId" + index).attr("style", "background:#ed5c2b");
        $("#fareId" + index).attr("style", "background:#02046a");
      });

      $("#fareId" + index).click(function () {
        $("#flightId" + index).attr("style", "background:#02046a");
        $("#baggageId" + index).attr("style", "background:#02046a");
        $("#changeId" + index).attr("style", "background:#02046a");
        $("#fareId" + index).attr("style", "background:#ed5c2b");
      });

      $("#flight" + index).show();
      $("#baggage" + index).hide();
      $("#cancel" + index).hide();
      $("#fare" + index).hide();

      $("#flightId" + index).click(function () {
        $("#flight" + index).show();
        $("#baggage" + index).hide();
        $("#cancel" + index).hide();
        $("#fare" + index).hide();
      });
      $("#baggageId" + index).click(function () {
        $("#flight" + index).hide();
        $("#baggage" + index).show();
        $("#cancel" + index).hide();
        $("#fare" + index).hide();
      });
      $("#changeId" + index).click(function () {
        $("#flight" + index).hide();
        $("#baggage" + index).hide();
        $("#cancel" + index).show();
        $("#fare" + index).hide();
      });
      $("#fareId" + index).click(function () {
        $("#flight" + index).hide();
        $("#baggage" + index).hide();
        $("#cancel" + index).hide();
        $("#fare" + index).show();
      });

      $("#passengerBrackdown" + index).hide();
      $("#priceDown" + index).click(function () {
        $("#passengerBrackdown" + index).toggle("slow");
      });

      $("#balanceInput"+index).hide();
      $("#right"+index).hide();
      $("#edit"+index).click(function(){
        $("#balanceInput"+index).show();
        $("#right"+index).show();
        $("#balance"+index).hide();
        $("#edit"+index).hide();
      })
      $("#right"+index).click(function(){
        $("#balanceInput"+index).hide();
        $("#right"+index).hide();
        $("#balance"+index).show();
        $("#edit"+index).show();
      })
      
      // $("#singleInput"+index).hide();
      // $("#edit"+index).click(function(){
      //   $("#singleInput"+index).toggle("slow");
      // })

      // $("#submit"+index).click(function(){
      //   $("#singleInput"+index).hide("slow");
      // })

      
      // $('#downloadPdf'+index).click(function(){
      //   const doc = new jsPDF();

      //   //get table html
      //   const pdfTable = document.getElementById("proposalPrint");
      //   //html to pdf format
      //   var html = htmlToPdfmake(pdfTable.innerHTML);

      //   const documentDefinition = { content: html };
      //   pdfMake.vfs = pdfFonts.pdfMake.vfs;
      //   pdfMake.createPdf(documentDefinition).open();
      //   pdfMake.createPdf(documentDefinition).download();
      // })
    });

    $("#emailSection").hide();
    $("#preparemail").click(function () {
      $("#emailSection").toggle("slow");
    });
    $("#discard").click(function () {
      $("#emailSection").hide("slow");
    });
  }, []);

  console.log(defaultPriceList);

  const printDocument = () => {
    // var doc = new jsPDF("p", "pt", "a4");
    // doc.html(document.querySelector("#proposalPrint")).save("mypdf.pdf");
    const doc = new jsPDF();

    //get table html
    const pdfTable = document.getElementById("proposalPrint");
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
    pdfMake.createPdf(documentDefinition).download();
  };
  
  const [singleValue,setSingleValue] = useState(defaultPriceList);
  const [inputIncreaseValue,setInputIncreaseValue] = useState();
  const [inputDecreaseValue,setInputDecreaseValue] = useState();
  const [addBalance,setAddBalance] = useState(0);
  const [decBalance,setDecBalance] = useState(0);
  const [messageData, setMessageData] = useState({});


  const handleOnBlur = (e) => {
    const html = document.getElementById("proposalPrint").innerHTML;
    const attachment = '';
    const field = e.target.name;
    const value = e.target.value;
    const newMessageData = { ...messageData,attachment,html };
    newMessageData[field] = value;
    setMessageData(newMessageData);
    // console.log(messageData);
  };

 const handleMessageUser = (e) =>{
  //  console.log(pdfTable);
  axios.post(environment.sendEmailProposal,messageData)
  .then(response => (response.status===200? alert("Success") : alert("Failed")));
   console.log(messageData)
   e.preventDefault();
 }

  const handleIncreaseChange = (e) =>{
    setInputIncreaseValue(e.target.value)
  }
  
  const handleDecreaseChange = (e) =>{
    setInputDecreaseValue(e.target.value)
  }

  const handleIncreaseClick = () =>{
    setAddBalance(parseInt(addBalance)+parseInt(inputIncreaseValue));
    setInputIncreaseValue('');
  }

  const handleDecreaseClick = () =>{
    setDecBalance(parseInt(decBalance)+parseInt(inputDecreaseValue));
    setInputDecreaseValue('');
  }

  const handleSingleValue = (value,index) =>{
    // const value = e.target.value;
    // console.log(value);
    const singleValueList = [...singleValue];
    singleValueList[index]=value;
    setSingleValue(singleValueList);
  }
  console.log(singleValue);
// console.log(addBalance);
// console.log(inputIncreaseValue);
// console.log(singleValue);

  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <section className="content">
          <div
            className="container my-3"
            style={{ maxWidth: "1265px" }}
            id="emailSection"
          >
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary card-outline">
                  <div className="card-header">
                    <h3 className="card-title">Compose New Message</h3>
                  </div>
                  {/* <!-- /.card-header --> */}
                  <form onSubmit={handleMessageUser}>
                  <div className="card-body">
                    <div className="form-group">
                      <input className="form-control" name="to" onBlur={handleOnBlur} placeholder="To:" />
                    </div>
                    <div className="form-group">
                      <input className="form-control" name="subject" onBlur={handleOnBlur} placeholder="Subject:" />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="body"
                        onBlur={handleOnBlur}
                        className="form-control"
                        placeholder="Message: "
                        style={{ height: "300px" }}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <div className="btn btn-default btn-file">
                        <i className="fas fa-paperclip"></i> Attachment
                        <input type="file" name="attachment" onBlur={handleOnBlur} disabled/>
                      </div>
                      <p className="help-block">Max. 32MB</p>
                    </div>
                  </div>
                  {/* <!-- /.card-body --> */}
                  <div className="card-footer">
                    <div className="float-right">
                      {/* <button type="button" className="btn btn-default">
                        <i className="fas fa-pencil-alt"></i> Draft
                      </button> */}
                      <button type="submit" className="btn btn-primary">
                        <i className="far fa-envelope"></i> Send
                      </button>
                    </div>
                    {/* <button
                      type="reset"
                      className="btn btn-default"
                      id="discard"
                    >
                      <i className="fas fa-times"></i> Discard
                    </button> */}
                  </div>
                  </form>
                  {/* <!-- /.card-footer --> */}
                </div>
                {/* <!-- /.card --> */}
              </div>
            </div>
          </div>
          <div className="container my-3" style={{ maxWidth: "1265px" }}>
            <div className="row">
              {/* <!-- left column section --> */}
              <div className="col-lg-3 my-3">
                {/* <!-- Stop section --> */}

                <div className="rounded box-shadow bg-white p-3">
                  <input className="form-control mt-2" name="increase" type="number" value={inputIncreaseValue} onChange={handleIncreaseChange} placeholder="Enter price"/>
                  <button
                    className="btn button-color fw-bold text-white w-100 mt-2" onClick={handleIncreaseClick}
                  >
                    Increase
                  </button>
                  <input className="form-control mt-2" name="decrease" type="number" value={inputDecreaseValue} onChange={handleDecreaseChange} placeholder="Enter price"/>
                  <button
                    className="btn button-color fw-bold text-white w-100 mt-2" onClick={handleDecreaseClick}
                  >
                    Decrease
                  </button>
                  <button
                    className="btn button-color fw-bold text-white w-100 mt-2"
                    id="preparemail"
                  >
                    PREPARE MAIL
                  </button>
                  <button
                    className="btn button-color fw-bold text-white w-100 mt-2"
                    id="downloadPdf"
                    onClick={printDocument}
                  >
                    Download
                  </button>
                  {/* <div className="col-lg-12 m-3">
                    <button className="btn button-color fw-bold text-white w-100">PREPARE MAIL</button>
                    </div> */}
                </div>
              </div>
              {/* <!-- end left column section --> */}

              {/* <!-- right column section --> */}
              <div className="col-lg-9">
                {flightList.length > 0 ? (
                  flightList.map((item, index) => (
                    <>
                      <div className="row my-3 py-2 rounded box-shadow bg-white">
                        <div className="col-lg-8">
                          {/* <!-- up flight section --> */}
                          <div className="row p-2">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${item.directions[0][0].platingCarrierCode}.png`}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-3 my-auto">
                              <p className="my-auto fw-bold">
                                {item.platingCarrierName}
                              </p>
                              <p className="my-auto">
                                {
                                  item.directions[0][0].segments[0].details[0]
                                    .equipment
                                }
                              </p>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <span className="fw-bold">
                                {item.directions[0][0].segments[0].departure.substr(
                                  11,
                                  5
                                )}
                              </span>
                              <p className="my-auto">
                                {item.directions[0][0].from}
                              </p>
                            </div>
                            <div className="col-lg-6 my-auto">
                              <div className="row">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color fw-bold font-size">
                                    {item.directions[0][0].stops === 0
                                      ? "Direct"
                                      : item.directions[0][0].stops + " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    ------------------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {
                                        item.directions[0][0].segments[0]
                                          .duration[0]
                                      }
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <span className="fw-bold">
                                {item.directions[0][0].segments[
                                  item.directions[0][0].segments.length - 1
                                ].arrival.substr(11, 5)}
                              </span>
                              <p className="my-auto">
                                {item.directions[0][0].to}
                              </p>
                            </div>
                          </div>
                          <span className="px-3 text-color">
                            <i class="fas fa-chair me-1"></i>{" "}
                            {item.directions[0][0].segments[0].bookingCount}(
                            {item.directions[0][0].segments[0].bookingClass}){" "}
                          </span>
                          <span className="text-color">
                            <span className="text-color briefcase">
                              {" "}
                              <i className="fas fa-briefcase fa-sm"></i>
                            </span>

                            <div className="box">
                              {" "}
                              <table
                                className="table table-bordered table-sm"
                                style={{ fontSize: "12px" }}
                              >
                                <thead className="text-center thead text-white fw-bold">
                                  <tr>
                                    <th>Route</th>
                                    <th>Baggage</th>
                                    {/* <th>Taxes</th>
                                        <th>AIT</th>
                                        <th>Gross Fare</th>
                                        <th>Discount</th>
                                        <th>Pax</th>
                                        <th>Total Pax Fare</th> */}
                                  </tr>
                                </thead>
                                <tbody className="text-center">
                                  <tr>
                                    <td className="left">
                                      {item.directions[0][0].from}-
                                      {item.directions[0][0].to}
                                    </td>
                                    <td className="left">
                                      ADT :{" "}
                                      <span className="ms-1 font-size">
                                        {item.directions[0][0].segments[0]
                                          .baggage[0].amount +
                                          " " +
                                          item.directions[0][0].segments[0]
                                            .baggage[0].units}
                                      </span>
                                    </td>
                                    {/* <td className="center">{passengerFares.adt.taxes}</td>
                    <td className="right">10</td>
                    <td className="right">
                      {passengerFares.adt.basePrice +
                        passengerFares.adt.taxes +
                        10}
                    </td>
                    <td className="right">190</td>
                    <td className="right">1</td>
                    <td className="right">
                      {passengerFares.adt.basePrice +
                        passengerFares.adt.taxes +
                        10 -
                        190}{" "}
                      BDT
                    </td> */}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </span>
                          {/* <!-- end of up flight section --> */}
                          {/* <!-- return fight section --> */}
                          {item.directions[1] !== undefined ? (
                            <>
                              <div className="row p-2">
                                <div className="col-lg-1 my-auto">
                                  <img
                                    src={ImageUrlR}
                                    alt=""
                                    width="40px"
                                    height="40px"
                                  />
                                </div>
                                <div className="col-lg-3 my-auto">
                                  <p className="my-auto fw-bold">
                                    {item.platingCarrierName}
                                  </p>
                                  <p className="my-auto">
                                    {
                                      item.directions[1][0].segments[0]
                                        .details[0].equipment
                                    }
                                  </p>
                                </div>
                                <div className="col-lg-1 my-auto">
                                  <span className="fw-bold">
                                    {item.directions[1][0].segments[0].departure.substr(
                                      11,
                                      5
                                    )}
                                  </span>
                                  <p className="my-auto">{item.from}</p>
                                </div>
                                <div className="col-lg-6 my-auto">
                                  <div className="row">
                                    <div className="col-lg-12 text-center">
                                      <span className="text-color fw-bold font-size">
                                        {item.directions[1][0].stops === 0
                                          ? "Direct"
                                          : item.directions[1][0].stops +
                                            " Stop"}
                                      </span>
                                    </div>
                                    <div className="col-lg-12 text-center">
                                      <span className="text-color">
                                        ------------------------------
                                        <i className="fas fa-plane fa-sm"></i>
                                      </span>
                                    </div>
                                    <div className="col-lg-12 text-center">
                                      <span className="text-color me-5">
                                        <i className="fas fa-clock fa-sm"></i>
                                        <span className="ms-1 font-size">
                                          {" "}
                                          {
                                            item.directions[1][0].segments[0]
                                              .duration[0]
                                          }
                                        </span>
                                      </span>
                                      <span className="text-color">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="ms-1 font-size">
                                          {item.directions[1][0].segments[0]
                                            .baggage[0].amount +
                                            " " +
                                            item.directions[1][0].segments[0]
                                              .baggage[0].units}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-1 my-auto">
                                  <span className="fw-bold">
                                    {item.directions[1][0].segments[
                                      item.directions[1][0].segments.length - 1
                                    ].arrival.substr(11, 5)}
                                  </span>
                                  <p className="my-auto">{item.to}</p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}

                          {/* <!-- end of return flight section --> */}
                        </div>

                        {/* <!-- modal option --> */}
                        <div
                          className="modal fade"
                          id={"exampleModal"+index}
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog"
                            style={{ width: "1250px" }}
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div className="container">
                                  <div className="row">
                                    <div className="col-lg-9">
                                      {/* <!-- up flight section --> */}
                                      <div className="row py-2">
                                        <div className="col-lg-1 my-auto">
                                          <img
                                            src={ImageUrlD}
                                            alt=""
                                            width="40px"
                                            height="40px"
                                          />
                                        </div>
                                        <div className="col-lg-3 my-auto">
                                          <p className="my-auto">
                                            {item.platingCarrierName}
                                          </p>
                                          <p className="my-auto">
                                            {
                                              item.directions[0][0].segments[0]
                                                .details[0].equipment
                                            }
                                          </p>
                                        </div>
                                        <div className="col-lg-1 my-auto">
                                          <span className="fw-bold">
                                            {item.directions[0][0].segments[0].departure.substr(
                                              11,
                                              5
                                            )}
                                          </span>
                                          <p className="my-auto">
                                            {item.directions[0][0].from}
                                          </p>
                                        </div>
                                        <div className="col-lg-6 my-auto">
                                          <div className="row">
                                            <div className="col-lg-12 text-center">
                                              <span className="text-color fw-bold font-size">
                                                {item.directions[0][0].stops ===
                                                0
                                                  ? "Direct"
                                                  : item.directions[0][0]
                                                      .stops + " Stop"}
                                              </span>
                                            </div>
                                            <div className="col-lg-12">
                                              <span className="text-color">
                                                -------------------------------------
                                                <i className="fas fa-plane fa-sm"></i>
                                              </span>
                                            </div>
                                            <div className="col-lg-12 text-center">
                                              <span className="text-color me-5">
                                                <i className="fas fa-clock fa-sm"></i>
                                                <span className="ms-1 font-size">
                                                  {
                                                    item.directions[0][0]
                                                      .segments[0].duration[0]
                                                  }
                                                </span>
                                              </span>
                                              <span className="text-color">
                                                <i className="fas fa-briefcase fa-sm"></i>
                                                <span className="ms-1 font-size">
                                                  {item.directions[0][0]
                                                    .segments[0].baggage[0]
                                                    .amount +
                                                    " " +
                                                    item.directions[0][0]
                                                      .segments[0].baggage[0]
                                                      .units}
                                                </span>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-1 my-auto">
                                          <span className="fw-bold">
                                            {item.directions[0][0].segments[
                                              item.directions[0][0].segments
                                                .length - 1
                                            ].arrival.substr(11, 5)}
                                          </span>
                                          <p className="my-auto">
                                            {item.directions[0][0].to}
                                          </p>
                                        </div>
                                      </div>

                                      {item.directions[1] !== undefined ? (
                                        <>
                                          <div className="row py-2">
                                            <div className="col-lg-1 my-auto">
                                              <img
                                                src={ImageUrlR}
                                                alt=""
                                                width="40px"
                                                height="40px"
                                              />
                                            </div>
                                            <div className="col-lg-3 my-auto">
                                              <p className="my-auto">
                                                {item.platingCarrierName}
                                              </p>
                                              <p className="my-auto">
                                                {
                                                  item.directions[1][0]
                                                    .segments[0].details[0]
                                                    .equipment
                                                }
                                              </p>
                                            </div>
                                            <div className="col-lg-1 my-auto">
                                              <span className="fw-bold">
                                                {item.directions[1][0].segments[0].departure.substr(
                                                  11,
                                                  5
                                                )}
                                              </span>
                                              <p className="my-auto">
                                                {item.directions[1][0].from}
                                              </p>
                                            </div>
                                            <div className="col-lg-6 my-auto">
                                              <div className="row">
                                                <div className="col-lg-12 text-center">
                                                  <span className="text-color fw-bold font-size">
                                                    {item.directions[1][0]
                                                      .stops === 0
                                                      ? "Direct"
                                                      : item.directions[1][0]
                                                          .stops + " Stop"}
                                                  </span>
                                                </div>
                                                <div className="col-lg-12">
                                                  <span className="text-color">
                                                    -------------------------------------
                                                    <i className="fas fa-plane fa-sm"></i>
                                                  </span>
                                                </div>
                                                <div className="col-lg-12 text-center">
                                                  <span className="text-color me-5">
                                                    <i className="fas fa-clock fa-sm"></i>
                                                    <span className="ms-1 font-size">
                                                      {
                                                        item.directions[1][0]
                                                          .segments[0]
                                                          .duration[0]
                                                      }
                                                    </span>
                                                  </span>
                                                  <span className="text-color">
                                                    <i className="fas fa-briefcase fa-sm"></i>
                                                    <span className="ms-1 font-size">
                                                      {item.directions[1][0]
                                                        .segments[0].baggage[0]
                                                        .amount +
                                                        " " +
                                                        item.directions[1][0]
                                                          .segments[0]
                                                          .baggage[0].units}
                                                    </span>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-1 my-auto">
                                              <span className="fw-bold">
                                                {item.directions[1][0].segments[
                                                  item.directions[1][0].segments
                                                    .length - 1
                                                ].arrival.substr(11, 5)}
                                              </span>
                                              <p className="my-auto">
                                                {item.directions[1][0].to}
                                              </p>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {/* <!-- end of up flight section --> */}
                                      {/* <!-- return fight section --> */}
                                      {/* <!-- end of return flight section --> */}
                                    </div>
                                    <div className="col-lg-3 my-auto text-center">
                                      {/* <h6 className="text-end text-color"><del>BDT 9,000</del></h6> */}
                                      <h5 className="text-color">
                                        BDT {item.passengerFares.adt.totalPrice}
                                      </h5>
                                      <p className="text-color fw-bold">
                                        {item.refundable === true
                                          ? "Refundable"
                                          : "Non-Refundable"}
                                      </p>
                                      {/* <button className="btn btn-danger float-end check-price-click">Check
                                                    Price<span className="ms-2"><i className="fa fa-chevron-up rotate-click"
                                                            aria-hidden="true"></i></span></button> */}
                                    </div>
                                  </div>
                                  <div className="m-3 text-center">
                                    <button
                                      className="btn btn-primary mx-1"
                                      type="button"
                                      id={"flightId" + index}
                                    >
                                      Flight itinerary
                                    </button>
                                    <button
                                      className="btn btn-primary mx-1"
                                      type="button"
                                      id={"baggageId" + index}
                                    >
                                      Baggage info
                                    </button>
                                    <button
                                      className="btn btn-primary mx-1"
                                      type="button"
                                      id={"changeId" + index}
                                    >
                                      Cancel & change
                                    </button>
                                    <button
                                      className="btn btn-primary mx-1"
                                      type="button"
                                      id={"fareId" + index}
                                    >
                                      Fare details
                                    </button>
                                  </div>
                                  <div id={"flight" + index}>
                                    <div className="container">
                                      <>
                                        {item.directions[0][0].segments.map(
                                          (seg, index) => (
                                            <div key={index}>
                                              {index === 0 ? (
                                                <div
                                                  className="row mt-4 p-2 border-bottom"
                                                  style={{
                                                    backgroundColor: "	#c5c5c5",
                                                  }}
                                                >
                                                  <div className="col-lg-4">
                                                    <i className="fas fa-plane"></i>
                                                    <span className="d-inline fs-6 fw-bold ms-1">
                                                      Departure,{" "}
                                                      {airports
                                                        .filter(
                                                          (f) =>
                                                            f.iata === seg.from
                                                        )
                                                        .map(
                                                          (item) => item.city
                                                        )}
                                                    </span>
                                                  </div>
                                                  <div className="col-lg-1">
                                                    <i className="fas fa-arrow-right"></i>
                                                  </div>
                                                  <div className="col-lg-4">
                                                    <span className="d-inline fs-6 fw-bold">
                                                      Arrival,{" "}
                                                      {airports
                                                        .filter(
                                                          (f) =>
                                                            f.iata ===
                                                            item
                                                              .directions[0][0]
                                                              .segments[
                                                              item
                                                                .directions[0][0]
                                                                .segments
                                                                .length - 1
                                                            ].to
                                                        )
                                                        .map(
                                                          (item) => item.city
                                                        )}
                                                    </span>
                                                  </div>
                                                  <div className="col-lg-3 fs-6 fw-bold">
                                                    <span>
                                                      Total duration:{" "}
                                                      {seg.duration[0]}
                                                    </span>
                                                  </div>
                                                </div>
                                              ) : (
                                                <></>
                                              )}

                                              <div className="row py-4 pb-2">
                                                <div className="col-lg-1">
                                                  <img
                                                    src={ImageUrlD}
                                                    alt=""
                                                    width="40px"
                                                    height="40px"
                                                  />
                                                </div>
                                                <div className="col-lg-3 d-block">
                                                  <p className="my-auto text-start">
                                                    {seg.airline}
                                                  </p>
                                                  <p className="my-auto text-start">
                                                    {seg.details[0].equipment}
                                                  </p>
                                                  <p className="my-auto text-start">
                                                    {seg.serviceClass}
                                                  </p>
                                                </div>
                                                <div className="col-lg-4">
                                                  <span className="float-start">
                                                    {seg.from}
                                                    <strong className="ms-1">
                                                      {seg.departure.substr(
                                                        11,
                                                        5
                                                      )}
                                                    </strong>
                                                  </span>
                                                  <br></br>
                                                  <span className="float-start">
                                                    <strong>
                                                      {moment(seg.departure)
                                                        .utc()
                                                        .format(
                                                          "DD-MMMM-yyyy, dddd"
                                                        )}
                                                    </strong>
                                                  </span>
                                                  <br></br>
                                                  <h6 className="text-start">
                                                    {/* {airports.filter(f => f.iata === seg.from).map(item=>item.name+", "+item.city)} */}
                                                    {seg.fromAirport}
                                                  </h6>
                                                  {/* <h6 className="float-start">Riyadh, Saudi Arabia</h6> */}
                                                </div>
                                                <div className="col-lg-4">
                                                  <span className="float-start">
                                                    {seg.to}
                                                    <strong className="ms-1">
                                                      {seg.arrival.substr(
                                                        11,
                                                        5
                                                      )}
                                                    </strong>
                                                  </span>
                                                  <br />
                                                  <span className="float-start">
                                                    <strong>
                                                      {moment(seg.arrival)
                                                        .utc()
                                                        .format(
                                                          "DD-MMMM-yyyy, dddd"
                                                        )}
                                                    </strong>
                                                  </span>
                                                  <br></br>
                                                  <h6 className="text-start">
                                                    {/* {airports.filter(f => f.iata === seg.to).map(item=>item.name+", "+item.city)} */}
                                                    {seg.toAirport}
                                                  </h6>
                                                  {/* <h6 className="float-start">
                            Dubai, United Emirates
                          </h6> */}
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </>
                                    </div>
                                  </div>

                                  <div id={"baggage" + index}>
                                    <div className="container">
                                      <div className="row pt-4 pb-2">
                                        <div className="col-lg-8 border-bottom">
                                          <div className="row">
                                            <div className="col-lg-5">
                                              <i className="fas fa-plane"></i>
                                              <span className="d-inline fs-6 fw-bold ms-1">
                                                Departure,{" "}
                                                {airports
                                                  .filter(
                                                    (f) =>
                                                      f.iata ===
                                                      item.directions[0][0]
                                                        .segments[0].from
                                                  )
                                                  .map((item) => item.city)}
                                              </span>
                                            </div>
                                            <div className="col-lg-1">
                                              <i className="fas fa-arrow-right"></i>
                                            </div>
                                            <div className="col-lg-5">
                                              <span className="d-inline fs-6 fw-bold">
                                                Arrival,{" "}
                                                {airports
                                                  .filter(
                                                    (f) =>
                                                      f.iata ===
                                                      item.directions[0][0]
                                                        .segments[
                                                        item.directions[0][0]
                                                          .segments.length - 1
                                                      ].to
                                                  )
                                                  .map((item) => item.city)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row pb-2">
                                        <div className="col-lg-8">
                                          <div className="row my-2">
                                            <div className="col-lg-6">
                                              <span className="float-start">
                                                <i className="fas fa-briefcase fa-sm"></i>
                                              </span>
                                              <span className="d-inline fs-6 float-start ms-1">
                                                Cabin baggage
                                              </span>
                                            </div>
                                            <div className="col-lg-6">
                                              <span className="d-inline fs-6 float-end">
                                                7KG (max 1 Bag)
                                              </span>
                                            </div>
                                          </div>
                                          <div className="row my-2">
                                            <div className="col-lg-6">
                                              <span className="float-start">
                                                <i className="fas fa-briefcase fa-sm"></i>
                                              </span>
                                              <span className="d-inline fs-6 float-start ms-1">
                                                Checked baggage
                                              </span>
                                            </div>
                                            <div className="col-lg-6">
                                              <span className="d-inline fs-6 float-end">
                                                {item.directions[0][0]
                                                  .segments[0].baggage[0]
                                                  .amount +
                                                  " " +
                                                  item.directions[0][0]
                                                    .segments[0].baggage[0]
                                                    .units}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    id={"cancel" + index}
                                    className="text-start p-4"
                                  >
                                    <h6 className="fw-bold">
                                      Refund or Date Change can be done as per
                                      the following policies:
                                    </h6>
                                    <hr></hr>• Refund Amount= Received amount
                                    from customer - Refund Charge (As per
                                    Airline Policy + Triplover Convenience Fee).
                                    <br></br>• Date Change Amount= Date change
                                    fee as per Airline + Difference of fare if
                                    any + Triplover Convenience Fee.
                                  </div>

                                  <div id={"fare" + index}>
                                    <div className="container pb-5 mb-5">
                                      <label htmlFor="" className="fw-bold">
                                        Fare details
                                      </label>
                                      <hr></hr>
                                      <div className="row mt-2">
                                        <div className="col-lg-2">
                                          <h6 className="text-start">Fare</h6>
                                        </div>
                                        <div className="col-lg-8"></div>
                                        <div className="col-lg-2 float-end">
                                          <h6 className="text-end">
                                            {
                                              item.bookingComponents[0]
                                                .totalPrice
                                            }
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-2">
                                          <h6 className="text-start">
                                            Taxes & fees
                                          </h6>
                                        </div>
                                        <div className="col-lg-8"></div>
                                        <div className="col-lg-2 float-end">
                                          <h6 className="text-end">
                                            {item.bookingComponents[0].taxes}
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-2">
                                          <h6 className="text-start">VAT</h6>
                                        </div>
                                        <div className="col-lg-8"></div>
                                        <div className="col-lg-2 float-end">
                                          <h6 className="text-end">BDT 0</h6>
                                        </div>
                                      </div>
                                      <div className="row border-top">
                                        <div className="col-lg-2">
                                          <h6 className="text-start">
                                            Total(incl. VAT)
                                          </h6>
                                        </div>
                                        <div className="col-lg-8"></div>
                                        <div className="col-lg-2 float-end">
                                          <h6 className="text-end">
                                            BDT {item.totalPrice}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end of modal option --> */}

                        {/* <!-- click for flight details modal open option --> */}
                        <div className="col-lg-2 d-flex justify-content-center align-items-center border-end">
                          <a
                            href="#"
                            className="fw-bold text-color fs-6"
                            data-bs-toggle="modal"
                            data-bs-target={"#exampleModal"+index}
                          >
                            Flight Details
                          </a>
                        </div>
                        {/* <!-- end click for flight details modal open option --> */}
                        <div className="col-lg-2 my-auto text-center">
                          {/* <h6 className="text-end text-color"><del>BDT 9,000</del></h6> */}
                          {/* <h5 className="text-color">BDT <input type="number" className="w-50" value={8500} /></h5> */}
                          {/* <div id={"singleInput"+index}> 
                            <input type="number" name={"value"+index} className="form-control" onChange={(e)=>handleSingleValue(e.target.value,index)} style={{height:"25px",width:"135px"}}/>
                          </div> */}
                          <h5 className="text-color d-flex justify-content-center">
                            BDT&nbsp;<span id={"balance"+index}> {parseInt(singleValue[index]??0) + addBalance - decBalance }</span>
                            <input width={70} type="number" id={"balanceInput"+index} name={"value"+index} value={singleValue[index]??0}  onChange={(e)=>handleSingleValue(e.target.value,index)} style={{height:"25px",width:"70px"}}/>
                            <span className="ms-1" id={"edit"+index}><i class="fas fa-edit"></i></span>
                            <span className="ms-1" id={"right"+index}><i class="fas fa-check"></i></span>
                          </h5>
                          <p className="text-color fw-bold">
                            {item.refundable === true
                              ? "Refundable"
                              : "Non-Refundable"}
                          </p>
                          <h6
                            className="text-end fw-bold text-color text-center mt-1"
                            id={"priceDown" + index}
                            style={{ cursor: "pointer" }}
                          >
                            Price Breakdown
                          </h6>
                          {/* <button className="btn button-color  w-100 check-price-click">Check Price</button> */}
                        </div>
                        <div
                          className="table-responsive-sm mt-1"
                          id={"passengerBrackdown" + index}
                        >
                          <hr></hr>
                          <table
                            className="table table-bordered px-3 table-sm"
                            style={{ fontSize: "12px" }}
                          >
                            <thead className="text-center thead text-white fw-bold">
                              <tr>
                                <th>Type</th>
                                <th>Base</th>
                                <th>Taxes</th>
                                <th>AIT</th>
                                <th>Gross Fare</th>
                                <th>Discount</th>
                                <th>Pax</th>
                                <th>Total Pax Fare</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              <tr>
                                <td className="left">ADT</td>
                                <td className="left">
                                  {parseInt(singleValue[index])-item.passengerFares.adt.taxes +parseInt(addBalance) - decBalance}
                                </td>
                                <td className="center">
                                  {item.passengerFares.adt.taxes}
                                </td>
                                <td className="right">{parseInt((parseInt(singleValue[index])-item.passengerFares.adt.taxes)*.003)}</td>
                                <td className="right">
                                  {parseInt(singleValue[index]) +
                                    parseInt((parseInt(singleValue[index])-item.passengerFares.adt.taxes)*.003) + addBalance - decBalance} 
                                </td>
                                <td className="right">190</td>
                                <td className="right">1</td>
                                <td className="right">
                                  {parseInt(singleValue[index]) + addBalance  +
                                    parseInt((parseInt(singleValue[index])-item.passengerFares.adt.taxes)*.003) -
                                    190 - decBalance}{" "}
                                  BDT
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div>
              {/* <!-- end of right column section --> */}
            </div>
          </div>

          <div
            className="container my-3"
            style={{ maxWidth: "1265px" }}
            id={"proposalPrint"}
          >
            {flightList.map((item, index) => (
              <>
                <div className="row" >
                  <div className="card box-shadow">
                    <div className="card-header">
                      {/* <img
                    src={logo}
                    alt="Triplover logo"
                    style={{ width: "100px" }}
                  /> */}
                      <span className="ms-3">
                        Flight Proposal (Please find the flight options as per
                        your request)
                      </span>
                      {/* <Link
                      className="btn btn-sm btn-secondary float-right mr-1 d-print-none"
                      to="#"
                      onClick={print}
                      data-abc="true"
                    >
                      <i className="fa fa-print"></i> Print
                    </Link> */}
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <h5 className="mb-3 fw-bold text-color">
                            <u>Flight Information</u>
                          </h5>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-sm-3">
                          <h5 className="mb-1">From</h5>
                          <div>
                            <strong>
                              {item.directions[0][0].segments[0].fromAirport}
                            </strong>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <h5 className="mb-1">To</h5>
                          <div>
                            <strong>{item.directions[0][0].segments[0].toAirport}</strong>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <h5 className="mb-1">Departure Date</h5>
                          <div>
                            <strong>{moment(item.directions[0][0].segments[0].departure)
                                    .utc()
                                    .format("DD-MMMM-yyyy, dddd")}</strong>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <h5 className="mb-1">Travellers</h5>
                          <div>
                            <strong>1 Persons</strong>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-sm-3">
                          <h5 className="mb-1">Class</h5>
                          <div>
                            <strong>Economy</strong>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <h5 className="mb-1">Baggage Allowance</h5>
                          <div>
                            <strong>{item.directions[0][0].segments[0].baggage[0].amount +
                                  " " +
                                  item.directions[0][0].segments[0].baggage[0].units}</strong>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <h5 className="mb-1">Trip Type</h5>
                          <div>
                            <strong>OneWay</strong>
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive-sm">
                        <p className="bg-dark p-2 fw-bold">FLIGHT DETAILS</p>
                        <table className="table table-striped">
                          <thead className="text-center">
                            <tr>
                              <th>#</th>
                              <th>AirLines</th>
                              <th>Departure</th>
                              <th>Arrival</th>
                              <th>Duration</th>
                              <th>Passenger</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            <tr>
                              <td className="center">1</td>
                              <td className="left">
                              {item.platingCarrierName}<br></br>
                              {
                                  item.directions[0][0].segments[0].details[0]
                                    .equipment
                                }
                              </td>
                              <td className="left">
                              {item.directions[0][0].segments[0].departure.substr(11, 5)}<br></br>
                              {moment(item.directions[0][0].segments[0].departure)
                                    .utc()
                                    .format("DD-MMMM-yyyy, dddd")}
                              </td>
                              <td className="center">
                              {item.directions[0][0].segments[0].arrival.substr(11, 5)}<br></br>
                              {moment(item.directions[0][0].segments[0].arrival)
                                    .utc()
                                    .format("DD-MMMM-yyyy, dddd")}
                              </td>
                              <td className="right">{item.directions[0][0].segments[0].duration[0]}</td>
                              <td>ADT 1</td>
                              <td className="right">BDT {singleValue[index]}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="row">
                        {/* <div className="col-lg-6 col-sm-5">
                          <div className="table-responsive-sm">
                            <table className="table table-striped">
                              <thead className="text-center">
                                <tr>
                                  <th colSpan={3}>Passenger Information</th>
                                </tr>
                              </thead>
                              <tbody className="text-center">
                                <tr>
                                  <td>Ratul Islam</td>
                                  <td>ratul@gmail.com</td>
                                  <td>01625001500</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div> */}
                        <div className="col-lg-6 col-sm-5">
                          <table className="table table-clear">
                            <tbody>
                              <tr>
                                <td className="left">
                                  <strong>Base Fare</strong>
                                </td>
                                <td className="text-end">BDT {singleValue[index]-item.passengerFares.adt.taxes + addBalance - decBalance}</td>
                              </tr>
                              <tr>
                                <td className="left">
                                  <strong>Tax</strong>
                                </td>
                                <td className="text-end"> BDT {item.passengerFares.adt.taxes}</td>
                              </tr>
                              <tr>
                                <td className="left">
                                  <strong>AIT</strong>
                                </td>
                                <td className="text-end"> BDT {parseInt(parseInt(singleValue[index])*.003)}</td>
                              </tr>
                              <tr>
                                <td className="left">
                                  <strong>Gross Fare</strong>
                                </td>
                                <td className="text-end"> BDT {parseInt(parseInt(singleValue[index])*.003)+parseInt(singleValue[index]) + parseInt(addBalance) - parseInt(decBalance)}</td>
                              </tr>
                              <tr>
                                <td className="left">
                                  <strong>Discount </strong>
                                </td>
                                <td className="text-end">BDT 190</td>
                              </tr>
                             
                              <tr>
                                <td className="left">
                                  <strong>Total</strong>
                                </td>
                                <td className="text-end">
                                  <strong>BDT {parseInt(parseInt(singleValue[index])*.003)+parseInt(singleValue[index]) + parseInt(addBalance) - parseInt(decBalance) -190}</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
              </>
            ))}
          </div>
        </section>
        <div className="text-center text-white pt-5 pb-2 mt-1">
          {/* <b>Version</b> 3.1.0 */}
          <strong>Copyright &copy; 2020-2022 All rights reserved.</strong>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
