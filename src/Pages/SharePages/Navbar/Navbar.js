import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/logo/image_2022_07_28T11_49_00_957Z_2-removebg-preview.png";
import axios from "axios";
import { environment } from "../../../../src/Pages/SharePages/Utility/environment";
import { useState } from "react";
import "./Navbar.css";
import moment from "moment";
import sessionTime from "../Utility/sessionTime";
import $ from "jquery";
import { toast } from "react-toastify";

const Navbar = () => {
  let [noticeCount, setNoticeCount] = useState(0);
  let [noticeList, setNoticeList] = useState([]);
  let [agentInfo, setAgentInfo] = useState(0);
  let [accountManager, setAccountManager] = useState({});
  let [serchText,setSearchText]=useState('');

  const navigate = useNavigate();
  const handelLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

const handleViewTicket= async ()=>{
  let searchObj={searchText:serchText}
  await axios
  .post(environment.airTicketingSearch,searchObj, environment.headerToken)
  .then((res) => {
    // console.log(res);
    if(res.data.length > 0 && res.data[0].isTicketed === true && res.data[0].uniqueTransID !==""){
      window.open("/ticket?utid=" + res.data[0].uniqueTransID, "_blank");
    }else if(res.data.length > 0 && res.data[0].isTicketed === false && res.data[0].uniqueTransID !==""){
      window.open("/bookedview?utid=" + res.data[0].uniqueTransID, "_blank");
    }
    else{
      toast.error("Data not found!")
    } 
  })
  .catch((err) => {
    //alert('Invalid login')
  });
}

const accountManagerInfo = async(agentId)=>{
   await axios
   .get(
     environment.accountManagerInfo + "/" + agentId, environment.headerToken
   )
   .then((amRes) => {
     setAccountManager(amRes.data);
   })
   .catch((err) => {
     //alert('Invalid login')
   });
}


  const handleInit = () => {
    axios.get(environment.agentInfo, environment.headerToken)
      .then((agentRes) => {
        // console.log(agentRes.data);
        accountManagerInfo(agentRes.data.id);
        sessionStorage.setItem("agentId", agentRes.data.id);
        sessionStorage.setItem("agentName", agentRes.data.name);
        sessionStorage.setItem("logoName", agentRes.data.logoName);
        sessionStorage.setItem("agentAddress", agentRes.data.address);
        setAgentInfo(agentRes.data);
      })
      .catch((err) => {
        //alert('Invalid login')
      });



    axios
      .get(
        environment.getSupportNoticeCountByAgent +
          "/" +
          (sessionStorage.getItem("agentId") ?? 0) +
          "/" +
          true,
        environment.headerToken
      )
      .then((supportRes) => {
        setNoticeCount(supportRes.data.noticeCount);
      })
      .catch((err) => {
        //alert('Invalid login')
      });

    axios
      .get(
        environment.getSupportNoticeByAgent +
          "/" +
          (sessionStorage.getItem("agentId") ?? 0) +
          "/" +
          true,
        environment.headerToken
      )
      .then((noticeRes) => {
        setNoticeList(noticeRes.data);
        // console.log(noticeList);
      })
      .catch((err) => {
        //alert('Invalid login')
      });
      const getData = async () => {
        const response = await axios.get(environment.currentUserInfo,environment.headerToken);
        sessionStorage.setItem("userName",response.data.fullName);
    };
    getData();
  };

  console.log(agentInfo);

  useEffect(() => {
    handleInit();
  }, []);

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{position: "sticky", top: "0"}}>
      {/* Left navbar links  */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="#"
            role="button"
          >
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/search">
            <img src={logo} alt="" width="60%" height="40"/>
          </Link>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        <li className="nav-item me-2">
          <form class="form-inline">
            <input
              class="form-control search-input rounded-start"
              type="search"
              aria-label="Search"
              placeholder="Name/PNR/Ticket no/Booking Ref"
              onChange={(e)=>setSearchText(e.target.value)}
            />
            <button
              class="btn button-color text-white fw-bold my-2 my-sm-0 rounded-end"
              onClick={handleViewTicket}
              type="button"
              disabled={serchText === '' ? true : false}
            >
              <i class="fas fa-search"></i>
            </button>
          </form>
        </li>
        {
          accountManager === '' ? <> </> : <>
            <li className="nav-item dropdown me-1" title="Account Manager">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <span className="fw-bold">
              <i className="fa fa-cog"></i>
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <div className="dropdown-divider"></div>
            <span
              className="dropdown-item fw-bold"
            >
              Your Account Manager
            </span>
            <div className="dropdown-divider"></div>
            <span className="dropdown-item account-manager">
              Name: {accountManager?.name}
            </span>
            <span className="dropdown-item account-manager">
              Email: {accountManager?.email}
            </span>
            <span className="dropdown-item account-manager">
              Mobile: {accountManager?.mobileNo}
            </span>
            <div className="dropdown-divider"></div>
          </div>
        </li>

          </>
        }
      
        <li className="nav-item dropdown me-1">
          <a
            className="nav-link btn button-color rounded"
            // style={{ backgroundColor: "#02046a" }}
            data-toggle="dropdown"
            href="#"
          >
            <span className="text-white fw-bold">
            {agentInfo?.currencyName !== undefined ? agentInfo?.currencyName : "AED"} {agentInfo?.currentBalance ?? 0}
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <div className="dropdown-divider"></div>
            <div className="p-3 text-center">
              <h6>Your Account Balance</h6>
              <button
                className="btn text-white fw-bold button-color rounded"
                // style={{ backgroundColor: "#02046a" }}
              >
                {agentInfo?.currencyName !== undefined ? agentInfo?.currencyName : "AED"} {agentInfo?.currentBalance ?? 0}
              </button>
            </div>
            <div className="dropdown-divider"></div>
            <Link to="/balance" className="dropdown-item">
              Deposite Request
            </Link>
          </div>
        </li>
        {/* Profile Dropdown Menu */}
        <li className="nav-item dropdown" title="My Account">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <span>
              <i className="fas fa-user"></i><span className="ms-2">{agentInfo?.name}({agentInfo?.code})</span>
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <div className="dropdown-divider"></div>
            <Link to="/profile" className="dropdown-item">
              <i className="fas fa-user mr-2"></i> Profile
            </Link>
            <div className="dropdown-divider"></div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item" onClick={handelLogout} id="logOut">
              <i className="fas fa-sign-out-alt mr-2"></i>Logout
            </div>
          </div>
        </li>
        {/* Notifications Dropdown Menu */}
        <li class="nav-item dropdown" title="Notification">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <span>
              {" "}
              <i class="far fa-bell"></i>
            </span>
            <span class="badge badge-warning navbar-badge">{noticeCount}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            {/* <span class="dropdown-item dropdown-header">
              {noticeCount} Notifications
            </span> */}
            <div class="dropdown-divider"></div>           
            {/* {noticeList.map((item, index) => {
              return (
                <div>
                  <Link to="#" class="dropdown-item">
                    <i class="fas fa-envelope mr-2"></i> {item.ticketNo} &nbsp;{" "}
                    {item.supportTypeName} &nbsp; {item.subjectName}
                    <p style={{ paddingLeft: "28px" }}>{item.message} </p>
                  </Link>
                  <div class="dropdown-divider"></div>
                </div>
              );
            })} */}
             <Link to="/support" class="dropdown-item dropdown-footer">
              See All Notifications
            </Link>
          </div>
        </li>
        {/* <li className="nav-item">
          <Link
            className="nav-link"
            data-widget="fullscreen"
            to="#"
            role="button"
          >
            <i className="fas fa-expand-arrows-alt"></i>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
