import {riders} from './db.js';

// insert new rider
async function addRider(riderData) {
  const result = await riders.put(riderData);
  return result;
}

// get rider by id
async function getRiderById(riderId) {
  const result = await riders.get(riderId);
  return result;
}

// update rider by id
async function updateRiderById(riderId, riderData) {
  const rider = await getRiderById(riderId);
  const newData = {...rider, ...riderData};
  const result = await riders.put(newData);
  return result;
}

// delete rider by id
async function deleteRiderById(riderId) {
  const result = await riders.del(riderId);
  return result;
}

export {addRider, getRiderById, updateRiderById, deleteRiderById};
