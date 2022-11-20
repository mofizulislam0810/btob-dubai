import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";
import NoDataFoundPage from "../../NoDataFoundPage/NoDataFoundPage/NoDataFoundPage";
import ShowFlight from "../ShowFlight/ShowFlight";
import "./ShowAllFlight.css";

const ShowAllFlight = ({
  fetchFlighData,
  originCode,
  destinationCode,
  fecthMulti,
  loading,
  airlineFilters,
  tripType,
  checkList,
}) => {
  const { count } = useAuth();
  // console.log(count);
  const [amountChange, setAmountChange] = useState("Gross Amount");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { tripTypeModify } = state;
  const footerProposalList = null;
  // console.log(JSON.parse(sessionStorage.getItem("checkList")));
  // let [footerProposalList,setFooterProposalList] = useState([]);
  var flightsData = [];
  let mainJson;
  let jsonData;
  if (String(tripType) === String("One Way")) {
    if (fetchFlighData !== null) {
      mainJson = fetchFlighData;
      jsonData = fetchFlighData.airSearchResponses;
    } else {
    }
  } else if (String(tripType) === String("Round Trip")) {
    if (fetchFlighData !== null) {
      mainJson = fetchFlighData;
      jsonData = fetchFlighData.airSearchResponses;
    } else {
    }
  } else if (String(tripType) === String("Multi City")) {
    if (fetchFlighData !== null) {
      mainJson = fetchFlighData;
      jsonData = fetchFlighData?.airSearchResponses;
    } else {
    }
  }
  let flightName = [];

  mainJson?.airlineFilters?.map((item) => {
    const obj = {
      name: item.airlineName,
      code: item.airlineCode,
      totalFlights: item.totalFlights,
      minPrice: item.minPrice,
    };
    flightName.push(obj);
  });
  const [price, setPrice] = useState(
    mainJson?.minMaxPrice?.maxPrice === undefined
      ? 1000000
      : mainJson?.minMaxPrice?.maxPrice
  );
  // console.log(price);
  // setPrice(mainJson.minMaxPrice?.maxPrice);
  //price=mainJson.minMaxPrice?.maxPrice;
  const [name, setName] = useState(flightName.map((item) => item.code));
  const [radioname, setRadioName] = useState(0);
  const [check, setCheck] = useState(true);
  const handleInput = (e) => {
    setPrice(e.target.value);
  };

  let dataPrice = [];

  const [filterPrice, setFilterPrice] = useState([
    Math.floor(mainJson?.minMaxPrice?.minPrice),
    Math.ceil(mainJson?.minMaxPrice?.maxPrice),
  ]);
  console.log(name);

  if (parseInt(radioname) === 0 && name.length === 0) {
    dataPrice = jsonData?.filter(
      // (item) => parseInt(item.totalPrice) <= parseInt(price, 10)
      (item) =>
        parseInt(item.totalPrice) >= filterPrice[0] &&
        parseInt(item.totalPrice) <= filterPrice[1] &&
        name.some((category) => [item.platingCarrier].flat().includes(category))
    );
  } else if (parseInt(radioname) === 1 && name.length === 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(item.totalPrice) >= filterPrice[0] &&
        parseInt(item.totalPrice) <= filterPrice[1] &&
        item.directions[0][0].stops === 0
    );
  } else if (parseInt(radioname) === 2 && name.length === 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(item.totalPrice) >= filterPrice[0] &&
        parseInt(item.totalPrice) <= filterPrice[1] &&
        item.directions[0][0].stops === 1
    );
  } else if (parseInt(radioname) === 3 && name.length === 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(item.totalPrice) >= filterPrice[0] &&
        parseInt(item.totalPrice) <= filterPrice[1] &&
        item.directions[0][0].stops > 1
    );
  } else if (parseInt(radioname) === 0 && name.length > 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(item.totalPrice) >= filterPrice[0] &&
        parseInt(item.totalPrice) <= filterPrice[1] &&
        name.some((category) => [item.platingCarrier].flat().includes(category))
    );
  } else if (parseInt(radioname) === 1 && name.length > 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(item.totalPrice) >= filterPrice[0] &&
        parseInt(item.totalPrice) <= filterPrice[1] &&
        name.some((category) =>
          [item.platingCarrier].flat().includes(category)
        ) &&
        item.directions[0][0].stops === 0
    );
  } else if (parseInt(radioname) === 2 && name.length > 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(item.totalPrice) >= filterPrice[0] &&
        parseInt(item.totalPrice) <= filterPrice[1] &&
        name.some((category) =>
          [item.platingCarrier].flat().includes(category)
        ) &&
        item.directions[0][0].stops === 1
    );
  } else {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(item.totalPrice) >= filterPrice[0] &&
        parseInt(item.totalPrice) <= filterPrice[1] &&
        name.some((category) =>
          [item.platingCarrier].flat().includes(category)
        ) &&
        item.directions[0][0].stops > 1
    );
  }

  const [itemCkeck, setItemCheck] = useState(true);
  const handleClick = (e) => {
    if (e.target.checked) {
      setCheck(true);
      setName(flightName.map((item) => item.code));
      flightName.map((item, index) => {
        document.getElementById("checkDefault" + index).checked = true;
      });
    } else {
      setName([]);
      setCheck(false);
      flightName.map((item, index) => {
        document.getElementById("checkDefault" + index).checked = false;
      });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  console.log(check);
  const handleChange = (e) => {
    //  alert(name.length+", "+flightName.length);
    if (e.target.checked) {
      if (flightName.length - name.length === 1) {
        setCheck(true);
      } else {
        setCheck(false);
      }
      // setCheck(false);
      setName([...name, e.target.value]);
    } else {
      // if (name.length <= flightName.length && name.length > 1) {
      //   setCheck(false);
      // } else {
      //   setCheck(true);
      // }
      setCheck(false);
      setName(name.filter((id) => id !== e.target.value));
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // for radio button filter
  const radioflightName = [
    { name: "All Flights" },
    // { name: "Direct flight only" },
    // { name: "1 stop" },
    // { name: "2 stops or more" },
  ];

  let i = 0;
  mainJson?.stops?.map((item) => {
    if (item === 0) {
      const obj = {
        name: "Direct",
      };
      radioflightName.push(obj);
    }
    if (item === 1) {
      const obj = {
        name: "1 Stop",
      };
      radioflightName.push(obj);
    }
    if (item > 1) {
      if (i === 0) {
        const obj = {
          name: "2 or More Stops",
        };
        radioflightName.push(obj);
      }
      i++;
    }
  });

  const radiohandleChange = (e) => {
    setRadioName(e.target.value);
  };

  if (String(tripType) === String("One Way")) {
    flightsData = dataPrice;
  } else if (String(tripType) === String("Round Trip")) {
    flightsData = dataPrice;
  } else if (String(tripType) === String("Multi City")) {
    flightsData = dataPrice;
  }

  let currency = mainJson?.currency;
  console.log(currency);
  localStorage.setItem("currency", JSON.stringify(currency));
  useEffect(() => {
    // setName(flightName?.name);
    setCheck(true);
    flightName.map((item, index) => {
      document.getElementById("checkDefault" + index).checked = true;
    });
    // $(".slide-toggle").hide();
    // $(".search-again").click(function () {
    //   $(".slide-toggle").slideToggle("slow");
    // });

    $(".rotate").click(function () {
      $(this).toggleClass("down");
    });
    // stop section toggle option
    $(document).ready(function () {
      $("#stopclicksection").click(function () {
        $("#stopsection").toggle();
      });
    });

    // airlines section toggle option
    $(document).ready(function () {
      $("#airclicksection").click(function () {
        $("#airlinessection").toggle();
      });
    });

    // airlines section toggle option
    $(document).ready(function () {
      $("#baggclicksection").click(function () {
        $("#baggagesection").toggle();
      });
      $("#priceclicksection").click(function () {
        $("#pricesection").toggle();
      });
    });
  }, []);

  const handleProposal = () => {
    navigate("/proposal");
  };

  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={1500} />
      <div className="container box-shadow content-width">
        <div className="row border mt-3">
          <div className="col-lg-6 py-3 px-5 bg-white">
            <h5 className="pt-1">
              We found {fetchFlighData?.totalFlights} flights,{" "}
              {fetchFlighData?.airlineFilters?.length} Unique Airlines{" "}
            </h5>
          </div>
          <div className="col-lg-6 bg-white py-3 px-5 ">
            <div class="dropdown float-end">
              <button
                class="fw-bold text-color dropdown-toggle"
                style={{ fontSize: "11px" }}
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="me-1">
                  <i class="fas fa-money-bill-wave"></i>
                </span>
                {amountChange}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li
                  class="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => setAmountChange("Gross Amount")}
                >
                  Gross Amount
                </li>
                <li
                  class="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => setAmountChange("Invoice Amount")}
                >
                  Invoice Amount
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Loading loading={loading}></Loading>
      <div className="container my-3 content-width">
        <div className="row py-4 ps-3">
          <div
            className="col-lg-3 rounded box-shadow bg-white"
            style={{
              height: "100%",
              position: "sticky",
              top: "9%",
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <div className="container">
              <div className="row px-2">
                <div className="col-lg-6 mt-3">
                  <h6 className="float-start text-color fw-bold">Price</h6>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="text-end">
                    <span id="priceclicksection">
                      <i
                        className="fa fa-chevron-up rotate"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row pb-3">
                <div className="col-lg-12 mt-2" id="pricesection">
                  <div className="mt-2">
                    {/* <input
                      className="w-100 myinput"
                      type="range"
                      name="flexRadioDefault2"
                      value={price}
                      id="flexRadioDefault1"
                      step="0.01"
                      onInput={handleInput}
                      min={mainJson?.minMaxPrice?.minPrice}
                      max={mainJson?.minMaxPrice?.maxPrice}
                    /> */}
                    <RangeSlider
                      defaultValue={[
                        Math.ceil(mainJson?.minMaxPrice?.minPrice),
                        Math.ceil(mainJson?.minMaxPrice?.maxPrice),
                      ]}
                      min={Math.ceil(mainJson?.minMaxPrice?.minPrice)}
                      max={Math.ceil(mainJson?.minMaxPrice?.maxPrice)}
                      step={100}
                      minStepsBetweenThumbs={1}
                      onChangeEnd={(val) => setFilterPrice(val)}
                    >
                      <RangeSliderTrack bg="#e5d4b1">
                        <RangeSliderFilledTrack bg="#BF953F" />
                      </RangeSliderTrack>
                      <RangeSliderThumb bg="black" boxSize={4} index={0} />
                      <RangeSliderThumb bg="black" boxSize={4} index={1} />
                    </RangeSlider>
                  </div>
                  <div>
                    <span
                      className="float-start fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      MIN {currency !== undefined ? currency : "BDT"}{" "}
                      {filterPrice[0]}
                    </span>
                    <span
                      className="float-end fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      MAX {currency !== undefined ? currency : "BDT"}{" "}
                      {filterPrice[1]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            {/* Stop section  */}
            <div className="container">
              <div className="row px-2">
                <div className="col-lg-6 mt-3">
                  <h6 className="float-start text-color fw-bold">Stops</h6>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="text-end">
                    <span id="stopclicksection">
                      <i
                        className="fa fa-chevron-up rotate"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row pb-3 px-2">
                <div className="col-lg-12 mt-2" id="stopsection">
                  <div className="form-check mt-2">
                    {radioflightName.map((item, index) => (
                      <div
                        key={index}
                        style={{ fontSize: "13px" }}
                        className="fw-bold"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="name"
                          value={index}
                          id="flexCheckDefault"
                          onChange={radiohandleChange}
                          defaultChecked={index === 0}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          {item.name}
                        </label>
                        <br></br>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            {/* End of stop section  */}

            {/* Airlines Section  */}
            <div className="container">
              <div className="row px-2">
                <div className="col-lg-6 mt-3">
                  <h6 className="float-start text-color fw-bold">Airlines</h6>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="text-end">
                    <span id="airclicksection">
                      <i
                        className="fa fa-chevron-up rotate"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row pb-3 px-2">
                <div className="col-lg-12 mt-2" id="airlinessection">
                  <div className="form-check mt-2 ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault100"
                      name="test"
                      checked={check}
                      onChange={handleClick}
                    />
                    <label
                      className="form-check-label float-start fw-bold"
                      htmlFor="flexCheckDefault"
                    >
                      All Airline
                    </label>
                  </div>
                  <div className="form-check mt-2">
                    {flightName.map((item, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.code}
                          id={"checkDefault" + index}
                          onChange={handleChange}
                          // defaultChecked={itemCkeck}
                        />
                        <img
                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${item.code}.png`}
                          alt="airlineCode"
                          width="35px"
                          height="30px"
                        />
                        <label
                          className="form-check-label fw-bold px-2"
                          htmlFor="flexCheckDefault"
                          title={item.name}
                          style={{ fontSize: "13px" }}
                        >
                          {item.code} ({item.totalFlights})
                        </label>{" "}
                        <span
                          className="fw-bold float-end"
                          style={{ fontSize: "13px" }}
                        >
                          {currency !== undefined ? currency : "BDT"}{" "}
                          {item.minPrice}
                        </span>
                        <br></br>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            {/* End of Airlines Section  */}

            {/* Baggage section  */}
            <div className="container pb-3 mb-5">
              {/* <div className="row px-2">
                <div className="col-lg-6 mt-3">
                  <h6 className="float-start text-color fw-bold">Baggage</h6>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="text-end">
                    <span id="baggclicksection">
                      <i
                        className="fa fa-chevron-up rotate"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row pb-3 px-2">
                <div className="col-lg-12 mt-2" id="baggagesection">
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault2"
                      id="flexRadioDefault1"
                      defaultChecked
                    />
                    <label
                      className="form-check-label float-start"
                      htmlFor="flexRadioDefault2"
                    >
                      All baggage options
                    </label>
                  </div>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault2"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label float-start"
                      htmlFor="flexRadioDefault2"
                    >
                      Checked baggage included
                    </label>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-lg-9">
            {flightsData?.length === 0 &&
            flightsData !== null &&
            flightsData !== undefined ? (
              <>
                <NoDataFoundPage />
              </>
            ) : (
              flightsData?.map((data, index) => (
                <ShowFlight
                  key={index}
                  flightType={tripType}
                  index={index}
                  data={data}
                  amountChange={amountChange}
                  currency={currency}
                  checkList={checkList}
                ></ShowFlight>
              ))
            )}
          </div>
        </div>
      </div>
      {count > 0 ? (
        <footer className="main-footer fixed-bottom">
          <div className="text-center">
            {/* <b>Version</b> 3.1.0 */}
            <strong className="fs-6">{count} Option Selected</strong>
            <button
              className="btn button-color fw-bold text-white ms-3 btn-sm rounded"
              onClick={handleProposal}
            >
              Create Proposal
            </button>
          </div>
          {/* <div className="float-end me-5 pe-5">
          </div> */}
          {/* <strong>Copyright &copy; 2020-2022</strong> All rights reserved. */}
        </footer>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShowAllFlight;
