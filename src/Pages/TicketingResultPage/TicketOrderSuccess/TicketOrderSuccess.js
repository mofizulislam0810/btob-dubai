import React from 'react';
import Navbar from '../../../Pages/SharePages/Navbar/Navbar';
import SideNavBar from '../../../Pages/SharePages/SideNavBar/SideNavBar';
const TicketOrderSuccess = () => {
    return (
        <div>
              <Navbar></Navbar>
            <SideNavBar></SideNavBar>
            <div className="container mt-3">
              Ticket Ordered successfully
            </div>
        </div>
    );
};

export default TicketOrderSuccess;