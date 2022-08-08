import React from "react";
import { useNavigate } from "react-router-dom";
import currentYear from "../../SharePages/Utility/currentYear";
import LeftSide from "../LeftSide/LeftSide";
import RightSide from "../RightSide/RightSide";

const TravelCartPanel = () => {
  // const navigation = useNavigate();
  // const submitFlight = () => {
  //   navigation("/cartconfirm");
  //   //console.log(sendObj);
  // };

  return (
    <div className="content-wrapper search-panel-bg">
    <section className="content-header"></section>
    <section className="content">
    <div className="container-fluid pt-2">
      {/* <Header flag={2}></Header> */}
        <div className="row mx-4">
          <div className="col-lg-8">
            <LeftSide></LeftSide>
          </div>
          <div className="col-lg-4">
            <RightSide></RightSide>
          </div>
        </div>
    </div>
    </section>
    </div>
  );
};

export default TravelCartPanel;
