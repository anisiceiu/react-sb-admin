import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';

const AdminPanelLayout = ({ children }) => {
  return (
    
    <div id="wrapper">
      <ToastContainer />
      
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
