import React, { useEffect, useState } from "react";
import Footer from "../SharePages/Footer/Footer";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import "./Balance.css";
import $ from "jquery";
import axios from "axios";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';
const Balance = () => {
  let [pageCount, setPageCount] = useState(0);
  let [pageCountBank, setPageCountBank] = useState(0);
  let [pageSize, setPageSize] = useState(50);
  let [currentPageNumber, setCurrentPageNumber] = useState(1);
  let [currentPageNumberBank, setCurrentPageNumberBank] = useState(1);
  let [depositTypeId, setDepositType] = useState(1);
  let [paymentTypeId, setPaymentType] = useState(1);
  let [checkNo, setCheckNo] = useState("");
  let [checkBank, setCheckBank] = useState("");
  let [checkIssueDate, setCheckIssueDate] = useState("");
  let [reference, setReference] = useState("");
  let [depositInAccountId, setDepositInAccount] = useState(0);
  let [vendorAmount, setVendorAmount] = useState(0);
  let [amount, setAmount] = useState('');
  let [attachment, setAttachment] = useState("");
  let [depositFromAccountId, setDepositFromAccount] = useState(0);
  let [depositDate, setDepositDate] = useState("");
  let [transferDate, setTransferDate] = useState("");
  let [branchId, setBranch] = useState(0);
  let [transactionId, setTransaction] = useState("");
  let [balanceList, setBalanceList] = useState([]);
  let [cityList, setCityList] = useState([]);
  let [agentBankAccountList, setAgentBankAccountList] = useState([]);
  let [agentAccountDropdownList, setAgentAccountDropdownList] = useState([]);
  let [currentItem, setCurrentItem] = useState({});
  let [accountList, setAccountList] = useState([]);
  let [onlineAmount, setOnlineAmount] = useState(0);
  let [onlineCharge, setOnlineCharge] = useState(5);
  let [branchList, setBranchList] = useState([]);
  let [branchNameCash, setBranchNameCash] = useState("");
  let [loading, setLoading] = useState(false);
  let [bdCityList,setBdCityList] = useState([]);
  // console.log(bdCityList);
  useEffect(()=>{
    setBdCityList(cityList.filter(item => item.name.split(",")[0] === 'Bangladesh'));
  },[cityList])
  
  let s3URL = "https://tlluploaddocument.s3.ap-southeast-1.amazonaws.com/";
	let staticURL ="wwwroot/Uploads/Support/";
  let sendObj = {
    agentId: sessionStorage.getItem("agentId") ?? 0,
    fromOfPaymentType: depositTypeId,
    paymentType: paymentTypeId,
    checkNo: checkNo,
    checkBank: checkBank,
    checkIssueDate: checkIssueDate,
    reference: reference,
    depositedInAccountId: depositInAccountId,
    amount: amount,
    attachment: attachment,
    depositedFromAccountId: depositFromAccountId,
    depositDate: depositDate,
    transferDate: transferDate,
    branchName: branchNameCash,
    transactionId: transactionId,
  };

  console.log(branchNameCash);
  const clearDepositEntry = () => {
    setDepositType(1);
    setPaymentType(1);
    setCheckNo("");
    setCheckBank("");
    setCheckIssueDate("");
    setReference("");
    setDepositInAccount(0);
    setAmount('');
    setAttachment("");
    setDepositFromAccount(0);
    setDepositDate("");
    setTransferDate("");
    setBranch(0);
    setTransaction("");
  }
  let onlineSendObj = {
    agentId: sessionStorage.getItem("agentId") ?? 0,
    uniqueTransID: "",
    amount: onlineAmount,
    charge: onlineCharge,
    totalAmount: onlineAmount + (onlineAmount * onlineCharge / 100),
    remarks: "Online Deposit Checkout"
  }
  const deposittypeList = [
    { id: 1, name: "Cheque" },
    { id: 2, name: "Bank Deposit" },
    { id: 3, name: "Bank Transfer" },
    { id: 4, name: "Cash" },
    // { id: 5, name: "BKash" },
    // { id: 6, name: "Nagad" },
  ];

  const paymenttypeList = [
    { id: 1, name: "With Transaction Id" },
    { id: 2, name: "With Account" },
  ];

  const handleSubmit = () => {
    if (depositTypeId == 1) {
      if (checkNo == "") {
        toast.error("Sorry! Check no is empty..");
        return;
      }
      if (checkBank == "") {
        toast.error("Sorry! Check bank is empty..");
        return;
      }
      if (checkIssueDate == "") {
        toast.error("Sorry! Check issue date is empty..");
        return;
      }
      if (reference == "") {
        toast.error("Sorry! Refference is empty..");
        return;
      }
      if (depositInAccountId == 0) {
        toast.error("Sorry! Triplover account is empty..");
        return;
      }
    }
    if (depositTypeId == 2) {
      // if (checkNo == "") {
      //   toast.error("Sorry! Check no is empty..");
      //   return;
      // }
      if (depositInAccountId == 0) {
        toast.error("Sorry! Deposit bank is empty..");
        return;
      }
      if (depositDate == "") {
        toast.error("Sorry! Deposit date is empty..");
        return;
      }
      if (reference == "") {
        toast.error("Sorry! Refference is empty..");
        return;
      }
    }
    if (depositTypeId == 3) {
      if (depositInAccountId == 0) {
        toast.error("Sorry! Triplover bank is empty..");
        return;
      }
      if (depositFromAccountId == 0) {
        toast.error("Sorry! Deposit from bank is empty..");
        return;
      }
      if (transferDate == "") {
        toast.error("Sorry! Transfer date is empty..");
        return;
      }
      if (reference == "") {
        toast.error("Sorry! Refference is empty..");
        return;
      }
    }
    if (depositTypeId == 4) {
      if (branchNameCash === "") {
        toast.error("Sorry! Branch is empty..");
        return;
      }
      if (reference == "") {
        toast.error("Sorry! Refference is empty..");
        return;
      }
    }
    if (depositTypeId == 5) {
      if (paymentTypeId == 0) {
        toast.error("Sorry! Payment type is empty..");
        return;
      }
      if (paymentTypeId == 1) {
        if (transactionId == "") {
          toast.error("Sorry! Transaction Id is empty..");
          return;
        }
      }
      setAmount(vendorAmount + vendorAmount * (paymentTypeId === 1 ? 1.50 : 1.00) / 100)
    }
    if (depositTypeId == 6) {
      if (amount == 0) {
        toast.error("Sorry! Payment type is empty..");
        return;
      }
      if (transactionId == "") {
        toast.error("Sorry! Transaction Id is empty..");
        return;
      }
      setAmount(vendorAmount + vendorAmount * 1.00 / 100)
    }
    if (amount <= 0) {
      toast.error("Sorry! Amount is empty..");
      return;
    }
    const postData = async () => {
      console.log(sendObj)
      setLoading(true);
      const response = await axios.post(
        environment.depositRequest,
        sendObj,
        environment.headerToken
      );
      if (response.data > 0) {
        clearDepositEntry();
        toast.success("Request send successfully..");
        setLoading(false);
      } else {
        toast.error("Sorry! Try again..");
        setLoading(false);
      }

    };
    postData();
  };
  const handleOnlineDepositSubmit = () => {
    console.log(onlineSendObj)
    const postData = async () => {
      const response = await axios.post(
        environment.paymentCheckout,
        onlineSendObj,
        environment.headerToken
      );
      console.log(response)
      if (response.data.isSuccess === true) {
        window.location = response.data.sslUrl;
      } else {
        toast.error("Sorry! Data not created..");
      }
    };
    postData();
  }
  const handleGetTransaction = (currentPageNumber) => {
    const getData = async () => {
      const response = await axios.get(
        environment.agentDeposits +
        "/" +
        (sessionStorage.getItem("agentId") ?? 0) + `?pageNumber=${currentPageNumber}&pageSize=${pageSize}`,
        environment.headerToken
      );
      console.log(response.data.totalPages)
      setBalanceList(response.data.data);
      setPageCount(await response.data.totalPages);
    };
    getData();
  };

  const handleGetAgentBankAccounts = (currentPageNumberBank) => {
    const getData = async () => {
      const response = await axios.get(environment.cityList);
      setCityList(response.data);
    };
    getData();
    let agentId = sessionStorage.getItem("agentId") ?? 0;
    const getAgentBankAccounts = async () => {
      const response = await axios.get(
        environment.bankAccountsByAgent + "/" + agentId + `?pageNumber=${currentPageNumberBank}&pageSize=${pageSize}`,
        environment.headerToken
      );
      console.log(response.data.data)
      setAgentBankAccountList(response.data.data);
      setPageCountBank(await response.data.totalPages);
      console.log(response.data.totalPages)
    };
    getAgentBankAccounts();

    const getAgentBankDropdown = async () => {
      const response = await axios.get(
        environment.accountsByAgentDropdown + "?agentId=" + agentId,
        environment.headerToken
      );
      console.log(response.data)
      setAgentAccountDropdownList(response.data);
      console.log()
    };
    getAgentBankDropdown();
  };


  console.log(pageCount);
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
    // handleGetTransaction(currentPage);
    // handleGetAgentBankAccounts(currentPage);
  };

  const handlePageClickBank = async (data) => {
    let currentPage = data.selected + 1;
    setCurrentPageNumberBank(currentPage);
    // handleGetTransaction(currentPage);
    // handleGetAgentBankAccounts(currentPage);
  };

  const handleGetEntry = () => {
    const getBankAccounts = async () => {
      const response = await axios.get(
        environment.bankAccounts,
        environment.headerToken
      );
      setAccountList(response.data);
    };
    getBankAccounts();
    const getGatewayCharge = async () => {
      const response = await axios.get(
        environment.paymentGateway + "/2",
        environment.headerToken
      );
      console.log(response)
      setOnlineCharge(response.data.charge);
    };
    getGatewayCharge();
    const getBranches = async () => {
      const response = await axios.get(
        environment.branchList,
        environment.headerToken
      );
      setBranchList(response.data);
      console.log(branchList)
    };
    getBranches();

    const getAgentAccounts = async () => {
      let agentId = sessionStorage.getItem("agentId") ?? 0;
      const response = await axios.get(
        environment.accountsByAgentDropdown + "/" + agentId,
        environment.headerToken
      );
      setAgentAccountDropdownList(response.data);
    };
    getAgentAccounts();

  };

  const handleFileUpload = (file) => {
    var formData = new FormData();
    formData.append(`file`, file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const postData = async () => {
      const response = await axios.post(
        environment.agentFileUpload,
        formData,
        config
      );
      setAttachment(response.data);
    };
    postData();
  };


  const handleCreateItem = () => {
    clearBankForm();
  };
  const handleEditItem = (item) => {
    setCurrentItem(item);
    setHolderName(item.holderName);
    setAccountNumber(item.accountNumber);
    setRoutingNumber(item.routingNumber);
    setBankName(item.bankName);
    setBranchName(item.branchName);
    setBranchCode(item.branchCode);
    setCityId(item.cityId);
    setAddress(item.address);
    setSwiftCode(item.swiftCode);
    setIsActive(item.isActive);
  };
  const clearBankForm = () => {
    setCurrentItem(null);
    setHolderName("");
    setAccountNumber("");
    setRoutingNumber("");
    setBankName("");
    setBranchName("");
    setBranchCode("");
    setCityId(0);
    setAddress("");
    setSwiftCode("");
  }
  let [holderName, setHolderName] = useState("");
  let [accountNumber, setAccountNumber] = useState("");
  let [routingNumber, setRoutingNumber] = useState("");
  let [bankName, setBankName] = useState("");
  let [branchName, setBranchName] = useState("");
  let [branchCode, setBranchCode] = useState("");
  let [cityId, setCityId] = useState(0);
  let [address, setAddress] = useState("");
  let [swiftCode, setSwiftCode] = useState("");
  let [isActive, setIsActive] = useState(true);
  let bankObj = {
    id: currentItem == null ? 0 : currentItem.id,
    agentId: sessionStorage.getItem("agentId") ?? 0,
    createdBy: 0,
    ModifiedBy: 0,
    holderName: holderName,
    accountNumber: accountNumber,
    routingNumber: routingNumber,
    bankName: bankName,
    branchName: branchName,
    branchCode: branchCode,
    cityId: cityId,
    address: address,
    swiftCode: swiftCode,
    isActive: isActive,
  };


  function handleCloseModal() {
    $("#accountModal").click();
    $(".modal-backdrop").remove();
    $("body").removeClass("modal-open");
    $("body").removeAttr("style");
  }


  const handleBankSubmit = () => {
    if (holderName === "") {
      toast.error("Sorry! Holder name is empty");
      return;
    }
    if (accountNumber === "") {
      toast.error("Sorry! Account number is empty");
      return;
    }
    // if (routingNumber === "") {
    //   toast.error("Sorry! Routing number is empty");
    //   return;
    // }
    if (bankName === "") {
      toast.error("Sorry! Bank name is empty");
      return;
    }
    if (branchName === "") {
      toast.error("Sorry! Branch name is empty");
      return;
    }
    // if (branchCode === "") {
    //   toast.error("Sorry! Branch code is empty");
    //   return;
    // }
    // if (!cityId > 0) {
    //   toast.error("Sorry! City is not selected");
    //   return;
    // }
    // if (address === "") {
    //   toast.error("Sorry! Address is empty");
    //   return;
    // }
    // if (swiftCode === "") {
    //   toast.error("Sorry! Swift code is empty");
    //   return;
    // }
    if ((currentItem == null ? 0 : currentItem.id) > 0) {
      const putData = async () => {
        setLoading(true);
        const response = await axios.put(
          environment.bankAccount,
          bankObj,
          environment.headerToken
        );
        if (response.data > 0) {
          handleGetAgentBankAccounts(currentPageNumberBank);
          clearBankForm();
          toast.success("Bank Account updated successfully..");
          handleCloseModal();
          setLoading(false);
        } else {
          toast.error("Sorry! Bank Account not updated..");
          setLoading(false);
        }
      };
      putData();
    } else {
      const postData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.bankAccount,
          bankObj,
          environment.headerToken
        );

        if (response.data > 0) {
          handleGetAgentBankAccounts(currentPageNumberBank);
          clearBankForm();
          toast.success("Bank Account created successfully..");
          handleCloseModal();
          setLoading(false);
        } else {
          toast.error("Sorry! Bank Account not created..");
          setLoading(false);
        }
      };
      postData();
    }
  };
  useEffect(() => {
    handleGetEntry();
    handleGetTransaction(currentPageNumber);
    handleGetAgentBankAccounts(currentPageNumberBank);
  }, [currentPageNumber, currentPageNumberBank]);

  console.log(balanceList);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div>
        <div className="content-wrapper search-panel-bg">
          <section className="content-header"></section>
          <section className="content">
            <ToastContainer position="bottom-right" autoClose={1500} />
            <form
              className="mx-5 mt-3"
              encType="multipart/form-data"
              style={{ minHeight: "500px" }}
            >
              <div className="card">
                <div
                  className="card-header fw-bold"
                  style={{ color: "#02046a" }}
                >
                  Topup Request
                </div>
                <div className="card-body">
                  <div className="m-4">
                    <ul className="nav nav-tabs mb-3" id="balanceTab">
                      <li className="nav-item">
                        <a
                          href="#entry"
                          className="nav-link active"
                          data-bs-toggle="tab"
                          onClick={handleGetEntry}
                        >
                          Submit Request
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#transaction"
                          className="nav-link"
                          data-bs-toggle="tab"
                          onClick={() => handleGetTransaction(currentPageNumber)}
                        >
                          Transaction
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#bankaccounts"
                          className="nav-link"
                          data-bs-toggle="tab"
                          onClick={() => handleGetAgentBankAccounts(currentPageNumberBank)}
                        >
                          My Bank Accounts
                        </a>
                      </li>
                      {/* <li className='nav-item text-end' style={{ marginLeft: "62.3%" }}>
                        <a
                          href="javascript:void(0)"
                          className="nav-link"
                          data-bs-toggle="modal"
                          data-bs-target="#onlineModal"
                        >
                          Online Deposit
                        </a>
                      </li> */}
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="entry">
                        <h4>Submit Request</h4>
                        <hr className="my-3" />
                        <div className="row">
                          <div className="col-sm-3">
                            <label>
                              Deposit Type
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-select"
                              value={depositTypeId}
                              placeholder="Deposit Type"
                              onChange={(e) =>{
                                setDepositType(Number(e.target.value));
                                setAmount('');
                              }
                              }
                            >
                              <option key={0} value="0">
                                Select One
                              </option>
                              {deposittypeList.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>

                        {depositTypeId === 1 ? (
                          <>
                            <div className="row my-3">
                              <div className="col-sm-3">
                                <label>
                                  Cheque No
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"text"}
                                  className="form-control"
                                  placeholder="Cheque No"
                                  onChange={(e) => setCheckNo(e.target.value)}
                                  value={checkNo}
                                ></input>
                              </div>
                              <div className="col-sm-3">
                                <label>
                                  Cheque Bank
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"text"}
                                  className="form-control"
                                  placeholder="Cheque Bank"
                                  onChange={(e) => setCheckBank(e.target.value)}
                                  value={checkBank}
                                ></input>
                              </div>
                              <div className="col-sm-3">
                                <label>
                                  Deposit Date
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"date"}
                                  className="form-control"
                                  onChange={(e) =>
                                    setCheckIssueDate(e.target.value)
                                  }
                                  value={checkIssueDate}
                                  max={new Date().toISOString().slice(0, 10)}
                                ></input>
                              </div>
                              <div className="col-sm-3">
                                <label>
                                  Reference
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"text"}
                                  className="form-control"
                                  placeholder="Reference"
                                  onChange={(e) => setReference(e.target.value)}
                                  value={reference}
                                ></input>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-6">
                                <label>
                                  Triplover Bank A/C
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                  className="form-select"
                                  value={depositInAccountId}
                                  placeholder="Triplover Bank A/C"
                                  onChange={(e) =>
                                    setDepositInAccount(Number(e.target.value))
                                  }

                                >
                                  <option key={0} value="0">
                                    Select One
                                  </option>
                                  {
                                    accountList.map((item, index) => {
                                      return (
                                        <option key={index + 1} value={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                              <div className="col-sm-3">
                                <label>
                                  Amount<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"number"}
                                  className="form-control"
                                  placeholder="Amount"
                                  onChange={(e) =>
                                    setAmount((e.target.value))
                                  }
                                  value={amount}
                                ></input>
                              </div>
                              <div className="col-sm-3">
                                <label>Attachment</label>
                                <input
                                  type={"file"}
                                  className="form-control"
                                  placeholder="Attachment"
                                  onChange={(e) =>
                                    handleFileUpload(e.target.files[0])
                                  }
                                ></input>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-sm-12 text-center">
                                <button
                                  className="btn button-color col-sm-1 text-white rounded btn-sm"
                                  type="button"
                                  onClick={() => handleSubmit()}
                                  disabled={loading ? true : false}
                                >
                                  {
                                    loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Submit</span>
                                  }
                                </button>
                              </div>
                            </div>
                          </>
                        ) : depositTypeId === 2 ? (
                          <div className="row">
                            <div className="col-sm-6">
                              <label>
                                Triplover Bank A/C
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                className="form-select"
                                value={depositInAccountId}
                                placeholder="Triplover Bank A/C"
                                onChange={(e) =>
                                  setDepositInAccount(Number(e.target.value))
                                }
                              >
                                <option key={0} value="0">
                                  Select One
                                </option>
                                {accountList.map((item, index) => {
                                  return (
                                    <option key={index + 1} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-sm-3">
                              <label>
                                Deposited Date
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"date"}
                                className="form-control"
                                onChange={(e) => setDepositDate(e.target.value)}
                                value={depositDate}
                                max={new Date().toISOString().slice(0, 10)}
                              ></input>
                            </div>
                            <div className="col-sm-3">
                              <label>
                                Reference<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"text"}
                                className="form-control"
                                placeholder="Reference"
                                onChange={(e) => setReference(e.target.value)}
                                value={reference}
                              ></input>
                            </div>
                            <div className="col-sm-3">
                              <label>
                                Amount<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"number"}
                                className="form-control"
                                placeholder="Amount"
                                onChange={(e) =>
                                  setAmount((e.target.value))
                                }
                                value={amount}
                              ></input>
                            </div>
                            <div className="col-sm-3">
                              <label>Attachment</label>
                              <input
                                type={"file"}
                                className="form-control"
                                placeholder="Attachment"
                                onChange={(e) =>
                                  handleFileUpload(e.target.files[0])
                                }
                              ></input>
                            </div>
                            <div className="col-sm-12 text-right mt-3">
                              <button
                                className="btn button-color col-sm-1 text-white rounded btn-sm"
                                type="button"
                                onClick={() => handleSubmit()}
                                disabled={loading ? true : false}
                              >
                                {
                                  loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Submit</span>
                                }
                              </button>
                            </div>
                          </div>
                        ) : depositTypeId === 3 ? (
                          <div className="row">
                            <div className="col-sm-6">
                              <label>
                                Triplover Bank A/C
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                className="form-select"
                                value={depositInAccountId}
                                placeholder="Triplover Bank A/C"
                                onChange={(e) =>
                                  setDepositInAccount(Number(e.target.value))
                                }

                              >
                                <option key={0} value="0">
                                  Select One
                                </option>
                                {accountList.map((item, index) => {
                                  return (
                                    <option key={index + 1} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-sm-6">
                              <label>
                                My Bank A/C
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <div className="d-flex">
                                <select
                                  className="form-select"
                                  value={depositFromAccountId}
                                  placeholder="My Bank A/C"
                                  onChange={(e) =>
                                    setDepositFromAccount(Number(e.target.value))
                                  }

                                >
                                  <option key={0} value="0">
                                    Select One
                                  </option>
                                  {agentAccountDropdownList.map((item, index) => {
                                    return (
                                      <option key={index + 1} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <div className="btn button-color text-white fw-bold px-3"
                                  onClick={() => handleCreateItem()}
                                  data-bs-toggle="modal"
                                  data-bs-target="#accountModal">New</div>
                              </div>

                            </div>
                            <div className="col-sm-3">
                              <label>
                                Transfer Date
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"date"}
                                className="form-control"
                                onChange={(e) =>
                                  setTransferDate(e.target.value)
                                }
                                value={transferDate}
                                max={new Date().toISOString().slice(0, 10)}
                              ></input>
                            </div>
                            <div className="col-sm-3">
                              <label>
                                Reference<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"text"}
                                className="form-control"
                                placeholder="Reference"
                                onChange={(e) => setReference(e.target.value)}
                                value={reference}
                              ></input>
                            </div>
                            <div className="col-sm-3">
                              <label>
                                Amount<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"number"}
                                className="form-control"
                                placeholder="Amount"
                                onChange={(e) =>
                                  setAmount((e.target.value))
                                }
                                value={amount}
                              ></input>
                            </div>
                            <div className="col-sm-3">
                              <label>Attachment</label>
                              <input
                                type={"file"}
                                className="form-control"
                                placeholder="Attachment"
                                onChange={(e) =>
                                  handleFileUpload(e.target.files[0])
                                }
                              ></input>
                            </div>
                            <div className="col-sm-12 text-right">
                              <button
                                className="btn button-color col-sm-1 mt-3 text-white rounded btn-sm"
                                type="button"
                                onClick={() => handleSubmit()}
                                disabled={loading ? true : false}
                              >
                                {
                                  loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Submit</span>
                                }
                              </button>
                            </div>
                          </div>
                        ) : depositTypeId === 4 ? (
                          <div className="row">
                            <div className="col-sm-6">
                              <label>
                                Branch<span style={{ color: "red" }}>*</span>
                              </label>
                              {/* <select
                                className="form-select"
                                value={branchId}
                                placeholder="Branch"
                                onChange={(e) =>
                                  setBranch(Number(e.target.value))
                                }
                              >
                                <option key={0} value="0">
                                  Select One
                                </option>
                                {branchList.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select> */}
                              <input type="text" className="form-control" placeholder="Branch Name" onChange={(e) => setBranchNameCash(e.target.value)} required />
                            </div>

                            <div className="col-sm-3">
                              <label>
                                Reference<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"text"}
                                className="form-control"
                                placeholder="Reference"
                                onChange={(e) => setReference(e.target.value)}
                                value={reference}
                              ></input>
                            </div>
                            <div className="col-sm-3">
                              <label>
                                Amount<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"number"}
                                className="form-control"
                                placeholder="Amount"
                                onChange={(e) =>
                                  setAmount((e.target.value))
                                }
                                value={amount}
                              ></input>
                            </div>
                            <div className="col-sm-3">
                              <label>Attachment</label>
                              <input
                                type={"file"}
                                className="form-control"
                                placeholder="Attachment"
                                onChange={(e) =>
                                  handleFileUpload(e.target.files[0])
                                }
                              ></input>
                            </div>
                            <div className="col-sm-12 text-right">
                              <button
                                className="btn button-color col-sm-1 mt-3 text-white rounded btn-sm"
                                type="button"
                                onClick={() => handleSubmit()}
                                disabled={loading ? true : false}
                              >
                                {
                                  loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Submit</span>
                                }
                              </button>
                            </div>
                          </div>
                        ) : depositTypeId === 5 ? (
                          <div className="row">
                            <div className="row">
                              <div className="col-sm-3">
                                <label>
                                  Payment Type
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                  className="form-select"
                                  value={paymentTypeId}
                                  placeholder="Deposit Type"
                                  onChange={(e) =>
                                    setPaymentType(Number(e.target.value))
                                  }
                                >
                                  {paymenttypeList.map((item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                            {paymentTypeId === 1 ? (
                              <div className="col-sm-3">
                                <label>
                                  Transaction Id
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"text"}
                                  className="form-control"
                                  placeholder="Transaction Id"
                                  onChange={(e) =>
                                    setTransaction(e.target.value)
                                  }
                                  value={transactionId}
                                ></input>
                              </div>
                            ) : (
                              <></>
                            )}
                            {paymentTypeId === 2 ? (
                              <div className="col-sm-3">
                                <label>
                                  Amount
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"number"}
                                  className="form-control"
                                  placeholder="Amount"
                                  onChange={(e) =>
                                    setVendorAmount(Number(e.target.value))
                                  }
                                  value={vendorAmount}
                                ></input>
                              </div>
                            ) : (
                              <></>
                            )}

                            <div className="col-sm-3">
                              <label>
                                Gateway Fee (%)
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"text"}
                                className="form-control"
                                disabled
                                value={paymentTypeId === 1 ? "1.50" : "1.00"}
                              />
                            </div>
                            {paymentTypeId === 2 ? (
                              <div className="col-sm-3">
                                <label>
                                  Payable  Amount
                                </label>
                                <input
                                  type={"number"}
                                  className="form-control"
                                  placeholder="Amount"
                                  disabled
                                  value={vendorAmount + vendorAmount * (paymentTypeId === 1 ? 1.50 : 1.00) / 100}
                                ></input>
                              </div>
                            ) : (
                              <></>
                            )}
                            <div className="col-sm-12 text-right">
                              <button
                                className="btn button-color col-sm-1 mt-3 text-white rounded btn-sm"
                                type="button"
                                onClick={() => handleSubmit()}
                                disabled={loading ? true : false}
                              >
                                {
                                  loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Submit</span>
                                }
                              </button>
                            </div>
                          </div>
                        ) : depositTypeId === 6 ? (
                          <div className="row">
                            <div className="col-sm-3">
                              <label>
                                Amount
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"number"}
                                className="form-control"
                                placeholder="Amount"
                                onChange={(e) =>
                                  setVendorAmount(Number(e.target.value))
                                }
                                value={vendorAmount}
                              ></input>
                            </div>

                            <div className="col-sm-3">
                              <label>
                                Gateway Fee (%)
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type={"text"}
                                className="form-control"
                                disabled
                                value={"1.00"}
                              />
                            </div>
                            <div className="col-sm-3">
                              <label>
                                Payable Amount
                              </label>
                              <input
                                type={"number"}
                                className="form-control"
                                placeholder="Payable Amount"
                                disabled
                                value={vendorAmount + vendorAmount * 1.00 / 100}
                              ></input>
                            </div>
                            <div className="col-sm-12 text-right">
                              <button
                                className="btn button-color col-sm-1 mt-3 text-white rounded btn-sm"
                                type="button"
                                onClick={() => handleSubmit()}
                                disabled={loading ? true : false}
                              >
                                {
                                  loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Submit</span>
                                }
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="tab-pane fade" id="transaction">
                        <h4>Transaction</h4>
                        <hr className="my-3" />
                        <table
                          className="table table-bordered table-sm"
                          style={{ width: "100%", fontSize: "12px" }}
                        >
                          <thead className="text-center fw-bold bg-secondary">
                            <tr>
                              <th>Submitted Date</th>
                              <th>Deposit Type</th>
                              <th>TnxNumber</th>
                              <th>Reference</th>
                              <th>Status</th>
                              <th>Amount</th>
                              <th>Bank Charge</th>
                              <th>Topup Amount</th>
                              <th>Image</th>
                            </tr>
                          </thead>
                          <tbody className="tbody text-center">
                            {
                              balanceList.length > 0 ?
                                balanceList.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      {/* <td>{((currentPageNumber - 1) * pageSize) + index + 1}</td> */}
                                      <td>{moment(item.createdDate).format('DD-MM-yyyy hh:mm A')}</td>
                                      <td>
                                        {item.depositTypeId === 1
                                          ? "Cheque"
                                          : item.depositTypeId === 2
                                            ? "Bank Deposit"
                                            : item.depositTypeId === 3
                                              ? "Bank Transfer"
                                              : item.depositTypeId === 4
                                                ? "Cash"
                                                : item.depositTypeId === 5
                                                  ? "BKash"
                                                  : item.depositTypeId === 6
                                                    ? "Nagad"
                                                    : item.depositTypeId === 7
                                                      ? "Online"
                                                      : ""}
                                      </td>
                                      <td>{item.tnxNumber}</td>
                                      <td>{item.reference}</td>

                                      <td>
                                        {item.status === 1
                                          ? "Processing"
                                          : item.status === 2
                                            ? "Cancelled"
                                            : item.status === 3
                                              ? "Rejected"
                                              : item.status === 4
                                                ? "Approved"
                                                : ""}
                                      </td>
                                      <td>{item.currencyName} {item.amount}</td>
                                      <td>{item.currencyName} {item.bankChargeAdmin}</td>
                                      <td>{item.currencyName} {item.topupAmountAdmin}</td>
                                      {
                                        item.attachment !== null && item.attachment !== "" ? <>
                                         <td><a href={s3URL+item.attachment} download>Download
                                          {/* <img src="https://thumbs.dreamstime.com/b/smooth-nature-pic-full-hd-126695318.jpg" alt="W3Schools" width="50" height="15"/> */}
                                          </a>
                                          </td>
                                        </> : <>
                                          <td></td>
                                        </>
                                      }
                                    </tr>
                                  );
                                }) : <></>}
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
                      <div className="tab-pane fade" id="bankaccounts">
                        <h4>My Bank Accounts</h4>
                        <hr className="my-3" />
                        <button
                          onClick={() => handleCreateItem()}
                          type="button"
                          className="btn btn-secondary btn-sm text-white my-2 rounded"
                          data-bs-toggle="modal"
                          data-bs-target="#accountModal"
                          style={{ fontSize: "12px" }}
                        >
                          Add
                        </button>


                        <table
                          className="table table-bordered table-sm"
                          style={{ width: "100%", fontSize: "12px" }}
                        >
                          <thead className="text-center fw-bold bg-secondary">
                            <tr>
                              <th>SL</th>
                              <th>Account Name</th>
                              <th>Status</th>
                              <th>Account Number</th>
                              <th>Bank Name</th>
                              <th>Branch Name</th>
                              {/* <th>Branch Code</th>
                              <th>Address</th>
                              <th>Swift Code</th>
                              <th>Routing number</th> */}
                            </tr>
                          </thead>
                          <tbody className="tbody text-center">
                            {agentBankAccountList.map((item, index) => {
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
                                      {item.holderName}
                                    </a>
                                  </td>
                                  <td>
                                    {item.isActive === true
                                      ? "Active"
                                      : "Inactive"}
                                  </td>
                                  <td>{item.accountNumber}</td>
                                  <td>{item.bankName}</td>
                                  <td>{item.branchName}</td>
                                  {/* <td>{item.branchCode}</td>
                                  <td>{item.address}</td>
                                  <td>{item.swiftCode}</td>
                                  <td>{item.routingNumber}</td> */}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <ReactPaginate
                          previousLabel={"previous"}
                          nextLabel={"next"}
                          breakLabel={"..."}
                          pageCount={pageCountBank}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={3}
                          onPageChange={handlePageClickBank}
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
            </form>
          </section>
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
              <h5
                className="modal-title"
                id="accountModalLabel"
              >
                {currentItem === null ? "Add" : "Edit"} Bank
                Account
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
                <div className="col-sm-3">
                  <label>
                    Account Name
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type={"text"}
                    value={holderName}
                    className="form-control"
                    placeholder="Account Name"
                    onChange={(e) =>
                      setHolderName(e.target.value)
                    }
                  ></input>
                </div>
                <div className="col-sm-3">
                  <label>
                    Account Number
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type={"text"}
                    value={accountNumber}
                    className="form-control"
                    placeholder="Account Number"
                    onChange={(e) =>
                      setAccountNumber(e.target.value)
                    }
                  ></input>
                </div>
                <div className="col-sm-3">
                  <label>
                    Bank Name
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type={"text"}
                    value={bankName}
                    className="form-control"
                    placeholder="Bank Name"
                    onChange={(e) =>
                      setBankName(e.target.value)
                    }
                  ></input>
                </div>
                <div className="col-sm-3">
                  <label>
                    Branch Name
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type={"text"}
                    value={branchName}
                    className="form-control"
                    placeholder="Branch Name"
                    onChange={(e) =>
                      setBranchName(e.target.value)
                    }
                  ></input>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <label>
                    Routing Number
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </label>
                  <input
                    type={"text"}
                    value={routingNumber}
                    className="form-control"
                    placeholder="Routing Number"
                    onChange={(e) =>
                      setRoutingNumber(e.target.value)
                    }
                  ></input>
                </div>
                <div className="col-sm-3">
                  <label>
                    Branch Code
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </label>
                  <input
                    type={"text"}
                    value={branchCode}
                    className="form-control"
                    placeholder="Branch Code"
                    onChange={(e) =>
                      setBranchCode(e.target.value)
                    }
                  ></input>
                </div>
                <div className="col-sm-3">
                  <label>
                    City
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </label>
                  <select
                    className="form-select"
                    value={cityId}
                    placeholder="City"
                    onChange={(e) =>
                      setCityId(Number(e.target.value))
                    }
                  >
                    <option key={0}>Select One</option>
                    {bdCityList.map((item, index) => {
                      return (
                        <option
                          key={index + 1}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-sm-3">
                  <label>
                    Address
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </label>
                  <input
                    type={"text"}
                    value={address}
                    className="form-control"
                    placeholder="Address"
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                  ></input>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-3">
                  <label>
                    Swift Code
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </label>
                  <input
                    type={"text"}
                    value={swiftCode}
                    className="form-control"
                    placeholder="Swift Code"
                    onChange={(e) =>
                      setSwiftCode(e.target.value)
                    }
                  ></input>
                </div>
                <div className="col-sm-3">
                  <label>
                    Is Active?
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type={"checkbox"}
                    checked={isActive ?? true}
                    onChange={(e) =>
                      setIsActive(e.target.checked)
                    }
                    className="form-check"
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn button-color text-white rounded btn-sm"
                onClick={() => handleBankSubmit()}
                disabled={loading ? true : false}
              >
                {
                  loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Submit</span>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="onlineModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
              >
                Online Deposit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <strong>Amount</strong>    <input onChange={(e) => setOnlineAmount(Number(e.target.value))} type={'number'} className='form-control'></input>
              <strong>Charge:</strong>     {onlineCharge}% <br />
              <strong>Total Amount:</strong>  {onlineAmount + (onlineAmount * onlineCharge / 100)} <br />
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
                onClick={() => handleOnlineDepositSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Balance;
