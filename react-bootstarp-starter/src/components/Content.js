import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function Content() {
    return (
    <div className="container-fluid">  
        <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/charts" element={<Charts />} />
        <Route path="/tables" element={<Tables />} /> */}
      </Routes>
    </div>
    );
  }
  
  export default Content;