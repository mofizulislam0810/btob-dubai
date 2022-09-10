import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavBar from "../SharePages/SideNavBar/SideNavBar";
import currentYear from "../SharePages/Utility/currentYear";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import ReactPaginate from "react-paginate";
import Footer from "../SharePages/Footer/Footer";
import { Center, Spinner } from "@chakra-ui/react";
const Ledger = () => {
  const [ledgerData, setLedgerData] = useState();
  let [fromDate, setFromDate] = useState(new Date().toJSON().slice(0, 10));
  let [toDate, setToDate] = useState(new Date().toJSON().slice(0, 10));
  let [balanceType, setBalanceType] = useState(null);
  let [currencyName, setCurrencyName] = useState("");

  let [pageCount, setPageCount] = useState(0);
  let [pageSize, setPageSize] = useState(10);
  let [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [isTimeOut, setIsTimeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsTimeOut(true), 10000);
  }, []);

  const getLedgerData = async (currentPageNumber) => {
    const obj = {
      agentId: sessionStorage.getItem("agentId") ?? 0,
      fromDate: fromDate,
      toDate: toDate,
      balanceType: balanceType,
    };
    const response = await axios.post(
      environment.accountLedger +
        `?pageNumber=${currentPageNumber}&pageSize=${pageSize}`,
      obj,
      environment.headerToken
    );
    setCurrencyName(response.data.data[0]?.currencyName);
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
                      <h4> Account ledger</h4>
                      <hr className="my-3" />
                      <div
                        className="row"
                        style={{ width: "100%", paddingBottom: "5px" }}
                      >
                        <div className="col-sm-12 text-left ">
                          <div className="d-flex float-end pb-2">
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle fw-bold rounded-start text-white"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{fontSize:"12px",height:"100%"}}
                              >
                                {balanceType === null ? (
                                  "All"
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
                                  style={{fontSize:"12px"}}
                                >
                                  All
                                </li>
                                <li
                                  class="dropdown-item"
                                  onClick={() => setBalanceType(0)}
                                  style={{fontSize:"12px"}}
                                >
                                  Debit
                                </li>
                                <li
                                  class="dropdown-item"
                                  onClick={() => setBalanceType(1)}
                                  style={{fontSize:"12px"}}
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
                              style={{fontSize:"12px"}}
                            />
                            <input
                              type="date"
                              class="form-control w-50"
                              name="to"
                              value={toDate}
                              onChange={(e) => handleToDate(e)}
                              style={{fontSize:"12px"}}
                            />
                            <button
                              type="button"
                              className="btn btn-secondary fw-bold rounded-end text-white"
                              onClick={handleSubmit}
                              style={{fontSize:"12px"}}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                      <div style={{ overflowY: "scroll" }}>
                        <table
                          className="table table-bordered table-sm"
                          style={{ width: "100%", fontSize: "13px" }}
                        >
                          <thead className="text-center fw-bold bg-secondary">
                            <tr>
                              <th>Booking ID</th>
                              <th>PNR</th>
                              <th>Ticket Number</th>
                              <th>Passenger Name</th>
                              <th className="text-start">Description</th>
                              <th>Created By</th>
                              <th>Type</th>
                              <th className="text-end">
                                Debit{" "}
                                {currencyName ? "(" + currencyName + ")" : ""}
                              </th>
                              <th className="text-end">
                                Credit{" "}
                                {currencyName ? "(" + currencyName + ")" : ""}
                              </th>
                              <th className="text-end">
                                Running Balance{" "}
                                {currencyName ? "(" + currencyName + ")" : ""}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="tbody">
                            {ledgerData !== undefined ? (
                              ledgerData?.map((item, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{item.uniqueTransID}</td>
                                      <td>{item.pnr}</td>
                                      <td>{item.ticketNumbers}</td>
                                      <td>{item.passengerName}</td>
                                      <td>{item.description}</td>
                                      <td className="text-center">{item.createdByName}</td>
                                      <td>
                                       {item.transactionType}
                                      </td>
                                      <td className="fw-bold text-end">
                                        {item.debitAmount}
                                      </td>
                                      <td className="fw-bold text-end">
                                        {item.creditAmount}
                                      </td>
                                      <td className="fw-bold text-end">
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

                        {ledgerData?.length === 0 && !isTimeOut && (
                          <Center w="100%" py="50px">
                            <Spinner
                              thickness="4px"
                              speed="0.65s"
                              emptyColor="gray.200"
                              color="red.500"
                              size="xl"
                            />
                          </Center>
                        )}

                        <ReactPaginate
                          previousLabel={"previous"}
                          nextLabel={"next"}
                          breakLabel={"..."}
                          pageCount={pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={3}
                          onPageChange={handlePageClick}
                          containerClassName={
                            "pagination justify-content-center"
                          }
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
      </div>
      <Footer />
    </div>
  );
};

export default Ledger;
