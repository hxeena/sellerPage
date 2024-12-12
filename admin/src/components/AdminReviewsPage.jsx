import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminReviewsPage.css';

function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      setLoading(true);
      axios.get(`http://localhost:5000/api/reviews/${selectedProductId}`)
        .then(response => {
          setReviews(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching reviews:', err);
          setLoading(false);
        });
    }
  }, [selectedProductId]);

  return (
    <div className="admin-reviews">
      <h2>Product Reviews</h2>
      <select onChange={(e) => setSelectedProductId(e.target.value)} value={selectedProductId}>
        <option value="">Select a Product</option>
        {products.map(product => (
          <option key={product._id} value={product._id}>{product.name}</option>
        ))}
      </select>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <ul>
          {reviews.length ? reviews.map(review => (
            <li key={review._id}>
              <p><strong>{review.username}:</strong> {review.comment}</p>
            </li>
          )) : (
            selectedProductId && <p>No reviews available for this product.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default AdminReviewsPage;
