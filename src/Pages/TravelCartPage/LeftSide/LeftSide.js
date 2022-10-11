import React, { useEffect, useState } from "react";
import $ from "jquery";
import courtries from "../../../JSON/countries.json";
import { Link, useNavigate } from "react-router-dom";
import produce from "immer";
import "./LeftSide.css";
import axios from "axios";
import { environment } from "../../SharePages/Utility/environment";
import useAuth from "../../../hooks/useAuth";
import Select from "react-select";
import { toast } from "react-toastify";
import moment from "moment";
const LeftSide = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const { setBookData, setLoading } = useAuth();
  const data = localStorage.getItem("Database");
  const searchData = JSON.parse(data);
  const direction0 = JSON.parse(localStorage.getItem("direction0"));
  const direction1 = JSON.parse(localStorage.getItem("direction1"));
  const direction2 = JSON.parse(localStorage.getItem("direction2"));
  const direction3 = JSON.parse(localStorage.getItem("direction3"));
  const direction4 = JSON.parse(localStorage.getItem("direction4"));
  const direction5 = JSON.parse(localStorage.getItem("direction5"));
  const uniqueTransID = JSON.parse(localStorage.getItem("uniqueTransID"));
  const itemCodeRef = JSON.parse(localStorage.getItem("itemCodeRef"));
  const origin = searchData.origin;
  const destination = searchData.destination;
  // console.log(origin.match("Bangladesh")!==null?origin.match("Bangladesh")[0]:"");
  // console.log(destination.match("Bangladesh")!==null?destination.match("Bangladesh")[0]:"");
  const qtyList = searchData.qtyList;
  const adultNumber = searchData.qtyList.Adult;
  const childrenNumber = searchData.qtyList.Children;
  const infantNumber = searchData.qtyList.Infant;
  const [firstname, setFirstname] = useState("");
  const [message, setMessage] = useState("");
  let [passengerADTList, setPassengerADTList] = useState([]);
  let [passengerCNNList, setPassengerCNNList] = useState([]);
  let [passengerINFList, setPassengerINFList] = useState([]);
  const [click, setClick] = useState(false);
  const handlePassportFileUpload = (flag, index, file, passportNo) => {
    let fileExt = file.name.split(".").pop().toLowerCase();
    if (
      !(
        fileExt === "jpg" ||
        fileExt === "jpeg" ||
        fileExt === "png" ||
        fileExt === "pdf"
      )
    ) {
      toast.error("sorry! invalid file type..");
      if (flag === 1) {
        setAdult((ob) =>
          produce(ob, (v) => {
            v[index].passportCopy = "";
          })
        );
      } else if (flag === 2) {
        setChild((ob) =>
          produce(ob, (v) => {
            v[index].passportCopy = "";
          })
        );
      } else if (flag === 3) {
        setInfant((ob) =>
          produce(ob, (v) => {
            v[index].passportCopy = "";
          })
        );
      }
    } else {
      var formData = new FormData();
      formData.append(`file`, file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const postData = async () => {
        const response = await axios.post(
          environment.passengerupload + "/1/" + passportNo,
          formData,
          config
        );
        if (flag === 1) {
          setAdult((ob) =>
            produce(ob, (v) => {
              v[index].passportCopy = response.data.fileName;
            })
          );
        } else if (flag === 2) {
          setChild((ob) =>
            produce(ob, (v) => {
              v[index].passportCopy = response.data.fileName;
            })
          );
        } else if (flag === 3) {
          setInfant((ob) =>
            produce(ob, (v) => {
              v[index].passportCopy = response.data.fileName;
            })
          );
        }
      };
      postData();
    }
  };
  const handleVisaFileUpload = (flag, index, file, passportNo) => {
    let fileExt = file.name.split(".").pop().toLowerCase();
    if (
      !(
        fileExt === "jpg" ||
        fileExt === "jpeg" ||
        fileExt === "png" ||
        fileExt === "pdf"
      )
    ) {
      toast.error("sorry! invalid file type..");
      if (flag === 1) {
        setAdult((ob) =>
          produce(ob, (v) => {
            v[index].passportCopy = "";
          })
        );
      } else if (flag === 2) {
        setChild((ob) =>
          produce(ob, (v) => {
            v[index].passportCopy = "";
          })
        );
      } else if (flag === 3) {
        setInfant((ob) =>
          produce(ob, (v) => {
            v[index].passportCopy = "";
          })
        );
      }
    } else {
      var formData = new FormData();
      formData.append(`file`, file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const postData = async () => {
        const response = await axios.post(
          environment.passengerupload + "/2/" + passportNo,
          formData,
          config
        );
        if (flag === 1) {
          setAdult((ob) =>
            produce(ob, (v) => {
              v[index].visaCopy = response.data.fileName;
            })
          );
        } else if (flag === 2) {
          setChild((ob) =>
            produce(ob, (v) => {
              v[index].visaCopy = response.data.fileName;
            })
          );
        } else if (flag === 3) {
          setInfant((ob) =>
            produce(ob, (v) => {
              v[index].visaCopy = response.data.fileName;
            })
          );
        }
      };
      postData();
    }
  };

  const handleGetPassengers = () => {
    const getData = async () => {
      let sendObj = {
        AgentId: sessionStorage.getItem("agentId") ?? 0,
        SearchText: "",
      };
      const response = await axios.post(
        environment.getAgentPassengers + "?pageNumber=1&pageSize=500",
        sendObj,
        environment.headerToken
      );
      setPassengerADTList(
        response.data.data.filter((f) => f.passengerType === "ADT")
      );
      setPassengerCNNList(
        response.data.data.filter((f) => f.passengerType === "CNN")
      );
      setPassengerINFList(
        response.data.data.filter((f) => f.passengerType === "INF")
      );
    };
    getData();
  };

  useEffect(() => {
    handleGetPassengers();
    $(document).ready(function () { });
  }, []);
  const handleClick = (e) => {
    if (e.target.checked) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  const handleOnChange = (e) => {
    const re = /^[a-zA-Z,]*$/;
    let name = e.target.value;
    if (re.test(name)) {
      setFirstname(name);
      setMessage();
    } else {
      setMessage("Please Enter only alphabet");
    }
  };

  $("#name").on("input", function () {
    var input = $(this);
    var is_name = input.val();
    if (is_name) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  let adultYearList = [];
  let childYearList = [];
  let infantYearList = [];

  var thisYear = new Date().getFullYear();

  for (var i = 12; i <= 100; i++) {
    var year = thisYear - i;
    adultYearList.push(year);
  }

  for (var i = 2; i <= 12; i++) {
    var year = thisYear - i;
    childYearList.push(year);
  }

  for (var i = 1; i <= 2; i++) {
    var year = thisYear - i;
    infantYearList.push(year);
  }

  // console.log(firstname);

  const togglebaggagea = (id) => {
    $("#toggle-baggagea" + id).toggle();
  };
  const togglebaggagec = (id) => {
    $("#toggle-baggagec" + id).toggle();
  };

  useEffect(() => {
    for (var i = 0; i < adultNumber; i++) {
      $("#toggle-baggagea" + i).hide();
    }

    for (var j = 0; j < childrenNumber; j++) {
      $("#toggle-baggagec" + j).hide();
    }
  }, [adultNumber, childrenNumber]);

  let adultList = [];
  for (var i = 0; i < adultNumber; i++) {
    let newObj = {
      id: 0,
      title: "Mr",
      firstName: "",
      middleName: "",
      lastName: "",
      date: "",
      month: "01",
      year: "",
      nationality: "BD",
      document: "",
      passportNumber: "",
      issuingCountry: "BD",
      passportDate: "",
      passportMonth: "01",
      passportYear: "",
      gender: "Male",
      countryCode: "BD",
      frequentFlyerNumber: ""
    };
    adultList.push(newObj);
  }

  const [adult, setAdult] = useState(adultList);

  adult.map((i) =>
    i.passportYear !== "" && i.passportMonth !== "" && i.passportDate !== ""
      ? Math.floor(
        Math.abs(
          new Date(
            i.passportYear + "-" + i.passportMonth + "-" + i.passportDate
          ) - new Date()
        ) /
        (1000 * 60 * 60 * 24 * 30)
      )
        > 6
        ? ""
        : toast.error("Passport expiry date does not valid")
      : ""
  );




  let dataObj = courtries.find((i) => i.name === adult[0].nationality);
  // console.log(dataObj!=undefined?dataObj.dial_code:"")
  let childList = [];
  for (var i = 0; i < childrenNumber; i++) {
    let newObj = {
      id: 0,
      title: "Mstr",
      firstName: "",
      middleName: "",
      lastName: "",
      date: "",
      month: "01",
      year: "",
      nationality: "BD",
      document: "",
      passportNumber: "",
      issuingCountry: "BD",
      passportDate: "",
      passportMonth: "01",
      passportYear: "",
      gender: "Male",
      countryCode: "BD",
      frequentFlyerNumber: ""
    };
    childList.push(newObj);
  }

  const [child, setChild] = useState(childList);

  let infantList = [];
  for (var i = 0; i < infantNumber; i++) {
    let newObj = {
      id: 0,
      title: "Mstr",
      firstName: "",
      middleName: "",
      lastName: "",
      date: "",
      month: "01",
      year: "",
      nationality: "BD",
      document: "",
      passportNumber: "",
      issuingCountry: "BD",
      passportDate: "",
      passportMonth: "01",
      passportYear: "",
      gender: "Male",
      countryCode: "BD",
      frequentFlyerNumber: ""
    };
    infantList.push(newObj);
  }

  const [infant, setInfant] = useState(infantList);

  let contactDetail = [
    {
      id: 0,
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      mobailCode: "+88",
      mobailNumber: "",
      nationality: "BD"
    },
  ];
  const [contact, setContact] = useState(contactDetail);
  // contact[0].mobailCode=dataObj!=undefined?dataObj.dial_code:"";
  localStorage.setItem("adult", JSON.stringify(adult));
  localStorage.setItem("child", JSON.stringify(child));
  localStorage.setItem("infant", JSON.stringify(infant));
  localStorage.setItem("contact", JSON.stringify(contact));

  child.map((i) =>
    i.passportYear !== "" && i.passportMonth !== "" && i.passportDate !== ""
      ? Math.floor(
        Math.abs(
          new Date(
            i.passportYear + "-" + i.passportMonth + "-" + i.passportDate
          ) - new Date()
        ) /
        (1000 * 60 * 60 * 24 * 30)
      )
        > 6
        ? ""
        : toast.error("Passport expiry date does not valid")
      : ""
  );

  infant.map((i) =>
    i.passportYear !== "" && i.passportMonth !== "" && i.passportDate !== ""
      ? Math.floor(
        Math.abs(
          new Date(
            i.passportYear + "-" + i.passportMonth + "-" + i.passportDate
          ) - new Date()
        ) /
        (1000 * 60 * 60 * 24 * 30)
      )
        > 6
        ? ""
        : toast.error("Passport expiry date does not valid")
      : ""
  );

  infant.map((item, index) => {
    const ageInYears = moment().diff(moment(item.date + '/' + item.month + '/' + item.year, "DD/MM/YYYY"), 'months');
    console.log(ageInYears);
    if (ageInYears > 24) {
      toast.error(`Infant ${index + 1} age is more than 2 years!`);
      return;
    }
  })

  console.log(contact);


  const bookingData = (e) => {
    // infant.map((item,index)=>{
    //   const ageInYears = moment().diff(moment(item.date+'/'+item.month+'/'+item.year, "DD/MM/YYYY"), 'months'); 
    //   console.log(ageInYears);      
    //   if (ageInYears > 24) { 
    //     toast.error(`Infant ${index+1} age is more than 2 years!`);
    //     return;
    //   }
    // })

    setLoading(true);
    let sendObj = {
      passengerInfoes: [],
      taxRedemptions: [],
      uniqueTransID: "",
      itemCodeRef: "",
      PriceCodeRef: "",
    };

    adult.map((item) => {
      let idObj = passengerADTList.find(f => (f.title + " " + f.first + " " + f.middle + " " + f.last) === (item.title + " " + item.firstName + " " + item.middleName + " " + item.lastName));
      let passengerObj = {
        nameElement: {
          title: item.title,
          firstName: item.firstName,
          lastName: item.lastName,
          middleName: item.middleName,
        },
        contactInfo: {
          email: contact[0].email,
          phone: contact[0].mobailNumber,
          phoneCountryCode: contact[0].mobailCode,
          countryCode: item.countryCode,
          cityName: "",
        },
        documentInfo: {
          documentType: item.document,
          documentNumber: item.passportNumber,
          expireDate:
            item.passportYear > 0 ?
              item.passportYear +
              "-" +
              item.passportMonth +
              "-" +
              item.passportDate : "",
          frequentFlyerNumber: item.frequentFlyerNumber,
          issuingCountry: item.issuingCountry,
          nationality: item.nationality,
        },
        passengerType: "ADT",
        gender: item.gender,
        dateOfBirth: (origin.match("Bangladesh") !== null
          ? origin.match("Bangladesh")[0]
          : "") &&
          (destination.match("Bangladesh") !== null
            ? destination.match("Bangladesh")[0]
            : "") === "Bangladesh"
          ? ""
          : item.year + "-" + item.month + "-" + item.date,
        passengerKey: idObj !== undefined ? String(idObj.id) : "0",
        isLeadPassenger: true,
      };
      sendObj.passengerInfoes.push(passengerObj);
    });

    child.map((item) => {
      let passengerObj = {
        nameElement: {
          title: item.title,
          firstName: item.firstName,
          lastName: item.lastName,
          middleName: item.middleName,
        },
        contactInfo: {
          email: contact[0].email,
          phone: contact[0].mobailNumber,
          phoneCountryCode: contact[0].mobailCode,
          countryCode: item.countryCode,
          cityName: "",
        },
        documentInfo: {
          documentType: item.document,
          documentNumber: item.passportNumber,
          expireDate:
            item.passportYear > 0 ?
              item.passportYear +
              "-" +
              item.passportMonth +
              "-" +
              item.passportDate : "",
          frequentFlyerNumber: item.frequentFlyerNumber,
          issuingCountry: item.issuingCountry,
          nationality: item.nationality,
        },
        passengerType: "CNN",
        gender: item.gender,
        dateOfBirth: item.year + "-" + item.month + "-" + item.date,
        passengerKey: "0",
        isLeadPassenger: true,
      };
      sendObj.passengerInfoes.push(passengerObj);
    });

    infant.map((item) => {
      let passengerObj = {
        nameElement: {
          title: item.title,
          firstName: item.firstName,
          lastName: item.lastName,
          middleName: item.middleName,
        },
        contactInfo: {
          email: contact[0].email,
          phone: contact[0].mobailNumber,
          phoneCountryCode: contact[0].mobailCode,
          countryCode: item.countryCode,
          cityName: "",
        },
        documentInfo: {
          documentType: item.document,
          documentNumber: item.passportNumber,
          expireDate:
            item.passportYear > 0 ?
              item.passportYear +
              "-" +
              item.passportMonth +
              "-" +
              item.passportDate : "",
          frequentFlyerNumber: item.frequentFlyerNumber,
          issuingCountry: item.issuingCountry,
          nationality: item.nationality,
        },
        passengerType: "INF",
        gender: item.gender,
        dateOfBirth:
          item.year + "-" + item.month.split("-")[0].trim() + "-" + item.date,
        passengerKey: "0",
        isLeadPassenger: true,
      };
      sendObj.passengerInfoes.push(passengerObj);
    });

    localStorage.setItem("passengerPack", JSON.stringify(sendObj));
    const priceCheck = {
      itemCodeRef: itemCodeRef,
      uniqueTransID: uniqueTransID,
      taxRedemptions: [],
      segmentCodeRefs: [],
    };
    if (Object.keys(direction0).length > 0) {
      direction0.segments.map((i) =>
        priceCheck.segmentCodeRefs.push(i.segmentCodeRef)
      );
    }
    if (Object.keys(direction1).length > 0) {
      direction1.segments.map((i) =>
        priceCheck.segmentCodeRefs.push(i.segmentCodeRef)
      );
    }
    if (direction2.length > 0) {
      priceCheck.segmentCodeRefs.push(direction2.segments[0].segmentCodeRef);
    }
    if (direction3.length > 0) {
      priceCheck.segmentCodeRefs.push(direction3.segments[0].segmentCodeRef);
    }
    if (direction4.length > 0) {
      priceCheck.segmentCodeRefs.push(direction4.segments[0].segmentCodeRef);
    }
    if (direction5.length > 0) {
      priceCheck.segmentCodeRefs.push(direction5.segments[0].segmentCodeRef);
    }

    console.log(priceCheck);
    async function fetchOptions() {
      await axios
        .post(environment.priceCheck, priceCheck, environment.headerToken)
        .then((response) => {
          if (response.data.item1 !== null) {
            if (
              response.data.item1?.isPriceChanged === false &&
              response.data.item1?.isPriceChanged !== undefined
            ) {
              console.log(response);
              booking(
                response.data.item1?.priceCodeRef,
                response.data.item1?.uniqueTransID,
                response.data.item1?.itemCodeRef
              );
            } else if (response.data.item1?.isPriceChanged === true) {
              setLoading(false);
              setBookData(response);
              navigate("/bookingmodal");
            }
          } else {
            setLoading(false);
            toast.error(response.data.item2.message);
            navigate("/failedbooking");
          }
        });
    }
    fetchOptions();
    console.log(sendObj);
    async function booking(price, uniqueTransID, itemCodeRef) {
      sendObj.uniqueTransID = uniqueTransID;
      sendObj.itemCodeRef = itemCodeRef;
      sendObj.PriceCodeRef = price;
      console.log(sendObj);
      await axios
        .post(environment.bookFlight, sendObj, environment.headerToken)
        .then((response) => {
          if (response.data.item1 !== null) {
            if (response.data.item2?.isSuccess === true) {
              console.log(response);
              setBookData(response);
              // localStorage.setItem('flightConfirm',JSON.stringify(response.data));
              setLoading(false);
              navigate("/successbooking");
            } else {
              setLoading(false);
              navigate("/failedbooking");
            }
          } else {
            setLoading(false);
            toast.error("Booking Failed! please try again.");
            navigate("/failedbooking");
          }
        });
    }
    e.preventDefault();
  };

  // console.log(adult);
  // console.log(child);
  // console.log(infant);
  // console.log(contact);

  // let phoneCode = courtries.filter((item) => item.code === contact[0].nationality);
  // console.log(courtries.filter((item) => item.code === contact[0].nationality)[0].dial_code);

  const handleChange = event => {
    if (event.target.checked) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  };

  // console.log(isSubscribed);
  return (
    <form onSubmit={bookingData}>
      <div className="col-lg-12">
        <div className="card box-shadow">
          <div className="card-body border">
            <div style={{ fontSize: "small" }}>
              <h5 className="text-color fw-bold text-start">
                Enter passsanger details
              </h5>

              {adult.map((p, index) => {
                return (
                  <div key={index} className="border p-2 my-3">
                    <div className="row">
                      <h3 className="form-label fw-bold">
                        <span>Adult ({index + 1})</span>
                      </h3>
                      <div className="col-lg-12 my-2">
                        {" "}
                        <Select
                          options={passengerADTList.map((item) => ({
                            label:
                              item.title +
                              " " +
                              item.first +
                              " " +
                              item.middle +
                              " " +
                              item.last,
                            value: item.id,
                          }))}
                          onChange={(e) => {
                            const id = Number(e.value);
                            console.log(id);
                            console.log(passengerADTList);
                            const item = passengerADTList.find(
                              (f) => f.id === id
                            );
                            console.log(item);
                            if (item !== undefined) {
                              setAdult((ob) =>
                                produce(ob, (v) => {
                                  console.log(item.expireDate)
                                  v[index].title = item.title;
                                  v[index].firstName = item.first;
                                  v[index].middleName = item.middle;
                                  v[index].lastName = item.last;
                                  v[index].date = Number(
                                    item.dateOfBirth.split("-")[2].split("T")[0]
                                  );
                                  v[index].month = Number(
                                    item.dateOfBirth.split("-")[1]
                                  );
                                  v[index].year = Number(
                                    item.dateOfBirth.split("-")[0]
                                  );
                                  v[index].nationality = item.nationality;
                                  v[index].passportNumber = item.documentNumber;
                                  v[index].issuingCountry =
                                    item.documentIssuingCountry;
                                  v[index].passportDate = Number(
                                    item.expireDate == null ? "" : item.expireDate.split("-")[2].split("T")[0]
                                  );
                                  v[index].passportMonth = Number(
                                    item.expireDate == null ? "" : item.expireDate.split("-")[1]
                                  );
                                  v[index].passportYear = Number(
                                    item.expireDate == null ? "" : item.expireDate.split("-")[0]
                                  );
                                  v[index].gender = item.gender;
                                  v[index].phoneNumber = item.phone;
                                  v[index].passportCopy = item.passportCopy;
                                  v[index].visaCopy = item.visaCopy;
                                })
                              );
                            } else {
                              setAdult((ob) =>
                                produce(ob, (v) => {
                                  v[index].title = "";
                                  v[index].firstName = "";
                                  v[index].middleName = "";
                                  v[index].lastName = "";
                                  v[index].date = "";
                                  v[index].month = "";
                                  v[index].year = "";
                                  v[index].nationality = "Bangladesh";
                                  v[index].passportNumber = "";
                                  v[index].issuingCountry = "";
                                  v[index].passportDate = "";
                                  v[index].passportMonth = "";
                                  v[index].passportYear = "";
                                  v[index].gender = "Male";
                                  v[index].phoneNumber = "";
                                  v[index].passportCopy = "";
                                  v[index].visaCopy = "";
                                })
                              );
                            }
                          }}
                        />
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-label float-start fw-bold">
                            First name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              name="firstName"
                              className="form-control w-25"
                              value={adult[index].title}
                              disabled
                              autoComplete="off"
                            />
                            <input
                              type="text"
                              name="firstName"
                              className="form-control w-75"
                              onChange={(e) => {
                                const firstName = e.target.value;
                                const re = /^[a-zA-Z ]*$/;
                                if (re.test(firstName)) {
                                  setAdult((ob) =>
                                    produce(ob, (v) => {
                                      v[index].firstName = firstName;
                                    })
                                  );
                                } else {
                                }
                              }}
                              value={p.firstName}
                              onBlur={handleOnChange}
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            className="form-label float-start fw-bold"
                            type=""
                          >
                            Last name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            onChange={(e) => {
                              const lastName = e.target.value;
                              const re = /^[a-zA-Z]*$/;
                              if (re.test(lastName)) {
                                setAdult((ob) =>
                                  produce(ob, (v) => {
                                    v[index].lastName = lastName;
                                  })
                                );
                              } else {
                              }
                            }}
                            value={p.lastName}
                            onBlur={handleOnChange}
                            required
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className={adult[index].gender === "Female" ? "form-label float-start fw-bold mb-0" : "form-label float-start fw-bold"}
                            type=""
                          >
                            Gender <span className="text-danger">*</span>
                            {adult[index].gender === "Female" ? (
                              <>
                                <span className="ms-4">
                                  <span className="me-3">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="inlineRadioOptions2"
                                      id="radio1"
                                      value="option1"
                                      defaultChecked
                                      onClick={(e) => {
                                        setAdult((ob) =>
                                          produce(ob, (v) => {
                                            v[index].title = "Ms";
                                          })
                                        );
                                      }}
                                    />
                                    <label
                                      class="ms-1"
                                      style={{ fontWeight: "400" }}
                                      for="radio1"
                                    >
                                      Ms
                                    </label>
                                  </span>
                                  <span className="ms-3">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="inlineRadioOptions2"
                                      id="radio2"
                                      value="option2"
                                      onClick={(e) => {
                                        setAdult((ob) =>
                                          produce(ob, (v) => {
                                            v[index].title = "Mrs";
                                          })
                                        );
                                      }}
                                    />
                                    <label
                                      class="ms-1"
                                      style={{ fontWeight: "400" }}
                                      for="radio2"
                                    >
                                      Mrs
                                    </label>
                                  </span>
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </label>
                          <div className="input-group mb-3">
                            <select
                              name="gender"
                              className="form-select"
                              onChange={(e) => {
                                const gender = e.target.value;
                                console.log(gender);
                                setAdult((ob) =>
                                  produce(ob, (v) => {
                                    v[index].gender = gender;
                                  })
                                );
                                setAdult((ob) =>
                                  produce(ob, (v) => {
                                    v[index].title =
                                      gender === "Male" ? "Mr" : "Ms";
                                  })
                                );
                              }}
                              value={p.gender}
                              required
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {(origin.match("Bangladesh") !== null
                      ? origin.match("Bangladesh")[0]
                      : "") &&
                      (destination.match("Bangladesh") !== null
                        ? destination.match("Bangladesh")[0]
                        : "") === "Bangladesh" ? (
                      <></>
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                type=""
                              >
                                Date of birth
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-group mb-3 d-flex">
                                <select
                                  name="date"
                                  className="form-select"
                                  onChange={(e) => {
                                    const date = e.target.value;
                                    setAdult((ob) =>
                                      produce(ob, (v) => {
                                        v[index].date = date;
                                      })
                                    );
                                  }}
                                  value={p.date}
                                  required
                                >
                                  <option value="">Day</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                  <option>15</option>
                                  <option>16</option>
                                  <option>17</option>
                                  <option>18</option>
                                  <option>19</option>
                                  <option>20</option>
                                  <option>21</option>
                                  <option>22</option>
                                  <option>23</option>
                                  <option>24</option>
                                  <option>25</option>
                                  <option>26</option>
                                  <option>27</option>
                                  <option>28</option>
                                  <option>29</option>
                                  <option>30</option>
                                  <option>31</option>
                                </select>
                                <select
                                  name="month"
                                  className="form-select"
                                  onChange={(e) => {
                                    const month = e.target.value;
                                    setAdult((ob) =>
                                      produce(ob, (v) => {
                                        v[index].month = month;
                                      })
                                    );
                                  }}
                                  value={p.month}
                                  required
                                >
                                  <option value="01" selected>Jan</option>
                                  <option value="02">Feb</option>
                                  <option value="03">Mar</option>
                                  <option value="04">Apr</option>
                                  <option value="05">May</option>
                                  <option value="06">Jun</option>
                                  <option value="07">Jul</option>
                                  <option value="08">Aug</option>
                                  <option value="09">Sep</option>
                                  <option value="10">Oct</option>
                                  <option value="11">Nov</option>
                                  <option value="12">Dec</option>
                                </select>
                                <select
                                  name="year"
                                  className="form-select"
                                  onChange={(e) => {
                                    const year = e.target.value;
                                    setAdult((ob) =>
                                      produce(ob, (v) => {
                                        v[index].year = year;
                                      })
                                    );
                                  }}
                                  value={p.year}
                                  required
                                >
                                  <option value="">Year</option>
                                  {adultYearList.map((i, index) => {
                                    return (
                                      <option key={index}>{i}</option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                type=""
                              >
                                Nationality{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-group mb-3">
                                <select
                                  name="nationality"
                                  className="form-select"
                                  required
                                  onChange={(e) => {
                                    const nationality = e.target.value;
                                    setAdult((ob) =>
                                      produce(ob, (v) => {
                                        v[index].nationality =
                                          nationality;
                                        v[index].countryCode = nationality;
                                      })
                                    );
                                  }}
                                  value={p.nationality}
                                >
                                  <option value="BD" selected>
                                    Bangladesh
                                  </option>
                                  {courtries.map((item, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={item.code}
                                      >
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                WheelChair (If needed)
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <select
                                name="wheel"
                                className="form-select"
                                onChange={(e) => {
                                  const wheel = e.target.value;
                                  setAdult((ob) =>
                                    produce(ob, (v) => {
                                      v[index].wheel = wheel;
                                    })
                                  );
                                }}
                              >
                                <option value="">Not Required</option>
                                <option value="WCHR">
                                  Passenger can not walk short distance up
                                  or down stairs.
                                </option>
                                <option value="WCHS">
                                  Passenger can not walk short distance,
                                  but not up or down stairs
                                </option>
                                <option value="WCHC">
                                  Passenger cannot walk any distance and
                                  will require the aisle chair to board.
                                </option>
                                <option value="WCOB">
                                  On-board aisle wheelchair requested
                                </option>
                                <option value="WCMP">
                                  Passenger is traveling with a manual
                                  wheelchair.
                                </option>
                                <option value="WCBD">
                                  Passenger is traveling with a dry cell
                                  battery-powered wheelchair.
                                </option>
                                <option value="WCBW">
                                  Passenger is traveling with a wet cell
                                  battery-powered wheelchair.
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport number{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                name="passport-number"
                                required
                                onChange={(e) => {
                                  const passportNumber = e.target.value;
                                  setAdult((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportNumber =
                                        passportNumber;
                                    })
                                  );
                                }}
                                value={p.passportNumber}
                                autoComplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Issuing country{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const issuingCountry = e.target.value;
                                  setAdult((ob) =>
                                    produce(ob, (v) => {
                                      v[index].issuingCountry =
                                        issuingCountry;
                                    })
                                  );
                                }}
                                value={p.issuingCountry}
                                required
                              >
                                <option value="BD">
                                  Bangladesh
                                </option>
                                {courtries.map((item, index) => {
                                  return (
                                    <option key={index} value={item.code}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport Expiry Date{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="input-group mb-3 d-flex">
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const passportDate = e.target.value;
                                  setAdult((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportDate =
                                        passportDate;
                                    })
                                  );
                                }}
                                value={p.passportDate}
                                required
                              >
                                <option value="">Day</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                                <option>25</option>
                                <option>26</option>
                                <option>27</option>
                                <option>28</option>
                                <option>29</option>
                                <option>30</option>
                                <option>31</option>
                              </select>
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const passportMonth = e.target.value;
                                  setAdult((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportMonth =
                                        passportMonth;
                                    })
                                  );
                                }}
                                value={p.passportMonth}
                                required
                              >
                                <option value="01" selected>Jan</option>
                                <option value="02">Feb</option>
                                <option value="03">Mar</option>
                                <option value="04">Apr</option>
                                <option value="05">May</option>
                                <option value="06">Jun</option>
                                <option value="07">Jul</option>
                                <option value="08">Aug</option>
                                <option value="09">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                              </select>
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const passportYear = e.target.value;
                                  setAdult((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportYear =
                                        passportYear;
                                    })
                                  );
                                }}
                                value={p.passportYear}
                                required
                              >
                                <option value="">Year</option>
                                <option>2032</option>
                                <option>2031</option>
                                <option>2030</option>
                                <option>2029</option>
                                <option>2028</option>
                                <option>2027</option>
                                <option>2026</option>
                                <option>2025</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            className="form-label float-start fw-bold"
                            type=""
                          >
                            Frequent flyer number(If any)
                          </label>
                          <input
                            type="text"
                            name="frequentFlyerNumber"
                            className="form-control"
                            onChange={(e) => {
                              const frequentFlyerNumber = e.target.value;
                              setAdult((ob) =>
                                produce(ob, (v) => {
                                  v[index].frequentFlyerNumber = frequentFlyerNumber;
                                })
                              );
                            }}
                            value={p.frequentFlyerNumber}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      {(origin.match("Bangladesh") !== null
                        ? origin.match("Bangladesh")[0]
                        : "") &&
                        (destination.match("Bangladesh") !== null
                          ? destination.match("Bangladesh")[0]
                          : "") === "Bangladesh" ? (
                        <></>
                      ) : (
                        <>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport Copy
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              {p.passportNumber !== "" ? (
                                <input
                                  type={"file"}
                                  accept=".jpg, .jpeg, .png, .pdf"
                                  onChange={(e) =>
                                    handlePassportFileUpload(
                                      1,
                                      index,
                                      e.target.files[0],
                                      p.passportNumber
                                    )
                                  }
                                />
                              ) : (
                                <></>
                              )}

                              {p.passportCopy != null &&
                                p.passportCopy != "" ? (
                                <a
                                  href={
                                    environment.baseApiURL +
                                    `agentinfo/GetPassengerFile/${p.passportCopy}/1`
                                  }
                                  download
                                  target="_blank"
                                >
                                  Download Passport Copy
                                </a>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* <div>{JSON.stringify(adult, null, 2)}</div> */}

              {child.map((p, index) => {
                return (
                  <div key={index} className="border p-2 my-3">
                    <div className="row">
                      <h3 className="form-label fw-bold">
                        <span>Child ({index + 1})</span>
                      </h3>
                      <div className="col-lg-12 my-2">
                        <Select
                          options={passengerCNNList.map((item) => ({
                            label:
                              item.title +
                              " " +
                              item.first +
                              " " +
                              item.middle +
                              " " +
                              item.last,
                            value: item.id,
                          }))}
                          onChange={(e) => {
                            const id = Number(e.value);
                            console.log(id);
                            console.log(passengerCNNList);
                            const item = passengerCNNList.find(
                              (f) => f.id === id
                            );
                            console.log(item);
                            if (item !== undefined) {
                              setChild((ob) =>
                                produce(ob, (v) => {
                                  v[index].title = item.title;
                                  v[index].firstName = item.first;
                                  v[index].middleName = item.middle;
                                  v[index].lastName = item.last;
                                  v[index].date = Number(
                                    item.dateOfBirth.split("-")[2].split("T")[0]
                                  );
                                  v[index].month = Number(
                                    item.dateOfBirth.split("-")[1]
                                  );
                                  v[index].year = Number(
                                    item.dateOfBirth.split("-")[0]
                                  );
                                  v[index].nationality = item.nationality;
                                  v[index].passportNumber = item.documentNumber;
                                  v[index].issuingCountry =
                                    item.documentIssuingCountry;
                                  v[index].passportDate = Number(
                                    item.expireDate.split("-")[2].split("T")[0]
                                  );
                                  v[index].passportMonth = Number(
                                    item.expireDate.split("-")[1]
                                  );
                                  v[index].passportYear = Number(
                                    item.expireDate.split("-")[0]
                                  );
                                  v[index].gander = item.gender;
                                  v[index].phoneNumber = item.phone;
                                  v[index].passportCopy = item.passportCopy;
                                  v[index].visaCopy = item.visaCopy;
                                })
                              );
                            }
                          }}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-label float-start fw-bold">
                            First name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              name="firstName"
                              className="form-control w-25"
                              value={child[index].title}
                              disabled
                              autoComplete="off"
                            />
                            <input
                              type="text"
                              name="firstName"
                              className="form-control w-75"
                              onChange={(e) => {
                                const firstName = e.target.value;
                                const re = /^[a-zA-Z ]*$/;
                                if (re.test(firstName)) {
                                  setChild((ob) =>
                                    produce(ob, (v) => {
                                      v[index].firstName = firstName;
                                    })
                                  );
                                } else {
                                }
                              }}
                              value={p.firstName}
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-label float-start fw-bold">
                            Last name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            onChange={(e) => {
                              const lastName = e.target.value;
                              const re = /^[a-zA-Z]*$/;
                              if (re.test(lastName)) {
                                setChild((ob) =>
                                  produce(ob, (v) => {
                                    v[index].lastName = lastName;
                                  })
                                );
                              } else {
                              }
                            }}
                            value={p.lastName}
                            required
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-label float-start fw-bold"
                            type=""
                          >
                            Gender <span className="text-danger">*</span>
                          </label>
                          <div className="input-group mb-3">
                            <select
                              name="date"
                              className="form-select"
                              onChange={(e) => {
                                const gender = e.target.value;
                                setChild((ob) =>
                                  produce(ob, (v) => {
                                    v[index].gender = gender;
                                  })
                                );
                                setChild((ob) =>
                                  produce(ob, (v) => {
                                    v[index].title =
                                      gender === "Male" ? "Mstr" : "Miss";
                                  })
                                );
                              }}
                              value={p.gender}
                              required
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-label float-start fw-bold"
                            type=""
                          >
                            Date of birth
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group mb-3 d-flex">
                            <select
                              name="date"
                              className="form-select"
                              onChange={(e) => {
                                const date = e.target.value;
                                setChild((ob) =>
                                  produce(ob, (v) => {
                                    v[index].date = date;
                                  })
                                );
                              }}
                              value={p.date}
                              required
                            >
                              <option value="">Day</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                              <option>13</option>
                              <option>14</option>
                              <option>15</option>
                              <option>16</option>
                              <option>17</option>
                              <option>18</option>
                              <option>19</option>
                              <option>20</option>
                              <option>21</option>
                              <option>22</option>
                              <option>23</option>
                              <option>24</option>
                              <option>25</option>
                              <option>26</option>
                              <option>27</option>
                              <option>28</option>
                              <option>29</option>
                              <option>30</option>
                              <option>31</option>
                            </select>
                            <select
                              name="month"
                              className="form-select"
                              onChange={(e) => {
                                const month = e.target.value;
                                setChild((ob) =>
                                  produce(ob, (v) => {
                                    v[index].month = month;
                                  })
                                );
                              }}
                              value={p.month}
                              required
                            >
                              <option value="01" selected>Jan</option>
                              <option value="02">Feb</option>
                              <option value="03">Mar</option>
                              <option value="04">Apr</option>
                              <option value="05">May</option>
                              <option value="06">Jun</option>
                              <option value="07">Jul</option>
                              <option value="08">Aug</option>
                              <option value="09">Sep</option>
                              <option value="10">Oct</option>
                              <option value="11">Nov</option>
                              <option value="12">Dec</option>
                            </select>
                            <select
                              name="year"
                              className="form-select"
                              onChange={(e) => {
                                const year = e.target.value;
                                setChild((ob) =>
                                  produce(ob, (v) => {
                                    v[index].year = year;
                                  })
                                );
                              }}
                              value={p.year}
                              required
                            >
                              <option value="">Year</option>
                              {childYearList.map((i, index) => {
                                return <option key={index}>{i}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            className="form-label float-start fw-bold"
                            type=""
                          >
                            Frequent flyer number(If any)
                          </label>
                          <input
                            type="text"
                            name="frequentFlyerNumber"
                            className="form-control"
                            onChange={(e) => {
                              const frequentFlyerNumber = e.target.value;
                              setChild((ob) =>
                                produce(ob, (v) => {
                                  v[index].frequentFlyerNumber = frequentFlyerNumber;
                                })
                              );
                            }}
                            value={p.frequentFlyerNumber}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      {(origin.match("Bangladesh") !== null
                        ? origin.match("Bangladesh")[0]
                        : "") &&
                        (destination.match("Bangladesh") !== null
                          ? destination.match("Bangladesh")[0]
                          : "") === "Bangladesh" ? (
                        <></>
                      ) : (
                        <>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                type=""
                              >
                                Nationality
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-group mb-3">
                                <select
                                  name="nationality"
                                  className="form-select"
                                  onChange={(e) => {
                                    const nationality = e.target.value;
                                    setChild((ob) =>
                                      produce(ob, (v) => {
                                        v[index].nationality =
                                          nationality;
                                        v[index].countryCode = nationality;
                                      })
                                    );
                                  }}
                                  value={p.nationality}
                                  required
                                >
                                  <option value="BD">
                                    Bangladesh
                                  </option>
                                  {courtries.map((item, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={item.code}
                                      >
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                WheelChair (If needed)
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <select
                                name="wheel"
                                className="form-select"
                                onChange={(e) => {
                                  const wheel = e.target.value;
                                  setChild((ob) =>
                                    produce(ob, (v) => {
                                      v[index].wheel = wheel;
                                    })
                                  );
                                }}
                              >
                                <option value="">Not Required</option>
                                <option value="WCHR">
                                  Passenger can not walk short distance up
                                  or down stairs.
                                </option>
                                <option value="WCHS">
                                  Passenger can not walk short distance,
                                  but not up or down stairs
                                </option>
                                <option value="WCHC">
                                  Passenger cannot walk any distance and
                                  will require the aisle chair to board.
                                </option>
                                <option value="WCOB">
                                  On-board aisle wheelchair requested
                                </option>
                                <option value="WCMP">
                                  Passenger is traveling with a manual
                                  wheelchair.
                                </option>
                                <option value="WCBD">
                                  Passenger is traveling with a dry cell
                                  battery-powered wheelchair.
                                </option>
                                <option value="WCBW">
                                  Passenger is traveling with a wet cell
                                  battery-powered wheelchair.
                                </option>
                              </select>
                            </div>
                          </div> */}
                        </>
                      )}
                    </div>

                    {(origin.match("Bangladesh") !== null
                      ? origin.match("Bangladesh")[0]
                      : "") &&
                      (destination.match("Bangladesh") !== null
                        ? destination.match("Bangladesh")[0]
                        : "") === "Bangladesh" ? (
                      <></>
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport number{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                name="passport-number"
                                required
                                onChange={(e) => {
                                  const passportNumber = e.target.value;
                                  setChild((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportNumber =
                                        passportNumber;
                                    })
                                  );
                                }}
                                value={p.passportNumber}
                                autoComplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Issuing country{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const issuingCountry = e.target.value;
                                  setChild((ob) =>
                                    produce(ob, (v) => {
                                      v[index].issuingCountry =
                                        issuingCountry;
                                    })
                                  );
                                }}
                                value={p.issuingCountry}
                                required
                              >
                                <option value="BD">
                                  Bangladesh
                                </option>
                                {courtries.map((item, index) => {
                                  return (
                                    <option key={index} value={item.code}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport Expiry Date{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="input-group mb-3 d-flex">
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const passportDate = e.target.value;
                                  setChild((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportDate =
                                        passportDate;
                                    })
                                  );
                                }}
                                value={p.passportDate}
                                required
                              >
                                <option value="">Day</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                                <option>25</option>
                                <option>26</option>
                                <option>27</option>
                                <option>28</option>
                                <option>29</option>
                                <option>30</option>
                                <option>31</option>
                              </select>
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const passportMonth = e.target.value;
                                  setChild((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportMonth =
                                        passportMonth;
                                    })
                                  );
                                }}
                                value={p.passportMonth}
                                required
                              >
                                <option value="01" selected>Jan</option>
                                <option value="02">Feb</option>
                                <option value="03">Mar</option>
                                <option value="04">Apr</option>
                                <option value="05">May</option>
                                <option value="06">Jun</option>
                                <option value="07">Jul</option>
                                <option value="08">Aug</option>
                                <option value="09">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                              </select>
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const passportYear = e.target.value;
                                  setChild((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportYear =
                                        passportYear;
                                    })
                                  );
                                }}
                                value={p.passportYear}
                                required
                              >
                                <option value="">Year</option>
                                <option>2032</option>
                                <option>2031</option>
                                <option>2030</option>
                                <option>2029</option>
                                <option>2028</option>
                                <option>2027</option>
                                <option>2026</option>
                                <option>2025</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="row">
                      {(origin.match("Bangladesh") !== null
                        ? origin.match("Bangladesh")[0]
                        : "") &&
                        (destination.match("Bangladesh") !== null
                          ? destination.match("Bangladesh")[0]
                          : "") === "Bangladesh" ? (
                        <></>
                      ) : (
                        <>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport Copy
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              {p.passportNumber !== "" ? (
                                <input
                                  type={"file"}
                                  accept=".jpg, .jpeg, .png, .pdf"
                                  onChange={(e) =>
                                    handlePassportFileUpload(
                                      2,
                                      index,
                                      e.target.files[0],
                                      p.passportNumber
                                    )
                                  }
                                />
                              ) : (
                                <></>
                              )}

                              {p.passportCopy != null &&
                                p.passportCopy != "" ? (
                                <a
                                  href={
                                    environment.baseApiURL +
                                    `agentinfo/GetPassengerFile/${p.passportCopy}/1`
                                  }
                                  download
                                  target="_blank"
                                >
                                  Download Passport Copy
                                </a>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* <div>{JSON.stringify(child, null, 2)}</div> */}
              {infant.map((p, index) => {
                return (
                  <div key={index} className="border p-2 my-3">
                    <div className="row">
                      <h3 className="form-label fw-bold">
                        <span>Infant ({index + 1})</span>
                      </h3>
                      <div className="col-lg-12  my-2">
                        <Select
                          options={passengerINFList.map((item) => ({
                            label:
                              item.title +
                              " " +
                              item.first +
                              " " +
                              item.middle +
                              " " +
                              item.last,
                            value: item.id,
                          }))}
                          onChange={(e) => {
                            const id = Number(e.value);
                            console.log(id);
                            console.log(passengerINFList);
                            const item = passengerINFList.find(
                              (f) => f.id === id
                            );
                            console.log(item);
                            if (item !== undefined) {
                              setInfant((ob) =>
                                produce(ob, (v) => {
                                  v[index].title = item.title;
                                  v[index].firstName = item.first;
                                  v[index].middleName = item.middle;
                                  v[index].lastName = item.last;
                                  v[index].date = Number(
                                    item.dateOfBirth.split("-")[2].split("T")[0]
                                  );
                                  v[index].month = Number(
                                    item.dateOfBirth.split("-")[1]
                                  );
                                  v[index].year = Number(
                                    item.dateOfBirth.split("-")[0]
                                  );
                                  v[index].nationality = item.nationality;
                                  v[index].passportNumber = item.documentNumber;
                                  v[index].issuingCountry =
                                    item.documentIssuingCountry;
                                  v[index].passportDate = Number(
                                    item.expireDate.split("-")[2].split("T")[0]
                                  );
                                  v[index].passportMonth = Number(
                                    item.expireDate.split("-")[1]
                                  );
                                  v[index].passportYear = Number(
                                    item.expireDate.split("-")[0]
                                  );
                                  v[index].gander = item.gender;
                                  v[index].phoneNumber = item.phone;
                                  v[index].passportCopy = item.passportCopy;
                                  v[index].visaCopy = item.visaCopy;
                                })
                              );
                            }
                          }}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-label float-start fw-bold">
                            First name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              name="firstName"
                              className="form-control w-25"
                              value={infant[index].title}
                              disabled
                              autoComplete="off"
                            />
                            <input
                              type="text"
                              name="firstName"
                              className="form-control w-75"
                              onChange={(e) => {
                                const firstName = e.target.value;
                                const re = /^[a-zA-Z ]*$/;
                                if (re.test(firstName)) {
                                  setInfant((ob) =>
                                    produce(ob, (v) => {
                                      v[index].firstName = firstName;
                                    })
                                  );
                                } else {
                                }
                              }}
                              value={p.firstName}
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-label float-start fw-bold">
                            Last name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            onChange={(e) => {
                              const lastName = e.target.value;
                              const re = /^[a-zA-Z]*$/;
                              if (re.test(lastName)) {
                                setInfant((ob) =>
                                  produce(ob, (v) => {
                                    v[index].lastName = lastName;
                                  })
                                );
                              } else {
                              }
                            }}
                            value={p.lastName}
                            required
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-label float-start fw-bold"
                            type=""
                          >
                            Gender <span className="text-danger">*</span>
                          </label>
                          <div className="input-group mb-3">
                            <select
                              name="date"
                              className="form-select"
                              onChange={(e) => {
                                const gender = e.target.value;
                                setInfant((ob) =>
                                  produce(ob, (v) => {
                                    v[index].gender = gender;
                                  })
                                );
                                setInfant((ob) =>
                                  produce(ob, (v) => {
                                    v[index].title =
                                      gender === "Male" ? "Mstr" : "Miss";
                                  })
                                );
                              }}
                              value={p.gender}
                              required
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-label float-start fw-bold"
                            type=""
                          >
                            Date of birth
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group mb-3 d-flex">
                            <select
                              name="date"
                              className="form-select"
                              onChange={(e) => {
                                const date = e.target.value;
                                setInfant((ob) =>
                                  produce(ob, (v) => {
                                    v[index].date = date;
                                  })
                                );
                              }}
                              required
                            >
                              <option value="">Day</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                              <option>13</option>
                              <option>14</option>
                              <option>15</option>
                              <option>16</option>
                              <option>17</option>
                              <option>18</option>
                              <option>19</option>
                              <option>20</option>
                              <option>21</option>
                              <option>22</option>
                              <option>23</option>
                              <option>24</option>
                              <option>25</option>
                              <option>26</option>
                              <option>27</option>
                              <option>28</option>
                              <option>29</option>
                              <option>30</option>
                              <option>31</option>
                            </select>
                            <select
                              name="month"
                              className="form-select"
                              onChange={(e) => {
                                const month = e.target.value;
                                setInfant((ob) =>
                                  produce(ob, (v) => {
                                    v[index].month = month;
                                  })
                                );
                              }}
                              required
                            >
                              <option value="01" selected>Jan</option>
                              <option value="02">Feb</option>
                              <option value="03">Mar</option>
                              <option value="04">Apr</option>
                              <option value="05">May</option>
                              <option value="06">Jun</option>
                              <option value="07">Jul</option>
                              <option value="08">Aug</option>
                              <option value="09">Sep</option>
                              <option value="10">Oct</option>
                              <option value="11">Nov</option>
                              <option value="12">Dec</option>
                            </select>
                            <select
                              name="year"
                              className="form-select"
                              onChange={(e) => {
                                const year = e.target.value;
                                setInfant((ob) =>
                                  produce(ob, (v) => {
                                    v[index].year = year;
                                  })
                                );
                              }}
                              required
                            >
                              <option value="">Year</option>
                              {infantYearList.map((i) => {
                                return <option key={index}>{i}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            className="form-label float-start fw-bold"
                            type=""
                          >
                            Frequent flyer number(If any)
                          </label>
                          <input
                            type="text"
                            name="frequentFlyerNumber"
                            className="form-control"
                            onChange={(e) => {
                              const frequentFlyerNumber = e.target.value;
                              setInfant((ob) =>
                                produce(ob, (v) => {
                                  v[index].frequentFlyerNumber = frequentFlyerNumber;
                                })
                              );
                            }}
                            value={p.frequentFlyerNumber}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      {(origin.match("Bangladesh") !== null
                        ? origin.match("Bangladesh")[0]
                        : "") &&
                        (destination.match("Bangladesh") !== null
                          ? destination.match("Bangladesh")[0]
                          : "") === "Bangladesh" ? (
                        <></>
                      ) : (
                        <>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                type=""
                              >
                                Nationality
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-group mb-3">
                                <select
                                  name="nationality"
                                  className="form-select"
                                  onChange={(e) => {
                                    const nationality = e.target.value;
                                    setInfant((ob) =>
                                      produce(ob, (v) => {
                                        v[index].nationality =
                                          nationality;
                                        v[index].countryCode = nationality;
                                      })
                                    );
                                  }}
                                  value={p.nationality}
                                  required
                                >
                                  <option value="BD">
                                    Bangladesh
                                  </option>
                                  {courtries.map((item, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={item.code}
                                      >
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {(origin.match("Bangladesh") !== null
                      ? origin.match("Bangladesh")[0]
                      : "") &&
                      (destination.match("Bangladesh") !== null
                        ? destination.match("Bangladesh")[0]
                        : "") === "Bangladesh" ? (
                      <></>
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport number{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                name="passport-number"
                                required
                                onChange={(e) => {
                                  const passportNumber = e.target.value;
                                  setInfant((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportNumber =
                                        passportNumber;
                                    })
                                  );
                                }}
                                value={p.passportNumber}
                                autoComplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Issuing country{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const issuingCountry = e.target.value;
                                  setInfant((ob) =>
                                    produce(ob, (v) => {
                                      v[index].issuingCountry =
                                        issuingCountry;
                                    })
                                  );
                                }}
                                value={p.issuingCountry}
                                required
                              >
                                <option value="BD">
                                  Bangladesh
                                </option>
                                {courtries.map((item, index) => {
                                  return (
                                    <option key={index} value={item.code}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport Expiry Date{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="input-group mb-3 d-flex">
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const passportDate = e.target.value;
                                  setInfant((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportDate =
                                        passportDate;
                                    })
                                  );
                                }}
                                value={p.passportDate}
                                required
                              >
                                <option value="">Day</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                                <option>25</option>
                                <option>26</option>
                                <option>27</option>
                                <option>28</option>
                                <option>29</option>
                                <option>30</option>
                                <option>31</option>
                              </select>
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const passportMonth = e.target.value;
                                  setInfant((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportMonth =
                                        passportMonth;
                                    })
                                  );
                                }}
                                value={p.passportMonth}
                                required
                              >
                                <option value="01" selected>Jan</option>
                                <option value="02">Feb</option>
                                <option value="03">Mar</option>
                                <option value="04">Apr</option>
                                <option value="05">May</option>
                                <option value="06">Jun</option>
                                <option value="07">Jul</option>
                                <option value="08">Aug</option>
                                <option value="09">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                              </select>
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const passportYear = e.target.value;
                                  setInfant((ob) =>
                                    produce(ob, (v) => {
                                      v[index].passportYear =
                                        passportYear;
                                    })
                                  );
                                }}
                                value={p.passportYear}
                                required
                              >
                                <option value="">Year</option>
                                <option>2032</option>
                                <option>2031</option>
                                <option>2030</option>
                                <option>2029</option>
                                <option>2028</option>
                                <option>2027</option>
                                <option>2026</option>
                                <option>2025</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="row">
                      {(origin.match("Bangladesh") !== null
                        ? origin.match("Bangladesh")[0]
                        : "") &&
                        (destination.match("Bangladesh") !== null
                          ? destination.match("Bangladesh")[0]
                          : "") === "Bangladesh" ? (
                        <></>
                      ) : (
                        <>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport Copy
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              {p.passportNumber !== "" ? (
                                <input
                                  type={"file"}
                                  accept=".jpg, .jpeg, .png, .pdf"
                                  onChange={(e) =>
                                    handlePassportFileUpload(
                                      3,
                                      index,
                                      e.target.files[0],
                                      p.passportNumber
                                    )
                                  }
                                />
                              ) : (
                                <></>
                              )}

                              {p.passportCopy != null &&
                                p.passportCopy !== "" ? (
                                <a
                                  href={
                                    environment.baseApiURL +
                                    `agentinfo/GetPassengerFile/${p.passportCopy}/1`
                                  }
                                  download
                                  target="_blank"
                                >
                                  Download Passport Copy
                                </a>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* <div>{JSON.stringify(infant, null, 2)}</div> */}
              {/* <div className="row">
                <div className="col-lg-12">
                  <div class="form-check ">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      checked
                    />
                    <label
                      class="form-check-label fw-bold"
                      for="flexCheckDefault"
                    >
                      Add this person to passenger quick pick list
                    </label>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="card my-5">
          <div className="card-body border py-4">
            <h5 className="from-label fw-bold text-start">
              Enter contact details
              {/* <span className="ms-5"> 
                <input class="form-check-input mt-0" type="checkbox"  value={isSubscribed}  id="flexCheckDefault50" onChange={handleChange}/>
                <label class="form-check-label" for="flexCheckDefault50">
                  Optional  Phone Number
                </label>
              </span> */}
            </h5>
            {contact.map((p, index) => {
              return (
                <div key={index}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label float-start fw-bold">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          name="lastName"
                          className="form-control"
                          onChange={(e) => {
                            const email = e.target.value;
                            setContact((ob) =>
                              produce(ob, (v) => {
                                v[index].email = email;
                              })
                            );
                          }}
                          value={p.email}
                          placeholder="Email"
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-label float-start fw-bold">
                          Phone Number <span className="text-danger">*</span>
                        </label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend w-100">
                            <select
                              id="name"
                              placeholder="Title"
                              className="form-select"
                              style={{ width: "9rem" }}
                              onChange={(e) => {
                                const nationality = e.target.value;
                                setContact((ob) =>
                                  produce(ob, (v) => {
                                    v[index].nationality = nationality;
                                    v[index].mobailCode = courtries.filter((item) => item.code === nationality)[0].dial_code;
                                  })
                                );
                              }}
                              value={p.nationality}
                              required
                            >
                              <option value="BD">Bangladesh</option>
                              {courtries.map((item, index) => {
                                return (
                                  <option key={index} value={item.code}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            <select
                              id="name"
                              placeholder="Title"
                              className="form-select titel-width"
                              // onChange={(e) => {
                              //   const mobailCode = e.target.value;
                              //   setContact((ob) =>
                              //     produce(ob, (v) => {
                              //       v[index].mobailCode = mobailCode;
                              //     })
                              //   );
                              // }}
                              value={p.mobailCode}
                              required
                              disabled
                            >
                              <option value={courtries.filter((item) => item.code === contact[0].nationality)[0].dial_code}>{courtries.filter((item) => item.code === contact[0].nationality)[0].dial_code}</option>
                              {/* {courtries.map((item, index) => {
                                return (
                                  <option key={index} value={item.dial_code}>
                                    {item.dial_code}
                                  </option>
                                );
                              })} */}
                            </select>
                            <input
                              type="number"
                              name="phoneNumber"
                              className="form-control"
                              onChange={(e) => {
                                const mobailNumber = e.target.value;
                                setContact((ob) =>
                                  produce(ob, (v) => {
                                    v[index].mobailNumber = mobailNumber;
                                  })
                                );
                              }}
                              value={p.mobailNumber}
                              placeholder="Phone Number"
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {
                    isSubscribed ? <>
                     <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-label float-start fw-bold">
                        Optional  Phone Number
                        </label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend w-100">
                            <select
                              id="name"
                              placeholder="Title"
                              className="form-select"
                              style={{ width: "9rem" }}
                              onChange={(e) => {
                                const nationality = e.target.value;
                                setContact((ob) =>
                                  produce(ob, (v) => {
                                    v[index].nationality = nationality;
                                    v[index].mobailCode = courtries.filter((item) => item.code === nationality)[0].dial_code;
                                  })
                                );
                              }}
                              value={p.nationality}
                              required
                            >
                              <option value="BD">Bangladesh</option>
                              {courtries.map((item, index) => {
                                return (
                                  <option key={index} value={item.code}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            <select
                              id="name"
                              placeholder="Title"
                              className="form-select titel-width"
                              value={p.mobailCode}
                              required
                              disabled
                            >
                              <option value={courtries.filter((item) => item.code === contact[0].nationality)[0].dial_code}>{courtries.filter((item) => item.code === contact[0].nationality)[0].dial_code}</option>
                            </select>
                            <input
                              type="number"
                              name="phoneNumber"
                              className="form-control"
                              onChange={(e) => {
                                const mobailNumber = e.target.value;
                                setContact((ob) =>
                                  produce(ob, (v) => {
                                    v[index].mobailNumber = mobailNumber;
                                  })
                                );
                              }}
                              value={p.mobailNumber}
                              placeholder="Phone Number"
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    </> : <>
                    </>
                  } */}
                </div>
              );
            })}
            <div className="row">
              <div className="col-lg-12">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={handleClick}
                  />
                  <label class="form-check-label font-size-checkbok" for="flexCheckDefault">
                    By Booking/Issuing this Ticket I agree to{" "}
                    <Link to="/termandcondition">Triplover Terms & Conditions</Link>
                  </label>
                </div>
              </div>
            </div>
            {click ? (
              <>
                <div className="row mt-2">
                  <div className="col-lg-12 text-center">
                    <button
                      type="submit"
                      className="btn button-color text-white fw-bold w-25 mt-2 rounded btn-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* <div>{JSON.stringify(contact, null, 2)}</div> */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default LeftSide;
