import React, { useEffect, useState } from "react";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import Navbar from "../SharePages/Navbar/Navbar";
import axios from "axios";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import courtries from "../../JSON/countries.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';
import Footer from "../SharePages/Footer/Footer";
const QuickPassenger = () => {
  let [pageCount, setPageCount] = useState(0);
  let [pageSize, setPageSize] = useState(10);
  let [currentPageNumber,setCurrentPageNumber]=useState(1);
  let [currentItem, setCurrentItem] = useState({});
  let [passengerList, setPassengerList] = useState([]);
  let [passengerType, setPassengerType] = useState("ADT");
  let [title, setTitle] = useState("");
  let [firstName, setFirstName] = useState("");
  let [middleName, setMiddleName] = useState("");
  let [lastName, setLastName] = useState("");
  let [dobDay, setDOBDay] = useState("");
  let [dobMonth, setDOBMonth] = useState("");
  let [dobYear, setDOBYear] = useState("");
  let [nationality, setNationality] = useState("BD");
  let [gender, setGender] = useState("Male");
  let [passportNo, setPassportNo] = useState("");
  let [issuingCountry, setIssuingCountry] = useState("");
  let [peDay, setPEDay] = useState("");
  let [peMonth, setPEMonth] = useState("");
  let [peYear, setPEYear] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [phoneCountryCode, setPhoneCountryCode] = useState("+88");
  let [cityName, setCityName] = useState("");
  let yearList = [];
  let [passportFileName, setPassportFileName] = useState("");
  let [visaFileName, setVisaFileName] = useState("");
  const handlePassportFileUpload = (file) => {
    let fileExt = file.name.split(".").pop().toLowerCase();
    if (
      (
        fileExt === "jpg" ||
        fileExt === "jpeg" ||
        fileExt === "png" ||
        fileExt === "pdf"
      )
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
    }
   else {
    toast.error("Sorry! file format not valid..");
    }
  };
  const handleVisaFileUpload = (file) => {
    let fileExt = file.name.split(".").pop().toLowerCase();
    if (
      (
        fileExt === "jpg" ||
        fileExt === "jpeg" ||
        fileExt === "png" ||
        fileExt === "pdf"
      )
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
  }
  else {
   toast.error("Sorry! file format not valid..");
   }
  };
  var thisYear = new Date().getFullYear();

  if (passengerType === "ADT") {
    yearList = [];
    for (var i = 12; i <= 100; i++) {
      var year = thisYear - i;
      yearList.push(year);
    }
  } else if (passengerType === "CNN") {
    yearList = [];
    for (var i = 2; i <= 12; i++) {
      var year = thisYear - i;
      yearList.push(year);
    }
  } else if (passengerType === "INF") {
    yearList = [];
    for (var i = 1; i <= 2; i++) {
      var year = thisYear - i;
      yearList.push(year);
    }
  }

  const handleGetPassengers = (currentPage) => {
    const getData = async () => {
      let sendObj = {
        AgentId: sessionStorage.getItem("agentId") ?? 0,
        SearchText: "",
      };
      const response = await axios.post(
        environment.getAgentPassengers+`?pageNumber=${currentPage}&pageSize=${pageSize}`,
        sendObj,
        environment.headerToken
      );
      console.log(response.data.data)
      setPassengerList(response.data.data);
      setPageCount(await response.data.totalPages);
      console.log(response.data);
    };
    getData();
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
  };
  const clearForm=()=>{
    setCurrentItem(null);
    setTitle("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setDOBYear("");
    setDOBMonth("");
    setDOBDay("");
    setNationality("BD");
    setGender("Male");
    setPassportNo("");
    setIssuingCountry("");
    setPEYear("");
    setPEMonth("");
    setPEDay("");
    setPhone("");
    setEmail("");
    setPhoneCountryCode("+88");
    setCityName("");
    setPassengerType("ADT");
  }
  const handleCreateItem = () => {
    clearForm();
  };
  const handleEditItem = (item) => {
    console.log(item);
    setCurrentItem(item);
    setTitle(item.title);
    setFirstName(item.first);
    setMiddleName(item.middle);
    setLastName(item.last);
    setDOBYear(item.dateOfBirth.split("-")[0]);
    setDOBMonth(Number(item.dateOfBirth.split("-")[1]));
    setDOBDay(Number(item.dateOfBirth.split("-")[2].split("T")[0]));
    setNationality(item.nationality);
    setGender(item.gender);
    setPassportNo(item.documentNumber);
    setIssuingCountry(item.documentIssuingCountry);
    setPEYear(item.expireDate.split("-")[0]);
    setPEMonth(Number(item.expireDate.split("-")[1]));
    setPEDay(Number(item.expireDate.split("-")[2].split("T")[0]));
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
        const response = await axios
          .put(
            environment.deleteAgentPassenger + "/" + item.id,
            sendObj,
            environment.headerToken
          )
          .catch((error) => {
            console.log(error);
          });
        console.log(response);
        if (response !== undefined && response.data > 0) {
          handleGetPassengers();
          toast.success("Thanks! Data deleted successfully..");
        } else {
          toast.error("Sorry! Data not deleted..");
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
    dateOfBirth: dobYear + "-" + dobMonth + "-" + dobDay,
    nationality: nationality,
    gender: gender,
    documentNumber: passportNo,
    documentIssuingCountry: issuingCountry,
    expireDate: (peYear=="" || peMonth=="" || peDay=="")?null:(peYear + "-" + peMonth + "-" + peDay),
    phone: phone,
    email: email,
    phoneCountryCode: phoneCountryCode,
    cityName: cityName,
    passportCopy: passportFileName,
    visaCopy: visaFileName,
  };
  const handleSubmit = () => {
    if(firstName===""){
      toast.error("Sorry! First Name is empty..")
      return;
    }
    if(lastName===""){
      toast.error("Sorry! Last Name is empty..")
      return;
    }
    if(dobYear=="" || dobMonth=="" || dobDay==""){
      toast.error("Sorry! DOB is not selected..")
      return;
    }

    // if(passportNo===""){
    //   toast.error("Sorry! Passport no is empty..")
    //   return;
    // }
    // if(peYear=="" || peMonth=="" || peDay==""){
    //   toast.error("Sorry! Passport expiry date is not selected..")
    //   return;
    // }
    // if(passportFileName===""){
    //   toast.error("Sorry! Passport file is empty..")
    //   return;
    // }
    // if(visaFileName===""){
    //   toast.error("Sorry! VISA file is empty..")
    //   return;
    // }
    console.log(sendObj);
    if (sendObj.id > 0) {
      const putData = async () => {
        const response = await axios
          .post(
            environment.saveAgentPassenger,
            sendObj,
            environment.headerToken
          )
          .catch((error) => {
            console.log(error);
          });
        console.log(response);
        if (response !== undefined && response.data > 0) {
          handleGetPassengers(currentPageNumber);
          clearForm();
          toast.success("Thanks! Data updated successfully..");
        } else {
          toast.error("Sorry! Data not updated..");
        }
        
      };
      putData();
    } else {
      const postData = async () => {

        const response = await axios.post(
            environment.saveAgentPassenger,
            sendObj,
            environment.headerToken
          )
          .catch((error) => {
            console.log(error);
          });
        console.log(response);
        if (response !== undefined && response.data > 0) {
          handleGetPassengers(1);
          clearForm();
          toast.success("Thanks! Data created successfully..");
        } else {
          toast.error("Sorry! Data not created..");
        }
      };
      postData();
    }
  };
  useEffect(() => {
    handleGetPassengers(currentPageNumber);
  }, [currentPageNumber]);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper search-panel-bg px-4">
        <section className="content-header"></section>
        <ToastContainer />
        <section className="content">
          <div className="mx-5 mt-3" style={{ minHeight: "500px" }}>
            <div className="card pb-5">
              <div className="card-body">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tp1">
                    <span className="mt-1 fs-4">Quick Passenger List</span>
                    <ul id="menu-standard">
                      <li id="menu-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-sm button-color float-right mr-1 d-print-none rounded text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#accountModal"
                          onClick={() => handleCreateItem()}
                        >
                          <span className="me-1">
                            <i class="fas fa-user-plus"></i>
                          </span>{" "}
                          Add quick passenger
                        </a>
                      </li>
                    </ul>
                    <table className="table table-bordered align-middle table-striped text-center mt-3">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>DOB</th>
                          <th>Passport Copy</th>
                          <th>Visa Copy</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="lh-1">
                        {passengerList.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <a
                                  onClick={() => handleEditItem(item)}
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#accountModal"
                                >
                                  {item.title +
                                    " " +
                                    item.first +
                                    " " +
                                    item.middle +
                                    " " +
                                    item.last}
                                </a>
                              </td>
                              <td>{item.email}</td>
                              <td>{item.phone}</td>
                              <td>
                                {moment(item.dateOfBirth).format(
                                  "DD-MMMM-yyyy"
                                )}
                              </td>
                              <td>
                                {item.passportCopy != null &&
                                item.passportCopy != "" ? (
                                  <a
                                    href={
                                      environment.baseApiURL +
                                      `agentinfo/GetPassengerFile/${item.passportCopy}/1`
                                    }
                                    download
                                    target="_blank"
                                  >
                                    Passport Copy
                                  </a>
                                ) : (
                                  <></>
                                )}
                              </td>
                              <td>
                                {item.visaCopy != null &&
                                item.visaCopy != "" ? (
                                  <a
                                    href={
                                      environment.baseApiURL +
                                      `agentinfo/GetPassengerFile/${item.visaCopy}/2`
                                    }
                                    download
                                    target="_blank"
                                  >
                                    Visa Copy
                                  </a>
                                ) : (
                                  <></>
                                )}
                              </td>
                              <td>
                                <span onClick={() => handleDeleteItem(item)} className="text-danger"><i class="fa fa-trash" aria-hidden="true"></i></span>
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
              className="modal fade"
              id="accountModal"
              tabIndex={-1}
              aria-labelledby="accountModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="accountModalLabel">
                      {currentItem === null ? "Add" : "Edit"} Passenger
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="border p-2 my-3">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            {/* <span>Adult </span> */}
                            <select
                              id="name"
                              placeholder="Passenger Type"
                              className="form-select titel-width"
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
                                  className="form-select titel-width"
                                  onChange={(e) => setTitle(e.target.value)}
                                  value={title}
                                  required
                                >
                                  <option value=""> Title</option>
                                  <option value="Mr"> Mr</option>
                                  <option value="Ms"> Ms</option>
                                  <option value="Mrs"> Mrs</option>
                                </select>
                                <input
                                  name="firstName"
                                  className="form-control"
                                  onChange={(e) => setFirstName(e.target.value)}
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
                              Middle name (Optional)
                            </label>
                            <input
                              name="middleName"
                              className="form-control"
                              onChange={(e) => setMiddleName(e.target.value)}
                              value={middleName}
                              autoComplete="off"
                              placeholder="Middle Name"
                            />
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
                              className="form-control"
                              onChange={(e) => setLastName(e.target.value)}
                              value={lastName}
                              required
                              autoComplete="off"
                              placeholder="Last Name"
                            />
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
                              <select
                                name="date"
                                className="form-select"
                                onChange={(e) => setDOBDay(e.target.value)}
                                value={dobDay}
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
                                onChange={(e) => setDOBMonth(e.target.value)}
                                value={dobMonth}
                                required
                              >
                                <option value="">Mon</option>
                                <option value="1">Jan</option>
                                <option value="2">Feb</option>
                                <option value="3">Mar</option>
                                <option value="4">Apr</option>
                                <option value="5">May</option>
                                <option value="6">Jun</option>
                                <option value="7">Jul</option>
                                <option value="8">Aug</option>
                                <option value="9">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                              </select>
                              <select
                                name="year"
                                className="form-select"
                                onChange={(e) => setDOBYear(e.target.value)}
                                value={dobYear}
                                required
                              >
                                <option value="">Year</option>
                                {yearList.map((i, index) => {
                                  return <option key={index}>{i}</option>;
                                })}
                              </select>
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
                                className="form-select"
                                onChange={(e) => setNationality(e.target.value)}
                                value={nationality}
                                required
                              >
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
                              type=""
                            >
                              Gender <span className="text-danger">*</span>
                            </label>
                            <div className="input-group mb-3">
                              <select
                                name="date"
                                className="form-select"
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
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="input-group mb-3">
                            <select
                              className="form-select"
                              onChange={(e) =>
                                setIssuingCountry(e.target.value)
                              }
                              value={issuingCountry}
                              required
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
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="input-group mb-3 d-flex">
                            <select
                              className="form-select"
                              onChange={(e) => setPEDay(e.target.value)}
                              value={peDay}
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
                              onChange={(e) => setPEMonth(e.target.value)}
                              value={peMonth}
                              required
                            >
                              <option value="">Mon</option>
                              <option value="1">Jan</option>
                              <option value="2">Feb</option>
                              <option value="3">Mar</option>
                              <option value="4">Apr</option>
                              <option value="5">May</option>
                              <option value="6">Jun</option>
                              <option value="7">Jul</option>
                              <option value="8">Aug</option>
                              <option value="9">Sep</option>
                              <option value="10">Oct</option>
                              <option value="11">Nov</option>
                              <option value="12">Dec</option>
                            </select>
                            <select
                              className="form-select"
                              onChange={(e) => setPEYear(e.target.value)}
                              value={peYear}
                              required
                            >
                              <option value="">Year</option>
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

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-label float-start fw-bold"
                              htmlFor=""
                            >
                              City Name
                            </label>
                          </div>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              name="cityName"
                              onChange={(e) => setCityName(e.target.value)}
                              value={cityName}
                              required
                              autoComplete="off"
                              placeholder="City Name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-label float-start fw-bold"
                              htmlFor=""
                            >
                              Phone Number
                            </label>
                          </div>
                          <div className="input-group mb-3">
                            <select
                              id="name"
                              placeholder="Title"
                              className="form-select titel-width"
                              onChange={(e) =>
                                setPhoneCountryCode(e.target.value)
                              }
                              value={phoneCountryCode}
                              required
                            >
                              <option value="+88">+88</option>
                              {courtries.map((item, index) => {
                                return (
                                  <option key={index} value={item.dial_code}>
                                    {item.dial_code}
                                  </option>
                                );
                              })}
                            </select>
                            <input
                              type="number"
                              className="form-control"
                              name="passport-number"
                              onChange={(e) => setPhone(e.target.value)}
                              value={phone}
                              required
                              autoComplete="off"
                              placeholder="Phone"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-label float-start fw-bold"
                              htmlFor=""
                            >
                              Email
                            </label>
                          </div>
                          <div className="input-group mb-3">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              required
                              autoComplete="off"
                              placeholder="Email"
                            />
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
                              Passport Copy
                             
                            </label>
                          </div>
                          <div className="input-group mb-3 d-flex">
                            {passportNo !== "" ? (
                              <input
                                type={"file"}
                                accept=".jpg, .jpeg, .png, .pdf"
                                onChange={(e) =>
                                  handlePassportFileUpload(e.target.files[0])
                                }
                              ></input>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-label float-start fw-bold"
                              htmlFor=""
                            >
                              Visa Copy
                              
                            </label>
                          </div>
                          <div className="input-group mb-3 d-flex">
                            {passportNo !== "" ? (
                              <input
                                type={"file"}
                                accept=".jpg, .jpeg, .png, .pdf"
                                onChange={(e) =>
                                  handleVisaFileUpload(e.target.files[0])
                                }
                              ></input>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary rounded"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn button-color fw-bold text-white rounded"
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
};

export default QuickPassenger;
