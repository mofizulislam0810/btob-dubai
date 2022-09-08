import React from 'react';
import { ToastContainer } from "react-toastify";
import Footer from '../../SharePages/Footer/Footer';
import { VStack } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Navbar from '../../Optional/Navbar/Navbar';

const RegComplete = () => {
    return (
        <div>
            <Navbar />
            <ToastContainer position="bottom-right" autoClose={1500}/>
            <div style={{ height: "400px" }} className="d-flex align-items-center justify-content-center">
                <div className="card rounded" style={{ width: "35%" }}>
                    <div className="card-body">
                        {/* <h5 className="card-title">Special title treatment</h5> */}
                        <p className="card-text text-success py-3">Thank you for registering with Triplover.
                            We really appreciate you choosing Triplover for your travel plans.
                            Your account activation is waiting for approval. After the process is completed, you will receive email with login credentials.
                        </p>
                        <div className="text-center">
                            <Link to="/" className="btn button-color text-white rounded">Close</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RegComplete;