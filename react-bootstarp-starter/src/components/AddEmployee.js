import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchDepartments} from '../features/departmentSlice';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
    hireDate: '',
    department: ''
  });

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);
  const status = useSelector((state) => state.department.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDepartments());
    }
  }, [status, dispatch]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to your backend or handle it as needed
    console.log(employee);
  };

  return (
     <div className='col-6'>
    <form onSubmit={handleSubmit} className="container mt-4">
    <div className="mb-3">
      <label className="form-label">Name:</label>
      <input
        type="text"
        className="form-control"
        name="name"
        value={employee.name}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Email:</label>
      <input
        type="email"
        className="form-control"
        name="email"
        value={employee.email}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Position:</label>
      <input
        type="text"
        className="form-control"
        name="position"
        value={employee.position}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Salary:</label>
      <input
        type="number"
        className="form-control"
        name="salary"
        value={employee.salary}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Hire Date:</label>
      <input
        type="date"
        className="form-control"
        name="hireDate"
        value={employee.hireDate}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Department:</label>
      <select
        className="form-select form-control"
        name="department"
        value={employee.department}
        onChange={handleChange}
      >
        {departments.map((dept) => (
          <option key={dept.id} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
    <button type="submit" className="btn btn-primary">Add Employee</button>
  </form>
  </div>
  )

}

export default AddEmployee;