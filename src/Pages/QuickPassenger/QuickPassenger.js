import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import axios from "axios";
import { add } from "date-fns";
import $ from "jquery";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiEdit } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCountryNameFomCountryCode,
  ISODateFormatter,
  isValidEmail
} from "../../common/functions";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import courtries from "../../JSON/countries.json";
import Footer from "../SharePages/Footer/Footer";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";

import { environment } from "../SharePages/Utility/environment";
const QuickPassenger = () => {
  let [pageCount, setPageCount] = useState(0);
  let [pageSize, setPageSize] = useState(10);
  let [currentPageNumber, setCurrentPageNumber] = useState(1);
  let [currentItem, setCurrentItem] = useState({});
  let [passengerList, setPassengerList] = useState([]);
  let [passengerType, setPassengerType] = useState("ADT");
  let [passportExDate, setpassportExDate] = useState();
  let [title, setTitle] = useState("");
  let [firstName, setFirstName] = useState("");
  let [middleName, setMiddleName] = useState("");
  let [lastName, setLastName] = useState("");
  // let [dobDay, setDOBDay] = useState("");
  // let [dobMonth, setDOBMonth] = useState("");
  // let [dobYear, setDOBYear] = useState("");
  let [dob, setDOB] = useState(new Date());
  let [dobMinMax, setDobMinMax] = useState({ min: "", max: "" });
  let [nationality, setNationality] = useState("BD");
  let [gender, setGender] = useState("Male");
  let [passportNo, setPassportNo] = useState("");
  let [issuingCountry, setIssuingCountry] = useState("");
  // let [peDay, setPEDay] = useState("");
  // let [peMonth, setPEMonth] = useState("");
  // let [peYear, setPEYear] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [phoneCountryCode, setPhoneCountryCode] = useState("+88");
  let [cityList, setCityList] = useState([]);
  let [cityName, setCityName] = useState("");
  let [passportFileName, setPassportFileName] = useState("");
  let [visaFileName, setVisaFileName] = useState("");
  // let s3URL = "https://tlluploaddocument.s3.ap-southeast-1.amazonaws.com/";
  let staticURL = "wwwroot/Uploads/Support/";
  let [loading, setLoading] = useState(false);
  console.log({ passengerList });
  const passCopy = useRef()
  const visaCopy = useRef()
  const formReset = useRef()
  // const outSideClick = useRef()
  const [fileError, setFileError] = useState(false)
  const handleClickOutside = () => {
    formReset.current.reset()
  };
  const outSideClick = useOutsideClick(handleClickOutside);

  const handleRestrict = () => {
    if (passportNo === "" || passportNo === null || passportNo === undefined) {
      setFileError(true)
      toast.error("Please select passport number then try again.")
      passCopy.current.disabled = true
      visaCopy.current.disabled = true
    }

  }

  useEffect(() => {
    if (passportNo.length > 0) {
      setFileError(false)
      passCopy.current.disabled = false
      visaCopy.current.disabled = false
    }

  }, [passportNo])
  const handlePassportFileUpload = (file) => {
    console.log({ file });
    let fileExt = file.name.split(".").pop().toLowerCase();
    if (
      fileExt === "jpg" ||
      fileExt === "jpeg" ||
      fileExt === "png" ||
      fileExt === "pdf"
    ) {
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
        setPassportFileName(response.data.fileName);
      };
      postData();
    } else {
      toast.error("Sorry! file format not valid..");
    }
  };
  const handleVisaFileUpload = (file) => {
    let fileExt = file.name.split(".").pop().toLowerCase();
    if (
      fileExt === "jpg" ||
      fileExt === "jpeg" ||
      fileExt === "png" ||
      fileExt === "pdf"
    ) {
      setVisaFileName(file.name);
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
        setVisaFileName(response.data.fileName);
      };
      postData();
    } else {
      toast.error("Sorry! file format not valid..");
    }
  };

  const handleGetPassengers = (currentPage) => {
    const getData = async () => {
      let sendObj = {
        AgentId: sessionStorage.getItem("agentId") ?? 0,
        SearchText: "",
      };
      const response = await axios.post(
        environment.getAgentPassengers +
        `?pageNumber=${currentPage}&pageSize=${pageSize}`,
        sendObj,
        environment.headerToken
      );
      // console.log(response.data.data)
      setPassengerList(response.data.data);
      setPageCount(await response.data.totalPages);
      // console.log(response.data);
    };
    getData();
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
  };
  const clearForm = () => {
    setCurrentItem(null);
    setTitle("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    // setDOBYear("");
    // setDOBMonth("");
    // setDOBDay("");
    setDOB("");
    setNationality("BD");
    setGender("Male");
    setPassportNo("");
    setIssuingCountry("");
    setpassportExDate("");
    setPhone("");
    setEmail("");
    setPhoneCountryCode("+88");
    setCityName("");
    setPassengerType("ADT");
  };
  const handleCreateItem = () => {
    clearForm();
  };
  const handleEditItem = (item) => {
    setCurrentItem(item);
    setTitle(item.title);
    setFirstName(item.first);
    setMiddleName(item.middle);
    setLastName(item.last);
    setDOB(item.dateOfBirth === null ? null : ISODateFormatter(item.dateOfBirth));
    setNationality(item.nationality);
    setGender(item.gender);
    setPassportNo(item.documentNumber);
    setpassportExDate(
      item.expireDate === null ? null : ISODateFormatter(item.expireDate)
    );
    setIssuingCountry(item.documentIssuingCountry);
    setPhone(item.phone);
    setEmail(item.email);
    setPhoneCountryCode(item.phoneCountryCode);
    setCityName(item.cityName);
    setPassengerType(item.passengerType);
  };
  const handleDeleteItem = (item) => {
    let result = window.confirm("Are you sure");
    if (result) {
      const putData = async () => {
        setLoading(true);
        const response = await axios
          .put(
            environment.deleteAgentPassenger + "/" + item.id,
            sendObj,
            environment.headerToken
          )
          .catch((error) => {
            console.log(error);
          });
        // console.log(response);
        if (response !== undefined && response.data > 0) {
          handleGetPassengers(currentPageNumber);
          toast.success("Passenger deleted successfully..");
          setLoading(false);
        } else {
          toast.error("Please try again..");
          setLoading(false);
        }
      };
      putData();
    }
  };
  let sendObj = {
    id: currentItem === null ? 0 : currentItem.id,
    agentId: sessionStorage.getItem("agentId") ?? 0,
    passengerType: passengerType,
    title: title,
    first: firstName,
    middle: middleName,
    last: lastName,
    dateOfBirth: dob,
    nationality: nationality,
    gender: gender,
    documentNumber: passportNo,
    documentIssuingCountry: issuingCountry,
    expireDate: passportExDate,
    phone: phone,
    email: email,
    phoneCountryCode: phoneCountryCode,
    cityName: cityName,
    passportCopy: passportFileName,
    visaCopy: visaFileName,
  };

  const handleSubmit = () => {
    if (title === "") {
      toast.error("Sorry! Title is empty..");
      return;
    }
    if (firstName === "") {
      toast.error("Sorry! First Name is empty..");
      return;
    }
    if (lastName === "") {
      toast.error("Sorry! Last Name is empty..");
      return;
    }
    if (email === "") {
      toast.error("Sorry! Email is empty..");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("You have entered an invalid email address!");
      return;
    }
    if (dob === "") {
      toast.error("Sorry! DOB is not selected..");
      return;
    }

    if (sendObj.id > 0) {
      const putData = async () => {
        setLoading(true);
        const response = await axios
          .post(
            environment.saveAgentPassenger,
            sendObj,
            environment.headerToken
          )
          .catch((error) => {
            console.log(error);
          });

        if (response !== undefined && response.data > 0) {
          handleGetPassengers(currentPageNumber);
          clearForm();
          toast.success("Passenger updated successfully..");
          $("#modal-close").click();
          $(".modal-backdrop").remove();
          $("body").removeClass("modal-open");
          $("body").removeAttr("style");
          setLoading(false);
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
      };
      putData();
    } else {
      const postData = async () => {
        setLoading(true);
        const response = await axios
          .post(
            environment.saveAgentPassenger,
            sendObj,
            environment.headerToken
          )
          .catch((error) => {
            console.log(error);
          });
        // console.log(response);
        if (response !== undefined && response.data > 0) {
          handleGetPassengers(1);
          clearForm();
          toast.success("Passenger added successfully..");
          $("#modal-close").click();
          $(".modal-backdrop").remove();
          $("body").removeClass("modal-open");
          $("body").removeAttr("style");
          setLoading(false);
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
      };
      postData();
    }
  };
  const handleClear = () => {
    console.log({ visaCopy }, { passCopy })
  }
  const passengerTypeFuc = (passengerType) => {
    switch (passengerType) {
      case "ADT":
        setDobMinMax({
          min: null,
          max: ISODateFormatter(
            add(new Date(), {
              years: -12,
            })
          ),
        });
        break;
      case "CNN":
        setDobMinMax({
          min: ISODateFormatter(
            add(new Date(), {
              years: -12,
            })
          ),
          max: ISODateFormatter(
            add(new Date(), {
              years: -2,
            })
          ),
        });
        break;
      case "INF":
        setDobMinMax({
          min: ISODateFormatter(
            add(new Date(), {
              years: -2,
            })
          ),
          max: ISODateFormatter(new Date()),
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    passengerTypeFuc(passengerType);
    handleGetPassengers(currentPageNumber);
  }, [currentPageNumber, passengerType]);

  const getCityData = async (countryName) => {
    console.log({ countryName });

    const response = await axios.get(
      environment.getcityListbycountryName + "/" + countryName
    );
    if (response.data.length > 0) {
      setCityList(response.data);
      // console.log(cityList);
    }
  };
  useEffect(() => {
    getCityData("Bangladesh");
  }, []);

  const handleCountryChange = (e) => {
    console.log({ e });
    const country = getCountryNameFomCountryCode(e.target.value);
    setNationality(e.target.value);
    getCityData(country);
  };
  console.log({ courtries });
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper search-panel-bg px-4">
        <section className="content-header"></section>
        <ToastContainer position="bottom-right" autoClose={1500} />
        <section className="content">
          <div className="mx-5 mt-3" style={{ minHeight: "500px" }}>
            <div className="card pb-5">
              <div className="card-body">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tp1">
                    <span className="mt-1 fs-4">Add Passenger</span>
                    <ul id="menu-standard">
                      <li id="menu-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-sm btn-secondary float-right mr-1 d-print-none rounded text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#accountModal"
                          onClick={() => handleCreateItem()}
                          style={{ fontSize: "12px" }}
                        >
                          <span className="me-1">
                            <i className="fas fa-user-plus"></i>
                          </span>{" "}
                          Add
                        </a>
                      </li>
                    </ul>
                    <table
                      className="table table-bordered text-center mt-1 table-sm"
                      style={{ width: "100%", fontSize: "13px" }}
                    >
                      <thead className="text-center fw-bold bg-secondary">
                        <tr>
                          <th>SL</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>DOB</th>
                          <th>Gender</th>
                          <th>Passport Number</th>
                          <th>Passport Expire Date</th>
                          <th>Passport Copy</th>
                          <th>Visa Copy</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="lh-1 tbody">
                        {passengerList.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {item.title +
                                  " " +
                                  item.first +
                                  " " +
                                  item.middle +
                                  " " +
                                  item.last}{" "}
                                ({item.passengerType})
                              </td>
                              <td>{item.email}</td>
                              <td>  
                                {item.dateOfBirth === null
                                  ? "N/A"
                                  : moment(item.dateOfBirth).format(
                                    "DD-MMMM-yyyy"
                                  )}
                              </td>
                              <td>{item.gender}</td>
                              <td>
                                {item.documentNumber === ""
                                  ? "N/A"
                                  : item.documentNumber}
                              </td>
                              <td>
                                {item.expireDate === null
                                  ? "N/A"
                                  : moment(item.expireDate).format(
                                    "DD-MMMM-yyyy"
                                  )}
                              </td>

                              <td>
                                {item.passportCopy !== null &&
                                  item.passportCopy !== "" ? (
                                  <a
                                    href={
                                      environment.s3URL + `${item.passportCopy}`
                                    }
                                    download
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Passport Copy
                                  </a>
                                ) : (
                                  <>N/A</>
                                )}
                              </td>
                              <td>
                                {item.visaCopy != null &&
                                  item.visaCopy != "" ? (
                                  <a
                                    href={
                                      environment.s3URL + `${item.visaCopy}`
                                    }
                                    download
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Visa Copy
                                  </a>
                                ) : (
                                  <>N/A</>
                                )}
                              </td>
                              {/* <td>
                                <span onClick={() => handleDeleteItem(item)} className="text-danger"><i class="fa fa-trash" aria-hidden="true"></i></span>
                              </td> */}

                              <td>
                                <a
                                  onClick={() => handleEditItem(item)}
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#accountModal"
                                >
                                  <HStack justifyContent="center">
                                    <Icon
                                      as={BiEdit}
                                      h="18px"
                                      w="18px"
                                      color={"logoGreen"}
                                    />
                                    <Text>Edit</Text>
                                  </HStack>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <ReactPaginate
                      previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination justify-content-center"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={outSideClick}
              className="modal fade"
              id="accountModal"
              tabIndex={-1}
              aria-labelledby="accountModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <form ref={formReset}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="accountModalLabel">
                        {currentItem === null ? "Add" : "Edit"} Passenger
                      </h5>
                      <button
                        onClick={() => formReset.current.reset()}
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        id="modal-close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="border p-2 my-3">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <select
                                id="name"
                                placeholder="Passenger Type"
                                className="form-select titel-width rounded"
                                onChange={(e) => setPassengerType(e.target.value)}
                                required
                                value={passengerType}
                              >
                                <option value="ADT"> Adult</option>
                                <option value="CNN"> Child</option>
                                <option value="INF"> Infant</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-label float-start fw-bold">
                                First name <span className="text-danger">*</span>
                              </label>
                              <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                  <select
                                    id="name"
                                    placeholder="Title"
                                    className="form-select titel-width rounded-start"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                  >
                                    <option value=""> Title</option>
                                    {passengerType === "ADT" ? (
                                      <>
                                        <option value="Mr"> Mr</option>
                                        <option value="Ms"> Ms</option>
                                        <option value="Mrs"> Mrs</option>
                                      </>
                                    ) : (
                                      <>
                                        <option value="Mstr">Mstr</option>
                                        <option value="Miss">Miss</option>
                                      </>
                                    )}
                                  </select>
                                  <input
                                    name="firstName"
                                    className="form-control rounded-end"
                                    onChange={(e) => {
                                      setFirstName(e.target.value);
                                      const result = add(new Date(), {
                                        years: -2,
                                      });
                                      console.log({ result });
                                    }}
                                    value={firstName}
                                    required
                                    autoComplete="off"
                                    placeholder="First Name"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                type=""
                              >
                                Last name <span className="text-danger">*</span>
                              </label>
                              <input
                                name="lastName"
                                className="form-control rounded"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                required
                                autoComplete="off"
                                placeholder="Last Name"
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
                                  className="form-select rounded"
                                  onChange={(e) => setGender(e.target.value)}
                                  value={gender}
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
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="float-start fw-bold" type="">
                                Date of birth
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-group mb-3 d-flex">
                                <Box
                                  border="1px solid #ced4da"
                                  borderRadius="4px"
                                  w="100%"
                                  h="40px"
                                  pt="6px"
                                  pl="8px"
                                >
                                  <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    selected={
                                      dob?.length === 10 ? new Date(dob) : dob
                                    }
                                    onChange={(date) =>
                                      date !== "" && setDOB(date)
                                    }
                                    placeholderText="dd/mm/yyyy"
                                    minDate={new Date(dobMinMax?.min)}
                                    maxDate={new Date(dobMinMax?.max)}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                  />
                                </Box>

                                {/* <input
                                type={"date"}
                                data-date=""
                                data-date-format="DD/MM/YYYY"
                                pattern="\d{4}-\d{2}-\d{2}"
                                name="dateOfBirth"
                                className="form-control rounded"
                                onChange={(e) => {
                                  setDOB(e.target.value);
                                }}
                                value={
                                  currentItem !== null
                                    ? dob
                                    : ISODateFormatter(dobMinMax?.max)
                                }
                                min={dobMinMax?.min}
                                max={dobMinMax?.max}
                                required
                                autoComplete="off"
                                placeholder="Date of Birth"
                              /> */}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label className="float-start fw-bold" type="">
                                Nationality <span className="text-danger">*</span>
                              </label>
                              <div className="input-group mb-3">
                                <select
                                  name="nationality"
                                  className="form-select rounded"
                                  onChange={(e) => handleCountryChange(e)}
                                  value={nationality}
                                  required
                                >
                                  <option value="BD" selected>
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
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                City
                                {/* <span className="text-danger">*</span> */}
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <select
                                class="form-select rounded"
                                aria-label="City"
                                onChange={(e) => setCityName(e.target.value)}
                              >
                                <option selected>Select City</option>
                                {cityList.map((item, index) => {
                                  return (
                                    <option key={index} value={item.name}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label className="float-start fw-bold" htmlFor="">
                                Email
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className=" mb-3">
                              <input
                                type="email"
                                className="form-control rounded"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                autoComplete="off"
                                placeholder="Email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport number{" "}
                                {/* <span className="text-danger">*</span> */}
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control rounded"
                                name="passport-number"
                                onChange={(e) => setPassportNo(e.target.value)}
                                value={passportNo}
                                autoComplete="off"
                                placeholder="Passport Number"
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
                                {/* <span className="text-danger">*</span> */}
                              </label>
                            </div>
                            <div className="input-group mb-3">
                              <select
                                className="form-select rounded"
                                onChange={(e) => handleCountryChange(e)}
                                value={issuingCountry}
                              // required
                              >
                                <option value="">Issuing Country</option>
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
                                {/* <span className="text-danger">*</span> */}
                              </label>
                            </div>
                            <div className="input-group mb-3 d-flex">
                              {/* {
                              <Text color="red">{passportExDate === null ? "NAI" : "ASE"}</Text>
                              
                            } */}
                              <Box
                                border="1px solid #ced4da"
                                borderRadius="4px"
                                w="100%"
                                h="40px"
                                pt="6px"
                                pl="8px"
                              >
                                <DatePicker
                                  dateFormat="dd/MM/yyyy"
                                  selected={
                                    passportExDate !== null &&
                                      passportExDate?.length === 10
                                      ? new Date(passportExDate)
                                      : passportExDate
                                  }
                                  onChange={(date) =>
                                    date !== "" && setpassportExDate(date)
                                  }
                                  placeholderText="dd/mm/yyyy"
                                  minDate={new Date()}
                                  maxDate={new Date("2199-12-30")}
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                />
                              </Box>

                              {/* <input
                              type={"date"}
                              data-date=""
                              data-date-format="DD/MM/YYYY"
                              name="passportExDate"
                              className="form-control rounded"
                              onChange={(e) => {
                                setpassportExDate(e.target.value);
                              }}
                              value={
                                currentItem !== null
                                  ? passportExDate
                                  : ISODateFormatter(new Date())
                              }
                              min={ISODateFormatter(new Date())}
                              autoComplete="off"
                              required
                              pattern="\d{4}-\d{2}-\d{2}"
                              max="9999-12-31"
                              placeholder="Passport Expaire Date"
                            /> */}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Passport Copy
                              </label>
                            </div>
                            <div className="mb-3">
                              <input
                                ref={passCopy}
                                onClick={() => handleRestrict()}
                                type={"file"}
                                accept=".jpg, .jpeg, .png, .pdf"
                                className="form-control rounded"
                                onChange={(e) =>
                                  handlePassportFileUpload(e.target.files[0])
                                }
                              />
                              {fileError && (<p style={{ color: "red" }}>Please select passport number then try again.</p>)}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                htmlFor=""
                              >
                                Visa Copy
                              </label>
                            </div>
                            <div className="mb-3 ">
                              <input
                                ref={visaCopy}
                                type={"file"}
                                accept=".jpg, .jpeg, .png, .pdf"
                                className="form-control rounded"
                                onClick={() => handleRestrict()}
                                onChange={(e) =>
                                  handleVisaFileUpload(e.target.files[0])
                                }
                              />
                              {fileError && (<p style={{ color: "red" }}>Please select passport number then try again.</p>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="reset"
                        className="btn btn-secondary rounded btn-sm"
                        data-bs-dismiss="modal"
                        onClick={() => handleClear()}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn button-color text-white rounded btn-sm"
                        onClick={() => handleSubmit()}
                        disabled={loading ? true : false}
                      >
                        {loading ? (
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <span>
                            {" "}
                            {currentItem === null ? "Submit" : "Update"}
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
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

export default QuickPassenger;
