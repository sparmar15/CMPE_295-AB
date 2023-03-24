import express from 'express';
import {pinata, ipfs} from '../index.js';
import {
  addDriver,
  getDriverById,
  updateDriverById,
  deleteDriverById,
} from '../ipfsFns/driver.js';

const driverRoute = express.Router();
const options = {
  pinataMetadata: {
    name: 'drivers',
  },
  pinataOptions: {
    cidVersion: 0,
  },
};
const filter = {
  metadata: {
    name: 'drivers',
  },
};

// Define endpoints for Rider document
driverRoute.post('/addDriver', async (req, res) => {
  pinata
    .pinJSONToIPFS(req.body, options)
    .then(result => {
      //handle results here
      console.log(result);
      return res.status(200).send({
        success: true,
        message: 'Driver added successfully',
        result: result,
      });
    })
    .catch(err => {
      //handle error here
      console.log(err);
      return res.status(200).send({
        success: false,
        message: 'Driver couldnt be added',
        error: err,
      });
    });
});

driverRoute.get('/getDrivers', async (req, res) => {
  const cid =
    'Qmbb7kAhopTy68WLYNJdino7TtaTXSeNSua7LjVNqBzSGp/sampleReview.json';
  const result = await getDriverById(cid);
  console.log('====================================');
  console.log(result);
  console.log('====================================');
  return res.status(200).send({
    success: true,
    message: 'Driver retrieved successful',
    result: result,
  });
});

driverRoute.put('/drivers/:id', async (req, res) => {
  // const driver = await updateDriverById(req.params.id, req.body);
  res.status(200).json(driver);
});

driverRoute.delete('/drivers/:id', async (req, res) => {
  // await deleteDriverById(req.params.id);
  res.sendStatus(204);
});

export {driverRoute};
