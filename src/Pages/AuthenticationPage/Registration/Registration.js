import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Registration.css";
import logo from "../../../images/logo/logo-combined.png";
import courtries from "../../../JSON/countries.json";
import axios from "axios";
import { environment } from "../../SharePages/Utility/environment";
import FooterLR from "../../Optional/FooterLR/FooterLR";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Box, Center } from "@chakra-ui/react";

const Registration = () => {
  let [countryName, setCountryName] = useState("Bangladesh");
  let [zoneList, setZoneList] = useState([]);
  let [agentDialCode, setAgentDialCode] = useState("+880");
  let [agentName, setAgentName] = useState("");
  let [agentPhoneNo, setAgentPhoneNo] = useState("");
  let [agentEmail, setAgentEmail] = useState("");
  let [agentAddress, setAgentAddress] = useState("");
  let [agentContactPerson, setAgentContactPerson] = useState("");
  let [userDialCode, setUserDialCode] = useState("+880");
  let [userFullName, setUserFullName] = useState("");
  let [userPhoneNo, setUserPhoneNo] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [userConfirmPassword, setUserConfirmPassword] = useState("");
  let [postalCode, setPostalCode] = useState("");
  let [zoneId, setZoneId] = useState(null);
  let [cityList, setCityList] = useState([]);
  let [cityId, setCityId] = useState(null);
  const getZoneData = async (countryName) => {
    const responseZ = await axios.get(
      environment.getzoneListbycountryName + "/" + countryName
    );
    if (responseZ.data.length > 0) {
      setZoneList(responseZ.data);

      console.log(zoneList);
    }
  };
  const getCityData = async (countryName) => {
    const response = await axios.get(
      environment.getcityListbycountryName + "/" + countryName
    );
    if (response.data.length > 0) {
      setCityList(response.data);

      console.log(cityList);
    }
  };
  useEffect(() => {
    getZoneData("Bangladesh");
    getCityData("Bangladesh");
  }, []);
  const handleCountryChange = (e) => {
    setCountryName(e.target.value);
    setAgentDialCode(
      courtries.find((i) => i.name === e.target.value).dial_code
    );
    setUserDialCode(courtries.find((i) => i.name === e.target.value).dial_code);
    getZoneData(e.target.value);
    getCityData(e.target.value);
  };
  // const location = useLocation();
  // const navigate = useNavigate();
  // const [loginData, setLoginData] = useState({});

  const handleSubmit = () => {
    if (countryName === "") {
      toast.error("Sorry! Country is not selected");
      return;
    }
    if (postalCode === "") {
      toast.error("Sorry! Postal Code is empty");
      return;
    }
    if (cityId === null) {
      toast.error("Sorry! City is not selected");
      return;
    }
    if (agentName == "") {
      toast.error("Sorry! Company name is empty");
      return;
    }
    if (userFullName == "") {
      toast.error("Sorry! Account name is empty");
      return;
    }
    if (userEmail == "") {
      toast.error("Sorry! Account email is empty");
      return;
    }
    if (agentEmail == "") {
      toast.error("Sorry! Company email is empty");
      return;
    }
    if (userPassword == "") {
      toast.error("Sorry! Password is empty");
      return;
    }
    if (userConfirmPassword == "") {
      toast.error("Sorry! Confirm password is empty");
      return;
    }
    if (userPassword !== userConfirmPassword) {
      toast.error("Sorry! Password does not match");
      return;
    }

    let registerObj = {
      CountryName: countryName,
      ZoneId: zoneId,
      CityId: cityId,
      PostalCode: postalCode,
      FullName: userFullName,
      DialCode: userDialCode,
      Mobile: userPhoneNo,
      Email: userEmail,
      Password: userPassword,
      ConfirmPassword: userConfirmPassword,
      RoleId: 2,
      AgentName: agentName,
      AgentDialCode: agentDialCode,
      AgentMobileNo: agentPhoneNo,
      AgentEmail: agentEmail,
      AgentAddress: agentAddress,
      IsActive: false,
    };
    console.log(registerObj);
    const postData = async () => {
      const response = await axios.post(environment.register, registerObj);
      if (response.data.isSuccess == true) {
        toast.success("Thanks! Registration successfully submited..");
      } else {
        toast.error(response.data.message);
      }
    };
    postData();
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <div className="hold-transition py-5">
      <div className="login-box" style={{ minWidth: "70%", marginLeft: "15%" }}>
        <ToastContainer />

        <div className="card">
          <div className="card-header text-center">
            <img src={logo} alt="Triplover" />
          </div>
          <div className="card-body login-card-body">
            <form>
              <div className="container-fluid">
                <div className="row" style={{ paddingBottom: "10px" }}>
                  <div className="col-lg-3">
                    <select
                      class="form-select rounded"
                      value={countryName}
                      onChange={(e) => handleCountryChange(e)}
                      aria-label="Country"
                    >
                      {courtries.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div class="card">
                      <Box className="card-header text-dark" bg="pink">
                        Company Information
                      </Box>
                      <div class="card-body">
                        <div className="row">
                          <div className="col-lg-12 pb-3">
                            <input
                              type="text"
                              className="form-control rounded"
                              placeholder="Name of the company"
                              onChange={(e) => setAgentName(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control rounded"
                                placeholder="Address"
                                onChange={(e) =>
                                  setAgentAddress(e.target.value)
                                }
                                required
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <span className="fas fa-address-card"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="input-group mb-3">
                              <select
                                class="form-select rounded"
                                aria-label="City"
                                onChange={(e) => setCityId(e.target.value)}
                              >
                                <option selected>Select City</option>
                                {cityList.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control rounded"
                                placeholder="Postal Code"
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <span className="fas fa-user"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="input-group mb-3">
                              <input
                                type="email"
                                className="form-control rounded"
                                placeholder="Email"
                                onChange={(e) => setAgentEmail(e.target.value)}
                                required
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <span className="fas fa-envelope"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="row">
                          <div className="col-lg-12">
                            <div className="input-group mb-3">
                              <select
                                class="form-select rounded"
                                aria-label="Zone"
                                onChange={(e) => setZoneId(e.target.value)}
                              >
                                <option selected>Select Zone</option>
                                {zoneList.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </div> */}

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="input-group mb-3">
                              <select
                                class="form-select col-lg-3 rounded-start"
                                value={agentDialCode}
                                onChange={(e) =>
                                  setAgentDialCode(e.target.value)
                                }
                                aria-label="Country"
                              >
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
                                className="form-control rounded-end"
                                placeholder="Phone Number"
                                onChange={(e) =>
                                  setAgentPhoneNo(e.target.value)
                                }
                                required
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <span className="fas fa-phone"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="row">
                          <div className="col-lg-12">
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control rounded"
                                placeholder="Contact Person"
                                onChange={(e) =>
                                  setAgentContactPerson(e.target.value)
                                }
                                required
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <span className="fas fa-user"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-1"></div> */}
                  <div className="col-lg-6">
                    <div class="card">
                      <Box className="card-header text-dark" bg="pink">
                        User Information
                      </Box>
                      <div class="card-body">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control rounded"
                                placeholder="Full Name"
                                onChange={(e) =>
                                  setUserFullName(e.target.value)
                                }
                                required
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <span className="fas fa-user"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="input-group mb-3">
                              <input
                                type="email"
                                className="form-control rounded"
                                placeholder="Email"
                                onChange={(e) => setUserEmail(e.target.value)}
                                required
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <span className="fas fa-envelope"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="input-group mb-3">
                              <input
                                type="password"
                                className="form-control rounded"
                                placeholder="Password"
                                onChange={(e) =>
                                  setUserPassword(e.target.value)
                                }
                                required
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <span className="fas fa-lock"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-group mb-3">
                              <input
                                type="password"
                                className="form-control rounded"
                                placeholder="Confirm Password"
                                onChange={(e) =>
                                  setUserConfirmPassword(e.target.value)
                                }
                                required
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <span className="fas fa-lock"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="input-group mb-3">
                              <select
                                class="form-select col-lg-3 rounded-start"
                                value={userDialCode}
                                onChange={(e) =>
                                  setUserDialCode(e.target.value)
                                }
                                aria-label="Country"
                              >
                                {courtries.map((item, index) => {
                                  return (
                                    <option key={index} value={item.dial_code}>
                                      {item.dial_code}
                                    </option>
                                  );
                                })}
                              </select>
                              <input
                                type="text"
                                className="form-control rounded-end"
                                placeholder="Phone Number"
                                onChange={(e) => setUserPhoneNo(e.target.value)}
                                required
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <span className="fas fa-phone"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div
                              className="input-group"
                              style={{ marginBottom: "1.8rem" }}
                            >
                              <ReCAPTCHA
                                sitekey="6LfzGsUgAAAAACI2Gfqgw7mwc_IdT5MA7ZIs71wZ"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-lg-12 mt-4">
                  <button
                    type="button"
                    className="btn button-color text-white fw-bold btn-block w-25 mx-auto rounded btn-sm"
                    onClick={() => handleSubmit()}
                  >
                    Sign Up
                  </button>
                </div>
              </div> */}

              <Box
                my={4}
                w="400px"
                h="55px"
                bg="gradient"
                color="white"
                fontSize="16px"
                fontWeight={400}
                borderRadius="6px"
                _hover={{ opacity: 0.9 }}
                type="button"
                className="btn button-color text-white fw-bold btn-block w-25 mx-auto rounded btn-sm"
                onClick={() => handleSubmit()}
              >
                <Center h="100%"> Sign Up</Center>
              </Box>

              <p className="my-2 font-size text-center">
                Already have account
                <Link to="/">
                  <span className="fw-bold ms-1" style={{ color: "#1d94e4" }}>
                    Sign In
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="login-form">
        <FooterLR></FooterLR>
      </div> */}
    </div>
  );
};

export default Registration;
