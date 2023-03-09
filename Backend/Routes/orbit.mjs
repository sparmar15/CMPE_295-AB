import express from 'express';
import {orbitDB} from '../orbitDB';

const orbitRouter = express.Router();

orbitRouter.post('/put', async (req, res) => {
  try {
    const {username, password} = req.body;
    await orbitDB.put(username, password);
    console.log(`Key-value pair added: ${username}:${password}`);
    res.send(`Key-value pair added: ${username}:${password}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

orbitRouter.get('/get/:username', async (req, res) => {
  try {
    const password = await orbitDB.get(req.params.username);
    console.log(`Password for user ${req.params.username}: ${password}`);
    res.send(`Password for user ${req.params.username}: ${password}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export {orbitRouter};
