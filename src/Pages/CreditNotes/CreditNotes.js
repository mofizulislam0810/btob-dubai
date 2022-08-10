import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../SharePages/Navbar/Navbar";
import SideNavbar from "../SharePages/SideNavBar/SideNavBar";
import currentYear from "../SharePages/Utility/currentYear";
import { environment } from "../SharePages/Utility/environment";
import moment from "moment";
import ReactPaginate from 'react-paginate';
import Footer from "../SharePages/Footer/Footer";
const CreditNotes = () => {
    const [creditNoteList, setCreditNoteList] = useState([]);
    let [pageCount, setPageCount] = useState(0);
    let [pageSize, setPageSize] = useState(10);
    let [currentPageNumber,setCurrentPageNumber]=useState(1);
  const getCreditNotes = async (currentPageNumber) => {
    const response = await axios.get(
      environment.creditNoteList+"/"+sessionStorage.getItem('agentId')??0+`?pageNumber=${currentPageNumber}&pageSize=${pageSize}`,
      environment.headerToken
    );
    setCreditNoteList(response.data.data);
    setPageCount(response.data.totalPages)

  };
  const handlePageClick = async (data) => {


    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
    getCreditNotes(currentPage);
  };
  const handleViewTicket = (utid) => {
    window.open("/ticket?utid=" + utid, "_blank");
    //navigate("/ticket?utid="+utid,'_blank');
  };
  useEffect(() => {
    getCreditNotes(currentPageNumber);
  }, [currentPageNumber]);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavbar></SideNavbar>
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <section className="content pb-5">
          <div className="mx-5 pb-5">
            <div className="card pb-5">
              <div className="card-body">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tp1">
                    <h4>Credit Note List</h4>
                    <hr className="my-3"/>
                    <table className="table table-bordered align-middle table-striped text-center">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Reference</th>
                          <th>PNR</th>
                          <th>Amount</th>
                          <th>Adjustment date</th>
                          <th>Create date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody className="lh-1">
                        {creditNoteList.map((item, index) => {
                          return (
                            <tr>
                                <td>{index+1}</td>
                              <td>
                              <a
                                            style={{
                                              borderRadius: "50%",
                                              fontSize: "12px"
                                            }}
                                            href="javascript:void(0)"
                                            
                                            title="Ticket View"
                                            onClick={() =>
                                              handleViewTicket(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            {item.uniqueTransID}
                                          </a>
                              </td>
                              <td>{item.pnr}</td>
                              <td>{item.currencyName} {item.refundAmount}</td>
                              <td>{moment(item.adjustmentDate).format('DD-MM-yyyy')}</td>
                              <td>{moment(item.createdDate).format('DD-MM-yyyy')}</td>
                              <td>{item.status}</td>
                            </tr>
                          );
                        })}
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
        </section>

      </div>
      <Footer/>
    </div>
  );
};

export default CreditNotes;
