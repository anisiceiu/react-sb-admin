import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments,deleteDepartment } from '../features/departmentSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';

const DepartmentList = () => {
    const [show,setShow]=useState(false);
    const [departmentToDelete,setDepartmentToDelete]=useState(null);
    const dispatch = useDispatch();
    const departments = useSelector((state) => state.department.departments);
    const status = useSelector((state) => state.department.status);
    const error = useSelector((state) => state.department.error);

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchDepartments());
        }
      }, [status, dispatch]);

      if (status === 'loading') return <div>Loading...</div>;
      if (status === 'failed') return <div>Error: {error}</div>;
     
      const handleDelete = (id) => {
        // Dispatch the deleteDepartment action
       try{
        dispatch(deleteDepartment(id)).unwrap();
        toast.success('Department deleted successfully!'); 
       }
       catch(error)
       {
        toast.error('Department failed to delete');
       } 
      };

      const showConfirmDialog=(id)=>{
        setDepartmentToDelete(id);
        setShow(true);
      }

      const handleClose = () =>{
        setShow(false);
        setDepartmentToDelete(null);
      }

      const handleConfirm = () =>{
        handleDelete(departmentToDelete);
        setShow(false);
      }
      
     return (
        <div>
            <h1>Departments</h1>
            <Link to="/add-department" className="btn btn-primary btn-icon-split">
                                        <span className="icon text-white-50">
                                            <i className="fas fa-plus"></i>
                                        </span>
                                        <span className="text">Add Department</span>
                                    </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Department Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                 {departments.map((dept)=>(

                    <tr key={dept.id}>
                        <td>{dept.id}</td>
                        <td>{dept.name}</td>
                        <td><Link to={`/department/${dept.id}`} ><i className="fas fa-fw fa-edit text-primary"></i></Link> |
                        <Link onClick={()=>showConfirmDialog(dept.id)}><i className="fas fa-fw fa-trash text-danger"></i></Link> </td>
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

export default DepartmentList;