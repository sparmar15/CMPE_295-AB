import {drivers} from './db.js';

// insert new driver
async function addDriver(driverData) {
  const result = await drivers.put(driverData);
  return result;
}

// get driver by id
async function getDriverById(driverId) {
  const result = await drivers.get(driverId);
  return result;
}

// update driver by id
async function updateDriverById(driverId, driverData) {
  const driver = await getDriverById(driverId);
  const newData = {...driver, ...driverData};
  const result = await drivers.put(newData);
  return result;
}

// delete driver by id
async function deleteDriverById(driverId) {
  const result = await drivers.del(driverId);
  return result;
}

export {addDriver, getDriverById, updateDriverById, deleteDriverById};
