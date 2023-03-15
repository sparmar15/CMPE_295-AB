import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {driverRoute} from './Routes/driver.js';
import {riderRoute} from './Routes/rider.js';
import {reviewRoute} from './Routes/review.js';

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Routing
app.use('/driver', driverRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
