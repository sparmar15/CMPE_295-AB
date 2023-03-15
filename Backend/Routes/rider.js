import express from 'express';
import {
  addRider,
  getRiderById,
  updateRiderById,
  deleteRiderById,
} from '../OrbitFns/rider.js';

const riderRoute = express.Router();

// Define endpoints for Rider document
riderRoute.post('/riders', async (req, res) => {
  const rider = await addRider(req.body);
  res.status(201).json(rider);
});

riderRoute.get('/riders/:id', async (req, res) => {
  const rider = await getRiderById(req.params.id);
  res.status(200).json(rider);
});

riderRoute.put('/riders/:id', async (req, res) => {
  const rider = await updateRiderById(req.params.id, req.body);
  res.status(200).json(rider);
});

riderRoute.delete('/riders/:id', async (req, res) => {
  await deleteRiderById(req.params.id);
  res.sendStatus(204);
});

export {riderRoute};
