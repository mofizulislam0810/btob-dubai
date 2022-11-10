import React, { useState } from 'react';
import { Box, Button, Center, Spinner, Text } from "@chakra-ui/react";
import Navbar from '../SharePages/Navbar/Navbar';
import SideNavBar from '../SharePages/SideNavBar/SideNavBar';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { environment } from '../SharePages/Utility/environment';
import axios from 'axios';
import moment from "moment";
import ReactPaginate from "react-paginate";

const Expired = () => {
    let [pageCount, setPageCount] = useState(0);
    let [pageSize, setPageSize] = useState(50);
    let [currentPageNumber, setCurrentPageNumber] = useState(1);
    let [ticketingList, setTicketingList] = useState([]);
    let [uniqueTransID, setUniqueTransID] = useState("");
    let [fromDate, setFromDate] = useState("");
    let [toDate, setToDate] = useState("");
    let [gdsPnr, setGDSPNR] = useState("");

    const [isTimeOut, setIsTimeOut] = useState(false);
  
    useEffect(() => {
      setTimeout(() => setIsTimeOut(true), 10000);
    }, []);

    const handleGetList = (currentPage) => {
        const getTicketingList = async () => {
          let sendObj = {
            agentId: sessionStorage.getItem("agentId") ?? 0,
            uniqueTransID: uniqueTransID,
            fromDate: fromDate,
            toDate: toDate,
            pnr: gdsPnr,
            status: "Booking Cancelled",
          };
          const response = await axios.post(
            environment.getTicketingList +
              `?pageNumber=${currentPage}&pageSize=${pageSize}`,
            sendObj,
            environment.headerToken
          );
          //ticketingList= response.data;
          setTicketingList(await response.data.data);
          setPageCount(await response.data.totalPages);
          console.log(ticketingList);
        };
        getTicketingList();
      };
    
      const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        setCurrentPageNumber(currentPage);
      };

      const handleBookedView = (utid) => {
        window.open("/bookedview?utid=" + utid, "_blank");
        //navigate("/ticket?utid="+utid,'_blank');
      };

    useEffect(() => {
        handleGetList(currentPageNumber);
      }, [currentPageNumber]);
    return (
        <div>
        <Navbar></Navbar>
         <SideNavBar></SideNavBar>
         <ToastContainer />
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
                    <h4>Expired Booking</h4>
                    <hr className="my-3" />
                    <div
                      style={{ overflowX: "scroll", marginBottom: "16px" }}
                    >
                      <table
                        className="table table-bordered table-sm"
                        style={{ width: "100%", fontSize: "13px" }}
                      >
                        <thead className="text-center fw-bold bg-secondary">
                          <tr>
                           <th>Booking Date</th>
                            <th>Booking ID</th>
                            <th className='text-start'>Passenger Name</th>
                            {/* <th className='text-start'>Passenger Type</th> */}
                            {/* <th>Time Limit</th> */}
                            <th>Flight Date</th>
                            <th>Route</th>
                            <th>PNR</th>
                            {/* <th>Ticket Number</th> */}
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="tbody">
                        {ticketingList.length > 0 ? (
                            ticketingList.map((item, index) => {
                              return (
                                <tr key={index}>
                                   <td>
                                    {moment(item.bookingDate).format(
                                      "DD-MM-YYYY hh:mm:ss A"
                                    )}
                                  </td>
                                  <td>
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() =>
                                        handleBookedView(item.uniqueTransID)
                                      }
                                    >
                                      {item.uniqueTransID}
                                    </a>
                                  </td>
                                  <td className='text-start'>{item.leadPaxName}</td>
                                  {/* <td></td> */}
                                  <td>
                                    {item.departure != null ? (
                                      moment(item.departure).format(
                                        "DD-MM-YYYY hh:mm:ss A"
                                      )
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                  <td>
                                  {
                                    item.origin === "null"? "": 
                                    item.journeyType=="Round Trip"?item.origin + (item.destination === "" ? "" : "⇔" + item.destination)
                                    :item.origin + (item.destination === "" ? "" : "→" + item.destination)
                                  }
                                  </td>
                                  
                                  <td>
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() =>
                                        handleBookedView(item.uniqueTransID)
                                      }
                                    >
                                      {item.pnr}
                                    </a>
                                  </td>
                                  <td>{item.ticketingPrice.toLocaleString("en-US")}</td>
                                  <td>
                                    {item.status} <br />{" "}
                                  </td>
                                  <td className="text-left">
                                  
                                      <>
                                        <a href="javascript:void(0)"
                                          title="View Booking"
                                          onClick={() =>
                                            handleBookedView(
                                              item.uniqueTransID
                                            )
                                          }
                                        >
                                          <Button
                                            border="2px solid"
                                            colorScheme="messenger"
                                            variant="outline"
                                            size="xsm"
                                            borderRadius="16px"
                                            p="1"
                                          >
                                            <span style={{fontSize:"10px"}}>VB</span>
                                          </Button>
                                        </a>
                                      </>
                                    
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </tbody>
                      </table>

                      {Object.keys(ticketingList).length === 0 && !isTimeOut && (
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
                    </div>

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
    );
};

export default Expired;