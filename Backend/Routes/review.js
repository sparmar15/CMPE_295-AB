import express from 'express';
import {
  addReview,
  getReviewsByHashes,
  getFileHash,
  deleteFileByHash,
} from '../ipfsFns/review.js';

const reviewRoute = express.Router();

// Define endpoints for Review document
reviewRoute.post('/addReview', async (req, res) => {
  const val1 = req.body.data.reviewId;
  const val2 = req.body.data.senderId;
  const val3 = req.body.data.recieverId;

  const options = {
    pinataMetadata: {
      name: val1,
      keyvalues: {
        senderId: val2,
        recieverId: val3,
      },
    },
    pinataOptions: {
      cidVersion: 0,
      wrapWithDirectory: true,
    },
  };
  try {
    const result = await addReview(req.body.data, options);
    req.session.driverHash = result.IpfsHash;
    return res.status(200).send({
      success: true,
      message: 'Review added successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: 'Review couldnt be added',
      error: err,
    });
  }
});

reviewRoute.get('/getReviewsPosted', async (req, res) => {
  const val = req.query.senderId;
  const filters = {
    metadata: {
      keyvalues: {
        senderId: {
          value: val,
          op: 'eq',
        },
      },
    },
  };
  try {
    const reviews = await getFileHash(filters);
    const ipfsHashes = reviews.rows.map(row => row.ipfs_pin_hash);
    const result = await getReviewsByHashes(ipfsHashes);
    return res.status(200).send({
      success: true,
      message: 'Review data retrieved successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: 'Review data couldnt be retrieved',
      error: err,
    });
  }
});

reviewRoute.get('/getReviewsRecieved', async (req, res) => {
  const val = req.query.recieverId;
  const filters = {
    metadata: {
      keyvalues: {
        recieverId: {
          value: val,
          op: 'eq',
        },
      },
    },
  };
  try {
    const reviews = await getFileHash(filters);
    const ipfsHashes = reviews.rows.map(row => row.ipfs_pin_hash);
    const result = await getReviewsByHashes(ipfsHashes);
    return res.status(200).send({
      success: true,
      message: 'Review data retrieved successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: 'Review data couldnt be retrieved',
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
    return res.status(400).send({
      success: false,
      message: 'Review couldnt be deleted',
      error: err,
    });
  }
});

export {reviewRoute};
