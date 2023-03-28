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
  const val1 = req.body.data._id;
  const val2 = req.body.data.username;

  const options = {
    pinataMetadata: {
      name: val1,
      keyvalues: {
        user_name: val2,
      },
    },
    pinataOptions: {
      cidVersion: 0,
      wrapWithDirectory: true,
    },
  };
  try {
    const result = await addRider(req.body.data, options);
    req.session.riderHash = result.IpfsHash;
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
    const cid = req.session.riderHash;
    const result = await getRiderByHash(cid);
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
  const val1 = req.body.data._id;
  const val2 = req.body.data.username;
  const filters = {
    metadata: {
      name: val1,
      keyvalues: {
        user_name: {
          value: val2,
          op: 'eq',
        },
      },
    },
  };
  try {
    const result = await getFileHash(filters);
    req.session.riderHash = result;
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
