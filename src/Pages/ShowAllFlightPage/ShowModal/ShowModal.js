import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import airports from "../../../JSON/airports.json";
import "./ShowModal.css";
import moment from "moment";
import layOver from "../../SharePages/Utility/layOver";
import axios from "axios";
import { environment } from "../../SharePages/Utility/environment";
import { Parser } from 'html-to-react';
const ShowModal = ({
  flag,
  index,
  direction0,
  direction1,
  direction2,
  direction3,
  direction4,
  direction5,
  flightType,
  totalPrice,
  bookingComponents,
  refundable,
  itemCodeRef,
  uniqueTransID,
  passengerCounts,
  passengerFares,
  currency
}) => {
  const ImageUrlD = `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${direction0.platingCarrierCode}.png`;
  const ImageUrlR =
    Object.keys(direction1).length > 0
      ? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${direction1.platingCarrierCode}.png`
      : ``;
  useEffect(() => {
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

    $("#select-click" + index).click(function () {
      $(".modal-backdrop").remove();
      $("body").removeClass("modal-open");
      $("body").removeAttr("style");
      localStorage.setItem("uniqueTransID", JSON.stringify(uniqueTransID));
      localStorage.setItem("itemCodeRef", JSON.stringify(itemCodeRef));
      localStorage.setItem("direction0", JSON.stringify(direction0));
      localStorage.setItem("direction1", JSON.stringify(direction1));
      localStorage.setItem("direction2", JSON.stringify(direction2));
      localStorage.setItem("direction3", JSON.stringify(direction3));
      localStorage.setItem("direction4", JSON.stringify(direction4));
      localStorage.setItem("direction5", JSON.stringify(direction5));
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
      localStorage.setItem("passengerFares", JSON.stringify(passengerFares));
      localStorage.setItem("passengerCounts", JSON.stringify(passengerCounts));
      localStorage.setItem(
        "bookingComponents",
        JSON.stringify(bookingComponents)
      );
    });

      fetchOptions();
 
  },[]);
  const fareRulesObj = {
    itemCodeRef: itemCodeRef,
    uniqueTransID: uniqueTransID,
    segmentCodeRefs: []
  };
  if (Object.keys(direction0).length > 0) {
    direction0.segments.map((i) =>
    fareRulesObj.segmentCodeRefs.push(i.segmentCodeRef)
    );
  }
  let [fareRules,setFareRules]=useState();

  async function fetchOptions() {
    await axios
      .post(environment.getFareRules, fareRulesObj, environment.headerToken)
      .then((response) => {
        setFareRules(response.data);
      });
      console.log(fareRules)
  }


  // fetchOptions();
//   let fareRules={
//     "item1": {
//         "fareRuleDetails": [
//             {
//                 "type": "ADV RES/TKTG",
//                 "fareRuleDetail": "UNLESS OTHERWISE SPECIFIED\nRESERVATIONS ARE REQUIRED FOR ALL SECTORS."
//             },
//             {
//                 "type": "Max Stay",
//                 "fareRuleDetail": "UNLESS OTHERWISE SPECIFIED\nTRAVEL FROM LAST STOPOVER MUST COMMENCE NO LATER THAN 12\nMONTHS AFTER DEPARTURE FROM FARE ORIGIN."
//             },
//             {
//                 "type": "StopOvers",
//                 "fareRuleDetail": "UNLESS OTHERWISE SPECIFIED\n2 STOPOVERS PERMITTED ON THE PRICING UNIT - 1 IN EACH\nDIRECTION IN INDIA AT USD 40.00 EACH."
//             },
//             {
//                 "type": "Combinations",
//                 "fareRuleDetail": "UNLESS OTHERWISE SPECIFIED\nSINGLE/DOUBLE OPEN JAWS/CIRCLE TRIPS NOT PERMITTED.\nEND-ON-END NOT PERMITTED. SIDE TRIPS NOT PERMITTED\nAPPLICABLE ADD-ON CONSTRUCTION IS ADDRESSED IN\nMISCELLANEOUS PROVISIONS - CATEGORY 23.\nROUND TRIPS\nFARES MAY BE COMBINED ON A HALF ROUND TRIP BASIS\n-TO FORM ROUND TRIPS.\nPROVIDED -\nCOMBINATIONS ARE WITH ANY FARE FOR CARRIER AI IN ANY\nRULE IN THIS TARIFF."
//             },
//             {
//                 "type": "Surcharges",
//                 "fareRuleDetail": "UNLESS OTHERWISE SPECIFIED\nA SURCHARGE OF USD 5.00 PER DIRECTION WILL BE ADDED TO THE\nAPPLICABLE FARE FOR WEEKEND TRAVEL ON FRI/SAT."
//             },
//             {
//                 "type": "Travel Restrictions",
//                 "fareRuleDetail": "UNLESS OTHERWISE SPECIFIED\nVALID FOR TRAVEL COMMENCING ON/AFTER 18MAR 17.\nVALID FOR TRAVEL COMMENCING ON/AFTER 18MAR 17."
//             },
//             {
//                 "type": "Penalties (Or) Change Fee", 
//                 "fareRuleDetail": "UNLESS OTHERWISE SPECIFIED\nCHANGES\nCHARGE USD 30.00 FOR REISSUE.\nNOTE -\nA CHANGE IS A DATE/FLIGHT/ROUTING/BOOKING\nMODIFICATION.\n--------------------------------------------------\nCHARGE APPLIES PER TRANSACTION. A TRANSACTION MAY\nINCORPORATE ONE OR MORE RESERVATION CHANGE IN THE\nSAME TRANSACTION E.G. FLIGHT AND DATE CHANGE IN\nONE DIRECTION OR BOTH.\n--------------------------------------------------\nCHARGE APPLIES TO ADULT AND CHILD.\nINFANTS NOT OCCUPYING A SEAT ARE EXEMPTED\n--------------------------------------------------\nCHANGE FEE DOES NOT APPLY FOR UPGRADE TO A HIGHER\nCABIN CLASS ON THE SAME FLIGHT. ONLY DIFFERENCE\nIN FARE AND TAXES TO BE COLLECTED. IF THE UPGRADE\nIS WITH A DATE CHANGE/CHANGE FEE ALSO TO BE\nCOLLECTED ALONG WITH DIFFERENCE IN FARE AND TAXES.\n--------------------------------------------------\nWHEN NOSHOW TICKET IS PRESENTED FOR REBOOKING\nBOTH NOSHOW AND REBOOKING/REISSUE CHARGES APPLY.\nNO SHOW IS WHEN A PAX FAILS TO CHANGE BOOKING\nATLEAST 24 HOURS BEFORE DEPARTURE OF THE FLIGHT.\n--------------------------------------------------\nTICKET HAS TO BE REISSUED FOR ANY CHANGE\nINCLUDING DATE/FLIGHT/ROUTING/BOOKING CHANGE.\n--------------------------------------------------\nREBOOKING/REISSUE/UPGRADING MUST BE MADE IN ONE\nTRANSACTION BEFORE DEPARTURE OF THE FLIGHT BEING\nCHANGED.\n--------------------------------------------------\nREISSUE TO BE DONE BY THE ORIGINAL ISSUING AGENT\nOR AI OFFICE ONLY.\n--------------------------------------------------\nPENALTY WAIVED FOR DEATH OF PASSENGER OR\nIMMEDIATE FAMILY MEMBER. WAIVER MUST BE EVIDENCED\nBY DEATH CERTIFICATE.\nIMMEDIATE FAMILY SHALL BE LIMITED TO SPOUSE/\nCHILDREN INCLUDING ADOPTED CHILDREN/ PARENTS/\nBROTHERS/ SISTERS/ GRANDPARENTS/ GRANDCHILDREN/\nFATHER IN LAW/ MOTHER IN LAW/ SISTER IN LAW/\nBROTHER IN LAW/ SON IN LAW AND DAUGHTER IN LAW.\nDEATH CERTIFICATE MEANS A DEATH CERTIFICATE OR\nCOPY THEREOF DULY EXECUTED BY THE COMPETENT\nAUTHORITIES I.E.THOSE DESIGNATED TO ISSUE DEATH\nCERTIFICATE BY APPLICABLE LAWS OF THE COUNTRY\nIN WHICH THE DEATH OCCURRED.\n--------------------------------------------------\nIF NO SEATS ARE AVAILABLE IN THE SAME RBD AS\nTICKETED PASSENGERS MAY BE BOOKED IN THE HIGHER\nRBD BY CHARGING DIFFERENCE OF FARE AND TAXES.\nDOWNSELLING TO A LOWER RBD IS NOT PERMITTED.\n--------------------------------------------------\nTHE CHANGE/REISSUE CHARGE PLUS DIFFERENCE IN FARE\nAND TAXES WILL APPLY EVEN IF THERE IS A CHANGE OF\nDATE/FLIGHT/ROUTING/BOOKING ONLY ON THE\nINTERLINING SECTOR.\n--------------------------------------------------\nWHEN FARES ARE COMBINED THE MOST RESTRICTIVE\nCONDITIONS APPLY FOR THE ENTIRE JOURNEY.\n--------------------------------------------------\nTHE CHANGE/REISSUE CHARGE IS NON - REFUNDABLE.\n--------------------------------------------------\nCHARGES ARE NON COMMISSIONABLE AND INCLUSIVE OF\nSERVICE TAXES.\n--------------------------------------------------\nCANCELLATIONS\nCHARGE USD 40.00 FOR CANCEL.\nNOTE -\nCHARGE APPLIES TO ADULT/ CHILD AND INFANT\nOCCUPYING A SEAT. INFANT NOT OCCUPYING A SEAT IS\nEXEMPTED.\n--------------------------------------------------\nWHEN NOSHOW TICKET IS PRESENTED FOR CANCELLATION/\nBOTH NOSHOW AND CANCELLATION CHARGES APPLY.\nNO SHOW IS WHEN A PAX FAILS TO CANCEL BOOKING\nATLEAST 24 HOURS BEFORE DEPARTURE OF THE FLIGHT\nBEING CANCELLED.\n--------------------------------------------------\nPENALTY WAIVED FOR DEATH OF PASSENGER OR\nIMMEDIATE FAMILY MEMBER. WAIVER MUST BE EVIDENCED\nBY DEATH CERTIFICATE.\nIMMEDIATE FAMILY SHALL BE LIMITED TO SPOUSE/\nCHILDREN INCLUDING ADOPTED CHILDREN/ PARENTS/\nBROTHERS/ SISTERS/ GRANDPARENTS/ GRANDCHILDREN/\nFATHER IN LAW/ MOTHER IN LAW/ SISTER IN LAW/\nBROTHER IN LAW/ SON IN LAW AND DAUGHTER IN LAW.\nDEATH CERTIFICATE MEANS A DEATH CERTIFICATE OR\nCOPY THEREOF DULY EXECUTED BY THE COMPETENT\nAUTHORITIES I.E.THOSE DESIGNATED TO ISSUE DEATH\nCERTIFICATE BY APPLICABLE LAWS OF THE COUNTRY\nIN WHICH THE DEATH OCCURRED.\n--------------------------------------------------\nAPPLICABLE PENALTIES TO BE RECOVERED FROM THE\nBASIC FARE AND FUEL CHARGE ONLY.\n--------------------------------------------------\nIN CASES WHERE THE APPLICABLE PENALTIES ARE HIGHER\nTHAN THE SUM OF THE BASIC FARE AND FUEL CHARGE/\nONLY THE BASIC FARE AND FUEL CHARGE WILL BE\nFORFEITED.\nSTATUTORY TAXES E.G. JN F2 AND G1 TAX EX INDIA\nAND OTHER CHARGES LIKE AIRPORT DEPARTURE TAX ETC.\nTO BE REFUNDED IN FULL.\n--------------------------------------------------\nAGAINST NON - REFUNDABLE TICKETS ONLY THE BASIC\nFARE AND FUEL CHARGE TO BE FORFEITED. STATUTORY\nTAXES AND OTHER CHARGES ARE REFUNDABLE IN FULL.\n--------------------------------------------------\nIN CASE OF PARTIALLY UTILIZED TICKETS CHARGE ONE\nWAY FARE OR HALF ROUND TRIP FARE WHICHEVER IS\nHIGHER IN THE SAME RBD FOR THE SECTOR UTILISED\nPLUS APPLICABLE TAXES.\nIF NO ONE WAY FARE EXISTS FOR THE UTILISED SECTOR\nIN THE SAME RBD THE NEXT HIGHER RBD WILL APPLY IN\nADDITION TO THE CANCELLATION CHARGE.\n--------------------------------------------------\nIF AN OUT OF SEQUENCE COUPON IS PRESENTED FOR\nREFUND THE ITINERARY TO BE REPRICED AND THE\nBALANCE IF ANY MAY BE PROCESSED FOR REFUND AFTER\nDEDUCTING APPLICABLE PENALTIES.\n--------------------------------------------------\nTHE CANCELLATION CHARGE WILL APPLY EVEN IF THERE\nIS CANCELLATION ONLY OF THE INTERLINING SECTOR.\n--------------------------------------------------\nWHEN FARES ARE COMBINED THE MOST RESTRICTIVE\nCONDITIONS APPLY FOR THE ENTIRE JOURNEY.\n--------------------------------------------------\nTHE CHANGE/REISSUE CHARGE IS NON - REFUNDABLE.\n--------------------------------------------------\nCHARGES ARE NON COMMISSIONABLE AND INCLUSIVE OF\nSERVICE TAXES.\n--------------------------------------------------\nCHANGES/CANCELLATIONS\nCHARGE USD 60.00 FOR NO-SHOW.\nNOTE -\nNO SHOW IS WHEN A PAX FAILS TO CHANGE/CANCEL\nBOOKING ATLEAST 24 HOURS BEFORE DEPARTURE OF THE\nFLIGHT BEING CHANGED/CANCELLED.\n--------------------------------------------------\nCHARGE APPLIES TO ADULT/ CHILD AND INFANT\nOCCUPYING A SEAT. INFANT NOT OCCUPYING A SEAT IS\nEXEMPTED.\n--------------------------------------------------\nWHEN NOSHOW TICKET IS PRESENTED FOR REBOOKING/\nBOTH NOSHOW AND REBOOKING/REISSUE CHARGES APPLY.\nWHEN NOSHOW TICKET IS PRESENTED FOR CANCELLATION/\nBOTH NOSHOW AND CANCELLATION CHARGES APPLY.\n--------------------------------------------------\nPENALTY WAIVED FOR DEATH OF PASSENGER OR\nIMMEDIATE FAMILY MEMBER. WAIVER MUST BE EVIDENCED\nBY DEATH CERTIFICATE.\nIMMEDIATE FAMILY SHALL BE LIMITED TO SPOUSE/\nCHILDREN INCLUDING ADOPTED CHILDREN/ PARENTS/\nBROTHERS/ SISTERS/ GRANDPARENTS/ GRANDCHILDREN/\nFATHER IN LAW/ MOTHER IN LAW/ SISTER IN LAW/\nBROTHER IN LAW/ SON IN LAW AND DAUGHTER IN LAW.\nDEATH CERTIFICATE MEANS A DEATH CERTIFICATE OR\nCOPY THEREOF DULY EXECUTED BY THE COMPETENT\nAUTHORITIES I.E.THOSE DESIGNATED TO ISSUE DEATH\nCERTIFICATE BY APPLICABLE LAWS OF THE COUNTRY\nIN WHICH THE DEATH OCCURRED.\n--------------------------------------------------\nTHE NO-SHOW CHARGE WILL APPLY EVEN IF THERE IS\nNO-SHOW ONLY ON THE INTERLINING SECTOR.\n--------------------------------------------------\nWHEN FARES ARE COMBINED THE MOST RESTRICTIVE\nCONDITIONS APPLY FOR THE ENTIRE JOURNEY.\n--------------------------------------------------\nCHARGES ARE NON COMMISSIONABLE AND INCLUSIVE OF\nSERVICE TAXES.\n--------------------------------------------------"
//             },
//             {
//                 "type": "Accompanied Travel Restrictions", 
//                 "fareRuleDetail": "UNLESS OTHERWISE SPECIFIED\nACCOMPANIED CHILD 2-11 - CHARGE 75 PERCENT OF THE FARE.\nTICKET DESIGNATOR - CH AND PERCENT OF DISCOUNT.\nNOTE -\nNOSHOW/REBOOKING/CANCELLATION PENALTIES FOR CHILD\nSAME AS THAT MENTIONED FOR ADULT\nOR - UNACCOMPANIED CHILD 5-11 - CHARGE 100 PERCENT OF THE\nFARE.\nTICKET DESIGNATOR - CH AND PERCENT OF DISCOUNT.\nNOTE -\nNOSHOW/REBOOKING/CANCELLATION PENALTIES FOR CHILD\nSAME AS THAT MENTIONED FOR ADULT\nOR - INFANT UNDER 2 WITHOUT A SEAT - CHARGE 10 PERCENT OF\nTHE FARE.\nTICKET DESIGNATOR - IN AND PERCENT OF DISCOUNT.\nNOTE -\nINFANT WILL BE TICKETED IN THE SAME RBD AS THAT\nOF THE ACCOMPANIED ADULT PASSENGER.\n--------------------------------------------------\nWHEN INFANT REACHES 2 YEARS OF AGE ON\nDEPARTURE FROM POINT OF TURNAROUND A SEAT\nMUST BE BOOKED ON THE RETURN LEG AND THE\nAPPLICABLE CHILD FARE CHARGED ON HALF ROUNDTRIP\nBASIS WITH OUTBOUND INFANT FARE.\n--------------------------------------------------\nNOSHOW/REBOOKING/CANCELLATION PENALTIES FOR\nINFANT----NIL\nOR - INFANT UNDER 2 WITH A SEAT - CHARGE 75 PERCENT OF THE\nFARE.\nTICKET DESIGNATOR - CH AND PERCENT OF DISCOUNT.\nNOTE -\nNOSHOW/REBOOKING/CANCELLATION PENALTIES FOR CHILD\nSAME AS THAT MENTIONED FOR ADULT"
//             }
//         ],
//         "uniqueTransID": "TLL856722761",
//         "itemCodeRef": "VExMODU2NzIyNzYxLTYzNzkwNTY4MzA5MzI1NTIzMnxKNFBqSkZVcVdES0FyZEwyQUFBQUFBPT18VUFwaUdhbGlsZW8="
//     },
//     "item2": {
//         "apiRef": 2,
//         "uniqueTransID": "TLL856722761",
//         "isSuccess": true,
//         "requestTime": "12-Jun-2022 12:13:26 PM",
//         "responseTime": "12-Jun-2022 12:13:38 PM",
//         "conversionTime": null,
//         "timeTicks": 637906328065510135,
//         "message": null
//     }
// };
  return (
    <>
     <div
      className="modal fade"
      id={"exampleModal" + index}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
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
                  {flightType === "Multi City" ? (
                    <>
                      <div className="row text-color">
                        <div className="col-lg-1 my-auto">
                          <img
                            src={ImageUrlD}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        </div>
                        <div className="col-lg-3 my-auto">
                          <h6 className="my-auto fw-bold">
                            {direction0.platingCarrierName}
                          </h6>
                          <h6 className="my-auto">
                            {direction0.segments[0].details[0].equipment}
                          </h6>
                          <h6>
                            {direction0.platingCarrierCode} -{" "}
                            {direction0.segments[0].flightNumber}
                          </h6>
                        </div>
                        <div className="col-lg-1 my-auto">
                          <p className="my-auto fw-bold">{direction0.from}</p>
                          <span>
                            {direction0.segments[0].departure.substr(11, 5)}
                          </span>
                        </div>
                        <div className="col-lg-6 my-auto">
                          <div className="row lh-1">
                            <div className="col-lg-12 text-center">
                              <span className="text-color fw-bold font-size">
                                {direction0.stops === 0
                                  ? "Direct"
                                  : direction0.stops + " Stop"}
                              </span>
                            </div>
                            <div className="col-lg-12 text-center">
                              <span className="text-color">
                                <i class="fas fa-circle fa-xs"></i>
                                ---------------------------------
                                <i className="fas fa-plane fa-sm"></i>
                              </span>
                            </div>
                            <div className="col-lg-12 text-center">
                              <span className="text-color me-5">
                                <i className="fas fa-clock fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {direction0.segments[0].duration[0]}
                                </span>
                              </span>
                              <span className="text-color">
                                <i className="fas fa-briefcase fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {direction0.segments[0].baggage[0]?.amount +
                                    " " +
                                    direction0.segments[0].baggage[0]?.units}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-1 my-auto">
                          <p className="my-auto fw-bold">{direction0.to}</p>
                          <span>
                            {direction0.segments[
                              direction0.segments.length - 1
                            ].arrival.substr(11, 5)}
                          </span>
                        </div>
                      </div>
                      {direction1.segments !== undefined ? (
                        <>
                          <hr></hr>
                          <div className="row text-color">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlD}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-3 my-auto">
                              <h6 className="my-auto fw-bold">
                                {direction1.platingCarrierName}
                              </h6>
                              <h6 className="my-auto">
                                {direction1.segments[0].details[0].equipment}
                              </h6>
                              <h6>
                                {direction1.platingCarrierCode} -{" "}
                                {direction1.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">
                                {direction1.from}
                              </p>
                              <span>
                                {direction1.segments[0].departure.substr(11, 5)}
                              </span>
                            </div>
                            <div className="col-lg-6 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color fw-bold font-size">
                                    {direction1.stops === 0
                                      ? "Direct"
                                      : direction1.stops + " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    ---------------------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction1.segments[0].duration[0]}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction1.segments[0].baggage[0]
                                        .amount +
                                        " " +
                                        direction1.segments[0].baggage[0].units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">{direction1.to}</p>
                              <span>
                                {direction1.segments[
                                  direction1.segments.length - 1
                                ].arrival.substr(11, 5)}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {direction2.segments !== undefined ? (
                        <>
                          <hr></hr>
                          <div className="row text-color">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlD}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-3 my-auto">
                              <h6 className="my-auto fw-bold">
                                {direction2.platingCarrierName}
                              </h6>
                              <h6 className="my-auto">
                                {direction2.segments[0].details[0].equipment}
                              </h6>
                              <h6>
                                {direction2.platingCarrierCode} -{" "}
                                {direction2.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">
                                {direction2.from}
                              </p>
                              <span>
                                {direction2.segments[0].departure.substr(11, 5)}
                              </span>
                            </div>
                            <div className="col-lg-6 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color fw-bold font-size">
                                    {direction2.stops === 0
                                      ? "Direct"
                                      : direction2.stops + " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    ---------------------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction2.segments[0].duration[0]}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction2.segments[0].baggage[0]
                                        .amount +
                                        " " +
                                        direction2.segments[0].baggage[0].units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">{direction2.to}</p>
                              <span>
                                {direction2.segments[
                                  direction2.segments.length - 1
                                ].arrival.substr(11, 5)}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {direction3.segments !== undefined ? (
                        <>
                          <hr></hr>
                          <div className="row text-color">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlD}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-3 my-auto">
                              <h6 className="my-auto fw-bold">
                                {direction3.platingCarrierName}
                              </h6>
                              <h6 className="my-auto">
                                {direction3.segments[0].details[0].equipment}
                              </h6>
                              <h6>
                                {direction3.platingCarrierCode} -{" "}
                                {direction3.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">
                                {direction3.from}
                              </p>
                              <span>
                                {direction3.segments[0].departure.substr(11, 5)}
                              </span>
                            </div>
                            <div className="col-lg-6 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color fw-bold font-size">
                                    {direction3.stops === 0
                                      ? "Direct"
                                      : direction3.stops + " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    ---------------------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction3.segments[0].duration[0]}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction3.segments[0].baggage[0]
                                        .amount +
                                        " " +
                                        direction3.segments[0].baggage[0].units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">{direction3.to}</p>
                              <span>
                                {direction3.segments[
                                  direction3.segments.length - 1
                                ].arrival.substr(11, 5)}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {direction4.segments !== undefined ? (
                        <>
                          <hr></hr>
                          <div className="row text-color">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlD}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-3 my-auto">
                              <h6 className="my-auto fw-bold">
                                {direction4.platingCarrierName}
                              </h6>
                              <h6 className="my-auto">
                                {direction4.segments[0].details[0].equipment}
                              </h6>
                              <h6>
                                {direction4.platingCarrierCode} -{" "}
                                {direction4.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">
                                {direction4.from}
                              </p>
                              <span>
                                {direction4.segments[0].departure.substr(11, 5)}
                              </span>
                            </div>
                            <div className="col-lg-6 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color fw-bold font-size">
                                    {direction4.stops === 0
                                      ? "Direct"
                                      : direction4.stops + " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    ---------------------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction4.segments[0].duration[0]}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction4.segments[0].baggage[0]
                                        .amount +
                                        " " +
                                        direction4.segments[0].baggage[0].units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">{direction4.to}</p>
                              <span>
                                {direction4.segments[
                                  direction4.segments.length - 1
                                ].arrival.substr(11, 5)}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {direction5.segments !== undefined ? (
                        <>
                          <hr></hr>
                          <div className="row text-color">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlD}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-3 my-auto">
                              <h6 className="my-auto fw-bold">
                                {direction5.platingCarrierName}
                              </h6>
                              <h6 className="my-auto">
                                {direction5.segments[0].details[0].equipment}
                              </h6>
                              <h6>
                                {direction5.platingCarrierCode} -{" "}
                                {direction5.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">
                                {direction5.from}
                              </p>
                              <span>
                                {direction5.segments[0].departure.substr(11, 5)}
                              </span>
                            </div>
                            <div className="col-lg-6 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color fw-bold font-size">
                                    {direction5.stops === 0
                                      ? "Direct"
                                      : direction5.stops + " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    ---------------------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction5.segments[0].duration[0]}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction5.segments[0].baggage[0]
                                        .amount +
                                        " " +
                                        direction5.segments[0].baggage[0].units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">{direction5.to}</p>
                              <span>
                                {direction5.segments[
                                  direction5.segments.length - 1
                                ].arrival.substr(11, 5)}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="row text-color">
                        <div className="col-lg-1 my-auto">
                          <img
                            src={ImageUrlD}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        </div>
                        <div className="col-lg-3 my-auto">
                          <h6 className="my-auto fw-bold">
                            {direction0.platingCarrierName}
                          </h6>
                          <h6 className="my-auto">
                            {direction0.segments[0].details[0].equipment}
                          </h6>
                          <h6>
                            {direction0.platingCarrierCode} -{" "}
                            {direction0.segments[0].flightNumber}
                          </h6>
                        </div>
                        <div className="col-lg-1 my-auto">
                          <p className="my-auto fw-bold">{direction0.from}</p>
                          <span>
                            {direction0.segments[0].departure.substr(11, 5)}
                          </span>
                        </div>
                        <div className="col-lg-6 my-auto">
                          <div className="row lh-1">
                            <div className="col-lg-12 text-center">
                              <span className="text-color fw-bold font-size">
                                {direction0.stops === 0
                                  ? "Direct"
                                  : direction0.stops + " Stop"}
                              </span>
                            </div>
                            <div className="col-lg-12 text-center">
                              <span className="text-color">
                                <i class="fas fa-circle fa-xs"></i>
                                ---------------------------------
                                <i className="fas fa-plane fa-sm"></i>
                              </span>
                            </div>
                            <div className="col-lg-12 text-center">
                              <span className="text-color me-5">
                                <i className="fas fa-clock fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {direction0.segments[0].duration[0]}
                                </span>
                              </span>
                              <span className="text-color">
                                <i className="fas fa-briefcase fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {direction0.segments[0].baggage[0]?.amount +
                                    " " +
                                    direction0.segments[0].baggage[0]?.units}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-1 my-auto">
                          <p className="my-auto fw-bold">{direction0.to}</p>
                          <span>
                            {direction0.segments[
                              direction0.segments.length - 1
                            ].arrival.substr(11, 5)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {flightType === "Multi City" ? (
                    <></>
                  ) : (
                    <>
                      {Object.keys(direction1).length > 0 ? (
                        <>
                          <hr></hr>
                          <div className="row text-color">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlR}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-3 my-auto">
                              <h6 className="my-auto fw-bold">
                                {direction1.platingCarrierName}
                              </h6>
                              <h6 className="my-auto">
                                {direction1.segments[0].details[0].equipment}
                              </h6>
                              <h6>
                                {direction1.platingCarrierCode} -{" "}
                                {direction1.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">
                                {direction1.from}
                              </p>
                              <span>
                                {direction1.segments[0].departure.substr(11, 5)}
                              </span>
                            </div>
                            <div className="col-lg-6 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color fw-bold font-size">
                                    {" "}
                                    {direction1.stops === 0
                                      ? "Direct"
                                      : direction1.stops + " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    ---------------------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction1.segments[0].duration[0]}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {direction1.segments[0].baggage[0]
                                        .amount +
                                        " " +
                                        direction1.segments[0].baggage[0].units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-1 my-auto">
                              <p className="my-auto fw-bold">{direction1.to}</p>
                              <span>
                                {direction1.segments[
                                  direction1.segments.length - 1
                                ].arrival.substr(11, 5)}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
                <div className="col-lg-3 my-auto">
                  <h5 className="text-end text-color fw-bold">
                    {currency!==undefined ? currency : "BDT"}   {totalPrice+ bookingComponents[0].agentAdditionalPrice}
                  </h5>
                  <h6 className="text-end text-color fw-bold">
                    {refundable === true ? "Refundable" : "Non-Refundable"}
                  </h6>
                  {flag === 0 ? (
                    <Link
                      to="/travellcart"
                      className="btn button-color fw-bold text-white float-end rounded"
                      id={"select-click" + index}
                    >
                      Select Flight
                      <span className="ms-2">
                        <i
                          className="fa fa-chevron-right"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
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
              id={"fareId" + index}
            >
              Fare details
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
          </div>

          <div id={"flight" + index}>
            <div className="container">
              {flightType === "Multi City" ? (
                <>
                  {direction0.segments !== undefined ? (
                    <>
                      {direction0.segments.map((seg, index) => (
                        <div key={index}>
                          {index === 0 ? (
                            <div
                              className="row mt-4 p-2 border-bottom"
                              style={{ backgroundColor: "	#c5c5c5" }}
                            >
                              <div className="col-lg-4">
                                <i className="fas fa-plane"></i>
                                <span className="d-inline fs-6 fw-bold ms-1">
                                  Departure,{" "}
                                  {airports
                                    .filter((f) => f.iata === seg.from)
                                    .map((item) => item.city)}
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
                                        direction0.segments[
                                          direction0.segments.length - 1
                                        ].to
                                    )
                                    .map((item) => item.city)}
                                </span>
                              </div>
                              <div className="col-lg-3 fs-6 fw-bold">
                                <span>Total duration: {seg.duration[0]}</span>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {seg.details.length > 1 ? (
                            seg.details.map((item, index) => (
                              <>
                                {index === seg.details.length - 1 ? (
                                  <></>
                                ) : seg.details.length > 1 ? (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;{" "}
                                    {layOver(
                                      seg.details[index]?.departure,
                                      direction0.segments[index]?.arrival
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {index === 0 ? (
                                  <></>
                                ) : (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;
                                    {layOver(
                                      seg.details[index]?.departure,
                                      seg.details[index - 1]?.arrival
                                    )}
                                  </div>
                                )}
                                <div className="row py-4 p-2 border">
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
                                      {item.equipment}
                                    </p>
                                    <p className="my-auto text-start">
                                      Class {seg.serviceClass}
                                    </p>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.origin}
                                      <strong className="ms-1">
                                        {item.departure.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br></br>
                                    <span className="float-start">
                                      {moment(item.departure).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.originName}
                                    </h6>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.destination}
                                      <strong className="ms-1">
                                        {item.arrival.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br />
                                    <span className="float-start">
                                      {moment(item.arrival).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.destinationName}
                                    </h6>
                                  </div>
                                </div>
                              </>
                            ))
                          ) : (
                            <>
                              {/* <span>Segments</span> */}
                              {index !== 0 ? (
                                <div className="text-center fw-bold">
                                  {" "}
                                  Layover :&nbsp;
                                  {layOver(
                                    direction0.segments[index]?.departure,
                                    direction0.segments[index - 1]?.arrival
                                  )}
                                </div>
                              ) : (
                                <></>
                              )}
                              <div className="row py-4 p-2 border">
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
                                    Class {seg.serviceClass}
                                  </p>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.from}
                                    <strong className="ms-1">
                                      {seg.departure.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br></br>
                                  <span className="float-start">
                                    {moment(seg.departure).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.fromAirport}
                                  </h6>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.to}
                                    <strong className="ms-1">
                                      {seg.arrival.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br />
                                  <span className="float-start">
                                    {moment(seg.arrival).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.toAirport}
                                  </h6>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}

                  {direction1.segments !== undefined ? (
                    <>
                      {direction1.segments.map((seg, index) => (
                        <div key={index}>
                          {index === 0 ? (
                            <div
                              className="row mt-4 p-2 border-bottom"
                              style={{ backgroundColor: "	#c5c5c5" }}
                            >
                              <div className="col-lg-4">
                                <i className="fas fa-plane"></i>
                                <span className="d-inline fs-6 fw-bold ms-1">
                                  Departure,{" "}
                                  {airports
                                    .filter((f) => f.iata === seg.from)
                                    .map((item) => item.city)}
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
                                        direction1.segments[
                                          direction1.segments.length - 1
                                        ].to
                                    )
                                    .map((item) => item.city)}
                                </span>
                              </div>
                              <div className="col-lg-3 fs-6 fw-bold">
                                <span>Total duration: {seg.duration[0]}</span>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {seg.details.length > 1 ? (
                            seg.details.map((item, index) => (
                              <>
                                {index === seg.details.length - 1 ? (
                                  <></>
                                ) : seg.details.length > 1 ? (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;{" "}
                                    {layOver(
                                      seg.details[index]?.departure,
                                      direction1.segments[index]?.arrival
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {index === 0 ? (
                                  <></>
                                ) : (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;
                                    {layOver(
                                      seg.details[index]?.departure,
                                      seg.details[index - 1]?.arrival
                                    )}
                                  </div>
                                )}
                                <div className="row py-4 p-2 border">
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
                                      {item.equipment}
                                    </p>
                                    <p className="my-auto text-start">
                                      Class {seg.serviceClass}
                                    </p>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.origin}
                                      <strong className="ms-1">
                                        {item.departure.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br></br>
                                    <span className="float-start">
                                      {moment(item.departure).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.originName}
                                    </h6>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.destination}
                                      <strong className="ms-1">
                                        {item.arrival.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br />
                                    <span className="float-start">
                                      {moment(item.arrival).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.destinationName}
                                    </h6>
                                  </div>
                                </div>
                              </>
                            ))
                          ) : (
                            <>
                              {/* <span>Segments</span> */}
                              {index !== 0 ? (
                                <div className="text-center fw-bold">
                                  {" "}
                                  Layover :&nbsp;
                                  {layOver(
                                    direction1.segments[index]?.departure,
                                    direction1.segments[index - 1]?.arrival
                                  )}
                                </div>
                              ) : (
                                <></>
                              )}
                              <div className="row py-4 p-2 border">
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
                                    Class {seg.serviceClass}
                                  </p>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.from}
                                    <strong className="ms-1">
                                      {seg.departure.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br></br>
                                  <span className="float-start">
                                    {moment(seg.departure).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.fromAirport}
                                  </h6>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.to}
                                    <strong className="ms-1">
                                      {seg.arrival.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br />
                                  <span className="float-start">
                                    {moment(seg.arrival).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.toAirport}
                                  </h6>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                  {direction2.segments !== undefined ? (
                    <>
                      {direction2.segments.map((seg, index) => (
                        <div key={index}>
                          {index === 0 ? (
                            <div
                              className="row mt-4 p-2 border-bottom"
                              style={{ backgroundColor: "	#c5c5c5" }}
                            >
                              <div className="col-lg-4">
                                <i className="fas fa-plane"></i>
                                <span className="d-inline fs-6 fw-bold ms-1">
                                  Departure,{" "}
                                  {airports
                                    .filter((f) => f.iata === seg.from)
                                    .map((item) => item.city)}
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
                                        direction2.segments[
                                          direction2.segments.length - 1
                                        ].to
                                    )
                                    .map((item) => item.city)}
                                </span>
                              </div>
                              <div className="col-lg-3 fs-6 fw-bold">
                                <span>Total duration: {seg.duration[0]}</span>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {seg.details.length > 1 ? (
                            seg.details.map((item, index) => (
                              <>
                                {index === seg.details.length - 1 ? (
                                  <></>
                                ) : seg.details.length > 1 ? (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;{" "}
                                    {layOver(
                                      seg.details[index]?.departure,
                                      direction2.segments[index]?.arrival
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {index === 0 ? (
                                  <></>
                                ) : (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;
                                    {layOver(
                                      seg.details[index]?.departure,
                                      seg.details[index - 1]?.arrival
                                    )}
                                  </div>
                                )}
                                <div className="row py-4 p-2 border">
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
                                      {item.equipment}
                                    </p>
                                    <p className="my-auto text-start">
                                      Class {seg.serviceClass}
                                    </p>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.origin}
                                      <strong className="ms-1">
                                        {item.departure.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br></br>
                                    <span className="float-start">
                                      {moment(item.departure).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.originName}
                                    </h6>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.destination}
                                      <strong className="ms-1">
                                        {item.arrival.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br />
                                    <span className="float-start">
                                      {moment(item.arrival).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.destinationName}
                                    </h6>
                                  </div>
                                </div>
                              </>
                            ))
                          ) : (
                            <>
                              {/* <span>Segments</span> */}
                              {index !== 0 ? (
                                <div className="text-center fw-bold">
                                  {" "}
                                  Layover :&nbsp;
                                  {layOver(
                                    direction2.segments[index]?.departure,
                                    direction2.segments[index - 1]?.arrival
                                  )}
                                </div>
                              ) : (
                                <></>
                              )}
                              <div className="row py-4 p-2 border">
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
                                    Class {seg.serviceClass}
                                  </p>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.from}
                                    <strong className="ms-1">
                                      {seg.departure.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br></br>
                                  <span className="float-start">
                                    {moment(seg.departure).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.fromAirport}
                                  </h6>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.to}
                                    <strong className="ms-1">
                                      {seg.arrival.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br />
                                  <span className="float-start">
                                    {moment(seg.arrival).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.toAirport}
                                  </h6>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                  {direction3.segments !== undefined ? (
                    <>
                      {direction3.segments.map((seg, index) => (
                        <div key={index}>
                          {index === 0 ? (
                            <div
                              className="row mt-4 p-2 border-bottom"
                              style={{ backgroundColor: "	#c5c5c5" }}
                            >
                              <div className="col-lg-4">
                                <i className="fas fa-plane"></i>
                                <span className="d-inline fs-6 fw-bold ms-1">
                                  Departure,{" "}
                                  {airports
                                    .filter((f) => f.iata === seg.from)
                                    .map((item) => item.city)}
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
                                        direction3.segments[
                                          direction3.segments.length - 1
                                        ].to
                                    )
                                    .map((item) => item.city)}
                                </span>
                              </div>
                              <div className="col-lg-3 fs-6 fw-bold">
                                <span>Total duration: {seg.duration[0]}</span>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {seg.details.length > 1 ? (
                            seg.details.map((item, index) => (
                              <>
                                {index === seg.details.length - 1 ? (
                                  <></>
                                ) : seg.details.length > 1 ? (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;{" "}
                                    {layOver(
                                      seg.details[index]?.departure,
                                      direction3.segments[index]?.arrival
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {index === 0 ? (
                                  <></>
                                ) : (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;
                                    {layOver(
                                      seg.details[index]?.departure,
                                      seg.details[index - 1]?.arrival
                                    )}
                                  </div>
                                )}
                                <div className="row py-4 p-2 border">
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
                                      {item.equipment}
                                    </p>
                                    <p className="my-auto text-start">
                                      Class {seg.serviceClass}
                                    </p>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.origin}
                                      <strong className="ms-1">
                                        {item.departure.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br></br>
                                    <span className="float-start">
                                      {moment(item.departure).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.originName}
                                    </h6>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.destination}
                                      <strong className="ms-1">
                                        {item.arrival.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br />
                                    <span className="float-start">
                                      {moment(item.arrival).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.destinationName}
                                    </h6>
                                  </div>
                                </div>
                              </>
                            ))
                          ) : (
                            <>
                              {/* <span>Segments</span> */}
                              {index !== 0 ? (
                                <div className="text-center fw-bold">
                                  {" "}
                                  Layover :&nbsp;
                                  {layOver(
                                    direction3.segments[index]?.departure,
                                    direction3.segments[index - 1]?.arrival
                                  )}
                                </div>
                              ) : (
                                <></>
                              )}
                              <div className="row py-4 p-2 border">
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
                                    Class {seg.serviceClass}
                                  </p>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.from}
                                    <strong className="ms-1">
                                      {seg.departure.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br></br>
                                  <span className="float-start">
                                    {moment(seg.departure).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.fromAirport}
                                  </h6>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.to}
                                    <strong className="ms-1">
                                      {seg.arrival.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br />
                                  <span className="float-start">
                                    {moment(seg.arrival).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.toAirport}
                                  </h6>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}

                  {direction4.segments !== undefined ? (
                    <>
                      {direction4.segments.map((seg, index) => (
                        <div key={index}>
                          {index === 0 ? (
                            <div
                              className="row mt-4 p-2 border-bottom"
                              style={{ backgroundColor: "	#c5c5c5" }}
                            >
                              <div className="col-lg-4">
                                <i className="fas fa-plane"></i>
                                <span className="d-inline fs-6 fw-bold ms-1">
                                  Departure,{" "}
                                  {airports
                                    .filter((f) => f.iata === seg.from)
                                    .map((item) => item.city)}
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
                                        direction4.segments[
                                          direction4.segments.length - 1
                                        ].to
                                    )
                                    .map((item) => item.city)}
                                </span>
                              </div>
                              <div className="col-lg-3 fs-6 fw-bold">
                                <span>Total duration: {seg.duration[0]}</span>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {seg.details.length > 1 ? (
                            seg.details.map((item, index) => (
                              <>
                                {index === seg.details.length - 1 ? (
                                  <></>
                                ) : seg.details.length > 1 ? (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;{" "}
                                    {layOver(
                                      seg.details[index]?.departure,
                                      direction4.segments[index]?.arrival
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {index === 0 ? (
                                  <></>
                                ) : (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;
                                    {layOver(
                                      seg.details[index]?.departure,
                                      seg.details[index - 1]?.arrival
                                    )}
                                  </div>
                                )}
                                <div className="row py-4 p-2 border">
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
                                      {item.equipment}
                                    </p>
                                    <p className="my-auto text-start">
                                      Class {seg.serviceClass}
                                    </p>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.origin}
                                      <strong className="ms-1">
                                        {item.departure.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br></br>
                                    <span className="float-start">
                                      {moment(item.departure).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.originName}
                                    </h6>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.destination}
                                      <strong className="ms-1">
                                        {item.arrival.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br />
                                    <span className="float-start">
                                      {moment(item.arrival).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.destinationName}
                                    </h6>
                                  </div>
                                </div>
                              </>
                            ))
                          ) : (
                            <>
                              {/* <span>Segments</span> */}
                              {index !== 0 ? (
                                <div className="text-center fw-bold">
                                  {" "}
                                  Layover :&nbsp;
                                  {layOver(
                                    direction4.segments[index]?.departure,
                                    direction4.segments[index - 1]?.arrival
                                  )}
                                </div>
                              ) : (
                                <></>
                              )}
                              <div className="row py-4 p-2 border">
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
                                    Class {seg.serviceClass}
                                  </p>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.from}
                                    <strong className="ms-1">
                                      {seg.departure.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br></br>
                                  <span className="float-start">
                                    {moment(seg.departure).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.fromAirport}
                                  </h6>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.to}
                                    <strong className="ms-1">
                                      {seg.arrival.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br />
                                  <span className="float-start">
                                    {moment(seg.arrival).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.toAirport}
                                  </h6>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                  {direction5.segments !== undefined ? (
                    <>
                      {direction5.segments.map((seg, index) => (
                        <div key={index}>
                          {index === 0 ? (
                            <div
                              className="row mt-4 p-2 border-bottom"
                              style={{ backgroundColor: "	#c5c5c5" }}
                            >
                              <div className="col-lg-4">
                                <i className="fas fa-plane"></i>
                                <span className="d-inline fs-6 fw-bold ms-1">
                                  Departure,{" "}
                                  {airports
                                    .filter((f) => f.iata === seg.from)
                                    .map((item) => item.city)}
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
                                        direction5.segments[
                                          direction5.segments.length - 1
                                        ].to
                                    )
                                    .map((item) => item.city)}
                                </span>
                              </div>
                              <div className="col-lg-3 fs-6 fw-bold">
                                <span>Total duration: {seg.duration[0]}</span>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {seg.details.length > 1 ? (
                            seg.details.map((item, index) => (
                              <>
                                {index === seg.details.length - 1 ? (
                                  <></>
                                ) : seg.details.length > 1 ? (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;{" "}
                                    {layOver(
                                      seg.details[index]?.departure,
                                      direction5.segments[index]?.arrival
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {index === 0 ? (
                                  <></>
                                ) : (
                                  <div className="text-center fw-bold">
                                    {" "}
                                    Layover :&nbsp;
                                    {layOver(
                                      seg.details[index]?.departure,
                                      seg.details[index - 1]?.arrival
                                    )}
                                  </div>
                                )}
                                <div className="row py-4 p-2 border">
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
                                      {item.equipment}
                                    </p>
                                    <p className="my-auto text-start">
                                      Class {seg.serviceClass}
                                    </p>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.origin}
                                      <strong className="ms-1">
                                        {item.departure.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br></br>
                                    <span className="float-start">
                                      {moment(item.departure).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.originName}
                                    </h6>
                                  </div>
                                  <div className="col-lg-4">
                                    <span className="float-start fw-bold">
                                      {item.destination}
                                      <strong className="ms-1">
                                        {item.arrival.substr(11, 5)}
                                      </strong>
                                    </span>
                                    <br />
                                    <span className="float-start">
                                      {moment(item.arrival).format(
                                        "DD MMMM,yyyy, dddd"
                                      )}
                                    </span>
                                    <br></br>
                                    <h6 className="text-start">
                                      {item.destinationName}
                                    </h6>
                                  </div>
                                </div>
                              </>
                            ))
                          ) : (
                            <>
                              {/* <span>Segments</span> */}
                              {index !== 0 ? (
                                <div className="text-center fw-bold">
                                  {" "}
                                  Layover :&nbsp;
                                  {layOver(
                                    direction5.segments[index]?.departure,
                                    direction5.segments[index - 1]?.arrival
                                  )}
                                </div>
                              ) : (
                                <></>
                              )}
                              <div className="row py-4 p-2 border">
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
                                    Class {seg.serviceClass}
                                  </p>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.from}
                                    <strong className="ms-1">
                                      {seg.departure.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br></br>
                                  <span className="float-start">
                                    {moment(seg.departure).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.fromAirport}
                                  </h6>
                                </div>
                                <div className="col-lg-4">
                                  <span className="float-start fw-bold">
                                    {seg.to}
                                    <strong className="ms-1">
                                      {seg.arrival.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br />
                                  <span className="float-start">
                                    {moment(seg.arrival).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {seg.toAirport}
                                  </h6>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  {direction0.segments.map((seg, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <div
                          className="row mt-4 p-2 border-bottom"
                          style={{ backgroundColor: "	#c5c5c5" }}
                        >
                          <div className="col-lg-4">
                            <i className="fas fa-plane"></i>
                            <span className="d-inline fs-6 fw-bold ms-1">
                              Departure,{" "}
                              {airports
                                .filter((f) => f.iata === seg.from)
                                .map((item) => item.city)}
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
                                    direction0.segments[
                                      direction0.segments.length - 1
                                    ].to
                                )
                                .map((item) => item.city)}
                            </span>
                          </div>
                          <div className="col-lg-3 fs-6 fw-bold">
                            <span>Total duration: {seg.duration[0]}</span>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {seg.details.length > 1 ? (
                        seg.details.map((item, index) => (
                          <>
                            {index === seg.details.length - 1 ? (
                              <></>
                            ) : seg.details.length > 1 ? (
                              <div className="text-center fw-bold">
                                {" "}
                                Layover :&nbsp;{" "}
                                {layOver(
                                  seg.details[index]?.departure,
                                  direction0.segments[index]?.arrival
                                )}
                              </div>
                            ) : (
                              <></>
                            )}
                            {index === 0 ? (
                              <></>
                            ) : (
                              <div className="text-center fw-bold">
                                {" "}
                                Layover :&nbsp;
                                {layOver(
                                  seg.details[index]?.departure,
                                  seg.details[index - 1]?.arrival
                                )}
                              </div>
                            )}
                            <div className="row py-4 p-2 border">
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
                                  {item.equipment}
                                </p>
                                <p className="my-auto text-start">
                                  Class {seg.serviceClass}
                                </p>
                              </div>
                              <div className="col-lg-4">
                                <span className="text-start fw-bold">
                                  {item.origin}
                                  <strong className="ms-1">
                                    {item.departure.substr(11, 5)}
                                  </strong>
                                </span>
                                <br></br>
                                <span className="text-start">
                                  {moment(item.departure).format(
                                    "DD MMMM,yyyy, dddd"
                                  )}
                                </span>
                                <br></br>
                                <h6 className="text-start">
                                  {item.originName}
                                </h6>
                              </div>
                              <div className="col-lg-4">
                                <span className="text-start fw-bold">
                                  {item.destination}
                                  <strong className="ms-1">
                                    {item.arrival.substr(11, 5)}
                                  </strong>
                                </span>
                                <br />
                                <span className="text-start">
                                  {moment(item.arrival).format(
                                    "DD MMMM,yyyy, dddd"
                                  )}
                                </span>
                                <br></br>
                                <h6 className="text-start">
                                  {item.destinationName}
                                </h6>
                              </div>
                            </div>
                          </>
                        ))
                      ) : (
                        <>
                          {/* <span>Segments</span> */}
                          {index !== 0 ? (
                            <div className="text-center fw-bold">
                              {" "}
                              Layover :&nbsp;
                              {layOver(
                                direction0.segments[index]?.departure,
                                direction0.segments[index - 1]?.arrival
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="row py-4 p-2 border">
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
                                Class {seg.serviceClass}
                              </p>
                            </div>
                            <div className="col-lg-4">
                              <span className="text-start fw-bold">
                                {seg.from}
                                <strong className="ms-1">
                                  {seg.departure.substr(11, 5)}
                                </strong>
                              </span>
                              <br></br>
                              <span className="text-start">
                                {moment(seg.departure).format(
                                  "DD MMMM,yyyy, dddd"
                                )}
                              </span>
                              <br></br>
                              <h6 className="text-start">{seg.fromAirport}</h6>
                            </div>
                            <div className="col-lg-4">
                              <span className="text-start fw-bold">
                                {seg.to}
                                <strong className="ms-1">
                                  {seg.arrival.substr(11, 5)}
                                </strong>
                              </span>
                              <br />
                              <span className="text-start">
                                {moment(seg.arrival).format(
                                  "DD MMMM,yyyy, dddd"
                                )}
                              </span>
                              <br></br>
                              <h6 className="text-start">{seg.toAirport}</h6>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="container">
              {flightType === "Multi City" ? (
                <></>
              ) : (
                <>
                  {Object.keys(direction1).length > 0 ? (
                    <>
                      <div
                        className="row border-bottom p-2"
                        style={{ backgroundColor: "	#c5c5c5" }}
                      >
                        <div className="col-lg-4">
                          <i className="fas fa-plane"></i>
                          <span className="d-inline fs-6 fw-bold ms-1">
                            Departure,{" "}
                            {airports
                              .filter(
                                (f) => f.iata === direction1.segments[0].from
                              )
                              .map((item) => item.city)}
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
                                  direction1.segments[
                                    direction1.segments.length - 1
                                  ].to
                              )
                              .map((item) => item.city)}
                          </span>
                        </div>
                        <div className="col-lg-3 fs-6 fw-bold">
                          <span>
                            Total duration: {direction1.segments[0].duration[0]}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {Object.keys(direction1).length > 0 ? (
                    direction1.segments.map((seg, index) => (
                      <>
                        {seg.details.length > 1 ? (
                          seg.details.map((item) => {
                            <>
                              {index === seg.details.length - 1 ? (
                                <></>
                              ) : seg.details.length > 1 ? (
                                <div className="text-center fw-bold">
                                  {" "}
                                  Layover : &nbsp;
                                  {layOver(
                                    seg.details[index]?.departure,
                                    direction1.segments[index]?.arrival
                                  )}
                                </div>
                              ) : (
                                <></>
                              )}
                              {index === 0 ? (
                                <></>
                              ) : (
                                <div className="text-center fw-bold">
                                  {" "}
                                  Layover : &nbsp;
                                  {layOver(
                                    seg.details[index]?.departure,
                                    seg.details[index - 1]?.arrival
                                  )}
                                </div>
                              )}
                              <div className="row py-4 p-2 border">
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
                                    {item.equipment}
                                  </p>
                                  <p className="my-auto text-start">
                                    Class {seg.serviceClass}
                                  </p>
                                </div>
                                <div className="col-lg-4">
                                  <span className="text-start fw-bold">
                                    {item.origin}
                                    <strong className="ms-1">
                                      {item.departure.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br></br>
                                  <span className="text-start">
                                    {moment(item.departure).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {item.originName}
                                  </h6>
                                </div>
                                <div className="col-lg-4">
                                  <span className="text-start fw-bold">
                                    {item.destination}
                                    <strong className="ms-1">
                                      {item.arrival.substr(11, 5)}
                                    </strong>
                                  </span>
                                  <br />
                                  <span className="text-start">
                                    {moment(item.arrival).format(
                                      "DD MMMM,yyyy, dddd"
                                    )}
                                  </span>
                                  <br></br>
                                  <h6 className="text-start">
                                    {item.destinationName}
                                  </h6>
                                </div>
                              </div>
                            </>;
                          })
                        ) : (
                          <>
                            {index !== 0 ? (
                              <div className="text-center fw-bold">
                                {" "}
                                Layover : &nbsp;
                                {layOver(
                                  direction1.segments[index]?.departure,
                                  direction1.segments[index - 1]?.arrival
                                )}
                              </div>
                            ) : (
                              <></>
                            )}
                            <div className="row py-4 p-2 border">
                              <div className="col-lg-1">
                                <img
                                  src={ImageUrlR}
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
                                  Class {seg.serviceClass}
                                </p>
                              </div>
                              <div className="col-lg-4">
                                <span className="text-start fw-bold">
                                  {seg.from}{" "}
                                  <strong>{seg.departure.substr(11, 5)}</strong>
                                </span>
                                <br></br>
                                <span className="text-start">
                                  {moment(seg.departure).format(
                                    "DD MMMM,yyyy, ddd"
                                  )}
                                </span>
                                <br></br>
                                <h6 className="text-start">
                                  {seg.fromAirport}
                                </h6>
                              </div>
                              <div className="col-lg-4">
                                <span className="text-start fw-bold">
                                  {seg.to}{" "}
                                  <strong>{seg.arrival.substr(11, 5)}</strong>
                                </span>
                                <br />
                                <span className="text-start">
                                  {moment(seg.arrival).format(
                                    "DD MMMM,yyyy, ddd"
                                  )}
                                </span>
                                <br></br>
                                <h6 className="text-start">{seg.toAirport}</h6>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ))
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>

          <div id={"baggage" + index}>
            <div className="container">
              {flightType === "Multi City" ? (
                <>
                  <>
                    <div className="row pt-4 p-2">
                      <div className="col-lg-8 border-bottom">
                        <div className="row">
                          <div className="col-lg-5">
                            <i className="fas fa-plane"></i>
                            <span className="d-inline fs-6 fw-bold ms-1">
                              Departure,{" "}
                              {airports
                                .filter(
                                  (f) => f.iata === direction0.segments[0].from
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
                                    direction0.segments[
                                      direction0.segments.length - 1
                                    ].to
                                )
                                .map((item) => item.city)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row p-2">
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
                              ({direction0.from}-{direction0.to}) ADT : &nbsp;
                              {direction0.segments[0].baggage[0]?.amount +
                                " " +
                                direction0.segments[0].baggage[0]?.units}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                  {direction1.segments !== undefined ? (
                    <>
                      <div className="row pt-4 p-2">
                        <div className="col-lg-8 border-bottom">
                          <div className="row">
                            <div className="col-lg-5">
                              <i className="fas fa-plane"></i>
                              <span className="d-inline fs-6 fw-bold ms-1">
                                Departure,{" "}
                                {airports
                                  .filter(
                                    (f) =>
                                      f.iata === direction1.segments[0].from
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
                                      direction1.segments[
                                        direction1.segments.length - 1
                                      ].to
                                  )
                                  .map((item) => item.city)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row p-2">
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
                                ({direction1.from}-{direction1.to}) ADT : &nbsp;
                                {direction1.segments[0].baggage[0]?.amount +
                                  " " +
                                  direction1.segments[0].baggage[0]?.units}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {direction2.segments !== undefined ? (
                    <>
                      <div className="row pt-4 p-2">
                        <div className="col-lg-8 border-bottom">
                          <div className="row">
                            <div className="col-lg-5">
                              <i className="fas fa-plane"></i>
                              <span className="d-inline fs-6 fw-bold ms-1">
                                Departure,{" "}
                                {airports
                                  .filter(
                                    (f) =>
                                      f.iata === direction2.segments[0].from
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
                                      direction2.segments[
                                        direction2.segments.length - 1
                                      ].to
                                  )
                                  .map((item) => item.city)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row p-2">
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
                                ({direction2.from}-{direction2.to}) ADT : &nbsp;
                                {direction2.segments[0].baggage[0]?.amount +
                                  " " +
                                  direction2.segments[0].baggage[0]?.units}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {direction3.segments !== undefined ? (
                    <>
                      <div className="row pt-4 p-2">
                        <div className="col-lg-8 border-bottom">
                          <div className="row">
                            <div className="col-lg-5">
                              <i className="fas fa-plane"></i>
                              <span className="d-inline fs-6 fw-bold ms-1">
                                Departure,{" "}
                                {airports
                                  .filter(
                                    (f) =>
                                      f.iata === direction3.segments[0].from
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
                                      direction3.segments[
                                        direction3.segments.length - 1
                                      ].to
                                  )
                                  .map((item) => item.city)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row p-2">
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
                                ({direction3.from}-{direction3.to}) ADT : &nbsp;
                                {direction3.segments[0].baggage[0]?.amount +
                                  " " +
                                  direction3.segments[0].baggage[0]?.units}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {direction4.segments !== undefined ? (
                    <>
                      <div className="row pt-4 p-2">
                        <div className="col-lg-8 border-bottom">
                          <div className="row">
                            <div className="col-lg-5">
                              <i className="fas fa-plane"></i>
                              <span className="d-inline fs-6 fw-bold ms-1">
                                Departure,{" "}
                                {airports
                                  .filter(
                                    (f) =>
                                      f.iata === direction4.segments[0].from
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
                                      direction4.segments[
                                        direction4.segments.length - 1
                                      ].to
                                  )
                                  .map((item) => item.city)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row p-2">
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
                                ({direction4.from}-{direction4.to}) ADT : &nbsp;
                                {direction4.segments[0].baggage[0]?.amount +
                                  " " +
                                  direction4.segments[0].baggage[0]?.units}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {direction5.segments !== undefined ? (
                    <>
                      <div className="row pt-4 p-2">
                        <div className="col-lg-8 border-bottom">
                          <div className="row">
                            <div className="col-lg-5">
                              <i className="fas fa-plane"></i>
                              <span className="d-inline fs-6 fw-bold ms-1">
                                Departure,{" "}
                                {airports
                                  .filter(
                                    (f) =>
                                      f.iata === direction5.segments[0].from
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
                                      direction5.segments[
                                        direction5.segments.length - 1
                                      ].to
                                  )
                                  .map((item) => item.city)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row p-2">
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
                                ({direction5.from}-{direction5.to}) ADT : &nbsp;
                                {direction5.segments[0].baggage[0]?.amount +
                                  " " +
                                  direction5.segments[0].baggage[0]?.units}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <div className="row pt-4 p-2">
                    <div className="col-lg-8 border-bottom">
                      <div className="row">
                        <div className="col-lg-5">
                          <i className="fas fa-plane"></i>
                          <span className="d-inline fs-6 fw-bold ms-1">
                            Departure,{" "}
                            {airports
                              .filter(
                                (f) => f.iata === direction0.segments[0].from
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
                                  direction0.segments[
                                    direction0.segments.length - 1
                                  ].to
                              )
                              .map((item) => item.city)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row p-2">
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
                            ({direction0.from}-{direction0.to}) ADT : &nbsp;
                            {direction0.segments[0].baggage[0]?.amount +
                              " " +
                              direction0.segments[0].baggage[0]?.units}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {flightType === "Multi City" ? (
              <></>
            ) : (
              <>
                {Object.keys(direction1).length > 0 ? (
                  <>
                    <div className="container">
                      <div className="row pt-4 p-2">
                        <div className="col-lg-8 border-bottom">
                          <div className="row">
                            <div className="col-lg-5">
                              <i className="fas fa-plane"></i>
                              <span className="d-inline fs-6 fw-bold ms-1">
                                Departure,{" "}
                                {airports
                                  .filter(
                                    (f) =>
                                      f.iata === direction1.segments[0].from
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
                                      direction1.segments[
                                        direction1.segments.length - 1
                                      ].to
                                  )
                                  .map((item) => item.city)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row p-2">
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
                                Cabin baggage
                              </span>
                            </div>
                            <div className="col-lg-6">
                              <span className="d-inline fs-6 float-end">
                                ({direction1.from}-{direction1.to}) ADT : &nbsp;
                                {direction1.segments[0].baggage[0]?.amount +
                                  " " +
                                  direction1.segments[0].baggage[0]?.units}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>

          <div id={"cancel" + index} className="text-start p-4">
            <h6 className="fw-bold">
              Refund or Date Change can be done as per the following policies:
            </h6>
            <hr></hr>• Refund Amount= Received amount from customer - Refund
            Charge (As per Airline Policy + Triplover Convenience Fee).<br></br>
            • Date Change Amount= Date change fee as per Airline + Difference of
            fare if any + Triplover Convenience Fee.
          </div>

          <div id={"fare" + index}>
            <div className="container pb-5 mb-5">
              <label htmlFor="" className="fw-bold">
                Fare details
              </label>
              <hr></hr>

              <div className="table-responsive-sm mt-1">
                <table
                  className="table table-bordered px-3 table-sm"
                  style={{ fontSize: "12px" }}
                >
                  <thead className="text-center thead text-white fw-bold">
                    <tr>
                      <th>Type</th>
                      <th>Base</th>
                      <th>Tax</th>
                      <th>Discount</th>
                      <th>AIT</th>
                      <th>Pax</th>
                      <th>Total Pax Fare</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {passengerFares.adt !== null ? (
                      <>
                        <tr>
                          <td className="left">ADT</td>
                          <td className="left">
                            {passengerFares.adt.basePrice+ bookingComponents[0].agentAdditionalPrice/(passengerCounts.adt+(passengerCounts.cnn !==null?passengerCounts.cnn : 0)+(passengerCounts.inf !==null?passengerCounts.inf : 0))}
                          </td>
                          <td className="center">{passengerFares.adt.taxes}</td>
                          <td className="right">
                            {passengerFares.adt.discountPrice}
                          </td>
                          <td className="right">{passengerFares.adt.ait}</td>
                          <td className="right">{passengerCounts.adt}</td>
                          <td className="right fw-bold">
                            {currency!==undefined ? currency : "BDT"}  {" "}
                            {(passengerFares.adt.totalPrice * passengerCounts.adt)+ bookingComponents[0].agentAdditionalPrice/(passengerCounts.adt+(passengerCounts.cnn !==null?passengerCounts.cnn : 0)+(passengerCounts.inf !==null?passengerCounts.inf : 0))}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}

                    {passengerFares.cnn !== null ? (
                      <>
                        <tr>
                          <td className="left">CNN</td>
                          <td className="left">
                            {passengerFares.cnn.basePrice+ bookingComponents[0].agentAdditionalPrice/(passengerCounts.adt+(passengerCounts.cnn !==null?passengerCounts.cnn : 0)+(passengerCounts.inf !==null?passengerCounts.inf : 0))}
                          </td>
                          <td className="center">{passengerFares.cnn.taxes}</td>
                          <td className="right">
                            {passengerFares.cnn.discountPrice}
                          </td>
                          <td className="right">{passengerFares.cnn.ait}</td>
                          <td className="right">{passengerCounts.cnn}</td>
                          <td className="right fw-bold">
                            {currency!==undefined ? currency : "BDT"}  {" "}
                            {(passengerFares.cnn.totalPrice * passengerCounts.cnn)+ bookingComponents[0].agentAdditionalPrice/(passengerCounts.adt+(passengerCounts.cnn !==null?passengerCounts.cnn : 0)+(passengerCounts.inf !==null?passengerCounts.inf : 0))}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}

                    {passengerFares.inf !== null ? (
                      <>
                        <tr>
                          <td className="left">INF</td>
                          <td className="left">
                            {passengerFares.inf.basePrice+ bookingComponents[0].agentAdditionalPrice/(passengerCounts.adt+(passengerCounts.cnn !==null?passengerCounts.cnn : 0)+(passengerCounts.inf !==null?passengerCounts.inf : 0))}
                          </td>
                          <td className="center">{passengerFares.inf.taxes}</td>
                          <td className="right">
                            {passengerFares.inf.discountPrice}
                          </td>
                          <td className="right">{passengerFares.inf.ait}</td>
                          <td className="right">{passengerCounts.inf}</td>
                          <td className="right fw-bold">
                            {currency!==undefined ? currency : "BDT"}  {" "}
                            {(passengerFares.inf.totalPrice * passengerCounts.inf)+ bookingComponents[0].agentAdditionalPrice/(passengerCounts.adt+(passengerCounts.cnn !==null?passengerCounts.cnn : 0)+(passengerCounts.inf !==null?passengerCounts.inf : 0))}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
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
            {/* <Link to="/travellcart" className="btn btn-primary" id={"select-click"+index} onClick={handleClick}>
                  Select
                </Link> */}
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade" id={"farerulesModal"+ index} tabIndex="-1" aria-labelledby="farerulesModalLabel"
    aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
              <h3>Fare Rules</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{fontSize:'10px'}}>
                        {
                        fareRules!==undefined && fareRules.item2!=undefined?
                        fareRules.item2.isSuccess==true?
                          <>
                          {
                            fareRules.item1.fareRuleDetails.map((item,index)=>{
                              return <>
                              <p>
                                  <a class="btn btn-default col-lg-12" style={{backgroundColor:'blue'}} data-bs-toggle="collapse" href={"#rulePanel"+index} role="button" aria-expanded="false" aria-controls={"#rulePanel"+index}>{item.type}</a>
                                </p>
                                <div class="row">
                                  <div class="col">
                                    <div class="collapse multi-collapse" id={"rulePanel"+index}>
                                      <div class="card card-body" >
                                      <div className="row" dangerouslySetInnerHTML={{__html: item.fareRuleDetail.replace(/(?:\r\n|\r|\n)/g, '<br />')}} ></div>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                             </>
                            })
                          }
                          
                          </>
                          
                          :<></>
                        :<></>
                        }
            </div>
        </div>
    </div>
</div>
    </>
   
  );
};

export default ShowModal;
