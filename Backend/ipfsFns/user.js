import fetch from 'node-fetch';
import {pinata} from '../index.js';

// get any user of the application
async function getUser(filters) {
  // console.log(url);
  let settings = {method: 'Get'};
  const result = pinata
    .pinList(filters)
    .then(async result => {
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

export {getUser};
