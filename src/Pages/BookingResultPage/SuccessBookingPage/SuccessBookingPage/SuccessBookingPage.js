import React from "react";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../Loading/Loading";
import Footer from "../../../SharePages/Footer/Footer";
import Navbar from "../../../SharePages/Navbar/Navbar";
import SideNavBar from "../../../SharePages/SideNavBar/SideNavBar";
import SuccessBookingPanel from "../SuccessBookingPanel/SuccessBookingPanel";

const SuccessBookingPage = () => {
  const {loading} = useAuth();
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      {loading ? (
        <>
          <Loading flag={2} loading={loading}></Loading>
          <SuccessBookingPanel></SuccessBookingPanel>
        </>
      ) : (
        <>
          <SuccessBookingPanel></SuccessBookingPanel>
        </>
      )}
      <Footer></Footer>
    </div>
  );
};

export default SuccessBookingPage;
