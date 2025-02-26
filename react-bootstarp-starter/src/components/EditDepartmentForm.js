import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // For routing
import { updateDepartment } from '../features/departmentSlice';
import { toast } from 'react-toastify';

const EditDepartmentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the department ID from the URL

  // Fetch the department to edit
  const department = useSelector((state) =>
    state.department.departments.find((dept) => dept.id === parseInt(id))
  );

  // State for the form
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill the form with the department data
  useEffect(() => {
    if (department) {
      setName(department.name);
    }
  }, [department]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name.trim()) {
      toast.error('Department name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateDepartment({ id: department.id, name })).unwrap();
      toast.success('Department updated successfully!');
      navigate('/department-list'); // Redirect to the departments list after successful update
    } catch (error) {
      toast.error('Failed to update department');
    } finally {
      setLoading(false);
    }
  };

  // If the department is not found, show a message
  if (!department) {
    return <div>Department not found</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Department'}
        </button>
      </form>
    </div>
  );
};

export default EditDepartmentForm;