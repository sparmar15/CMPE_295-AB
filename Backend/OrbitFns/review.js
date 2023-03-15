import {reviews} from './db.js';

// insert new review
async function addReview(reviewData) {
  const result = await reviews.put(reviewData);
  return result;
}

// get review by id
async function getReviewById(reviewId) {
  const result = await reviews.get(reviewId);
  return result;
}

// update review by id
async function updateReviewById(reviewId, reviewData) {
  const review = await getReviewById(reviewId);
  const newData = {...review[0], ...reviewData};
  const result = await reviews.put(newData);
  return result;
}

// delete review by id
async function deleteReviewById(reviewId) {
  const result = await reviews.del(reviewId);
  return result;
}

export {addReview, getReviewById, updateReviewById, deleteReviewById};
