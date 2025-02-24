import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from "./Footer";

const AdminPanelLayout = ({ children }) => {
  return (
    
    <div id="wrapper">
      <Sidebar/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header/>
          <Content/>
          <Footer/>
        </div>
      </div>
    </div>
    
  );
};

export default AdminPanelLayout;
