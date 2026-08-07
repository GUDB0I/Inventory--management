import { useState, useEffect } from 'react'
import api from './api/axios';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedroute";
import Supplier from './pages/supplier/readsupp';
import CreateSupp from './pages/supplier/create';
import UpdateSupp from './pages/supplier/updates';
import Category from './pages/category/readcate';
import CreateCate from './pages/category/create';
import UpdateCate from './pages/category/update';
import AdminLayout from './layouts/AdminLayout';
import Product from './pages/product/readprod';
import CreateProd from './pages/product/createprod';
import UpdateProd from './pages/product/updateprod';
import StockImport from './pages/import/readimport';
import StockExport from './pages/export/readexport';
import DetailImport from './pages/import/detailimport';
import DetailExport from './pages/export/detailexport';
import CreateImport from './pages/import/createimport';
import CreateExport from './pages/export/createexport';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>} />
        <Route path="/supplier" element = {<ProtectedRoute>
            <Supplier />
        </ProtectedRoute>} />
        <Route path="/supplier/create" element = {<ProtectedRoute>
            <CreateSupp />
        </ProtectedRoute>} />
        <Route path="/supplier/update/:id" element = {<ProtectedRoute>
            <UpdateSupp />
        </ProtectedRoute>} />
        <Route path="/category" element = {<ProtectedRoute>
            <Category />
        </ProtectedRoute>} />
        <Route path="/category/create" element = {<ProtectedRoute>
            <CreateCate />
        </ProtectedRoute>} />
        <Route path="/category/update/:id" element = {<ProtectedRoute>
            <UpdateCate />
        </ProtectedRoute>} />
        <Route path="/product" element = {<ProtectedRoute>
            <Product />
        </ProtectedRoute>} />
        <Route path="/product/create" element = {<ProtectedRoute>
            <CreateProd />
        </ProtectedRoute>} />
        <Route path="/product/update/:id" element = {<ProtectedRoute>
            <UpdateProd />
        </ProtectedRoute>} />
        <Route path="/stockimport" element = {<ProtectedRoute>
            <StockImport />
        </ProtectedRoute>} />
        <Route path="/stockexport" element = {<ProtectedRoute>
            <StockExport />
        </ProtectedRoute>} />
        <Route path="/stockimport/show/:id" element = {<ProtectedRoute>
            <DetailImport />
        </ProtectedRoute>} />
        <Route path="/stockexport/show/:id" element = {<ProtectedRoute>
            <DetailExport />
        </ProtectedRoute>} />
        <Route path="/stockimport/create" element = {<ProtectedRoute>
            <CreateImport />
        </ProtectedRoute>} />
        <Route path="/stockexport/create" element = {<ProtectedRoute>
            <CreateExport />
        </ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
