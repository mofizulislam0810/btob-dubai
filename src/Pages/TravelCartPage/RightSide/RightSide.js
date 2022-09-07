import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import ShowModal from "../../ShowAllFlightPage/ShowModal/ShowModal";
import "./RightSide.css";

const RightSide = () => {
  const navigation = useNavigate();
  // const data = localStorage.getItem('Database');
  const filterParam = JSON.parse(localStorage.getItem("Database"));
  const currency = JSON.parse(localStorage.getItem("currency"));
  const flightType = filterParam.tripTypeModify;
  const direction0 = JSON.parse(localStorage.getItem("direction0"));
  const direction1 = JSON.parse(localStorage.getItem("direction1"));
  const direction2 = JSON.parse(localStorage.getItem("direction2"));
  const direction3 = JSON.parse(localStorage.getItem("direction3"));
  const direction4 = JSON.parse(localStorage.getItem("direction4"));
  const direction5 = JSON.parse(localStorage.getItem("direction5"));
  const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
  const passengerFares = JSON.parse(localStorage.getItem("passengerFares"));
  const passengerCounts = JSON.parse(localStorage.getItem("passengerCounts"));
  const bookingComponents = JSON.parse(
    localStorage.getItem("bookingComponents")
  );
  const itemCodeRef = JSON.parse(localStorage.getItem("itemCodeRef"));
  const uniqueTransID = JSON.parse(localStorage.getItem("uniqueTransID"));
  const refundable = JSON.parse(localStorage.getItem("refundable"));
  const adult = JSON.parse(localStorage.getItem("adult"));
  const child = JSON.parse(localStorage.getItem("child"));
  const infant = JSON.parse(localStorage.getItem("infant"));
  const contact = localStorage.getItem("contact");
  const ImageUrlD = `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${direction0.platingCarrierCode}.png`;
  const ImageUrlR =
    Object.keys(direction1).length > 0
      ? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${direction1.platingCarrierCode}.png`
      : ``;
  const submitFlight = () => {
    let sendObj = {
      Adult: adult,
      Child: child,
      Infant: infant,
      contact: contact,
    };
    navigation("/travellcartconfirm");
  };

  useEffect(() => {
    $("#flight" + 0).show();
    $("#baggage" + 0).hide();
    $("#cancel" + 0).hide();
    $("#fare" + 0).hide();

    $("#flightId" + 0).click(function () {
      $("#flight" + 0).show();
      $("#baggage" + 0).hide();
      $("#cancel" + 0).hide();
      $("#fare" + 0).hide();
    });
    $("#baggageId" + 0).click(function () {
      $("#flight" + 0).hide();
      $("#baggage" + 0).show();
      $("#cancel" + 0).hide();
      $("#fare" + 0).hide();
    });
    $("#changeId" + 0).click(function () {
      $("#flight" + 0).hide();
      $("#baggage" + 0).hide();
      $("#cancel" + 0).show();
      $("#fare" + 0).hide();
    });
    $("#fareId" + 0).click(function () {
      $("#flight" + 0).hide();
      $("#baggage" + 0).hide();
      $("#cancel" + 0).hide();
      $("#fare" + 0).show();
    });
  }, []);
  return (
    <div className="col-lg-12">
      <div className="container box-shadow  bg-white">
        <div className="row py-3 m-1">
          <div className="col-lg-12 text-start border" style={{color:"#4e4e4e"}}>
            <span className="card-title fw-bold">Flight summary</span>
          </div>
          <div className="col-lg-12 p-2">
            {flightType === "Multi City" ? (
              <>
               <>
                <div className="row border text-color p-2">
                  <div className="col-lg-2 my-auto">
                    <img src={ImageUrlD} alt="" width="50px" height="50px" />
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="my-auto fw-bold">{direction0.from}</h6>
                    <span className="fs-6">
                      {direction0.segments[0].departure.substr(11, 5)}
                    </span>
                  </div>
                  <div className="col-lg-6 my-auto text-center lh-1">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <span className="text-color fw-bold font-size">
                          {direction0.stops === 0
                            ? "Direct"
                            : direction0.stops + " Stop"}
                        </span>
                      </div>
                      <div className="col-lg-12 text-center">
                        <span className="text-color ">
                          <i class="fas fa-circle fa-xs"></i>
                          --------------
                          <i className="fas fa-plane fa-sm"></i>
                        </span>
                      </div>
                      <div className="col-lg-12 text-center ms-4">
                        <span className="text-color me-5">
                          <i className="fas fa-clock fa-sm"></i>
                          <span className="ms-1 font-size">
                            {direction0.segments[0].duration[0]}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="my-auto fw-bold">{direction0.to}</h6>
                    <span className="fs-6">
                      {direction0.segments[
                        direction0.segments.length - 1
                      ].arrival.substr(11, 5)}
                    </span>
                  </div>
                </div>
              </>
              <>
                <div className="row border text-color p-2">
                  <div className="col-lg-2 my-auto">
                    <img src={ImageUrlD} alt="" width="50px" height="50px" />
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="my-auto fw-bold">{direction1.from}</h6>
                    <span className="fs-6">
                      {direction1.segments[0].departure.substr(11, 5)}
                    </span>
                  </div>
                  <div className="col-lg-6 my-auto text-center lh-1">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <span className="text-color fw-bold font-size">
                          {direction1.stops === 0
                            ? "Direct"
                            : direction1.stops + " Stop"}
                        </span>
                      </div>
                      <div className="col-lg-12 text-center">
                        <span className="text-color ">
                          <i class="fas fa-circle fa-xs"></i>
                          --------------
                          <i className="fas fa-plane fa-sm"></i>
                        </span>
                      </div>
                      <div className="col-lg-12 text-center ms-4">
                        <span className="text-color me-5">
                          <i className="fas fa-clock fa-sm"></i>
                          <span className="ms-1 font-size">
                            {direction1.segments[0].duration[0]}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="my-auto fw-bold">{direction1.to}</h6>
                    <span className="fs-6">
                      {direction1.segments[
                        direction1.segments.length - 1
                      ].arrival.substr(11, 5)}
                    </span>
                  </div>
                </div>
              </>
                {direction2.segments !== undefined ? (
                  <>
                  <div className="row border text-color p-2">
                    <div className="col-lg-2 my-auto">
                      <img src={ImageUrlD} alt="" width="50px" height="50px" />
                    </div>
                    <div className="col-lg-2 my-auto">
                      <h6 className="my-auto fw-bold">{direction2.from}</h6>
                      <span className="fs-6">
                        {direction2.segments[0].departure.substr(11, 5)}
                      </span>
                    </div>
                    <div className="col-lg-6 my-auto text-center lh-1">
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <span className="text-color fw-bold font-size">
                            {direction2.stops === 0
                              ? "Direct"
                              : direction2.stops + " Stop"}
                          </span>
                        </div>
                        <div className="col-lg-12 text-center">
                          <span className="text-color ">
                            <i class="fas fa-circle fa-xs"></i>
                            --------------
                            <i className="fas fa-plane fa-sm"></i>
                          </span>
                        </div>
                        <div className="col-lg-12 text-center ms-4">
                          <span className="text-color me-5">
                            <i className="fas fa-clock fa-sm"></i>
                            <span className="ms-1 font-size">
                              {direction2.segments[0].duration[0]}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 my-auto">
                      <h6 className="my-auto fw-bold">{direction2.to}</h6>
                      <span className="fs-6">
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
                   <div className="row border text-color p-2">
                     <div className="col-lg-2 my-auto">
                       <img src={ImageUrlD} alt="" width="50px" height="50px" />
                     </div>
                     <div className="col-lg-2 my-auto">
                       <h6 className="my-auto fw-bold">{direction3.from}</h6>
                       <span className="fs-6">
                         {direction3.segments[0].departure.substr(11, 5)}
                       </span>
                     </div>
                     <div className="col-lg-6 my-auto text-center lh-1">
                       <div className="row">
                         <div className="col-lg-12 text-center">
                           <span className="text-color fw-bold font-size">
                             {direction3.stops === 0
                               ? "Direct"
                               : direction3.stops + " Stop"}
                           </span>
                         </div>
                         <div className="col-lg-12 text-center">
                           <span className="text-color ">
                             <i class="fas fa-circle fa-xs"></i>
                             --------------
                             <i className="fas fa-plane fa-sm"></i>
                           </span>
                         </div>
                         <div className="col-lg-12 text-center ms-4">
                           <span className="text-color me-5">
                             <i className="fas fa-clock fa-sm"></i>
                             <span className="ms-1 font-size">
                               {direction3.segments[0].duration[0]}
                             </span>
                           </span>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-2 my-auto">
                       <h6 className="my-auto fw-bold">{direction3.to}</h6>
                       <span className="fs-6">
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
                   <div className="row border text-color p-2">
                     <div className="col-lg-2 my-auto">
                       <img src={ImageUrlD} alt="" width="50px" height="50px" />
                     </div>
                     <div className="col-lg-2 my-auto">
                       <h6 className="my-auto fw-bold">{direction4.from}</h6>
                       <span className="fs-6">
                         {direction4.segments[0].departure.substr(11, 5)}
                       </span>
                     </div>
                     <div className="col-lg-6 my-auto text-center lh-1">
                       <div className="row">
                         <div className="col-lg-12 text-center">
                           <span className="text-color fw-bold font-size">
                             {direction4.stops === 0
                               ? "Direct"
                               : direction4.stops + " Stop"}
                           </span>
                         </div>
                         <div className="col-lg-12 text-center">
                           <span className="text-color ">
                             <i class="fas fa-circle fa-xs"></i>
                             --------------
                             <i className="fas fa-plane fa-sm"></i>
                           </span>
                         </div>
                         <div className="col-lg-12 text-center ms-4">
                           <span className="text-color me-5">
                             <i className="fas fa-clock fa-sm"></i>
                             <span className="ms-1 font-size">
                               {direction4.segments[0].duration[0]}
                             </span>
                           </span>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-2 my-auto">
                       <h6 className="my-auto fw-bold">{direction4.to}</h6>
                       <span className="fs-6">
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
                   <div className="row border text-color p-2">
                     <div className="col-lg-2 my-auto">
                       <img src={ImageUrlD} alt="" width="50px" height="50px" />
                     </div>
                     <div className="col-lg-2 my-auto">
                       <h6 className="my-auto fw-bold">{direction5.from}</h6>
                       <span className="fs-6">
                         {direction5.segments[0].departure.substr(11, 5)}
                       </span>
                     </div>
                     <div className="col-lg-6 my-auto text-center lh-1">
                       <div className="row">
                         <div className="col-lg-12 text-center">
                           <span className="text-color fw-bold font-size">
                             {direction5.stops === 0
                               ? "Direct"
                               : direction5.stops + " Stop"}
                           </span>
                         </div>
                         <div className="col-lg-12 text-center">
                           <span className="text-color ">
                             <i class="fas fa-circle fa-xs"></i>
                             --------------
                             <i className="fas fa-plane fa-sm"></i>
                           </span>
                         </div>
                         <div className="col-lg-12 text-center ms-4">
                           <span className="text-color me-5">
                             <i className="fas fa-clock fa-sm"></i>
                             <span className="ms-1 font-size">
                               {direction5.segments[0].duration[0]}
                             </span>
                           </span>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-2 my-auto">
                       <h6 className="my-auto fw-bold">{direction5.to}</h6>
                       <span className="fs-6">
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
                <div className="row border text-color p-2">
                  <div className="col-lg-2 my-auto">
                    <img src={ImageUrlD} alt="" width="50px" height="50px" />
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="my-auto fw-bold">{direction0.from}</h6>
                    <span className="fs-6">
                      {direction0.segments[0].departure.substr(11, 5)}
                    </span>
                  </div>
                  <div className="col-lg-6 my-auto text-center lh-1">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <span className="text-color fw-bold font-size">
                          {direction0.stops === 0
                            ? "Direct"
                            : direction0.stops + " Stop"}
                        </span>
                      </div>
                      <div className="col-lg-12 text-center">
                        <span className="text-color ">
                          <i class="fas fa-circle fa-xs"></i>
                          --------------
                          <i className="fas fa-plane fa-sm"></i>
                        </span>
                      </div>
                      <div className="col-lg-12 text-center ms-4">
                        <span className="text-color me-5">
                          <i className="fas fa-clock fa-sm"></i>
                          <span className="ms-1 font-size">
                            {direction0.segments[0].duration[0]}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="my-auto fw-bold">{direction0.to}</h6>
                    <span className="fs-6">
                      {direction0.segments[
                        direction0.segments.length - 1
                      ].arrival.substr(11, 5)}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div></div>
            {flightType === "Multi City" ? (
              <></>
            ) : (
              <>
                {Object.keys(direction1).length > 0 ? (
                  <>
                    <div className="row border text-color p-2">
                      <div className="col-lg-2 my-auto">
                        <img
                          src={ImageUrlR}
                          alt=""
                          width="50px"
                          height="50px"
                        />
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction1.from}</h6>
                        <span className="fs-6">
                          {direction1.segments[0].departure.substr(11, 5)}
                        </span>
                      </div>
                      <div className="col-lg-6 my-auto text-center lh-1">
                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <span className="text-color fw-bold font-size">
                              {direction1.stops === 0
                                ? "Direct"
                                : direction1.stops + " Stop"}
                            </span>
                          </div>
                          <div className="col-lg-12">
                            <span className="text-color">
                              <i class="fas fa-circle fa-xs"></i>
                              --------------
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                          </div>
                          <div className="col-lg-12 text-center ms-4">
                            <span className="text-color me-5">
                              <i className="fas fa-clock fa-sm"></i>
                              <span className="ms-1 font-size">
                                {direction1.segments[0].duration[0]}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction1.to}</h6>
                        <span className="fs-6">
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
          <div className="position-relative" id={"show-option"}>
            <div className="position-absolute top-100 start-50 translate-middle">
              <p className="flight-details">
                <Link
                  to=""
                  className="my-auto text-color fw-bold text-center ms-4 pe-3"
                  data-bs-toggle="modal"
                  data-bs-target={"#exampleModal" + 0}
                >
                  Flight Details
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="row py-3 m-1">
          <div className="col-lg-12 text-start border mb-1" style={{color:"#4e4e4e"}}>
            <span className="card-title fw-bold">Fare details</span>
            {/* <span className="pe-3 text-color float-end">
                  <i class="fas fa-pen-nib me-1"></i>{" "}
                  <Link
                    to=""
                    style={{ textDecoration: "none" }}
                    className="fw-bold text-color font-size"
                    data-bs-toggle="modal"
                    data-bs-target={"#farerulesModal" + 0}
                  >
                    Fare Rules
                  </Link>
            </span> */}
          </div>

          {passengerFares.adt !== null ? (
            <>
              <div className="col-lg-12 border py-1 mb-1" style={{color:"#67696a"}}>
                <h6 className="fw-bold" style={{fontSize:"14px",color:"#4e4e4e"}}>
                  <u>Adult Fare</u>
                </h6>
                <div className="row mt-2" style={{fontSize:"12px"}}>
                  <div className="col-lg-6">
                    <h6 className="text-start">
                      Base Fare ({passengerCounts.adt} &#215;{" "}
                      {(passengerFares.adt.basePrice).toFixed(2)})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {(passengerCounts.adt * passengerFares.adt.basePrice).toFixed(2)}
                    </h6>
                  </div>
                </div>
                <div className="row" style={{fontSize:"12px"}}>
                  <div className="col-lg-6">
                    <h6 className="text-start">
                      Taxes ({passengerCounts.adt} &#215;{" "}
                      {(passengerFares.adt.taxes).toFixed(2)})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {" "}
                      {(passengerCounts.adt * passengerFares.adt.taxes).toFixed(2)}
                    </h6>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-6">
                    <h6 className="text-start">
                      AIT ({passengerCounts.adt} &#215; {passengerFares.adt.ait}
                      )
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {passengerCounts.adt * passengerFares.adt.ait}
                    </h6>
                  </div>
                </div> */}
                <div className="row" style={{fontSize:"12px"}}>
                  <div className="col-lg-6">
                    <h6 className="text-start">Discount</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {(passengerCounts.adt * passengerFares.adt.discountPrice).toFixed(2)}
                    </h6>
                  </div>
                </div>
                {/* <div className="row border-top py-1">
                  <div className="col-lg-6">
                    <h6 className="text-start fw-bold">Grand total</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end fw-bold">
                      {currency!==undefined ? currency : "BDT"}   {(passengerFares.adt.totalPrice * passengerCounts.adt).toFixed(2)}
                    </h6>
                  </div>
                </div> */}
              </div>
            </>
          ) : (
            <></>
          )}

          {passengerFares.cnn !== null ? (
            <>
              <div className="col-lg-12 border py-1 mb-1" style={{color:"#67696a"}}>
                <h6 className="fw-bold" style={{fontSize:"14px",color:"#4e4e4e"}}>
                  <u>Child Fare</u>
                </h6>
                <div className="row mt-2" style={{fontSize:"12px"}}>
                  <div className="col-lg-6">
                    <h6 className="text-start">
                      Base Fare ({passengerCounts.cnn} &#215;{" "}
                      {(passengerFares.cnn.basePrice).toFixed(2)})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {(passengerCounts.cnn * passengerFares.cnn.basePrice).toFixed(2)}
                    </h6>
                  </div>
                </div>
                <div className="row" style={{fontSize:"12px"}}>
                  <div className="col-lg-6">
                    <h6 className="text-start">
                      Taxes ({passengerCounts.cnn} &#215;{" "}
                      {(passengerFares.cnn.taxes).toFixed(2)})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {" "}
                      {(passengerCounts.cnn * passengerFares.cnn.taxes).toFixed(2)}
                    </h6>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-6">
                    <h6 className="text-start">
                      AIT ({passengerCounts.cnn} &#215; {passengerFares.cnn.ait}
                      )
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {" "}
                      {passengerCounts.cnn * passengerFares.cnn.ait}
                    </h6>
                  </div>
                </div> */}
                <div className="row" style={{fontSize:"12px"}}>
                  <div className="col-lg-6">
                    <h6 className="text-start">Discount</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {(passengerCounts.cnn * passengerFares.cnn.discountPrice).toFixed(2)}
                    </h6>
                  </div>
                </div>
                {/* <div className="row border-top py-1">
                  <div className="col-lg-6">
                    <h6 className="text-start fw-bold">Grand total</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end fw-bold">
                      {currency!==undefined ? currency : "BDT"}   {(passengerFares.cnn.totalPrice * passengerCounts.cnn).toFixed(2)}
                    </h6>
                  </div>
                </div> */}
              </div>
            </>
          ) : (
            <></>
          )}

          {passengerFares.inf !== null ? (
            <>
              <div className="col-lg-12 border py-1 mb-1" style={{color:"#67696a"}}>
                <h6 className="fw-bold" style={{fontSize:"14px",color:"#4e4e4e"}}>
                  <u>Infant Fare</u>
                </h6>
                <div className="row mt-2" style={{fontSize:"12px"}}>
                  <div className="col-lg-6">
                    <h6 className="text-start">
                      Base Fare ({passengerCounts.inf} &#215;{" "}
                      {(passengerFares.inf.basePrice).toFixed(2)})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {(passengerCounts.inf * passengerFares.inf.basePrice).toFixed(2)}
                    </h6>
                  </div>
                </div>
                <div className="row" style={{fontSize:"12px"}}>
                  <div className="col-lg-6">
                    <h6 className="text-start">
                      Taxes ({passengerCounts.inf} &#215;{" "}
                      {(passengerFares.inf.taxes).toFixed(2)})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {" "}
                      {(passengerCounts.inf * passengerFares.inf.taxes).toFixed(2)}
                    </h6>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-6">
                    <h6 className="text-start">
                      AIT ({passengerCounts.inf} &#215; {passengerFares.inf.ait}
                      )
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {passengerCounts.inf * passengerFares.inf.ait}
                    </h6>
                  </div>
                </div> */}
                <div className="row" style={{fontSize:"12px"}}>
                  <div className="col-lg-6">
                    <h6 className="text-start">Discount</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      {(passengerCounts.inf * passengerFares.inf.discountPrice).toFixed(2)}
                    </h6>
                  </div>
                </div>
                {/* <div className="row border-top py-2">
                  <div className="col-lg-6">
                    <h6 className="text-start fw-bold">Grand total</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end fw-bold">
                      {currency!==undefined ? currency : "BDT"}   {(passengerFares.inf.totalPrice * passengerCounts.inf).toFixed(2)}
                    </h6>
                  </div>
                </div> */}
              </div>
            </>
          ) : (
            <></>
          )}

              <div className="col-lg-12 border py-1 mb-1" style={{color:"#4e4e4e"}}>
                <div className="row border-top py-2">
                  <div className="col-lg-6">
                    <h6 className="text-start fw-bold">Total payable</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end fw-bold">
                      {currency!==undefined ? currency : "BDT"}   {bookingComponents[0].totalPrice}
                    </h6>
                  </div>
                </div>
              </div>

        </div>
      </div>
      <ShowModal
        key={0}
        flag={1}
        index={0}
        flightType={flightType}
        direction0={direction0}
        direction1={direction1}
        direction2={direction2}
        direction3={direction3}
        direction4={direction4}
        direction5={direction5}
        bookingComponents={bookingComponents}
        refundable={refundable}
        totalPrice={totalPrice}
        passengerFares={passengerFares}
        passengerCounts={passengerCounts}
        currency={currency}
        uniqueTransID={uniqueTransID}
        itemCodeRef={itemCodeRef}
      ></ShowModal>
    </div>
  );
};

export default RightSide;
