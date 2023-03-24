import {ipfs} from '../index.js';
import fetch from 'node-fetch';

// insert new driver
async function addDriver(driverData) {
  const file = {
    path: '/',
    content: JSON.stringify(driverData),
  };
  const result = await ipfs.pin.add(file);
  console.log(result);
  return result;
}

// get driver by id
async function getDriverById(cid) {
  let url = 'https://ipfs.io/ipfs/' + cid;
  // console.log(url);
  let settings = {method: 'Get'};
  const result = await fetch(url, settings)
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      return err;
    });
  return result;
}

// update driver by id
async function updateDriverById(driverId, driverData) {
  const driver = await getDriverById(driverId);
  const newData = {...driver[0], ...driverData};
  const result = await drivers.put(newData);
  return result;
}

// delete driver by id
async function deleteDriverById(driverId) {
  const result = await drivers.del(driverId);
  return result;
}

export {addDriver, getDriverById, updateDriverById, deleteDriverById};
