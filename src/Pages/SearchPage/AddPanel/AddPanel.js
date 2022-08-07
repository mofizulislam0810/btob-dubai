import React from "react";
import imgOne from '../../../images/bgImage/SL01.jpg';
import imgTwo from '../../../images/bgImage/SL03.jpg';
import './AddPanel.css';

const AddPanel = () => {
  return (
    <div>
      <div className="container mt-3 py-3 pb-5">
        <div className="row">
          <div className="col-lg-6 shadow-for-add py-2">
            <img src={imgOne} className="img-fluid add-banner" alt="..." style={{ height: "200px",width:"100%" }}/>
            {/* <div className="card mb-3 rounded-2">              
            </div> */}
          </div>
          <div className="col-lg-6 shadow-for-add py-2">
          <img
                src={imgTwo}
                className="img-fluid add-banner"
                alt="..."
                style={{ height: "200px",width:"100%" }}
              />
            {/* <div className="card mb-3 rounded-2">
              <img
                src={imgTwo}
                className="img-fluid add-banner"
                alt="..."
                style={{ height: "200px" }}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPanel;
