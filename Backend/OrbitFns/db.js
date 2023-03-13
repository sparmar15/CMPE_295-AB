import {create as ipfsCreate} from 'ipfs-core';
import OrbitDB from 'orbit-db';

// Connect to your existing IPFS instance
const ipfs = await ipfsCreate({
  // Replace with the multiaddress of your IPFS node
  addresses: {
    swarm: ['/ip4/127.0.0.1/tcp/5001'],
  },
});

// Create an OrbitDB instance and load the database
const orbitdb = await OrbitDB.createInstance(ipfs);
// const options = {indexBy: 'doc'};
const db = await orbitdb.docstore('carma-db');

// Open Existing OrbittDB database
// const address =
//   '02199e712c5d4c62c64ba57b74a811970ba90e8936d4b2aa35d27116f71dc5cca0';
// const db = await OrbitDB.open(address);

export {db};
