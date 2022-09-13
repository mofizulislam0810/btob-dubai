import React, { useEffect, useState } from "react";
import Navbar from "../../SharePages/Navbar/Navbar";
import SideNavBar from "../../SharePages/SideNavBar/SideNavBar";
import axios from "axios";
import { environment } from "../../SharePages/Utility/environment";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";
import ReactPaginate from "react-paginate";
import Footer from "../../SharePages/Footer/Footer";
import { Center, Spinner } from "@chakra-ui/react";
const SalesReport = () => {
  const { setLoading, loading } = useAuth();
  const [reportData, setReportData] = useState([]);
  let [fromDate, setFromDate] = useState(new Date().toJSON().slice(0, 10));
  let [toDate, setToDate] = useState(new Date().toJSON().slice(0, 10));
  let [totalBuyingBasePrice, setTotalBuyingBasePrice] = useState(0);
  let [totalBuyingTax, setTotalBuyingTax] = useState(0);
  let [totalBuyingPrice, setTotalBuyingPrice] = useState(0);
  let [totalSellingBasePrice, setTotalSellingBasePrice] = useState(0);
  let [totalSellingTax, setTotalSellingTax] = useState(0);
  let [totalSellingPrice, setTotalSellingPrice] = useState(0);
  let [totalProfit, setTotalProfit] = useState(0);
  let [currencyName, setCurrencyName] = useState("");

  let [pageCount, setPageCount] = useState(0);
  let [pageSize, setPageSize] = useState(10);
  let [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [isTimeOut, setIsTimeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsTimeOut(true), 10000);
  }, []);

  const getReportData = async (currentPageNumber) => {
    const obj = {
      agentId: sessionStorage.getItem("agentId") ?? 0,
      fromDate: fromDate,
      toDate: toDate,
    };
    setLoading(true);
    const response = await axios
      .post(
        environment.salesReport +
          `?pageNumber=${currentPageNumber}&pageSize=${pageSize}`,
        obj,
        environment.headerToken
      )
      .then((res) => {
        console.log(res);
        setReportData(res.data.data);
        setPageCount(res.data.totalPages);
        res.data.data.map((item, index) => {
          setCurrencyName(item.currencyName);
          setTotalBuyingBasePrice(
            (totalBuyingBasePrice += Number(item.basePriceBuying))
          );
          setTotalBuyingTax((totalBuyingTax += Number(item.taxesBuying)));
          setTotalBuyingPrice((totalBuyingPrice += Number(item.priceBuying)));
          setTotalSellingBasePrice(
            (totalSellingBasePrice += Number(item.basePriceSelling))
          );
          setTotalSellingTax((totalSellingTax += Number(item.taxesSelling)));
          setTotalSellingPrice(
            (totalSellingPrice += Number(item.priceSelling))
          );
          setTotalProfit((totalProfit += Number(item.profit)));
        });
        setLoading(false);
      });
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
    getReportData(currentPage);
  };

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
  };

  const handleSubmit = () => {
    getReportData(currentPageNumber);
  };
  const handleViewTicket = (utid) => {
    window.open("/ticket?utid=" + utid, "_blank");
  };
  useEffect(() => {
    getReportData(currentPageNumber);
  }, [currentPageNumber]);

  console.log(reportData);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <section className="content">
          {loading ? (
            <Loading flag={2}></Loading>
          ) : (
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
                        <h4> Sales Report</h4>
                        <hr className="my-3" />
                        <div
                          className="row"
                          style={{ width: "100%", paddingBottom: "5px" }}
                        >
                          <div className="col-sm-12 text-left pb-2">
                            <div className="d-flex float-end">
                              <input
                                type="date"
                                class="form-control w-50 rounded-start"
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
                                className="btn btn-secondary fw-bold rounded-end"
                                onClick={handleSubmit}  style={{fontSize:"12px"}}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                        <div style={{ overflowY: "scroll" }}>
                          <table
                            className="table table-bordered table-sm"
                            style={{ width: "100%", fontSize: "12px" }}
                          >
                            <thead className="text-center fw-bold bg-secondary">
                              <tr>
                                <th>Sl</th>
                                <th>PNR</th>
                                <th>Ticket Number</th>
                                <th className="text-start">Passanger Name</th>
                                <th>Passanger Type</th>
                                {/* <th colSpan={3}>Buying</th> */}
                                {/* <th colSpan={3}>Selling</th> */}
                                <th className="text-end">Base Fare</th>
                                <th className="text-end">Tax</th>
                                <th className="text-end">Total Price</th>
                                {/* <th rowSpan={2}>Profit</th> */}
                              </tr>
                              {/* <tr>
                                <th>Base Price</th>
                                <th>Tax</th>
                                <th>Total Price</th>
                                <th>Base Price</th>
                                <th>Tax</th>
                                <th>Total Price</th>
                              </tr> */}
                            </thead>
                            <tbody className="tbody">
                              {reportData !== undefined ? (
                                reportData?.map((item, index) => {
                                  return (
                                    <>
                                      <tr key={index}>
                                        <td className="text-center">{index + 1}</td>

                                        <td className="text-center">
                                          &nbsp;{" "}
                                          <a
                                            style={{ borderRadius: "50%" }}
                                            href="javascript:void(0)"
                                            title="Ticket"
                                            onClick={() =>
                                              handleViewTicket(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            {item.pnr}
                                          </a>
                                        </td>
                                        <td className="text-center">
                                          {" "}
                                          <span
                                            key={index}
                                            data-tip={
                                              item.paxNames !== undefined ? (
                                                item.paxNames
                                                  .split(",")
                                                  .map((item, index) => {
                                                    return (
                                                      index +
                                                      1 +
                                                      ". " +
                                                      item.replace(",", " ") +
                                                      "<br/>"
                                                    );
                                                  })
                                              ) : (
                                                <></>
                                              )
                                            }
                                          >
                                            &nbsp;{" "}
                                            <a
                                              style={{ borderRadius: "50%" }}
                                              href="javascript:void(0)"
                                              title="Ticket"
                                              onClick={() =>
                                                handleViewTicket(
                                                  item.uniqueTransID
                                                )
                                              }
                                            >
                                              {item.ticketNumbers}
                                            </a>
                                          </span>{" "}
                                        </td>
                                        <td className="text-start">{item.paxNames}</td>
                                        {/* <td style={{ textAlign: "right" }}>
                                          {item.basePriceBuying}
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.taxesBuying}
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.priceBuying}
                                        </td> */}
                                        <td className="text-center"></td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.basePriceSelling}
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.taxesSelling}
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.priceSelling}
                                        </td>
                                        {/* <td style={{ textAlign: "right" }}>
                                          {item.profit}
                                        </td> */}
                                      </tr>
                                    </>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </tbody>
                            <tfoot>
                              {reportData !== undefined &&
                              reportData?.length > 0 ? (
                                <>
                                  {" "}
                                  <tr>
                                    <td
                                      colSpan={5}
                                      style={{ textAlign: "right" }}
                                    >
                                      <strong>
                                        Grand Total ({currencyName})
                                      </strong>
                                    </td>
                                    {/* <td style={{ textAlign: "right" }}>
                                      <strong>{(totalBuyingBasePrice).toFixed(2)}</strong>
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                      <strong>{totalBuyingTax}</strong>
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                      <strong>{totalBuyingPrice}</strong>
                                    </td> */}
                                    <td style={{ textAlign: "right" }}>
                                      <strong>{(totalSellingBasePrice).toFixed(2)}</strong>
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                      <strong>{(totalSellingTax).toFixed(2)}</strong>
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                      <strong>{(totalSellingPrice).toFixed(2)}</strong>
                                    </td>
                                    {/* <td style={{ textAlign: "right" }}>
                                      <strong>{totalProfit}</strong>
                                    </td> */}
                                  </tr>
                                </>
                              ) : (
                                <></>
                              )}
                            </tfoot>
                          </table>

                          {Object.keys(reportData).length === 0 && !isTimeOut && (
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
                        <ReactTooltip effect="solid" html={true}></ReactTooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SalesReport;
