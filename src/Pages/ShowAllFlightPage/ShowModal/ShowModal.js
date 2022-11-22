import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import airports from "../../../JSON/airports.json";
import "./ShowModal.css";
import Moment from "react-moment";
import moment from "moment";
import layOver from "../../SharePages/Utility/layOver";
import axios from "axios";
import { environment } from "../../SharePages/Utility/environment";
import { Parser } from "html-to-react";
import DurationFormat from "../../SharePages/Utility/DurationFormat";
import {
  addDurations,
  timeDuration,
  totalFlightDuration,
} from "../../../common/functions";
import { Text } from "@chakra-ui/react";
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
  currency,
}) => {
  const ImageUrlD = environment.s3ArliensImage +`${direction0.platingCarrierCode}.png`
  const ImageUrlR =
    Object.keys(direction1).length > 0
      ? environment.s3ArliensImage +`${direction1.platingCarrierCode}.png`
      : ``;
  console.log(direction1);
  useEffect(() => {
    $(document).ready(function () {
      $("#flightId" + index).attr("style", "background:#390404c8");
      $("#baggageId" + index).attr("style", "background:#EC1C1E");
      $("#changeId" + index).attr("style", "background:#EC1C1E");
      $("#fareId" + index).attr("style", "background:#EC1C1E");
    });

    $("#flightId" + index).click(function () {
      $("#flightId" + index).attr("style", "background:#390404c8");
      $("#baggageId" + index).attr("style", "background:#EC1C1E");
      $("#changeId" + index).attr("style", "background:#EC1C1E");
      $("#fareId" + index).attr("style", "background:#EC1C1E");
    });

    $("#baggageId" + index).click(function () {
      $("#flightId" + index).attr("style", "background:#EC1C1E");
      $("#baggageId" + index).attr("style", "background:#390404c8");
      $("#changeId" + index).attr("style", "background:#EC1C1E");
      $("#fareId" + index).attr("style", "background:#EC1C1E");
    });

    $("#changeId" + index).click(function () {
      $("#flightId" + index).attr("style", "background:#EC1C1E");
      $("#baggageId" + index).attr("style", "background:#EC1C1E");
      $("#changeId" + index).attr("style", "background:#390404c8");
      $("#fareId" + index).attr("style", "background:#EC1C1E");
    });

    $("#fareId" + index).click(function () {
      $("#flightId" + index).attr("style", "background:#EC1C1E");
      $("#baggageId" + index).attr("style", "background:#EC1C1E");
      $("#changeId" + index).attr("style", "background:#EC1C1E");
      $("#fareId" + index).attr("style", "background:#390404c8");
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
  }, []);

  // const fareRulesObj = {
  //   itemCodeRef: itemCodeRef,
  //   uniqueTransID: uniqueTransID,
  //   segmentCodeRefs: []
  // };
  // if (Object.keys(direction0).length > 0) {
  //   direction0.segments.map((i) =>
  //   fareRulesObj.segmentCodeRefs.push(i.segmentCodeRef)
  //   );
  // }
  // let [fareRules,setFareRules]=useState();

  // async function fetchOptions() {
  //   await axios
  //     .post(environment.getFareRules, fareRulesObj, environment.headerToken)
  //     .then((response) => {
  //       setFareRules(response.data);
  //     });
  //     console.log(fareRules)
  // }

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
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target={"#home" + index}
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Flight details
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target={"#profile" + index}
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Fare details
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target={"#contact" + index}
                    type="button"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    Baggage info
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="about-tab"
                    data-bs-toggle="tab"
                    data-bs-target={"#about" + index}
                    type="button"
                    role="tab"
                    aria-controls="about"
                    aria-selected="false"
                  >
                    Fare Policy
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id={"home" + index}
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <>
                    <div className="p-2">
                      <div className="container">
                      {direction0.segments.map((seg, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <div
                                className="row pt-2 p-2 border-bottom"
                                style={{ backgroundColor: "	white" }}
                              >
                                <div className="col-lg-3 text-start">
                                  <span className="d-inline fs-6 fw-bold ms-1">
                                    Departure,{" "}
                                    {airports
                                      .filter((f) => f.iata === seg.from)
                                      .map((item) => item.city)}
                                  </span>
                                </div>
                                <div className="col-lg-3">
                                  <i className="fas fa-plane fa-sm"></i>
                                </div>
                                <div className="col-lg-3">
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
                                  {/* <span>Duration: {seg.duration[0]}</span> */}
                                  <span>
                                    Duration :{" "}
                                    {/* {totalFlightDuration(direction0.segments)} */}
                                    {direction0.segments.length === 1
                                      ? totalFlightDuration(direction0.segments)
                                      : direction0.segments.length === 2
                                        ? addDurations([
                                          totalFlightDuration(
                                            direction0.segments
                                          ),
                                          timeDuration(
                                            direction0.segments[index].arrival,
                                            direction0.segments[index + 1]
                                              .departure
                                          ),
                                        ])
                                        : direction0.segments.length === 3
                                          ? addDurations([
                                            totalFlightDuration(
                                              direction0.segments
                                            ),
                                            timeDuration(
                                              direction0.segments[index].arrival,
                                              direction0.segments[index + 1]
                                                .departure
                                            ),
                                            timeDuration(
                                              direction0.segments[index + 1]
                                                .arrival,
                                              direction0.segments[index + 2]
                                                .departure
                                            ),
                                          ])
                                          : ""}
                                    {/* {addDurations([
                                      totalFlightDuration(direction0.segments),
                                      timeDuration(
                                        direction0.segments[index].arrival,
                                        direction0.segments[index + 1].departure
                                      ),
                                    ])} */}
                                  </span>
                                  {direction0.segments.length > 1 && (
                                    <Text fontSize={"xs"} fontWeight={200}>
                                      (including layover time)
                                    </Text>
                                  )}
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
                                        Class {seg.bookingClass}
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
                                      Class {seg.bookingClass}
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
                      </div>
                      <div className="container my-1">
                        <>
                          {Object.keys(direction1).length > 0 ? (
                            <>
                              <div
                                className="row border-bottom p-2"
                                style={{ backgroundColor: "	white" }}
                              >
                                <div className="col-lg-3 text-start">
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
                                <div className="col-lg-3">
                                  <i className="fas fa-plane"></i>
                                </div>
                                <div className="col-lg-3">
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
                                    Duration :{" "}
                                    {/* {direction1.segments[0].duration[0]} */}
                                    {/* {totalFlightDuration(direction1.segments)} */}
                                    {direction1.segments.length === 1
                                      ? totalFlightDuration(direction1.segments)
                                      : direction1.segments.length === 2
                                        ? addDurations([
                                          totalFlightDuration(
                                            direction1.segments
                                          ),
                                          timeDuration(
                                            direction1.segments[0].arrival,
                                            direction1.segments[1].departure
                                          ),
                                        ])
                                        : direction1.segments.length === 3
                                          ? addDurations([
                                            totalFlightDuration(
                                              direction1.segments
                                            ),
                                            timeDuration(
                                              direction1.segments[1].arrival,
                                              direction1.segments[2].departure
                                            ),
                                          ])
                                          : ""}
                                  </span>
                                  {direction1.segments.length > 1 && (
                                    <Text fontSize={"xs"} fontWeight={200}>
                                      (including layover time)
                                    </Text>
                                  )}
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
                                  seg.details.map((item, idx) => {
                                    return (
                                      <>
                                        {index === seg.details.length - 1 ? (
                                          <></>
                                        ) : seg.details.length > 1 ? (
                                          <>
                                            {
                                              idx === 0 ? <>
                                              </> : <>
                                                <div className="text-center fw-bold">
                                                  {" "}
                                                  Layover : &nbsp;
                                                  {layOver(
                                                    seg.details[index + 1]?.arrival,
                                                    seg.details[index]?.departure
                                                  )}
                                                </div>
                                              </>
                                            }
                                          </>
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
                                        <div className="row py-4 p-2 border mb-2">
                                          <div className="col-lg-1">
                                            <img
                                              src={environment.s3ArliensImage +`${seg.airlineCode}.png`}
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
                                              Class {seg.bookingClass}
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
                                    )
                                  })
                                ) : (
                                  <>
                                    {index !== 0 ? (
                                      <div className="text-center fw-bold">
                                        {" "}
                                        Layover : &nbsp;
                                        {layOver(
                                          direction1.segments[index]?.departure,
                                          direction1.segments[index - 1]
                                            ?.arrival
                                        )}
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    <div className="row py-4 p-2 border mb-2">
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
                                          Class {seg.bookingClass}
                                        </p>
                                      </div>
                                      <div className="col-lg-4">
                                        <span className="float-start fw-bold">
                                          {seg.from}{" "}
                                          <strong>
                                            {seg.departure.substr(11, 5)}
                                          </strong>
                                        </span>
                                        <br></br>
                                        <span className="float-start">
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
                                        <span className="float-start fw-bold">
                                          {seg.to}{" "}
                                          <strong>
                                            {seg.arrival.substr(11, 5)}
                                          </strong>
                                        </span>
                                        <br />
                                        <span className="float-start">
                                          {moment(seg.arrival).format(
                                            "DD MMMM,yyyy, ddd"
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
                              </>
                            ))
                          ) : (
                            <></>
                          )}
                        </>
                      </div>
                        {flightType === "Multi City" ? (
                          <>
                            {direction2.segments !== undefined ? (
                              <>
                                {direction2.segments.map((seg, index) => (
                                  <div key={index}>
                                    {index === 0 ? (
                                      <>
                                        <div
                                          className="row mt-2 p-2 border-bottom"
                                          style={{ backgroundColor: "	white" }}
                                        >
                                          <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                              Departure,{" "}
                                              {airports
                                                .filter(
                                                  (f) => f.iata === seg.from
                                                )
                                                .map((item) => item.city)}
                                            </span>
                                          </div>
                                          <div className="col-lg-3">
                                          <i className="fas fa-plane"></i>
                                          </div>
                                          <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                              Arrival,{" "}
                                              {airports
                                                .filter(
                                                  (f) =>
                                                    f.iata ===
                                                    direction2.segments[
                                                      direction2.segments
                                                        .length - 1
                                                    ].to
                                                )
                                                .map((item) => item.city)}
                                            </span>
                                          </div>
                                          <div className="col-lg-3 fs-6 fw-bold">
                                            <span>
                                              Total duration:{" "}
                                              {totalFlightDuration(
                                                direction2.segments
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    <div className="row py-4 pb-2">
                                      <div className="col-lg-1">
                                        <img
                                          src={environment.s3ArliensImage +`${direction2.segments[0].airlineCode}.png`}
                                          alt=""
                                          width="40px"
                                          height="40px"
                                        />
                                      </div>
                                      <div className="col-lg-2 d-block">
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
                                            {seg.departure.substr(11, 5)}
                                          </strong>
                                        </span>
                                        <br></br>
                                        <span className="float-start">
                                          <strong>
                                            <Moment format="dddd, LL">
                                              {seg.departure.substr(0, 10)}
                                            </Moment>
                                          </strong>
                                        </span>
                                        <br></br>
                                        <h6 className="text-start">
                                          {seg.fromAirport}
                                        </h6>
                                        {/* <h6 className="float-start">Riyadh, Saudi Arabia</h6> */}
                                      </div>
                                      <div className="col-lg-4">
                                        <span className="float-start">
                                          {seg.to}
                                          <strong className="ms-1">
                                            {seg.arrival.substr(11, 5)}
                                          </strong>
                                        </span>
                                        <br />
                                        <span className="float-start">
                                          <strong>
                                            <Moment format="dddd, LL">
                                              {seg.arrival.substr(0, 10)}
                                            </Moment>
                                          </strong>
                                        </span>
                                        <br></br>
                                        <h6 className="text-start">
                                          {seg.toAirport}
                                        </h6>
                                        {/* <h6 className="float-start">
                              Dubai, United Emirates
                            </h6> */}
                                      </div>
                                    </div>
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
                                      <>
                                        <div
                                          className="row mt-2 p-2 border-bottom"
                                          style={{ backgroundColor: "	white" }}
                                        >
                                          <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                              Departure,{" "}
                                              {airports
                                                .filter(
                                                  (f) => f.iata === seg.from
                                                )
                                                .map((item) => item.city)}
                                            </span>
                                          </div>
                                          <div className="col-lg-3">
                                          <i className="fas fa-plane"></i>
                                          </div>
                                          <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                              Arrival,{" "}
                                              {airports
                                                .filter(
                                                  (f) =>
                                                    f.iata ===
                                                    direction3.segments[
                                                      direction3.segments
                                                        .length - 1
                                                    ].to
                                                )
                                                .map((item) => item.city)}
                                            </span>
                                          </div>
                                          <div className="col-lg-3 fs-6 fw-bold">
                                            <span>
                                              Total duration:{" "}
                                              {totalFlightDuration(
                                                direction3.segments
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    <div className="row py-4 pb-2">
                                      <div className="col-lg-1">
                                        <img
                                          src={environment.s3ArliensImage +`${direction3.segments[0].airlineCode}.png`}
                                          alt=""
                                          width="40px"
                                          height="40px"
                                        />
                                      </div>
                                      <div className="col-lg-2 d-block">
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
                                            {seg.departure.substr(11, 5)}
                                          </strong>
                                        </span>
                                        <br></br>
                                        <span className="float-start">
                                          <strong>
                                            <Moment format="dddd, LL">
                                              {seg.departure.substr(0, 10)}
                                            </Moment>
                                          </strong>
                                        </span>
                                        <br></br>
                                        <h6 className="text-start">
                                          {seg.fromAirport}
                                        </h6>
                                        {/* <h6 className="float-start">Riyadh, Saudi Arabia</h6> */}
                                      </div>
                                      <div className="col-lg-4">
                                        <span className="float-start">
                                          {seg.to}
                                          <strong className="ms-1">
                                            {seg.arrival.substr(11, 5)}
                                          </strong>
                                        </span>
                                        <br />
                                        <span className="float-start">
                                          <strong>
                                            <Moment format="dddd, LL">
                                              {seg.arrival.substr(0, 10)}
                                            </Moment>
                                          </strong>
                                        </span>
                                        <br></br>
                                        <h6 className="text-start">
                                          {seg.toAirport}
                                        </h6>
                                        {/* <h6 className="float-start">
                                  Dubai, United Emirates
                                </h6> */}
                                      </div>
                                    </div>
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
                                      <>
                                        <div
                                          className="row mt-2 p-2 border-bottom"
                                          style={{ backgroundColor: "	white" }}
                                        >
                                          <div className="col-lg-3">
                                            
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                              Departure,{" "}
                                              {airports
                                                .filter(
                                                  (f) => f.iata === seg.from
                                                )
                                                .map((item) => item.city)}
                                            </span>
                                          </div>
                                          <div className="col-lg-3">
                                          <i className="fas fa-plane"></i>
                                          </div>
                                          <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                              Arrival,{" "}
                                              {airports
                                                .filter(
                                                  (f) =>
                                                    f.iata ===
                                                    direction4.segments[
                                                      direction4.segments
                                                        .length - 1
                                                    ].to
                                                )
                                                .map((item) => item.city)}
                                            </span>
                                          </div>
                                          <div className="col-lg-3 fs-6 fw-bold">
                                            <span>
                                              Total duration:{" "}
                                              {totalFlightDuration(
                                                direction4.segments
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    <div className="row py-4 pb-2">
                                      <div className="col-lg-1">
                                        <img
                                          src={environment.s3ArliensImage +`${direction4.segments[0].airlineCode}.png`}
                                          alt=""
                                          width="40px"
                                          height="40px"
                                        />
                                      </div>
                                      <div className="col-lg-2 d-block">
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
                                            {seg.departure.substr(11, 5)}
                                          </strong>
                                        </span>
                                        <br></br>
                                        <span className="float-start">
                                          <strong>
                                            <Moment format="dddd, LL">
                                              {seg.departure.substr(0, 10)}
                                            </Moment>
                                          </strong>
                                        </span>
                                        <br></br>
                                        <h6 className="text-start">
                                          {airports
                                            .filter((f) => f.iata === seg.from)
                                            .map(
                                              (item) =>
                                                item.name + ", " + item.city
                                            )}
                                        </h6>
                                        {/* <h6 className="float-start">Riyadh, Saudi Arabia</h6> */}
                                      </div>
                                      <div className="col-lg-4">
                                        <span className="float-start">
                                          {seg.to}
                                          <strong className="ms-1">
                                            {seg.arrival.substr(11, 5)}
                                          </strong>
                                        </span>
                                        <br />
                                        <span className="float-start">
                                          <strong>
                                            <Moment format="dddd, LL">
                                              {seg.arrival.substr(0, 10)}
                                            </Moment>
                                          </strong>
                                        </span>
                                        <br></br>
                                        <h6 className="text-start">
                                          {airports
                                            .filter((f) => f.iata === seg.to)
                                            .map(
                                              (item) =>
                                                item.name + ", " + item.city
                                            )}
                                        </h6>
                                        {/* <h6 className="float-start">
                              Dubai, United Emirates
                            </h6> */}
                                      </div>
                                    </div>
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
                                      <>
                                        <div
                                          className="row mt-2 p-2 border-bottom"
                                          style={{ backgroundColor: "	white" }}
                                        >
                                          <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                              Departure,{" "}
                                              {airports
                                                .filter(
                                                  (f) => f.iata === seg.from
                                                )
                                                .map((item) => item.city)}
                                            </span>
                                          </div>
                                          <div className="col-lg-3">
                                           <i className="fas fa-plane"></i>
                                          </div>
                                          <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                              Arrival,{" "}
                                              {airports
                                                .filter(
                                                  (f) =>
                                                    f.iata ===
                                                    direction5.segments[
                                                      direction5.segments
                                                        .length - 1
                                                    ].to
                                                )
                                                .map((item) => item.city)}
                                            </span>
                                          </div>
                                          <div className="col-lg-3 fs-6 fw-bold">
                                            <span>
                                              Total duration:{" "}
                                              {totalFlightDuration(
                                                direction5.segments
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    <div className="row py-4 pb-2">
                                      <div className="col-lg-1">
                                        <img
                                          src={environment.s3ArliensImage +`${direction5.segments[0].airlineCode}.png`}
                                          alt=""
                                          width="40px"
                                          height="40px"
                                        />
                                      </div>
                                      <div className="col-lg-2 d-block">
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
                                            {seg.departure.substr(11, 5)}
                                          </strong>
                                        </span>
                                        <br></br>
                                        <span className="float-start">
                                          <strong>
                                            <Moment format="dddd, LL">
                                              {seg.departure.substr(0, 10)}
                                            </Moment>
                                          </strong>
                                        </span>
                                        <br></br>
                                        <h6 className="text-start">
                                          {seg.fromAirport}
                                        </h6>
                                        {/* <h6 className="float-start">Riyadh, Saudi Arabia</h6> */}
                                      </div>
                                      <div className="col-lg-4">
                                        <span className="float-start">
                                          {seg.to}
                                          <strong className="ms-1">
                                            {seg.arrival.substr(11, 5)}
                                          </strong>
                                        </span>
                                        <br />
                                        <span className="float-start">
                                          <strong>
                                            <Moment format="dddd, LL">
                                              {seg.arrival.substr(0, 10)}
                                            </Moment>
                                          </strong>
                                        </span>
                                        <br></br>
                                        <h6 className="text-start">
                                          {seg.toAirport}
                                        </h6>
                                        {/* <h6 className="float-start">
                              Dubai, United Emirates
                            </h6> */}
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
                          <></>
                        )}
                       
                    </div>
                  </>
                </div>
                <div
                  class="tab-pane fade"
                  id={"profile" + index}
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <>
                    <div className="">
                      <div className="container p-2 pb-5">
                        {/* <div className="fw-bold px-3">
                      <p className="fw-bold text-start">
                        <u>Fare details</u>
                      </p>
                    </div> */}
                        <div className="table-responsive-sm mt-1">
                          <table
                            className="table table-bordered border-dark p-2 table-sm bg-white rounded "
                            style={{ fontSize: "12px" }}
                          >
                            <thead className="text-center thead fw-bold text-white">
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
                                      {passengerFares.adt.basePrice.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="center">
                                      {passengerFares.adt.taxes.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="right">
                                      {passengerFares.adt.discountPrice.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="right">
                                      {passengerFares.adt.ait.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="right">
                                      {passengerCounts.adt}
                                    </td>
                                    <td className="right fw-bold">
                                      {currency !== undefined
                                        ? currency
                                        : "BDT"}{" "}
                                      {(
                                        passengerFares.adt.totalPrice *
                                        passengerCounts.adt
                                      ).toLocaleString("en-US")}
                                    </td>
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
                                      {passengerFares.cnn.basePrice.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="center">
                                      {passengerFares.cnn.taxes.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="right">
                                      {passengerFares.cnn.discountPrice.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="right">
                                      {passengerFares.cnn.ait.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="right">
                                      {passengerCounts.cnn}
                                    </td>
                                    <td className="right fw-bold">
                                      {currency !== undefined
                                        ? currency
                                        : "BDT"}{" "}
                                      {(
                                        passengerFares.cnn.totalPrice *
                                        passengerCounts.cnn
                                      ).toLocaleString("en-US")}
                                    </td>
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
                                      {passengerFares.inf.basePrice.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="center">
                                      {passengerFares.inf.taxes.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="right">
                                      {passengerFares.inf.discountPrice.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="right">
                                      {passengerFares.inf.ait.toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="right">
                                      {passengerCounts.inf}
                                    </td>
                                    <td className="right fw-bold">
                                      {currency !== undefined
                                        ? currency
                                        : "BDT"}{" "}
                                      {(
                                        passengerFares.inf.totalPrice *
                                        passengerCounts.inf
                                      ).toLocaleString("en-US")}
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <></>
                              )}
                              <tr className="fw-bold">
                                <td colSpan={5} className="border-none"></td>
                                <td>Grand Total</td>
                                <td>
                                  {currency !== undefined ? currency : "BDT"}{" "}
                                  {/* {ticketingList.passengerInfo[0]?.currencyName}{" "} */}
                                  {bookingComponents[0].totalPrice.toLocaleString(
                                    "en-US"
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
                <div
                  class="tab-pane fade"
                  id={"contact" + index}
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  <>
                    <div className="">
                      <div className="container p-2">
                        <>
                          <div className="row px-2 pb-2">
                            <div className="col-lg-8 border-bottom">
                              <div
                                className="row p-1"
                                style={{ backgroundColor: "	white" }}
                              >
                                <div className="col-lg-5 text-start">
                                  <span className="d-inline fs-6 fw-bold ms-1">
                                    Departure,{" "}
                                    {airports
                                      .filter(
                                        (f) =>
                                          f.iata === direction0.segments[0].from
                                      )
                                      .map((item) => item.city)}
                                  </span>
                                </div>
                                <div className="col-lg-2">
                                  <i className="fas fa-plane"></i>
                                </div>
                                <div className="col-lg-5 text-end">
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
                          <div className="row px-2 pb-2">
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
                                    {direction0.segments[0].baggage[0]?.amount +
                                      " " +
                                      direction0.segments[0].baggage[0]?.units}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                      {flightType === "Multi City" ? (
                        <>
                          {direction2.segments !== undefined ? (
                            <>
                              <div className="container p-2">
                                <div className="row pt-4 pb-2">
                                  <div
                                    className="col-lg-8 p-2 border-bottom"
                                    style={{ backgroundColor: "	white" }}
                                  >
                                    <div className="row">
                                      <div className="col-lg-5">
                                        <i className="fas fa-plane"></i>
                                        <span className="d-inline fs-6 fw-bold ms-1">
                                          Departure,{" "}
                                          {airports
                                            .filter(
                                              (f) =>
                                                f.iata ===
                                                direction2.segments[0].from
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
                                          {direction2.segments[0].baggage[0]
                                            .amount +
                                            " " +
                                            direction2.segments[0].baggage[0]
                                              .units}
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
                          {direction3.segments !== undefined ? (
                            <>
                              <div className="container p-2">
                                <div className="row pt-4 pb-2">
                                  <div
                                    className="col-lg-8 p-2 border-bottom"
                                    style={{ backgroundColor: "	white" }}
                                  >
                                    <div className="row">
                                      <div className="col-lg-5">
                                        <i className="fas fa-plane"></i>
                                        <span className="d-inline fs-6 fw-bold ms-1">
                                          Departure,{" "}
                                          {airports
                                            .filter(
                                              (f) =>
                                                f.iata ===
                                                direction3.segments[0].from
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
                                          {direction3.segments[0].baggage[0]
                                            .amount +
                                            " " +
                                            direction3.segments[0].baggage[0]
                                              .units}
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

                          {direction4.segments !== undefined ? (
                            <>
                              <div className="container p-2">
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
                                                direction4.segments[0].from
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
                                          {direction4.segments[0].baggage[0]
                                            .amount +
                                            " " +
                                            direction4.segments[0].baggage[0]
                                              .units}
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
                          {direction5.segments !== undefined ? (
                            <>
                              <div className="container p-2">
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
                                                direction5.segments[0].from
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
                                          {direction5.segments[0].baggage[0]
                                            .amount +
                                            " " +
                                            direction5.segments[0].baggage[0]
                                              .units}
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
                      ) : (
                        <></>
                      )}

                      <>
                        {Object.keys(direction1).length > 0 ? (
                          <>
                            <div className="container">
                              <div className="row px-2 pb-2">
                                <div className="col-lg-8 border-bottom">
                                  <div
                                    className="row p-1"
                                    style={{ backgroundColor: "	white" }}
                                  >
                                    <div className="col-lg-5 text-start">
                                      <span className="d-inline fs-6 fw-bold ms-1">
                                        Departure,{" "}
                                        {airports
                                          .filter(
                                            (f) =>
                                              f.iata ===
                                              direction1.segments[0].from
                                          )
                                          .map((item) => item.city)}
                                      </span>
                                    </div>
                                    <div className="col-lg-2">
                                      <i className="fas fa-plane"></i>
                                    </div>
                                    <div className="col-lg-5 text-end">
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
                              <div className="row px-2 pb-2">
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
                                        {direction1.segments[0].baggage[0]
                                          ?.amount +
                                          " " +
                                          direction1.segments[0].baggage[0]
                                            ?.units}
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
                    </div>
                  </>
                </div>
                <div
                  class="tab-pane fade"
                  id={"about" + index}
                  role="tabpanel"
                  aria-labelledby="about-tab"
                >
                  <>
                    <div className="text-start p-4">
                      <h6 className="fw-bold">
                        Refund or Date Change can be done as per the following
                        policies:
                      </h6>
                      <hr></hr>• Refund Amount= Received amount from customer -
                      Refund Charge (As per Airline Policy + FirstTrip
                      Convenience Fee).<br></br>• Date Change Amount= Date
                      change fee as per Airline + Difference of fare if any +
                      FirstTrip Convenience Fee.
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="modal fade" id={"farerulesModal"+ index} tabIndex="-1" aria-labelledby="farerulesModalLabel"
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
</div> */}
    </>
  );
};

export default ShowModal;
