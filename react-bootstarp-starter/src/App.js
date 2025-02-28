import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminPanelLayout from "./components/AdminPanelLayout";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import BaseLayout from "./components/BaseLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DepartmentList from "./components/DepartmentList";
import AddDepartment from "./components/AddDepartment";
import 'react-toastify/dist/ReactToastify.css';
import EditDepartmentForm from "./components/EditDepartmentForm";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployeeForm from "./components/EditEmployeeForm";
import DepartmentGrid from "./pages/DepartmentGrid";
import EmployeeGrid from "./pages/EmployeeGrid";


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
        <Route path="/department-grid" element={<DepartmentGrid />} />
        <Route path="/add-department" element={<AddDepartment />} />
        <Route path="/department/:id" element={<EditDepartmentForm />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/employee-grid" element={<EmployeeGrid />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employee/:id" element={<EditEmployeeForm />} />
       {/*  <Route path="/profile" element={<Profile />} /> */}
      </Route>
    </Routes>
  </Router>

  );
}

export default App;
