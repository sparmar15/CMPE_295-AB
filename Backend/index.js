import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import pinataSDK from '@pinata/sdk';
import dotenv from 'dotenv';
dotenv.config();
import {driverRoute} from './Routes/driver.js';
import {riderRoute} from './Routes/rider.js';
import {reviewRoute} from './Routes/review.js';

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// use express session
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET, // replace with your own secret key
    resave: false,
    saveUninitialized: true,
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
app.use('/drivers', driverRoute);
app.use('/riders', riderRoute);
app.use('/reviews', reviewRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export {pinata};
