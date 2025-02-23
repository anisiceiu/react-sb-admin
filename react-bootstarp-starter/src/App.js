import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import AdminPanelLayout from "./components/AdminPanelLayout";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
    <Routes>
      {/* Routes with Layout1 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Route>

      {/* Routes with Layout2 */}
      <Route element={<AdminPanelLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
       {/*  <Route path="/profile" element={<Profile />} /> */}
      </Route>
    </Routes>
  </Router>

  );
}

export default App;
