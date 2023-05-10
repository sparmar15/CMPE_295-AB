import fetch from 'node-fetch';
import {pinata} from '../index.js';

// insert new driver
async function addUser(userData, options) {
  try {
    const result = await pinata.pinJSONToIPFS(userData, options);
    return result;
  } catch (err) {
    console.log(err);
    throw new Error('Error adding user data to IPFS');
  }
}

// get any user of the application
async function getUserByHash(cid) {
  let settings = {method: 'Get'};
  try {
    if (cid && cid.length === 46) {
      let url = 'https://gateway.pinata.cloud/ipfs/' + cid;
      const data = await fetch(url, settings);
      return data.json();
    }
  } catch (err) {
    console.log(err);
    throw new Error(
      'UserHash couldnt be retrieved from the session or invalid hash length',
    );
  }
}

// get user by email
async function getUserbyEmail(filters) {
  let settings = {method: 'Get'};
  try {
    const result = await pinata.pinList(filters);
    if (result && result.rows && result.rows.length > 0) {
      let url =
        'https://gateway.pinata.cloud/ipfs/' + result.rows[0].ipfs_pin_hash;
      const data = await fetch(url, settings);
      return data.json();
    } else {
      throw new Error('No pin found for the specified email');
    }
  } catch (err) {
    console.log(err);
    throw new Error('Error getting user data by email');
  }
}

export {addUser, getUserByHash, getUserbyEmail};
