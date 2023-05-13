import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    driverEmail: {type: String, required: true},
    driverName: {type: String, required: true},
    startLocation: {
      startLocLat: {type: Number, required: true},
      startLocLong: {type: Number, required: true},
    },
    endLocation: {
      endLocLat: {type: Number, required: true},
      endLocLong: {type: Number, required: true},
    },
    startPlace: {type: String, required: true},
    endPlace: {type: String, required: true},
    startDate: {type: Date, required: true},
    startTime: {type: String, required: true},
    selectedCar: {
      make: {type: String, required: true},
      model: {type: String, required: true},
      color: {type: String, required: true},
      licensePlate: {type: String, required: true},
    },
    occupants: {type: Number, required: true},
  },
  {timestamps: true},
);

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
