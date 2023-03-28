import fetch from 'node-fetch';
import {pinata} from '../index.js';

// insert new rider
async function addRider(riderData, options) {
  const result = pinata
    .pinJSONToIPFS(riderData, options)
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

// get rider by id
async function getRiderByHash(cid) {
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

// update rider by id
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

// delete rider by id
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

export {addRider, getRiderByHash, getFileHash, deleteFileByHash};
