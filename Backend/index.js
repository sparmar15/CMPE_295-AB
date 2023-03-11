import {create as ipfsCreate} from 'ipfs-core';
import OrbitDB from 'orbit-db';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connect to your existing IPFS instance
const ipfs = await ipfsCreate({
  // Replace with the multiaddress of your IPFS node
  addresses: {
    swarm: ['/ip4/127.0.0.1/tcp/5001'],
  },
});

// Create an OrbitDB instance and load the database
const orbitdb = await OrbitDB.createInstance(ipfs);
const db = await orbitdb.docstore('users');

// Open Existing OrbittDB database
// const address =
//   '02199e712c5d4c62c64ba57b74a811970ba90e8936d4b2aa35d27116f71dc5cca0';
// const db = await OrbitDB.open(address);

console.log('Database address:' + db.address);
console.log('Identity: ' + JSON.stringify(db.identity));

// Enable CORS
app.use(cors());

// Create an API endpoint to add a user
app.post('/post', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Add the user to the OrbitDB database
  await db.put({_id: username, password});

  // Return a success message
  res.send('User added successfully!');
});

// Create an API endpoint to get a user's password
app.get('/get', async (req, res) => {
  const username = req.body.username;

  // Find the user in the OrbitDB database
  const user = await db.get(username);
  // Return the user's password
  res.send('User:' + JSON.stringify(user));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
