import React from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";
import Footer from "../../SharePages/Footer/Footer";
import Navbar from "../../SharePages/Navbar/Navbar";
import SideNavBar from "../../SharePages/SideNavBar/SideNavBar";
import TravelCartPanel from "../TravelCartPanel/TravelCartPanel";

const TravelCartPage = () => {
  window.scrollTo(0,0);
  const {loading} = useAuth();
  console.log(loading);
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      {loading ? (
        <>
          <Loading flag={1} loading={loading}></Loading>
          <TravelCartPanel></TravelCartPanel>
        </>
      ) : (
        <>
          <TravelCartPanel></TravelCartPanel>
        </>
      )}

      <Footer></Footer>
    </div>
  );
};

export default TravelCartPage;
