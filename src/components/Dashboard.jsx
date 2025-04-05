import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import ProductList from "../data/Products";

export default function Dashboard() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isLogin = JSON.parse(localStorage.getItem("isLogin"))  || {};
  
  if (!isAuthenticated || isLogin?.role === "customer") {
    return <Navigate to="/login" />;
  }
  return (
    <div className="row">
      <div className="col-lg-2 bg-dark min-vh-100">
        <Navigation />
      </div>
      <div className="col-lg-10">
        {isLogin?.role === "admin" ? (
          <>
            <h1>Admin Dashboard</h1>
            <Outlet />
          </>
        ) : isLogin?.role === "customer" ? (
          <>
            <h1>Customer Dashboard</h1>
            <ProductList /> {/* Hiển thị danh sách sản phẩm với tìm kiếm */}
          </>
        ) : (
          <Navigate to="/login" />
        )}
      </div>
    </div>
  );
}