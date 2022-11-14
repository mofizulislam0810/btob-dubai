import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";
import Footer from "../../SharePages/Footer/Footer";
import Navbar from "../../SharePages/Navbar/Navbar";
import SideNavBar from "../../SharePages/SideNavBar/SideNavBar";
import axios from "axios";
import { environment } from '../../../Pages/SharePages/Utility/environment';
import { toast, ToastContainer } from "react-toastify";
const FailedTicketPage = () => {
  const { loading, ticketData } = useAuth();
  const navigate = useNavigate();
    const handleOrder=()=>{
    //     const orderTicket = async () => {
    //         let transactionId=JSON.parse(localStorage.getItem("uniqueTransID"));
		// 	      const response = await axios.put(environment.changeTicketStatus+"/"+transactionId+"/Ordered",null,environment.headerToken);
    //         console.log(response);
    //         if(response.data>0){
    //             navigate('/successorderticket');
    //         }
    //         else{
    //             toast.error('Sorry! try again..');
    //         }
		// };
		// orderTicket();
    navigate('/search');

    }
    console.log(ticketData);
    console.log(ticketData.item2);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <Loading loading={loading}></Loading>
      <ToastContainer position="bottom-right" autoClose={1500} />
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <section className="content content-panel">
          <div className="container bg-white w-25">
            <div className="row p-4">
              <div className="col-lg-12 text-center">
                {/* <h5 className="pt-4 fw-bold">Please try again</h5> */}
                {
                  ticketData.item2 != undefined ? 
                    <>
                      <p className="">
                        {ticketData.item2?.message.split("#")[0]=="1"?ticketData.item2?.message.split("#")[1]:
                           <p>We are processing your ticket.<br></br>Please contact to the support.<br></br>
                           Thank You</p>
                        }
                      </p>
                    </> :
                    <>
                      <p className="">
                        {ticketData.message.split("#")[0]=="1"?ticketData.message.split("#")[1]: 
                        <p>We are processing your ticket.<br></br>Please contact to the support.<br></br>Thank You</p>
                        }
                        </p></>
                }
                
                <div className="my-3 p-4">
                  {/* <span className="text-danger fs-3">
                    <i
                      class="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    
                  </span> */}
                  
                </div>
                {/* <p>
                  We are processing your ticket.<br></br>Please contact to
                  the support.<br></br>Thank You
                </p> */}
                <hr></hr>
                <button className="btn button-color my-3 text-white fw-bold" onClick={()=>handleOrder()}>
                  Search more
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FailedTicketPage;
