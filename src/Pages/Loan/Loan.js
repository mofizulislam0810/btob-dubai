import React, { useEffect, useState } from "react";
import Footer from "../SharePages/Footer/Footer";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import $ from "jquery";
import axios from "axios";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';
const Loan = () => {
    let [pageCount, setPageCount] = useState(0);
    let [pageSize, setPageSize] = useState(50);
    let [currentPageNumber, setCurrentPageNumber] = useState(1);
    let [loanList, setLoanList] = useState([]);

    let [amount, setAmount] = useState("");
    let [remarks, setRemarks] = useState("");
    let [returnDate, setReturnDate] = useState("");
    const handleGetTransaction = (currentPageNumber) => {
        const getData = async () => {
            let sendObj={remarks:"",isAdmin:false}
          const response = await axios.post(
            environment.agentLoanList + `?pageNumber=${currentPageNumber}&pageSize=${pageSize}`,sendObj,
            environment.headerToken
          );
          console.log(response.data.totalPages)
          setLoanList(response.data.data);
          setPageCount(await response.data.totalPages);
        };
        getData();
      };
      const handleGetEntry = () => {

       
    }
    const handleCreateItem = () => {
       
      };
      const handleEditItem = (item) => {
     
      };
      const clearLoanEntry = () => {
        setRemarks("");
        setReturnDate("");
        setAmount(0);
      }
      const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        setCurrentPageNumber(currentPage);
        // handleGetTransaction(currentPage);
        // handleGetAgentBankAccounts(currentPage);
      };
      let sendObj = {
        remarks: remarks,
        returnDate: returnDate,
        requestedAmount: amount
      };
      const handleSubmit = () => {

          if (returnDate == "") {
            toast.error("Sorry! Return date is empty..");
            return;
          }


        
        if (amount <= 0) {
          toast.error("Sorry! Amount is empty..");
          return;
        }

        const postData = async () => {
          console.log(environment.agentLoan)
          const response = await axios.post(
            environment.agentLoan,
            sendObj,
            environment.headerToken
          ).catch((err)=>{
            toast.error("Sorry! Data not created..");
          });
          console.log(response.data)
          if (response.data.item1) {
            clearLoanEntry();
            toast.success("Thanks! Data created successfully..");
          } else {
            toast.error(response.data.item2);
          }
    
        };
        postData();
      };
      useEffect(() => {
        handleGetEntry();
        handleGetTransaction(currentPageNumber);
      }, [currentPageNumber]);
    
    return (
        <div>
            <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div>
        <div className="content-wrapper search-panel-bg">
          <section className="content-header"></section>
          <section className="content">
            <ToastContainer position="bottom-right" autoClose={1500}/>
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
                  Loan Request
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

                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="entry">
                        <h4>Submit Request</h4>
                        <hr className="my-3"/>
                        <div className="row">
                    
                        </div>

                        <div className="row my-3">
                              <div className="col-sm-3">
                                <label>
                                  Amount
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"text"}
                                  className="form-control"
                                  placeholder="Amount"
                                  onChange={(e) => setAmount(e.target.value)}
                                  value={amount}
                                ></input>
                              </div>
                             
                              <div className="col-sm-3">
                                <label>
                                Adjustement Date
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type={"date"}
                                  className="form-control"
                                  onChange={(e) =>
                                    setReturnDate(e.target.value)
                                  }
                                  value={returnDate}
                                  min={new Date().toISOString().slice(0, 10)}
                                ></input>
                              </div>
                              <div className="col-sm-3">
                                <label>
                                Remarks
                                  
                                </label>
                                <input
                                  type={"text"}
                                  className="form-control"
                                  placeholder="Remarks"
                                  onChange={(e) => setRemarks(e.target.value)}
                                  value={remarks}
                                ></input>
                              </div>
                              <div className="col-sm-12 text-right">
                                <button
                                  className="btn button-color col-sm-1 fw-bold text-white rounded"
                                  type="button"
                                  onClick={() => handleSubmit()}
                                >
                                  Submit
                                </button>

                            </div>
                            </div>
                      </div>

                      <div className="tab-pane fade" id="transaction">
                        <h4>Transaction</h4>
                        <hr  className="my-3"/>
                        <table
                          className="table table-bordered table-sm"
                          style={{ width: "100%",fontSize:"12px"}}
                        >
                          <thead className="text-center fw-bold bg-secondary">
                            <tr>
                              <th>Submitted Date</th>
                              <th>Adjustement Date</th>
                              <th>Loan Code</th>
                              <th>Remarks</th>
                              <th>Status</th>
                              <th>Requested Amount</th>
                              <th>Approved Amount</th>
                            </tr>
                          </thead>
                          <tbody className="tbody text-center">
                            {
                              loanList.length > 0 ?
                              loanList.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      {/* <td>{((currentPageNumber - 1) * pageSize) + index + 1}</td> */}
                                      <td>{moment(item.createdDate).format('DD-MM-yyyy hh:mm A')}</td>
                                      <td>{moment(item.returnDate).format('DD-MM-yyyy hh:mm A')}</td>
                                      <td>{item.loanCode}</td>
                                      <td>{item.remarks}</td>
                                      <td>{item.status}</td>
                                      <td>{item.requestedAmount}</td>
                                      <td>{item.approvedAmount}</td>
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
               
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>


      <Footer></Footer>
        </div>
    );
};

export default Loan;