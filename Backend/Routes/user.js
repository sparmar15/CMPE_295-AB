import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {addUser, getUserByHash, getUserbyEmail} from '../ipfsFns/user.js';

const userRoute = express.Router();

// Add user route
userRoute.post('/addUser', async (req, res) => {
  try {
    const userDetails = req.body.data;
    userDetails._id = userDetails._id || uuidv4();
    console.log(userDetails._id); // If _id is not present in user details, create a new uuid for it.
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
      message: 'User data added successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: 'User data couldnt be added',
      error: err.message,
    });
  }
});

// Get user by email route
userRoute.get('/getUserByEmail', async (req, res) => {
  try {
    const email = req.body.data.email;
    const filters = {
      metadata: {
        name: email,
      },
    };
    const result = await getUserbyEmail(filters);
    return res.status(200).send({
      success: true,
      message: 'User data retrieved successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: 'User data couldnt be retrieved',
      error: err.message,
    });
  }
});

// Get user by hash route
userRoute.get('/getUserByHash', async (req, res) => {
  try {
    const result = await getUserByHash(req.session.userHash);
    return res.status(200).send({
      success: true,
      message: 'User data retrieved successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: 'User data couldnt be retrieved',
      error: err.message,
    });
  }
});

export {userRoute};
