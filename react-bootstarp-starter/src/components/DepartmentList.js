import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../features/departmentSlice';

const DepartmentList = () => {
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
     
     return (
        <div>
            
            
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
                        <td><i class="fas fa-fw fa-edit text-primary"></i> | <i class="fas fa-fw fa-trash text-danger"></i></td>
                    </tr>
                 )

                 )
                
                 }
                </tbody>
            </table>
        </div>
    ) 
}

export default DepartmentList;