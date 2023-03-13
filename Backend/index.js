import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {dbRoute} from './Routes/dbRoute.js';
import {db} from './OrbitFns/db.js';
import util from 'util';

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// initialize database
console.log('ORBIT DB info');
console.log('Address: ' + util.inspect(db.address, {colors: true}));
console.log('Identity: ' + util.inspect(db.identity, {depth: 0, colors: true}));

// Routing
app.use('/user', dbRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
