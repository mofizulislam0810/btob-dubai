import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";
import Footer from "../../SharePages/Footer/Footer";
import Navbar from "../../SharePages/Navbar/Navbar";
import SideNavBar from "../../SharePages/SideNavBar/SideNavBar";
import axios from "axios";
import { environment } from '../../../Pages/SharePages/Utility/environment';
const FailedTicketPage = () => {
  const { loading, ticketData } = useAuth();
  const navigate = useNavigate();
    const handleOrder=()=>{
        const orderTicket = async () => {
            let transactionId=JSON.parse(localStorage.getItem("uniqueTransID"));
			const response = await axios.put(environment.changeTicketStatus+"/"+transactionId+"/Ordered",null,environment.headerToken);
            if(response.data>0){
                navigate('/successorderticket');
            }
            else{
                alert('Sorry! try again..');
            }
		};
		orderTicket();
    }
    console.log(ticketData);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <Loading loading={loading}></Loading>
      <div className="content-wrapper search-panel-bg">
        <section className="content-header"></section>
        <section className="content content-panel">
          <div className="container bg-white w-25">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h5 className="pt-4 fw-bold">Please try again</h5>
                {
                  ticketData.item2 != undefined ? <><p className="text-danger">{ticketData.item2?.message}</p></> :<><p className="text-danger">{ticketData.message}</p></>
                }
                
                <div className="my-3">
                  <span className="text-danger fs-3">
                    <i
                      class="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
                <p>
                  We couldn't issue ticket that flight <br></br>Please contact
                  the support or order e-ticket<br></br>Thank You
                </p>
                <hr></hr>
                <button className="btn button-color mb-3 text-white fw-bold" onClick={()=>handleOrder()}>
                  Onder e-ticket
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
