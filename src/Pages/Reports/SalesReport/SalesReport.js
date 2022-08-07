import React, { useEffect, useState } from 'react';
import Navbar from '../../SharePages/Navbar/Navbar';
import SideNavBar from '../../SharePages/SideNavBar/SideNavBar';
import axios from "axios";
import { environment } from '../../SharePages/Utility/environment';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Loading/Loading';
import ReactPaginate from 'react-paginate';
const SalesReport = () => {
  const {setLoading,loading} = useAuth();
  const [reportData, setReportData] = useState();
let [fromDate, setFromDate] = useState(new Date().toJSON().slice(0, 10));
let [toDate, setToDate] = useState(new Date().toJSON().slice(0, 10));
let [totalBuyingBasePrice,setTotalBuyingBasePrice]=useState(0);
let [totalBuyingTax,setTotalBuyingTax]=useState(0);
let [totalBuyingPrice,setTotalBuyingPrice]=useState(0);
let [totalSellingBasePrice,setTotalSellingBasePrice]=useState(0);
let [totalSellingTax,setTotalSellingTax]=useState(0);
let [totalSellingPrice,setTotalSellingPrice]=useState(0);
let [totalProfit,setTotalProfit]=useState(0);

let [pageCount, setPageCount] = useState(0);
let [pageSize, setPageSize] = useState(10);
let [currentPageNumber,setCurrentPageNumber]=useState(1);
const getReportData = async (currentPageNumber) => {
  const obj = {
    agentId: sessionStorage.getItem("agentId") ?? 0,
    fromDate: fromDate,
    toDate: toDate
  };
  setLoading(true);
  const response = await axios.post(
    environment.salesReport+`?pageNumber=${currentPageNumber}&pageSize=${pageSize}`,
    obj,
    environment.headerToken
  ).then((res)=>{
    console.log(res)
    setReportData(res.data.data);
    setPageCount(res.data.totalPages);
    res.data.data.map((item, index) => {
      setTotalBuyingBasePrice(totalBuyingBasePrice+=Number(item.basePriceBuying));
      setTotalBuyingTax(totalBuyingTax+=Number(item.taxesBuying));
      setTotalBuyingPrice(totalBuyingPrice+=Number(item.priceBuying));
      setTotalSellingBasePrice(totalSellingBasePrice+=Number(item.basePriceSelling));
      setTotalSellingTax(totalSellingTax+=Number(item.taxesSelling));
      setTotalSellingPrice(totalSellingPrice+=Number(item.priceSelling));
      setTotalProfit(totalProfit+=Number(item.profit));
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
const handleViewTicket=(utid)=>{
  window.open("/ticket?utid="+utid,'_blank')
}
useEffect(() => {
  getReportData(currentPageNumber);
}, [currentPageNumber]);
    return (
        <div>
             <Navbar></Navbar>
            <SideNavBar></SideNavBar>
            <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <section className="content">
        {
            loading ? <Loading flag={2}></Loading> :
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
                      <h4 className="mt-2"> Sales Report</h4>
                      <hr />
                      <div
                        className="row"
                        style={{ width: "100%", paddingBottom: "5px" }}
                      >
                        <div className="col-sm-12 text-left">
                          <div className="d-flex float-end">
                            
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
                              <th rowSpan={2}>Sl</th>
                              <th rowSpan={2}>PNR</th>
                              <th rowSpan={2}>Ticket Number</th>
                              <th colSpan={3}>Buying</th>
                              <th colSpan={3}>Selling</th>
                              <th rowSpan={2}>Profit</th>
                            </tr>
                            <tr>
                              
                              <th>Base Price</th>
                              <th>Tax</th>
                              <th>Total Price</th>
                              <th>Base Price</th>
                              <th>Tax</th>
                              <th>Total Price</th>
                             
                            </tr>
                          </thead>
                          <tbody>
                            {reportData !== undefined ? (
                              reportData?.map((item, index) => {
                                return (
                                  <>
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      
                                      <td>
                                      &nbsp; <a style={{borderRadius:'50%'}} href='javascript:void(0)' title='Ticket'  onClick={()=>handleViewTicket(item.uniqueTransID)} >{item.pnr}</a>
                                      
                                          </td>
                                      <td> <span key={index} data-tip={
                                        item.paxNames !==undefined?   item.paxNames.split(',').map((item,index)=>{
                                               return (index+1)+". "+item.replace(',',' ')+"<br/>"
                                           })
                                          : <></>
                                           
                                           
                                           } >
                                             &nbsp; <a style={{borderRadius:'50%'}} href='javascript:void(0)'  title='Ticket'  onClick={()=>handleViewTicket(item.uniqueTransID)} >{item.ticketNumbers}</a>
                                             
                                            </span> </td>
                                      <td style={{textAlign:'right'}}>
                                        {item.basePriceBuying}
                                      </td>
                                      <td style={{textAlign:'right'}}>
                                        {item.taxesBuying}
                                      </td>
                                      <td style={{textAlign:'right'}}>
                                        {item.priceBuying}
                                      </td>
                                      <td style={{textAlign:'right'}}>
                                      {item.basePriceSelling}
                                        </td>
                                      <td style={{textAlign:'right'}}>
                                        {item.taxesSelling}
                                      </td>
                                      <td style={{textAlign:'right'}}>
                                        {item.priceSelling}
                                      </td>
                                      <td style={{textAlign:'right'}}>
                                        {item.profit}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </tbody>
                          <tfoot>
                        
                              <tr>

                                  <td colSpan={3} style={{textAlign:'right'}}><strong>Grand Total</strong></td>
                                  <td style={{textAlign:'right'}}><strong>{totalBuyingBasePrice}</strong></td>
                                  <td style={{textAlign:'right'}}><strong>{totalBuyingTax}</strong></td>
                                  <td style={{textAlign:'right'}}><strong>{totalBuyingPrice}</strong></td>
                                  <td style={{textAlign:'right'}}><strong>{totalSellingBasePrice}</strong></td>
                                  <td style={{textAlign:'right'}}><strong>{totalSellingTax}</strong></td>
                                  <td style={{textAlign:'right'}}><strong>{totalSellingPrice}</strong></td>
                                  <td style={{textAlign:'right'}}><strong>{totalProfit}</strong></td>
                    
                              </tr>
                          </tfoot>
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
                      <ReactTooltip
                                effect="solid"
                                html={true}
                              ></ReactTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
}
        </section>
        <div className="text-center text-white pt-5 pb-2 mt-5">
          {/* <b>Version</b> 3.1.0 */}
          <strong>Copyright &copy; 2020-2022 All rights reserved.</strong>
        </div>
      </div>
        </div>
    );
};

export default SalesReport;