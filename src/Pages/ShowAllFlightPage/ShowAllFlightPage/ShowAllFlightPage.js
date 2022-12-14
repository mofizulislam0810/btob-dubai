import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../SharePages/Footer/Footer";
import Navbar from "../../SharePages/Navbar/Navbar";
import SideNavBar from "../../SharePages/SideNavBar/SideNavBar";
import ShowAllFlight from "../ShowAllFlight/ShowAllFlight";
import airports from "../../../JSON/airports.json";
import axios from "axios";
import { environment } from "../../SharePages/Utility/environment";
import NoDataFoundPage from "../../NoDataFoundPage/NoDataFoundPage/NoDataFoundPage";
import "../../../plugins/t-datepicker/t-datepicker.min";
import $ from "jquery";
import Fuse from "fuse.js";
import Loading from "../../Loading/Loading";
import flightoneway from "../../../JSON/flightoneway.json";
import roundtrip from "../../../JSON/roundtrip.json";
import flightmulticity from "../../../JSON/flightmulticity.json";
import currentYear from "../../SharePages/Utility/currentYear";
import ReactTooltip from "react-tooltip";
let cIndex = 1;
const ShowAllFlightPage = () => {
  window.scrollTo(0, 0);
  const { state } = useLocation();
  const {
    origin,
    destination,
    origin1,
    destination1,
    origin2,
    destination2,
    origin3,
    destination3,
    origin4,
    destination4,
    origin5,
    destination5,
    journeyDate,
    returnDate,
    inputDateMulti1,
    inputDateMulti2,
    inputDateMulti3,
    inputDateMulti4,
    inputDateMulti5,
    travelClass,
    qtyList,
    tripTypeModify,
    airlines,
    childAgeList,
  } = state;
  // let { formCount } = state;
  console.log(String(airlines), childAgeList);
  const [tripType, setTripType] = useState(tripTypeModify); //"One Way"
  const [travelClassType, setTravelClassType] = useState(travelClass); //:"Economy"
  const [adultCount, setAdultCount] = useState(qtyList.Adult); //1
  const [childCount, setChildCount] = useState(qtyList.Children); //0
  let [infantCount, setInfantCount] = useState(qtyList.Infant); //0
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
  const [originRefValue, setoriginRefValue] = useState(origin);
  const [destinationRefValue, setdestinationRefValue] = useState(destination);
  const [originRefValue1, setoriginRefValue1] = useState(origin1);
  const [destinationRefValue1, setdestinationRefValue1] =
    useState(destination1);
  const [originRefValue2, setoriginRefValue2] = useState(origin2);
  const [destinationRefValue2, setdestinationRefValue2] =
    useState(destination2);
  const [originRefValue3, setoriginRefValue3] = useState(origin3);
  const [destinationRefValue3, setdestinationRefValue3] =
    useState(destination3);
  const [originRefValue4, setoriginRefValue4] = useState(origin4);
  const [destinationRefValue4, setdestinationRefValue4] =
    useState(destination4);
  const [originRefValue5, setoriginRefValue5] = useState(origin5);
  const [destinationRefValue5, setdestinationRefValue5] =
    useState(destination5);
  // const originRefValue1 = origin1;
  // const destinationRefValue1 = destination1;
  // const originRefValue2 = origin2;
  // const destinationRefValue2 = destination2;
  // const originRefValue3 = origin3;
  // const destinationRefValue3 = destination3;
  // const originRefValue4 = origin4;
  // const destinationRefValue4 = destination4;
  // const originRefValue5 = origin5;
  // const destinationRefValue5 = destination5;

  // console.log(originRefValue2);
  // loadCount=formCount;
  // alert(cIndex + "CIndex");

  //   if(tripType==="One Way" || tripType==="Round Trip"){
  //     cIndex=0;
  //   }else if(tripType ==="Multi City"){
  //     cIndex=1;
  // }

  if (originRefValue2 && document.getElementById("multiCity2")) {
    // alert(cIndex+"o2");
    document.getElementById("multiCity2").style.display = "";
    document.getElementById("btnm-1").style.display = "";
    if (cIndex < 2) {
      cIndex = 2;
    }
  }

  if (originRefValue3 && document.getElementById("multiCity3")) {
    // alert(cIndex+"o3");
    document.getElementById("multiCity3").style.display = "";
    document.getElementById("btnm-1").style.display = "";
    if (cIndex < 3) {
      cIndex = 3;
    }
  }
  if (originRefValue4 && document.getElementById("multiCity4")) {
    // alert(cIndex+"o4");
    document.getElementById("multiCity4").style.display = "";
    document.getElementById("btnm-1").style.display = "";
    if (cIndex < 4) {
      cIndex = 4;
    }
  }
  if (originRefValue5 && document.getElementById("multiCity5")) {
    // alert(cIndex+"o5");
    document.getElementById("multiCity5").style.display = "";
    document.getElementById("btnm-1").style.display = "";
    if (cIndex < 5) {
      cIndex = 5;
    }
  }

  const handleFlightOptionP = () => {
    // alert(cIndex);
    if (cIndex < 5) {
      cIndex += 1;
      if (cIndex >= 2) {
        document.getElementById("btnm-1").style.display = "";
      }
      // alert(cIndex+"Plus")
      document.getElementById("multiCity" + cIndex).style.display = "";
      document
        .getElementById("txtFrom" + cIndex)
        .setAttribute("required", "required");
      document
        .getElementById("txtTo" + cIndex)
        .setAttribute("required", "required");
    }
    // alert("p" + cIndex);
  };
  const handleFlightOptionM = () => {
    cIndex -= 1;

    if (cIndex < 2) {
      document.getElementById("btnm-1").style.display = "none";
    }
    document.getElementById("multiCity" + (cIndex + 1)).style.display = "none";
    document
      .getElementById("txtFrom" + (cIndex + 1))
      .removeAttribute("required");
    document.getElementById("txtTo" + (cIndex + 1)).removeAttribute("required");
    // alert(cIndex + "minus");
    if (cIndex === 1) {
      // alert("2" + cIndex);
      originRef2.current.value = "";
      destinationRef2.current.value = "";
      $(".class_2").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 2) {
      // alert("3" + cIndex);
      originRef3.current.value = "";
      destinationRef3.current.value = "";
      $(".class_3").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 3) {
      // alert("4" + cIndex);
      originRef4.current.value = "";
      destinationRef4.current.value = "";
      $(".class_4").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 4) {
      // alert("5" + cIndex);
      originRef5.current.value = "";
      destinationRef5.current.value = "";
      $(".class_5").tDatePicker({
        autoClose: true,
      });
    }
  };

  useEffect(() => {
    $("#txtFrom").val(originRefValue);
    $("#txtTo").val(destinationRefValue);
    $("#txtFrom1").val(originRefValue1);
    $("#txtTo1").val(destinationRefValue1);
    $("#txtFrom1").val(originRefValue1);
    $("#txtTo1").val(destinationRefValue1);
    $("#txtFrom2").val(originRefValue2);
    $("#txtTo2").val(destinationRefValue2);
    $("#txtFrom3").val(originRefValue3);
    $("#txtTo3").val(destinationRefValue3);
    $("#txtFrom4").val(originRefValue4);
    $("#txtTo4").val(destinationRefValue4);
    $("#txtFrom5").val(originRefValue5);
    $("#txtTo5").val(destinationRefValue5);
    $(document).ready(function () {
      $(".class_0").tDatePicker({
        autoClose: true,
        dateCheckIn: journeyDate,
        dateCheckOut: returnDate,
      });
      $(".class_1").tDatePicker({
        autoClose: true,
        dateCheckIn: inputDateMulti1,
      });
      $(".class_2").tDatePicker({
        autoClose: true,
        dateCheckIn: inputDateMulti2,
      });
      $(".class_3").tDatePicker({
        autoClose: true,
        dateCheckIn: inputDateMulti3,
      });
      $(".class_4").tDatePicker({
        autoClose: true,
        dateCheckIn: inputDateMulti4,
      });
      $(".class_5").tDatePicker({
        autoClose: true,
        dateCheckIn: inputDateMulti5,
      });
    });
  }, []);

  const searchData = JSON.parse(localStorage.getItem("Database"));
  const originCode = airports
    .filter(
      (f) => f.city + " - " + f.country + ", " + f.name === searchData.origin
    )
    .map((item) => item.iata);
  const destinationCode = airports
    .filter(
      (f) =>
        f.city + " - " + f.country + ", " + f.name === searchData.destination
    )
    .map((item) => item.iata);
  const originCode1 = airports
    .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.origin1)
    .map((item) => item.iata);
  const destinationCode1 = airports
    .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.destination1)
    .map((item) => item.iata);
  const originCode2 = airports
    .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.origin2)
    .map((item) => item.iata);
  const destinationCode2 = airports
    .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.destination2)
    .map((item) => item.iata);
  const originCode3 = airports
    .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.origin3)
    .map((item) => item.iata);
  const destinationCode3 = airports
    .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.destination3)
    .map((item) => item.iata);
  const originCode4 = airports
    .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.origin4)
    .map((item) => item.iata);
  const destinationCode4 = airports
    .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.destination4)
    .map((item) => item.iata);
  const originCode5 = airports
    .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.origin5)
    .map((item) => item.iata);
  const destinationCode5 = airports
    .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.destination5)
    .map((item) => item.iata);

  let searchParamOnedWay = {
    routes: [
      {
        origin: originCode[0],
        destination: destinationCode[0],
        departureDate: journeyDate,
      },
    ],
    adults: qtyList.Adult,
    childs: qtyList.Children,
    infants: qtyList.Infant,
    cabinClass: 1,
    preferredCarriers: airlines !== undefined ? airlines.split(",") : [],
    prohibitedCarriers: [],
    childrenAges: [],
  };

  childAgeList.map((item) =>
    searchParamOnedWay.childrenAges.push(parseInt(item.age))
  );

  // console.log(searchParamOnedWay);

  let searchParamRoundWay = {
    routes: [
      {
        origin: originCode[0],
        destination: destinationCode[0],
        departureDate: journeyDate,
      },
      {
        origin: destinationCode[0],
        destination: originCode[0],
        departureDate: returnDate,
      },
    ],
    adults: qtyList.Adult,
    childs: qtyList.Children,
    infants: qtyList.Infant,
    cabinClass: 1,
    preferredCarriers: [],
    prohibitedCarriers: [],
    childrenAges: [],
  };
  // console.log(searchParamRoundWay);

  let searchParamMulti = {
    routes: [
      {
        origin: originCode[0],
        destination: destinationCode[0],
        departureDate: journeyDate,
      },
      {
        origin: originCode1[0],
        destination: destinationCode1[0],
        departureDate: inputDateMulti1,
      },
    ],
    adults: qtyList.Adult,
    childs: qtyList.Children,
    infants: qtyList.Infant,
    isOpenCombination: false,
    cabinClass: 1,
    preferredCarriers: [],
    prohibitedCarriers: [],
    taxRedemptions: [],
    childrenAges: [],
  };
  if (originCode2[0] !== undefined) {
    let mc2 = {
      origin: originCode2[0],
      destination: destinationCode2[0],
      departureDate: inputDateMulti2,
    };
    searchParamMulti.routes.push(mc2);
  }
  if (originCode3[0] !== undefined) {
    let mc2 = {
      origin: originCode3[0],
      destination: destinationCode3[0],
      departureDate: inputDateMulti3,
    };
    searchParamMulti.routes.push(mc2);
  }
  if (originCode4[0] !== undefined) {
    let mc2 = {
      origin: originCode4[0],
      destination: destinationCode4[0],
      departureDate: inputDateMulti4,
    };
    searchParamMulti.routes.push(mc2);
  }
  if (originCode5[0] !== undefined) {
    let mc2 = {
      origin: originCode5[0],
      destination: destinationCode5[0],
      departureDate: inputDateMulti5,
    };
    searchParamMulti.routes.push(mc2);
  }
  console.log(searchParamMulti);

  const [fetchFlighData, setFetchFlighData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tripTypeModify === "One Way") {
      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamOnedWay, environment.headerToken
        );
        console.log(response.data.item1);
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(flightoneway.item1);
        setLoading(false);
      };
      getData();
    } else if (tripTypeModify === "Round Trip") {
      setLoading(true);
      const getData = async () => {
        // await axios.post(
        //   environment.searchFlight,
        //   searchParamRoundWay
        // ).then((response)=>{
        //     // setFetchFlighData(await response.data.item1);
        //     setFetchFlighData(roundtrip.item1);
        //     setLoading(false);
        // });
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamRoundWay, environment.headerToken
        );
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(flightoneway.item1);
        setLoading(false);
      };
      getData();
    } else {
      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamMulti
        );
        console.log(response);
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(flightmulticity.item1);
        setLoading(false);
      };
      getData();
    }
  }, []);
  console.log(fetchFlighData)
  useEffect(() => {
    $(".slide-toggle").hide();
    $(".search-again").click(function () {
      $(".slide-toggle").toggle("slow");
    });
    $("#search-flight").click(function () {
      $(".slide-toggle").hide("slow");
    });
  }, []);

  useEffect(() => {
    // $(".slide-toggle").hide();
    // $(".search-again").click(function () {
    //   $(".slide-toggle").toggle("slow");
    // });
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
          name: "name",
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
  // alert(cIndex + "outside");

  const handleTripType = (name) => {
    setTripType(name);
    if (name === "One Way" || name === "Round Trip") {
      cIndex = 0;
    } else if (name === "Multi City") {
      cIndex = 1;
    }
  };
  console.log(tripType);
  const handleSearchFlight = (e) => {
    console.log(tripType);
    if (String(tripType) === "Multi City") {
      // document.getElementById("multiCity" + (cIndex + 1)).style.display = "none";
      const origin =
        originRef.current.value === undefined
          ? originRefValue
          : originRef.current.value;
      const destination =
        destinationRef.current.value === undefined
          ? destinationRefValue
          : destinationRef.current.value;

      const origin1 =
        originRef1.current.value === undefined
          ? originRefValue1
          : originRef1.current.value;
      const destination1 =
        destinationRef1?.current.value === undefined
          ? destinationRefValue1
          : destinationRef1?.current.value;

      const origin2 =
        originRef2.current.value === undefined
          ? originRefValue2
          : originRef2.current.value;
      const destination2 =
        destinationRef2.current.value === undefined
          ? destinationRefValue2
          : destinationRef2.current.value;

      const origin3 =
        originRef3.current.value === undefined
          ? originRefValue3
          : originRef3.current.value;
      const destination3 =
        destinationRef3.current.value === undefined
          ? destinationRefValue3
          : destinationRef3.current.value;

      const origin4 =
        originRef4.current.value === undefined
          ? originRefValue4
          : originRef4.current.value;
      const destination4 =
        destinationRef4.current.value === undefined
          ? destinationRefValue4
          : destinationRef4.current.value;

      const origin5 =
        originRef5.current.value === undefined
          ? originRefValue5
          : originRef5.current.value;
      const destination5 =
        destinationRef5.current.value === undefined
          ? destinationRefValue5
          : destinationRef5.current.value;

      if (origin === "") {
        setoriginRefValue("");
        setdestinationRefValue("");
      }
      if (origin1 === "") {
        setoriginRefValue1("");
        setdestinationRefValue1("");
      }
      if (origin2 === "") {
        setoriginRefValue2("");
        setdestinationRefValue2("");
      }
      if (origin3 === "") {
        setoriginRefValue3("");
        setdestinationRefValue3("");
      }
      if (origin4 === "") {
        setoriginRefValue4("");
        setdestinationRefValue4("");
      }
      if (origin5 === "") {
        setoriginRefValue5("");
        setdestinationRefValue5("");
      }
      const journeyDate = $("#departureDate").children("input").val();
      const inputDateMulti1 = $("#departureDate1").children("input").val();
      const inputDateMulti2 = $("#departureDate2").children("input").val();
      const inputDateMulti3 = $("#departureDate3").children("input").val();
      const inputDateMulti4 = $("#departureDate4").children("input").val();
      const inputDateMulti5 = $("#departureDate5").children("input").val();
      const qtyList = {
        Adult: adultCount,
        Children: childCount,
        Infant: infantCount,
      };
      const originCode = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin)
        .map((item) => item.iata);
      const destinationCode = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination
        )
        .map((item) => item.iata);
      const originCode1 = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin1)
        .map((item) => item.iata);
      const destinationCode1 = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination1
        )
        .map((item) => item.iata);
      const originCode2 = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin2)
        .map((item) => item.iata);
      const destinationCode2 = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination2
        )
        .map((item) => item.iata);
      const originCode3 = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin3)
        .map((item) => item.iata);
      const destinationCode3 = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination3
        )
        .map((item) => item.iata);
      const originCode4 = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin4)
        .map((item) => item.iata);
      const destinationCode4 = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination4
        )
        .map((item) => item.iata);
      const originCode5 = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin5)
        .map((item) => item.iata);
      const destinationCode5 = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination5
        )
        .map((item) => item.iata);
      let searchParamMulti = {
        routes: [
          {
            origin: originCode[0],
            destination: destinationCode[0],
            departureDate: journeyDate,
          },
          {
            origin: originCode1[0],
            destination: destinationCode1[0],
            departureDate: inputDateMulti1,
          },
        ],
        adults: qtyList.Adult,
        childs: qtyList.Children,
        infants: qtyList.Infant,
        isOpenCombination: false,
        cabinClass: 1,
        preferredCarriers: [],
        prohibitedCarriers: [],
        taxRedemptions: [],
        childrenAges: [],
      };
      if (originCode2[0] !== undefined) {
        let mc2 = {
          origin: originCode2[0],
          destination: destinationCode2[0],
          departureDate: inputDateMulti2,
        };
        searchParamMulti.routes.push(mc2);
      }
      if (originCode3[0] !== undefined) {
        let mc2 = {
          origin: originCode3[0],
          destination: destinationCode3[0],
          departureDate: inputDateMulti3,
        };
        searchParamMulti.routes.push(mc2);
      }
      if (originCode4[0] !== undefined) {
        let mc2 = {
          origin: originCode4[0],
          destination: destinationCode4[0],
          departureDate: inputDateMulti4,
        };
        searchParamMulti.routes.push(mc2);
      }
      if (originCode5[0] !== undefined) {
        let mc2 = {
          origin: originCode5[0],
          destination: destinationCode5[0],
          departureDate: inputDateMulti5,
        };
        searchParamMulti.routes.push(mc2);
      }
      // document.getElementById("multiCity" + (cIndex + 1)).style.display =
      //   "none";

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

      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamMulti, environment.headerToken
        );
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(flightmulticity.item1);
        // alert(response.data.item2[1].message);
        setLoading(false);
      };
      console.log(searchParamMulti);
      console.log(origin, origin1, origin2, origin3, origin4, origin5);
      getData();
    } else if (String(tripType) === "Round Trip") {
      const origin =
        originRef.current.value === undefined
          ? originRefValue
          : originRef.current.value;
      const destination =
        destinationRef.current.value === undefined
          ? destinationRefValue
          : destinationRef.current.value;
      const journeyDate = $("#departureDate").children("input").val();
      const returnDate = $("#returnDate").children("input").val();
      const qtyList = {
        Adult: adultCount,
        Children: childCount,
        Infant: infantCount,
      };
      const originCode = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin)
        .map((item) => item.iata);
      const destinationCode = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination
        )
        .map((item) => item.iata);

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

      let searchParamRoundWay = {
        routes: [
          {
            origin: originCode[0],
            destination: destinationCode[0],
            departureDate: journeyDate,
          },
          {
            origin: destinationCode[0],
            destination: originCode[0],
            departureDate: returnDate,
          },
        ],
        adults: qtyList.Adult,
        childs: qtyList.Children,
        infants: qtyList.Infant,
        isOpenCombination: false,
        cabinClass: 1,
        preferredCarriers: [],
        prohibitedCarriers: [],
        taxRedemptions: [],
        childrenAges: [],
      };

      console.log(searchParamRoundWay);
      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamRoundWay, environment.headerToken
        );
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(roundtrip.item1);
        setLoading(false);
        // alert(response.data.item2[1].message);
      };
      getData();
    } else if (String(tripType) === "One Way") {
      const origin =
        originRef.current.value === ""
          ? originRefValue
          : originRef.current.value;
      const destination =
        destinationRef.current.value === ""
          ? destinationRefValue
          : destinationRef.current.value;
      const journeyDate = $("#departureDate").children("input").val();
      const qtyList = {
        Adult: adultCount,
        Children: childCount,
        Infant: infantCount,
      };
      const originCode = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin)
        .map((item) => item.iata);
      const destinationCode = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination
        )
        .map((item) => item.iata);

      const searchData = {
        origin: origin,
        destination: destination,
        journeyDate: journeyDate,
        returnDate: "null",
        tripTypeModify: tripType,
        qtyList: qtyList,
        travelClass: travelClassType,
      };

      localStorage.setItem("Database", JSON.stringify(searchData));

      let searchParamOnedWay = {
        routes: [
          {
            origin: originCode[0],
            destination: destinationCode[0],
            departureDate: journeyDate,
          },
        ],
        adults: qtyList.Adult,
        childs: qtyList.Children,
        infants: qtyList.Infant,
        isOpenCombination: false,
        cabinClass: 1,
        preferredCarriers: [],
        prohibitedCarriers: [],
        taxRedemptions: [],
        childrenAges: [],
      };

      console.log(searchParamOnedWay);

      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamOnedWay, environment.headerToken
        );
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(flightoneway.item1);
        setLoading(false);
        // alert(response.data.item2[1].message);
      };
      console.log(flightoneway);
      getData();
    }
    e.preventDefault();
  };

  const [childAge, setChildAge] = useState([]);
  const addNewChild = (child) => {
    setChildCount(child + 1);
    setChildAge([...childAge, { age: "" }]);
    // if(childAge.length < 9){
    // }
  };

  const clickOnDelete = (child) => {
    setChildCount(child - 1);
    const lastIndex = childAge.length - 1;
    // this.setState({ items: items.filter((item, index) => index !== lastIndex) });
    setChildAge(childAge.filter((r, index) => index !== lastIndex));
  };

  console.log(searchData.origin2);

  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper">
        <section className="content-header"></section>
        <section className="content">
          <div className="container box-shadow content-width">
            <div className="row border" >
              <div className="col-lg-7 py-3 ps-5 my-auto border-right bg-white">
                <span className="p-2 border">
                  <span className="fw-bold" style={{ fontSize: "14px" }}>
                    <span className="me-2">
                      <i className="fas fa-plane-departure"></i>
                    </span>{" "}
                    <span data-tip={searchData.origin.split(",")[1] + "<br>" + searchData.journeyDate}>
                      {originCode[0]}
                    </span>
                    <ReactTooltip effect="solid" html={true}></ReactTooltip>
                  </span>
                  <span className="px-1">|</span>
                  <span className="fw-bold" style={{ fontSize: "14px" }}>
                    <span className="me-2">
                      <i className="fas fa-plane-arrival"></i>
                    </span>
                    {
                      searchData.returnDate === "null" ? <span data-tip={searchData.destination.split(",")[1]}>
                        {destinationCode[0]}
                      </span> : <span data-tip={searchData.destination.split(",")[1] + "<br>" + searchData.returnDate}>
                        {destinationCode[0]}
                      </span>
                    }

                    <ReactTooltip effect="solid" html={true}></ReactTooltip>
                  </span>
                </span>
                {searchData.origin1 !== '' && searchData.origin1 !== undefined ? (
                  <>
                    <span className="p-2 border ms-1">
                      <span className="fw-bold" style={{ fontSize: "14px" }}>
                        <span className="me-2">
                          <i className="fas fa-plane-departure"></i>
                        </span>{" "}
                        <span data-tip={searchData.origin1.split(",")[1] + "<br>" + searchData.inputDateMulti1}>
                          {originCode1[0]}
                        </span>
                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </span>
                      <span className="px-1">|</span>
                      <span className="fw-bold" style={{ fontSize: "14px" }}>
                        <span className="me-2">
                          <i className="fas fa-plane-arrival"></i>
                        </span>

                        <span data-tip={searchData.destination1.split(",")[1]}>
                          {destinationCode1[0]}
                        </span>


                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </span>
                    </span>
                  </>
                ) : (
                  <></>
                )}
                {searchData.origin2 !== '' && searchData.origin2 !== undefined ? (
                  <>
                    <span className="p-2 border ms-1">
                      <span className="fw-bold" style={{ fontSize: "14px" }}>
                        <span className="me-2">
                          <i className="fas fa-plane-departure"></i>
                        </span>{" "}
                        <span data-tip={searchData.origin2.split(",")[1] + "<br>" + searchData.inputDateMulti2}>
                          {originCode2[0]}
                        </span>
                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </span>
                      <span className="px-1">|</span>
                      <span className="fw-bold" style={{ fontSize: "14px" }}>
                        <span className="me-2">
                          <i className="fas fa-plane-arrival"></i>
                        </span>

                        <span data-tip={searchData.destination2.split(",")[1]}>
                          {destinationCode2[0]}
                        </span>
                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </span>
                    </span>
                  </>
                ) : (
                  <></>
                )}

                {searchData.origin3 !== '' && searchData.origin3 !== undefined ? (
                  <>
                    <span className="p-2 border ms-1">
                      <span className="fw-bold" style={{ fontSize: "14px" }}>
                        <span className="me-2">
                          <i className="fas fa-plane-departure"></i>
                        </span>{" "}
                        <span data-tip={searchData.origin3.split(",")[1] + "<br>" + searchData.inputDateMulti3}>
                          {originCode3[0]}
                        </span>
                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </span>
                      <span className="px-1">|</span>
                      <span className="fw-bold" style={{ fontSize: "14px" }}>
                        <span className="me-2">
                          <i className="fas fa-plane-arrival"></i>
                        </span>

                        <span data-tip={searchData.destination3.split(",")[1]}>
                          {destinationCode3[0]}
                        </span>
                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </span>
                    </span>
                  </>
                ) : (
                  <></>
                )}

                {searchData.origin4 !== '' && searchData.origin4 !== undefined ? (
                  <>
                    <span className="p-2 border ms-1">
                      <span className="fw-bold" style={{ fontSize: "14px" }}>
                        <span className="me-2">
                          <i className="fas fa-plane-departure"></i>
                        </span>{" "}
                        <span data-tip={searchData.origin4.split(",")[1] + "<br>" + searchData.inputDateMulti4}>
                          {originCode4[0]}
                        </span>
                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </span>
                      <span className="px-1">|</span>
                      <span className="fw-bold" style={{ fontSize: "14px" }}>
                        <span className="me-2">
                          <i className="fas fa-plane-arrival"></i>
                        </span>

                        <span data-tip={searchData.destination4.split(",")[1]}>
                          {destinationCode4[0]}
                        </span>
                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </span>
                    </span>
                  </>
                ) : (
                  <></>
                )}

                {searchData.origin5 !== '' && searchData.origin5 !== undefined ? (
                  <>
                    <span className="p-2 border">
                      <span className="fw-bold" style={{ fontSize: "14px" }}>
                        <span className="me-2">
                          <i className="fas fa-plane-departure"></i>
                        </span>{" "}
                        <span data-tip={searchData.origin5.split(",")[1] + "<br>" + searchData.inputDateMulti5}>
                          {originCode5[0]}
                        </span>
                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </span>
                      <span className="px-1">|</span>
                      <span className="fw-bold" style={{ fontSize: "14px" }}>
                        <span className="me-2">
                          <i className="fas fa-plane-arrival"></i>
                        </span>

                        <span data-tip={searchData.destination5.split(",")[1]}>
                          {destinationCode5[0]}
                        </span>
                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </span>
                    </span>
                  </>
                ) : (
                  <></>
                )}


              </div>
              <div className="col-lg-3 py-3 my-auto border-right bg-white">
                <span className="fw-bold mx-1 border p-2" style={{ fontSize: "14px" }}>
                  {travelClass}
                </span>
                {/* <span className="fw-bold mx-1" style={{ fontSize: "14px" }}>
                  | Depart : {searchData.journeyDate}{" "}
                  {searchData.returnDate === "null"
                    ? " "
                    : " | Return: " + searchData.returnDate}
                </span> */}
                <span
                  className="fw-bold border p-2 mx-1"
                  style={{ fontSize: "14px" }}
                >
                  {searchData.qtyList.Adult > 0
                    ? " ADT: " + searchData.qtyList.Adult
                    : " "}{" "}
                  {searchData.qtyList.Children > 0
                    ? "CHD: " + searchData.qtyList.Children
                    : " "}{" "}
                  {searchData.qtyList.Infant > 0
                    ? "INF: " + searchData.qtyList.Infant
                    : " "}
                </span>
              </div>
              <div className="col-lg-2 my-auto d-flex justify-content-center bg-white">
                <button className="btn button-color btn-sm text-white float-start fw-bold search-again rounded-3">
                  Modify search
                </button>
              </div>
            </div>
            <div className="slide-toggle mb-3">
              <div className="container mt-4 pt-1">
                <div className="row">
                  <div style={{ marginBottom: "30px" }}>
                    <div>
                      <form onSubmit={handleSearchFlight}>
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-lg-12 col-sm-12 col-md-12 banner-text shadow-for-search">
                              <div id="form-bg">
                                <div className="row">
                                  <div
                                    className="col-lg-4 pb-4 text-center"
                                    style={{ paddingTop: "3%" }}
                                  >
                                    <div className="flex-container">
                                      <div className="left-border">
                                        <button
                                          className="form-select border-0 inputgroup rounded-start"
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
                                            onClick={() =>
                                              handleTripType("One Way")
                                            }
                                          >
                                            One Way
                                          </li>
                                          <li
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleTripType("Round Trip")
                                            }
                                          >
                                            Round Trip
                                          </li>
                                          <li
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleTripType("Multi City")
                                            }
                                          >
                                            Multi City
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="left-border">
                                        <button
                                          className="form-select border-0 inputgroup"
                                          type="button"
                                          id="dropdownMenuButton"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <span id="valClass">
                                            {travelClassType}
                                          </span>
                                        </button>
                                        <ul
                                          id="classList"
                                          className="dropdown-menu"
                                          aria-labelledby="dropdownMenuButton"
                                        >
                                          <li
                                            className="dropdown-item dropdown-item-selected"
                                            onClick={() =>
                                              setTravelClassType("Economy")
                                            }
                                          >
                                            Economy
                                          </li>
                                          <li
                                            className="dropdown-item"
                                            onClick={() =>
                                              setTravelClassType("Business")
                                            }
                                          >
                                            Business
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="d-flex w100 align-self-center passenger">
                                        <div className="d-flex ageselectpadnotx align-items-center inputgroup">
                                          <div style={{ position: "relative" }}>
                                            <button
                                              className="form-select border-0 inputgroup rounded-end"
                                              type="button"
                                              id="dropdownMenuButtonpassenger"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              data-bs-auto-close="outside"
                                              style={{ height: "36px" }}
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
                                                <span
                                                  className="px-1"
                                                  id="valPerson"
                                                >
                                                  {adultCount +
                                                    childCount +
                                                    infantCount}
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
                                                  <div
                                                    style={{ fontSize: "18px" }}
                                                  >
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
                                                          adultCount ===
                                                          infantCount
                                                          ? () => {
                                                            setAdultCount(
                                                              adultCount - 1
                                                            );
                                                            setInfantCount(
                                                              infantCount - 1
                                                            );
                                                          }
                                                          : () =>
                                                            setAdultCount(
                                                              adultCount - 1
                                                            )
                                                      }
                                                      disabled={
                                                        adultCount === 1
                                                          ? true
                                                          : false
                                                      }
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
                                                        setAdultCount(
                                                          adultCount + 1
                                                        )
                                                      }
                                                      disabled={
                                                        totalPassenger === 9
                                                          ? true
                                                          : false
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
                                                    <div
                                                      style={{
                                                        fontSize: "18px",
                                                      }}
                                                    >
                                                      <i
                                                        className="fas fa-child align-self-center d-none"
                                                        style={{
                                                          color: "#222",
                                                        }}
                                                        aria-hidden="true"
                                                      ></i>
                                                      Children
                                                    </div>
                                                    <div className="adult">
                                                      Aged 2-12
                                                    </div>
                                                  </div>
                                                  <div className="number-input text-center">
                                                    <button
                                                      className="round-btn"
                                                      title="adultminus"
                                                      onClick={
                                                        () =>
                                                          clickOnDelete(
                                                            childCount
                                                          )
                                                        // setChildCount(
                                                        //   childCount - 1
                                                        // )
                                                      }
                                                      disabled={
                                                        childCount === 0
                                                          ? true
                                                          : false
                                                      }
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
                                                        () =>
                                                          addNewChild(
                                                            childCount
                                                          )
                                                        // setChildCount(
                                                        //   childCount + 1
                                                        // )
                                                      }
                                                      disabled={
                                                        totalPassenger === 9
                                                          ? true
                                                          : false
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
                                                    <div
                                                      style={{
                                                        fontSize: "18px",
                                                      }}
                                                    >
                                                      <i
                                                        className="fas fa-baby align-self-center d-none"
                                                        style={{
                                                          color: "#222",
                                                        }}
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
                                                        setInfantCount(
                                                          infantCount - 1
                                                        )
                                                      }
                                                      disabled={
                                                        infantCount === 0
                                                          ? true
                                                          : false
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
                                                            setInfantCount(
                                                              infantCount + 1
                                                            )
                                                          : () => { }
                                                      }
                                                      disabled={
                                                        infantCount === 9
                                                          ? true
                                                          : false
                                                      }
                                                    >
                                                      <span className="text-white">
                                                        <i className="fas fa-plus"></i>
                                                      </span>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                              <div style={{ textAlign: "end" }}>
                                                {/* <button
                                                  data-toggle="dropdown"
                                                  id="btnDone"
                                                  className="done-btn"
                                                >
                                                  Done
                                                </button> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 d-flex">
                                    {childAge.map((val, index) => {
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
                                            className="form-control me-1"
                                            style={{ width: "60px" }}
                                            min="2"
                                            max="12"
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
                                      // required
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>

                                <div className="row pt-1">
                                  <div className="col-lg-4">
                                    <label
                                      htmlFor="formGroupExampleInput"
                                      className="form-label text-white"
                                    >
                                      Depart From{" "}
                                      <span className="text-white fw-bold">
                                        *
                                      </span>
                                    </label>

                                    <input
                                      type="text"
                                      className="form-control input-field autocomplete rounded-3"
                                      ref={originRef}
                                      placeholder="From"
                                      required
                                      autoComplete="off"
                                      id="txtFrom"
                                    />
                                  </div>
                                  <div className="col-lg-4">
                                    <label
                                      htmlFor="formGroupExampleInput"
                                      className="form-label text-white"
                                    >
                                      Going To{" "}
                                      <span className="text-white fw-bold">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control input-field autocomplete rounded-3"
                                      ref={destinationRef}
                                      placeholder="To"
                                      required
                                      id="txtTo"
                                      autoComplete="off"
                                    />
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="row">
                                      <div className="col-lg-6">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Departing{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>
                                      </div>
                                      <div
                                        className="col-lg-6"
                                        id="returnLavel"
                                      >
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Returning{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="t-datepicker class_0 bg-light rounded-3">
                                      <div
                                        className="t-check-in"
                                        id="departureDate"
                                        style={{
                                          minHeight: "100%",
                                          borderRight: "1px solid gray",
                                        }}
                                      ></div>
                                      <div
                                        className="t-check-out"
                                        id="returnDate"
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                                {tripType === "Multi City" ? (
                                  <>
                                    <div className="row pt-1" id="multiCity1">
                                      <div className="col-lg-4">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Depart From{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>

                                        <input
                                          type="text"
                                          className="form-control input-field autocomplete rounded-3"
                                          ref={originRef1}
                                          placeholder="From"
                                          autoComplete="off"
                                          id="txtFrom1"
                                          required
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Going To{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-field autocomplete rounded-3"
                                          ref={destinationRef1}
                                          placeholder="To"
                                          id="txtTo1"
                                          autoComplete="off"
                                          required
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <label
                                              htmlFor="formGroupExampleInput"
                                              className="form-label text-white"
                                            >
                                              Departing{" "}
                                              <span className="text-white fw-bold">
                                                *
                                              </span>
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
                                      className="row pt-1"
                                      id="multiCity2"
                                      style={{ display: "none" }}
                                    >
                                      <div className="col-lg-4">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Depart From{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>

                                        <input
                                          type="text"
                                          className="form-control input-field autocomplete rounded-3"
                                          ref={originRef2}
                                          placeholder="From"
                                          autoComplete="off"
                                          id="txtFrom2"
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Going To{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-field autocomplete rounded-3"
                                          ref={destinationRef2}
                                          placeholder="To"
                                          id="txtTo2"
                                          autoComplete="off"
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <label
                                              htmlFor="formGroupExampleInput"
                                              className="form-label text-white"
                                            >
                                              Departing{" "}
                                              <span className="text-white fw-bold">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                        <div className="t-datepicker class_2 bg-light rounded-3">
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
                                      className="row pt-1"
                                      id="multiCity3"
                                      style={{ display: "none" }}
                                    >
                                      <div className="col-lg-4">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Depart From{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>

                                        <input
                                          type="text"
                                          className="form-control input-field autocomplete rounded-3"
                                          ref={originRef3}
                                          placeholder="From"
                                          autoComplete="off"
                                          id="txtFrom3"
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Going To{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-field autocomplete rounded-3"
                                          ref={destinationRef3}
                                          placeholder="To"
                                          id="txtTo3"
                                          autoComplete="off"
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <label
                                              htmlFor="formGroupExampleInput"
                                              className="form-label text-white"
                                            >
                                              Departing{" "}
                                              <span className="text-white fw-bold">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                        <div className="t-datepicker class_3 bg-light rounded-3">
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
                                      className="row pt-1"
                                      id="multiCity4"
                                      style={{ display: "none" }}
                                    >
                                      <div className="col-lg-4">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Depart From{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>

                                        <input
                                          type="text"
                                          className="form-control input-field autocomplete rounded-3"
                                          ref={originRef4}
                                          placeholder="From"
                                          autoComplete="off"
                                          id="txtFrom4"
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Going To{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-field autocomplete rounded-3"
                                          ref={destinationRef4}
                                          placeholder="To"
                                          id="txtTo4"
                                          autoComplete="off"
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <label
                                              htmlFor="formGroupExampleInput"
                                              className="form-label text-white"
                                            >
                                              Departing{" "}
                                              <span className="text-white fw-bold">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                        <div className="t-datepicker class_4 bg-light rounded-3">
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
                                      className="row pt-1"
                                      id="multiCity5"
                                      style={{ display: "none" }}
                                    >
                                      <div className="col-lg-4">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Depart From{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>

                                        <input
                                          type="text"
                                          className="form-control input-field autocomplete rounded-3"
                                          ref={originRef5}
                                          placeholder="From"
                                          autoComplete="off"
                                          id="txtFrom5"
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <label
                                          htmlFor="formGroupExampleInput"
                                          className="form-label text-white"
                                        >
                                          Going To{" "}
                                          <span className="text-white fw-bold">
                                            *
                                          </span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-field autocomplete rounded-3"
                                          ref={destinationRef5}
                                          placeholder="To"
                                          id="txtTo5"
                                          autoComplete="off"
                                        />
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <label
                                              htmlFor="formGroupExampleInput"
                                              className="form-label text-white"
                                            >
                                              Departing{" "}
                                              <span className="text-white fw-bold">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                        <div className="t-datepicker class_5 bg-light rounded-3">
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
                                      <button
                                        type="button"
                                        className="btn button-color rounded-pill text-white"
                                        id="btnp-1"
                                        onClick={() => handleFlightOptionP()}
                                      >
                                        Add more
                                      </button>
                                      &nbsp;
                                      <button
                                        type="button"
                                        className="btn button-color rounded-pill text-white"
                                        id="btnm-1"
                                        style={{ display: "none" }}
                                        onClick={() => handleFlightOptionM()}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}

                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="d-flex justify-content-center">
                                      <button
                                        className="btn text-white mt-3 text-center fw-bold rounded-3"
                                        id="search-flight" style={{ backgroundColor: "#390404" }}
                                      >
                                        Search Flight
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* <Loading loading={loading}></Loading> */}
          <div style={{ minHeight: "600px" }}>
            {fetchFlighData !== null && fetchFlighData !== undefined ? (
              loading ? (
                <Loading
                  flag={0}
                  loading={loading}
                  originCode={originCode}
                  destinationCode={destinationCode}
                  tripType={tripType}
                ></Loading>
              ) : (
                <>
                  <ShowAllFlight
                    fetchFlighData={fetchFlighData}
                    // fetchRoundWay={fetchRoundWay}
                    // fecthMulti={fecthMulti}
                    originCode={originCode}
                    loading={loading}
                    destinationCode={destinationCode}
                    tripType={tripType}
                  ></ShowAllFlight>
                </>
              )
            ) : (
              loading ? <Loading
                flag={0}
                loading={loading}
                originCode={originCode}
                destinationCode={destinationCode}
                tripType={tripType}
              ></Loading> :
                <NoDataFoundPage loading={loading}></NoDataFoundPage>
            )}
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ShowAllFlightPage;
