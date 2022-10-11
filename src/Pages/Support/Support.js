import React, { useEffect, useState } from 'react';
import Navbar from '../SharePages/Navbar/Navbar';
import SideNavBar from '../SharePages/SideNavBar/SideNavBar';
import Footer from '../SharePages/Footer/Footer';
import './Support.css';
import axios from "axios";
import { environment } from '../SharePages/Utility/environment';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';
const Support = () => {
	const location = useLocation();
	const [refundType, setRefundType] = useState("Full");
	let [message, setMessage] = useState('');
	let [fileName, setFileName] = useState('');
	let [status, setStatus] = useState(0);
	let [historyFileName, setHistoryFileName] = useState('');
	let [historyMessage, setHistoryMessage] = useState('');
	let [passengerList, setPassengerList] = useState([]);
	let [uniqueTransID, setUniqueTransID] = useState("");
	let [i,setI]=useState(0);
	let typeid = 2;
	let subjectid = 0;
	let utid = "";
	let pnrs = "";
	let ticketno = "";
	let s3URL = "https://tlluploaddocument.s3.ap-southeast-1.amazonaws.com/";
	let staticURL ="wwwroot/Uploads/Support/";

	const handleGetPassengerList = (trid) => {
		const getPassengerList = async () => {
		  const response = await axios.get(
			environment.passengerListByIds + "/" + "All" + "/" + trid,
			environment.headerToken
		  );
		  setPassengerList(response.data);
			console.log(response.data)
		};
		getPassengerList();
	  };
	  const handleGetPassengerListByPNr = (pnr) => {
		const getPassengerList = async () => {
		  const response = await axios.get(
			environment.passengerListByPnr +"/"+ pnr,
			environment.headerToken
		  );
		  setPassengerList(response.data);
			console.log(response.data)
		};
		getPassengerList();
	  };
	console.log(location)
	if (location.search !== "") {
		
		if(i==0){
			typeid = Number(location.search.split('=')[1].split('&')[0]);
			subjectid = Number(location.search.split('=')[2].split('&')[0]);
			utid = location.search.split('=')[3].split('&')[0];
			pnrs = location.search.split('=')[4].split('&')[0];
			ticketno = location.search.split('=')[5].split('&')[0];
			setUniqueTransID(utid);
			handleGetPassengerList(utid);
			setI(i+1);
		}
		
	}

	const handleSetUniqueTransID=(utid)=>{
		console.log(utid);
		setPassengerList([]);
		if(utid){
			setUniqueTransID(utid);
			handleGetPassengerList(utid);
		}else{
			setUniqueTransID('');
			handleGetPassengerList(utid);
		}
	}
const handleSetPNR=(pnr)=>{
	setPassengerList([]);
	if(pnr){
		setPNR(pnr);
		handleGetPassengerListByPNr(pnr);
	}else{
		setPNR('');
		setPassengerList([]);
	}
}
	let [supportTypeId, setSupportTypeId] = useState(typeid);
	let [subjectId, setSubjectId] = useState(subjectid);
	let [searchSubjectId,setSearchSubjectId]=useState(0);

	let [pnr, setPNR] = useState(pnrs);
	let [defaultTicketNumber, setDefaultTicketno] = useState(ticketno);
	let [ticketNumbers, setTicketno] = useState(ticketno!=""?","+ticketno:"");
	const handleSetTicketNo=(isChecked,tNo)=>{
		if(isChecked){
				let ticketNew=ticketNumbers+","+tNo
				// ticketNew=ticketNew.substring(1,ticketNew.length())
				setTicketno(ticketNew);
		}else{
			let ticketNew=ticketNumbers.replace(","+tNo,"");
			setTicketno(ticketNew)
		}
	}

	let [supporttypeList, setSupportTypeList] = useState([]);
	let [subjectList, setSubjectList] = useState([]);
	let [supportOpenedList, setSupportOpenedList] = useState([]);
	let [supportOngoingList, setSupportOngoingList] = useState([]);
	let [supportClosedList, setSupportClosedList] = useState([]);
	let [currentItem, setCurrentItem] = useState({});
	let [supportHistoryList, setSupportHistoryList] = useState([]);
	let [fileCurrentName, setCurrentFileName] = useState('');
	let [pageSize, setPageSize] = useState(10);
	let [pageCount, setPageCount] = useState(0);
	let [pageNumber, setPageNumber] = useState(1);

	let [pageSizeH, setPageSizeH] = useState(10);
	let [pageCountH, setPageCountH] = useState(0);
	let [pageNumberH, setPageNumberH] = useState(1);
	const getSupportHistory = async (item, pageNumberH) => {
		setCurrentItem(item)
		const response = await axios.get(environment.getSupportHistoriesByAgentList + "/" + (sessionStorage.getItem('agentId') ?? 0) + "/" + (item == null ? 0 : item.id) + "/" + true + `?pageNumber=${pageNumberH}&pageSize=${pageSizeH}`, environment.headerToken);
		setSupportHistoryList(response.data.data);
		setPageCountH(response.data.totalPages);
	};
	const handlePageClickH = async (data) => {
		let currentPage = data.selected + 1;
		setPageNumberH(currentPage);
		getSupportHistory(currentItem, currentPage);
	};
	const handleGetOpened = (pageNumber) => {
		setCurrentItem(null);
		const getSupportType = async () => {
			const response = await axios.get(environment.getsupporttypeList, environment.headerToken);
			setSupportTypeList(response.data)
		};
		getSupportType();
		const getSubject = async () => {
			const response = await axios.get(environment.getsubjectList, environment.headerToken);
			setSubjectList(response.data)
		};
		getSubject();
		const getSupport = async () => {
			const response = await axios.get(environment.getSupportInfoesByStatustList + "/" + (sessionStorage.getItem('agentId') ?? 0) + "/" + 1+ "/" + searchSubjectId + `?pageNumber=${pageNumber}&pageSize=${pageSize}`, environment.headerToken);
			setSupportOpenedList(response.data.data)
			setPageCount(response.data.totalPages);
			console.log(response.data.data)
		};
		getSupport();

	}
	const handleGetOngoing = (pageNumber) => {
		const getSupport = async () => {
			const response = await axios.get(environment.getSupportInfoesByStatustList + "/" + (sessionStorage.getItem('agentId') ?? 0) + "/" + 2 + "/" + searchSubjectId + `?pageNumber=${pageNumber}&pageSize=${pageSize}`, environment.headerToken);
			setSupportOngoingList(response.data.data);
			setPageCount(response.data.totalPages);
		};
		getSupport();
		getSupportHistory(currentItem, 1);
	}
	const handleGetClosed = (pageNumber) => {
		const getSupport = async () => {
			const response = await axios.get(environment.getSupportInfoesByStatustList + "/" + (sessionStorage.getItem('agentId') ?? 0) + "/" + 3 + "/" + searchSubjectId + `?pageNumber=${pageNumber}&pageSize=${pageSize}`, environment.headerToken);
			setSupportClosedList(response.data.data)
			setPageCount(response.data.totalPages);
		};
		getSupport();
	}
	const handlePageClick = async (data) => {
		let currentPage = data.selected + 1;
		setPageNumber(currentPage);
		handleGetOpened(currentPage);
		handleGetOngoing(currentPage);
		handleGetClosed(currentPage);
	};
	const handleEditItem = (item) => {

		setCurrentItem(item);
		setSupportTypeId(item.supportTypeId);
		setSubjectId(item.subjectId);
		setMessage(item.message);
		setFileName(item.fileName);
		setStatus(item.status);
		setRefundType(item.refundType);
		setUniqueTransID(item.uniqueTransID);
		setPNR(item.pnr);
		setTicketno(item.ticketNumber);
	}
	const clearForm = (item) => {
		setCurrentItem(null);
		setSupportTypeId(0);
		setSubjectId(0);
		setMessage("");
		setFileName("");
		setStatus("");
		setUniqueTransID("");
		setPNR("");
		setTicketno("");
	}
	const handleFileUpload = (file) => {
		var formData = new FormData();
		formData.append(`file`, file);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		const postData = async () => {
			const response = await axios.post(environment.supportFileUpload, formData, config);
			setFileName(response.data.fileName);
		};
		postData();
	}
	const handleHistoryFileUpload = (file) => {
		setCurrentFileName(file.name);
		var formData = new FormData();
		formData.append(`file`, file);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		const postData = async () => {
			const response = await axios.post(environment.historyFileUpload, formData, config);
			setHistoryFileName(response.data.fileName);
		};
		postData();
	}



	
	const handleHistorySubmit = () => {
		let historyObj = { supportId: currentItem == null ? 0 : currentItem.id, agentId: (sessionStorage.getItem('agentId') ?? 0), message: historyMessage, fileName: historyFileName, isAgent: true };
		if (historyMessage == "") {
			toast.error("Sorry! Message is empty..");
			return;
		}
		const postData = async () => {
			const response = await axios.post(environment.supportHistory, historyObj, environment.headerToken);
			console.log(response);
			if (response.data > 0) {
				handleGetOngoing();
				toast.success("Thanks! Message sent successfully..");
			}
			else {
				toast.error("Sorry! Message not sent..");
			}
		};
		postData();


	}

	const handleSupportSubmit = () => {
		let ticketNumbersN=ticketNumbers.substring(1,ticketNumbers.length);
		// alert(uniqueTransID)
		// alert(pnr)
		let supportObj = {
			id: currentItem == null ? 0 : currentItem.id, agentId: (sessionStorage.getItem('agentId') ?? 0), supportTypeId: supportTypeId, subjectId: subjectId,
			message: message, fileName: fileName, status: status, uniqueTransID: uniqueTransID, pnr: pnr, ticketNumber: ticketNumbersN
		};
		if (supportTypeId === 0) {
			toast.error("Sorry! Support type not selected..");
			return;
		}
		if (subjectId === 0) {
			toast.error("Sorry! Subject not selected..");
			return;
		}
		if (message === "") {
			toast.error("Sorry! Message is empty..");
			return;
		}
		console.log(supportObj)
		if ((currentItem == null ? 0 : currentItem.id) > 0) {
			const putData = async () => {
				const response = await axios.put(environment.supportInfo, supportObj, environment.headerToken);
				if (response.data > 0) {
					handleGetOpened(1);
					clearForm();
					toast.success("Thanks! Support Info updated successfully..");
				} else {
					toast.error("Sorry! Support Info not updated..");
				}
			};
			putData();
		}
		else {
			const postData = async () => {
				const response = await axios.post(environment.supportInfo, supportObj, environment.headerToken);

				if (response.data > 0) {
					handleGetOpened(1);
					clearForm();
					toast.success("Thanks! Support Info created successfully..");
				} else {
					toast.error("Sorry! Support Info not created..");
				}
			};
			postData();
		}

	}



	useEffect(() => {
		handleGetOpened(pageNumber);
		$(document).ready(function () {
			if (location.search !== "") {
				$('#btnOpenModal').click();
			}
		});
	}, [pageNumber]);

	const clearSupportForm = () => {
		if(location.search === ""){
			setUniqueTransID('');
		    setPassengerList([]);
			setPNR('');
		}
	}

	return (
		<div>
			<Navbar></Navbar>
			<SideNavBar></SideNavBar>
			<div className="content-wrapper search-panel-bg">
				<section className="content-header"></section>
				<section className="content">
					<ToastContainer position="bottom-right" autoClose={1500}/>
					<form className="mx-5 mt-3" encType='multipart/form-data'>
						<div className='card'>
							<div className='card-header fw-bold' style={{ color: "#02046a" }}>
								Support
							</div>
							<div className='card-body'>
								<div className="mx-4">
									<div className='row'>
									<div className='col-sm-3'>
										<label>Support Type<span style={{ color: 'red' }}>*</span></label>
										<select className="form-select"  placeholder='Subject' onChange={(e) => setSearchSubjectId(Number(e.target.value))}>
											<option key={0}>Select Type</option>
											{
												subjectList.map((item, index) => {
													return <option key={index + 1} value={item.id} >{item.name}</option>
												})
											}
										</select>
									</div>
									</div>
									<br/>
									<ul className="nav nav-tabs" id="balanceTab">
										<li className="nav-item">
											<a href="#opened" className="nav-link active" data-bs-toggle="tab" onClick={() => handleGetOpened(1)}>Opened</a>
										</li>
										<li className="nav-item">
											<a href="#ongoing" className="nav-link" data-bs-toggle="tab" onClick={() => handleGetOngoing(1)}>Ongoing</a>
										</li>
										<li className="nav-item">
											<a href="#closed" className="nav-link" data-bs-toggle="tab" onClick={() => handleGetClosed(1)}>Closed</a>
										</li>

									</ul>
									<div className="tab-content">
										<div className="tab-pane  show active" id="opened">
											<button type="button" id="btnOpenModal" className="btn btn-sm btn-secondary text-white my-2 rounded" style={{fontSize:"12px"}} data-bs-toggle="modal" data-bs-target="#supportModal" onClick={()=>clearSupportForm()}>
												Add
											</button>

											<div className="modal fade" id="supportModal" tabIndex={-1} aria-labelledby="supportModalLabel" aria-hidden="true">
												<div className="modal-dialog">
													<div className="modal-content">
														<div className="modal-header">
															<h5 className="modal-title" id="supportModalLabel"> Support</h5>
															<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
														</div>
														<div className="modal-body">
															<div className='row'>
																<input type={'hidden'} ></input>
																<div className='row my-3'>
																	<div className='col-sm-4'>
																		<label  class="form-label">Support Type<span style={{ color: 'red' }}>*</span></label>
																		<select className="form-select" value={subjectId} placeholder='Subject' onChange={(e) => setSubjectId(Number(e.target.value))}>
																			<option key={0}>Select Type</option>
																			{
																				subjectList.map((item, index) => {
																					return <option key={index + 1} value={item.id} >{item.name}</option>
																				})
																			}
																		</select>
																	</div>
																	<div className='col-sm-4'>
																		<label  class="form-label">Booking ID</label>
																		<input class="form-control" type={'text'} placeholder={'Booking ID'} value={uniqueTransID} className="form-control" onChange={(e) => handleSetUniqueTransID(e.target.value)}></input>
																	</div>
																	<div className='col-sm-4'>
																		<label  class="form-label">PNR</label>
																		<input class="form-control" type={'text'} placeholder={'PNR'} value={pnr} className="form-control" onChange={(e) => handleSetPNR(e.target.value)}></input>
																	</div>
																	<div className='col-sm-12'>
																		<table className="table table-boardered table-sm mt-3" style={{ width: "100%", fontSize: "13px" }}>
																			<thead className="text-center fw-bold bg-secondary">
																				<tr>
																					<th>Pax Name</th>
																					<th>Type</th>
																					<th>Ticket Number</th>
																				</tr>
																			</thead>
																		<tbody className="lh-1 tbody text-center">
																		{
																			passengerList.length>0?
																			passengerList.map((item,index)=>{
																				return <>
																					<tr>
																						<td>{item.title +" " +item.first + " " +item.middle +" " +item.last}</td>
																						<td>{item.passengerType}</td>
																						<td>
																						  {
																							<>
																								<input type={'checkbox'} defaultChecked={ item.ticketNumbers===defaultTicketNumber?true:false} onChange={(e)=>handleSetTicketNo(e.target.checked, item.ticketNumbers)}></input>&nbsp; {item.ticketNumbers}
																							</>
																						  }
																						</td>
																					</tr>
																					</>
																			})
																			:
																			""
																		}
																		</tbody>
																		</table>
																		<br/>
																		{/* <label>{ticketNumbers}</label> */}
																		{/* <input class="form-control" type={'text'} placeholder={'Ticket Number'} value={ticketNumber === "null" ? "" : ticketNumber} className="form-control" onChange={(e) => setTicketno()}></input> */}
																	</div>
																	{/* {
																		subjectId === 2 ? 
																		<>		
																			<div className='col-sm-5'>
																				<label  class="form-label my-2">Refund Type</label><br></br>
																				<input type="radio" value={refundType} name="refundType" checked={refundType == "Full"}
																					onClick={() => { setRefundType("Full"); }} />&nbsp; Full &nbsp;&nbsp;

																				<input type="radio" disabled value={refundType} name="refundType" checked={refundType == "Partial"}
																					onClick={() => { setRefundType("Partial"); }} />&nbsp; Partial &nbsp;&nbsp;

																				<input type="radio" disabled value={refundType} name="refundType" checked={refundType == "Split"}
																					onClick={() => { setRefundType("Split"); }} /> &nbsp;Split

																			</div>
																		</> : <>
																		</>
																	} */}

																</div>
																<div className='row mb-3'>
																	<div className='col-sm-12'>
																		<label>Message<span style={{ color: 'red' }}>*</span></label>
																		<textarea rows={3} type={'text'} value={message} className="form-control" placeholder='Message' onChange={(e) => setMessage(e.target.value)}></textarea>
																	</div>

																</div>
																<div className='row'>
																	<div className='col-sm-5'>
																		<label>File</label>
																		<input type={'file'} className="form-control" placeholder='File' onChange={(e) => handleFileUpload(e.target.files[0])}></input>
																	</div>
																</div>
															</div>
														</div>
														<div className="modal-footer">
															<button type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">Close</button>
															<button type="button" className="btn button-color fw-bold text-white rounded" onClick={() => handleSupportSubmit()}>Submit</button>
														</div>
													</div>
												</div>
											</div>
											<table className="table table-boardered table-sm" style={{ width: '100%',fontSize:"13px" }}>
												<thead className="bg-secondary">
													<tr>
														<th>SL</th>
														<th>Support Type</th>
														<th>Message</th>
														<th>Date</th>
														<th>Booking ID</th>
														<th>PNR</th>
														<th>Ticket Number</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody className='tbody'>
													{
														supportOpenedList.map((item, index) => {
															return <tr key={index}>
																<td>{((pageNumber - 1) * pageSize) + index + 1}</td>
																<td>{item.subjectName}</td>
																<td title={item.message} style={{ background:  item.isAgent === true ? "white" : "#F486A1" }}>
																	{item.message?.length > 50 ? item.message.substr(0, 50) + "..." : item.message} {item.isAgent}</td>
																<td>{moment(item.createdDate).format("DD-MM-YYYY hh:mm:ss A")}</td>
																<td>
																	{item.uniqueTransID}
																</td>
																<td>
																	{item.pnr}
																</td>
																<td>
																	{item.ticketNumber}
																</td>
																<td>
																	<a href='#' className='me-2' data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => getSupportHistory(item, 1)}>
																		View
																	</a>
																	<a href='#' style={{ color: '#02046a' }} data-bs-toggle="modal" data-bs-target="#replayModal" onClick={() => getSupportHistory(item, 1)}>
																	{
																		item.isAgent==true?"Message":"Reply"
																	}
																	</a>
																</td>
															</tr>
														})
													}
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
										<div className="tab-pane fade" id="ongoing">
											
											<table className='table table-boardered table-sm' style={{ width: '100%',fontSize:"13px" }}>
												<thead className='bg-secondary'>
													<tr>
														<th>SL</th>
														<th>Support Type</th>
														<th>Message</th>
														<th>Date</th>
														<th>Booking ID</th>
														<th>PNR</th>
														<th>Ticket Number</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody>
													{
														supportOngoingList.map((item, index) => {
															let bgColor = item.isAgentRead === true ? "white" : "#c1bebe";
															console.log(bgColor)
															return <tr key={index} style={{ background: bgColor }}>
																<td>{((pageNumber - 1) * pageSize) + index + 1}</td>
																<td>{item.subjectName}</td>
																<td title={item.message} style={{ background:  item.isAgent === true ? "white" : "#F486A1" }}>{item.message?.length > 50 ? item.message.substr(0, 50) + "..." : item.message} {item.isAgent}</td>
																<td>{moment(item.createdDate).format("DD-MM-YYYY hh:mm:ss A")}</td>
																<td>
																	{item.uniqueTransID}
																</td>
																<td>
																	{item.pnr}
																</td>
																<td>
																	{item.ticketNumber}
																</td>
																<td>
																	<a href='#' style={{ color: '#02046a' }} data-bs-toggle="modal" data-bs-target="#replayModal" onClick={() => getSupportHistory(item, 1)}>
																	{
																		item.isAgent==true?"Message":"Reply"
																	}
																	</a>
																	<a href='#' className="ms-2" style={{ color: '#02046a' }} data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => getSupportHistory(item, 1)}>
																		View
																	</a>
																</td>
															</tr>
														})
													}

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
										<div className="tab-pane fade" id="closed">
											<table className='table table-boardered table-sm' style={{ width: '100%',fontSize:"13px" }}>
												<thead className='bg-secondary'>
													<tr>
														<th>SL</th>
														<th>Support Type</th>
														<th>Message</th>
														<th>Date</th>
														<th>Booking ID</th>
														<th>PNR</th>
														<th>Ticket Number</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody className='tbody'>
													{
														supportClosedList.map((item, index) => {
															return <tr key={index}>
																<td>{((pageNumber - 1) * pageSize) + index + 1}</td>
																<td>{item.subjectName}</td>
																<td title={item.message} style={{ background:  item.isAgent === true ? "white" : "#F486A1" }}>{item.message?.length > 50 ? item.message.substr(0, 50) + "..." : item.message} {item.isAgent}</td>
																<td>{moment(item.createdDate).format("DD-MM-YYYY hh:mm:ss A")}</td>
																<td>
																	{item.uniqueTransID}
																</td>
																<td>
																	{item.pnr}
																</td>
																<td>
																	{item.ticketNumber}
																</td>
																<td>
																<a href='#' style={{ color: '#02046a' }} data-bs-toggle="modal" data-bs-target="#replayModal" onClick={() => getSupportHistory(item, 1)}>
																	View
																	</a>
																</td>
															</tr>
														})
													}

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
									<div className="modal fade" id="viewModal" tabIndex={-1} aria-labelledby="replayModalLabel" aria-hidden="true">
										<div className="modal-dialog">
													<div className="modal-content">
														<div className="modal-header">
															<h5 className="modal-title" id="replayModalLabel"> View</h5>
															<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
														</div>
														<div className="modal-body">
															<div className='row'>
																<div className="container bootstrap snippets bootdey">
																	<div className="row">
																		<div className="col-md-12 bg-white ">
																			<div className="chat-message">
																				<ul className="chat">
																					{
																						supportHistoryList.map((item, index) => {
																							return <li className={`text-${item.isAgent === true ? 'right' : 'left'} clearfix`} >
																								<span className="chat-img">
																									{/* <img src={require(`../../images/icon/${'user.png'}`)} alt=''/> */}

																								</span>
																								<div className="chat-body clearfix">
																									<div className="header">
																										<strong className="primary-font">{item.createdByName}</strong><br />
																										<small className={`text-${item.isAgent === true ? 'right' : 'left'} text-muted`}><i className="fa fa-clock-o"></i> {moment(item.createdDate).format('DD-MMMM-yyyy hh:mm:ss a')}</small>


																									</div>
																									<p className={`text-${item.isAgent === true ? 'right' : 'left'} text-muted`}>
																										{item.message}
																									</p>
																									{/* <a href={require(`../../images/icon/${'user.png'}`)} download>download</a> */}
																									{
																										item.fileName != null && item.fileName != "" ? <a href={s3URL+`${item.fileName}`} download target="_blank">{item.fileName.length > 50 ? item.fileName.substr(0, 50) + '...' : item.fileName}</a>
																											: <></>
																									}
																									{
																										<span style={{ color: 'green' }}>{item.isAgent === true && item.isAdminRead === true ? "Seen" : ""}</span>
																									}
																								</div>
																							</li>
																						})
																					}
																				</ul>
																				<ReactPaginate
																					previousLabel={"previous"}
																					nextLabel={"next"}
																					breakLabel={"..."}
																					pageCount={pageCountH}
																					marginPagesDisplayed={2}
																					pageRangeDisplayed={3}
																					onPageChange={handlePageClickH}
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
																			{/* <div className="chat-box bg-white">
																				<div className='row'>{fileCurrentName}</div>
																				<div className="input-group">
																					<span className="btn btn-primary btn-file">
																						<i className='fa fa-paperclip'></i><input type="file" onChange={(e) => handleHistoryFileUpload(e.target.files[0])} />
																					</span>
																					<input className="form-control border no-shadow no-rounded" placeholder="Type your message here" onChange={(e) => setHistoryMessage(e.target.value)} />
																					<span className="input-group-btn">
																						<button className="btn btn-success no-rounded" type="button" onClick={() => handleHistorySubmit()}>Send</button>
																					</span>
																				</div>
																			</div> */}
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
										</div>
									</div>
									<div className="modal fade" id="replayModal" tabIndex={-1} aria-labelledby="replayModalLabel" aria-hidden="true">
												<div className="modal-dialog">
													<div className="modal-content">
														<div className="modal-header">
															<h5 className="modal-title" id="replayModalLabel"> Reply</h5>
															<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
														</div>
														<div className="modal-body">
															<div className='row'>
																<div className="container bootstrap snippets bootdey">
																	<div className="row">
																		<div className="col-md-12 bg-white ">
																			<div className="chat-message">
																				<ul className="chat">
																					{
																						supportHistoryList.map((item, index) => {
																							return <li className={`text-${item.isAgent === true ? 'right' : 'left'} clearfix`} >
																								<span className="chat-img">
																									{/* <img src={require(`../../images/icon/${'user.png'}`)} alt=''/> */}

																								</span>
																								<div className="chat-body clearfix">
																									<div className="header">
																										<strong className="primary-font">{item.createdByName}</strong><br />
																										<small className={`text-${item.isAgent === true ? 'right' : 'left'} text-muted`}><i className="fa fa-clock-o"></i> {moment(item.createdDate).format('DD-MMMM-yyyy hh:mm:ss a')}</small>


																									</div>
																									<p className={`text-${item.isAgent === true ? 'right' : 'left'} text-muted`}>
																										{item.message}
																									</p>
																									{/* <a href={require(`../../images/icon/${'user.png'}`)} download>download</a> */}
																									{
																										item.fileName != null && item.fileName != "" ? <a href={s3URL + `${item.fileName}`} download target="_blank">{item.fileName.length > 50 ? item.fileName.substr(0, 50) + '...' : item.fileName}</a>
																											: <></>
																									}
																									{
																										<span style={{ color: 'green' }}>{item.isAgent === true && item.isAdminRead === true ? "Seen" : ""}</span>
																									}
																								</div>
																							</li>
																						})
																					}
																				</ul>
																				<ReactPaginate
																					previousLabel={"previous"}
																					nextLabel={"next"}
																					breakLabel={"..."}
																					pageCount={pageCountH}
																					marginPagesDisplayed={2}
																					pageRangeDisplayed={3}
																					onPageChange={handlePageClickH}
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
																			<div className="chat-box bg-white">
																				<div className='row'>{fileCurrentName}</div>
																				<div className="input-group">
																					<span className="btn btn-primary btn-file">
																						<i className='fa fa-paperclip'></i><input type="file" onChange={(e) => handleHistoryFileUpload(e.target.files[0])} />
																					</span>
																					<input className="form-control border no-shadow no-rounded" placeholder="Type your message here" onChange={(e) => setHistoryMessage(e.target.value)} />
																					<span className="input-group-btn">
																						<button className="btn btn-success no-rounded" type="button" onClick={() => handleHistorySubmit()}>Send</button>
																					</span>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>



															</div>
														</div>
													</div>
												</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</section>
			</div>
			<Footer></Footer>
		</div>
	);
};

export default Support;