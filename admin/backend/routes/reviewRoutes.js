// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');
const Product = require('../models/Product');

// Route to get reviews for a product
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId }).populate('productId', 'name description');  // Populate product details, but don't expose product ID
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Server error, could not fetch reviews' });
  }
});

// Route to add a review for a product
router.post('/', async (req, res) => {
  const { productId, reviewerName, rating, comment } = req.body;

  if (!productId || !reviewerName || !rating || !comment) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newReview = new Review({
      productId,
      reviewerName,
      rating,
      comment,
    });

    await newReview.save();
    res.status(200).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ message: 'Server error, could not save review' });
  }
});

module.exports = router;
