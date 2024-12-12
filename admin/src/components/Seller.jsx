import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import SellProduct from './SellProduct';
import AdminReviewsPage from './AdminReviewsPage';
import './Seller.css';

function Seller() {
  return (
    <div className="seller">
      <h1>Admin Panel</h1>
      <nav className="navigation">
        <Link to="/">Add Product</Link>
        <Link to="/product-list">Product List</Link>
        <Link to="/reviews">Product Reviews</Link>
        <Link to="/sell-product">Sell Product</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductForm />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/reviews" element={<AdminReviewsPage />} />
        <Route path="/sell-product" element={<SellProduct />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default Seller;
