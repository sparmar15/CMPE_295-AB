import express from 'express';
import {
  addDriver,
  getDriverByHash,
  getFileHash,
  deleteFileByHash,
} from '../ipfsFns/driver.js';

const driverRoute = express.Router();

// Define endpoints for Rider document
driverRoute.post('/addDriver', async (req, res) => {
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
    const result = await addDriver(req.body.data, options);
    req.session.driverHash = result.IpfsHash;
    return res.status(200).send({
      success: true,
      message: 'Driver added successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: 'Driver couldnt be added',
      error: err,
    });
  }
});

driverRoute.get('/getDriver', async (req, res) => {
  try {
    const cid = req.session.driverHash;
    const result = await getDriverByHash(cid);
    return res.status(200).send({
      success: true,
      message: 'Driver data retrieved successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: 'Driver data couldnt be retrieved',
      error: err,
    });
  }
});

driverRoute.get('/getFileHash', async (req, res) => {
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
    req.session.driverHash = result;
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

driverRoute.delete('/unpinFile', async (req, res) => {
  try {
    const result = await deleteFileByHash(req.query.cid);
    return res.status(200).send({
      success: true,
      message: 'Driver deleted successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: 'Driver couldnt be deleted',
      error: err,
    });
  }
});

export {driverRoute};
