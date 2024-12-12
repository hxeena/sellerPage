import React, { useState } from 'react';
import axios from 'axios';
import './SellProduct.css';

function SellProduct() {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSell = async (e) => {
    e.preventDefault();
    if (!productId || !quantity) {
      return alert('Product ID and quantity are required.');
    }

    try {
      const response = await axios.patch(`http://localhost:5000/api/products/${productId}/sell`, { quantity });
      alert(response.data.message);
    } catch (err) {
      console.error('Error reducing stock:', err);
      alert('Failed to reduce stock.');
    }
  };

  return (
    <form className="sell-product" onSubmit={handleSell}>
      <h2>Sell Product</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity Sold"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button type="submit">Reduce Stock</button>
    </form>
  );
}

export default SellProduct;
