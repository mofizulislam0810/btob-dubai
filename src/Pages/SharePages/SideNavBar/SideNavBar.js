import React from "react";
import { Link } from "react-router-dom";
import "./SideNavBar.css";


const SideNavBar = () => {
  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
      style={{ position: "fixed", height: "100%", backgroundColor: "#FFFFFF" }}
    >
      {/* Brand Logo  */}
      <Link to="/dashboard" className="brand-link">
        <img
          src="../../dist/img/AdminLTELogo.png"
          alt=""
          className="brand-image img-circle elevation-3"
          // style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light" style={{color:"#8796A1"}}>Dashboard</span>
      </Link>

      {/* Sidebar  */}
      <div className="sidebar">
        {/* Sidebar user (optional)  */}

        {/* SidebarSearch Form */}
        {/* <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw"></i>
              </button>
            </div>
          </div>
        </div> */}

        {/* Sidebar Menu  */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library  */}
            <li className="nav-item">
              <Link to="/search" className="nav-link">
                <i className="nav-icon fas fa-search"></i>
                <p>
                  Search
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Manage
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/markup" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Markup</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/support" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Support</p>
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/staff" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Staff</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/quickpassenger" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Quick Passenger</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i class="nav-icon fas fa-file-invoice-dollar"></i>
                {/* <i className="nav-icon fas fa-tachometer-alt"></i> */}
                <p>
                  Account
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/balance" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Balance Deposit</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/cbankaccount" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Company Bank Account</p>
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/ledger" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Account Ledger</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/creditnote" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Credit List</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link">
                <i class="nav-icon fas fa-tasks"></i>
                <p>
                  Booking History
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/queues?id=1" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Flight</p>
                  </a>
                </li>
                </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i class="nav-icon fas fa-tasks"></i>
                {/* <i className="nav-icon fas fa-tachometer-alt"></i> */}
                <p>
                  Reports
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/salesreport" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Sales Report</p>
                  </a>
                </li>
                </ul>
            </li> 
            {/* <li className="nav-item">
              <a href="#" className="nav-link">
                <i class="nav-icon fas fa-tasks"></i>
              
                <p>
                  Queues
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/queues?id=1" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>On Hold</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=2" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Pending</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=3" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>In Process</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=4" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Ticketed</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=5" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Expired</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=6" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Cancelled</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=7" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Un Confirmed</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=8" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Ancillary Service</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=9" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Refund Management</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=10" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Void Management</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=11" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Reissue Management</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/queues?id=12" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Group Fare Management</p>
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
        </nav>
       
      </div>
     
    </aside>
  );
};

export default SideNavBar;
