import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

const baseURL="/employees";

const initialState = {
    employees:[],
    status:'idle',// 'idle' | 'loading' | 'succeeded' | 'failed'
    error:null
}

export const fetchEmployees= createAsyncThunk(
'employee/fetchEmployees',async () =>{
    const response = await api.get(baseURL);
    return response.data;
}
);

export const addEmployee = createAsyncThunk(
    'employee/addEmployee', async (employee, { rejectWithValue }) => {
        try {
            console.log("Payload:", employee);
            const response = await api.post(baseURL, employee);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',async (employee)=>{
       const response = await api.put(`${baseURL}/${employee.id}`,employee);
       return response.data;
    }
);

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',async (id) =>{
        const response = await api.delete(`${baseURL}/${id}`);
        return response.data;
    }
);


//slice
const employeeSlice = createSlice({
    name:'employee',
    initialState,
    reducers:[],
    extraReducers:(builder)=>{
        builder.addCase(fetchEmployees.pending,(state)=>{
            state.status='pending';
        }).addCase(fetchEmployees.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.employees = action.payload;
        }).addCase(fetchEmployees.rejected,(state,action)=>{
            state.status='failed';
            state.error = action.payload;
        }).addCase(addEmployee.fulfilled,(state,action)=>{
            state.employees.push(action.payload);
        }).addCase(updateEmployee.fulfilled,(state,action)=>{
            const index = state.employees.findIndex(emp=> emp.id === action.payload.id);
            if(index !== -1)
            {
                state.employees[index]=action.payload;
            }
        }).addCase(deleteEmployee.fulfilled,(state,action)=>{
            state.employees = state.employees.filter(emp=> emp.id !== action.payload.id);
        })
    },
});


export default employeeSlice.reducer;