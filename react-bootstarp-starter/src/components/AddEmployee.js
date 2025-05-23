import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../features/departmentSlice';
import {addEmployee} from '../features/employeeSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
    hireDate: '',
    departmentId: 0
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
    try {
      dispatch(addEmployee({...employee,department:{name:departments.find(d=> d.id === parseInt(employee.departmentId))?.name}})).unwrap();
      setEmployee({
        name: '',
        email: '',
        position: '',
        salary: '',
        hireDate: '',
        departmentId: 0
      });
      toast.success('Department added successfully!');
    }
    catch (error) {
      toast.error('Failed to add department');
    }
  };

  return (
    <div className='col-6'>
      <h1>Add Employee</h1>
      <Link to='/employee-list'>Back To List</Link>
      <hr/>
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
            name="departmentId"
            value={employee.departmentId}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
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