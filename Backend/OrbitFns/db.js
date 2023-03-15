import {create as ipfsCreate} from 'ipfs-core';
import OrbitDB from 'orbit-db';
import util from 'util';

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

// create riders document
const riders = await orbitdb.docstore('riders');

// create drivers document
const drivers = await orbitdb.docstore('drivers');

// create reviews document
const reviews = await orbitdb.docstore('reviews');

// Logging database info
console.log('ORBIT DB info');
console.log('Address: ' + util.inspect(db.address, {colors: true}));
console.log('Identity: ' + util.inspect(db.identity, {depth: 0, colors: true}));

export {riders, drivers, reviews};