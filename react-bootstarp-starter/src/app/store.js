import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";


 const store = configureStore({
  reducer: {
     auth: authReducer,
     user: userReducer,
     },
});

export default store;