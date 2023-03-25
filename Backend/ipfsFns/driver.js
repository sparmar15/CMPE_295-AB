import fetch from 'node-fetch';
import {pinata} from '../index.js';

// insert new driver
async function addDriver(driverData, options) {
  const result = pinata
    .pinJSONToIPFS(driverData, options)
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(err => {
      // console.log(err);
      return err;
    });
  return result;
}

// get driver by id
async function getDriverByHash(cid) {
  const url = 'https://gateway.pinata.cloud/ipfs/' + cid;
  // console.log(url);
  let settings = {method: 'Get'};
  const result = await fetch(url, settings)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
  return result;
}

// update driver by id
async function getFileHash(filters) {
  const result = pinata
    .pinList(filters)
    .then(result => {
      return result.rows[0].ipfs_pin_hash;
    })
    .catch(err => {
      return err;
    });
  return result;
}

// delete driver by id
async function deleteFileByHash(cid) {
  const result = await pinata
    .unpin(cid)
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(err => {
      return err;
    });
  return result;
}

export {addDriver, getDriverByHash, getFileHash, deleteFileByHash};
