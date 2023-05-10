import fetch from 'node-fetch';
import {pinata} from '../index.js';

// insert new driver
async function addUser(userData, options) {
  const result = pinata
    .pinJSONToIPFS(userData, options)
    .then(result => {
      // console.log(result);
      return result;
    })
    .catch(err => {
      // console.log(err);
      return err;
    });
  return result;
}

// get any user of the application
async function getUserByHash(cid) {
  // console.log(url);
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

async function getUserbyEmail(filters) {
  // console.log(url);
  let settings = {method: 'Get'};
  const result = pinata
    .pinList(filters)
    .then(async result => {
      console.log('====================================');
      console.log('PinList' + JSON.stringify(result));
      console.log('====================================');
      let url =
        'https://gateway.pinata.cloud/ipfs/' + result.rows[0].ipfs_pin_hash;
      const data = await fetch(url, settings);
      return data.json();
    })
    .catch(err => {
      return err;
    });
  return result;
}

export {addUser, getUserByHash, getUserbyEmail};
