import {Outlet } from "react-router-dom";

function Content() {
    return (
    <div className="container-fluid">  
      <Outlet/>
    </div>
    );
  }
  
  export default Content;