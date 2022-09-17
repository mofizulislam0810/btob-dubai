import React, { useEffect, useState } from "react";
import "./Staff.css";
import Footer from "../SharePages/Footer/Footer";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import axios from "axios";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';
const Staff = () => {
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userMobileNo, setUserMobileNo] = useState("");
  let [balanceLimit, setBalanceLimit] = useState(0);
  let [isActive, setIsActive] = useState(true);
  let [currentItem, setCurrentItem] = useState({});
  let [staffList, setStaffList] = useState([]);
  let [settingItem, setSettingItem] = useState({});
  let sendObj = {
    id: currentItem === null ? 0 : currentItem.id,
    userId: currentItem === null ? 0 : currentItem.userId,
    agentId: sessionStorage.getItem("agentId") ?? 0,
    userName: userName,
    userMobileNo: userMobileNo,
    userEmail: userEmail,
    balanceLimit: balanceLimit,
    isActive: isActive,
  };
  const handleSubmit = () => {
    if(userName===""){
        toast.error("Sorry! User name is empty..");
      return;
    }
    if(userMobileNo===""){
      toast.error("Sorry! Mobile no is empty..");
    return;
  }
  if(userEmail===""){
    toast.error("Sorry! Email is empty..");
  return;
}

if((balanceLimit==""?0:balanceLimit)===0){
  toast.error("Sorry! Balance limit is zero..");
return;
}
    console.log(sendObj);
    if (sendObj.id > 0) {
      const putData = async () => {
        const response = await axios
          .put(environment.agentStaff, sendObj, environment.headerToken)
          .catch((error) => {
            console.log(error);
          });
        console.log(response);

        if (response !== undefined && response.data > 0) {
          toast.success("Thanks! Data updated successfully..");
          handleGetStaffs(1);
        } else {
          toast.error("Sorry! Data not updated..");
        }

      };
      putData();
    } else {
      if (staffList.length >= settingItem.maxStaff) {
        toast.error("Sorrry! Max staff limit " + settingItem.maxStaff + " has been over");
      } else {
        const postData = async () => {
          const response = await axios
            .post(environment.agentStaff, sendObj, environment.headerToken)
            .catch((error) => {
              console.log(error);
            });
          console.log(response);
          if (response !== undefined && response.data > 0) {
            handleGetStaffs(1);
            setUserName("");
            setUserEmail("");
            setUserMobileNo("");
            setBalanceLimit(0);
            setIsActive(true);
            toast.success("Thanks! Data created successfully..");
          } else {
            toast.error("Sorry! Data not created..");
          }
        };
        postData();
      }
    }
  };
let [pageCount, setPageCount] = useState(0);
let [pageSize, setPageSize] = useState(10);
let [currentPageNumber,setCurrentPageNumber]=useState(1);
  const handleGetStaffs = (currentPageNumber) => {
    const getData = async () => {
      const response = await axios.get(
        environment.getAgentStaffByAgent + "/" + (sessionStorage.getItem("agentId") ?? 0)+`?pageNumber=${currentPageNumber}&pageSize=${pageSize}`,
        environment.headerToken
      );
      setStaffList(response.data.data);
      console.log(response.data.data);
      setPageCount(response.data.totalPages);
    };
    getData();
    const getSetting = async () => {
      const response = await axios.get(
        environment.getAgentSettingById +
          "/" +
          (sessionStorage.getItem("agentId") ?? 0) +
          "/" +
          1,
        environment.headerToken
      );
      setSettingItem(response.data);
      console.log(response.data);
    };
    getSetting();
  };
  const handlePageClick = async (data) => {


    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
    handleGetStaffs(currentPage);
  };
  const handleCreateItem = () => {
    setCurrentItem(null);
    setUserName("");
    setUserEmail("");
    setUserMobileNo("");
    setBalanceLimit(0);
    setIsActive(true);
  };
  const handleEditItem = (item) => {
    console.log(item);
    setCurrentItem(item);
    setUserName(item.userName);
    setUserEmail(item.userEmail);
    setUserMobileNo(item.userMobileNo);
    setBalanceLimit(item.balanceLimit);
    setIsActive(item.isActive);
  };
  useEffect(() => {
    handleGetStaffs(currentPageNumber);
  }, [currentPageNumber]);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper search-panel-bg px-4">
        <section className="content-header"></section>
        <section className="content">
        <ToastContainer position="bottom-right" autoClose={1500}/>
          <div className="mx-5">
            <div className="card">
              <div className="card-body">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tp1">
                    <span className="mt-1 fs-4">My Users</span>
                    <ul id="menu-standard">
                      <li id="menu-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-sm btn-secondary float-right mr-1 d-print-none rounded text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#accountModal"
                          onClick={() => handleCreateItem()}
                          style={{fontSize:"12px"}}
                        >
                          <span className="me-1">
                            <i class="fas fa-user-plus"></i>
                          </span>{" "}
                          Add new User
                        </a>
                      </li>
                    </ul>
                    <table className="table table-bordered text-center mt-1 table-sm" style={{ width: "100%", fontSize: "13px" }}>
                      <thead className="text-center fw-bold bg-secondary">
                        <tr>
                          <th>SL</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Transaction Limit</th>
                          <th>Password</th>
                          <th>Member Since</th>
                          <th>Is Active?</th>
                        </tr>
                      </thead>
                      <tbody className="lh-1 tbody">
                        {staffList.map((item, index) => {
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
                                  {item.userName}
                                </a>
                              </td>
                              <td>{item.userEmail}</td>
                              <td>{item.userMobileNo}</td>
                              <td>{item.balanceLimit}</td>
                              <td>{item.password}</td>
                              <td>
                                {moment(item.createdDate).format(
                                  "DD-MMMM-yyyy"
                                )}
                              </td>
                              <td>
                                {item.isActive === true ? "Active" : "Inactive"}
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
          </div>

          <div className="mx-5 mt-3" style={{ minHeight: "500px" }}>
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
                      {currentItem === null ? "Add" : "Edit"} Staff
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row my-3">
                      <input type={"hidden"}></input>
                      <div className="col-sm-3">
                        <label>
                          Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type={"text"}
                          value={userName}
                          className="form-control"
                          placeholder="Name"
                          onChange={(e) => setUserName(e.target.value)}
                        ></input>
                      </div>
                      <div className="col-sm-3">
                        <label>
                          Email<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type={"email"}
                          value={userEmail}
                          className="form-control"
                          placeholder="Email"
                          onChange={(e) => setUserEmail(e.target.value)}
                        ></input>
                      </div>
                      <div className="col-sm-3">
                        <label>
                          Mobile No<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type={"number"}
                          value={userMobileNo}
                          className="form-control"
                          placeholder="Mobile No"
                          onChange={(e) => setUserMobileNo(e.target.value)}
                        ></input>
                      </div>
                      <div className="col-sm-3">
                        <label>
                         Transaction Limit<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type={"number"}
                          value={balanceLimit}
                          className="form-control"
                          placeholder="Balance Limit"
                          onChange={(e) => setBalanceLimit(Number(e.target.value))}
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3 d-flex">
                        <label>
                          Is Active?<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type={"checkbox"}
                          checked={isActive ?? true}
                          onChange={(e) => setIsActive(e.target.checked)}
                          className="form-check ms-2"
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
      <Footer></Footer>
    </div>
  );
};

export default Staff;
