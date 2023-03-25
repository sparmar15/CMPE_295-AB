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
  // const options = {
  //   pinataMetadata: {
  //     name: 'MyCustomName',
  //     keyvalues: {
  //       _id: '008',
  //       user_name: 'siodasf',
  //     },
  //   },
  //   pinataOptions: {
  //     cidVersion: 0,
  //     wrapWithDirectory: true,
  //   },
  // };
  try {
    const result = await addDriver(req.body.data, req.body.options);
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
    // const cid = 'Qmc9RYapT1qUvHerpZqpaLQsmucW7Evm3tM8ZrypvGMxX7';
    const result = await getDriverByHash(req.query.cid);
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
  // const filters = {
  //   metadata: {
  //     name: 'MyCustomName',
  //     keyvalues: {
  //       _id: {
  //         value: '008',
  //         op: 'eq',
  //       },
  //       user_name: {
  //         value: 'siodasf',
  //         op: 'eq',
  //       },
  //     },
  //   },
  // };
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
