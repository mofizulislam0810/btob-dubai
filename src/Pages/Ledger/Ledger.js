import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import currentYear from "../SharePages/Utility/currentYear";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import ReactPaginate from 'react-paginate';
const Ledger = () => {
  const [ledgerData, setLedgerData] = useState();
  let [fromDate, setFromDate] = useState(new Date().toJSON().slice(0, 10));
  let [toDate, setToDate] = useState(new Date().toJSON().slice(0, 10));
  let [balanceType, setBalanceType] = useState(null);
  console.log(balanceType);

  let [pageCount, setPageCount] = useState(0);
  let [pageSize, setPageSize] = useState(10);
  let [currentPageNumber,setCurrentPageNumber]=useState(1);
  const getLedgerData = async (currentPageNumber) => {
    const obj = {
      agentId: sessionStorage.getItem("agentId") ?? 0,
      fromDate: fromDate,
      toDate: toDate,
      balanceType: balanceType,
    };
    const response = await axios.post(
      environment.accountLedger+`?pageNumber=${currentPageNumber}&pageSize=${pageSize}`,
      obj,
      environment.headerToken
    );
    setLedgerData(response.data.data);
    setPageCount(response.data.totalPages);
  };
  console.log(ledgerData);

  const handleFromDate = (e) => {
    console.log(e.target.value);
    setFromDate(e.target.value);
  };
  const handleToDate = (e) => {
    console.log(e.target.value);
    setToDate(e.target.value);
  };
  const handlePageClick = async (data) => {


    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
    getLedgerData(currentPage);
  };
  const handleSubmit = () => {
    

    getLedgerData(currentPageNumber);
  };
  useEffect(() => {
    getLedgerData(currentPageNumber);
  }, [currentPageNumber]);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <section className="content">
          <form
            className="mx-5 mt-3"
            encType="multipart/form-data"
            style={{ minHeight: "500px" }}
          >
            <div className="card">
              <div className="card-body">
                <div className="m-4">
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="tp1">
                      <h4 className="mt-2"> Account ledger</h4>
                      <hr />
                      <div
                        className="row"
                        style={{ width: "100%", paddingBottom: "5px" }}
                      >
                        <div className="col-sm-12 text-left">
                          <div className="d-flex float-end">
                            <div class="dropdown">
                              <button
                                class="btn bg-danger dropdown-toggle fw-bold"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {balanceType === null ? (
                                  "Balance Type"
                                ) : balanceType === 0 ? (
                                  "Debit"
                                ) : balanceType === 1 ? (
                                  "Credit"
                                ) : (
                                  <></>
                                )}
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li
                                  class="dropdown-item"
                                  onClick={() => setBalanceType(null)}
                                >
                                  Balance Type
                                </li>
                                <li
                                  class="dropdown-item"
                                  onClick={() => setBalanceType(0)}
                                >
                                  Debit
                                </li>
                                <li
                                  class="dropdown-item"
                                  onClick={() => setBalanceType(1)}
                                >
                                  Credit
                                </li>
                              </ul>
                            </div>
                            <input
                              type="date"
                              class="form-control w-50"
                              name="from"
                              value={fromDate}
                              onChange={(e) => handleFromDate(e)}
                            />
                            <input
                              type="date"
                              class="form-control w-50"
                              name="to"
                              value={toDate}
                              onChange={(e) => handleToDate(e)}
                            />
                            <button
                              type="button"
                              className="btn btn-danger fw-bold"
                              onClick={handleSubmit}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                      <div style={{ overflowY: "scroll" }}>
                        <table
                          className="table table-bordered"
                          style={{ width: "100%", fontSize: "13px" }}
                        >
                          <thead className="text-center fw-bold">
                            <tr>
                              <th>Sl</th>
                              <th>Description</th>
                              <th>Created By</th>
                              <th>Balance Type</th>
                              <th>Debit</th>
                              <th>Credit</th>
                              <th>Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ledgerData !== undefined ? (
                              ledgerData?.map((item, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{item.description}</td>
                                      <td>{item.createdByName}</td>
                                      <td>
                                        {item.balanceTypeName}{" "}
                                        <span style={{ fontSize: "13px" }}>
                                          (
                                          {moment(item.createdDate).format(
                                            "DD-MMMM-yyyy hh:mm:ss A"
                                          )}
                                          )
                                        </span>{" "}
                                      </td>
                                      <td className="fw-bold">
                                        {item.debitAmount}
                                      </td>
                                      <td className="fw-bold">
                                        {item.creditAmount}
                                      </td>
                                      <td className="fw-bold">
                                        {item.balanceAmount}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : (
                              <></>
                            )}
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
            </div>
          </form>
        </section>
        <div className="text-center text-white pt-5 pb-2 mt-5">
          {/* <b>Version</b> 3.1.0 */}
          <strong>Copyright &copy; 2020-2022 All rights reserved.</strong>
        </div>
      </div>
    </div>
  );
};

export default Ledger;
