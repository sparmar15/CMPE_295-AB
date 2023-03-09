import IPFS from 'ipfs';
import OrbitDB from 'orbit-db';

async function main() {
  const ipfsOptions = {repo: './ipfs'};
  const ipfs = await IPFS.create(ipfsOptions);
  const orbitdb = await OrbitDB.createInstance(ipfs);

  const options = {
    // Give write access to everyone
    accessController: {
      write: ['*'],
    },
  };

  const db = await orbitdb.keyvalue('first-database', options);
  console.log(db.address.toString());
  // /orbitdb/QmRrauSxaAvNjpZcm2Cq6y9DcrH8wQQWGjtokF4tgCUxGP/first-database
  return db;
}

export {main};
