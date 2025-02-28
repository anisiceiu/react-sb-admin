import React from 'react';
import { Link } from 'react-router-dom';



const Sidebar = () => {

    return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">


                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </a>


                <hr className="sidebar-divider my-0" />


                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></Link>
                </li>


                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Settings</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            
                            <Link className="collapse-item" to="/department-list">Department List</Link>
                            <Link className="collapse-item" to="/employee-list">Employee List</Link>
                            <Link className="collapse-item" to="/department-grid">Department Grid</Link>
                            <Link className="collapse-item" to="/employee-grid">Employee Grid</Link>
                        </div>
                    </div>
                </li>


                <hr className="sidebar-divider" />


                <div className="sidebar-heading">
                    Addons
                </div>

                <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></a>
                </li>


                <li className="nav-item">
                    <a className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></a>
                </li>

            </ul>
    );
};

export default Sidebar;