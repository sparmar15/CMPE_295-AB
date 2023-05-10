import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {addUser, getUserByHash, getUserbyEmail} from '../ipfsFns/user.js';

const reviewRoute = express.Router();

reviewRoute.post('/addReview', async (req, res) => {
  try {
    const recieverEmail = req.body.data.recieverEmail;
    const filters = {
      metadata: {
        name: recieverEmail,
      },
    };
    const userDetails = await getUserbyEmail(filters);
    const reviewData = req.body.data;
    reviewData._id = uuidv4();
    userDetails.reviews.push(reviewData);

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

    const result = await addUser(userDetails, options);
    req.session.userHash = result.IpfsHash;

    return res.status(200).send({
      success: true,
      message: 'Ride History Updated Succesfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: 'Ride History cannot be Updated',
      error: err.message,
    });
  }
});

export {reviewRoute};
