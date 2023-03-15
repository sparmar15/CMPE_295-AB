import express from 'express';
import {
  addReview,
  getReviewById,
  updateReviewById,
  deleteReviewById,
} from '../OrbitFns/review.js';

const reviewRoute = express.Router();

// Define endpoints for Review document
reviewRoute.post('/reviews', async (req, res) => {
  const review = await addReview(req.body);
  res.status(201).json(review);
});

reviewRoute.get('/reviews/:id', async (req, res) => {
  const review = await getReviewById(req.params.id);
  res.status(200).json(review);
});

reviewRoute.put('/reviews/:id', async (req, res) => {
  const review = await updateReviewById(req.params.id, req.body);
  res.status(200).json(review);
});

reviewRoute.delete('/reviews/:id', async (req, res) => {
  await deleteReviewById(req.params.id);
  res.sendStatus(204);
});

export {reviewRoute};
