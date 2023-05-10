import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {addUser, getUserByHash} from '../ipfsFns/user.js';

const ridesRoute = express.Router();

ridesRoute.post('/addRide', async (req, res) => {
  const userHash = req.session.userHash;
  const userDetails = await getUserByHash(userHash);
  const rideData = req.body.data;
  rideData._id = uuidv4();
  userDetails.ride_history.push(rideData);

  const options = {
    pinataMetadata: {
      name: userDetails.email,
      keyvalues: {
        _id: userDetails._id,
      },
    },
    pinataOptions: {
      cidVersion: 0,
      wrapWithDirectory: true,
    },
  };
  try {
    const result = await addUser(userDetails, options);
    req.session.userHash = result.IpfsHash; //Need ride hash
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

export {ridesRoute};
