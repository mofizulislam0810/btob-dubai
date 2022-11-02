import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import airports from "../../../JSON/airports.json";
import "../../../plugins/t-datepicker/t-datepicker.min";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SearchFrom.css";
import axios from "axios";
import { environment } from "../../SharePages/Utility/environment";
import moment from "moment";
import { Box } from "@chakra-ui/react";
import { getCabinClass } from "../../../common/functions";

const SearchFrom = () => {
  const formCount = 0;
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("Round Trip"); //"One Way"
  const [travelClassType, setTravelClassType] = useState("Economy"); //:"Economy"
  const [adultCount, setAdultCount] = useState(1); //1
  const [childCount, setChildCount] = useState(0); //0
  let [infantCount, setInfantCount] = useState(0); //0
  const totalPassenger = adultCount + childCount;
  const originRef = useRef();
  const destinationRef = useRef();
  const originRef1 = useRef();
  const destinationRef1 = useRef();
  const originRef2 = useRef();
  const destinationRef2 = useRef();
  const originRef3 = useRef();
  const destinationRef3 = useRef();
  const originRef4 = useRef();
  const destinationRef4 = useRef();
  const originRef5 = useRef();
  const destinationRef5 = useRef();
  // const preAirlineRef = useRef();

  let cIndex = 1;
  const handleFlightOptionP = (index) => {
    if (cIndex < 5) {
      cIndex += 1;
      if (cIndex >= 2) {
        document.getElementById("btnm-1").style.display = "";
      }
      document.getElementById("multiCity" + cIndex).style.display = "";
    }
  };
  const handleFlightOptionM = (index) => {
    cIndex -= 1;
    if (cIndex < 2) {
      document.getElementById("btnm-1").style.display = "none";
    }
    document.getElementById("multiCity" + (cIndex + 1)).style.display = "none";
    if (cIndex === 1) {
      originRef2.current.value = "";
      destinationRef2.current.value = "";
      $(".class_2").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 2) {
      originRef3.current.value = "";
      destinationRef3.current.value = "";
      $(".class_3").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 3) {
      originRef4.current.value = "";
      destinationRef4.current.value = "";
      $(".class_4").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 4) {
      originRef5.current.value = "";
      destinationRef5.current.value = "";
      $(".class_5").tDatePicker({
        autoClose: true,
      });
    }
  };
  const handleSearchFlight = (e) => {
    if (String(tripType) === "Multi City") {
      const origin = originRef.current.value;
      const destination = destinationRef.current.value;
      const origin1 = originRef1.current.value;
      const destination1 = destinationRef1?.current.value;
      const origin2 = originRef2.current.value;
      const destination2 = destinationRef2.current.value;
      const origin3 = originRef3.current.value;
      const destination3 = destinationRef3.current.value;
      const origin4 = originRef4.current.value;
      const destination4 = destinationRef4.current.value;
      const origin5 = originRef5.current.value;
      const destination5 = destinationRef5.current.value;
      const journeyDate = $("#departureDate").children("input").val();
      const returnDate = $("#returnDate").children("input").val();
      const inputDateMulti1 = $("#departureDate1").children("input").val();
      const inputDateMulti2 = $("#departureDate2").children("input").val();
      const inputDateMulti3 = $("#departureDate3").children("input").val();
      const inputDateMulti4 = $("#departureDate4").children("input").val();
      const inputDateMulti5 = $("#departureDate5").children("input").val();
      console.log(journeyDate);
      const qtyList = {
        Adult: adultCount,
        Children: childCount,
        Infant: infantCount,
      };
      const searchData = {
        origin: origin,
        destination: destination,
        origin1: origin1,
        destination1: destination1,
        origin2: origin2,
        destination2: destination2,
        origin3: origin3,
        destination3: destination3,
        origin4: origin4,
        destination4: destination4,
        origin5: origin5,
        destination5: destination5,
        journeyDate: journeyDate,
        returnDate: returnDate,
        inputDateMulti1: inputDateMulti1,
        inputDateMulti2: inputDateMulti2,
        inputDateMulti3: inputDateMulti3,
        inputDateMulti4: inputDateMulti4,
        inputDateMulti5: inputDateMulti5,
        tripTypeModify: tripType,
        qtyList: qtyList,
        travelClass: travelClassType,
      };
      localStorage.setItem("Database", JSON.stringify(searchData));
      navigate("/showallflight", {
        state: {
          origin: origin,
          destination: destination,
          origin1: origin1,
          destination1: destination1,
          origin2: origin2,
          destination2: destination2,
          origin3: origin3,
          destination3: destination3,
          origin4: origin4,
          destination4: destination4,
          origin5: origin5,
          destination5: destination5,
          journeyDate: journeyDate,
          returnDate: returnDate,
          inputDateMulti1: inputDateMulti1,
          inputDateMulti2: inputDateMulti2,
          inputDateMulti3: inputDateMulti3,
          inputDateMulti4: inputDateMulti4,
          inputDateMulti5: inputDateMulti5,
          tripTypeModify: tripType,
          qtyList: qtyList,
          travelClass: travelClassType,
          formCount: formCount,
          childAgeList: childAge,
        },
      });
    } else {
      const origin = originRef.current.value;
      const destination = destinationRef.current.value;
      // const airlines  = preAirlineRef.current.value;
      const journeyDate = $("#departureDate").children("input").val();
      const returnDate = $("#returnDate").children("input").val();
      console.log(journeyDate);
      if (origin === destination) {
        toast.error("Origin and Destination must be diffarent");
      } else {
        if (String(journeyDate) !== String(null)) {
          const qtyList = {
            Adult: adultCount,
            Children: childCount,
            Infant: infantCount,
          };
          console.log(qtyList);
          const searchData = {
            origin: origin,
            destination: destination,
            journeyDate: journeyDate,
            returnDate: returnDate,
            tripTypeModify: tripType,
            qtyList: qtyList,
            travelClass: travelClassType,
          };
          localStorage.setItem("Database", JSON.stringify(searchData));
          navigate("/showallflight", {
            state: {
              origin: origin,
              destination: destination,
              journeyDate: journeyDate,
              returnDate: returnDate,
              tripTypeModify: tripType,
              qtyList: qtyList,
              travelClass: travelClassType,
              airlines: preAirlines,
              childAgeList: childAge,
            },
          });
        } else {
          toast.error("Please select date");
        }
      }
    }
    e.preventDefault();
  };

  useEffect(() => {
    console.log(getCabinClass(travelClassType), "CABIN CLASS");
  }, [travelClassType]);

  const searchValue = (idx) => {
    if (searchList !== undefined) {
      if (searchList[idx].journeyType === "One Way") {
        setTripType("One Way");
      } else {
        setTripType("Round Trip");
      }
    }
    setTravelClassType(
      searchList !== undefined
        ? searchList[idx].cabinClass === 1
          ? "Economy"
          : searchList[idx].cabinClass === 3
          ? "Business"
          : " "
        : "Economy"
    );
    setAdultCount(searchList !== undefined ? searchList[idx].adults : 1);
    setChildCount(searchList !== undefined ? searchList[idx].childs : 0);
    setInfantCount(searchList !== undefined ? searchList[idx].infants : 0);
    const origin = airports.filter(
      (item) => item.iata === searchList[idx].routes[0].origin
    );
    $("#txtFrom").val(
      searchList !== undefined
        ? origin[0].city + " - " + origin[0].country + ", " + origin[0].name
        : originRef.current.value
    );

    const destination = airports.filter(
      (item) => item.iata === searchList[idx].routes[0].destination
    );
    $("#txtTo").val(
      searchList !== undefined
        ? destination[0].city +
            " - " +
            destination[0].country +
            ", " +
            destination[0].name
        : destinationRef.current.value
    );

    if (searchList !== undefined) {
      if (searchList[idx].journeyType === "One Way") {
        setTripType("One Way");
      } else {
        setTripType("Round Trip");
      }
    }

    if (searchList !== undefined) {
      if (searchList[idx].journeyType === "One Way") {
        $(document).ready(function () {
          $(".class_0").tDatePicker("update", [
            searchList !== undefined
              ? moment(searchList[idx].routes[0].departureDate).format(
                  "yyyy-MM-DD"
                )
              : new Date(),
          ]);
        });
      } else {
        $(document).ready(function () {
          $(".class_0").tDatePicker("update", [
            searchList !== undefined
              ? moment(searchList[idx].routes[0].departureDate).format(
                  "yyyy-MM-DD"
                )
              : new Date(),
            searchList !== undefined
              ? moment(searchList[idx].routes[1].departureDate).format(
                  "yyyy-MM-DD"
                )
              : new Date(),
          ]);
        });
      }
    }
    // $(document).ready(function () {
    //   $(".class_0").tDatePicker("update", [
    //     searchList !== undefined
    //       ? moment(
    //           searchList[idx].routes[0].departureDate
    //         ).format("yyyy-MM-DD")
    //       : new Date(),
    //   ]);
    // });
  };

  useEffect(() => {
    $(".class_0").tDatePicker({});
    $(".class_1").tDatePicker({});
    $(".class_2").tDatePicker({});
    $(".class_3").tDatePicker({});
    $(".class_4").tDatePicker({});
    $(".class_5").tDatePicker({});

    $(".t-date-check-in").html(
      "<label class='t-date-info-title'><span class='me-1 text-danger'><i class='fa fa-calendar'></i></span><span>Depart</span></label>"
    );
    $(".t-date-check-out").html(
      "<label class='t-date-info-title'><span class='me-1 text-danger'><i class='fa fa-calendar'></i></span><span>Return</span></label>"
    );

    $("#departureDate").attr("class", "t-check-in");
    $("#returnDate").hide();
    $("#returnLavel").hide();

    // for passenger count
    $("#passengerBlock").on({
      click: function (e) {
        e.preventDefault();
      },
    });
    // date picker check for triptype
    if (String(tripType) === String("One Way")) {
      $("#departureDate").attr("class", "t-check-in t-picker-only");
    } else if (String(tripType) === String("Round Trip")) {
      $("#departureDate").attr("class", "t-check-in");
      $("#returnDate").show();
      $("#returnLavel").show();
    } else {
      $("#departureDate").attr("class", "t-check-in t-picker-only");
    }

    // airport autoComplete
    var options = {
      shouldSort: true,
      threshold: 0.4,
      maxPatternLength: 32,
      keys: [
        {
          name: "iata",
          weight: 0.5,
        },
        {
          name: "city",
          weight: 0.3,
        },
      ],
    };

    // var fuse = new Fuse(airports, options)

    $(".autocomplete").each(function () {
      var ac = $(this);

      ac.on("click", function (e) {
        e.stopPropagation();
      })
        .on("focus keyup", search)
        .on("keydown", onKeyDown);

      var wrap = $("<div>")
        .addClass("autocomplete-wrapper")
        .insertBefore(ac)
        .append(ac);

      var list = $("<div>")
        .addClass("autocomplete-results")
        .on("click", ".autocomplete-result", function (e) {
          e.preventDefault();
          e.stopPropagation();
          selectIndex($(this).data("index"), ac);
        })
        .appendTo(wrap);
    });

    $(document)
      .on("mouseover", ".autocomplete-result", function (e) {
        var index = parseInt($(this).data("index"), 10);
        if (!isNaN(index)) {
          $(this).attr("data-highlight", index);
        }
      })
      .on("click", clearResults);

    function clearResults() {
      results = [];
      numResults = 0;
      $(".autocomplete-results").empty();
    }

    function selectIndex(index, autoinput) {
      if (results.length >= index + 1) {
        autoinput.val(
          results[index].city +
            " - " +
            results[index].country +
            ", " +
            results[index].name
        );
        clearResults();
      }
    }

    var results = [];
    var numResults = 0;
    var selectedIndex = -1;

    function search(e) {
      if (e.which === 38 || e.which === 13 || e.which === 40) {
        return;
      }
      var ac = $(e.target);
      var list = ac.next();
      if (ac.val().length > 0) {
        var fuse = new Fuse(airports, options);
        results = fuse
          .search(ac.val(), { limit: 6 })
          .map((result) => result.item);
        numResults = results.length;

        var divs = results.map(function (r, i) {
          return (
            '<div class="autocomplete-result text-start" data-index="' +
            i +
            '">' +
            '<label style="display:none">' +
            r.iata +
            " - " +
            r.country +
            ", " +
            r.name +
            '</label><div> <span class="text-danger me-1"><i class="fas fa-plane-departure"></i></span> <b>' +
            r.city +
            "</b> - " +
            r.country +
            ", " +
            r.name +
            '<span class="autocomplete-location ps-2">(' +
            r.iata +
            ")</span>" +
            "</div>" +
            "</div>"
          );
        });

        selectedIndex = -1;
        list.html(divs.join("")).attr("data-highlight", selectedIndex);
      } else {
        numResults = 0;
        list.empty();
      }
    }

    function onKeyDown(e) {
      var ac = $(e.currentTarget);
      var list = ac.next();
      switch (e.which) {
        case 38: // up
          selectedIndex--;
          if (selectedIndex <= -1) {
            selectedIndex = -1;
          }
          list.attr("data-highlight", selectedIndex);
          break;
        case 13: // enter
          selectIndex(selectedIndex, ac);
          break;
        case 9: // enter
          selectIndex(selectedIndex, ac);
          e.stopPropagation();
          return;
        case 40: // down
          selectedIndex++;
          if (selectedIndex >= numResults) {
            selectedIndex = numResults - 1;
          }
          list.attr("data-highlight", selectedIndex);
          break;

        default:
          return; // exit this handler for other keys
      }
      e.stopPropagation();
      e.preventDefault(); // prevent the default action (scroll / move caret)
    }
  }, [tripType]);

  useEffect(() => {
    $(".swap").click(function () {
      //Swaps previous and next address values
      var prevAddress = $(this).parent().prev(".forms").find(".address input");
      var nextAddress = $(this).parent().next(".forms").find(".address input");

      var tmp = prevAddress.val();
      prevAddress.val(nextAddress.val());
      nextAddress.val(tmp);
    });
  }, []);

  const [preAirlines, setPreAirlines] = useState();

  const handleChange = (e) => {
    const re = /^[a-zA-Z,]*$/;
    let text = e.target.value;
    if (re.test(text)) {
      setPreAirlines(text);
    } else {
    }
  };

  // console.log(preAirlines);

  const [childAge, setChildAge] = useState([]);
  const addNewChild = (child) => {
    setChildCount(child + 1);
    setChildAge([...childAge, { age: "" }]);
    // if(childAge.length < 9){
    // }
  };

  const handleChildAge = (e, index) => {
    let age = childAge;
    age[index][e.target.name] = e.target.value;
    setChildAge(age);
  };

  // console.log(childAge);

  const clickOnDelete = (child) => {
    setChildCount(child - 1);
    const lastIndex = childAge.length - 1;
    // this.setState({ items: items.filter((item, index) => index !== lastIndex) });
    setChildAge(childAge.filter((r, index) => index !== lastIndex));
  };
  const [searchList, setSearchList] = useState();
  const searchLogList = async () => {
    const response = await axios.get(
      environment.searchLogs,
      environment.headerToken
    );
    console.log(response.data);
    setSearchList(await response.data);
  };

  useEffect(() => {
    searchLogList();
  }, []);
  console.log(searchList);

  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={1500} />
      <form onSubmit={handleSearchFlight}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12 banner-text shadow-for-search">
              <Box
                id="form-bg"
                boxShadow="lg"
                borderRadius="8px"
                border="1px solid lightgray"
              >
                <div className="row ">
                  <div
                    className="col-lg-4 pb-4 text-center"
                    style={{ paddingTop: "3%" }}
                  >
                    <div className="flex-container">
                      <div className="left-border ">
                        <button
                          className="form-select inputgroup rounded-left"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span id="valWay">{tripType}</span>
                        </button>
                        <ul
                          id="tripList"
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li
                            className="dropdown-item dropdown-item-selected"
                            onClick={() => setTripType("One Way")}
                            style={{ cursor: "pointer" }}
                          >
                            One Way
                          </li>
                          <li
                            className="dropdown-item"
                            onClick={() => setTripType("Round Trip")}
                            style={{ cursor: "pointer" }}
                          >
                            Round Trip
                          </li>
                          <li
                            className="dropdown-item"
                            onClick={() => setTripType("Multi City")}
                            style={{ cursor: "pointer" }}
                          >
                            Multi City
                          </li>
                        </ul>
                      </div>
                      <div className="left-border">
                        <button
                          className="form-select inputgroup"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span id="valClass">{travelClassType}</span>
                        </button>
                        <ul
                          id="classList"
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li
                            className="dropdown-item dropdown-item-selected"
                            onClick={() => setTravelClassType("Economy")}
                            style={{ cursor: "pointer" }}
                          >
                            Economy
                          </li>
                          <li
                            className="dropdown-item"
                            onClick={() => setTravelClassType("Business")}
                            style={{ cursor: "pointer" }}
                          >
                            Business
                          </li>
                          <li
                            className="dropdown-item"
                            onClick={() => setTravelClassType("First")}
                            style={{ cursor: "pointer" }}
                          >
                            First
                          </li>
                        </ul>
                      </div>
                      <div className="d-flex w100 align-self-center passenger">
                        <div className="d-flex ageselectpadnotx align-items-center inputgroup">
                          <div style={{ position: "relative" }}>
                            <button
                              className="form-select inputgroup rounded-right"
                              type="button"
                              id="dropdownMenuButtonpassenger"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              data-bs-auto-close="outside"
                              style={{ height: "38px" }}
                            >
                              <span className="d-flex">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  focusable="false"
                                  className=" NMm5M"
                                >
                                  <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path>
                                </svg>
                                <span className="px-1" id="valPerson">
                                  {adultCount + childCount + infantCount}
                                </span>
                              </span>
                            </button>
                            <div
                              id="passengerBlock"
                              className="dropdown-menu passenger-pack"
                              aria-labelledby="dropdownMenuButtonpassenger"
                            >
                              <div>
                                <div className="d-flex justify-content-between mb-3">
                                  <div style={{ fontSize: "18px" }}>
                                    <i
                                      className="fas fa-male align-self-center d-none"
                                      style={{ color: "#222" }}
                                      aria-hidden="true"
                                    ></i>
                                    Adult
                                  </div>
                                  <div className="number-input text-center">
                                    <button
                                      className="round-btn"
                                      title="adultminus"
                                      onClick={
                                        infantCount > 0 &&
                                        adultCount === infantCount
                                          ? () => {
                                              setAdultCount(adultCount - 1);
                                              setInfantCount(infantCount - 1);
                                            }
                                          : () => setAdultCount(adultCount - 1)
                                      }
                                      disabled={adultCount === 1 ? true : false}
                                    >
                                      <span className="text-white">
                                        <i className="fas fa-minus"></i>
                                      </span>
                                    </button>
                                    <input
                                      readOnly
                                      value={adultCount}
                                      type="text"
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                      }}
                                    />
                                    <button
                                      className="round-btn"
                                      title="adultplus"
                                      onClick={() =>
                                        setAdultCount(adultCount + 1)
                                      }
                                      disabled={
                                        totalPassenger === 9 ? true : false
                                      }
                                    >
                                      <span className="text-white">
                                        <i className="fas fa-plus"></i>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                  <div>
                                    <div style={{ fontSize: "18px" }}>
                                      <i
                                        className="fas fa-child align-self-center d-none"
                                        style={{ color: "#222" }}
                                        aria-hidden="true"
                                      ></i>
                                      Children
                                    </div>
                                    <div className="adult">Aged 2-12</div>
                                  </div>
                                  <div className="number-input text-center">
                                    <button
                                      className="round-btn"
                                      title="adultminus"
                                      onClick={
                                        () => clickOnDelete(childCount)
                                        // setChildCount(childCount - 1)
                                      }
                                      disabled={childCount === 0 ? true : false}
                                    >
                                      <span className="text-white">
                                        <i className="fas fa-minus"></i>
                                      </span>
                                    </button>
                                    <input
                                      readOnly
                                      value={childCount}
                                      type="text"
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                      }}
                                    />
                                    <button
                                      className="round-btn"
                                      title="adultplus"
                                      onClick={
                                        () => addNewChild(childCount)
                                        // setChildCount(childCount + 1)
                                      }
                                      disabled={
                                        totalPassenger === 9 ? true : false
                                      }
                                    >
                                      <span className="text-white">
                                        <i className="fas fa-plus"></i>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                  <div>
                                    <div style={{ fontSize: "18px" }}>
                                      <i
                                        className="fas fa-baby align-self-center d-none"
                                        style={{ color: "#222" }}
                                        aria-hidden="true"
                                      ></i>
                                      Infants
                                    </div>
                                  </div>
                                  <div className="number-input text-center">
                                    <button
                                      className="round-btn"
                                      title="adultminus"
                                      onClick={() =>
                                        setInfantCount(infantCount - 1)
                                      }
                                      disabled={
                                        infantCount === 0 ? true : false
                                      }
                                    >
                                      <span className="text-white">
                                        <i className="fas fa-minus"></i>
                                      </span>
                                    </button>
                                    <input
                                      readOnly
                                      value={infantCount}
                                      type="text"
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                      }}
                                    />
                                    <button
                                      className="round-btn"
                                      title="adultplus"
                                      onClick={
                                        infantCount < adultCount
                                          ? () =>
                                              setInfantCount(infantCount + 1)
                                          : () => {}
                                      }
                                      disabled={
                                        infantCount === 9 ? true : false
                                      }
                                    >
                                      <span className="text-white">
                                        <i className="fas fa-plus"></i>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex">
                    {childAge.map((val, index) => {
                      let agenum = `age-${index}`;
                      return (
                        <span>
                          <label
                            htmlFor="formGroupExampleInput"
                            className="form-label text-white"
                          >
                            Child {index + 1}
                          </label>
                          <input
                            type="number"
                            value={val.agenum}
                            name="age"
                            className="form-control me-1"
                            style={{ width: "60px" }}
                            min="2"
                            max="12"
                            onChange={(e) => handleChildAge(e, index)}
                            required
                          />
                        </span>
                      );
                    })}
                  </div>
                  <div className="col-lg-2">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label text-white"
                    >
                      Preferred Airline
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="e.g. BS, BG, TK"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="row pt-1 position-relative">
                  <div className="col-lg-4 forms">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label text-white"
                    >
                      Depart From <span className="text-white fw-bold">*</span>
                    </label>
                    <span className="address">
                      <input
                        type="text"
                        className="form-control input-field autocomplete rounded-3"
                        ref={originRef}
                        placeholder="From"
                        required
                        autoComplete="off"
                        id="txtFrom"
                      />
                    </span>
                  </div>
                  <div className="swap">
                    <label className="swap">
                      <span className="text-danger fw-bold icon">
                        <i className="fas fa-exchange-alt fa-1x"></i>
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-4 forms">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label text-white"
                    >
                      Going To <span className="text-white fw-bold">*</span>
                    </label>
                    <span className="address">
                      <input
                        type="text"
                        className="form-control input-field autocomplete rounded-3"
                        ref={destinationRef}
                        placeholder="To"
                        required
                        id="txtTo"
                        autoComplete="off"
                      />
                    </span>
                  </div>
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Departing{" "}
                          <span className="text-white fw-bold">*</span>
                        </label>
                      </div>
                      <div className="col-lg-6" id="returnLavel">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Returning{" "}
                          <span className="text-white fw-bold">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="t-datepicker class_0 bg-light rounded-3 ">
                      <div
                        className="t-check-in"
                        id="departureDate"
                        style={{
                          minHeight: "100%",
                          borderRight: "1px solid gray",
                        }}
                      ></div>
                      <div className="t-check-out" id="returnDate"></div>
                    </div>
                  </div>
                </div>
                {tripType === "Multi City" ? (
                  <>
                    <div className="row pt-1 position-relative" id="multiCity1">
                      <div className="col-lg-4 forms">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Depart From{" "}
                          <span className="text-white fw-bold">*</span>
                        </label>
                        <span className="address">
                          <input
                            type="text"
                            className="form-control input-field autocomplete rounded-3"
                            ref={originRef1}
                            placeholder="From"
                            autoComplete="off"
                            id="txtFrom1"
                            required
                          />
                        </span>
                      </div>
                      <div className="swap">
                        <label className="swap">
                          <span className="text-danger fw-bold icon">
                            <i className="fas fa-exchange-alt fa-1x"></i>
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4 forms">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Going To <span className="text-white fw-bold">*</span>
                        </label>
                        <span className="address">
                          <input
                            type="text"
                            className="form-control input-field autocomplete rounded-3"
                            ref={destinationRef1}
                            placeholder="To"
                            id="txtTo1"
                            autoComplete="off"
                            required
                          />
                        </span>
                      </div>
                      <div className="col-lg-4">
                        <div className="row">
                          <div className="col-lg-12 ">
                            <label
                              htmlFor="formGroupExampleInput"
                              className="form-label text-white"
                            >
                              Departing{" "}
                              <span className="text-white fw-bold">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="t-datepicker class_1 bg-light rounded-3">
                          <div
                            className="t-check-in t-picker-only"
                            id="departureDate1"
                            style={{
                              minHeight: "100%",
                              borderRight: "1px solid gray",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row pt-1 position-relative"
                      id="multiCity2"
                      style={{ display: "none" }}
                    >
                      <div className="col-lg-4 forms">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Depart From{" "}
                          <span className="text-white fw-bold">*</span>
                        </label>
                        <span className="address">
                          <input
                            type="text"
                            className="form-control input-field autocomplete rounded-3"
                            ref={originRef2}
                            placeholder="From"
                            autoComplete="off"
                            id="txtFrom2"
                          />
                        </span>
                      </div>
                      <div className="swap">
                        <label className="swap">
                          <span className="text-danger fw-bold icon">
                            <i className="fas fa-exchange-alt fa-1x"></i>
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4 forms">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Going To <span className="text-white fw-bold">*</span>
                        </label>
                        <span className="address">
                          <input
                            type="text"
                            className="form-control input-field autocomplete rounded-3"
                            ref={destinationRef2}
                            placeholder="To"
                            id="txtTo2"
                            autoComplete="off"
                          />
                        </span>
                      </div>
                      <div className="col-lg-4">
                        <div className="row">
                          <div className="col-lg-12">
                            <label
                              htmlFor="formGroupExampleInput"
                              className="form-label text-white"
                            >
                              Departing{" "}
                              <span className="text-white fw-bold">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="t-datepicker class_2 bg-light">
                          <div
                            className="t-check-in t-picker-only"
                            id="departureDate2"
                            style={{
                              minHeight: "100%",
                              borderRight: "1px solid gray",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row pt-1 position-relative"
                      id="multiCity3"
                      style={{ display: "none" }}
                    >
                      <div className="col-lg-4 forms">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Depart From{" "}
                          <span className="text-white fw-bold">*</span>
                        </label>
                        <span className="address">
                          <input
                            type="text"
                            className="form-control input-field autocomplete rounded-3"
                            ref={originRef3}
                            placeholder="From"
                            autoComplete="off"
                            id="txtFrom3"
                          />
                        </span>
                      </div>
                      <div className="swap">
                        <label className="swap">
                          <span className="text-danger fw-bold icon">
                            <i className="fas fa-exchange-alt fa-1x"></i>
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4 forms">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Going To <span className="text-white fw-bold">*</span>
                        </label>
                        <span className="address">
                          <input
                            type="text"
                            className="form-control input-field autocomplete rounded-3"
                            ref={destinationRef3}
                            placeholder="To"
                            id="txtTo3"
                            autoComplete="off"
                          />
                        </span>
                      </div>

                      <div className="col-lg-4">
                        <div className="row">
                          <div className="col-lg-12">
                            <label
                              htmlFor="formGroupExampleInput"
                              className="form-label text-white"
                            >
                              Departing{" "}
                              <span className="text-white fw-bold">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="t-datepicker class_3 bg-light">
                          <div
                            className="t-check-in t-picker-only"
                            id="departureDate3"
                            style={{
                              minHeight: "100%",
                              borderRight: "1px solid gray",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row pt-1 position-relative"
                      id="multiCity4"
                      style={{ display: "none" }}
                    >
                      <div className="col-lg-4 forms">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Depart From{" "}
                          <span className="text-white fw-bold">*</span>
                        </label>
                        <span className="address">
                          <input
                            type="text"
                            className="form-control input-field autocomplete rounded-3"
                            ref={originRef4}
                            placeholder="From"
                            autoComplete="off"
                            id="txtFrom4"
                          />
                        </span>
                      </div>
                      <div className="swap">
                        <label className="swap">
                          <span className="text-danger fw-bold icon">
                            <i className="fas fa-exchange-alt fa-1x"></i>
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4 forms">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Going To <span className="text-white fw-bold">*</span>
                        </label>
                        <span className="address">
                          <input
                            type="text"
                            className="form-control input-field autocomplete rounded-3"
                            ref={destinationRef4}
                            placeholder="To"
                            id="txtTo4"
                            autoComplete="off"
                          />
                        </span>
                      </div>
                      <div className="col-lg-4">
                        <div className="row">
                          <div className="col-lg-12">
                            <label
                              htmlFor="formGroupExampleInput"
                              className="form-label text-white"
                            >
                              Departing{" "}
                              <span className="text-white fw-bold">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="t-datepicker class_4 bg-light">
                          <div
                            className="t-check-in t-picker-only"
                            id="departureDate4"
                            style={{
                              minHeight: "100%",
                              borderRight: "1px solid gray",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row pt-1 position-relative"
                      id="multiCity5"
                      style={{ display: "none" }}
                    >
                      <div className="col-lg-4 forms">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Depart From{" "}
                          <span className="text-white fw-bold">*</span>
                        </label>
                        <span className="address">
                          <input
                            type="text"
                            className="form-control input-field autocomplete rounded-3"
                            ref={originRef5}
                            placeholder="From"
                            autoComplete="off"
                            id="txtFrom5"
                          />
                        </span>
                      </div>
                      <div className="swap">
                        <label className="swap">
                          <span className="text-danger fw-bold icon">
                            <i className="fas fa-exchange-alt fa-1x"></i>
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4 forms">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-white"
                        >
                          Going To <span className="text-white fw-bold">*</span>
                        </label>
                        <span className="address">
                          <input
                            type="text"
                            className="form-control input-field autocomplete rounded-3"
                            ref={destinationRef5}
                            placeholder="To"
                            id="txtTo5"
                            autoComplete="off"
                          />
                        </span>
                      </div>
                      <div className="col-lg-4">
                        <div className="row rounded-3">
                          <div className="col-lg-12">
                            <label
                              htmlFor="formGroupExampleInput"
                              className="form-label text-white"
                            >
                              Departing{" "}
                              <span className="text-white fw-bold">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="t-datepicker class_5 bg-light">
                          <div
                            className="t-check-in t-picker-only"
                            id="departureDate5"
                            style={{
                              minHeight: "100%",
                              borderRight: "1px solid gray",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="my-2 d-flex justify-content-center">
                      <div
                        className="btn button-color rounded-pill text-white"
                        id="btnp-1"
                        onClick={() => handleFlightOptionP(1)}
                      >
                        Add more
                      </div>
                      &nbsp;
                      <div
                        className="btn button-color rounded-pill text-white"
                        id="btnm-1"
                        style={{ display: "none" }}
                        onClick={() => handleFlightOptionM(1)}
                      >
                        Remove
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {/* <div className="row mt-3">
                  <div className="col-lg-12 mx-start">
                    <div className="d-flex float-end">
                      <p className="text-white me-1 p-1">Trending Searches:</p>
                      <span className="bg-light bg-gradient text-white fw-bold p-1 me-1 rounded" style={{height:"100%",fontSize:"13px"}}>DAC - CGP</span>
                      <span className="bg-light bg-gradient text-white fw-bold p-1 rounded" style={{height:"100%",fontSize:"13px"}}>DAC - DXB</span>
                    </div>
                  </div>
                </div>
                <div className="row position-absolute top-100 start-50 translate-middle">
                  <button className="btn button-color text-white text-center fw-bold">
                    Search Flight
                  </button>
                </div> */}

                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn text-white mt-4 text-center fw-bold rounded"
                        style={{ backgroundColor: "#7c04c0" }}
                      >
                        Search Flight
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div className="row mt-3">
                  <div className="col-lg-12"></div>
                </div> */}
              </Box>
            </div>
          </div>
        </div>
      </form>

      {/* <div className="container my-3">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex justify-content-center">
              {searchList !== undefined ? (
                searchList.map((item, index) => {
                  return (
                    <>
                      {index === 0 ? (
                        <>
                          <p
                            className="py-2 pe-2 mb-0"
                            style={{ fontSize: "12px",color:"#8796A1" }}
                          >
                            Recent searches
                          </p>
                        </>
                      ) : (
                        <> </>
                      )}
                      <div
                        className="text-center  text-dark p-2 me-2"
                        style={{ fontSize: "12px", cursor: "pointer" ,backgroundColor:"#FAF9FF"}}
                        onClick={() => searchValue(index)}
                      >
                        <span>{item.routes[0].origin}</span>
                        <span className="mx-1">-</span>
                        <span>
                          {item.routes[0].destination}{" "}
                          <span className="me-1">({item.journeyType})</span>
                        </span>
                        <span className="">
                          (
                          {moment(item.routes[0].departureDate).format(
                            "yyyy-MM-DD"
                          )}
                          )
                          {item.routes[1] !== undefined ? (
                            <>
                              -(
                              {moment(item.routes[1].departureDate).format(
                                "yyyy-MM-DD"
                              )}
                              ){" "}
                            </>
                          ) : (
                            <></>
                          )}
                        </span>
                      </div>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SearchFrom;
