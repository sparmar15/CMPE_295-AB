import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {addUser, getUserByHash, getUserbyEmail} from '../ipfsFns/user.js';

const userRoute = express.Router();

userRoute.post('/addUser', async (req, res) => {
  const userDetails = req.body.data;
  // only create new uuid if _id is not present in user details. Helps when updating a userFile and maintining the same uuid for it throughout updates.
  if (!userDetails._id) {
    userDetails._id = uuidv4();
  }

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
      error: err,
    });
  }
});

userRoute.get('/getUserByEmail', async (req, res) => {
  const email = req.body.data.email;
  // const _id = req.body._id;
  const filters = {
    metadata: {
      name: email,
      // keyvalues: {
      //   _id: {
      //     value: _id,
      //     op: 'eq',
      //   },
      // },
    },
  };
  try {
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
      error: err,
    });
  }
});

userRoute.get('/getUserByHash', async (req, res) => {
  try {
    const userHash = req.session.userHash;
    const result = await getUserByHash(
      'QmYqTTucHHKsWFv2oRqUfPMEhzQxroWeRXtZtYeDLp6sUe',
    );
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
      error: err,
    });
  }
});

export {userRoute};
