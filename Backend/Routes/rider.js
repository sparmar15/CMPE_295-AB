import express from 'express';
import {
  addRider,
  getRiderByHash,
  getFileHash,
  deleteFileByHash,
} from '../ipfsFns/rider.js';

const riderRoute = express.Router();

// Define endpoints for Rider document
riderRoute.post('/addRider', async (req, res) => {
  try {
    const result = await addRider(req.body.data, req.body.options);
    return res.status(200).send({
      success: true,
      message: 'Rider added successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: 'Rider couldnt be added',
      error: err,
    });
  }
});

riderRoute.get('/getRider', async (req, res) => {
  try {
    const result = await getRiderByHash(req.query.cid);
    return res.status(200).send({
      success: true,
      message: 'Rider data retrieved successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: 'Rider data couldnt be retrieved',
      error: err,
    });
  }
});

riderRoute.get('/getFileHash', async (req, res) => {
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

riderRoute.delete('/unpinFile', async (req, res) => {
  try {
    const result = await deleteFileByHash(req.query.cid);
    return res.status(200).send({
      success: true,
      message: 'Rider deleted successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: 'Rider couldnt be deleted',
      error: err,
    });
  }
});

export {riderRoute};
