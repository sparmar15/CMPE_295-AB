import express from 'express';
import {
  addDriver,
  getDriverById,
  updateDriverById,
  deleteDriverById,
} from '../OrbitFns/driver.js';

const driverRoute = express.Router();

// Define endpoints for Rider document
driverRoute.post('/drivers', async (req, res) => {
  const driver = await addDriver(req.body);
  res.status(201).json(driver);
});

driverRoute.get('/drivers/:id', async (req, res) => {
  const driver = await getDriverById(req.params.id);
  res.status(200).json(driver);
});

driverRoute.put('/drivers/:id', async (req, res) => {
  const driver = await updateDriverById(req.params.id, req.body);
  res.status(200).json(driver);
});

driverRoute.delete('/drivers/:id', async (req, res) => {
  await deleteDriverById(req.params.id);
  res.sendStatus(204);
});

export {driverRoute};
