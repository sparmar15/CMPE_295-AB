import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import pinataSDK from '@pinata/sdk';
import dotenv from 'dotenv';
dotenv.config();
// import {driverRoute} from './Routes/driver.js';
// import {riderRoute} from './Routes/rider.js';
import http from 'http';
import {mongoose} from 'mongoose';
import initSocket from './SocketIO/socket.js';
import {reviewRoute} from './Routes/review.js';
import {userRoute} from './Routes/user.js';
import {paymentRoute} from './Routes/payments.js';
import {ridesRoute} from './Routes/Rides.js';
import {tripRouter} from './Routes/trip.js';
import {rideRequestRoute} from './Routes/rideRequest.js';

const app = express();
const port = 4000;
const socketPort = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// use express session
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET, // replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // expire session after 24 hours
    },
  }),
);

// initializing pinata SDK
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

pinata
  .testAuthentication()
  .then(result => {
    //handle successful authentication here
    console.log('====================================');
    console.log('Pinata Service activated');
    console.log(result);
    console.log('====================================');
  })
  .catch(err => {
    //handle error here
    console.log(err);
  });

// Routing
// app.use('/drivers', driverRoute);
// app.use('/riders', riderRoute);
app.use('/reviews', reviewRoute);
app.use('/users', userRoute);
app.use('/payments', paymentRoute);
app.use('/rides', ridesRoute);
app.use('/trips', tripRouter);
app.use('/rideRequests', rideRequestRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Socket IO
const server = http.createServer();

initSocket(server);

server.listen(socketPort, () => {
  console.log('====================================');
  console.log(`Socket server listening on http://localhost:${socketPort}`);
});

// MongoDB connection

const uri =
  'mongodb+srv://carpool-app-db:carpool-app@cluster0.zm5lhqe.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(uri, {useNewUrlParser: true})
  .then(() => {
    console.log('Mongo DB connected');
    console.log('====================================');
  })
  .catch(error => {
    console.log(error);
  });

export {pinata};
