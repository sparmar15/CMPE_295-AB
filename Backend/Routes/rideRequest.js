import express from 'express';
import RideRequest from '../Models/rideRequest.js';
import Trip from '../Models/trip.js';

const rideRequestRoute = express.Router();

rideRequestRoute.post('/', async (req, res) => {
  const {tripId, userEmail, userName} = req.body;
  console.log(req.body);
  try {
    // Check if the ride request already exists
    let rideRequest = await RideRequest.findOne({tripId});

    if (!rideRequest) {
      // Create a new ride request if it doesn't exist
      rideRequest = new RideRequest({
        tripId,
        requestingRiders: [],
        confirmedRiders: [],
      });
    }

    // Add user data to the requesting riders
    rideRequest.requestingRiders.push({email: userEmail, name: userName});

    // Save the updated ride request
    await rideRequest.save();

    res.status(200).json({message: 'Ride request updated successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred'});
  }
});

// POST /confirm
rideRequestRoute.post('/confirm', async (req, res) => {
  const {tripId, userEmail} = req.body;

  try {
    // Find the ride request with the given rideId
    const rideRequest = await RideRequest.findOne({tripId});

    if (!rideRequest) {
      return res.status(404).json({message: 'Ride request not found'});
    }

    // Find the index of the requested rider with the given userEmail
    const requestedRiderIndex = rideRequest.requestingRiders.findIndex(
      rider => rider.email === userEmail,
    );

    if (requestedRiderIndex === -1) {
      return res.status(404).json({message: 'Requested rider not found'});
    }

    // Move the requested rider to the confirmed riders list
    const requestedRider = rideRequest.requestingRiders.splice(
      requestedRiderIndex,
      1,
    )[0];
    rideRequest.confirmedRiders.push(requestedRider);

    // Save the updated ride request
    await rideRequest.save();

    res.status(200).json({message: 'Rider confirmed successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred'});
  }
});

rideRequestRoute.get('/requestingRides/:driverEmail', async (req, res) => {
  try {
    const driverEmail = req.params.driverEmail;
    // Find all trips by driver email
    const trips = await Trip.find({driverEmail});
    // Extract trip IDs from the array of trips
    const tripIds = trips.map(trip => trip._id);
    // Find all ride requests with the specified trip IDs
    const rideRequests = await RideRequest.find({tripId: {$in: tripIds}});
    // Extract requesting riders from each ride request and append corresponding trips
    const requestingRiders = rideRequests.reduce((riders, rideRequest) => {
      const trip = trips.find(trip => trip._id.equals(rideRequest.tripId));
      rideRequest.requestingRiders.forEach(rider => {
        riders.push({
          rider: rider,
          trip: trip,
        });
      });
      return riders;
    }, []);
    res.json(requestingRiders);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred'});
  }
});

// DELETE /cancel
rideRequestRoute.post('/reject', async (req, res) => {
  const {tripId, userEmail} = req.body;

  try {
    // Find the ride request with the given tripId
    const rideRequest = await RideRequest.findOne({tripId});

    if (!rideRequest) {
      return res.status(404).json({message: 'Ride request not found'});
    }

    // Find the index of the requested rider with the given userEmail
    const requestedRiderIndex = rideRequest.requestingRiders.findIndex(
      rider => rider.email === userEmail,
    );

    if (requestedRiderIndex === -1) {
      return res.status(404).json({message: 'Requested rider not found'});
    }

    // Remove the requested rider from the requesting riders list
    rideRequest.requestingRiders.splice(requestedRiderIndex, 1);

    // Save the updated ride request
    await rideRequest.save();

    res.status(200).json({message: 'Ride cancelled successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred'});
  }
});

// GET /confirmedTrips/:userEmail
rideRequestRoute.get('/confirmedTrips/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail;

  try {
    // Find all ride requests with the specified user as a confirmed rider
    const rideRequests = await RideRequest.find({
      confirmedRiders: {$elemMatch: {email: userEmail}},
    });

    // Extract the trip IDs from the ride requests
    const tripIds = rideRequests.map(rideRequest => rideRequest.tripId);

    // Fetch the corresponding trips based on the trip IDs
    const trips = await Trip.find({_id: {$in: tripIds}});

    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred'});
  }
});

rideRequestRoute.get('/checkConfirmedRide', async (req, res) => {
  const {tripId, userEmail} = req.query;
  console.log(req.query);
  try {
    // Find the ride request by tripId
    const rideRequest = await RideRequest.findOne({tripId});
    console.log(req.rideRequest);
    if (rideRequest) {
      // Check if the user is in the confirmed riders list
      const confirmedRider = rideRequest.confirmedRiders.find(
        rider => rider.email === userEmail,
      );

      if (confirmedRider) {
        res.status(200).json({confirmed: true});
      } else {
        res.status(200).json({confirmed: false});
      }
    } else {
      res.status(404).json({message: 'Ride request not found'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred'});
  }
});

export {rideRequestRoute};
