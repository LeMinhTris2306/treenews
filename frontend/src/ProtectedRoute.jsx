import { Navigate, Outlet } from "react-router-dom";

import React from "react";

const ProtectedRoute = ({ isAuthenticated }) => {
  // console.log(`status: ${isAuthenticated}`);
  // console.log(isAuthenticated);
  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng người dùng tới trang đăng nhập
    return <Navigate to="/login" />;
  }

  // Nếu đã đăng nhập, cho phép truy cập vào route con (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
