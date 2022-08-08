import React, { useEffect } from "react";
import Footer from "../../SharePages/Footer/Footer";
import Navbar from "../../SharePages/Navbar/Navbar";
import SideNavBar from "../../SharePages/SideNavBar/SideNavBar";
import SearchPanel from "../SearchPanel/SearchPanel";
import $ from "jquery";
import { Box, Center } from "@chakra-ui/react";

const SearchPage = () => {
  useEffect(() => {
    $(document).ready(function () {
      // window.location.reload();
    });
  }, []);
  // window.location.reload();
  return (
    <div>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <SearchPanel></SearchPanel>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default SearchPage;
