import mongoose from 'mongoose';

const rideRequestSchema = new mongoose.Schema({
  tripId: {
    type: String,
    required: true,
  },
  requestingRiders: [
    {
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  confirmedRiders: [
    {
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const RideRequest = mongoose.model('RideRequest', rideRequestSchema);

export default RideRequest;
