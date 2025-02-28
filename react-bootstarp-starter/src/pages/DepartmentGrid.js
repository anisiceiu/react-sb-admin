import React, { useState,useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry  } from 'ag-grid-community'; // Import the module
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments,deleteDepartment } from '../features/departmentSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmModal from '../components/ConfirmModal';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DepartmentGrid = () => {
    const [show,setShow]=useState(false);
    const [departmentToDelete,setDepartmentToDelete]=useState(null);

  const dispatch = useDispatch();
  const { departments: rowData, status, error } = useSelector((state) => state.department);

  // Fetch employees when the component mounts
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);


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
        

  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => {
        return (
          <div>
            <Link to={`/department/${params.data.id}`} ><i className="fas fa-fw fa-edit text-primary"></i></Link>
            <Link onClick={()=>showConfirmDialog(params.data.id)}><i className="fas fa-fw fa-trash text-danger"></i></Link>
          </div>
        );
      }
    }
  ];

  
  
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
        }}
        theme="themeAlpine"
      />
      <ConfirmModal
             show={show}
             message="Are you sure to proceed?"
             handleClose={handleClose}
             handleConfirm={handleConfirm}
            />
    </div>
  );
};

export default DepartmentGrid;