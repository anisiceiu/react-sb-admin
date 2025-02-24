import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ layout: Layout, children }) => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return Layout ? <Layout>{children}</Layout> : children;
};

export default ProtectedRoute;
