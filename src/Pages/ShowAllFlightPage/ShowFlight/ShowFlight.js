import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import "./ShowFlight.css";
import ShowModal from "../ShowModal/ShowModal";
import useAuth from "../../../hooks/useAuth";
import seatIcon from "../../../images/icon/Plane_Seat.svg";
import moment from "moment";
import airports from "../../../JSON/airports.json";
import ReactTooltip from "react-tooltip";
import layOver from "../../SharePages/Utility/layOver";
import dayCount from "../../SharePages/Utility/dayCount";
import { environment } from "../../SharePages/Utility/environment";
import axios from "axios";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import { totalFlightDuration } from "../../../common/functions";


const ShowFlight = (props) => {
  const [grandTotal, setGrandTotal] = useState();
  const { setCount, handleFareRules, loading, fareRules, setFareRules } =
    useAuth();
  const navigate = useNavigate();
  // const handleClick =(direction,index) =>{
  //   console.log(index);
  //   console.log(direction);
  // }
  const {
    passengerFares,
    refundable,
    directions,
    bookingComponents,
    uniqueTransID,
    itemCodeRef,
    passengerCounts,
    totalPrice,
    avlSrc,
  } = props.data;
  // console.log(directions);
  const flightType = props.flightType;
  const amountChange = props.amountChange;
  let currency = props.currency;
  let checkList = props.checkList;
  console.log(checkList);
  const getFareRules = (uId, dir, itemCode) => {
    handleFareRules(uId, dir, itemCode);
  };

  // const handleFareRules = (uId, dir, itemCode) => {
  //   const fareRulesObj = {
  //     itemCodeRef: itemCode,
  //     uniqueTransID: uId,
  //     segmentCodeRefs: []
  //   };

  //   dir[0][0].segments.map((i) =>
  //     fareRulesObj.segmentCodeRefs.push(i.segmentCodeRef)
  //   );

  //   // if (Object.keys(dir[0][0]).length > 0) {
  //   //   dir[0][0].segments.map((i) =>
  //   //     fareRulesObj.segmentCodeRefs.push(i.segmentCodeRef)
  //   //   );
  //   // }
  //   console.log(fareRulesObj);

  //   // const fetchOptions = async(fareRulesObj) =>{
  //   //     setLoading(true);
  //   //     alert(loading);
  //   //     const response = await axios.post(environment.getFareRules, fareRulesObj, environment.headerToken);
  //   //     setFareRules(await response.data);
  //   //     // setLoading(false);
  //   // }
  //   async function fetchOptions() {
  //     // alert("ok");
  //     setLoading(true);
  //     await axios
  //       .post(environment.getFareRules, fareRulesObj, environment.headerToken)
  //       .then((response) => {
  //         setFareRules(response.data);
  //         // console.log(response);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  //   fetchOptions();
  // }
  // console.log(fareRules);
  const [idxD, setIdxD] = useState(0);
  const [idxA, setIdxA] = useState(0);
  const [idxD1, setIdxD1] = useState(0);
  const [idxD2, setIdxD2] = useState(0);
  const [idxD3, setIdxD3] = useState(0);
  const [idxD4, setIdxD4] = useState(0);
  const [idxD5, setIdxD5] = useState(0);
  const [idxD6, setIdxD6] = useState(0);
  const [direction0, setdirection0] = useState(directions[0][0]);
  const [direction1, setdirection1] = useState(
    directions.length > 1 ? directions[1][0] : []
  );
  const [direction2, setdirection2] = useState(
    directions.length > 2 ? directions[2][0] : []
  );
  const [direction3, setdirection3] = useState(
    directions.length > 3 ? directions[3][0] : []
  );
  const [direction4, setdirection4] = useState(
    directions.length > 4 ? directions[4][0] : []
  );
  const [direction5, setdirection5] = useState(
    directions.length > 5 ? directions[5][0] : []
  );
  useEffect(() => {
    setdirection0(directions[0][0]);
    setdirection1(directions.length > 1 ? directions[1][0] : []);
    setdirection2(directions.length > 2 ? directions[2][0] : []);
    setdirection3(directions.length > 3 ? directions[3][0] : []);
    setdirection4(directions.length > 4 ? directions[4][0] : []);
    setdirection5(directions.length > 5 ? directions[5][0] : []);
    $("#show-option" + props.index).on("click", function () {
      $("#check-price" + props.index).hide();
      $("#check-t-price" + props.index).hide();
      $("#first-option" + props.index).hide();
      $("#toggle-option" + props.index).show();
      $("#show-option" + props.index).hide();
      $("#hide-option" + props.index).show();
    });
  }, [directions, props.index]);

  const ImageUrlD = `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${directions[0][0].platingCarrierCode}.png`;
  const ImageUrlR =
    directions[1] !== undefined
      ? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${directions[1][0].platingCarrierCode}.png`
      : ``;
  const selectDirectionOption0 = (id) => {
    setdirection0(directions[0][id]);
    // console.log(direction0);
    setIdxD(id);
    setIdxD1(id);
  };
  const selectDirectionOption1 = (id) => {
    setdirection1(directions[1][id]);
    // console.log(direction1);
    setIdxA(id);
    setIdxD2(id);
  };
  const selectDirectionOption2 = (id) => {
    setdirection2(directions[2][id]);
    // console.log(direction2);
    setIdxD3(id);
  };
  const selectDirectionOption3 = (id) => {
    setdirection3(directions[3][id]);
    // console.log(direction3);
    setIdxD4(id);
  };
  const selectDirectionOption4 = (id) => {
    setdirection4(directions[4][id]);
    // console.log(direction4);
    setIdxD5(id);
  };
  const selectDirectionOption5 = (id) => {
    setdirection5(directions[5][id]);
    // console.log(direction5);
    setIdxD6(id);
  };

  const handleSelectFlight = () => {
    // alert("Select");
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
    localStorage.setItem("refundable", JSON.stringify(refundable));
    navigate("/travellcart");
  };

  // console.log(directions[0][0].segments[0].departure);

  useEffect(() => {
    $("#select-flight-click" + props.index).click(function () {
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
      localStorage.setItem("refundable", JSON.stringify(refundable));
    });

    $("#select-flight-t-click" + props.index).click(function () {});

    $(document).ready(function () {
      $("#show-option" + props.index).show();
      $("#toggle-option" + props.index).hide();
      $("#hide-option" + props.index).hide();
      $("#check-price" + props.index).hide();
      $("#check-t-price" + props.index).hide();
    });

    $("#passengerBrackdown" + props.index).hide();
    $("#priceDown" + props.index).click(function () {
      $("#passengerBrackdown" + props.index).toggle("slow");
    });

    $("#show-option" + props.index).on("click", function () {
      $("#check-price" + props.index).hide();
      $("#check-t-price" + props.index).hide();
      $("#first-option" + props.index).hide();
      $("#toggle-option" + props.index).show();
      $("#show-option" + props.index).hide();
      $("#hide-option" + props.index).show();
    });

    $("#hide-option" + props.index).click(function () {
      $("#first-option" + props.index).show();
      $("#toggle-option" + props.index).hide();
      $("#show-option" + props.index).show();
      $("#hide-option" + props.index).hide();
      $("#check-price" + props.index).hide();
    });

    $("#check-price-click" + props.index).click(function () {
      $("#rotate-click" + props.index).toggleClass("down");
      $("#check-price" + props.index).toggle();
    });
    $("#rotate-click" + props.index).click(function () {
      $(this).toggleClass("down");
      $("#check-price" + props.index).toggle();
    });

    $("#check-price-t-click" + props.index).click(function () {
      $("#rotate-t-click" + props.index).toggleClass("down");
      $("#check-t-price" + props.index).toggle();
    });

    $("#rotate-t-click" + props.index).click(function () {
      $(this).toggleClass("down");
      $("#check-t-price" + props.index).toggle();
    });

    $("#flight" + props.index).show();
    $("#baggage" + props.index).hide();
    $("#cancel" + props.index).hide();
    $("#fare" + props.index).hide();

    $("#flightId" + props.index).click(function () {
      $("#flight" + props.index).show();
      $("#baggage" + props.index).hide();
      $("#cancel" + props.index).hide();
      $("#fare" + props.index).hide();
    });
    $("#baggageId" + props.index).click(function () {
      $("#flight" + props.index).hide();
      $("#baggage" + props.index).show();
      $("#cancel" + props.index).hide();
      $("#fare" + props.index).hide();
    });
    $("#changeId" + props.index).click(function () {
      $("#flight" + props.index).hide();
      $("#baggage" + props.index).hide();
      $("#cancel" + props.index).show();
      $("#fare" + props.index).hide();
    });
    $("#fareId" + props.index).click(function () {
      $("#flight" + props.index).hide();
      $("#baggage" + props.index).hide();
      $("#cancel" + props.index).hide();
      $("#fare" + props.index).show();
    });
  }, [props.index]);

  const handleCheckBox = (e) => {
    const checked = e.target.checked;
    if (checked) {
      checkList.push(props.data);
      setCount(checkList.length);
      sessionStorage.setItem("checkList", JSON.stringify(checkList));
    } else {
      checkList = checkList.filter(
        (item) => item.itemCodeRef !== props.data.itemCodeRef
      );
      console.log(checkList,"======")
      sessionStorage.setItem("checkList", JSON.stringify(checkList));
      setCount(checkList.length);
    }
  };
  // console.log(currency);
  const isTempInspector = sessionStorage.getItem("isTempInspector");

  //BAGGAGE RESPONSE
  //console.log(directions[0][0].segments[0].baggage, "====");

  return (
    <>
      <>
        <div
          className="row mb-5 mx-3 py-2 rounded box-shadow bg-white"
          id={"first-option" + props.index}
        >
          <div className="col-lg-10 my-auto border-end">
            {/* up flight section  */}
            <span className="text-start">
              <input
                type="checkbox"
                className="show-flight-checkbox"
                onClick={(e) => handleCheckBox(e)}
              />
            </span>

            {flightType === "Multi City" ? (
              directions.map((item, index) => (
                <div
                  className={
                    index === 0
                      ? "row p-2 text-color m-1"
                      : "row p-2 text-color m-1 border-top"
                  }
                  key={index}
                >
                  <div className="col-lg-1 my-auto">
                    <img src={ImageUrlD} alt="" width="40px" height="40px" />
                  </div>
                  <div
                    className="col-lg-3 my-auto text-center"
                    style={{ fontSize: "14px" }}
                  >
                    <p className="my-auto">{item[0].platingCarrierName}</p>
                    <p className="my-auto">
                      {item[0].segments[0].details[0].equipment}
                    </p>
                    <p>
                      {item[0].platingCarrierCode} -{" "}
                      {item[0].segments[0].flightNumber}
                    </p>
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="fw-bold">
                      <span className="fs-5">{item[0].from}</span>
                      <span className="ms-1 fs-5">
                        {item[0].segments[0].departure.substr(11, 5)}
                      </span>
                    </h6>
                    <h6 className="flighttime">
                      {moment(item[0].segments[0].departure).format(
                        "DD MMM,yyyy, ddd"
                      )}
                    </h6>
                    <h6 className="flighttime">
                      {airports
                        .filter((f) => f.iata === item[0].from)
                        .map((item) => item.city)}
                    </h6>
                  </div>
                  <div className="col-lg-4 my-auto">
                    <div className="row lh-1">
                      <div className="col-lg-12 text-center">
                        <span className="text-color font-size">
                          {item[0].stops === 0
                            ? "Direct"
                            : item[0].stops + " Stop"}
                        </span>
                      </div>
                      <div className="col-lg-12 text-center">
                        <span className="text-color">
                          <i class="fas fa-circle fa-xs"></i>
                          ----------------------
                          <i className="fas fa-plane fa-sm"></i>
                        </span>
                      </div>
                      <div className="col-lg-12 text-center">
                        <span className="text-color text-center">
                          <i className="fas fa-clock fa-sm"></i>
                          <span className="ms-1 font-size">
                            {item[0].segments[0].duration[0]}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="fw-bold">
                      <span className="fs-5">{item[0].to}</span>
                      <span className="ms-1 fs-5">
                        {item[0].segments[
                          item[0].segments.length - 1
                        ].arrival.substr(11, 5)}
                      </span>

                      <sup>
                        &nbsp;
                        {dayCount(
                          item[0].segments[item[0].segments.length - 1].arrival,
                          item[0].segments[0]?.departure
                        ) !== 0 ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "8px" }}
                          >
                            +
                            {dayCount(
                              item[0].segments[item[0].segments.length - 1]
                                .arrival,
                              item[0].segments[0]?.departure
                            )}
                          </span>
                        ) : (
                          ""
                        )}{" "}
                      </sup>
                    </h6>
                    <h6 className="flighttime">
                      {moment(
                        item[0].segments[item[0].segments.length - 1].arrival
                      ).format("DD MMM,yyyy, ddd")}{" "}
                    </h6>
                    <h6 className="flighttime">
                      {airports
                        .filter((f) => f.iata === item[0].to)
                        .map((item) => item.city)}
                    </h6>
                  </div>
                </div>
              ))
            ) : (
              <div className="row p-2 text-color m-1">
                <div className="col-lg-1 my-auto">
                  <img src={ImageUrlD} alt="" width="40px" height="40px" />
                </div>
                <div
                  className="col-lg-3 my-auto text-center"
                  style={{ fontSize: "14px" }}
                >
                  <p className="my-auto">
                    {directions[0][0].platingCarrierName}
                  </p>
                  <p className="my-auto">
                    {directions[0][0].segments[0].details[0].equipment}
                  </p>
                  <p>
                    {directions[0][0].platingCarrierCode} -{" "}
                    {directions[0][0].segments[0].flightNumber}
                  </p>
                </div>
                <div className="col-lg-2 my-auto">
                  <h6 className="fw-bold">
                    <span className="fs-5">{directions[0][0].from}</span>
                    <span className="ms-1 fs-5">
                      {directions[0][0].segments[0].departure.substr(11, 5)}
                    </span>
                    {/* {directions[0][0].segments[0].departure.substr(11, 5)} */}
                  </h6>
                  <h6 className="flighttime">
                    {moment(directions[0][0].segments[0].departure).format(
                      "DD MMM,yyyy, ddd"
                    )}
                  </h6>
                  <h6 className="flighttime">
                    {airports
                      .filter((f) => f.iata === directions[0][0].from)
                      .map((item) => item.city)}
                  </h6>
                  {/* <p className="my-auto">{directions[0][0].from}</p> */}
                </div>
                <div className="col-lg-4 my-auto">
                  <div className="row lh-1">
                    <div className="col-lg-12 text-center">
                      <span className="text-color font-size">
                        {directions[0][0].stops === 0 ? (
                          "Direct"
                        ) : (
                          <>
                            {directions[0][0].segments.length === 1 &&
                            directions[0][0].segments[0].details.length ===
                              1 ? (
                              "Direct"
                            ) : (
                              <>
                                {directions[0][0].segments.length > 1 ? (
                                  <>
                                    {directions[0][0].segments.length === 2 ? (
                                      <span
                                        data-tip={
                                          directions[0][0].segments[0]
                                            .toAirport +
                                          " (" +
                                          directions[0][0].segments[0].to +
                                          ")" +
                                          " | Layover " +
                                          layOver(
                                            directions[0][0].segments[1]
                                              .departure,
                                            directions[0][0].segments[0]
                                              ?.arrival
                                          )
                                        }
                                      >
                                        {directions[0][0].stops + " Stop"}
                                      </span>
                                    ) : directions[0][0].segments.length ===
                                      3 ? (
                                      <>
                                        <span
                                          data-tip={
                                            directions[0][0].segments[0]
                                              .toAirport +
                                            " (" +
                                            directions[0][0].segments[0].to +
                                            ")" +
                                            " | Layover " +
                                            layOver(
                                              directions[0][0].segments[1]
                                                .departure,
                                              directions[0][0].segments[0]
                                                ?.arrival
                                            ) +
                                            "<br /> <hr/>" +
                                            directions[0][0].segments[1]
                                              .toAirport +
                                            " (" +
                                            directions[0][0].segments[1].to +
                                            ")" +
                                            " | Layover " +
                                            layOver(
                                              directions[0][0].segments[2]
                                                .departure,
                                              directions[0][0].segments[1]
                                                ?.arrival
                                            )
                                          }
                                        >
                                          {directions[0][0].stops + " Stop"}
                                        </span>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {directions[0][0].segments.map((item) => {
                                      item.details.length === 2 ? (
                                        <span
                                          data-tip={
                                            item.details[0].destinationName +
                                            " (" +
                                            item.details[0].destination +
                                            ")" +
                                            " | Layover " +
                                            layOver(
                                              item.details[1].departure,
                                              item.details[0]?.arrival
                                            )
                                          }
                                        >
                                          {directions[0][0].stops + " Stop"}
                                        </span>
                                      ) : item.details.length === 3 ? (
                                        <>
                                          <span
                                            data-tip={
                                              item.details[0].destinationName +
                                              " (" +
                                              item.details[0].destination +
                                              ")" +
                                              " | Layover " +
                                              layOver(
                                                item.details[1].departure,
                                                item.details[0]?.arrival
                                              ) +
                                              "<br /> <hr/>" +
                                              item.details[1].destinationName +
                                              " (" +
                                              item.details[1].destination +
                                              ")" +
                                              " | Layover " +
                                              layOver(
                                                item.details[2].departure,
                                                item.details[1]?.arrival
                                              )
                                            }
                                          >
                                            {directions[0][0].stops + " Stop"}
                                          </span>{" "}
                                        </>
                                      ) : (
                                        <></>
                                      );
                                    })}
                                  </>
                                )}
                              </>
                            )}

                            <ReactTooltip
                              effect="solid"
                              html={true}
                            ></ReactTooltip>
                          </>
                        )}
                      </span>
                    </div>
                    <div className="col-lg-12 text-center">
                      <span className="text-color">
                        <i class="fas fa-circle fa-xs"></i>
                        ----------------------
                        <i className="fas fa-plane fa-sm"></i>
                      </span>
                    </div>
                    <div className="col-lg-12 text-center">
                      <span className="text-color">
                        <i className="fas fa-clock fa-sm"></i>
                        <span className="ms-1 font-size">
                          {/* {directions[0][0].segments[0].duration[0]} */}
                          {totalFlightDuration(directions[0][0].segments)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 my-auto">
                  <h6 className="fw-bold">
                    <span className="fs-5">{directions[0][0].to}</span>
                    <span className="ms-1 fs-5">
                      {directions[0][0].segments[
                        directions[0][0].segments.length - 1
                      ].arrival.substr(11, 5)}
                    </span>

                    <sup>
                      &nbsp;
                      {dayCount(
                        directions[0][0].segments[
                          directions[0][0].segments.length - 1
                        ].arrival,
                        directions[0][0].segments[0]?.departure
                      ) !== 0 ? (
                        <span
                          className="text-danger"
                          style={{ fontSize: "8px" }}
                        >
                          +
                          {dayCount(
                            directions[0][0].segments[
                              directions[0][0].segments.length - 1
                            ].arrival,
                            directions[0][0].segments[0]?.departure
                          )}
                        </span>
                      ) : (
                        ""
                      )}{" "}
                    </sup>
                  </h6>
                  <h6 className="flighttime">
                    {moment(
                      directions[0][0].segments[
                        directions[0][0].segments.length - 1
                      ].arrival
                    ).format("DD MMM,yyyy, ddd")}
                  </h6>
                  <h6 className="flighttime">
                    {airports
                      .filter((f) => f.iata === directions[0][0].to)
                      .map((item) => item.city)}
                  </h6>
                  {/* <span className="fw-bold">
                  {directions[0][0].segments[
                    directions[0][0].segments.length - 1
                  ].arrival.substr(11, 5)}
                </span>
                <p className="my-auto">{directions[0][0].to}</p> */}
                </div>
              </div>
            )}
            {/* end of up flight section  */}

            {/* return fight section  */}
            {flightType === "Multi City" ? (
              <></>
            ) : directions[1] !== undefined ? (
              <div className="row p-2 border-top text-color m-1">
                <div className="col-lg-1 my-auto">
                  <img src={ImageUrlR} alt="" width="40px" height="40px" />
                </div>
                <div
                  className="col-lg-3 my-auto text-center"
                  style={{ fontSize: "14px" }}
                >
                  <p className="my-auto">
                    {directions[1][0].platingCarrierName}
                  </p>
                  <p className="my-auto">
                    {directions[1][0].segments[0].details[0].equipment}
                  </p>
                  <p>
                    {directions[1][0].platingCarrierCode} -{" "}
                    {directions[1][0].segments[0].flightNumber}
                  </p>
                </div>
                <div className="col-lg-2 my-auto">
                  <h6 className="fw-bold">
                    <span className="fs-5">{directions[1][0].from}</span>
                    <span className="ms-1 fs-5">
                      {directions[1][0].segments[0].departure.substr(11, 5)}
                    </span>
                  </h6>
                  <h6 className="flighttime">
                    {moment(directions[1][0].segments[0].departure).format(
                      "DD MMM,yyyy, ddd"
                    )}
                  </h6>
                  <h6 className="flighttime">
                    {airports
                      .filter((f) => f.iata === directions[1][0].from)
                      .map((item) => item.city)}
                  </h6>
                </div>
                <div className="col-lg-4 my-auto text-center">
                  <div className="row lh-1">
                    <div className="col-lg-12 text-center">
                      <span className="text-color font-size">
                        {directions[1][0].stops === 0 ? (
                          "Direct"
                        ) : (
                          <>
                            {directions[0][0].segments.length === 1 &&
                            directions[0][0].segments[0].details.length ===
                              1 ? (
                              "Direct"
                            ) : (
                              <>
                                {directions[1][0].segments.length > 1 ? (
                                  <>
                                    {directions[1][0].segments.length === 2 ? (
                                      <span
                                        data-tip={
                                          directions[1][0].segments[0]
                                            .toAirport +
                                          " (" +
                                          directions[1][0].segments[0].to +
                                          ")" +
                                          " | Layover " +
                                          layOver(
                                            directions[1][0].segments[1]
                                              .departure,
                                            directions[1][0].segments[0]
                                              ?.arrival
                                          )
                                        }
                                      >
                                        {directions[1][0].stops + " Stop"}
                                      </span>
                                    ) : directions[1][0].segments.length ===
                                      3 ? (
                                      <>
                                        <span
                                          data-tip={
                                            directions[1][0].segments[0]
                                              .toAirport +
                                            " (" +
                                            directions[1][0].segments[0].to +
                                            ")" +
                                            " | Layover " +
                                            layOver(
                                              directions[1][0].segments[1]
                                                .departure,
                                              directions[1][0].segments[0]
                                                ?.arrival
                                            ) +
                                            "<br /> <hr/>" +
                                            directions[1][0].segments[1]
                                              .toAirport +
                                            " (" +
                                            directions[1][0].segments[1].to +
                                            ")" +
                                            " | Layover " +
                                            layOver(
                                              directions[1][0].segments[2]
                                                .departure,
                                              directions[1][0].segments[1]
                                                ?.arrival
                                            )
                                          }
                                        >
                                          {directions[1][0].stops + " Stop"}
                                        </span>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {directions[1][0].segments.map((item) => {
                                      item.details.length === 2 ? (
                                        <span
                                          data-tip={
                                            item.details[0].destinationName +
                                            " (" +
                                            item.details[0].destination +
                                            ")" +
                                            " | Layover " +
                                            layOver(
                                              item.details[1].departure,
                                              item.details[0]?.arrival
                                            )
                                          }
                                        >
                                          {directions[0][0].stops + " Stop"}
                                        </span>
                                      ) : item.details.length === 3 ? (
                                        <>
                                          <span
                                            data-tip={
                                              item.details[0].destinationName +
                                              " (" +
                                              item.details[0].destination +
                                              ")" +
                                              " | Layover " +
                                              layOver(
                                                item.details[1].departure,
                                                item.details[0]?.arrival
                                              ) +
                                              "<br /> <hr/>" +
                                              item.details[1].destinationName +
                                              " (" +
                                              item.details[1].destination +
                                              ")" +
                                              " | Layover " +
                                              layOver(
                                                item.details[2].departure,
                                                item.details[1]?.arrival
                                              )
                                            }
                                          >
                                            {directions[1][0].stops + " Stop"}
                                          </span>{" "}
                                        </>
                                      ) : (
                                        <></>
                                      );
                                    })}
                                  </>
                                )}
                              </>
                            )}

                            <ReactTooltip
                              effect="solid"
                              html={true}
                            ></ReactTooltip>
                          </>
                        )}
                      </span>
                    </div>
                    <div className="col-lg-12">
                      <span className="text-color">
                        <i class="fas fa-circle fa-xs"></i>
                        ----------------------
                        <i className="fas fa-plane fa-sm"></i>
                      </span>
                    </div>
                    <div className="col-lg-12 text-center">
                      <span className="text-color">
                        <i className="fas fa-clock fa-sm"></i>
                        <span className="ms-1 font-size">
                          {/* {directions[1][0].segments[0].duration[0]} */}
                          {totalFlightDuration(directions[1][0].segments)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 my-auto">
                  <h6 className="fw-bold">
                    <span className="fs-5">{directions[1][0].to}</span>
                    <span className="ms-1 fs-5">
                      {directions[1][0].segments[
                        directions[1][0].segments.length - 1
                      ].arrival.substr(11, 5)}
                    </span>
                    <sup>
                      &nbsp;
                      {dayCount(
                        directions[1][0].segments[
                          directions[1][0].segments.length - 1
                        ].arrival,
                        directions[1][0].segments[0]?.departure
                      ) !== 0 ? (
                        <span
                          className="text-danger"
                          style={{ fontSize: "8px" }}
                        >
                          +
                          {dayCount(
                            directions[1][0].segments[
                              directions[1][0].segments.length - 1
                            ].arrival,
                            directions[1][0].segments[0]?.departure
                          )}
                        </span>
                      ) : (
                        ""
                      )}{" "}
                    </sup>
                  </h6>
                  <h6 className="flighttime">
                    {moment(
                      directions[1][0].segments[
                        directions[1][0].segments.length - 1
                      ].arrival
                    ).format("DD MMM,yyyy, ddd")}
                  </h6>
                  <h6 className="flighttime">
                    {airports
                      .filter((f) => f.iata === directions[1][0].to)
                      .map((item) => item.city)}
                  </h6>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="border-top py-2">
              {directions[0][0].segments[0].bookingCount ? (
                <>
                  <span className="px-3 text-color font-size">
                    <i class="fas fa-couch me-1"></i>
                    <span className="me-1">Seats</span>
                    {directions[0][0].segments[0].bookingCount}{" "}
                  </span>
                </>
              ) : (
                <></>
              )}

              {directions[0][0].segments[0].bookingClass ? (
                <>
                  <span className="pe-3 text-color font-size">
                    <i class="fas fa-book me-1"></i>{" "}
                    <span className="me-1">Class</span>
                    {directions[0][0].segments[0].bookingClass}{" "}
                  </span>
                </>
              ) : (
                <></>
              )}

              <span className="pe-3 text-color font-size">
                <span className="text-color briefcase">
                  {" "}
                  <i className="fas fa-briefcase fa-sm me-1"></i>
                  <span className="ms-1" style={{ cursor: "pointer" }}>
                    Baggage
                  </span>
                </span>
                <div class="box">
                  {" "}
                  <table
                    className="table table-bordered table-sm"
                    style={{ fontSize: "12px" }}
                  >
                    <thead className="text-center thead text-white fw-bold">
                      <tr>
                        <th>Route</th>
                        <th>Baggage</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      <tr>
                        <td className="left">
                          {directions[0][0].from}-{directions[0][0].to}
                        </td>
                        <td className="left">
                          Adult :{" "}
                          <span className="ms-1 font-size">
                            {directions[0][0].segments[0].baggage[0]?.amount +
                              " " +
                              directions[0][0].segments[0].baggage[0]?.units}
                          </span>
                        </td>
                      </tr>

                      {directions[1] !== undefined ? (
                        <>
                          <tr>
                            <td className="left">
                              {directions[1][0].from}-{directions[1][0].to}
                            </td>
                            <td className="left">
                              Adult :{" "}
                              <span className="ms-1 font-size">
                                {directions[1][0].segments[0].baggage[0]
                                  ?.amount +
                                  " " +
                                  directions[1][0].segments[0].baggage[0]
                                    ?.units}
                              </span>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                </div>
              </span>

              <span className="pe-3 text-color font-size">
                <i class="fas fa-pen-nib me-1"></i>{" "}
                <Link
                  to=""
                  style={{ textDecoration: "none" }}
                  className="text-color font-size"
                  data-bs-toggle="modal"
                  data-bs-target={"#farerulesModal"}
                  onClick={() =>
                    getFareRules(uniqueTransID, directions, itemCodeRef)
                  }
                >
                  Fare Rules
                </Link>
              </span>
              <span className="text-color float-end">
                {refundable === true ? (
                  <>
                    <span className="font-size">
                      <span style={{ color: avlSrc }}>
                        <i class="fas fa-circle fa-sm me-1"></i>
                      </span>
                      <span className="text-success">
                        <i class="fas fa-circle fa-sm me-1"></i>
                      </span>
                      Refundable
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-size">
                      <span style={{ color: avlSrc }}>
                        <i class="fas fa-circle fa-sm me-1"></i>
                      </span>
                      <span className="text-danger">
                        <i class="fas fa-circle fa-sm me-1"></i>
                      </span>
                      Non-Refundable
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="col-lg-2 my-auto text-center">
            <h5 className="text-end text-color fw-bold">
              {/* {currency !== undefined ? currency : "BDT"}  {totalPrice + bookingComponents[0].agentAdditionalPrice} */}
              {amountChange === "Invoice Amount" ? (
                <>
                  <div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "12px" }}
                    >
                      {currency !== undefined ? currency : "BDT"}{" "}
                      {(
                        totalPrice + bookingComponents[0].agentAdditionalPrice
                      ).toLocaleString("en-US")}
                    </div>
                    {currency !== undefined ? currency : "BDT"}{" "}
                    {(
                      totalPrice -
                      bookingComponents[0].discountPrice +
                      (bookingComponents[0].agentAdditionalPrice < 0
                        ? 0
                        : bookingComponents[0].agentAdditionalPrice)
                    ).toLocaleString("en-US")}
                  </div>
                </>
              ) : (
                <div>
                  {currency !== undefined ? currency : "BDT"}{" "}
                  {(
                    totalPrice -
                    bookingComponents[0].discountPrice +
                    (bookingComponents[0].agentAdditionalPrice < 0
                      ? 0
                      : bookingComponents[0].agentAdditionalPrice)
                  ).toLocaleString("en-US")}
                </div>
              )}
            </h5>
            <Link
              to="/travellcart"
              className="btn button-color text-white fw-bold w-100 my-2 rounded"
              // id={"select-flight-click" + props.index}
              onClick={handleSelectFlight}
            >
              Select Flight
            </Link>
            <Link
              to=""
              style={{ textDecoration: "none" }}
              className="text-color font-size"
              data-bs-toggle="modal"
              data-bs-target={"#exampleModal" + props.index}
            >
              Flight Details
            </Link>
            <h6
              className="text-color text-center font-size"
              id={"priceDown" + props.index}
              style={{ cursor: "pointer" }}
            >
              Price Breakdown{" "}
              <span>
                <i class="fas fa-angle-down"></i>
              </span>
            </h6>
          </div>
          {/* end of check price click section */}

          {/* check price section  */}
          {/* <div className="border-top" id={"check-price" + props.index}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex align-item-center py-3">
                    <span className="text-color">
                      <i className="fas fa-plane fa-2x"></i>
                    </span>
                    <h2 className="ms-2">Select fare type</h2>
                  </div>
                </div>
              </div>
              <div className="row p-2 mb-4 gap-2 mx-auto">
                <div className="col-lg-4 shadow" style={{ width: "18rem" }}>
                  <div className="row py-4 border-bottom rounded">
                    <div className="col-lg-6">
                      <h6 className="text-color fw-bold">LIGHT</h6>
                    </div>
                    <div className="col-lg-6">
                      <h6 className="text-color fw-bold text-end">
                        {currency !== undefined ? currency : "BDT"} 9,000
                      </h6>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-lg-12">
                      <p>Baggage</p>
                      <p>
                        <span className="text-color pe-1">
                          <i className="fas fa-check"></i>
                        </span>
                        7 KG cabin baggage
                      </p>
                      <p>
                        <span className="text-color pe-1">
                          <i className="fas fa-times"></i>
                        </span>
                        No Checked baggage
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <p>Flexibility</p>
                      <p>
                        <span className="text-dander pe-1">
                          <i className="fas fa-times"></i>
                        </span>
                        Non-refundable fare
                      </p>
                      <p>
                        <span className="text-color pe-1">
                          <i className="fas fa-times"></i>
                        </span>
                        Changeable with fees
                      </p>
                    </div>
                  </div>
                  <div className="row pb-3">
                    <div className="col-lg-12">
                      <button className="btn btn-success w-100">Select</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 shadow" style={{ width: "18rem" }}>
                  <div className="row py-4 border-bottom rounded">
                    <div className="col-lg-6">
                      <h6 className="text-color fw-bold">VALUE</h6>
                    </div>
                    <div className="col-lg-6">
                      <h6 className="text-color fw-bold text-end">
                        {currency !== undefined ? currency : "BDT"} 10,000
                      </h6>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-lg-12">
                      <p>Baggage</p>
                      <p>
                        <span className="text-color pe-1">
                          <i className="fas fa-check"></i>
                        </span>
                        7 KG cabin baggage
                      </p>
                      <p>
                        <span className="text-color pe-1">
                          <i className="fas fa-times"></i>
                        </span>
                        No Checked baggage
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <p>Flexibility</p>
                      <p>
                        <span className="text-dander pe-1">
                          <i className="fas fa-times"></i>
                        </span>
                        Non-refundable fare
                      </p>
                      <p>
                        <span className="text-color pe-1">
                          <i className="fas fa-times"></i>
                        </span>
                        Changeable with fees
                      </p>
                    </div>
                  </div>
                  <div className="row pb-3">
                    <div className="col-lg-12">
                      <button className="btn btn-success w-100">Select</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 shadow" style={{ width: "18rem" }}>
                  <div className="row py-4 border-bottom rounded">
                    <div className="col-lg-6">
                      <h6 className="text-color fw-bold">PLUS</h6>
                    </div>
                    <div className="col-lg-6">
                      <h6 className="text-color fw-bold text-end">
                        {currency !== undefined ? currency : "BDT"} 12,000
                      </h6>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-lg-12">
                      <p>Baggage</p>
                      <p>
                        <span className="text-color pe-1">
                          <i className="fas fa-check"></i>
                        </span>
                        7 KG cabin baggage
                      </p>
                      <p>
                        <span className="text-color pe-1">
                          <i className="fas fa-times"></i>
                        </span>
                        No Checked baggage
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <p>Flexibility</p>
                      <p>
                        <span className="text-dander pe-1">
                          <i className="fas fa-times"></i>
                        </span>
                        Non-refundable fare
                      </p>
                      <p>
                        <span className="text-color pe-1">
                          <i className="fas fa-times"></i>
                        </span>
                        Changeable with fees
                      </p>
                    </div>
                  </div>
                  <div className="row pb-3">
                    <div className="col-lg-12">
                      <button className="btn btn-success w-100">Select</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* end of check price section */}
          <div
            className="table-responsive-sm mt-1"
            id={"passengerBrackdown" + props.index}
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
                      <td className="left">Adult</td>
                      <td className="left">
                        {(
                          passengerFares.adt.basePrice +
                          bookingComponents[0].agentAdditionalPrice /
                            (passengerCounts.adt +
                              (passengerCounts.cnn !== null
                                ? passengerCounts.cnn
                                : 0) +
                              (passengerCounts.inf !== null
                                ? passengerCounts.inf
                                : 0))
                        ).toLocaleString("en-US")}
                      </td>
                      <td className="center">
                        {passengerFares.adt.taxes.toLocaleString("en-US")}
                      </td>
                      <td className="right">
                        {passengerFares.adt.discountPrice.toLocaleString(
                          "en-US"
                        )}
                      </td>
                      <td className="right">
                        {passengerFares.adt.ait.toLocaleString("en-US")}
                      </td>
                      <td className="right">{passengerCounts.adt}</td>
                      {isTempInspector !== null && isTempInspector == "true" ? (
                        <>
                          <td
                            className="right fw-bold"
                            title={
                              bookingComponents[0]?.fareReference !== ""
                                ? JSON.parse(
                                    base64_decode(
                                      bookingComponents[0]?.fareReference
                                    )
                                  ).map((item) => {
                                    return (
                                      item.Id +
                                      "(" +
                                      (item.IsDefault == true &&
                                      item.IsAgent == false
                                        ? "Default"
                                        : item.IsDefault == false &&
                                          item.IsAgent == false
                                        ? "Dynamic"
                                        : item.IsDefault == false &&
                                          item.IsAgent == true
                                        ? "Agent"
                                        : "") +
                                      ") " +
                                      (item.DiscountType == 1
                                        ? "Markup"
                                        : "Discount") +
                                      " " +
                                      item.Value +
                                      (item.Type == 1 ? "%" : "") +
                                      "\n"
                                    );
                                  })
                                : ""
                            }
                          >
                            {currency !== undefined ? currency : "BDT"}{" "}
                            {(
                              passengerFares.adt.totalPrice *
                                passengerCounts.adt +
                              bookingComponents[0].agentAdditionalPrice /
                                (passengerCounts.adt +
                                  (passengerCounts.cnn !== null
                                    ? passengerCounts.cnn
                                    : 0) +
                                  (passengerCounts.inf !== null
                                    ? passengerCounts.inf
                                    : 0))
                            ).toLocaleString("en-US")}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="right fw-bold">
                            {currency !== undefined ? currency : "BDT"}{" "}
                            {(
                              passengerFares.adt.totalPrice *
                                passengerCounts.adt +
                              bookingComponents[0].agentAdditionalPrice /
                                (passengerCounts.adt +
                                  (passengerCounts.cnn !== null
                                    ? passengerCounts.cnn
                                    : 0) +
                                  (passengerCounts.inf !== null
                                    ? passengerCounts.inf
                                    : 0))
                            ).toLocaleString("en-US")}
                          </td>
                        </>
                      )}
                    </tr>
                  </>
                ) : (
                  <></>
                )}

                {passengerFares.cnn !== null ? (
                  <>
                    <tr>
                      <td className="left">Child</td>
                      <td className="left">
                        {(
                          passengerFares.cnn.basePrice +
                          bookingComponents[0].agentAdditionalPrice /
                            (passengerCounts.adt +
                              (passengerCounts.cnn !== null
                                ? passengerCounts.cnn
                                : 0) +
                              (passengerCounts.inf !== null
                                ? passengerCounts.inf
                                : 0))
                        ).toLocaleString("en-US")}
                      </td>
                      <td className="center">
                        {passengerFares.cnn.taxes.toLocaleString("en-US")}
                      </td>
                      <td className="right">
                        {passengerFares.cnn.discountPrice.toLocaleString(
                          "en-US"
                        )}
                      </td>
                      <td className="right">
                        {passengerFares.cnn.ait.toLocaleString("en-US")}
                      </td>
                      <td className="right">{passengerCounts.cnn}</td>
                      {isTempInspector !== null && isTempInspector == "true" ? (
                        <>
                          {" "}
                          <td
                            className="right fw-bold"
                            title={
                              bookingComponents[0]?.fareReference !== ""
                                ? JSON.parse(
                                    base64_decode(
                                      bookingComponents[0]?.fareReference
                                    )
                                  ).map((item) => {
                                    return (
                                      item.Id +
                                      "(" +
                                      (item.IsDefault == true &&
                                      item.IsAgent == false
                                        ? "Default"
                                        : item.IsDefault == false &&
                                          item.IsAgent == false
                                        ? "Dynamic"
                                        : item.IsDefault == false &&
                                          item.IsAgent == true
                                        ? "Agent"
                                        : "") +
                                      ") " +
                                      (item.DiscountType == 1
                                        ? "Markup"
                                        : "Discount") +
                                      " " +
                                      item.Value +
                                      (item.Type == 1 ? "%" : "") +
                                      "\n"
                                    );
                                  })
                                : ""
                            }
                          >
                            {currency !== undefined ? currency : "BDT"}{" "}
                            {(
                              passengerFares.cnn.totalPrice *
                                passengerCounts.cnn +
                              bookingComponents[0].agentAdditionalPrice /
                                (passengerCounts.adt +
                                  (passengerCounts.cnn !== null
                                    ? passengerCounts.cnn
                                    : 0) +
                                  (passengerCounts.inf !== null
                                    ? passengerCounts.inf
                                    : 0))
                            ).toLocaleString("en-US")}
                          </td>
                        </>
                      ) : (
                        <>
                          {" "}
                          <td className="right fw-bold">
                            {currency !== undefined ? currency : "BDT"}{" "}
                            {(
                              passengerFares.cnn.totalPrice *
                                passengerCounts.cnn +
                              bookingComponents[0].agentAdditionalPrice /
                                (passengerCounts.adt +
                                  (passengerCounts.cnn !== null
                                    ? passengerCounts.cnn
                                    : 0) +
                                  (passengerCounts.inf !== null
                                    ? passengerCounts.inf
                                    : 0))
                            ).toLocaleString("en-US")}
                          </td>
                        </>
                      )}
                    </tr>
                  </>
                ) : (
                  <></>
                )}

                {passengerFares.inf !== null ? (
                  <>
                    <tr>
                      <td className="left">Infant</td>
                      <td className="left">
                        {(
                          passengerFares.inf.basePrice +
                          bookingComponents[0].agentAdditionalPrice /
                            (passengerCounts.adt +
                              (passengerCounts.cnn !== null
                                ? passengerCounts.cnn
                                : 0) +
                              (passengerCounts.inf !== null
                                ? passengerCounts.inf
                                : 0))
                        ).toLocaleString("en-US")}
                      </td>
                      <td className="center">
                        {passengerFares.inf.taxes.toLocaleString("en-US")}
                      </td>
                      <td className="right">
                        {passengerFares.inf.discountPrice.toLocaleString(
                          "en-US"
                        )}
                      </td>
                      <td className="right">
                        {passengerFares.inf.ait.toLocaleString("en-US")}
                      </td>
                      <td className="right">{passengerCounts.inf}</td>
                      {isTempInspector !== null && isTempInspector == "true" ? (
                        <>
                          {" "}
                          <td
                            className="right fw-bold"
                            title={
                              bookingComponents[0]?.fareReference !== ""
                                ? JSON.parse(
                                    base64_decode(
                                      bookingComponents[0]?.fareReference
                                    )
                                  ).map((item) => {
                                    return (
                                      item.Id +
                                      "(" +
                                      (item.IsDefault == true &&
                                      item.IsAgent == false
                                        ? "Default"
                                        : item.IsDefault == false &&
                                          item.IsAgent == false
                                        ? "Dynamic"
                                        : item.IsDefault == false &&
                                          item.IsAgent == true
                                        ? "Agent"
                                        : "") +
                                      ") " +
                                      (item.DiscountType == 1
                                        ? "Markup"
                                        : "Discount") +
                                      " " +
                                      item.Value +
                                      (item.Type == 1 ? "%" : "") +
                                      "\n"
                                    );
                                  })
                                : " "
                            }
                          >
                            {currency !== undefined ? currency : "BDT"}{" "}
                            {(
                              passengerFares.inf.totalPrice *
                                passengerCounts.inf +
                              bookingComponents[0].agentAdditionalPrice /
                                (passengerCounts.adt +
                                  (passengerCounts.cnn !== null
                                    ? passengerCounts.cnn
                                    : 0) +
                                  (passengerCounts.inf !== null
                                    ? passengerCounts.inf
                                    : 0))
                            ).toLocaleString("en-US")}
                          </td>
                        </>
                      ) : (
                        <>
                          {" "}
                          <td
                            className="right fw-bold"
                            onLoadedData={(e) => console.log({ e })}
                          >
                            {currency !== undefined ? currency : "BDT"}{" "}
                            {(
                              passengerFares.inf.totalPrice *
                                passengerCounts.inf +
                              bookingComponents[0].agentAdditionalPrice /
                                (passengerCounts.adt +
                                  (passengerCounts.cnn !== null
                                    ? passengerCounts.cnn
                                    : 0) +
                                  (passengerCounts.inf !== null
                                    ? passengerCounts.inf
                                    : 0))
                            ).toLocaleString("en-US")}
                          </td>
                        </>
                      )}
                    </tr>
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal option */}
        <ShowModal
          key={props.index}
          flag={0}
          index={props.index}
          flightType={flightType}
          direction0={direction0}
          direction1={direction1}
          direction2={direction2}
          direction3={direction3}
          direction4={direction4}
          direction5={direction5}
          totalPrice={totalPrice}
          bookingComponents={bookingComponents}
          refundable={refundable}
          uniqueTransID={uniqueTransID}
          itemCodeRef={itemCodeRef}
          passengerCounts={passengerCounts}
          passengerFares={passengerFares}
          currency={currency}
        ></ShowModal>

        {/* show more section  */}

        {(directions[0] !== undefined && directions[0].length > 1) ||
        (directions[1] !== undefined && directions[1].length > 1) ||
        (directions[2] !== undefined && directions[2].length > 1) ||
        (directions[3] !== undefined && directions[3].length > 1) ||
        (directions[4] !== undefined && directions[4].length > 1) ||
        (directions[5] !== undefined && directions[5].length > 1) ? (
          <>
            <div className="position-relative" id={"show-option" + props.index}>
              <div className="position-absolute top-100 start-50 translate-middle">
                <p className="show-hide">
                  Show{" "}
                  {directions[0].length -
                    1 +
                    (directions[1] !== undefined
                      ? directions[1].length - 1
                      : 0)}{" "}
                  more options
                </p>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* end of show more section */}

        {/* toggle option for hide */}
        <div
          className="row mb-5 mx-3 py-2 rounded box-shadow bg-white"
          id={"toggle-option" + props.index}
        >
          <div className="col-lg-10">
            {/* up flight section for hide*/}
            {flightType === "Multi City" ? (
              <></>
            ) : (
              <>
                <div className="row">
                  <div className="col-lg-3 m-1">
                    <span className="text-white button-color py-1 px-3 text-center">
                      <span className="me-1">
                        <i className="fas fa-plane fa-sm"></i>
                      </span>
                      Departure
                    </span>
                  </div>
                </div>
              </>
            )}

            {flightType === "Multi City" ? (
              <>
                {directions[0].map((item, index) => (
                  <div key={index}>
                    {index === 0 ? (
                      <p className="text-white button-color py-1 m-1 fw-bold text-center">
                        <span className="me-1">
                          <i className="fas fa-plane fa-sm"></i>
                        </span>
                        Departure : {item.from} - {item.to}
                      </p>
                    ) : (
                      <></>
                    )}
                    <div
                      className={
                        index === idxD1
                          ? "border text-color m-1 selected-bg-color"
                          : "border text-color m-1"
                      }
                    >
                      <div className="row p-2">
                        <div className="col-lg-1 my-auto">
                          <img
                            src={ImageUrlD}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="my-auto flighttime">
                            {item.platingCarrierName}
                          </h6>
                          <h6 className="my-auto flighttime">
                            {item.segments[0].details[0].equipment}
                          </h6>
                          <h6 className="flighttime">
                            {item.platingCarrierCode} -{" "}
                            {item.segments[0].flightNumber}
                          </h6>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.from}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[0].departure.substr(11, 5)}
                            </span>
                          </h6>
                          <h6 className="flighttime">
                            {moment(item.segments[0].departure).format(
                              "DD MMM,yyyy, ddd"
                            )}
                          </h6>
                          <h6 className="flighttime">
                            {airports
                              .filter((f) => f.iata === item.from)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-4 my-auto">
                          <div className="row lh-1">
                            <div className="col-lg-12 text-center">
                              <span className="text-color font-size">
                                {directions[0][0].segments.length === 1
                                  ? "Direct"
                                  : directions[0][0].segments.length -
                                    1 +
                                    " Stop"}
                              </span>
                            </div>
                            <div className="col-lg-12 text-center">
                              <span className="text-color">
                                <i class="fas fa-circle fa-xs"></i>
                                -----------------------
                                <i className="fas fa-plane fa-sm"></i>
                              </span>
                            </div>
                            <div className="col-lg-12 text-center">
                              <span className="text-color me-5">
                                <i className="fas fa-clock fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {totalFlightDuration(item.segments)}
                                </span>
                              </span>
                              <span className="text-color">
                                <i className="fas fa-briefcase fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].baggage[0]?.amount +
                                    " " +
                                    item.segments[0].baggage[0]?.units}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.to}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[
                                item.segments.length - 1
                              ].arrival.substr(11, 5)}
                            </span>
                            <sup>
                              &nbsp;
                              {dayCount(
                                item.segments[item.segments.length - 1].arrival,
                                item.segments[0]?.departure
                              ) !== 0 ? (
                                <span
                                  className="text-danger"
                                  style={{ fontSize: "8px" }}
                                >
                                  +
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  )}
                                </span>
                              ) : (
                                ""
                              )}{" "}
                            </sup>
                          </h6>
                          <h6 className="flighttime">
                            {moment(
                              item.segments[item.segments.length - 1].arrival
                            ).format("DD MMM,yyyy, ddd")}
                          </h6>
                          <h6 className="flighttime">
                            {airports
                              .filter((f) => f.iata === item.to)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-1 mx-auto my-auto">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value={index}
                              name={"chooseoption0" + props.index}
                              onChange={() => selectDirectionOption0(index)}
                              defaultChecked={index === 0 ? true : false}
                              // onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {directions.length > 1 ? (
                  <>
                    {directions[1].map((item, index) => (
                      <>
                        {index === 0 ? (
                          <p className="text-white button-color py-1 m-1 fw-bold text-center">
                            <span className="me-1">
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                            Departure : {item.from} - {item.to}
                          </p>
                        ) : (
                          <></>
                        )}
                        <div
                          className={
                            index === idxD2
                              ? "border text-color m-1 selected-bg-color"
                              : "border text-color m-1"
                          }
                        >
                          <div className="row p-2">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlD}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="my-auto flighttime">
                                {item.platingCarrierName}
                              </h6>
                              <h6 className="my-auto flighttime">
                                {item.segments[0].details[0].equipment}
                              </h6>
                              <h6 className="flighttime">
                                {item.platingCarrierCode} -{" "}
                                {item.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="fw-bold">
                                <span className="fs-5">{item.from}</span>
                                <span className="ms-1 fs-5">
                                  {item.segments[0].departure.substr(11, 5)}
                                </span>
                              </h6>
                              <h6 className="flighttime">
                                {moment(item.segments[0].departure).format(
                                  "DD MMM,yyyy, ddd"
                                )}
                              </h6>
                              <h6 className="flighttime">
                                {airports
                                  .filter((f) => f.iata === item.from)
                                  .map((item) => item.city)}
                              </h6>
                            </div>
                            <div className="col-lg-4 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color font-size">
                                    {directions[0][0].segments.length === 1
                                      ? "Direct"
                                      : directions[0][0].segments.length -
                                        1 +
                                        " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    -----------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {totalFlightDuration(item.segments)}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {item.segments[0].baggage[0]?.amount +
                                        " " +
                                        item.segments[0].baggage[0]?.units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="fw-bold">
                                <span className="fs-5">{item.to}</span>
                                <span className="ms-1 fs-5">
                                  {item.segments[
                                    item.segments.length - 1
                                  ].arrival.substr(11, 5)}
                                </span>
                                <sup>
                                  &nbsp;
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  ) !== 0 ? (
                                    <span
                                      className="text-danger"
                                      style={{ fontSize: "8px" }}
                                    >
                                      +
                                      {dayCount(
                                        item.segments[item.segments.length - 1]
                                          .arrival,
                                        item.segments[0]?.departure
                                      )}
                                    </span>
                                  ) : (
                                    ""
                                  )}{" "}
                                </sup>
                              </h6>
                              <h6 className="flighttime">
                                {moment(
                                  item.segments[item.segments.length - 1]
                                    .arrival
                                ).format("DD MMM,yyyy, ddd")}
                              </h6>
                              <h6 className="flighttime">
                                {airports
                                  .filter((f) => f.iata === item.to)
                                  .map((item) => item.city)}
                              </h6>
                            </div>
                            <div className="col-lg-1 mx-auto my-auto">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  value={index}
                                  name={"chooseoption1" + props.index}
                                  onChange={() => selectDirectionOption1(index)}
                                  defaultChecked={index === 0 ? true : false}
                                  // onChange={handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault2"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )}
                {directions.length > 2 ? (
                  <>
                    {directions[2].map((item, index) => (
                      <>
                        {index === 0 ? (
                          <p className="text-white button-color py-1 m-1 fw-bold text-center">
                            <span className="me-1">
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                            Departure : {item.from} - {item.to}
                          </p>
                        ) : (
                          <></>
                        )}
                        <div
                          className={
                            index === idxD3
                              ? "border text-color m-1 selected-bg-color"
                              : "border text-color m-1"
                          }
                        >
                          <div className="row p-2">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlD}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="my-auto flighttime">
                                {item.platingCarrierName}
                              </h6>
                              <h6 className="my-auto flighttime">
                                {item.segments[0].details[0].equipment}
                              </h6>
                              <h6 className="flighttime">
                                {item.platingCarrierCode} -{" "}
                                {item.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="fw-bold">
                                <span className="fs-5">{item.from}</span>
                                <span className="ms-1 fs-5">
                                  {item.segments[0].departure.substr(11, 5)}
                                </span>
                              </h6>
                              <h6 className="flighttime">
                                {moment(item.segments[0].departure).format(
                                  "DD MMM,yyyy, ddd"
                                )}
                              </h6>
                              <h6 className="flighttime">
                                {airports
                                  .filter((f) => f.iata === item.from)
                                  .map((item) => item.city)}
                              </h6>
                            </div>
                            <div className="col-lg-4 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color font-size">
                                    {directions[0][0].segments.length === 1
                                      ? "Direct"
                                      : directions[0][0].segments.length -
                                        1 +
                                        " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    -----------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {totalFlightDuration(item.segments)}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {item.segments[0].baggage[0]?.amount +
                                        " " +
                                        item.segments[0].baggage[0]?.units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="fw-bold">
                                <span className="fs-5">{item.to}</span>
                                <span className="ms-1 fs-5">
                                  {item.segments[
                                    item.segments.length - 1
                                  ].arrival.substr(11, 5)}
                                </span>
                                <sup>
                                  &nbsp;
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  ) !== 0 ? (
                                    <span
                                      className="text-danger"
                                      style={{ fontSize: "8px" }}
                                    >
                                      +
                                      {dayCount(
                                        item.segments[item.segments.length - 1]
                                          .arrival,
                                        item.segments[0]?.departure
                                      )}
                                    </span>
                                  ) : (
                                    ""
                                  )}{" "}
                                </sup>
                              </h6>
                              <h6 className="flighttime">
                                {moment(
                                  item.segments[item.segments.length - 1]
                                    .arrival
                                ).format("DD MMM,yyyy, ddd")}
                              </h6>
                              <h6 className="flighttime">
                                {airports
                                  .filter((f) => f.iata === item.to)
                                  .map((item) => item.city)}
                              </h6>
                            </div>
                            <div className="col-lg-1 mx-auto my-auto">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  value={index}
                                  name={"chooseoption2" + props.index}
                                  onChange={() => selectDirectionOption2(index)}
                                  defaultChecked={index === 0 ? true : false}
                                  // onChange={handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault2"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )}

                {directions.length > 3 ? (
                  <>
                    {directions[3].map((item, index) => (
                      <div key={index}>
                        {index === 0 ? (
                          <p className="text-white button-color py-1 m-1 fw-bold text-center">
                            <span className="me-1">
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                            Departure : {item.from} - {item.to}
                          </p>
                        ) : (
                          <></>
                        )}
                        <div
                          className={
                            index === idxD4
                              ? "border text-color m-1 selected-bg-color"
                              : "border text-color m-1"
                          }
                        >
                          <div className="row p-2">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlD}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="my-auto flighttime">
                                {item.platingCarrierName}
                              </h6>
                              <h6 className="my-auto flighttime">
                                {item.segments[0].details[0].equipment}
                              </h6>
                              <h6 className="flighttime">
                                {item.platingCarrierCode} -{" "}
                                {item.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="fw-bold">
                                <span className="fs-5">{item.from}</span>
                                <span className="ms-1 fs-5">
                                  {item.segments[0].departure.substr(11, 5)}
                                </span>
                              </h6>
                              <h6 className="flighttime">
                                {moment(item.segments[0].departure).format(
                                  "DD MMM,yyyy, ddd"
                                )}
                              </h6>
                              <h6 className="flighttime">
                                {airports
                                  .filter((f) => f.iata === item.from)
                                  .map((item) => item.city)}
                              </h6>
                            </div>
                            <div className="col-lg-4 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color font-size">
                                    {directions[0][0].segments.length === 1
                                      ? "Direct"
                                      : directions[0][0].segments.length -
                                        1 +
                                        " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    -----------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {totalFlightDuration(item.segments)}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {item.segments[0].baggage[0]?.amount +
                                        " " +
                                        item.segments[0].baggage[0]?.units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="fw-bold">
                                <span className="fs-5">{item.to}</span>
                                <span className="ms-1 fs-5">
                                  {item.segments[
                                    item.segments.length - 1
                                  ].arrival.substr(11, 5)}
                                </span>
                                <sup>
                                  &nbsp;
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  ) !== 0 ? (
                                    <span
                                      className="text-danger"
                                      style={{ fontSize: "8px" }}
                                    >
                                      +
                                      {dayCount(
                                        item.segments[item.segments.length - 1]
                                          .arrival,
                                        item.segments[0]?.departure
                                      )}
                                    </span>
                                  ) : (
                                    ""
                                  )}{" "}
                                </sup>
                              </h6>
                              <h6 className="flighttime">
                                {moment(
                                  item.segments[item.segments.length - 1]
                                    .arrival
                                ).format("DD MMM,yyyy, ddd")}
                              </h6>
                              <h6 className="flighttime">
                                {airports
                                  .filter((f) => f.iata === item.to)
                                  .map((item) => item.city)}
                              </h6>
                            </div>
                            <div className="col-lg-1 mx-auto my-auto">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  value={index}
                                  name={"chooseoption3" + props.index}
                                  onChange={() => selectDirectionOption3(index)}
                                  defaultChecked={index === 0 ? true : false}
                                  // onChange={handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault2"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}
                {directions.length > 4 ? (
                  <>
                    {directions[4].map((item, index) => (
                      <div key={index}>
                        {index === 0 ? (
                          <p className="text-white button-color py-1 m-1 fw-bold text-center">
                            <span className="me-1">
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                            Departure : {item.from} - {item.to}
                          </p>
                        ) : (
                          <></>
                        )}
                        <div
                          className={
                            index === idxD5
                              ? "border text-color m-1 selected-bg-color"
                              : "border text-color m-1"
                          }
                        >
                          <div className="row p-2">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlD}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="my-auto flighttime">
                                {item.platingCarrierName}
                              </h6>
                              <h6 className="my-auto flighttime">
                                {item.segments[0].details[0].equipment}
                              </h6>
                              <h6 className="flighttime">
                                {item.platingCarrierCode} -{" "}
                                {item.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="fw-bold">
                                <span className="fs-5">{item.from}</span>
                                <span className="ms-1 fs-5">
                                  {item.segments[0].departure.substr(11, 5)}
                                </span>
                              </h6>
                              <h6 className="flighttime">
                                {moment(item.segments[0].departure).format(
                                  "DD MMM,yyyy, ddd"
                                )}
                              </h6>
                              <h6 className="flighttime">
                                {airports
                                  .filter((f) => f.iata === item.from)
                                  .map((item) => item.city)}
                              </h6>
                            </div>
                            <div className="col-lg-4 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color font-size">
                                    {directions[0][0].segments.length === 1
                                      ? "Direct"
                                      : directions[0][0].segments.length -
                                        1 +
                                        " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    -----------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {totalFlightDuration(item.segments)}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {item.segments[0].baggage[0]?.amount +
                                        " " +
                                        item.segments[0].baggage[0]?.units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="fw-bold">
                                <span className="fs-5">{item.to}</span>
                                <span className="ms-1 fs-5">
                                  {item.segments[
                                    item.segments.length - 1
                                  ].arrival.substr(11, 5)}
                                </span>
                                <sup>
                                  &nbsp;
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  ) !== 0 ? (
                                    <span
                                      className="text-danger"
                                      style={{ fontSize: "8px" }}
                                    >
                                      +
                                      {dayCount(
                                        item.segments[item.segments.length - 1]
                                          .arrival,
                                        item.segments[0]?.departure
                                      )}
                                    </span>
                                  ) : (
                                    ""
                                  )}{" "}
                                </sup>
                              </h6>
                              <h6 className="flighttime">
                                {moment(
                                  item.segments[item.segments.length - 1]
                                    .arrival
                                ).format("DD MMM,yyyy, ddd")}
                              </h6>
                              <h6 className="flighttime">
                                {airports
                                  .filter((f) => f.iata === item.to)
                                  .map((item) => item.city)}
                              </h6>
                            </div>
                            <div className="col-lg-1 mx-auto my-auto">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  value={index}
                                  name={"chooseoption4" + props.index}
                                  onChange={() => selectDirectionOption4(index)}
                                  defaultChecked={index === 0 ? true : false}
                                  // onChange={handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault2"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}

                {directions.length > 5 ? (
                  <>
                    {directions[5].map((item, index) => (
                      <div key={index}>
                        {index === 0 ? (
                          <p className="text-white button-color py-1 m-1 fw-bold text-center">
                            <span className="me-1">
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                            Departure : {item.from} - {item.to}
                          </p>
                        ) : (
                          <></>
                        )}
                        <div
                          className={
                            index === idxD6
                              ? "border text-color m-1 selected-bg-color"
                              : "border text-color m-1"
                          }
                        >
                          <div className="row p-2">
                            <div className="col-lg-1 my-auto">
                              <img
                                src={ImageUrlD}
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="my-auto flighttime">
                                {item.platingCarrierName}
                              </h6>
                              <h6 className="my-auto flighttime">
                                {item.segments[0].details[0].equipment}
                              </h6>
                              <h6 className="flighttime">
                                {item.platingCarrierCode} -{" "}
                                {item.segments[0].flightNumber}
                              </h6>
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="fw-bold">
                                <span className="fs-5">{item.from}</span>
                                <span className="ms-1 fs-5">
                                  {item.segments[0].departure.substr(11, 5)}
                                </span>
                              </h6>
                              <h6 className="flighttime">
                                {moment(item.segments[0].departure).format(
                                  "DD MMM,yyyy, ddd"
                                )}
                              </h6>
                              <h6 className="flighttime">
                                {airports
                                  .filter((f) => f.iata === item.from)
                                  .map((item) => item.city)}
                              </h6>
                            </div>
                            <div className="col-lg-4 my-auto">
                              <div className="row lh-1">
                                <div className="col-lg-12 text-center">
                                  <span className="text-color font-size">
                                    {directions[0][0].segments.length === 1
                                      ? "Direct"
                                      : directions[0][0].segments.length -
                                        1 +
                                        " Stop"}
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color">
                                    <i class="fas fa-circle fa-xs"></i>
                                    -----------------------
                                    <i className="fas fa-plane fa-sm"></i>
                                  </span>
                                </div>
                                <div className="col-lg-12 text-center">
                                  <span className="text-color me-5">
                                    <i className="fas fa-clock fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {totalFlightDuration(item.segments)}
                                    </span>
                                  </span>
                                  <span className="text-color">
                                    <i className="fas fa-briefcase fa-sm"></i>
                                    <span className="ms-1 font-size">
                                      {item.segments[0].baggage[0]?.amount +
                                        " " +
                                        item.segments[0].baggage[0]?.units}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2 my-auto">
                              <h6 className="fw-bold">
                                <span className="fs-5">{item.to}</span>
                                <span className="ms-1 fs-5">
                                  {item.segments[
                                    item.segments.length - 1
                                  ].arrival.substr(11, 5)}
                                </span>
                                <sup>
                                  &nbsp;
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  ) !== 0 ? (
                                    <span
                                      className="text-danger"
                                      style={{ fontSize: "8px" }}
                                    >
                                      +
                                      {dayCount(
                                        item.segments[item.segments.length - 1]
                                          .arrival,
                                        item.segments[0]?.departure
                                      )}
                                    </span>
                                  ) : (
                                    ""
                                  )}{" "}
                                </sup>
                              </h6>
                              <h6 className="flighttime">
                                {moment(
                                  item.segments[item.segments.length - 1]
                                    .arrival
                                ).format("DD MMM,yyyy, ddd")}
                              </h6>
                              <h6 className="flighttime">
                                {airports
                                  .filter((f) => f.iata === item.to)
                                  .map((item) => item.city)}
                              </h6>
                            </div>
                            <div className="col-lg-1 mx-auto my-auto">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  value={index}
                                  name={"chooseoption5" + props.index}
                                  onChange={() => selectDirectionOption5(index)}
                                  defaultChecked={index === 0 ? true : false}
                                  // onChange={handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault2"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {directions[0].map((item, index) => (
                  <div
                    key={index}
                    className={
                      index === idxD
                        ? "border text-color m-1 selected-bg-color"
                        : "border text-color m-1"
                    }
                  >
                    {/* {console.log(item.length)} */}
                    <div className="row p-2 ">
                      <div className="col-lg-1 my-auto">
                        <img
                          src={ImageUrlD}
                          alt=""
                          width="40px"
                          height="40px"
                        />
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto flighttime">
                          {item.platingCarrierName}
                        </h6>
                        <h6 className="my-auto flighttime">
                          {item.segments[0].details[0].equipment}
                        </h6>
                        <h6 className="flighttime">
                          {item.platingCarrierCode} -{" "}
                          {item.segments[0].flightNumber}
                        </h6>
                      </div>
                      <div className="col-lg-2 my-auto">
                        {/* <span className="fw-bold">
                        {item.segments[0].departure.substr(11, 5)}
                      </span>
                      <p className="my-auto">{item.from}</p> */}
                        <h6 className="fw-bold">
                          <span className="fs-5">{item.from}</span>
                          <span className="ms-1 fs-5">
                            {item.segments[0].departure.substr(11, 5)}
                          </span>
                          {/* {directions[0][0].segments[0].departure.substr(11, 5)} */}
                        </h6>
                        <h6 className="flighttime">
                          {moment(item.segments[0].departure).format(
                            "DD MMM,yyyy, ddd"
                          )}
                        </h6>
                        <h6 className="flighttime">
                          {airports
                            .filter((f) => f.iata === item.from)
                            .map((item) => item.city)}
                        </h6>
                      </div>
                      <div className="col-lg-4 my-auto">
                        <div className="row lh-1">
                          <div className="col-lg-12 text-center">
                            <span className="text-color font-size">
                              {directions[0][0].segments.length === 1
                                ? "Direct"
                                : directions[0][0].segments.length -
                                  1 +
                                  " Stop"}
                            </span>
                          </div>
                          <div className="col-lg-12 text-center">
                            <span className="text-color">
                              <i class="fas fa-circle fa-xs"></i>
                              -----------------------
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                          </div>
                          <div className="col-lg-12 text-center">
                            <span className="text-color me-5">
                              <i className="fas fa-clock fa-sm"></i>
                              <span className="ms-1 font-size">
                                {totalFlightDuration(item.segments)}
                              </span>
                            </span>
                            <span className="text-color">
                              <i className="fas fa-briefcase fa-sm"></i>
                              <span className="ms-1 font-size">
                                {item.segments[0].baggage[0]?.amount +
                                  " " +
                                  item.segments[0].baggage[0]?.units}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="fw-bold">
                          <span className="fs-5">{item.to}</span>
                          <span className="ms-1 fs-5">
                            {item.segments[
                              item.segments.length - 1
                            ].arrival.substr(11, 5)}
                          </span>
                          <sup>
                            &nbsp;
                            {dayCount(
                              item.segments[item.segments.length - 1].arrival,
                              item.segments[0]?.departure
                            ) !== 0 ? (
                              <span
                                className="text-danger"
                                style={{ fontSize: "8px" }}
                              >
                                +
                                {dayCount(
                                  item.segments[item.segments.length - 1]
                                    .arrival,
                                  item.segments[0]?.departure
                                )}
                              </span>
                            ) : (
                              ""
                            )}{" "}
                          </sup>
                        </h6>
                        <h6 className="flighttime">
                          {moment(
                            item.segments[item.segments.length - 1].arrival
                          ).format("DD MMM,yyyy, ddd")}
                        </h6>
                        <h6 className="flighttime">
                          {airports
                            .filter((f) => f.iata === item.to)
                            .map((item) => item.city)}
                        </h6>
                      </div>
                      <div className="col-lg-1 mx-auto my-auto">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={index}
                            name={"chooseDeparture" + props.index}
                            onChange={() => selectDirectionOption0(index)}
                            defaultChecked={index === 0 ? true : false}
                            // onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {flightType === "Multi City" ? (
              <></>
            ) : (
              <>
                {directions[1] !== undefined ? (
                  <>
                    {" "}
                    <div className="row">
                      <div className="col-lg-12 m-1">
                        <span className="text-white button-color py-1 px-3 text-center">
                          <span className="me-1">
                            <i className="fas fa-plane fa-sm"></i>
                          </span>
                          Return
                        </span>
                      </div>
                    </div>
                    {directions[1].map((item, index) => (
                      <div
                        key={index}
                        className={
                          index === idxA
                            ? "border text-color m-1 selected-bg-color"
                            : "border text-color m-1"
                        }
                      >
                        {/* {console.log(item[0].segments[0].group)} */}
                        <div className="row p-2">
                          <div className="col-lg-1 my-auto">
                            <img
                              src={ImageUrlR}
                              alt=""
                              width="40px"
                              height="40px"
                            />
                          </div>
                          <div className="col-lg-2 my-auto">
                            <h6 className="my-auto flighttime">
                              {item.platingCarrierName}
                            </h6>
                            <h6 className="my-auto flighttime">
                              {item.segments[0].details[0].equipment}
                            </h6>
                            <h6 className="flighttime">
                              {item.platingCarrierCode} -{" "}
                              {item.segments[0].flightNumber}
                            </h6>
                          </div>
                          <div className="col-lg-2 my-auto">
                            <h6 className="fw-bold">
                              <span className="fs-5">{item.from}</span>
                              <span className="ms-1 fs-5">
                                {item.segments[0].departure.substr(11, 5)}
                              </span>
                            </h6>
                            <h6 className="flighttime">
                              {moment(item.segments[0].departure).format(
                                "DD MMM,yyyy, ddd"
                              )}
                            </h6>
                            <h6 className="flighttime">
                              {airports
                                .filter((f) => f.iata === item.from)
                                .map((item) => item.city)}
                            </h6>
                          </div>
                          <div className="col-lg-4 my-auto">
                            <div className="row lh-1">
                              <div className="col-lg-12 text-center">
                                <span className="text-color font-size">
                                  {directions[1][0].segments.length === 1
                                    ? "Direct"
                                    : directions[1][0].segments.length -
                                      1 +
                                      " Stop"}
                                </span>
                              </div>
                              <div className="col-lg-12 text-center">
                                <span className="text-color">
                                  <i class="fas fa-circle fa-xs"></i>
                                  -----------------------
                                  <i className="fas fa-plane fa-sm"></i>
                                </span>
                              </div>
                              <div className="col-lg-12 text-center">
                                <span className="text-color me-5">
                                  <i className="fas fa-clock fa-sm"></i>
                                  <span className="ms-1 font-size">
                                    {totalFlightDuration(item.segments)}
                                  </span>
                                </span>
                                <span className="text-color">
                                  <i className="fas fa-briefcase fa-sm"></i>
                                  <span className="ms-1 font-size">
                                    {item.segments[0].baggage[0]?.amount +
                                      " " +
                                      item.segments[0].baggage[0]?.units}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 my-auto">
                            <h6 className="fw-bold">
                              <span className="fs-5">{item.to}</span>
                              <span className="ms-1 fs-5">
                                {item.segments[
                                  item.segments.length - 1
                                ].arrival.substr(11, 5)}
                              </span>
                              <sup>
                                &nbsp;
                                {dayCount(
                                  item.segments[item.segments.length - 1]
                                    .arrival,
                                  item.segments[0]?.departure
                                ) !== 0 ? (
                                  <span
                                    className="text-danger"
                                    style={{ fontSize: "8px" }}
                                  >
                                    +
                                    {dayCount(
                                      item.segments[item.segments.length - 1]
                                        .arrival,
                                      item.segments[0]?.departure
                                    )}
                                  </span>
                                ) : (
                                  ""
                                )}{" "}
                              </sup>
                            </h6>
                            <h6 className="flighttime">
                              {moment(
                                item.segments[item.segments.length - 1].arrival
                              ).format("DD MMM,yyyy, ddd")}
                            </h6>
                            <h6 className="flighttime">
                              {airports
                                .filter((f) => f.iata === item.to)
                                .map((item) => item.city)}
                            </h6>
                          </div>
                          <div className="col-lg-1 mx-auto my-auto">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                value={index}
                                name={"chooseReturn" + props.index}
                                onChange={() => selectDirectionOption1(index)}
                                defaultChecked={index === 0 ? true : false}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                              ></label>
                            </div>
                          </div>
                        </div>
                        {/* <input type="hidden" value={index1++}></input> */}
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}

            {/* end of return flight section for hide*/}
          </div>
          <div className="col-lg-2 my-auto text-center">
            <h5 className="text-end text-color text-end fw-bold">
              {amountChange === "Invoice Amount" ? (
                <>
                  <div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "12px" }}
                    >
                      {currency !== undefined ? currency : "BDT"}{" "}
                      {totalPrice + bookingComponents[0].agentAdditionalPrice}
                    </div>
                    {currency !== undefined ? currency : "BDT"}{" "}
                    {parseFloat(
                      totalPrice -
                        bookingComponents[0].discountPrice +
                        (bookingComponents[0].agentAdditionalPrice < 0
                          ? 0
                          : bookingComponents[0].agentAdditionalPrice)
                    ).toLocaleString("en-US")}
                  </div>
                </>
              ) : (
                <div>
                  {currency !== undefined ? currency : "BDT"}{" "}
                  {parseFloat(
                    totalPrice -
                      bookingComponents[0].discountPrice +
                      (bookingComponents[0].agentAdditionalPrice < 0
                        ? 0
                        : bookingComponents[0].agentAdditionalPrice)
                  ).toLocaleString("en-US")}
                </div>
              )}
            </h5>

            <button
              type="submit"
              className="btn button-color text-white fw-bold w-100 mb-1 rounded"
              onClick={handleSelectFlight}
            >
              {" "}
              Select Flight
            </button>
            <Link
              to=""
              style={{ textDecoration: "none" }}
              className="fw-bold text-color font-size mx-auto"
              data-bs-toggle="modal"
              data-bs-target={"#exampleModal" + props.index}
            >
              Flight Details
            </Link>
            <p className="text-color text-center font-size">
              {refundable === true ? "Refundable" : "Non-Refundable"}
            </p>
          </div>
        </div>
        {/* end of toggle option for hide */}
        {/* hide more section  */}
        <div className="position-relative" id={"hide-option" + props.index}>
          <div className="position-absolute top-100 start-50 translate-middle">
            <p className="show-hide">Hide more options</p>
          </div>
        </div>
      </>
      <div
        className="modal fade"
        id={"farerulesModal"}
        tabIndex="-1"
        aria-labelledby="farerulesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Fare Rules</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setFareRules()}
              ></button>
            </div>
            <div className="modal-body" style={{ fontSize: "10px" }}>
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {fareRules !== undefined &&
                  fareRules.item2 != undefined &&
                  fareRules !== "" &&
                  fareRules.item1 != null ? (
                    fareRules.item2.isSuccess == true ? (
                      <Tabs>
                        <TabList style={{ overflowY: "scroll" }}>
                          {fareRules.item1.fareRuleDetails.map(
                            (item, index) => {
                              return (
                                <>
                                  <Tab>
                                    <p>{item.type}</p>
                                  </Tab>
                                </>
                              );
                            }
                          )}
                        </TabList>
                        {fareRules.item1.fareRuleDetails.map((item, index) => {
                          return (
                            <>
                              <TabPanel>
                                <div className="panel-content">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item.fareRuleDetail.replace(
                                        /(?:\r\n|\r|\n)/g,
                                        "<br />"
                                      ),
                                    }}
                                  ></div>
                                </div>
                              </TabPanel>
                            </>
                          );
                        })}
                      </Tabs>
                    ) : (
                      <></>
                    )
                  ) : (
                    <>
                      <div className="">
                        <p>
                          * Refund Amount= Received amount from customer -
                          Refund Charge (As per Airline Policy + FirstTrip
                          Convenience Fee)
                        </p>
                        <p>
                          * Date Change Amount= Date change fee as per Airline +
                          Difference of fare if any + FirstTrip Convenience Fee.
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowFlight;
