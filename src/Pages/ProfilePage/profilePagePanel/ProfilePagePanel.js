import React, { useEffect, useState } from "react";
import "./ProfilePagePanel.css";
import profileImg from "../../../images/profileImage/a279ec6b.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { environment } from '../../../../src/Pages/SharePages/Utility/environment';
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../images/logo/image_2022_07_28T11_49_00_957Z_2-removebg-preview.png"



const ProfilePagePanel = () => {
  let [currentUser, setCurrentUser] = useState({});
  let [fullName, setFullName] = useState();
  let [email, setEmail] = useState();
  let [mobile, setMobile] = useState();
  let [userId, setUserId] = useState();
  let [logoName, setLogoName] = useState();
  let [agentInfo, setAgentInfo] = useState(0);
  // let s3URL = "https://fstuploaddocument.s3.ap-southeast-1.amazonaws.com/";
  // let localURL ="wwwroot/Uploads/Agent/"
  
  const handleGetUser = () => {
    const getData = async () => {
      const response = await axios.get(environment.currentUserInfo, environment.headerToken);
      setCurrentUser(response.data);
      setUserId(response.data.id);
      setFullName(response.data.fullName);
      setEmail(response.data.email);
      setMobile(response.data.mobile);
      setLogoName(response.data.logoName)
    };
    getData();
    const getAgentData = async () =>{
      axios
      .get(environment.agentInfo, environment.headerToken)
      .then((agentRes) => {
        // console.log("------------------", agentRes.data);
        sessionStorage.setItem("agentId", agentRes.data.id);
        sessionStorage.setItem("agentName", agentRes.data.name);
        sessionStorage.setItem("logoName", agentRes.data.logoName);
        sessionStorage.setItem("agentAddress", agentRes.data.address);
        setAgentInfo(agentRes.data);
      })
      .catch((err) => {
        //alert('Invalid login')
      });
    }
    getAgentData();
  };



  // console.log(currentUser);
  const handleSubmit = () => {
    currentUser.fullName = fullName;
    currentUser.email = email;
    currentUser.mobile = mobile;
    console.log(currentUser);

    const putData = async () => {
      const response = await axios.put(environment.userProfileEdit, currentUser, environment.headerToken).catch((err) => {
        toast.error("Sorry! Profile not updated..");
      });
      if (response.data.isSuccess == true) {

        sessionStorage.setItem('agentName', fullName);

        window.location.reload();
        toast.success("Thanks! Profile updated successfully");
      }
      else {
        toast.error("Sorry! Profile not updated..");
      }
    };
    putData();
  }

  const logoFileUpload = (file) => {
    let fileExt = file.name.split(".").pop().toLowerCase();
    if (
      !(
        fileExt === "jpg" ||
        fileExt === "jpeg" ||
        fileExt === "png"
      )
    ) {
      toast.error("Sorry! Invalid file type..");
    }
    else {
      var formData = new FormData();
      formData.append(`file`, file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const postData = async () => {
        const response = await axios.post(
          environment.logoFileUpload + "/" + userId,
          formData,
          config
        ).then((res => {
          setLogoName(file.name);
          sessionStorage.setItem("logoName", file.name);
          window.location.reload();
        }));
      }
      postData();
    }


  }
  useEffect(() => {
    handleGetUser();
  }, [])
  return (
    <div>
      <div className="content-wrapper search-panel-bg">
        <ToastContainer position="bottom-right" autoClose={1500}/>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              {/* <div className="col-sm-6">
              <h1 className="fw-bold text-white">Profile</h1>
            </div> */}
            </div>
          </div>
        </section>

        {/* <!-- Main content --> */}
        <section className="content">
          <div className="container-fluid" style={{ minHeight: "500px" }}>
            <div className="row">
              <div className="col-md-3">
                {/* <!-- Profile Image --> */}
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      {
                        logoName === undefined ? 
                        <>
                        <img
                        alt="img01"
                        className="mx-auto mb-3"
                        src={environment.s3URL +''+logoName}
                        style={{ width: "150px", height: "80px" }}
                      ></img>
                        </> : 
                        <>
                         <img
                        alt="img01"
                        className="mx-auto mb-3"
                        src={ 
                          environment.s3URL +''+logoName
                        }
                        style={{ width: "150px", height: "80px" }}
                      ></img>
                        </>
                      }
                      {/* <img
                        alt="img01"
                        src={
                          environment.baseApiURL +
                          `agentinfo/GetLogo/${logoName}`
                        }
                        style={{ width: "200px", height: "200px" }}
                      ></img> */}
                      <input type={'file'} className='form-control' accept=".jpg, .jpeg, .png, .pdf"
                        onChange={(e) =>
                          logoFileUpload(
                            e.target.files[0]
                          )
                        }></input>
                    </div>

                    <h5 className="profile-username text-center fw-bold">
                      {currentUser.fullName}
                    </h5>

                    <p className="text-muted text-center">
                      Member Of {sessionStorage.getItem('agentName')}
                    </p>
                    <button type="button" className="btn button-color text-white fw-bold btn-block rounded" data-bs-toggle="modal" data-bs-target="#profileModal">
                      Edit
                    </button>
                    {/* <Link to="#" className="btn btn-primary btn-block">
                    <p className="text-muted text-center">
                      Member Of {sessionStorage.getItem("agentName")}
                    </p>
                    <button
                      type="button"
                      className="btn button-color text-white fw-bold btn-block"
                      data-bs-toggle="modal"
                      data-bs-target="#profileModal"
                    >
                      Edit
                    </button>
                    {/* <Link to="#" className="btn btn-primary btn-block">
                    <b>Update</b>
                  </Link> */}

                    <div
                      className="modal fade"
                      id="profileModal"
                      tabIndex={-1}
                      aria-labelledby="profileModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="profileModalLabel">
                              Edit Profile
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="row text-center">
                              <div className="col-sm-4">

                                {/* <input type={'file'} className='form-control' accept=".jpg, .jpeg, .png, .pdf"
                                  onChange={(e) =>
                                    logoFileUpload(
                                      e.target.files[0]
                                    )
                                  }></input> */}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4">
                                <label>
                                  Name<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"text"}
                                  value={fullName}
                                  className="form-control"
                                  placeholder="Name"
                                  onChange={(e) => setFullName(e.target.value)}
                                ></input>
                              </div>
                              <div className="col-sm-4">
                                <label>
                                  Company Email<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"email"}
                                  defaultValue={agentInfo.email}
                                  className="form-control"
                                  placeholder="Email"
                                  onChange={(e) => setEmail(e.target.value)}
                                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                ></input>
                              </div>
                              <div className="col-sm-4">
                                <label>
                                  Mobile<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"number"}
                                  value={mobile}
                                  className="form-control"
                                  placeholder="Mobile"
                                  onChange={(e) => setMobile(e.target.value)}
                                ></input>
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
                              className="btn button-color text-white fw-bold rounded"
                              onClick={() => handleSubmit()}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /.card-body --> */}
                </div>
                {/* <!-- /.car-body --> */}
                {/* <!-- /.card --> */}
              </div>
              {/* <!-- /.col --> */}
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <span className="text-color fs-5 fw-bold">
                          Profile Status
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- /.card-header --> */}
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        <form className="form-horizontal">
                          <table className="table table-borderless align-middle table-striped text-start fw-bold">
                            <tbody>
                              <tr>
                                <td>Username</td>
                                <td>:</td>
                                <td>{currentUser.fullName}</td>
                              </tr>
                              <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{currentUser.email}</td>
                              </tr>
                              <tr>
                                <td>Mobile</td>
                                <td>:</td>
                                <td>{currentUser.mobile}</td>
                              </tr>
                              <tr>
                                <td>Company Name</td>
                                <td>:</td>
                                <td>{sessionStorage.getItem("agentName")}</td>
                              </tr>
                              <tr>
                                <td>Company Email</td>
                                <td>:</td>
                                <td>{agentInfo.email}</td>
                              </tr>
                              <tr>
                                <td>Company Address</td>
                                <td>:</td>
                                <td>{sessionStorage.getItem("agentAddress")}</td>
                              </tr>
                              <tr>
                                <td>Member Since</td>
                                <td>:</td>
                                <td>
                                  {moment(currentUser.createdDate).format(
                                    "DD-MMMM-yyyy"
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>

                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePagePanel;
