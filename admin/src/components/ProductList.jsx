import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newStock, setNewStock] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleStockUpdate = (productId) => {
    const stock = newStock[productId];
    if (!stock || isNaN(stock) || stock <= 0) {
      alert('Enter a valid stock value.');
      return;
    }

    axios.put(`http://localhost:5000/api/products/${productId}/stock`, { stock })
      .then(() => {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product._id === productId ? { ...product, stock } : product
          )
        );
        alert('Stock updated.');
      })
      .catch(error => console.error('Error updating stock:', error));
  };

  return (
    <table className="product-list">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Cost</th>
          <th>Stock</th>
          <th>Update Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.cost}</td>
            <td>{product.stock}</td>
            <td>
              <input
                type="number"
                value={newStock[product._id] || ''}
                onChange={(e) => setNewStock({ ...newStock, [product._id]: parseInt(e.target.value, 10) })}
              />
              <button onClick={() => handleStockUpdate(product._id)}>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
