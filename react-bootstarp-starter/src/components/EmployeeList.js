import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchEmployees,deleteEmployee} from '../features/employeeSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';


const EmployeeList = () =>{
    const [show,setShow]=useState(false);
    const [employeeToDelete,setEmployeeToDelete]=useState(null);
    const dispatch = useDispatch();
    const employees = useSelector((state)=> state.employee.employees);
    const status = useSelector((state)=> state.employee.status);
    const error = useSelector((state)=> state.employee.error);

    useEffect(()=>{
        if(status==='idle')
        {
          dispatch(fetchEmployees());
        }
    },[status,dispatch]);

    const handleDelete = (id) =>{
      try {
        dispatch(deleteEmployee(id)).unwrap();
        toast.success('Employee deleted successfully!'); 
      } catch (error) {
        toast.error('Employee failed to delete');
      }
    }

    const showConfirmDialog=(id)=>{
        setEmployeeToDelete(id);
        setShow(true);
      }

      const handleClose = () =>{
        setShow(false);
        setEmployeeToDelete(null);
      }

      const handleConfirm = () =>{
        handleDelete(employeeToDelete);
        setShow(false);
      }
     

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Employees</h1>
            <Link to="/add-employee" className="btn btn-primary btn-icon-split">
                                        <span className="icon text-white-50">
                                            <i className="fas fa-plus"></i>
                                        </span>
                                        <span className="text">Add Employee</span>
                                    </Link>
             <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                    <th>Salary</th>
                                    <th>Hire Date</th>
                                    <th scope="col">Department Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                             {employees.map((emp)=>(
            
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.position}</td>
                                    <td>{emp.salary}</td>
                                    <td>{emp.hireDate}</td>
                                    <td>{emp?.department?.name}</td>
                                    <td><Link to={`/employee/${emp.id}`} ><i className="fas fa-fw fa-edit text-primary"></i></Link> |
                                    <Link onClick={()=>showConfirmDialog(emp.id)}><i className="fas fa-fw fa-trash text-danger"></i></Link> </td>
                                </tr>
                             )
            
                             )
                            
                             }
                            </tbody>
                        </table>
                        <ConfirmModal
             show={show}
             message="Are you sure to proceed?"
             handleClose={handleClose}
             handleConfirm={handleConfirm}
            />
        </div>
    )
}

export default EmployeeList;