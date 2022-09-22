import React, { useEffect, useState } from 'react';
import Navbar from '../SharePages/Navbar/Navbar';
import SideNavBar from '../SharePages/SideNavBar/SideNavBar';
import { environment } from "../SharePages/Utility/environment";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { Box, Button, Center, Spinner, Text } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "./Queues.css";
import $ from "jquery";

const IssuedFromLoan = () => {
    let [pageCount, setPageCount] = useState(0);
    let [pageSize, setPageSize] = useState(50);
    let [currentPageNumber, setCurrentPageNumber] = useState(1);
    const location = useLocation();
    let searchId = Number(location.search.split("=")[1]);
    let [statusId, setStatusId] = useState(0);
    let [ticketingList, setTicketingList] = useState([]);
    let [uniqueTransID, setUniqueTransID] = useState("");
    let [fromDate, setFromDate] = useState("");
    let [toDate, setToDate] = useState("");
    let [gdsPnr, setGDSPNR] = useState("");
    let [uniqueTransIDAdj,setUniqueTransIDAdj]=useState("");
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
                status: "Issued",
                isFromLoan:true
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

    const handleDateChange = (status, utid, pnr, ticketno) => {
        if (status === "Issued") {
            window.open(
                "/support?typeid=2&subjectid=2&utid=" +
                utid +
                "&pnr=" +
                pnr +
                "&ticketno=" +
                (ticketno == undefined ? "" : ticketno),
                "_blank"
            );
        } else {
            window.open(
                "/support?typeid=1&subjectid=2&utid=" +
                utid +
                "&pnr=" +
                pnr +
                "&ticketno=" +
                (ticketno == undefined ? "" : ticketno),
                "_blank"
            );
        }
    };
    const handleRaiseSupport = (status, utid, pnr, ticketno) => {
        //window.open("/support?utid="+utid,'_blank')
        if (status === "Issued") {
            window.open(
                "/support?typeid=2&subjectid=0&utid=" +
                utid +
                "&pnr=" +
                pnr +
                "&ticketno=" +
                (ticketno == undefined ? "" : ticketno),
                "_blank"
            );
        } else {
            window.open(
                "/support?typeid=1&subjectid=0&utid=" +
                utid +
                "&pnr=" +
                pnr +
                "&ticketno=" +
                (ticketno == undefined ? "" : ticketno),
                "_blank"
            );
        }
    };
    const handleCancel = (status, utid, pnr, ticketno) => {
        //window.open("/support?utid="+utid,'_blank')
        if (status === "Issued") {
            window.open(
                "/support?typeid=2&subjectid=1&utid=" +
                utid +
                "&pnr=" +
                pnr +
                "&ticketno=" +
                ticketno,
                "_blank"
            );
        } else {
            window.open(
                "/support?typeid=1&subjectid=1&utid=" +
                utid +
                "&pnr=" +
                pnr +
                "&ticketno=" +
                ticketno,
                "_blank"
            );
        }
    };
    const handleTicketingVoid = (status, utid, pnr, ticketno) => {
        // alert(ticketno);
        //window.open("/support?utid="+utid,'_blank')
        if (status === "Issued") {
            window.open(
                "/support?typeid=2&subjectid=5&utid=" +
                utid +
                "&pnr=" +
                pnr +
                "&ticketno=" +
                ticketno,
                "_blank"
            );
        }
    };
    const handleViewTicket = (utid) => {
        window.open("/ticket?utid=" + utid, "_blank");
        //navigate("/ticket?utid="+utid,'_blank');
    };

    const handleBookedView = (utid) => {
        window.open("/bookedview?utid=" + utid, "_blank");
        //navigate("/ticket?utid="+utid,'_blank');
    };

    const handleViewInvoice = (utid) => {
        window.open("/invoice?utid=" + utid, "_blank");
        //navigate("/invoice?utid="+utid,'_blank');
    };
    const handleViewVoucher = (utid) => {
        window.open("/voucher?utid=" + utid, "_blank");
        // navigate("/voucher?utid="+utid,'_blank');
    };
    const handleRefundReq = (utid) => {
        var result = window.confirm("Are you sure to request refund");
        if (result) {
            console.log(environment.headerToken);
            const refundReq = async () => {
                await axios
                    .put(
                        environment.ticketRefundRequest + "/" + utid,
                        null,
                        environment.headerToken
                    )
                    .then((res) => {
                        if (res.data > 0) {
                            // window.location.reload();
                            toast.success("Thanks! Refund successfully requested..");
                        }
                    });
            };
            refundReq();
        }
    };
    const handleLoanAdjust=()=>{
        const loanAdj = async () => {
            let sendObj={uniqueTransID:uniqueTransIDAdj}
            await axios
                .put(
                    environment.agentLoanAdjust,
                    sendObj,
                    environment.headerToken
                )
                .then((res) => {
                    console.log(res.data.item1)
                    if (res.data.item1==true) {
                        handleGetList(1);
                        toast.success("Thanks! Adjusted successfully..");
                        $("#closeModal").click();
                        $(".modal-backdrop").remove();
                        $("body").removeClass("modal-open");
                        $("body").removeAttr("style");
                    }
                    else{
                        toast.warning(res.data.item2);
                    }
                });
        };
        loanAdj();
    }
    const handleOpenAdjustModal=(utid)=>{
        setUniqueTransIDAdj(utid);
    }
    useEffect(() => {
        handleGetList(currentPageNumber);
    }, [currentPageNumber]);
    

    console.log(ticketingList);
    

    return (
        <div>
            <Navbar></Navbar>
            <SideNavBar></SideNavBar>
            <div className="content-wrapper search-panel-bg">
                <section className="content-header"></section>
                <section className="content">
                <ToastContainer position="bottom-right" autoClose={1500}/>
                    {/* <Loading loading={loading}></Loading> */}
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
                                            <h4>Ticketed From Loan</h4>
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
                                                            {/* <th>SL</th> */}
                                                            <th>Issue Date</th>
                                                            <th>Booking Date</th>
                                                            <th>Booking ID</th>
                                                            <th className='text-start'>Passenger Name</th>
                                                            {/* <th>Passenger Type</th> */}
                                                            <th>Flight Date</th>
                                                            <th>Route</th>
                                                            <th>PNR</th>
                                                            <th>Ticket Number</th>
                                                            <th>Total Price</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="tbody">
                                                        {ticketingList.length > 0 ? (
                                                            ticketingList.map((item, index) => {
                                                                return (
                                                                    <tr key={index} className={moment().format('YYYY-MM-DD') === moment(item.returnDate).format('YYYY-MM-DD') && item.isReturned==false? "tr-color" : ""}>
                                                                        {/* <td>
                                                                            {(currentPageNumber - 1) * pageSize +
                                                                                index +
                                                                                1}
                                                                        </td> */}
                                                                         <td>
                                                                            {item.returnDate}
                                                                            {item.issueDate != null ? (
                                                                                moment(item.issueDate).format(
                                                                                    "DD-MM-YYYY hh:mm:ss A"
                                                                                )
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {moment(item.bookingDate).format(
                                                                                "DD-MM-YYYY hh:mm:ss A"
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            <a
                                                                                href="javascript:void(0)"
                                                                                onClick={() =>
                                                                                    handleViewTicket(item.uniqueTransID)
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
                                                                                    handleViewTicket(item.uniqueTransID)
                                                                                }
                                                                            >
                                                                                {item.pnr}
                                                                            </a>
                                                                        </td>
                                                                        <td>{item.ticketNumber}</td>
                                                                        <td>{item.ticketingPrice + " "+(item.isReturned==true?"(Adjusted)":"")+""}</td>
                                                                        <td>
                                                                            {item.status === "Issued" ? "Ticketed" :" "} <br />{" "}
                                                                            {item.refundStatus != null
                                                                                ? "Refund " + item.refundStatus
                                                                                : ""}
                                                                        </td>
                                                                        <td className="text-left">
                                                                            <>
                                                                                <a href="javascript:void(0)"
                                                                                    title="View Ticket"
                                                                                    onClick={() =>
                                                                                        handleViewTicket(
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
                                                                                        p='1'
                                                                                    >
                                                                                      <span style={{fontSize:"10px"}}>VT</span>
                                                                                    </Button>
                                                                                </a>
                                                                                &nbsp;{" "}
                                                                                <a href="javascript:void(0)"
                                                                                    title="Invoice"
                                                                                    onClick={() =>
                                                                                        handleViewInvoice(
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
                                                                                        p='1'
                                                                                    >
                                                                                        <span style={{fontSize:"10px"}}>IN</span>
                                                                                    </Button>
                                                                                </a>
                                                                                {/* &nbsp;{" "}
                                                                                <a href="javascript:void(0)"
                                                                                    title="Voucher"
                                                                                    onClick={() =>
                                                                                        handleViewVoucher(
                                                                                            item.uniqueTransID
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <Button
                                                                                        border="2px solid"
                                                                                        colorScheme="messenger"
                                                                                        variant="outline"
                                                                                        size="sm"
                                                                                        borderRadius="16px"
                                                                                    >
                                                                                        VO
                                                                                    </Button>
                                                                                </a> */}
                                                                                {/* &nbsp;{" "}
                                                                                <a href="javascript:void(0)"
                                                                                    title="Date Change"
                                                                                    onClick={() =>
                                                                                        handleDateChange(
                                                                                            item.status,
                                                                                            item.uniqueTransID,
                                                                                            item.pnr,
                                                                                            item.ticketNumber
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <Button
                                                                                        border="2px solid"
                                                                                        colorScheme="messenger"
                                                                                        variant="outline"
                                                                                        size="xsm"
                                                                                        borderRadius="16px"
                                                                                        p='1'
                                                                                    >
                                                                                      <span style={{fontSize:"10px"}}>DC</span>
                                                                                    </Button>
                                                                                </a> */}
                                                                                &nbsp;{" "}
                                                                                <a href="javascript:void(0)"
                                                                                    title="Raise Support"
                                                                                    onClick={() =>
                                                                                        handleRaiseSupport(
                                                                                            item.status,
                                                                                            item.uniqueTransID,
                                                                                            item.pnr,
                                                                                            item.ticketNumber
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <Button
                                                                                        border="2px solid"
                                                                                        colorScheme="messenger"
                                                                                        variant="outline"
                                                                                        size="xsm"
                                                                                        borderRadius="16px"
                                                                                        p='1'
                                                                                    >
                                                                                         <span style={{fontSize:"10px"}}>RS</span>
                                                                                    </Button>
                                                                                </a>&nbsp;{" "}
                                                                                {/* <button type="button" id="btnOpenModal" className="btn btn-sm btn-secondary text-white my-2 rounded" style={{fontSize:"12px"}} data-bs-toggle="modal" data-bs-target="#supportModal" onClick={()=>clearSupportForm()}>
												Add
											</button> */}
                                            {
                                                                                            item.isReturned==false?
                                                <><a href="javascript:void(0)"
                                                                                
                                                title="Loan Adjust"
                                                onClick={() =>
                                                    handleOpenAdjustModal(
                                                        item.uniqueTransID
                                                    )
                                                }
                                            >
                                                <Button type="button"
                                                data-bs-toggle="modal" data-bs-target="#confirmModal"
                                                    border="2px solid"
                                                    colorScheme="messenger"
                                                    variant="outline"
                                                    size="xsm"
                                                    borderRadius="16px"
                                                    p='1'
                                                >
                                                     <span style={{fontSize:"10px"}}>LA</span>
                                                </Button>
                                            </a>
                                                </>:
                                                <></>
                                            }
                                                                                
                                                                                &nbsp;
                                                                                {moment(
                                                                                    moment(item.issueDate).format(
                                                                                        "YYYY-MM-DD"
                                                                                    ) + " 12:00:00 PM"
                                                                                ) > moment() ? (
                                                                                    <a href="javascript:void(0)"
                                                                                        title="Ticketing Cancel"
                                                                                        onClick={() =>
                                                                                            handleCancel(
                                                                                                item.status,
                                                                                                item.uniqueTransID,
                                                                                                item.pnr,
                                                                                                item.ticketNumber
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <Button
                                                                                            border="2px solid"
                                                                                            colorScheme="messenger"
                                                                                            variant="outline"
                                                                                            size="xsm"
                                                                                            borderRadius="16px"
                                                                                            p='1'
                                                                                        >
                                                                                            <span style={{fontSize:"10px"}}>TC</span>
                                                                                        </Button>
                                                                                    </a>
                                                                                    
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {/* &nbsp;{" "}
                                                                                <a href="javascript:void(0)"
                                                                                    title="Ticketing Void"
                                                                                    onClick={() =>
                                                                                        handleTicketingVoid(
                                                                                            item.status,
                                                                                            item.uniqueTransID,
                                                                                            item.pnr,
                                                                                            item.ticketNumber
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <Button
                                                                                        border="2px solid"
                                                                                        colorScheme="messenger"
                                                                                        variant="outline"
                                                                                        size="xsm"
                                                                                        borderRadius="16px"
                                                                                        p='1'
                                                                                    >
                                                                                        <span style={{fontSize:"10px"}}>TV</span>
                                                                                    </Button>
                                                                                </a> */}
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
                        <div className="modal fade" id="confirmModal" tabIndex={-1} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "300px" }}>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title"> Support</h5>
                                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                    </div>
                                    <div className="modal-body">
                                        <div className='row text-center' style={{fontSize:"12px"}}>
                                                <p>Are you sure want adjust {uniqueTransIDAdj}?</p>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary rounded" id="closeModal" data-bs-dismiss="modal">No</button>
                                        <button type="button" className="btn button-color fw-bold text-white rounded" onClick={() => handleLoanAdjust()}>Ok</button>
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

export default IssuedFromLoan;