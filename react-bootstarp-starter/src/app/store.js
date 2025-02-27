import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import departmentReducer from '../features/departmentSlice';
import employeeReducer from "../features/employeeSlice";

 const store = configureStore({
  reducer: {
     auth: authReducer,
     user: userReducer,
     department:departmentReducer,
     employee:employeeReducer,
     },
});

export default store;