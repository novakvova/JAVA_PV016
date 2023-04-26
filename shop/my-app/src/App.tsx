import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import Home from './components/home';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/containers/default';
import NotFoundPage from './components/notFound';
import ProductCreatePage from './components/products/create/ProductCreatePage';
import ProductListPage from './components/products/list';
import ProductEditPage from './components/products/edit';
import ProductItemPage from './components/products/item/ProductItemPage';
import LoginPage from './components/auth/login';
import AdminLayout from './components/containers/admin';
import AdminHome from './components/admin/home';
import AdminCategoryCreatePage from './components/admin/categories/create';
const App = () => {

  
  
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="products/create" element={<ProductCreatePage />} />
          <Route path="products/edit/:id" element={<ProductEditPage />} />
          <Route path="products/list" element={<ProductListPage />} />
          <Route path="products/view/:id" element={<ProductItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminHome />} />
          <Route path="categories/create" element={<AdminCategoryCreatePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
