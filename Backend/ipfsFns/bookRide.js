import fetch from 'node-fetch';
import {pinata} from '../index.js';

//Book Ride
async function bookRide(riderData, driverData, options) {
  const result = pinata
    .pinJSONToIPFS(riderData, driverData, options)
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
  return result;
}
export default bookRide;
