import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDepartment } from '../features/departmentSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddDepartment = () =>{
    const [name,setName]=useState('');
    const dispatch =useDispatch();
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error('Department name cannot be empty'); // Toast for error
            return;
          }

          try{
            dispatch(addDepartment({ name })).unwrap();
            setName('');
            toast.success('Department added successfully!'); 
            //navigate('/department-list');
          }
          catch(error)
          {
            toast.error('Failed to add department');
          }
        
      };
   
      
      
    return (
        <div className="container mt-4">
        <h2>Add Department</h2>
        <Link to='/department-list'>Back To List</Link>
        <hr/>
        <form onSubmit={handleSubmit} >
          <div className="mb-3 col-6">
            <label htmlFor="departmentName" className="form-label">
              Department Name
            </label>
            <input
              type="text"
              className="form-control"
              id="departmentName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter department name"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Department
          </button>
        </form>
      </div>
    )
}

export default AddDepartment;