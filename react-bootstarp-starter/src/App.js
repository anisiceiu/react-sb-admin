import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import AdminPanelLayout from "./components/AdminPanelLayout";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import BaseLayout from "./components/BaseLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DepartmentList from "./components/DepartmentList";

function App() {
  return (
    
    <Router>
    <Routes>
      {/* Routes with Layout1 */}
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Routes with Layout2 */}
      <Route element={<ProtectedRoute layout={AdminPanelLayout}   />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/department-list" element={<DepartmentList />} />
       {/*  <Route path="/profile" element={<Profile />} /> */}
      </Route>
    </Routes>
  </Router>

  );
}

export default App;
