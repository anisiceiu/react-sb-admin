import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import departmentReducer from '../features/departmentSlice';

 const store = configureStore({
  reducer: {
     auth: authReducer,
     user: userReducer,
     department:departmentReducer
     },
});

export default store;