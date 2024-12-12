import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockPage = () => {
  const [products, setProducts] = useState([]);
  const [newStock, setNewStock] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle stock change
  const handleStockChange = async (id) => {
    const stock = newStock[id];
    if (stock >= 0) {
      try {
        await axios.put(`http://localhost:5000/api/products/${id}/stock`, { stock });
        alert('Stock updated successfully');
      } catch (error) {
        console.error('Error updating stock:', error);
        alert('Failed to update stock');
      }
    } else {
      alert('Please enter a valid stock number.');
    }
  };

  return (
    <div>
      <h1>Product Stock Management</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table>
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
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.cost}</td>
                <td>{product.stock}</td>
                <td>
                  <input
                    type="number"
                    value={newStock[product._id] || product.stock}
                    onChange={(e) => setNewStock({ ...newStock, [product._id]: e.target.value })}
                  />
                  <button onClick={() => handleStockChange(product._id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockPage;
