import express from 'express';
import {
  addReview,
  getReviewByHash,
  getFileHash,
  deleteFileByHash,
} from '../ipfsFns/review.js';

const reviewRoute = express.Router();

// Define endpoints for Review document
reviewRoute.post('/addReview', async (req, res) => {
  try {
    const result = await addReview(req.body.data, req.body.options);
    return res.status(200).send({
      success: true,
      message: 'Review added successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: 'Review couldnt be added',
      error: err,
    });
  }
});

reviewRoute.get('/getReview', async (req, res) => {
  try {
    const result = await getReviewByHash(req.query.cid);
    return res.status(200).send({
      success: true,
      message: 'Review data retrieved successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: 'Review data couldnt be retrieved',
      error: err,
    });
  }
});

reviewRoute.get('/getFileHash', async (req, res) => {
  try {
    const result = await getFileHash(req.body.filters);
    return res.status(200).send({
      success: true,
      message: 'File hash retrieved successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: 'File hash couldnt be retrieved',
      error: err,
    });
  }
});

reviewRoute.delete('/unpinFile', async (req, res) => {
  try {
    const result = await deleteFileByHash(req.query.cid);
    return res.status(200).send({
      success: true,
      message: 'Review deleted successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: 'Review couldnt be deleted',
      error: err,
    });
  }
});

export {reviewRoute};
