import express from 'express';
import {createUser, getUser} from '../OrbitFns/user.js';

const dbRoute = express.Router();

// Create an API endpoint to add a user
dbRoute.post('/post', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await createUser(username, password);
  res.send('User created successfully!');
});

// Create an API endpoint to get a user's password
dbRoute.get('/get', async (req, res) => {
  const username = req.body.username;
  const user = await getUser(username);
  res.send(user);
});

export {dbRoute};
