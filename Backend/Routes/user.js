import express from 'express';
import {getUser} from '../ipfsFns/user.js';

const userRoute = express.Router();

userRoute.get('/getUser', async (req, res) => {
  const val1 = req.body.data._id;
  const val2 = req.body.data.username;
  const filters = {
    metadata: {
      name: val1,
    },
  };
  try {
    const result = await getUser(filters);
    return res.status(200).send({
      success: true,
      message: 'User retrieved successfully',
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: 'User couldnt be retrieved',
      error: err,
    });
  }
});

export {userRoute};
