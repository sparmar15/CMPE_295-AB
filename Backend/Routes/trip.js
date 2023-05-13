import express from 'express';
import Trip from '../Models/trip.js';

const tripRouter = express.Router();

//new trip
tripRouter.post('/', async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

tripRouter.get('/getAvailableRides', async (req, res) => {
  try {
    const trip = await Trip.find();
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

tripRouter.get('/:driverEmail', async (req, res) => {
  const driverEmail = req.params.driverEmail;
  try {
    const trips = await Trip.find({driverEmail});
    res.status(200).json(trips);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

export {tripRouter};
