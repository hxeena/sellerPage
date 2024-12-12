import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cost: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/products', data);
      alert(response.data.message);
      setFormData({ name: '', description: '', cost: '', stock: '' });
      setImage(null);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
      <input type="number" name="cost" placeholder="Cost" value={formData.cost} onChange={handleInputChange} required />
      <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} required />
      <input type="file" onChange={handleImageChange} required />
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
    </form>
  );
}

export default ProductForm;
