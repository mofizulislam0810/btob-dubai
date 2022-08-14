import React from 'react';
import { ToastContainer } from "react-toastify";
import Footer from '../../SharePages/Footer/Footer';
import { VStack } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const RegComplete = () => {
    return (
        <VStack>
            <ToastContainer />
            <div style={{ height: "400px" }} className="d-flex align-items-center justify-content-center">
                <div className="card w-100 rounded">
                    <div className="card-body">
                        {/* <h5 className="card-title">Special title treatment</h5> */}
                        <p className="card-text text-success py-3">Thanks! Registration successfully submited..</p>
                        <div className="text-center">
                            <Link to="/" className="btn button-color text-white rounded">Please SignIn</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </VStack>
    );
};

export default RegComplete;