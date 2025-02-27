// features/department/departmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

const baseURL="/departments";
// Async Thunks for CRUD operations
export const fetchDepartments = createAsyncThunk(
  'department/fetchDepartments',
  async () => {
    const response = await api.get(baseURL);
    return response.data;
  }
);

export const addDepartment = createAsyncThunk(
  'department/addDepartment',
  async (department) => {
    const response = await api.post(baseURL, department);
    return response.data;
  }
);

export const updateDepartment = createAsyncThunk(
  'department/updateDepartment',
  async (department) => {
    const response = await api.put(`${baseURL}/${department.id}`, department);
    return response.data;
  }
);

export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (id) => {
    await api.delete(`${baseURL}/${id}`);
    return id;
  }
);

// Initial State
const initialState = {
  departments: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Slice
const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Departments
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Department
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload);
      })
      // Update Department
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const index = state.departments.findIndex(
          (dept) => dept.id === action.payload.id
        );
        if (index !== -1) {
          state.departments[index] = action.payload;
        }
      })
      // Delete Department
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departments = state.departments.filter(
          (dept) => dept.id !== action.payload
        );
      });
  },
});

export default departmentSlice.reducer;