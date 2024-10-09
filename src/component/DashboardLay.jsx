import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLay from "./SidebarLay";
import NewOrders from "./NewOrders";
import ProductList from "./ProductList";
import Login from "./Login/Login";

const DashboardLay = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap the Login component with JSX */}
        <Route path="/" element={<Login />} />

        {/* The parent route should also use JSX wrapping for SidebarLay */}
        <Route path="/dash" element={<SidebarLay />}>
          {/* Nested routes inside /dash */}
          <Route path="/dash" element={<NewOrders />} />
          <Route path="productList" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default DashboardLay;
