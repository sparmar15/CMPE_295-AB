import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import {ipfsClient} from './ipfs.js';
import {driverRoute} from './Routes/driver.js';
// import {riderRoute} from './Routes/rider.js';
// import {reviewRoute} from './Routes/review.js';
import create from 'ipfs-http-client';
import pinataSDK from '@pinata/sdk';

// import {create} from 'ipfs-core';
import makeIpfsFetch from 'js-ipfs-fetch';

const ipfs = await create('/ip4/127.0.0.1/tcp/5001');
const fetch = await makeIpfsFetch({ipfs});

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Initiating an IPFS instance

// initializing pinata SDK
const pinata = new pinataSDK(
  'b5b282c9373211864959',
  'bb62504c48aa1df43baf5b73e961fa447c824ef97fd43f12f29fd08936bb6199',
);

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
// app.use('/riders', riderRoute);
// app.use('/reviews', reviewRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export {pinata, ipfs};
