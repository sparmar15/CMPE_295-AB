import express from 'express';
import bookRide from '../ipfsFns/bookRide.js';
const ridesRoute = express.Router();
ridesRoute.post('/addRide', async (req, res) => {
  const val1 = req.body.data._id;
  const driverData = req.body.data.driverData;
  const riderData = req.body.data.riderData;

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
    const result = await bookRide(riderData, driverData, options);
    req.session.driverHash = result.IpfsHash; //Need ride hash
    return res.status(200).send({
      success: true,
      message: 'Ride Confirmed Succesfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: 'Ride cannot be xonfirmed',
      error: err,
    });
  }
});
